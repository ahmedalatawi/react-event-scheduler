import { useEffect, useState, ChangeEvent, FC, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Alert from '../UI/Alert/Alert';

export type EventType = {
  id?: string;
  title: string;
  start: string;
  end: string;
  isPrivate: boolean;
  description: string;
  createdById?: string;
};

type Props = {
  event: EventType;
  disableEdit: boolean;
  onChangeValue: (prop: string, value: string | boolean) => void;
  onValidate: (valid: boolean) => void;
};

const EventBody: FC<Props> = ({
  event,
  disableEdit,
  onChangeValue,
  onValidate,
}) => {
  const [localEvent, setLocalEvent] = useState<EventType>({ ...event });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const authCtx = useContext(AuthContext);

  const validateEventDates = (start: string, end: string, title: string) => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      onValidate(false);
    } else if (startDate.getTime() >= endDate.getTime()) {
      setErrorMsg('End date/time must be greater than start date/time.');
      onValidate(false);
    } else if (startDate.getTime() < today.getTime()) {
      setErrorMsg('Start date/time can not be in the past.');
      onValidate(false);
    } else if (!title.trim()) {
      setErrorMsg('');
      onValidate(false);
    } else {
      setErrorMsg('');
      onValidate(true);
    }
  };

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    const { value } = event.target;

    setLocalEvent({ ...localEvent, [prop]: value });

    if (prop === 'title') {
      validateEventDates(localEvent.start, localEvent.end, value);
    }
    if (prop === 'start') {
      validateEventDates(value, localEvent.end, localEvent.title);
    }
    if (prop === 'end') {
      validateEventDates(localEvent.start, value, localEvent.title);
    }

    onChangeValue(prop, value);
  };

  useEffect(() => {
    const auth = authCtx.getAuth();
    if (auth) {
      if (
        auth.userId === localEvent.createdById ||
        localEvent.createdById === ''
      ) {
        validateEventDates(localEvent.start, localEvent.end, localEvent.title);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx]);

  return (
    <div className="row g-3">
      <div className="col-12 required">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          disabled={disableEdit}
          id="title"
          placeholder="Title"
          maxLength={50}
          value={localEvent.title}
          onChange={(e) => handleValueChange(e, 'title')}
        />
      </div>
      <div className="col-md-6 required">
        <label htmlFor="start" className="form-label">
          Start
        </label>
        <input
          type="datetime-local"
          className="form-control"
          disabled={disableEdit}
          id="start"
          placeholder="Start"
          value={localEvent.start}
          onChange={(e) => handleValueChange(e, 'start')}
        />
      </div>
      <div className="col-md-6 required">
        <label htmlFor="end" className="form-label">
          End
        </label>
        <input
          type="datetime-local"
          className="form-control"
          disabled={disableEdit}
          id="end"
          min={localEvent.start}
          value={localEvent.end}
          placeholder="End"
          onChange={(e) => handleValueChange(e, 'end')}
        />
      </div>
      {errorMsg && !disableEdit && (
        <div className="col-12">
          <Alert
            msg={errorMsg}
            type="warning"
            ariaLabel="Warning"
            fillType="#exclamation-triangle-fill"
          />
        </div>
      )}
      <div className="col-12">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          disabled={disableEdit}
          id="description"
          rows={3}
          value={localEvent.description}
          maxLength={1000}
          onChange={(e) => handleValueChange(e, 'description')}
        ></textarea>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            disabled={disableEdit}
            id="gridCheck"
            checked={localEvent.isPrivate}
            onChange={(e) => handleValueChange(e, 'isPrivate')}
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Private (event is only visible to you)
          </label>
        </div>
      </div>
    </div>
  );
};

export default EventBody;
