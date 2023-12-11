import { useState, useRef, useContext, useEffect, Fragment } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import { EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import EventBody, { EventType } from '../../components/EventBody/EventBody'
import { ApolloError, NetworkStatus } from '@apollo/client'
import Spinner from '../../components/UI/Spinner/Spinner'
import Alert from '../../components/UI/Alert/Alert'
import { IAuth } from '../../types'
import AuthContext from '../../store/auth-context'
import {
  useDeleteEventMutation,
  useGetEventsLazyQuery,
  useSaveEventMutation,
} from '../../generated/graphql'
import { ServerErrorAlert } from '../../components/ServerErrorAlert/ServerErrorAlert'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { removeEvent } from '../../utils/apolloCache'
import client from '../../apollo'
import { DateTime } from 'luxon'
import { Button } from 'react-bootstrap'
import LoginContainer from '../user/LoginContainer/LoginContainer'

interface ModalBodyType {
  auth: IAuth | null
  event: EventType
  disableEdit: boolean
  onChangeValue: (prop: string, value: string | boolean) => void
  onValidate: (valid: boolean) => void
  onLogin: () => void
}

function Calendar() {
  const [modal, setModal] = useState({
    title: '',
    show: false,
  })

  const [event, setEvent] = useState<EventType>({
    title: '',
    start: '',
    end: '',
    isPrivate: false,
    description: '',
    createdById: '',
  })

  const [actionBtns, setActionBtns] = useState({
    displayDeleteBtn: false,
    hideSaveBtn: true,
    disableSaveBtn: true,
    disableDeleteBtn: false,
  })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [disableEdit, setDisableEdit] = useState<boolean>(false)
  const [serverError, setServerError] = useState<ApolloError | null>(null)
  const [calendarReady, setCalendarReady] = useState<boolean>(false)

  const calendarApiRef = useRef<{
    value: DateClickArg['view']['calendar'] | null
  }>({
    value: null,
  })
  const clickInfoRef = useRef<{ value: EventClickArg | null }>({
    value: null,
  })

  const { displayDeleteBtn, hideSaveBtn, disableSaveBtn, disableDeleteBtn } =
    actionBtns

  const [
    getEvents,
    { loading: getEventsLoading, data: events, refetch, networkStatus },
  ] = useGetEventsLazyQuery({
    notifyOnNetworkStatusChange: true,
    onError: setServerError,
    fetchPolicy: 'cache-and-network',
  })

  const { title, start, end, isPrivate, description } = event

  const [saveEvent, { loading: saveEventLoading }] = useSaveEventMutation({
    onError: setServerError,
  })

  const [deleteEvent, { loading: deleteEventLoading }] = useDeleteEventMutation(
    {
      onError: setServerError,
    },
  )

  const { auth } = useContext(AuthContext)

  useEffect(() => {
    calendarReady && refetch()
    setDisableEdit(!auth)
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: true,
      disableDeleteBtn: !auth,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, refetch])

  const onCompleteApiRequest = () => {
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: false,
      disableDeleteBtn: false,
    })
    setModal({ ...modal, show: false })
  }

  const handleSaveEvent = async () => {
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: true,
      disableDeleteBtn: true,
    })

    calendarApiRef.current?.value?.unselect()

    setServerError(null)

    const id = clickInfoRef.current?.value?.event?.id ?? ''

    const res = await saveEvent({
      variables: {
        event: {
          id,
          title,
          start,
          end,
          isPrivate,
          description,
        },
      },
    })

    if (res.data) {
      if (clickInfoRef.current?.value) {
        clickInfoRef.current.value.event.setProp('title', title)
        clickInfoRef.current.value.event.setExtendedProp('isPrivate', isPrivate)
        clickInfoRef.current.value.event.setExtendedProp(
          'description',
          description,
        )
        clickInfoRef.current.value.event.setStart(start)
        clickInfoRef.current.value.event.setEnd(end)
      } else {
        await client.resetStore()
      }

      if (!serverError) {
        toast.success('Event was successfully saved!')
      }
    }

    onCompleteApiRequest()
  }

  const handleDateClick = async (selectedDate: DateClickArg) => {
    if (clickInfoRef.current) clickInfoRef.current.value = null
    if (calendarApiRef.current)
      calendarApiRef.current.value = selectedDate.view.calendar

    setDisableEdit(!auth)
    setActionBtns({
      disableSaveBtn: true,
      disableDeleteBtn: !auth,
      displayDeleteBtn: false,
      hideSaveBtn: !auth,
    })
    setEvent({
      title: '',
      start: `${selectedDate.dateStr}T00:00:00`,
      end: `${selectedDate.dateStr}T01:00:00`,
      isPrivate: false,
      description: '',
      createdById: '',
    })
    setModal({
      title: 'New Event',
      show: true,
    })
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault()
    if (clickInfoRef.current) clickInfoRef.current.value = clickInfo
    const isTheOwner =
      (auth && auth.userId === clickInfo.event.extendedProps.createdBy._id) ??
      false

    if (auth) {
      setDisableEdit(!isTheOwner)
      setActionBtns({
        disableSaveBtn: !isTheOwner,
        disableDeleteBtn: !isTheOwner,
        displayDeleteBtn: isTheOwner,
        hideSaveBtn: !isTheOwner,
      })
    } else {
      setDisableEdit(true)
      setActionBtns({
        disableSaveBtn: true,
        disableDeleteBtn: true,
        displayDeleteBtn: false,
        hideSaveBtn: true,
      })
    }

    const start = clickInfo.event.startStr.substring(
      0,
      clickInfo.event.startStr.lastIndexOf('-'),
    )
    const end = clickInfo.event.endStr.substring(
      0,
      clickInfo.event.endStr.lastIndexOf('-'),
    )

    const { title } = clickInfo.event
    const { isPrivate, description, createdBy } = clickInfo.event.extendedProps

    setEvent({
      title,
      start,
      end,
      isPrivate,
      description,
      createdById: createdBy._id,
    })
    setModal({
      title: isTheOwner ? 'Edit Event' : 'Event (read only)',
      show: true,
    })
  }

  const handleDeleteEvent = async () => {
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: true,
      disableDeleteBtn: true,
    })

    setServerError(null)

    const id = clickInfoRef.current?.value?.event?.id

    if (!id) {
      throw new Error('Event ID is missing!')
    }

    const res = await deleteEvent({
      variables: { id },
      update(cache) {
        removeEvent(cache, id)
      },
    })

    if (res.data) {
      clickInfoRef.current.value?.event.remove()
      clickInfoRef.current.value = null

      if (!serverError) {
        toast.success('Event was successfully deleted!')
      }
    }

    onCompleteApiRequest()
  }

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value })
  }

  const handleShowLoginModal = (flag: boolean) => {
    setShowLoginModal(flag)
    setModal({ ...modal, show: false })
  }

  return (
    <Fragment>
      {showLoginModal && (
        <LoginContainer
          view={'Login'}
          onClose={() => handleShowLoginModal(false)}
        />
      )}
      <ServerErrorAlert
        error={serverError}
        onClose={() => setServerError(null)}
      />

      <Modal
        title={modal.title}
        show={modal.show}
        actionBtnFlags={{
          hideSubmitBtn: hideSaveBtn,
          disableSubmitBtn: disableSaveBtn,
          disableDeleteBtn,
          displayDeleteBtn,
        }}
        actionBtnLoading={{
          isSubmitLoading: saveEventLoading,
          isDeleteLoading: deleteEventLoading,
        }}
        onClose={() => setModal({ ...modal, show: false })}
        onDelete={handleDeleteEvent}
        onSubmit={handleSaveEvent}
      >
        <ModalBody
          auth={auth}
          event={event}
          disableEdit={disableEdit}
          onChangeValue={(prop, value) => onChangeValueHandler(prop, value)}
          onValidate={(valid) =>
            setActionBtns({ ...actionBtns, disableSaveBtn: !valid })
          }
          onLogin={() => handleShowLoginModal(true)}
        />
      </Modal>

      <FullCalendarWrapper>
        {getEventsLoading || networkStatus === NetworkStatus.refetch ? (
          <Spinner />
        ) : null}

        <FullCalendar
          initialView='dayGridMonth'
          lazyFetching={true}
          events={events?.eventsData?.events as EventType[]}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          datesSet={(dateRange) => {
            setCalendarReady(true)
            getEvents({
              variables: {
                filter: {
                  startDate: DateTime.fromISO(dateRange.startStr)
                    .minus({ months: 1 })
                    .toISO(),
                  endDate: DateTime.fromISO(dateRange.endStr)
                    .plus({ months: 1 })
                    .toISO(),
                },
              },
            })
          }}
        />
      </FullCalendarWrapper>
    </Fragment>
  )
}

const ModalBody = ({
  auth,
  event,
  disableEdit,
  onChangeValue,
  onValidate,
  onLogin,
}: ModalBodyType) => (
  <div>
    {!auth && (
      <Alert
        msg='You must login to be able to add or edit events.'
        type='warning'
        dismissible={false}
        btn={
          <Button variant='primary' size='sm' type='button' onClick={onLogin}>
            Login
          </Button>
        }
      />
    )}
    <EventBody
      event={event}
      disableEdit={disableEdit}
      onChangeValue={onChangeValue}
      onValidate={onValidate}
    />
  </div>
)

export const FullCalendarWrapper = styled.div`
  a.fc-event,
  a.fc-event:hover {
    cursor: pointer;
  }

  .fc-prev-button,
  .fc-next-button,
  .fc-today-button {
    background-color: white !important;
  }

  .fc-icon-chevron-left,
  .fc-icon-chevron-right,
  .fc-today-button {
    color: black !important;
  }

  .fc .fc-toolbar-title {
    font-size: 20px !important;
  }
`

export default Calendar
