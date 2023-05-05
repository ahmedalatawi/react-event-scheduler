import { ChangeEvent, useState } from 'react'

const useSearchBox = () => {
  const [searchText, setSearchText] = useState('')

  const searchSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
    }
  }

  const searchChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    setSearchText(e.target.value)
  }

  return {
    searchSubmitHandler,
    searchChangeHandler,
    searchText,
  }
}

export default useSearchBox
