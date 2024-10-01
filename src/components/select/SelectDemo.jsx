import React from 'react'
import Select from './select';

function SelectDemo() {
    // Seçenekleri burada tanımlıyoruz
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  const handleSelectChange = (event) => {
    console.log('Selected value:', event.target.value);
  };
    return (
        <>
        <Select 
        options={options} 
        onChange={handleSelectChange} 
        placeholder="Select "
        backgroundColor={'white'}
        width={'10%'}
        //borderWidth={'9px'}
        borderColor={'green'}
        isSearchable={false}
      />
       <Select 
        options={options} 
        onChange={handleSelectChange} 
        placeholder="Select "
        backgroundColor={'white'}
        width={'10%'}
        //borderWidth={'9px'}
        borderColor={'green'}
        isSearchable={true}
      />
        </>
    )
}

export default SelectDemo
