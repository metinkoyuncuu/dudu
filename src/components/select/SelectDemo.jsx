import React, { useEffect, useState } from 'react'
import Select from './select';
import { useSelect } from 'react-select-search';
import MyMultiSelect from './searchselect';
import SelectSearch from 'react-select-search';
import CustomSelect from './customselect';


//  const options = [
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' }
//   ];//Data bu şekilde gelmeli

function SelectDemo() {
  const options = [
    { value: 'option1', label: 'Option 2' },
    { value: 'option2', label: 'Option 23' },
    { value: 'option3', label: 'Option 3' }
  ];//Data bu şekilde gelmeli
  const options2 = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
        type: 'group',
        name: 'Group name',
        items: [
            {name: 'Spanish', value: 'es'},
        ]
    },
];

/* Simple example */
  const handleSelectChange = (event) => {
    console.log('Selected value:', event.target.value);
  };



//soldan sağdan
    return (
        <>
       <Select 
        options={options} 
        onChange={handleSelectChange} 
        labeltext ={'Branş'}
        placeholder="Select "
        backgroundColor={'white'}
        padding={'7px'}
        width={'20%'}        
        //borderWidth={'9px'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
  
      />
      </>
    )
}

export default SelectDemo
