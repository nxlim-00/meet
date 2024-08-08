import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumbersOfEvents.feature');
defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 32 is the default number', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppDOM;
    given('the user have just opened the app', () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    and("the user Haven't changed the number of events", () => {});

    let EventListItems;
    when('the user views the events list', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then(
      /^the Number Of Events input field should display (\d+) by default$/,
      (arg0) => {
        const NumberOfEventsDOM = AppDOM.querySelector('#numberOfevents');
        const numberOfEventsInput =
          within(NumberOfEventsDOM).queryByRole('textbox');
        expect(numberOfEventsInput.value).toBe('32');
      }
    );

    and(
      /^the number of events in the list should be (\d+) by default$/,
      (arg0) => {
        expect(EventListItems.length).toBe(32);
      }
    );
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    let AppDOM;
    //let AppComponent;
    given('the user have just opened the app', () => {
      let AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when(
      'the user changes the value of Number Of Events input field',
      async () => {
        const user = userEvent.setup();
        const NumberOfEventsDOM = AppDOM.querySelector('#numberOfevents');
        const numberOfEventsInput =
          within(NumberOfEventsDOM).queryByRole('textbox');
        await user.type(numberOfEventsInput, '{backspace}{backspace}20');
        expect(numberOfEventsInput.value).toBe('20');
      }
    );

    then(
      'the number of events in the list will change accordingly',
      async () => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems.length).toBe(20);
        });
      }
    );
  });
});
