import React, { useState, useEffect, useRef } from 'react';
import './select.css';
import Service from '../../../services/servicedemo';

const SelectCheckListBox = ({
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
  hardInput = false,
  reqGet,
  dset, // New prop to get default selected values
  required,
  className = "" // Default to an empty string if no class is passed
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
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

    const selected = selectedValues.includes(option.value);
    const updatedValues = selected
      ? selectedValues.filter(val => val !== option.value) // Remove if already selected
      : [...selectedValues, option.value]; // Add if not selected

    setSelectedValues(updatedValues);
    onChange(updatedValues);
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
      fetchDefaultValue(res || []); // Fetch default values after setting items
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDefaultValue = async (fetchedItems) => {
    try {
      const res = await Service.get(dset);
      const defaultValues = typeof res === 'string' ? [res] : res.data; // Ensure it's an array

      // Update selected values based on fetched default values
      const validDefaults = defaultValues.filter(defaultValue =>
        fetchedItems.some(option => option.value === defaultValue)
      );

      setSelectedValues(validDefaults);
      onChange(validDefaults);
    } catch (error) {
      console.error('Error fetching default values:', error);
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

  const finalClassName = `select-checklist-box ${className}`;

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
          alignItems: 'center', // Align label vertically with select-box
        }}>
          <label
            htmlFor={id}
            className="block label"
            style={{
              width: '100px',
              display: 'inline-block',
              wordWrap: 'break-word',   // Wrap long texts
              whiteSpace: 'normal',     // Allow word wrapping
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
              borderColor: borderColor || 'green',
              borderWidth: borderWidth || '1px',
              padding: padding || '4px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {selectedValues.length > 0
                ? selectedValues
                  .map(val => item.find(opt => opt?.value === val)?.label)
                  .filter(label => label)
                  .join(', ')
                : placeholder}
            </div>
            <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`} />
          </div>

          {isDropdownOpen && (
            <div className="dropdown"
              style={{
                width: '100%',
                maxHeight: '300px', // Dropdown'un maksimum yüksekliği
                overflowY: 'auto', // Kaydırma çubuğu ekler
                position: 'absolute', // Dropdown'un tam görünmesini sağlar
                zIndex: 999, // Diğer bileşenlerin üstünde görünmesi için
                backgroundColor: '#fff', // Arka plan görünürlüğü
                border: '1px solid #ddd' // Dropdown stilini iyileştirir
              }}>
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
                      className={`dropdown-item ${selectedValues.includes(option.value) ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(option.value)}
                        readOnly
                      /> {option.label}
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

export default SelectCheckListBox;
