import styled from 'styled-components';

export const FullCalendarWrapper = styled.div`
  a.fc-event,
  a.fc-event:hover {
    cursor: pointer;
  }

  .fc-prev-button,
  .fc-next-button,
  .fc-today-button {
    background-color: white !important;
  }

  .fc-icon-chevron-left,
  .fc-icon-chevron-right,
  .fc-today-button {
    color: black !important;
  }

  .fc .fc-toolbar-title {
    font-size: 20px !important;
  }
`;
