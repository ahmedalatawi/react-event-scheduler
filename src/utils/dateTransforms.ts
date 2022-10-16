import { EventFull } from '../generated/graphql';

export const dateToTitle = (event: EventFull) =>
  `${new Date(event.start).toLocaleString()} - ${new Date(
    event.end
  ).toLocaleString()}`;

export const formatDate = (date: number) => new Date(date).toLocaleString();
