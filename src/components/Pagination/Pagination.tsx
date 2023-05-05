import { useEffect, useState, useMemo, FC, useCallback } from 'react'
import ReactBootstrapPagination from 'react-bootstrap/Pagination'

const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

type Props = {
  total: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState<number>(0)

  const onPageChangeHandler = useCallback(
    (page: number) => {
      scrollToTop()
      onPageChange(page)
    },
    [onPageChange],
  )

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage))
  }, [total, itemsPerPage])

  const paginationItems = useMemo(() => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      const isPageNumberFirst = i === 1
      const isPageNumberLast = i === totalPages
      const isCurrentPageWithinTwoPageNumbers = Math.abs(i - currentPage) <= 2

      if (
        isPageNumberFirst ||
        isPageNumberLast ||
        isCurrentPageWithinTwoPageNumbers
      ) {
        pages.push(
          <ReactBootstrapPagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => onPageChangeHandler(i)}
          >
            {i}
          </ReactBootstrapPagination.Item>,
        )
      } else {
        pages.push(
          <ReactBootstrapPagination.Ellipsis key={i} className='muted' />,
        )
      }
    }

    return pages
  }, [totalPages, currentPage, onPageChangeHandler])

  if (totalPages === 0) return null

  return (
    <ReactBootstrapPagination>
      <ReactBootstrapPagination.Prev
        onClick={() => onPageChangeHandler(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <ReactBootstrapPagination.Next
        onClick={() => onPageChangeHandler(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </ReactBootstrapPagination>
  )
}

export default Pagination
