import { useState, useRef, Fragment, useContext, useEffect, FC } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import EventBody, { EventType } from '../../components/EventBody/EventBody';
import { NetworkStatus } from '@apollo/client';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import { IEvent } from '../../interfaces/types';
import AuthContext from '../../store/auth-context';
import {
  useDeleteEventMutation,
  useGetEventsQuery,
  useSaveEventMutation,
} from '../../generated/graphql';
import { FullCalendarWrapper } from './styles';

const Calendar: FC = () => {
  const [modal, setModal] = useState({
    title: '',
    show: false,
  });

  const [event, setEvent] = useState<EventType>({
    title: '',
    start: '',
    end: '',
    isPrivate: false,
    description: '',
    createdById: '',
  });

  const [actionBtns, setActionBtns] = useState({
    displayDeleteBtn: false,
    hideSaveBtn: true,
    disableSaveBtn: true,
    disableDeleteBtn: false,
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [disableEdit, setDisableEdit] = useState<boolean>(false);

  const calendarApiRef = useRef<any>({});
  const clickInfoRef = useRef<any>({});

  const { displayDeleteBtn, hideSaveBtn, disableSaveBtn, disableDeleteBtn } =
    actionBtns;

  const {
    loading: getEventsLoading,
    data: events,
    error: getEventsError,
    refetch,
    networkStatus,
  } = useGetEventsQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: { filter: {} },
  });

  const { title, start, end, isPrivate, description } = event;
  const id = clickInfoRef.current.value?.event?.id || '';

  const [saveEvent, { error: saveEventError, loading: saveEventLoading }] =
    useSaveEventMutation({
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
    });

  const [
    deleteEvent,
    { error: deleteEventError, loading: deleteEventLoading },
  ] = useDeleteEventMutation({
    variables: { id: clickInfoRef.current.value?.event?.id },
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const auth = authCtx.getAuth();
    refetch();
    setLoggedIn(!!auth);
    setDisableEdit(!auth);
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: true,
      disableDeleteBtn: !auth,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx, refetch]);

  const handleSaveEvent = () => {
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: true,
      disableDeleteBtn: true,
    });

    calendarApiRef.current.value?.unselect();

    saveEvent()
      .then((res) => {
        const { id } = res.data?.saveEvent as IEvent;

        if (clickInfoRef.current.value) {
          clickInfoRef.current.value.event.setProp('title', title);
          clickInfoRef.current.value.event.setExtendedProp(
            'isPrivate',
            isPrivate
          );
          clickInfoRef.current.value.event.setExtendedProp(
            'description',
            description
          );
          clickInfoRef.current.value.event.setStart(start);
          clickInfoRef.current.value.event.setEnd(end);
        } else {
          calendarApiRef.current.value.addEvent({
            id,
            title,
            start,
            end,
            extendedProps: {
              isPrivate,
              description,
              createdBy: {
                _id: authCtx.auth?.userId,
              },
            },
          });
        }
      })
      .finally(() =>
        setActionBtns({
          ...actionBtns,
          disableSaveBtn: false,
          disableDeleteBtn: false,
        })
      );
  };

  const handleDateClick = async (selectedDate: DateClickArg) => {
    clickInfoRef.current.value = null;
    calendarApiRef.current.value = selectedDate.view.calendar;

    const auth = authCtx.getAuth();

    setDisableEdit(!auth);
    setActionBtns({
      disableSaveBtn: true,
      disableDeleteBtn: !auth,
      displayDeleteBtn: false,
      hideSaveBtn: !auth,
    });
    setEvent({
      title: '',
      start: `${selectedDate.dateStr}T00:00:00`,
      end: `${selectedDate.dateStr}T01:00:00`,
      isPrivate: false,
      description: '',
      createdById: '',
    });
    setModal({
      title: 'New Event',
      show: true,
    });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
    clickInfoRef.current.value = clickInfo;

    const auth = authCtx.getAuth();

    if (auth) {
      const equal = auth.userId === clickInfo.event.extendedProps.createdBy._id;

      setDisableEdit(!equal);
      setActionBtns({
        disableSaveBtn: !equal,
        disableDeleteBtn: !equal,
        displayDeleteBtn: equal,
        hideSaveBtn: !equal,
      });
    } else {
      setDisableEdit(true);
      setActionBtns({
        disableSaveBtn: true,
        disableDeleteBtn: true,
        displayDeleteBtn: false,
        hideSaveBtn: true,
      });
    }

    const start = clickInfo.event.startStr.substring(
      0,
      clickInfo.event.startStr.lastIndexOf('-')
    );
    const end = clickInfo.event.endStr.substring(
      0,
      clickInfo.event.endStr.lastIndexOf('-')
    );

    const { title } = clickInfo.event;
    const { isPrivate, description, createdBy } = clickInfo.event.extendedProps;

    setEvent({
      title,
      start,
      end,
      isPrivate,
      description,
      createdById: createdBy._id,
    });
    setModal({
      title: 'Update Event',
      show: true,
    });
  };

  const handleDeleteEvent = () => {
    setActionBtns({
      ...actionBtns,
      disableSaveBtn: true,
      disableDeleteBtn: true,
    });

    deleteEvent()
      .then((res) => {
        console.log(res);

        clickInfoRef.current.value.event.remove();
        clickInfoRef.current.value = null;
      })
      .finally(() =>
        setActionBtns({
          ...actionBtns,
          disableSaveBtn: false,
          disableDeleteBtn: false,
        })
      );
  };

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value });
  };

  return (
    <Fragment>
      {getEventsError && (
        <Alert
          msg={getEventsError.message}
          type="danger"
          ariaLabel="Warning"
          fillType="#exclamation-triangle-fill"
        />
      )}

      {saveEventError && (
        <Alert
          msg={saveEventError.message}
          type="danger"
          ariaLabel="Warning"
          fillType="#exclamation-triangle-fill"
        />
      )}

      {deleteEventError && (
        <Alert
          msg={deleteEventError.message}
          type="danger"
          ariaLabel="Warning"
          fillType="#exclamation-triangle-fill"
        />
      )}

      {modal.show && (
        <Modal
          title={modal.title}
          closeOnSubmit={true}
          disableSubmitBtn={disableSaveBtn}
          hideSubmitBtn={hideSaveBtn}
          disableDeleteBtn={disableDeleteBtn}
          displayDeleteBtn={displayDeleteBtn}
          isSubmitLoading={saveEventLoading}
          isDeleteLoading={deleteEventLoading}
          onClose={() => setModal({ ...modal, show: false })}
          onDelete={handleDeleteEvent}
          onSubmit={handleSaveEvent}
          children={
            <Fragment>
              {!loggedIn && (
                <Alert
                  msg="You must log in to be able to add or edit events."
                  type="warning"
                  ariaLabel="Warning:"
                  fillType="#exclamation-triangle-fill"
                />
              )}
              <EventBody
                event={event}
                disableEdit={disableEdit}
                onChangeValue={(prop, value) =>
                  onChangeValueHandler(prop, value)
                }
                onValidate={(valid) =>
                  setActionBtns({ ...actionBtns, disableSaveBtn: !valid })
                }
              />
            </Fragment>
          }
        />
      )}

      {getEventsLoading || networkStatus === NetworkStatus.refetch ? (
        <Spinner />
      ) : (
        events && (
          <FullCalendarWrapper>
            <FullCalendar
              initialView="dayGridMonth"
              initialEvents={events.eventsData.events as any}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
            />
          </FullCalendarWrapper>
        )
      )}
    </Fragment>
  );
};

export default Calendar;
