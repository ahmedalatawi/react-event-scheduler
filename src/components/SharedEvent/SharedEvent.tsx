import { useMutation } from '@apollo/client';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { IEvent } from '../../interfaces/types';
import CardView from '../UI/CardView/CardView';

import GET_EVENT from '../../gql/getEvent';
import Alert from '../UI/Alert/Alert';
import Spinner from '../UI/Spinner/Spinner';

const SharedEvent: FC = () => {
  const [getEvent, { data, loading, error }] = useMutation<
    { getEvent: IEvent },
    { id: string }
  >(GET_EVENT);

  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    getEvent({ variables: { id: id ?? '' } });
  }, [getEvent, id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert
        msg={error.message}
        type="danger"
        ariaLabel="Warning"
        fillType="#exclamation-triangle-fill"
      />
    );
  }

  return (
    <CardView
      title={data?.getEvent.title ?? ''}
      subtitle={`${new Date(
        data?.getEvent.start as string
      ).toLocaleString()} - ${new Date(
        data?.getEvent.end as string
      ).toLocaleString()}`}
      content={data?.getEvent.description ?? ''}
      createdBy={data?.getEvent.createdBy?.username}
      createdAt={data?.getEvent.createdAt}
      updatedAt={data?.getEvent.updatedAt}
    />
  );
};

export default SharedEvent;
