import { DateTime } from 'luxon'
import { EventFull } from '../generated/graphql'

export const dateToTitle = (event: EventFull) =>
  `${DateTime.fromISO(event.start).toFormat('ff')} - ${DateTime.fromISO(
    event.end,
  ).toFormat('ff')}`

export const formatDateTime = (date: number) =>
  DateTime.fromMillis(date).toFormat('ff')
