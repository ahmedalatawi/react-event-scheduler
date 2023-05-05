import { useState, Fragment, useContext, FC } from 'react'
import useValidation from '../../../hooks/useValidation'
import Login from '../../../components/Login/Login'
import Signup, {
  LoginOrSignupFormProps,
} from '../../../components/Signup/Signup'
import Alert from '../../../components/UI/Alert/Alert'
import Modal from '../../../components/UI/Modal/Modal'
import AuthContext from '../../../store/auth-context'
import {
  Auth,
  useLoginLazyQuery,
  useSignupMutation,
} from '../../../generated/graphql'
import { ISignupInput } from '../../../types'
import { ApolloError } from '@apollo/client'

type Props = {
  view: string
  onClose: () => void
}

const LoginContainer: FC<Props> = ({ view, onClose }) => {
  const [viewType, setViewType] = useState<string>('')
  const [formError, setFormError] = useState<string>('')
  const [serverError, setServerError] = useState<ApolloError | null>(null)
  const [showModal, setShowModal] = useState<boolean>(true)
  const [loginOrSignupForm, setLoginOrSignupForm] = useState<ISignupInput>({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [validate] = useValidation()

  const [login, { loading: loginLoading }] = useLoginLazyQuery({
    fetchPolicy: 'no-cache',
    onError: setServerError,
  })
  const [signup, { loading: signupLoading, reset }] = useSignupMutation({
    onError: setServerError,
  })

  const { addAuth } = useContext(AuthContext)

  const addNewAuthToCookie = (newAuth: Auth | undefined) => {
    if (newAuth) {
      const { userId, token, tokenExpiration, username } = newAuth

      addAuth({ userId, token, tokenExpiration, username })
      setShowModal(false)
      onClose()
    }
  }

  const resetForm = () => {
    setFormError('')
    setServerError(null)
    reset()
  }

  const handleSubmit = async () => {
    const view = getViewType()
    const { username, password, confirmPassword } = loginOrSignupForm
    const formError = validate(username, password, confirmPassword, view)

    resetForm()

    if (!formError) {
      if (view === 'Signup') {
        const signupResponse = await signup({
          variables: { signup: { username, password, confirmPassword } },
        })
        addNewAuthToCookie(signupResponse.data?.signup)
      } else {
        const loginResponse = await login({
          variables: { login: { username, password } },
        })
        addNewAuthToCookie(loginResponse.data?.login)
      }
    } else {
      setFormError(formError)
    }
  }

  const getViewType = (): string => (viewType ? viewType : view)

  const handleToggleView = (view: string) => {
    setViewType(view)
    resetForm()
  }

  const onChangeValue = (prop: LoginOrSignupFormProps, value: string) => {
    resetForm()
    setLoginOrSignupForm({ ...loginOrSignupForm, [prop]: value })
  }

  const displayAlert = () =>
    formError || serverError ? (
      <Alert
        msg={(formError || serverError?.message) ?? ''}
        type={formError ? 'warning' : 'danger'}
        onClose={() => (formError ? setFormError('') : setServerError(null))}
      />
    ) : null

  return (
    <Modal
      title={getViewType()}
      show={showModal}
      actionBtnFlags={{
        submitBtnName: getViewType(),
      }}
      actionBtnLoading={{
        isSubmitLoading: loginLoading || signupLoading,
      }}
      onClose={() => onClose()}
      onSubmit={handleSubmit}
    >
      <Fragment>
        {displayAlert()}
        {getViewType() === 'Login' ? (
          <Login
            onChangeValue={onChangeValue}
            onToggleLogin={() => handleToggleView('Signup')}
          />
        ) : (
          <Signup
            onChangeValue={onChangeValue}
            onToggleSignup={() => handleToggleView('Login')}
          />
        )}
      </Fragment>
    </Modal>
  )
}

export default LoginContainer
