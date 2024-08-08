import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user have just opened the app', () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;
    when('the user views the events list', async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('all events details should be hidden', async () => {
      await waitFor(() => {
        EventListItems.forEach((eventListItem) => {
          expect(
            eventListItem.querySelector('.details')
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppComponent;
    given('the user have just opened the app', () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;
    when(
      'the user clicks on the details button of one of the events',
      async () => {
        const user = userEvent.setup();
        AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');
        let detailsBtn;
        await waitFor(() => {
          EventListItems = within(EventListDOM).queryAllByRole('listitem');
          detailsBtn = within(EventListItems[0]).queryByText('show details');
        });
        await user.click(detailsBtn);
      }
    );

    then("the event's details should be shown", async () => {
      const details = EventListItems[0].querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    and(
      "the event's details button title will be adjusted to (hide details)",
      () => {
        const detailsBtn = within(EventListItems[0]).queryByText(
          'hide details'
        );
        expect(detailsBtn.textContent).toBe('hide details');
      }
    );
  });

  test('User can collapse an event to hide its details.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppDOM;
    let EventListItems;
    let detailsBtn;
    given("the event's details are shown", async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('show details');
      });
      await user.click(detailsBtn);
      expect(EventListItems[0].querySelector('.details')).toBeInTheDocument();
    });

    and("the event's details button title is (hide details)", () => {
      expect(detailsBtn.textContent).toBe('hide details');
    });

    when('the user clicks on details button of that event.', async () => {
      const user = userEvent.setup();
      await user.click(detailsBtn);
    });

    then("the event's details should be hidden.", () => {
      expect(
        EventListItems[0].querySelector('.details')
      ).not.toBeInTheDocument();
    });

    and(
      "the event's details button title will be adjusted to (show details)",
      () => {
        expect(detailsBtn.textContent).toBe('show details');
      }
    );
  });
});
