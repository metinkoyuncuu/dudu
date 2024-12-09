import React, { useState, useEffect, useRef } from 'react';
import './datePicker.css';

const DatePicker = ({ selected, onChange, dateFormat, className, label, required }) => {
  const today = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    selected && !isNaN(Date.parse(selected)) ? new Date(selected) : today
  );
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const calendarRef = useRef(null);  // Takvim için ref

  // Takvimi açma/kapama
  const handleCalendarToggle = () => setShowCalendar(!showCalendar);

  const handleDateSelect = (date) => {
    const updatedDate = new Date(date);
    updatedDate.setHours(currentDate.getHours());
    updatedDate.setMinutes(currentDate.getMinutes());
    updatedDate.setSeconds(currentDate.getSeconds());

    setCurrentDate(updatedDate);
    if (onChange) {
      onChange(updatedDate); // Parent bileşene tarih gönder
    }
    setShowCalendar(false); // Takvimi kapatma
  };

  // Takvimin dışına tıklama algılama ve kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);  // Takvimi kapat
      }
    };

    // Event listener'ı ekle
    document.addEventListener('mousedown', handleClickOutside);

    // Temizleme: component unmount olduğunda event listener'ı kaldır
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    } else {
      console.error('Geçersiz tarih:', date);
      return '';
    }
  };

  const changeMonth = (direction) => {
    let newMonth = currentMonth + direction;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentYear, currentMonth, i);
      daysArray.push(
        <span
          key={i}
          className={`calendar-day ${day.getTime() === currentDate.getTime() ? 'selected' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          {i}
        </span>
      );
    }
    return daysArray;
  };

  // Saat, dakika ve saniye değişikliklerini işleyen fonksiyon
  const handleTimeChange = (e, type) => {
    const newDate = new Date(currentDate);
    if (type === 'hours') {
      newDate.setHours(e.target.value);
    } else if (type === 'minutes') {
      newDate.setMinutes(e.target.value);
    } else if (type === 'seconds') {
      newDate.setSeconds(e.target.value);
    }
    setCurrentDate(newDate);
    if (onChange) {
      onChange(newDate); // Parent bileşene tarih gönder
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
            wordWrap: 'break-word',
            whiteSpace: 'normal',
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
        <div className="calendar" ref={calendarRef}>
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>&lt;</button>
            <span>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</span>
            <button onClick={() => changeMonth(1)}>&gt;</button>
          </div>
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
          <div className="time-input" style={{ marginTop: '15px', height: '20px' }}>
            <label className="dark-label">
              Saat :
              <input
                type="number"
                value={String(currentDate.getHours()).padStart(2, '0')}
                onChange={(e) => handleTimeChange(e, 'hours')}
                className="time-input-field"
                style={{ width: '40px', fontSize: '18px', marginLeft: '10px' }}
                min="0"
                max="23"
              />
              <span style={{ marginLeft: '5px' }}>:</span>
              <input
                type="number"
                value={String(currentDate.getMinutes()).padStart(2, '0')}
                onChange={(e) => handleTimeChange(e, 'minutes')}
                className="time-input-field"
                style={{ width: '40px', fontSize: '18px', marginLeft: '10px' }}
                min="0"
                max="59"
              />
              <span style={{ marginLeft: '5px' }}>:</span>
              <input
                type="number"
                value={String(currentDate.getSeconds()).padStart(2, '0')}
                onChange={(e) => handleTimeChange(e, 'seconds')}
                className="time-input-field"
                style={{ width: '40px', fontSize: '18px', marginLeft: '10px' }}
                min="0"
                max="59"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
