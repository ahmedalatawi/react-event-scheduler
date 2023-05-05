import { useState, useEffect } from 'react'

const useDebounce = (searchText: string) => {
  const [debouncedSearchText, setDebouncedSearchText] =
    useState<string>(searchText)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchText])

  return debouncedSearchText
}

export default useDebounce
