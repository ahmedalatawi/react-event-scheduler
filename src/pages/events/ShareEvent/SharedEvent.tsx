import { useEffect } from 'react'
import { useParams } from 'react-router'
import CardView from '../../../components/ui/CardView/CardView'
import Alert from '../../../components/ui/Alert/Alert'
import Spinner from '../../../components/ui/Spinner/Spinner'
import { type EventFull, useGetEventMutation } from '../../../generated/graphql'
import { dateToTitle } from '../../../utils/dateTransforms'

const SharedEvent = () => {
  const [getEvent, { data, loading, error }] = useGetEventMutation()

  const { id } = useParams()

  useEffect(() => {
    getEvent({ variables: { id: id ?? '' } })
  }, [getEvent, id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Alert msg={error.message} type='danger' dismissible={false} />
  }

  const card = {
    title: data?.getEvent.title,
    subtitle: data?.getEvent && dateToTitle(data?.getEvent as EventFull),
    content: data?.getEvent.description,
    createdBy: data?.getEvent.createdBy?.username,
    createdAt: data?.getEvent.createdAt,
    updatedAt: data?.getEvent.updatedAt,
  }

  return <CardView card={card} />
}

export default SharedEvent
