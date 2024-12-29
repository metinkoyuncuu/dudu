import React, { useState } from 'react';

const CustomSelect = ({ options, defaultLabel = 'Bir seçenek seçin' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  // Seçenekleri filtreleme
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Seçim sonrası listeyi kapat
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="custom-select">
      <div className="select-box" onClick={toggleDropdown}>
        {isOpen ? (
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={handleSearch}
            autoFocus
          />
        ) : (
          <span>{selectedOption ? selectedOption.label : defaultLabel}</span>
        )}
      </div>

      {isOpen && (
        <ul>
          {filteredOptions.map(option => (
            <li key={option.value} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect
