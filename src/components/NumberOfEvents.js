import { useState } from 'react';

const NumberOfEvents = () => {
  const [number, setNumber] = useState(32);
  const [newValue, setNewValue] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const handleInputChanged = (e) => {
    setNewValue(e.target.value);
    setIsChanged(true);

    if (e.target.value === '') {
      setNumber(0);
    } else {
      setNumber(e.target.value);
    }
  };

  return (
    <div id="numberOfevents">
      <label>Number of Events:</label>
      <input
        type="text"
        className="number"
        value={isChanged ? newValue : number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
