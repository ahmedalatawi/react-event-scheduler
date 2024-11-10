import type { SortConfig, TableConfig } from './Table'
import { PiSortAscendingLight, PiSortDescendingLight } from 'react-icons/pi'

export type TableHeader<T> = {
  key: keyof T
  label: string
}

interface Props<T> {
  columns: string[]
  config?: TableConfig<T>
  sortConfig?: SortConfig<T>
  onClick?: (header: keyof T) => void
}

function TableHead<T>({ columns, config, sortConfig, onClick }: Props<T>) {
  const getSortIcon = (key: keyof T) => {
    if (!sortConfig?.key) return
    const dir = sortConfig.key === key ? sortConfig.direction : null
    return dir === 'asc' ? (
      <PiSortAscendingLight />
    ) : dir === 'desc' ? (
      <PiSortDescendingLight />
    ) : null
  }

  return (
    <thead className='thead-dark'>
      <tr>
        {config
          ? config.headers.map((h) => (
              <th key={h.key as string} onClick={() => onClick?.(h.key)}>
                {h.label} {getSortIcon(h.key)}
              </th>
            ))
          : columns.map((k) => (
              <th key={k} onClick={() => onClick?.(k as keyof T)}>
                {k} {getSortIcon(k as keyof T)}
              </th>
            ))}
      </tr>
    </thead>
  )
}

export default TableHead
