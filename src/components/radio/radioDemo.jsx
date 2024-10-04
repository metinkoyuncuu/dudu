import React, { useState } from 'react';
import Radio from './radio';

const RadioDemo = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  return (
    <div>
      <h2>Single Selection (Radio):</h2>
      <Radio
      radioSize='39px'
      radioColor='red'
      checkedColor='red'
        options={options}
        name="singleSelection"
        selectedValue={selectedOption}
        onChange={setSelectedOption}
        direction="vertical"
        isMultiple={false} 
      />
      
      <h2>Multiple Selection (Checkbox):</h2>
      <Radio
      checkedColor='red'
      radioColor='red'
        options={options}
        name="multipleSelection"
        selectedValue={selectedOptions}
        onChange={setSelectedOptions}
        direction="horizontal"
        isMultiple={true} 
      />
      
      <p>Selected option (Single): {selectedOption}</p>
      <p>Selected options (Multiple): {selectedOptions.join(', ')}</p>
    </div>
  );
};

export default RadioDemo;
