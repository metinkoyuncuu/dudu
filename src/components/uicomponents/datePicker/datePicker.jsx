import React, { useState } from 'react';
import './datePicker.css';

const DatePicker = ({ selected, onChange, dateFormat, className, label, required }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(selected ? new Date(selected) : new Date());  // Ensure it's a Date object

  const handleCalendarToggle = () => setShowCalendar(!showCalendar);

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    if (onChange) {
      onChange(date); // Parent bileşene tarih gönderiliyor
    } else {
      console.error('onChange fonksiyonu sağlanmamış!');
    }
    setShowCalendar(false); // Takvimi kapatma
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } else {
      console.error('Geçersiz tarih:', date);
      return '';
    }
  };

  return (
    <div className={`datepicker-container ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
      {label && (
        <label 
        className="block label"
        style={{
          width: '100px',
          display: 'inline-block',
          wordWrap: 'break-word',   // Wrap long texts
          whiteSpace: 'normal',     // Allow word wrapping
          maxWidth: '100%',
          wordBreak: 'break-word',
          marginRight: label?.length > 10 ? '10px' : '10px',
        }}        
        >
          {label} : {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <input 
        type="text" 
        value={formatDate(currentDate)} 
        readOnly 
        onClick={handleCalendarToggle} 
        className="datepicker-input"    
      />
      {showCalendar && (
        <div className="calendar">
          <div className="calendar-header">
            <span>December 2024</span>
          </div>
          <div className="calendar-days">
            {[...Array(31)].map((_, index) => (
              <span
                key={index}
                className="calendar-day"
                onClick={() => handleDateSelect(new Date(2024, 11, index + 1))}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
