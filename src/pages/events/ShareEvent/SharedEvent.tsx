import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import CardView from '../../../components/UI/CardView/CardView';
import Alert from '../../../components/UI/Alert/Alert';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { useGetEventMutation } from '../../../generated/graphql';

const SharedEvent: FC = () => {
  const [getEvent, { data, loading, error }] = useGetEventMutation();

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
      createdBy={data?.getEvent.createdBy?.username ?? ''}
      createdAt={data?.getEvent.createdAt as any}
      updatedAt={data?.getEvent.updatedAt as any}
    />
  );
};

export default SharedEvent;
