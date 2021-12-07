import { useState, useRef, Fragment } from 'react';
import Modal from '../UI/Modal/Modal';

import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import EventBody from '../EventBody/EventBody';
import { useMutation, useQuery } from '@apollo/client';

import GET_EVENTS from '../../gql/getEvents';
import SAVE_EVENT from '../../gql/saveEvent';
import DELETE_EVENT from '../../gql/deleteEvent';

import Spinner from '../UI/Spinner/Spinner';
import Alert from '../UI/Alert/Alert';

import { IEvent } from '../../interfaces/types';

import './Calendar.css';

const Calendar = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const [eventTitle, setEventTitle] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [displayDeleteBtn, setDisplayDeleteBtn] = useState<boolean>(false);
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
    const [disableDeleteBtn, setDisableDeleteBtn] = useState<boolean>(false);

    const calendarApiRef = useRef<any>({});
    const clickInfoRef = useRef<any>({});

    const { loading: getEventsLoading, data: events, error: getEventsError } = useQuery<EventInput[]>(GET_EVENTS, { fetchPolicy: 'no-cache' });

    const [saveEvent, { error: saveEventError, loading: saveEventLoading }] = useMutation<{ saveEvent: IEvent }, { event: IEvent }>(SAVE_EVENT, {
        variables: { event: { id: clickInfoRef.current.value?.event?.id || '', title: eventTitle, start, end, description } }
    });

    const [deleteEvent, { error: deleteEventError, loading: deleteEventLoading }] = useMutation<{ deleteEvent: boolean }, { id: string }>(DELETE_EVENT, {
        variables: { id: clickInfoRef.current.value?.event?.id }
    });

    const handleSaveEvent = () => {
        setDisableSaveBtn(true);
        setDisableDeleteBtn(true);

        calendarApiRef.current.value?.unselect()

        saveEvent().then(res => {
            const { id } = res.data?.saveEvent as IEvent;

            if (clickInfoRef.current.value) {
                clickInfoRef.current.value.event.setProp('title', eventTitle)
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

        setTitle('New Event');
        setEventTitle('');
        setDescription('');
        setStart(`${selectedDate.dateStr}T00:00:00`);
        setEnd(`${selectedDate.dateStr}T01:00:00`);
        setDisplayDeleteBtn(false);
        setDisableSaveBtn(true);
        setShowModal(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        clickInfoRef.current.value = clickInfo;

        setTitle('Update Event');

        const startDate = clickInfo.event.startStr.substring(0, clickInfo.event.startStr.lastIndexOf('-'))
        const endDate = clickInfo.event.endStr.substring(0, clickInfo.event.endStr.lastIndexOf('-'))

        setEventTitle(clickInfo.event.title)
        setStart(startDate);
        setEnd(endDate);
        setDescription(clickInfo.event.extendedProps.description);
        setDisplayDeleteBtn(true);
        setDisableSaveBtn(false);
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
            {getEventsError && <Alert msg="Error occurred while retrieving events! Please try again later." type="danger" ariaLabel="Warning" fillType="#exclamation-triangle-fill" />}
            {saveEventError && <Alert msg="Error occurred while saving event! Please try again later." type="danger" ariaLabel="Warning" fillType="#exclamation-triangle-fill" />}
            {deleteEventError && <Alert msg="Error occurred while deleting event! Please try again later." type="danger" ariaLabel="Warning" fillType="#exclamation-triangle-fill" />}
            {showModal && (
                <Modal
                    title={title}
                    disableSaveBtn={disableSaveBtn}
                    disableDeleteBtn={disableDeleteBtn}
                    displayDeleteBtn={displayDeleteBtn}
                    isSaveLoading={saveEventLoading}
                    isDeleteLoading={deleteEventLoading}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeleteEvent}
                    onSave={handleSaveEvent}
                    children={
                        <EventBody
                            title={eventTitle}
                            start={start}
                            end={end}
                            description={description}
                            onTitle={(title) => setEventTitle(title)}
                            onDescription={(description) => setDescription(description)}
                            onStart={(start) => setStart(start)}
                            onEnd={(end) => setEnd(end)}
                            onValidate={(valid) => setDisableSaveBtn(!valid)}
                        />
                    }
                />
            )}

            {getEventsLoading ? <Spinner /> :
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
