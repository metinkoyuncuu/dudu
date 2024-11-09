import React, { useState } from 'react';

function Form({ children }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with value: ${inputValue}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{padding: '10px' }}>
        {children}        
      </form>
    </>
  );
}

export default Form;
