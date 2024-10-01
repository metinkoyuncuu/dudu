import React from 'react';
import logo from './logo.svg';
import './App.css';
import Select from './components/select/select';
import SelectDemo from './components/select/SelectDemo';
import RadioDemo from './components/radio/radioDemo';
import FileDemo from './components/file/fileDemo';

function App() {
  

  return (
    <div className="App">
      <SelectDemo/>
      <RadioDemo/>
      <FileDemo/>
    </div>
  );
}

export default App;
