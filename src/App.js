import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectDemo from './components/select/SelectDemo';
import RadioDemo from './components/radio/radioDemo';
import FileDemo from './components/file/fileDemo';

import GridDemo from './components/Agtstrap/GridDemo';
import Toastr from './components/uicomponents/toastr/toastr';
import ToastrDemo from './components/uicomponents/toastr/ToastrDemo';
import { ToastrProvider } from './components/uicomponents/toastr/ToastrContext';
function App() {

  return (
   

    
    <div className="App">
      <Toastr position="top-right" duration={5000} />
      <ToastrDemo/>
      {/* kullanım toastrdemo içersinde kolayca */}




       {/* <GridDemo/> */}
      { <SelectDemo id ={5} />  }
    


      {/* <Checkbox
        label="Primary"
        checked = {true}
        onChange = {()=>x()}
        colorUnchecked="Primary"
        colorChecked="red"
        variant="primary"
        initialColor="primary"
      />
      <SelectDemo/>
      
      <Select/>
      <RadioDemo/>
      <FileDemo/> */}
    </div>
    
  );
}

export default App;
