import { useState, useRef, Fragment } from 'react';
import Modal from '../UI/Modal/Modal';

import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate, EventInput, DateInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import EventBody from '../EventBody/EventBody';

const Calendar = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const [eventTitle, setEventTitle] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [displayDeleteBtn, setDisplayDeleteBtn] = useState<boolean>(false);
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false);

    let eventGuid = 0
    let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
    let day = 60 * 60 * 24 * 1000;

    let today = new Date();
    let endDate = new Date(today.getTime() + day);

    // const [calendarEvents, setCalendarEvents] = useState<EventInput[]>(
    //     [
    //         {
    //             id: 'sdfsdf',
    //             title: 'All-day event',
    //             start: todayStr,
    //             end: endDate
    //         },
    //         {
    //             id: 'sdgdsgds',
    //             title: 'Timed event',
    //             start: todayStr + 'T12:00:00'
    //         }
    //     ]
    // );

    const calendarApiRef = useRef<any>({});
    const clickInfoRef = useRef<any>({});

    const closeModal = () => {
        console.log('closing modal ...');
        setShowModal(false);
    };

    const INITIAL_EVENTS: EventInput[] = [
        {
            id: 'sdfsdf',
            title: 'All-day event',
            start: todayStr,
            end: endDate
        },
        {
            id: 'sdgdsgds',
            title: 'Timed event',
            start: todayStr + 'T12:00:00'
        }
    ];

    const saveEvent = () => {
        console.log('saving event ', end);

        calendarApiRef.current.value.unselect() // clear date selection

        if (clickInfoRef.current.value) {
            clickInfoRef.current.value.event.setProp('title', eventTitle)
            clickInfoRef.current.value.event.setExtendedProp('description', description)
            clickInfoRef.current.value.event.setStart(start)
            clickInfoRef.current.value.event.setEnd(end)
        } else {
            calendarApiRef.current.value.addEvent({
                id: '234234fgfdgfdg',
                title: eventTitle,
                start,
                end,
                extendedProps: {
                    description
                }
                // allDay: selectInfo.allDay
            })

            // calendarApiRef.current.value.mutate({
            //     extendedProps: {
            //         description: 'have some fun!'
            //     },
            //   })
        }
        setShowModal(false);
    };

    const handleDateClick = async (selectedDate: DateClickArg) => {
        console.log(selectedDate);
        clickInfoRef.current.value = null;
        calendarApiRef.current.value = selectedDate.view.calendar;

        const response = await fetch("/api/users/1234");
        const body = await response.json();

        console.log(body);

        setTitle('New Event');
        setEventTitle('');
        setDescription('');
        setStart(`${selectedDate.dateStr}T12:00:00`);
        setEnd(`${selectedDate.dateStr}T13:00:00`);
        setDisplayDeleteBtn(false);
        setDisableSaveBtn(true);
        setShowModal(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        clickInfoRef.current.value = clickInfo;

        setTitle('Update Event');
        
        console.log('start ', clickInfo.event.startStr)
        console.log('end ', clickInfo.event.endStr)
        console.log('title ', clickInfo.event.title)
        //console.log('title ', clickInfo.event.display)
        //if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //clickInfo.event.remove()
        //}

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

    const handleTitleChange = (title: string) => {
        setEventTitle(title);
        setDisableSaveBtn(!title.trim());
    };

    const handleStartChange = (start: string) => {
        console.log('start: ', start)
        setStart(start);
    };

    const handleEndChange = (end: string) => {
        console.log('end: ', end)
        setEnd(end);
    };

    const handleDescriptionChange = (description: string) => {
        setDescription(description);
    };

    const handleSaveBtnStatus = (valid: boolean) => {
        setDisableSaveBtn(!valid);
    };

    const deleteEvent = () => {
        clickInfoRef.current.value.event.remove();
        clickInfoRef.current.value = null;
        setShowModal(false);
    };

    // const handleDateSelect = (selectInfo: DateSelectArg) => {
    //     console.log('handleDateSelect ', selectInfo)
    //     let title = prompt('Please enter a new title for your event')
    //     let calendarApi = selectInfo.view.calendar

    //     calendarApi.unselect() // clear date selection

    //     // if (title) {
    //     //   calendarApi.addEvent({
    //     //     id: createEventId(),
    //     //     title,
    //     //     start: selectInfo.startStr,
    //     //     end: selectInfo.endStr,
    //     //     allDay: selectInfo.allDay
    //     //   })
    //     // }
    // };

    return (
        <Fragment>
            {showModal && (
                <Modal
                    title={title}
                    disableSaveBtn={disableSaveBtn}
                    displayDeleteBtn={displayDeleteBtn}
                    onClose={closeModal}
                    onDelete={deleteEvent}
                    onSave={saveEvent}
                    children={
                        <EventBody
                            title={eventTitle}
                            start={start}
                            end={end}
                            description={description}
                            onTitle={handleTitleChange}
                            onDescription={handleDescriptionChange}
                            onStart={handleStartChange}
                            onEnd={handleEndChange}
                            onValidate={handleSaveBtnStatus}
                        />
                    }
                />
            )}

            <FullCalendar
                initialView='dayGridMonth'
                initialEvents={INITIAL_EVENTS}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
            />
        </Fragment>
    );
};

export default Calendar;
