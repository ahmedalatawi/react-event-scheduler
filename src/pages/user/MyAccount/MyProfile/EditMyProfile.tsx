import { FC, FormEvent, useContext, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { MdSaveAlt } from 'react-icons/md'
import AuthContext from '../../../../store/auth-context'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Alert from '../../../../components/UI/Alert/Alert'
import TitledCard from '../../../../components/UI/TitledCard/TitledCard'
import {
  UserFullFragment,
  useSaveUserMutation,
} from '../../../../generated/graphql'

type UserPropKeys = keyof UserFullFragment

type Props = {
  user: UserFullFragment
  onReadOnlyMode: () => void
}

const EditMyProfile: FC<Props> = ({ user, onReadOnlyMode }) => {
  const [validated, setValidated] = useState(false)
  const [userToEdit, setUserToEdit] = useState<UserFullFragment>(user)

  const { auth, addAuth } = useContext(AuthContext)

  const editUser = (prop: UserPropKeys, value: string) =>
    setUserToEdit({
      ...userToEdit,
      [prop]: value.trim(),
    })

  const [saveUser, { error, loading, reset }] = useSaveUserMutation()

  const { _id, username, firstName, lastName, email, phoneNumber, bio } =
    userToEdit

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget

    event.preventDefault()
    event.stopPropagation()

    reset()

    setValidated(true)

    form.checkValidity() &&
      saveUser({
        variables: {
          user: {
            _id: _id,
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            bio,
          },
        },
      })
        .then((res) => {
          const { userId, token, tokenExpiration } = auth ?? {
            token: '',
            userId: '',
          }
          addAuth({
            userId,
            token,
            tokenExpiration,
            username: res.data?.saveUser.username ?? '',
          })
          onReadOnlyMode()
        })
        .catch((error) => {
          console.error(error)
          setValidated(false)
        })
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {error && <Alert msg={error.message} type='danger' onClose={reset} />}

      <TitledCard title='Edit My Profile'>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Form.Group as={Col} md='12' controlId='validationCustomUsername'>
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                <Form.Control
                  type='text'
                  placeholder='Username'
                  aria-describedby='inputGroupPrepend'
                  value={username}
                  onChange={(event) => editUser('username', event.target.value)}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Username is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='6'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First name'
                value={firstName ?? ''}
                onChange={(event) => editUser('firstName', event.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md='6'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last name'
                value={lastName ?? ''}
                onChange={(event) => editUser('lastName', event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='12' controlId='validationCustomEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
                value={email ?? ''}
                onChange={(event) => editUser('email', event.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='12'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Phone number'
                value={phoneNumber ?? ''}
                onChange={(event) =>
                  editUser('phoneNumber', event.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} md='12'>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                placeholder='Bio'
                value={bio ?? ''}
                onChange={(event) => editUser('bio', event.target.value)}
              />
            </Form.Group>
          </Row>

          <div className='mt-4'>
            <Button type='submit' className='me-3'>
              Save <MdSaveAlt />
            </Button>
            <Button type='button' onClick={onReadOnlyMode} variant='secondary'>
              Cancel
            </Button>
          </div>
        </Form>
      </TitledCard>
    </>
  )
}

export default EditMyProfile
