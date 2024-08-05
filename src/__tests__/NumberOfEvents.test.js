import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test('render element with role of textbox', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('default number of events is 32', () => {
    expect(NumberOfEventsComponent.getByRole('textbox')).toHaveValue('32');
  });

  test('change number of events when a user types in the textbox', async () => {
    const numverOfEvents = NumberOfEventsComponent.getByRole('textbox');
    const user = userEvent.setup();
    await user.type(numverOfEvents, '{backspace}{backspace}10');
    NumberOfEventsComponent.rerender(<NumberOfEvents />);
    expect(numverOfEvents).toHaveValue('10');
  });
});
