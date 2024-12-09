import React, { useState, useEffect, useRef } from 'react';
import './select.css';
import Service from '../../../services/servicedemo';

const SelectOneListBox = ({
  id,
  labeltext,
  name,
  onChange,
  placeholder,
  backgroundColor,
  width,
  borderColor,
  borderWidth,
  padding,
  isSearchable,
  left = 0,
  reqGet,
  required,
  className = "" // Default to an empty string if no class is passed
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [item, setItem] = useState([]);
  const dropdownRef = useRef(null);

  const divLeftSize = left;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (option) => {
    if (!option || !option.value) {
      console.error('Invalid option or undefined value:', option);
      return;
    }
    setSelectedValue(option.value);
    onChange(option.value);
    setIsDropdownOpen(false); // Dropdown kapanır
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredOptions = item?.filter(option =>
    option && option.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await Service.get(reqGet);
      setItem(res || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reqGet]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const finalClassName = `select-one-list-box ${className}`;

  return (
    <div className="field" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: `${divLeftSize}%`
      }}>
        <div style={{
          minWidth: '80px',
          marginRight: labeltext?.length > 10 ? '10px' : '10px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
        }}>
          <label 
            htmlFor={id} 
            className="block label"
            style={{
              width: '100px', 
              display: 'inline-block',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              maxWidth: '100%', 
              wordBreak: 'break-word',
            }}
          >
            {labeltext} : {required && <span style={{ color: 'red' }}>*</span>}
          </label>
        </div>

        <div ref={dropdownRef} className="select-container">
          <div
            className={`select-box ${isDropdownOpen ? 'activex' : ''}`}
            onClick={toggleDropdown}
            style={{
              backgroundColor: backgroundColor || '#fff',
              borderColor: borderColor || '#ccc',
              borderWidth: borderWidth || '1px',
              padding: padding || '4px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {selectedValue
                ? item.find(opt => opt.value === selectedValue)?.label
                : placeholder}
            </div>
            <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`} />
          </div>

          {isDropdownOpen && (
            <div className="dropdown" style={{ width: '100%' }}>
              {isSearchable && (
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                  autoFocus
                />
              )}

              <ul className="dropdown-list" style={{ width: '100%' }}>
                {filteredOptions?.map((option, index) => (
                  option?.value && option?.label ? (
                    <li
                      key={index}
                      onClick={() => handleSelectChange(option)}
                      className={`dropdown-item ${selectedValue === option.value ? 'selected' : ''}`}
                    >
                      {option.label}
                    </li>
                  ) : null
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectOneListBox;
