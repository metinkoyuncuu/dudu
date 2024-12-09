import React, { useState } from "react";
import "./check.css";
import Service from '../../../services/servicedemo';

const CheckGroup = ({ item, label }) => {
  // selectedCities, sadece seçilen şehirlerin isimlerini tutar
  const [selectedItem, setSelectedItem] = useState([]);

  const handleCheckboxChange = (city) => {
    setSelectedItem((prevSelected) =>
      prevSelected.includes(city)
        ? prevSelected.filter((c) => c !== city)
        : [...prevSelected, city]
    );
  };

  return (
    <div className="grid-checkbox">
      <div className="group-title">{label}</div>
      {item.map((itemObj, index) => (
        <label key={index} className="checkbox-item">
          <input
            type="checkbox"
            value={itemObj.value}  // Her şehre karşılık gelen 'value' burada kullanılıyor
            checked={selectedItem.includes(itemObj.value)} // Şehir ismi seçilmişse checkbox işaretlendi
            onChange={() => handleCheckboxChange(itemObj.value)} // Şehir ismiyle işlem yapılır
          />
          {itemObj.name} {/* Şehir ismi gösteriliyor */}
        </label>
      ))}      
    </div>
  );
};

export default CheckGroup;
