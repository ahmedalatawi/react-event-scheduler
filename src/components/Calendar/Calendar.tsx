import { useState, useRef, Fragment, useContext, useEffect } from 'react';
import Modal from '../UI/Modal/Modal';

import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import EventBody from '../EventBody/EventBody';
import { NetworkStatus, useMutation, useQuery } from '@apollo/client';

import GET_EVENTS from '../../gql/getEvents';
import SAVE_EVENT from '../../gql/saveEvent';
import DELETE_EVENT from '../../gql/deleteEvent';

import Spinner from '../UI/Spinner/Spinner';
import Alert from '../UI/Alert/Alert';

import { IEvent } from '../../interfaces/types';

import './Calendar.css';

import AuthContext from '../../store/auth-context';

const Calendar: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const [eventTitle, setEventTitle] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');

    const [displayDeleteBtn, setDisplayDeleteBtn] = useState<boolean>(false);
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
    const [disableDeleteBtn, setDisableDeleteBtn] = useState<boolean>(false);

    const [loggedIn, setLoggedIn] = useState<boolean>(true);
    const [disableEdit, setDisableEdit] = useState<boolean>(false);

    const calendarApiRef = useRef<any>({});
    const clickInfoRef = useRef<any>({});

    const { loading: getEventsLoading, data: events, error: getEventsError, refetch, networkStatus } = useQuery<EventInput[]>(GET_EVENTS, {
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true
    });

    const [saveEvent, { error: saveEventError, loading: saveEventLoading }] = useMutation<{ saveEvent: IEvent }, { event: IEvent }>(SAVE_EVENT, {
        variables: { event: { id: clickInfoRef.current.value?.event?.id || '', title: eventTitle, start, end, isPrivate, description } }
    });

    const [deleteEvent, { error: deleteEventError, loading: deleteEventLoading }] = useMutation<{ deleteEvent: boolean }, { id: string }>(DELETE_EVENT, {
        variables: { id: clickInfoRef.current.value?.event?.id }
    });

    const authCtx = useContext(AuthContext);

    console.log('Calendar...');

    useEffect(() => {
        const auth = authCtx.getAuth();
        refetch();
        setLoggedIn(!!auth);
        setDisableSaveBtn(!auth);
        setDisableEdit(!auth);
        setDisableDeleteBtn(!auth);
    }, [authCtx, refetch]);


    const handleSaveEvent = () => {
        setDisableSaveBtn(true);
        setDisableDeleteBtn(true);

        calendarApiRef.current.value?.unselect()

        saveEvent().then(res => {
            const { id } = res.data?.saveEvent as IEvent;

            if (clickInfoRef.current.value) {
                clickInfoRef.current.value.event.setProp('title', eventTitle)
                clickInfoRef.current.value.event.setExtendedProp('isPrivate', isPrivate)
                clickInfoRef.current.value.event.setExtendedProp('description', description)
                clickInfoRef.current.value.event.setStart(start)
                clickInfoRef.current.value.event.setEnd(end)
            } else {
                calendarApiRef.current.value.addEvent({
                    id,
                    title: eventTitle,
                    start,
                    end,
                    extendedProps: {
                        isPrivate,
                        description
                    }
                })
            }
        })
            .finally(() => {
                setDisableSaveBtn(false);
                setDisableDeleteBtn(false);
            });
    };

    const handleDateClick = async (selectedDate: DateClickArg) => {
        clickInfoRef.current.value = null;
        calendarApiRef.current.value = selectedDate.view.calendar;

        const auth = authCtx.getAuth();

        setTitle('New Event');
        setEventTitle('');
        setDescription('');
        setStart(`${selectedDate.dateStr}T00:00:00`);
        setEnd(`${selectedDate.dateStr}T01:00:00`);
        setIsPrivate(false);
        setDisplayDeleteBtn(false);
        setDisableSaveBtn(!auth);
        setDisableEdit(!auth);
        setDisableDeleteBtn(!auth);
        setShowModal(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        clickInfoRef.current.value = clickInfo;

        setTitle('Update Event');

        const auth = authCtx.getAuth();

        if (auth) {
            const equal = auth.userId === clickInfo.event.extendedProps.createdBy._id;

            setDisableEdit(!equal);
            setDisableSaveBtn(!equal);
            setDisableDeleteBtn(!equal);
        } else {
            setDisableEdit(true);
            setDisableSaveBtn(true);
            setDisableDeleteBtn(true);
        }

        const startDate = clickInfo.event.startStr.substring(0, clickInfo.event.startStr.lastIndexOf('-'))
        const endDate = clickInfo.event.endStr.substring(0, clickInfo.event.endStr.lastIndexOf('-'))

        setEventTitle(clickInfo.event.title)
        setStart(startDate);
        setEnd(endDate);
        setIsPrivate(clickInfo.event.extendedProps.isPrivate);
        setDescription(clickInfo.event.extendedProps.description);
        setDisplayDeleteBtn(true);
        setShowModal(true);
    };

    const handleDeleteEvent = () => {
        setDisableDeleteBtn(true);
        setDisableSaveBtn(true);

        deleteEvent().then(res => {
            console.log(res)

            clickInfoRef.current.value.event.remove();
            clickInfoRef.current.value = null;
        }
        ).finally(() => {
            setDisableDeleteBtn(false);
            setDisableSaveBtn(false);
        })
    };

    return (
        <Fragment>
            {getEventsError && <Alert
                msg={getEventsError.message}
                type="danger" ariaLabel="Warning"
                fillType="#exclamation-triangle-fill"
            />}

            {saveEventError && <Alert
                msg={saveEventError.message}
                type="danger" ariaLabel="Warning"
                fillType="#exclamation-triangle-fill"
            />}

            {deleteEventError && <Alert
                msg={deleteEventError.message}
                type="danger" ariaLabel="Warning"
                fillType="#exclamation-triangle-fill"
            />}

            {showModal && (
                <Modal
                    title={title}
                    closeOnSubmit={true}
                    disableSubmitBtn={disableSaveBtn}
                    disableDeleteBtn={disableDeleteBtn}
                    displayDeleteBtn={displayDeleteBtn}
                    isSubmitLoading={saveEventLoading}
                    isDeleteLoading={deleteEventLoading}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteEvent}
                    onSubmit={handleSaveEvent}
                    children={
                        <Fragment>
                            {!loggedIn && <Alert msg="You must log in to be able to add or edit events." type="warning" ariaLabel="Warning:" fillType="#exclamation-triangle-fill" />}
                            <EventBody
                                title={eventTitle}
                                start={start}
                                end={end}
                                isPrivate={isPrivate}
                                description={description}
                                disableEdit={disableEdit}
                                onTitle={(title) => setEventTitle(title)}
                                onDescription={(description) => setDescription(description)}
                                onStart={(start) => setStart(start)}
                                onEnd={(end) => setEnd(end)}
                                onIsPrivate={(isPrivate) => setIsPrivate(isPrivate)}
                                onValidate={(valid) => setDisableSaveBtn(!valid)}
                            />
                        </Fragment>
                    }
                />
            )}

            {(getEventsLoading || networkStatus === NetworkStatus.refetch) ? <Spinner /> :
                events && <FullCalendar
                    initialView='dayGridMonth'
                    initialEvents={events}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                //validRange={handleValidRange}
                />
            }
        </Fragment>
    );
};

export default Calendar;
