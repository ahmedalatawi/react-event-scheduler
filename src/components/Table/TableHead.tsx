import type { SortConfig, TableConfig } from './Table'

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
  const getSortClassName = (key: keyof T) => {
    if (!sortConfig?.key) return
    return sortConfig.key === key ? sortConfig.direction : undefined
  }

  return (
    <thead className='thead-dark'>
      <tr>
        {config
          ? config.headers.map((h) => (
              <th
                key={h.key as string}
                onClick={() => onClick?.(h.key)}
                className={getSortClassName(h.key)}
              >
                {h.label}
              </th>
            ))
          : columns.map((k) => (
              <th
                key={k}
                onClick={() => onClick?.(k as keyof T)}
                className={getSortClassName(k as keyof T)}
              >
                {k}
              </th>
            ))}
      </tr>
    </thead>
  )
}

export default TableHead
