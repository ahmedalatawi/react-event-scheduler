import { Fragment, useRef, useEffect, useState, ChangeEvent } from 'react';
import Alert from '../UI/Alert/Alert';

type EventBodyType = {
    title: string;
    start: string;
    end: string;
    description: string;
    onTitle: (title: string) => void;
    onStart: (date: string) => void;
    onEnd: (date: string) => void;
    onDescription: (description: string) => void;
    onValidate: (valid: boolean) => void;
};

const EventBody: React.FC<EventBodyType> = (props) => {
    const [title, setTitle] = useState<string>(props.title);
    const [start, setStart] = useState<string>(props.start);
    const [end, setEnd] = useState<string>(props.end);
    const [description, setDescription] = useState<string>(props.description);

    const [errorMsg, setErrorMsg] = useState<string>('');


    console.log('EventBody running...')

    const validateEventDates = (start: string, end: string): boolean => {
        let valid = true;

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            setErrorMsg('Start and end date must be valid.');
            valid = false;
            props.onValidate(false)
        } else if (startDate.getTime() >= endDate.getTime()) {
            setErrorMsg('End date must be greater than start date.');
            valid = false;
            props.onValidate(false)
        } else {
            setErrorMsg('');
            valid = true;
            props.onValidate(true);
        }
        //startDate.getTime() >= endDate.getTime() ? setIsEventValid(false) : setIsEventValid(true);
        //(startDate == 'Invalid Date' || endDate == 'Invalid Date') ? setIsEventValid(false) : setIsEventValid(true);
        console.log('validateEventDates ', startDate)

        return valid;
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTitle(value);
        props.onTitle(value);
    };

    const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        setStart(value);
        validateEventDates(value, end) && props.onStart(value);
    };

    const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        setEnd(value);
        validateEventDates(start, value) && props.onEnd(value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setDescription(value);
        props.onDescription(value);
    };

    return (
        <div className="row g-3">
            <div className="col-12 required">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Title" value={title} onChange={handleTitleChange} />
            </div>
            <div className="col-md-6 required">
                <label htmlFor="start" className="form-label">Start</label>
                <input type="datetime-local" className="form-control" id="start" placeholder="Start" max={end} value={start} onChange={handleStartChange} />
            </div>
            <div className="col-md-6 required">
                <label htmlFor="end" className="form-label">End</label>
                <input type="datetime-local" className="form-control" id="end" min={start} value={end} placeholder="End" onChange={handleEndChange} />
            </div>
            {errorMsg && <div className="col-12">
                <Alert msg={errorMsg} type="warning" ariaLabel="Warning" fillType="#exclamation-triangle-fill" />
            </div>}
            <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows={3} value={description} onChange={handleDescriptionChange}></textarea>
            </div>
        </div>
    );
};

export default EventBody;