import React, { useState, useEffect, useRef } from 'react';
import '../uicomponents/uicomponentscss/select.css';
import Service from '../../services/servicedemo';
import axios from 'axios';

const SelectOneListBox = ({
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
  defaultValue = null
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
      // Fetch the default value after successfully fetching items
      fetchDefaultValue(res || []); // Pass fetched items to fetchDefaultValue
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDefaultValue = async (fetchedItems) => {
    try {
      // const res = await Service.get(dset);
      // res.data = defaultValue ;
      // console.log('res' , res);
      // console.log('defaultValue', defaultValue);

      // const defaultValue = typeof res === 'string' ? res : res.data;
     
      if (fetchedItems.length > 0) {
        console.log('Available options:', fetchedItems);
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
  }, [reqGet]); // Trigger fetchData when reqGet changes

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
    <div style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      marginLeft: `${divLeftSize}%`
    }} ref={selectBoxRef}>
      <div style={{
        minWidth: '80px',
        marginRight: '10px',
        textAlign: 'left'
      }}>
        <label style={{
          fontSize: '14px',
          lineHeight: '1.5',
          display: 'block'
        }}>
          {labeltext}
        </label>
        {hardInput && (
          <span style={{
            color: 'red',
            marginLeft: '3px',
            lineHeight: '1.5'
          }}>*</span>
        )}
      </div>

      <div className="select-container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
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
  );
};

export default SelectOneListBox;
