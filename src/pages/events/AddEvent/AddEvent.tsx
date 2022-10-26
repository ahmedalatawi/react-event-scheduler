import { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { MdSaveAlt } from 'react-icons/md';
import EventBody, { EventType } from '../../../components/EventBody/EventBody';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Alert from '../../../components/UI/Alert/Alert';
import AuthContext from '../../../store/auth-context';
import {
  SaveEventMutation,
  useSaveEventMutation,
} from '../../../generated/graphql';
import { IAuth } from '../../../types';
import { ApolloError } from '@apollo/client';
import { updateCacheOnSaveEvent } from '../../../utils/apolloCache';

const initEvent = {
  title: '',
  start: '',
  end: '',
  isPrivate: false,
  description: '',
};

const AddEvent: FC = () => {
  const [event, setEvent] = useState<EventType>(initEvent);
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
  const [displayForm, setDisplayForm] = useState<boolean>(true);

  const { title, start, end, isPrivate, description } = event;

  const [saveEvent, { error, data, loading, reset }] = useSaveEventMutation({
    variables: { event: { id: '', title, start, end, isPrivate, description } },
  });

  const { auth } = useContext(AuthContext);

  const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisplayForm(false);
    saveEvent({
      update(cache, { data }) {
        updateCacheOnSaveEvent(cache, { data }, {});
      },
    })
      .then((_) => {
        setEvent(initEvent);
        setDisableSaveBtn(true);
      })
      .catch((error) => console.error(error.message))
      .finally(() => setDisplayForm(true));
  };

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value });
  };

  return (
    <Fragment>
      <CustomAlert auth={auth} data={data} error={error} onClose={reset} />
      {loading ? (
        <Spinner />
      ) : (
        <form className="row g-3" onSubmit={handleOnSubmit}>
          {displayForm && (
            <div className="col-12">
              <EventBody
                event={event}
                disableEdit={!auth}
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
              disabled={disableSaveBtn || loading || !auth}
            >
              Save <MdSaveAlt />
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

const CustomAlert = ({
  auth,
  data,
  error,
  onClose,
}: {
  auth: IAuth | null;
  data: SaveEventMutation | null | undefined;
  error: ApolloError | undefined;
  onClose: () => void;
}) =>
  !auth ? (
    <Alert
      msg="You must log in to be able to add events."
      type="warning"
      dismissible={false}
    />
  ) : data ? (
    <Alert
      data-testid="success-alert"
      msg="Event was successfully added."
      type="success"
      onClose={onClose}
    />
  ) : error ? (
    <Alert
      msg="Error occurred while saving event! Please try again later."
      type="danger"
      onClose={onClose}
    />
  ) : null;

export default AddEvent;
