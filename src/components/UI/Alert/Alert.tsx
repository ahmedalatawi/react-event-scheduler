import React, { FC } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import { BsCheck2Circle } from 'react-icons/bs'
import { Alert as BootstrapAlert } from 'react-bootstrap'

type Props = {
  type: string
  msg: string
  dismissible?: boolean
  onClose?: () => void
}

const Alert: FC<Props> = ({ type, msg, dismissible = true, onClose }) => {
  return (
    <BootstrapAlert variant={type} onClose={onClose} dismissible={dismissible}>
      {type === 'success' ? (
        <BsCheck2Circle size={25} />
      ) : (
        <IoWarningOutline size={25} />
      )}{' '}
      <span>{msg}</span>
    </BootstrapAlert>
  )
}

export default React.memo(Alert)
