import Cookies from 'js-cookie'
import { IAuth } from '../types'

const getCookie = (name: string) => Cookies.get(name)

const setCookie = (name: string, value: string, expires?: number | Date) =>
  Cookies.set(name, value, { expires })

const removeCookie = (name: string) => Cookies.remove(name)

const expiresIn = (tokenExpiration: number) =>
  new Date(new Date().getTime() + tokenExpiration * 60 * 1000)

const useAuth = () => {
  const addAuth = (auth: IAuth) => {
    setCookie(
      'auth',
      JSON.stringify(auth),
      expiresIn(auth.tokenExpiration || 0),
    )
  }

  const getAuth = () => {
    const storedAuth = getCookie('auth')
    return storedAuth ? JSON.parse(storedAuth) : null
  }

  const removeAuth = () => {
    removeCookie('auth')
  }

  return { getAuth, addAuth, removeAuth }
}

export default useAuth
