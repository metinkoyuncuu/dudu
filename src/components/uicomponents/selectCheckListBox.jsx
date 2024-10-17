import React, { useState, useEffect } from 'react';
import '../uicomponents/uicomponentscss/select.css';
import Service from '../../services/servicedemo';

const SelectCheckListBox = ({ 
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
  const [selectedValues, setSelectedValues] = useState([]); // Çoklu seçim için seçili değerler
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown'un açık olup olmadığını kontrol eder
  const [item, setItem] = useState([]);

  var leftsize = 0;
  var divLeftSize = left;

  // Arama terimi güncellendiğinde tetiklenen fonksiyon
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Seçim değiştirildiğinde çağrılan fonksiyon
  const handleSelectChange = (option) => {
    console.log('Selected option:', option); // Seçilen opsiyonu yazdır

    // Option kontrolü
    if (!option || !option.value) {
      console.error('Invalid option or undefined value:', option);

      return; // Option yoksa veya value undefined ise işlem yapma
    }

    const selected = selectedValues.includes(option.value);

    let updatedValues;

    if (selected) {
      updatedValues = selectedValues.filter(val => val !== option.value); // Seçiliyse çıkar

    } else {
      updatedValues = [...selectedValues, option.value]; // Seçili değilse ekle

    }

    setSelectedValues(updatedValues); // Güncelle

    onChange(updatedValues); // Üst bileşene güncel değerleri bildir

  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Dropdown'u açıp kapama
  };

  // Filtrelenen seçenekler
  const filteredOptions = item?.filter(option =>
    option && option.label && option.label.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div style={{ width: '100%', marginLeft: divLeftSize + '%' }}>
      <div className="select-container" style={{ width: width || '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '10%', left: leftsize + '%' }}>
          {labeltext}
          {hardInput && (
            <> <span style={{ color: 'red' }}> *</span> </> 
          )}
        </div>

        <div 
          className={`select-box ${isDropdownOpen ? 'activex' : ''}`} 
          onClick={toggleDropdown} 
          style={{
            backgroundColor: backgroundColor || '#fff',
            borderColor: borderColor || 'green',
            borderWidth: borderWidth || '1px',
            padding: padding || '4px',
            width: width || '10%', // Dynamic width setting
            maxWidth: width || '20%', // Maximum width constraint
            minWidth: '3%',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center', // Ensures vertical alignment within the box
          }}
        >
          {selectedValues.length > 0 
            ? selectedValues.map(val => item.find(opt => opt?.value === val)?.label).join(', ')
            : placeholder}
          <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`} />
        </div>

        {isDropdownOpen && (
          <div className="dropdown" style={{ left: leftsize + 15 + '%' }}> 
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

            <ul className="dropdown-list" style={{ width: '90%' }}>
              {filteredOptions?.map((option, index) => (
                option?.value && option?.label ? (  // Hem value hem label var mı kontrol ediyoruz
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
  );
};

export default SelectCheckListBox;
