import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../store/auth-context'

export const useNavigateToHome = () => {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    !auth && navigate('/')
  }, [auth, navigate])
}
