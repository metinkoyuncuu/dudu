import React, { useState, useEffect, useRef } from 'react';
import '../uicomponents/uicomponentscss/select.css';
import Service from '../../services/servicedemo';

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
  reqGet
}) => {
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
  const [selectedValue, setSelectedValue] = useState(''); // Seçili değer
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown'un açık olup olmadığını kontrol eder
  const [item, setItem] = useState([]);
  
  const selectBoxRef = useRef(null); // Select kutusuna referans

  var divLeftSize = left;

  // Arama terimi güncellendiğinde tetiklenen fonksiyon
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value); // Seçili değeri güncelle
    setIsDropdownOpen(false); // Seçim yapıldıktan sonra listeyi kapat
    onChange(e.target.value); // Üst bileşene değeri bildir
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Dropdown'u açıp kapama
  };

  // Filtrelenen seçenekler
  const filteredOptions = item?.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    try {
      const res = await Service.get(reqGet); // Burada reqGet fonksiyonunu çalıştırın
      setItem(res || []); // Gelen değeri setItem ile güncelleyin
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Veri getirme fonksiyonunu çağırıyoruz
  }, []);

  // Select kutusunun dışına tıklandığında dropdown'u kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Dropdown'u kapat
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
    }} ref={selectBoxRef}> {/* Burada ref kullanıyoruz */}
      {/* Label section */}
      <div style={{
        minWidth: '80px',
        marginRight: '10px',
        textAlign: 'left'
      }}>
        <label style={{
          fontSize: '14px',
          lineHeight: '1.5',
          display: 'block' // Make sure the label is block level
        }}>
          {labeltext}
        </label>
        {hardInput && (
          <span style={{
            color: 'red',
            marginLeft: '3px', // Small space between the label and *
            lineHeight: '1.5'
          }}>*</span>
        )}
      </div>

      {/* Select box container */}
      <div className="select-container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <div
          className={`select-box ${isDropdownOpen ? 'activex' : ''}`}
          onClick={toggleDropdown}
          style={{
            backgroundColor: backgroundColor || '#fff',
            borderColor: borderColor || 'green',
            borderWidth: borderWidth || '1px',
            padding: padding || '4px',
            width: width || '10%', // Adjust this to fit your layout
            maxWidth: width || '10%',
            minWidth: '3%',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ flexGrow: 1 }}>
            {selectedValue ? item.find(opt => opt.value === selectedValue)?.label : placeholder}
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
