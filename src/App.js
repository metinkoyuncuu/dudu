import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectDemo from './components/select/SelectDemo';
import RadioDemo from './components/radio/radioDemo';
import FileDemo from './components/file/fileDemo';
import 'react-select-search/style.css'
import  Checkbox  from "react-woodpecker";

import GridDemo from './components/Agtstrap/GridDemo';
function App() {
  const [checke,setChecke] = useState(false);

  const x = ()=>{
    console.log(checke);
    setChecke(!checke)
  }

  return (
    <div className="App">
      <GridDemo/>
      <SelectDemo />


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
