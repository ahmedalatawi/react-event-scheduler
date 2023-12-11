import React, { FC, ReactNode } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import { BsCheck2Circle } from 'react-icons/bs'
import { Alert as BootstrapAlert } from 'react-bootstrap'
import styled from 'styled-components'

type Props = {
  type: string
  msg: string
  dismissible?: boolean
  btn?: ReactNode
  onClose?: () => void
}

const Alert: FC<Props> = ({ type, msg, dismissible = true, btn, onClose }) => {
  return (
    <BootstrapAlert variant={type} onClose={onClose} dismissible={dismissible}>
      {type === 'success' ? (
        <BsCheck2Circle size={25} />
      ) : (
        <IoWarningOutline size={25} />
      )}{' '}
      <span>{msg}</span>
      {btn && <StyledButton>{btn}</StyledButton>}
    </BootstrapAlert>
  )
}

const StyledButton = styled.span`
  padding-left: 12px;
`

export default React.memo(Alert)
