import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#numberOfevents')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    // userEvent is set, the App component and its DOM are mocked
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // reference to the CitySearch component root DOM node is initialized
    const CitySearchDOM = AppDOM.querySelector('#city-search');

    // query is performed to find the city input text box in it
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    // code simulates typing “Berlin” in the city textbox
    await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany');

    // clicking on the list item that contains “Berlin, Germany”
    await user.click(berlinSuggestionItem);

    // queries #event-list and finds what Event list item is rendered inside it
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem');

    // gets a list of all events from the mock data that are located in “Berlin, Germany”
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === 'Berlin, Germany'
    );

    // comparing the number of events located in "Berlin, Germany" with the array of rendered Event list items
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    // looping over the filtered event list items
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });
});
