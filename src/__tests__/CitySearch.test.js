import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App';

describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const cityTextBox = queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const suggestionList = queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const { queryByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const user = userEvent.setup();
    const cityTextBox = queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const { rerender, queryByRole, queryAllByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );

    // user types "Berlin" in city textbox
    rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const cityTextBox = queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const { rerender, queryByRole, queryAllByRole } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );

    rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
    const cityTextBox = queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const AppDOM = container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    // fetch events and locations
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    // wait for suggestion to render
    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
