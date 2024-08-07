import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  test('has an element with "textbox" role', () => {
    render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} /> // dummy prop passed so that it is defined
    );
    const textbox = screen.queryByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default number of elements should be 32', () => {
    render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} /> // dummy prop passed so that it is defined
    );
    const textbox = screen.queryByRole('textbox');
    expect(textbox).toHaveValue('32');
  });

  test('number of event elements should change with user input', async () => {
    const user = userEvent.setup();
    render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} /> // dummy prop passed so that it is defined
    );
    const textbox = screen.queryByRole('textbox');
    await user.type(textbox, '{backspace}{backspace}10');
    expect(textbox).toHaveValue('10');
  });
});
