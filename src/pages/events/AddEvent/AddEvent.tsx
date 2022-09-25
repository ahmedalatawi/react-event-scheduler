import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { MdSaveAlt } from 'react-icons/md';
import EventBody, { EventType } from '../../../components/EventBody/EventBody';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Alert from '../../../components/UI/Alert/Alert';
import AuthContext from '../../../store/auth-context';
import { useSaveEventMutation } from '../../../generated/graphql';

const AddEvent: FC = () => {
  const [event, setEvent] = useState<EventType>({
    title: '',
    start: '',
    end: '',
    isPrivate: false,
    description: '',
  });
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
  const [displayForm, setDisplayForm] = useState<boolean>(true);

  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const { title, start, end, isPrivate, description } = event;

  const [saveEvent, { error, data, loading }] = useSaveEventMutation({
    variables: { event: { id: '', title, start, end, isPrivate, description } },
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => setLoggedIn(!!authCtx.getAuth()), [authCtx]);

  const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisplayForm(false);
    saveEvent()
      .then((_) => {
        setEvent({
          title: '',
          start: '',
          end: '',
          isPrivate: false,
          description: '',
        });
        setDisableSaveBtn(true);
      })
      .catch((error) => console.error(error.message))
      .finally(() => setDisplayForm(true));
  };

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value });
  };

  return (
    <div>
      {!loggedIn && (
        <Alert
          msg="You must log in to be able to add events."
          type="warning"
          ariaLabel="Warning:"
          fillType="#exclamation-triangle-fill"
        />
      )}
      {data && (
        <Alert
          msg="Event was successfully added."
          type="success"
          ariaLabel="Success:"
          fillType="#check-circle-fill"
        />
      )}
      {error && (
        <Alert
          msg="Error occurred while saving event! Please try again later."
          type="danger"
          ariaLabel="Warning"
          fillType="#exclamation-triangle-fill"
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <form className="row g-3" onSubmit={handleOnSubmit}>
          {displayForm && (
            <div className="col-12">
              <EventBody
                event={event}
                disableEdit={!loggedIn}
                onChangeValue={(prop, value) =>
                  onChangeValueHandler(prop, value)
                }
                onValidate={(valid) => setDisableSaveBtn(!valid)}
              />
            </div>
          )}

          <div className="col-12 mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disableSaveBtn || loading || !loggedIn}
            >
              Save <MdSaveAlt />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEvent;
