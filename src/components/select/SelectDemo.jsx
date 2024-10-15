import React from 'react'
import Select from './select';


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
  ];

/* Simple example */
  const handleSelectChange = (event) => {
    console.log('Selected value:', event.target.value);
  };

 



//soldan sağdan
    return (
        <>
       <Select 
        reqGet={'Companies?PageIndex=0&PageSize=10'}
        name={'city'}
        onChange={handleSelectChange} 
        labeltext ={'Branş'}
        placeholder="Select "
        backgroundColor={'white'}
        padding={'3%'}
        width={'100%'}        
        //borderWidth={'9px'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
  
      />
      <Select 
       name={'district'}
        options={options} 
        onChange={handleSelectChange} 
        labeltext ={'Branş'}
        placeholder="Select "
        backgroundColor={'white'}
        padding={'3%'}
        width={'100%'}        
        //borderWidth={'9px'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
  
      />
      </>
    )
}

export default SelectDemo
