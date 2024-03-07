import { ApolloError, NetworkStatus } from '@apollo/client'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Card, { CardType } from '../../../components/UI/Card/Card'
import Alert from '../../../components/UI/Alert/Alert'
import Pagination from '../../../components/Pagination/Pagination'
import AuthContext from '../../../store/auth-context'
import Modal from '../../../components/UI/Modal/Modal'
import EventBody, { EventType } from '../../../components/EventBody/EventBody'
import { Form } from 'react-bootstrap'
import {
  EventFull,
  useDeleteEventMutation,
  useGetEventsQuery,
  useSaveEventMutation,
} from '../../../generated/graphql'
import styled from 'styled-components'
import { dateToTitle } from '../../../utils/dateTransforms'
import { ServerErrorAlert } from '../../../components/ServerErrorAlert/ServerErrorAlert'
import toast from 'react-hot-toast'
import { removeEvent } from '../../../utils/apolloCache'
import { DateTime } from 'luxon'

const EVENTS_PER_PAGE = 15

function SearchEvents() {
  const [modal, setModal] = useState({
    title: '',
    show: false,
  })
  const [serverError, setServerError] = useState<ApolloError | null>(null)

  const [event, setEvent] = useState<EventType>({
    id: '',
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
    disableSaveBtn: false,
    disableDeleteBtn: false,
  })

  const [formProps, setFormProps] = useState({
    searchText: '',
    currentPage: 1,
    allCheck: true,
    currentCheck: false,
    expiredCheck: false,
  })

  const [skipFirstRun, setSkipFirstRun] = useState<boolean>(true)

  const { auth } = useContext(AuthContext)
  const { searchText, currentPage, allCheck, currentCheck, expiredCheck } =
    formProps
  const { id, title, start, end, isPrivate, description, createdById } = event
  const { displayDeleteBtn, hideSaveBtn, disableSaveBtn, disableDeleteBtn } =
    actionBtns

  const debouncedSearchText = useDebounce(searchText)

  const filter = {
    searchText: debouncedSearchText.trim(),
    pageSize: EVENTS_PER_PAGE,
    pageNumber: currentPage,
    currentCheck,
    expiredCheck,
  }

  const { loading, data, refetch, networkStatus } = useGetEventsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      filter,
    },
    onError: setServerError,
    fetchPolicy: 'cache-and-network',
  })

  const [saveEvent, { loading: saveEventLoading }] = useSaveEventMutation({
    onError: setServerError,
  })

  const [deleteEvent, { loading: deleteEventLoading }] = useDeleteEventMutation(
    {
      onError: setServerError,
    },
  )

  const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    refetch()
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormProps({ ...formProps, searchText: event.target.value })
  }

  const onCompleteApiRequest = () => {
    setActionBtns({
      ...actionBtns,
      disableDeleteBtn: false,
      disableSaveBtn: false,
    })
    setModal({ ...modal, show: false })
  }

  const getExSubTitle = (endTime: string) => {
    const today = DateTime.now()
    const endDate = DateTime.fromISO(endTime)

    return endDate < today ? 'Expired' : 'Active'
  }

  const clickEventHandler = (event: EventFull) => {
    const { id, title, start, end, isPrivate, description, createdBy } = event
    const createdById = createdBy?._id ?? ''
    const isTheOwner = (auth && auth.userId === createdById) ?? false

    if (auth) {
      setActionBtns({
        ...actionBtns,
        displayDeleteBtn: isTheOwner,
        hideSaveBtn: !isTheOwner,
        disableSaveBtn: !isTheOwner,
      })
    } else {
      setActionBtns({
        ...actionBtns,
        displayDeleteBtn: false,
        hideSaveBtn: true,
      })
    }

    setEvent({
      id: id ?? '',
      title,
      start,
      end,
      description,
      isPrivate,
      createdById,
    })
    setModal({
      title: isTheOwner ? 'Edit Event' : 'Event (read only)',
      show: true,
    })
  }

  const handleDeleteEvent = async () => {
    setActionBtns({
      ...actionBtns,
      disableDeleteBtn: true,
      disableSaveBtn: true,
    })

    if (!id) {
      throw new Error('Event ID is missing!')
    }

    const res = await deleteEvent({
      variables: { id },
      update(cache) {
        removeEvent(cache, id)
      },
    })

    if (res.data && !serverError) {
      toast.success('Event was successfully deleted!')
    }

    onCompleteApiRequest()
  }

  const handleSaveEvent = async () => {
    setActionBtns({
      ...actionBtns,
      disableDeleteBtn: true,
      disableSaveBtn: true,
    })

    if (!id) {
      throw new Error('Event ID is missing!')
    }

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

    if (res.data && !serverError) {
      toast.success('Event was successfully saved!')
    }

    onCompleteApiRequest()
  }

  const resetCurrentPage = () => setFormProps({ ...formProps, currentPage: 1 })

  useEffect(() => {
    resetCurrentPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText])

  useEffect(() => {
    skipFirstRun && setSkipFirstRun(false)
    !skipFirstRun && refetch()
    resetCurrentPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, refetch])

  const handleFilterByAllEventsChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setFormProps({
      ...formProps,
      currentPage: 1,
      currentCheck: false,
      allCheck: !allCheck,
      expiredCheck: false,
    })
  }

  const handleFilterByCurrentEventsChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    e.persist()
    setFormProps({
      ...formProps,
      currentPage: 1,
      currentCheck: !currentCheck,
      allCheck: false,
      expiredCheck: false,
    })
  }

  const handleFilterByExpiredEventsChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    e.persist()
    setFormProps({
      ...formProps,
      currentPage: 1,
      currentCheck: false,
      allCheck: false,
      expiredCheck: !expiredCheck,
    })
  }

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value })
  }

  const isTheOwner = () => {
    return auth && auth.userId === event.createdById
  }

  const eventToCard = (event: EventFull): CardType => ({
    title: event.title,
    subtitle: dateToTitle(event),
    exSubTitle: getExSubTitle(event.end),
    content: event.description,
    url: event.url,
    createdBy: event?.createdBy?.username ?? '',
    createdAt: event.createdAt ?? 0,
    updatedAt: event.updatedAt ?? 0,
    isPrivate: event.isPrivate,
  })

  return (
    <>
      <ServerErrorAlert
        error={serverError}
        onClose={() => setServerError(null)}
      />

      <Form>
        <div className='mb-4'>
          <span className='me-3 fs-5'>Filter by: </span>
          <Form.Check
            inline
            label='All'
            name='group'
            type='radio'
            defaultChecked={allCheck}
            onChange={handleFilterByAllEventsChange}
          />
          <Form.Check
            inline
            label='Active'
            name='group'
            type='radio'
            defaultChecked={currentCheck}
            onChange={handleFilterByCurrentEventsChange}
          />
          <Form.Check
            inline
            label='Expired'
            name='group'
            type='radio'
            defaultChecked={expiredCheck}
            onChange={handleFilterByExpiredEventsChange}
          />
        </div>
      </Form>

      <form
        className='d-flex'
        onSubmit={handleOnSubmit}
        data-testid='SearchBoxForm'
      >
        <input
          value={searchText}
          data-testid='SearchBoxInput'
          className='form-control'
          type='search'
          placeholder='Search events by title'
          aria-label='Search'
          onChange={handleOnChange}
        />
      </form>

      <EventCardContainer>
        {loading || networkStatus === NetworkStatus.refetch ? (
          <Spinner />
        ) : data?.eventsData?.events?.length ? (
          data.eventsData.events.map((event) => {
            return (
              <EventCardWrapper key={event.id}>
                <Card
                  card={eventToCard(event)}
                  onClick={() => clickEventHandler(event)}
                />
              </EventCardWrapper>
            )
          })
        ) : !serverError ? (
          <div className='event-card'>
            <Alert
              msg='No results were found.'
              type='warning'
              dismissible={false}
            />
          </div>
        ) : null}
      </EventCardContainer>

      {!loading && (
        <div className='float-end'>
          <Pagination
            total={data?.eventsData?.totalCount || 0}
            itemsPerPage={EVENTS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) =>
              setFormProps({ ...formProps, currentPage: page })
            }
          />
        </div>
      )}

      <Modal
        title={modal.title}
        show={modal.show}
        actionBtnFlags={{
          disableSubmitBtn: disableSaveBtn,
          hideSubmitBtn: hideSaveBtn,
          displayDeleteBtn,
          disableDeleteBtn,
          closeBtnName: auth?.userId === createdById ? 'Cancel' : 'Close',
        }}
        actionBtnLoading={{
          isSubmitLoading: saveEventLoading,
          isDeleteLoading: deleteEventLoading,
        }}
        onClose={() => setModal({ ...modal, show: false })}
        onDelete={handleDeleteEvent}
        onSubmit={handleSaveEvent}
      >
        <EventBody
          event={event}
          disableEdit={!isTheOwner()}
          onChangeValue={(prop, value) => onChangeValueHandler(prop, value)}
          onValidate={(valid) =>
            setActionBtns({ ...actionBtns, disableSaveBtn: !valid })
          }
        />
      </Modal>
    </>
  )
}

export const EventCardContainer = styled.div({
  paddingTop: 10,
  paddingBottom: 20,
})

export const EventCardWrapper = styled.div({
  paddingTop: 20,
})

export default SearchEvents
