import { useCallback, useState } from 'react'
import { useParams } from 'react-router'
import Alert from '@/components/ui/Alert/Alert'
import Spinner from '@/components/ui/Spinner/Spinner'
import TitledCard from '@/components/ui/TitledCard/TitledCard'
import Pagination from '@/components/Pagination/Pagination'
import { useGetUserEventsQuery } from '@/generated/graphql'
import { Table } from '@/components/Table/Table'
import type { TableHeader } from '@/components/Table/TableHead'
import { useNavigateToHome } from '@/hooks/useNavigateToHome'
import { debounce } from 'lodash'

const ITEMS_PER_PAGE = 20

const MyEvents = () => {
  const { id } = useParams()

  const [selectedRow, setSelectedRow] = useState<object>()
  const [searchText, setSearchText] = useState<string>('')
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
    setSearchText(text)
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
      createdBy,
      createdAt,
      updatedAt,
    } = event

    return {
      id,
      title,
      description,
      start: new Date(start).toLocaleString(),
      end: new Date(end).toLocaleString(),
      createdBy: createdBy?.username,
      isPrivate: isPrivate ? 'Yes' : 'No',
      url: url ? <a href={url}>Link</a> : '',
      createdAt: createdAt ? new Date(createdAt).toLocaleString() : '',
      updatedAt: updatedAt ? new Date(updatedAt).toLocaleString() : '',
    }
  })

  const headers = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'start',
      label: 'Start',
    },
    {
      key: 'end',
      label: 'End',
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'isPrivate',
      label: 'Private',
    },
    {
      key: 'url',
      label: 'Link',
    },
    {
      key: 'createdBy',
      label: 'Posted by',
    },
    {
      key: 'createdAt',
      label: 'Posted on',
    },
    {
      key: 'updatedAt',
      label: 'Updated on',
    },
  ] as TableHeader<object>[]

  console.log(selectedRow)

  return (
    <TitledCard title='My Events'>
      {loading ? (
        <Spinner style={{ paddingBottom: 12 }} />
      ) : (
        !updatedEvents?.length && (
          <Alert
            msg={'No events were found'}
            type='warning'
            dismissible={false}
          />
        )
      )}
      <Table
        searchable
        data={updatedEvents ?? []}
        selectedRow={selectedRow}
        searchText={searchText}
        config={{ headers }}
        onSearch={handleSearchChange}
        onSelect={setSelectedRow}
      />
      <div className='float-end'>
        <Pagination
          total={data?.getUserEvents.totalCount || 0}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={pageNumber}
          onPageChange={(page) => setPageNumber(page)}
        />
      </div>
    </TitledCard>
  )
}

export default MyEvents
