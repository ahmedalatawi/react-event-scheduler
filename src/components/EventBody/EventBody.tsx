import { useEffect, useState, ChangeEvent } from 'react';
import { IEventBody } from '../../interfaces/types';
import Alert from '../UI/Alert/Alert';

const EventBody: React.FC<IEventBody> = (props) => {
    const [title, setTitle] = useState<string>(props.title);
    const [start, setStart] = useState<string>(props.start);
    const [end, setEnd] = useState<string>(props.end);
    const [description, setDescription] = useState<string>(props.description);

    const [errorMsg, setErrorMsg] = useState<string>('');


    console.log('EventBody running...')

    const validateEventDates = (start: string, end: string, title: string) => {
        const today = new Date();
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            start && setErrorMsg('Start and end date/time must be valid.');
            props.onValidate(false)
        } else if (startDate.getTime() >= endDate.getTime()) {
            setErrorMsg('End date/time must be greater than start date/time.');
            props.onValidate(false)
        } else if (startDate.getTime() < today.getTime()) {
            setErrorMsg('Start date/time can not be in the past.');
            props.onValidate(false)
        } else if (!title.trim()) {
            setErrorMsg('');
            props.onValidate(false)
        } else {
            setErrorMsg('');
            props.onValidate(true);
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setTitle(value);
        validateEventDates(start, end, value);
        props.onTitle(value);
    };

    const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setStart(value);
        validateEventDates(value, end, title);
        props.onStart(value);
    };

    const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setEnd(value);
        validateEventDates(start, value, title);
        props.onEnd(value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setDescription(value);
        props.onDescription(value);
    };

    useEffect(() => {
        const today = new Date();
        const startDate = new Date(start);

        // today.setHours(0,0,0,0)
        // startDate.setHours(0,0,0,0)

        if (startDate.getTime() < today.getTime()) {
            setErrorMsg('Start date/time can not be in the past.');
            props.onValidate(false)
        }
    }, []);

    return (
        <div className="row g-3">
            <div className="col-12 required">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Title" value={title} onChange={handleTitleChange} />
            </div>
            <div className="col-md-6 required">
                <label htmlFor="start" className="form-label">Start</label>
                <input type="datetime-local" className="form-control" id="start" placeholder="Start" value={start} onChange={handleStartChange} />
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