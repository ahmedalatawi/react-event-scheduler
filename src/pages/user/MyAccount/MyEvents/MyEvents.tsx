import { useParams } from 'react-router'
import Alert from '@/components/ui/Alert/Alert'
import TitledCard from '@/components/ui/TitledCard/TitledCard'
import { useGetUserEventsQuery } from '@/generated/graphql'
import { useNavigateToHome } from '@/hooks/useNavigateToHome'
import { debounce } from 'lodash'
import { DataTable, type Column } from '@atawi/react-datatable'
import { useCallback, useState } from 'react'

type Event = {
  id: string
  title: string
  description: string
  start: string
  end: string
  isPrivate: string
  url: string | JSX.Element
  createdAt: string
  updatedAt: string
}

const ITEMS_PER_PAGE = 20

const MyEvents = () => {
  const { id } = useParams()
  const [searchTextDelayed, setSearchTextDelayed] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)

  useNavigateToHome()

  const { data, loading, error } = useGetUserEventsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id ?? '',
      filter: {
        searchText: searchTextDelayed,
        pageNumber,
        pageSize: ITEMS_PER_PAGE,
      },
    },
  })

  const handleSearch = debounce((text: string) => {
    setPageNumber(1)
    setSearchTextDelayed(text)
  })

  const debounceSearch = useCallback(debounce(handleSearch, 500), [])

  const handleSearchChange = (text: string) => {
    debounceSearch(text)
  }

  if (error) {
    return <Alert msg={error.message} type='danger' dismissible={false} />
  }

  const updatedEvents = data?.getUserEvents.events.map((event) => {
    const {
      id,
      title,
      start,
      end,
      isPrivate,
      description,
      url,
      // createdBy,
      createdAt,
      updatedAt,
    } = event

    return {
      id,
      title,
      description,
      start: new Date(start).toLocaleString(),
      end: new Date(end).toLocaleString(),
      // createdBy: createdBy?.username,
      isPrivate: isPrivate ? 'Yes' : 'No',
      url: url,
      createdAt: createdAt ? new Date(createdAt).toLocaleString() : '',
      updatedAt: updatedAt ? new Date(updatedAt).toLocaleString() : '',
    }
  }) as Event[]

  const columns: Column<Event>[] = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      searchable: true,
    },
    {
      key: 'start',
      header: 'Start',
      sortable: true,
      searchable: true,
      width: '10%',
    },
    {
      key: 'end',
      header: 'End',
      sortable: true,
      searchable: true,
      width: '10%',
    },
    {
      key: 'description',
      header: 'Description',
      sortable: true,
      searchable: true,
    },
    {
      key: 'isPrivate',
      header: 'Private',
      sortable: true,
      searchable: true,
      width: '10%',
    },
    {
      key: 'url',
      header: 'Link',
      sortable: true,
      searchable: true,
      width: '10%',
      render: (value) => <a href={value as string}>Link</a>,
    },
    {
      key: 'createdAt',
      header: 'Posted on',
      sortable: true,
      searchable: true,
    },
    {
      key: 'updatedAt',
      header: 'Updated on',
      sortable: true,
      searchable: true,
    },
  ]

  const handleSelectionChange = (selectedItems: Event[]) => {
    console.log('Selected:', selectedItems)
  }

  return (
    <TitledCard title='My Events'>
      <DataTable
        className='DataTable'
        data={updatedEvents ?? []}
        columns={columns}
        pageSize={10}
        selectable={true}
        expandable={false}
        stickyHeader={true}
        searchable={true}
        exportable={true}
        loading={loading}
        onSelectionChange={handleSelectionChange}
        onSearchTextChange={handleSearchChange}
        onPageChange={setPageNumber}
      />
    </TitledCard>
  )
}

export default MyEvents
