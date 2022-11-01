import { FC, useState } from 'react';
import CalendarContext, { SearchEventsFilterType } from './calendar-context';

const CalendarProvider: FC = ({ children }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [eventIdToRemove, setEventIdToRemove] = useState<string>('');
  const [searchEventsFilter, setSearchEventsFilter] =
    useState<SearchEventsFilterType>({
      searchText: '',
      pageSize: 20,
      pageNumber: 1,
      currentCheck: false,
      expiredCheck: false,
    });

  const calendarContext = {
    startDate,
    endDate,
    eventIdToRemove,
    searchEventsFilter,
    addSearchEventsFilter: setSearchEventsFilter,
    addStartDate: setStartDate,
    addEndDate: setEndDate,
    removeEventId: setEventIdToRemove,
  };

  return (
    <CalendarContext.Provider value={calendarContext}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
