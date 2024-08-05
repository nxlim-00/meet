import Event from './Event';

// OPTION 1: add empty array when prop is extracted
/* const EventList = ({ events = [] }) => {
  return (
    <ul id="event-list">
      {events.map((event) => (
        <Event event={event} />
      ))}
    </ul>
  );
};

export default EventList; */

// OPTION 2: only call map function when "events" is declared
const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};

export default EventList;
