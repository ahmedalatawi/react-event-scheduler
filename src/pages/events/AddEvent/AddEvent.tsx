import { ChangeEvent, FC, Fragment, useContext, useState } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import EventBody, { EventType } from '../../../components/EventBody/EventBody'
import Alert from '../../../components/UI/Alert/Alert'
import AuthContext from '../../../store/auth-context'
import {
  SaveEventMutation,
  useSaveEventMutation,
} from '../../../generated/graphql'
import { IAuth } from '../../../types'
import { ApolloError } from '@apollo/client'
import { BtnSpinner } from '../../../components/UI/BtnSpinner/BtnSpinner'

const initEvent = {
  title: '',
  start: '',
  end: '',
  isPrivate: false,
  description: '',
}

const AddEvent: FC = () => {
  const [event, setEvent] = useState<EventType>({ ...initEvent })
  const [resetForm, setResetForm] = useState<boolean>(false)
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true)

  const { title, start, end, isPrivate, description } = event

  const [saveEvent, { error, data, loading, reset }] = useSaveEventMutation({
    variables: { event: { id: '', title, start, end, isPrivate, description } },
  })

  const { auth } = useContext(AuthContext)

  const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    reset()
    setResetForm(false)
    saveEvent()
      .then(async () => {
        setEvent({ ...initEvent })
        setResetForm(true)
        setDisableSaveBtn(true)
      })
      .catch((error) => console.error(error.message))
  }

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value })
  }

  return (
    <Fragment>
      <CustomAlert auth={auth} data={data} error={error} onClose={reset} />
      <form className='row g-3' onSubmit={handleOnSubmit}>
        <div className='col-12'>
          <EventBody
            event={event}
            disableEdit={!auth || loading}
            resetForm={resetForm}
            onChangeValue={(prop, value) => onChangeValueHandler(prop, value)}
            onValidate={(valid) => setDisableSaveBtn(!valid)}
          />
        </div>

        <div className='col-12 mt-4'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={disableSaveBtn || loading || !auth}
          >
            {loading && <BtnSpinner />} Save <MdSaveAlt />
          </button>
        </div>
      </form>
    </Fragment>
  )
}

const CustomAlert = ({
  auth,
  data,
  error,
  onClose,
}: {
  auth: IAuth | null
  data: SaveEventMutation | null | undefined
  error: ApolloError | undefined
  onClose: () => void
}) =>
  !auth ? (
    <Alert
      msg='You must log in to be able to add events.'
      type='warning'
      dismissible={false}
    />
  ) : data ? (
    <Alert
      data-testid='success-alert'
      msg='Event was successfully added.'
      type='success'
      onClose={onClose}
    />
  ) : error ? (
    <Alert
      msg='Error occurred while saving event! Please try again later.'
      type='danger'
      onClose={onClose}
    />
  ) : null

export default AddEvent
