import type { TableConfig } from './Table'

interface Props<T> {
  data: T[]
  columns: string[]
  selectedRow?: T
  config?: TableConfig<T>
  onSelect?: (row: T) => void
}

function TableBody<T>({
  data,
  columns,
  config,
  selectedRow,
  onSelect,
}: Props<T>) {
  return (
    <tbody>
      {data.map((value, i) => {
        const id = value['id' as keyof T] as string
        const selectedRowId = selectedRow?.['id' as keyof T] as string

        return (
          <tr
            key={id ? id : i}
            onClick={() => onSelect?.(value)}
            className={id === selectedRowId ? 'table-active' : ''}
          >
            {config
              ? config.headers.map((h) => (
                  //@ts-expect-error ignore for now
                  <td key={h.key as string}>{value[h.key]}</td>
                ))
              : columns.map((k) => (
                  //@ts-expect-error ignore for now
                  <td key={k}>{value[k]}</td>
                ))}
          </tr>
        )
      })}
    </tbody>
  )
}

export default TableBody
