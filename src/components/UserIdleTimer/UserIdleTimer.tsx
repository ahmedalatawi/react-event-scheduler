import { FC, useContext, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import AuthContext from '../../store/auth-context'
import Timer from '../Timer/Timer'
import Modal from '../UI/Modal/Modal'

type Props = {
  onLogout: () => void
}

const UserIdleTimer: FC<Props> = ({ onLogout }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false)

  const { auth } = useContext(AuthContext)

  const handleOnIdle = () => {
    auth ? setDisplayModal(true) : onLogout()
  }

  const handleOnStayLoggedIn = () => {
    reset()
    setDisplayModal(false)
  }

  const { reset } = useIdleTimer({
    timeout: 180000, // 3 minutes
    onIdle: handleOnIdle,
    debounce: 500,
    crossTab: true,
  })

  const actionBtnFlags = {
    submitBtnName: 'Stay logged in',
    closeBtnName: 'Logout',
  }

  return (
    <Modal
      title={'Session Expiry Warning'}
      show={displayModal}
      closeButton={false}
      actionBtnFlags={actionBtnFlags}
      onClose={onLogout}
      onSubmit={handleOnStayLoggedIn}
    >
      <Timer seconds={90} onTimeout={onLogout} />
    </Modal>
  )
}

export default UserIdleTimer
