import React, { useState, useEffect } from 'react';
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

  var leftsize = 0;
  var divLeftSize = left;

  // Arama terimi güncellendiğinde tetiklenen fonksiyon
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value); // Seçili değeri güncelle
    setIsDropdownOpen(false); // Seçim yapıldıktan sonra listeyi kapat
    onChange(e); // Üst bileşene değeri bildir
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
      console.log(res);
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
            borderColor: borderColor || '#ccc',
            borderWidth: borderWidth || '1px',
            padding: padding || '4px',        
            left: leftsize + 5 + '%',
          }}
        >
          {selectedValue ? item.find(opt => opt.value === selectedValue)?.label : placeholder}
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
                <li 
                  key={index} 
                  onClick={() => handleSelectChange({ target: { value: option.value }})}
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