import React from 'react';
import SelectOneListBox from '../uicomponents/selectOneListBox';
import SelectCheckListBox from '../uicomponents/selectCheckListBox';



//  const options = [
//     { value: 'option1', label: 'Option 1' },
//     { value: 'option2', label: 'Option 2' },
//     { value: 'option3', label: 'Option 3' }
//   ];//Data bu şekilde gelmeli

function SelectDemo() {
 

/* Simple example */
  const handleSelectChange = (event) => {
    console.log('Selected value:', event);
  };

//soldan sağdan
    return (
        <>
        {/* <SelectOneListBox 
        reqGet={'/UHaslib/brans'}
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
      /> */}

<SelectOneListBox 
        reqGet={'/UHaslib/cinsiyet'}
        name={'cinsiyet'}
        onChange={handleSelectChange} 
        labeltext ={'Branş'}
        placeholder="Select "
        backgroundColor={'white'}
        // padding={'3%'}
        width={'15%'}        
        //borderWidth={'9px'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}  
      /> 

{/* <SelectCheckListBox
        reqGet={'/UHaslib/cinsiyet'} 
        name={'cinsiyet'} 
        onChange={handleSelectChange} 
        labeltext={'Branş'}
        placeholder="Select"
        backgroundColor={'white'}
        padding={'3%'}
        width={'50%'} 
        borderColor={'green'} 
        hardInput={true} 
        isSearchable={true} 
      /> */}
    
      </>
    )
}

export default SelectDemo
