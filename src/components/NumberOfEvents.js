import { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    let value = e.target.value;
    setNumber(value);

    let errorText = '';

    // Check if the value is empty, not a number, or less than or equal to 1
    if (value === '' || isNaN(value) || Number(value) <= 0) {
      errorText = 'Please enter a valid number greater than 1.';
    } else {
      errorText = '';
    }

    setCurrentNOE(value);
    setErrorAlert(errorText);
  };

  return (
    <div id="numberOfevents">
      <label className="noe" htmlFor="numberOfeventsInput">
        Number of Events: {''}
      </label>
      <input
        type="text"
        id="numberOfeventsInput"
        className="numberOfeventsInput"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;

NumberOfEvents.propTypes = {
  setCurrentNOE: PropTypes.func.isRequired,
};
