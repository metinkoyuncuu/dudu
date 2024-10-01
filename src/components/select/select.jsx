import React, { useState } from 'react';
import './select.css';

const Select = ({ 
  options, 
  onChange, 
  placeholder, 
  backgroundColor, 
  width, 
  borderColor, 
  borderWidth,
  isSearchable 
}) => {
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
  const [selectedValue, setSelectedValue] = useState(''); // Seçili değer

  // Arama terimi güncellendiğinde tetiklenen fonksiyon
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value); // Seçili değeri güncelle
    onChange(e); // Üst bileşene değeri bildir
  };

  // Filtrelenen seçenekler
  const filteredOptions = options?.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="select-container" style={{ width: width || '100%' }}>
      {isSearchable && (
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      )}
      <select
        className="select-box"
        onChange={handleSelectChange}
        style={{ 
          backgroundColor: backgroundColor || '#fff',
          borderColor: borderColor || '#ccc',
          borderWidth: borderWidth || '1px'
        }}
        value={selectedValue}
      >
        <option value="">{placeholder}</option>
        {filteredOptions?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
