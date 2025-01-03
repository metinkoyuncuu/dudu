import React from 'react';
import SelectOneListBox from '../uicomponents/selectListBox/selectOneListBox';
import SelectCheckListBox from '../uicomponents/selectListBox/selectCheckListBox';
import InputText from '../uicomponents/inputText/inputText';
import Form from '../uicomponents/form';

function SelectDemo() {


  /* Simple example */
  const handleSelectChange = (event) => {
    console.log('Selected value:', event);
  };

  //soldan sağdan
  return (
   <Form>
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
        labeltext={'Branş'}
        placeholder="Select "
        backgroundColor={'white'}
        // padding={'3%'}
        width={'10%'}
        //borderWidth={'9px'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
        defaultValue ={'H'}
      />

      <SelectCheckListBox
        reqGet={'/UHaslib/cinsiyet'}
        name={'cinsiyetsss'}
        onChange={handleSelectChange}
        labeltext={'BranşsAtakankılabaz'}
        placeholder="Select"
        backgroundColor={'white'}
        width={'31%'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
        dset={'/Login/stringDeger'}
      />
      

      <InputText
        label="Atakan"
        id="username1"
        required={true}
        dset={'cinsiyet'}
        visible={true}
        defaultValue ={'K'}
      />

  </Form> 
  )
}

export default SelectDemo
