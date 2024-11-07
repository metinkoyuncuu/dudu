import React, { useState, useEffect, useRef } from 'react';
import '../uicomponents/uicomponentscss/select.css';
import Service from '../../services/servicedemo';

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
  hardInput = false,
  reqGet,
  dset,
  defaultValue = null,
  required
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [item, setItem] = useState([]);

  const selectBoxRef = useRef(null);
  const divLeftSize = left;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    setIsDropdownOpen(false);
    onChange(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredOptions = item?.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await Service.get(reqGet);
      setItem(res || []);
      console.log('res : ', res);
      fetchDefaultValue(res || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDefaultValue = async (fetchedItems) => {
    try {
      if (fetchedItems.length > 0) {
        const foundOption = fetchedItems.find(option => {
          return option.value === defaultValue;
        });

        if (foundOption) {
          setSelectedValue(foundOption.value);
          onChange(foundOption.value);
        } else {
          console.log('No matching option found for default value:', defaultValue);
        }
      }
    } catch (error) {
      console.error('Error fetching default value:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reqGet]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="field" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center', // Center items vertically
        marginLeft: `${divLeftSize}%`
      }} ref={selectBoxRef}>
        <div style={{
          minWidth: '80px',
          marginRight: '10px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center', // Align label vertically with select-box
        }}>
          <label
            htmlFor={id}
            className="block label"
            style={{ width: '120px', 
              display: 'inline-block',
              wordWrap: 'break-word',   // Uzun metinleri alt satıra kırar
              whiteSpace: 'normal',    // Satır kaydırmaya izin verir 
              maxWidth: '100%', 
              wordBreak: 'break-word',
              }} // Add width and inline-block style
          >
            {labeltext} : {required && <span style={{ color: 'red' }}>*</span>}
          </label>
        </div>

        <div className="select-container" style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center', // Align select box vertically
        }}>
          <div
            className={`select-box ${isDropdownOpen ? 'activex' : ''}`}
            onClick={toggleDropdown}
            style={{
              backgroundColor: backgroundColor || '#fff',
              borderColor: borderColor || 'green',
              borderWidth: borderWidth || '1px',
              padding: padding || '4px',
              width: width || '10%',
              maxWidth: width || '10%',
              minWidth: '3%',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {selectedValue
                ? item.find(opt => opt.value === selectedValue)?.label || placeholder
                : placeholder}
            </div>
            <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`} />
          </div>

          {isDropdownOpen && (
            <div className="dropdown" style={{ width: '15%' }}>
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
                  <li
                    key={index}
                    onClick={() => handleSelectChange({ target: { value: option.value } })}
                    className="dropdown-item"
                  >
                    {option.label}
                  </li>
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
