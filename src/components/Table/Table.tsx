import { useMemo, useState } from 'react'
import TableHead, { type TableHeader } from './TableHead'
import TableBody from './TableBody'
import { styled } from 'styled-components'

export type TableConfig<T> = {
  headers: TableHeader<T>[]
}

export type SortConfig<T> = {
  key: keyof T | null
  direction: 'asc' | 'desc'
}

interface Props<T> {
  data: T[]
  searchable?: boolean
  selectedRow?: T
  searchText?: string
  config?: TableConfig<T>
  onSelect?: (row: T) => void
  onSearch?: (text: string) => void
}

export function Table<T>({
  data,
  searchable = false,
  selectedRow,
  searchText,
  config,
  onSelect,
  onSearch,
}: Props<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    direction: 'asc',
  })

  const keys = Object.keys(Object.assign({}, ...data))

  const filteredData = useMemo(() => {
    return searchText
      ? data.filter((value) =>
          keys.some((k) =>
            //@ts-expect-error ignore for now
            value[k].toString().toLowerCase().includes(searchText),
          ),
        )
      : data
  }, [searchText, data])

  const handleSort = (key: keyof T) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    })
  }

  const sortedData = useMemo(() => {
    return sortConfig.key !== null
      ? filteredData.slice().sort((a, b) => {
          //@ts-expect-error ignore for now
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1
          }
          //@ts-expect-error ignore for now
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1
          }
          return 0
        })
      : filteredData
  }, [filteredData, sortConfig])

  return (
    <div className='table-container'>
      {searchable && (
        <Search>
          <input
            className='form-control'
            placeholder='Type to search...'
            value={searchText}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </Search>
      )}

      <StyledTable className='table table-hover'>
        <TableHead
          columns={keys}
          config={config}
          sortConfig={sortConfig}
          onClick={handleSort}
        />
        <TableBody
          columns={keys}
          config={config}
          data={sortedData}
          selectedRow={selectedRow}
          onSelect={onSelect}
        />
      </StyledTable>
    </div>
  )
}

const Search = styled.div`
  margin-top: 0.6rem;
  margin-bottom: 2rem;
`

const StyledTable = styled.table`
  tr {
    cursor: pointer;
  }

  thead {
    white-space: nowrap;
  }
`
