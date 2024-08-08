import { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    setCurrentNOE(value);
  };

  return (
    <div id="numberOfevents">
      <label className="noe" htmlFor="numberOfeventsInput">
        Number of Events:{' '}
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
