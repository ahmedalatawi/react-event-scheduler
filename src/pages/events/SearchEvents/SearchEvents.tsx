import { NetworkStatus } from '@apollo/client';
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Card from '../../../components/UI/Card/Card';
import Alert from '../../../components/UI/Alert/Alert';
import Pagination from '../../../components/Pagination/Pagination';
import { IEvent } from '../../../interfaces/types';
import AuthContext from '../../../store/auth-context';
import Modal from '../../../components/UI/Modal/Modal';
import EventBody, { EventType } from '../../../components/EventBody/EventBody';
import { Form } from 'react-bootstrap';
import {
  useDeleteEventMutation,
  useGetEventsQuery,
  useSaveEventMutation,
} from '../../../generated/graphql';
import { EventCardContainer, EventCardWrapper } from './styles';

const EVENTS_PER_PAGE = 20;

const SearchEvents: FC = () => {
  const [modal, setModal] = useState({
    title: '',
    show: false,
  });

  const [event, setEvent] = useState<EventType>({
    id: '',
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
    disableSaveBtn: false,
    disableDeleteBtn: false,
  });

  const [formProps, setFormProps] = useState({
    searchText: '',
    currentPage: 1,
    allCheck: true,
    currentCheck: false,
    expiredCheck: false,
  });

  const authCtx = useContext(AuthContext);

  const { searchText, currentPage, allCheck, currentCheck, expiredCheck } =
    formProps;
  const { id, title, start, end, isPrivate, description, createdById } = event;
  const { displayDeleteBtn, hideSaveBtn, disableSaveBtn, disableDeleteBtn } =
    actionBtns;

  const debouncedSearchText = useDebounce(searchText);

  const { loading, data, error, refetch, networkStatus } = useGetEventsQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      filter: {
        searchText: debouncedSearchText.trim(),
        pageSize: EVENTS_PER_PAGE,
        pageNumber: currentPage,
        currentCheck,
        expiredCheck,
      },
    },
  });

  const [saveEvent, { error: saveEventError, loading: saveEventLoading }] =
    useSaveEventMutation();

  const [
    deleteEvent,
    { error: deleteEventError, loading: deleteEventLoading },
  ] = useDeleteEventMutation();

  const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch();
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormProps({ ...formProps, searchText: event.target.value });
  };

  const getExSubTitle = (endTime: string) => {
    const today = new Date();
    const endDate = new Date(endTime);

    return endDate.getTime() < today.getTime() ? 'Expired' : '';
  };

  const clickEventHandler = (event: IEvent) => {
    const auth = authCtx.getAuth();
    const { id, title, start, end, isPrivate, description, createdBy } = event;

    if (auth) {
      const equal = auth.userId === createdBy._id;
      setActionBtns({
        ...actionBtns,
        displayDeleteBtn: equal,
        hideSaveBtn: !equal,
        disableSaveBtn: !equal,
      });
    } else {
      setActionBtns({
        ...actionBtns,
        displayDeleteBtn: false,
        hideSaveBtn: true,
      });
    }

    setEvent({
      id: id ?? '',
      title,
      start,
      end,
      description,
      isPrivate,
      createdById: createdBy._id,
    });
    setModal({ title: 'Update Event', show: true });
  };

  const handleDeleteEvent = () => {
    setActionBtns({
      ...actionBtns,
      disableDeleteBtn: true,
      disableSaveBtn: true,
    });

    deleteEvent({
      variables: { id: id ?? '' },
    })
      .then(() => {
        resetCurrentPage();
        refetch();
      })
      .finally(() =>
        setActionBtns({
          ...actionBtns,
          disableDeleteBtn: false,
          disableSaveBtn: false,
        })
      );
  };

  const handleSaveEvent = () => {
    setActionBtns({
      ...actionBtns,
      disableDeleteBtn: true,
      disableSaveBtn: true,
    });

    saveEvent({
      variables: {
        event: {
          id: id ?? '',
          title,
          start,
          end,
          isPrivate,
          description,
        },
      },
    })
      .then(() => refetch())
      .finally(() =>
        setActionBtns({
          ...actionBtns,
          disableDeleteBtn: false,
          disableSaveBtn: false,
        })
      );
  };

  const resetCurrentPage = () => setFormProps({ ...formProps, currentPage: 1 });

  useEffect(() => {
    resetCurrentPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  useEffect(() => {
    resetCurrentPage();
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCtx, refetch]);

  const handleFilterByAllEventsChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setFormProps({
      ...formProps,
      currentPage: 1,
      currentCheck: false,
      allCheck: !allCheck,
      expiredCheck: false,
    });
  };

  const handleFilterByCurrentEventsChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.persist();
    setFormProps({
      ...formProps,
      currentPage: 1,
      currentCheck: !currentCheck,
      allCheck: false,
      expiredCheck: false,
    });
  };

  const handleFilterByExpiredEventsChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.persist();
    setFormProps({
      ...formProps,
      currentPage: 1,
      currentCheck: false,
      allCheck: false,
      expiredCheck: !expiredCheck,
    });
  };

  const onChangeValueHandler = (prop: string, value: string | boolean) => {
    setEvent({ ...event, [prop]: value });
  };

  const disableEditHandler = () => {
    const auth = authCtx.getAuth();
    return auth && auth.userId === event.createdById;
  };

  return (
    <>
      {error && (
        <Alert
          msg={error.message}
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

      <Form>
        <div className="mb-4">
          <span className="me-3 fs-5">Filter by: </span>
          <Form.Check
            inline
            label="All"
            name="group"
            type="radio"
            defaultChecked={allCheck}
            onChange={handleFilterByAllEventsChange}
          />
          <Form.Check
            inline
            label="Active"
            name="group"
            type="radio"
            defaultChecked={currentCheck}
            onChange={handleFilterByCurrentEventsChange}
          />
          <Form.Check
            inline
            label="Expired"
            name="group"
            type="radio"
            defaultChecked={expiredCheck}
            onChange={handleFilterByExpiredEventsChange}
          />
        </div>
      </Form>

      <form
        className="d-flex"
        onSubmit={handleOnSubmit}
        data-testid="SearchBoxForm"
      >
        <input
          value={searchText}
          data-testid="SearchBoxInput"
          className="form-control"
          type="search"
          placeholder="Search events by title"
          aria-label="Search"
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
                  isPrivate={event.isPrivate}
                  title={event.title ?? ''}
                  subtitle={`${new Date(
                    event.start as string
                  ).toLocaleString()} - ${new Date(
                    event.end as string
                  ).toLocaleString()}`}
                  exSubTitle={getExSubTitle(event.end as string)}
                  content={event.description}
                  url={event.url ?? ''}
                  createdBy={event?.createdBy?.username ?? ''}
                  createdAt={event.createdAt as any}
                  updatedAt={event.updatedAt as any}
                  onClick={() => clickEventHandler(event as IEvent)}
                />
              </EventCardWrapper>
            );
          })
        ) : !error ? (
          <div className="event-card">
            <Alert
              msg="No results were found."
              type="warning"
              ariaLabel="Warning:"
              fillType="#exclamation-triangle-fill"
            />
          </div>
        ) : null}
      </EventCardContainer>

      {!loading && (
        <div className="float-end">
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

      {modal.show && (
        <Modal
          title={modal.title}
          closeOnSubmit={true}
          disableSubmitBtn={disableSaveBtn}
          hideSubmitBtn={hideSaveBtn}
          displayDeleteBtn={displayDeleteBtn}
          disableDeleteBtn={disableDeleteBtn}
          isSubmitLoading={saveEventLoading}
          isDeleteLoading={deleteEventLoading}
          closeBtnName={
            authCtx.auth?.userId === createdById ? 'Cancel' : 'Close'
          }
          onClose={() => setModal({ ...modal, show: false })}
          onDelete={handleDeleteEvent}
          onSubmit={handleSaveEvent}
          children={
            <EventBody
              event={event}
              disableEdit={!disableEditHandler()}
              onChangeValue={(prop, value) => onChangeValueHandler(prop, value)}
              onValidate={(valid) =>
                setActionBtns({ ...actionBtns, disableSaveBtn: !valid })
              }
            />
          }
        />
      )}
    </>
  );
};

export default SearchEvents;
