import React, { useId } from 'react';
import './radio.css';

const Radio = ({ 
  options, 
  name, 
  selectedValue, 
  onChange, 
  width = '100%', 
  radioSize = '16px', 
  radioColor = '#000', 
  checkedColor = '#007bff', 
  labelColor = '#000',
  spacing = '10px',
  direction = 'vertical',//horizontal or vertical
  isMultiple = false // Çoklu seçim kontrolü
}) => {
  const uniqueId = useId(); // Benzersiz bir ID oluşturuluyor

  const handleChange = (value) => {
    if (isMultiple) {
      // Eğer çoklu seçim yapılabiliyorsa, seçili olanları güncelle
      if (selectedValue.includes(value)) {
        onChange(selectedValue.filter(v => v !== value));
      } else {
        onChange([...selectedValue, value]);
      }
    } else {
      onChange(value); // Tekli seçim için sadece değeri güncelle
    }
  };

  return (
    <div 
      className={`radio-group ${direction}`} 
      style={{ width }}
    >
      {options.map((option, index) => (
        <label key={index} className="radio-label" style={{ color: labelColor, marginBottom: direction === 'vertical' ? spacing : '0', marginRight: direction === 'horizontal' ? spacing : '0' }}>
          <input
            type={isMultiple ? "checkbox" : "radio"} // Çoklu seçimde checkbox, tekli seçimde radio kullanılır
            name={isMultiple ? `${name}-${index}` : name || uniqueId} // Checkbox için name her bir seçenek için farklı olmalı
            value={option.value}
            checked={isMultiple ? selectedValue.includes(option.value) : selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            style={{
              width: radioSize,
              height: radioSize,
              accentColor: selectedValue === option.value ? checkedColor : radioColor
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;
