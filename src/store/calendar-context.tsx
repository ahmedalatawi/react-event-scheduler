import React from 'react';

export type SearchEventsFilterType = {
  searchText: string;
  pageSize: number;
  pageNumber: number;
  currentCheck: boolean;
  expiredCheck: boolean;
};

type Props = {
  startDate: string;
  endDate: string;
  eventIdToRemove: string;
  searchEventsFilter: SearchEventsFilterType;
  addSearchEventsFilter: (filter: SearchEventsFilterType) => void;
  addStartDate: (date: string) => void;
  addEndDate: (date: string) => void;
  removeEventId: (id: string) => void;
};

const searchEventsFilter = {
  searchText: '',
  pageSize: 20,
  pageNumber: 1,
  currentCheck: false,
  expiredCheck: false,
};

const CalendarContext = React.createContext<Props>({
  startDate: '',
  endDate: '',
  eventIdToRemove: '',
  searchEventsFilter: searchEventsFilter,
  addSearchEventsFilter: () => null,
  addStartDate: () => null,
  addEndDate: () => null,
  removeEventId: () => null,
});

export default CalendarContext;
