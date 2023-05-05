import React from 'react'
import { IAuth } from '../types'

type AuthContextProps = {
  auth: IAuth | null
  addAuth: (auth: IAuth) => void
  getAuth: () => IAuth | null
  removeAuth: () => void
}

const AuthContext = React.createContext<AuthContextProps>({
  auth: null,
  addAuth: () => null,
  getAuth: () => null,
  removeAuth: () => null,
})

export default AuthContext
