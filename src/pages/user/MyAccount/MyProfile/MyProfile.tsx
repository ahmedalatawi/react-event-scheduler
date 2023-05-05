import { FC, useState } from 'react'
import { useParams } from 'react-router'
import { BiEditAlt } from 'react-icons/bi'
import Alert from '../../../../components/UI/Alert/Alert'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import EditMyProfile from './EditMyProfile'
import TitledCard from '../../../../components/UI/TitledCard/TitledCard'
import { useGetUserQuery } from '../../../../generated/graphql'
import { useNavigateToHome } from '../../../../hooks/useNavigateToHome'

const MyProfile: FC = () => {
  const { id } = useParams()

  const { data, loading, error } = useGetUserQuery({
    variables: { id: id ?? '' },
  })

  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  useNavigateToHome()

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Alert msg={error.message} type='danger' dismissible={false} />
  }

  if (!data) {
    return null
  }

  const {
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    bio,
    createdAt,
    updatedAt,
  } = data.getUser

  return (
    <>
      {!isEditMode ? (
        <TitledCard title='My Profile'>
          <div className='row'>
            <b>Username</b>
            <p>{username}</p>
          </div>

          <div className='row'>
            <b>First name</b>
            <p>{firstName}</p>
          </div>

          <div className='row'>
            <b>Last name</b>
            <p>{lastName}</p>
          </div>

          <div className='row'>
            <b>Email</b>
            <p>{email}</p>
          </div>

          <div className='row'>
            <b>Phone number</b>
            <p>{phoneNumber}</p>
          </div>

          <div className='row'>
            <b>Bio</b>
            <p>{bio}</p>
          </div>

          <div className='row'>
            <b>Created on</b>
            <p>{createdAt && new Date(createdAt).toLocaleString()}</p>
          </div>

          <div className='row'>
            <b>Updated on</b>
            <p>{updatedAt && new Date(updatedAt).toLocaleString()}</p>
          </div>

          <div className='mt-2'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={() => setIsEditMode(true)}
              disabled={loading}
            >
              Edit <BiEditAlt />
            </button>
          </div>
        </TitledCard>
      ) : (
        <EditMyProfile
          user={data.getUser}
          onReadOnlyMode={() => setIsEditMode(false)}
        />
      )}
    </>
  )
}

export default MyProfile
