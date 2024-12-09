import React, { useState, useEffect, useRef } from 'react';  // useRef'i import ediyoruz
import './datePicker.css';

const DatePicker = ({ selected, onChange, dateFormat, className, label, required }) => {
  const today = new Date();  // Sistem tarihini al
  const [showCalendar, setShowCalendar] = useState(false);

  // selected geçerli bir tarihse kullan, değilse bugünü kullan
  const [currentDate, setCurrentDate] = useState(
    selected && !isNaN(Date.parse(selected)) ? new Date(selected) : today
  );
  
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());  // Geçerli ay (0-11)
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());  // Geçerli yıl

  const calendarRef = useRef(null);  // Takvim dışına tıklamayı algılayacak olan ref

  // Takvimi göster/gizle
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

  // Formatlama fonksiyonu, tarih formatını DD.MM.YYYY olarak döndürüyor
  const formatDate = (date) => {
    // Geçersiz tarih kontrolü
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');  // Gün, 2 basamaklı
      const month = String(date.getMonth() + 1).padStart(2, '0');  // Ay, 2 basamaklı
      const year = date.getFullYear();  // Yıl

      return `${day}.${month}.${year}`;  // DD.MM.YYYY formatı
    } else {
      console.error('Geçersiz tarih:', date);
      return '';  // Eğer geçerli bir tarih değilse boş bir değer döndür
    }
  };

  const changeMonth = (direction) => {
    // Ayı değiştir (1 ileri, -1 geri)
    let newMonth = currentMonth + direction;
    if (newMonth < 0) {
      setCurrentMonth(11); // Aralık
      setCurrentYear(currentYear - 1); // Önceki yıla geç
    } else if (newMonth > 11) {
      setCurrentMonth(0); // Ocak
      setCurrentYear(currentYear + 1); // Sonraki yıla geç
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const getDaysInMonth = (year, month) => {
    // Bir ayın kaç gün olduğunu hesapla
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

  // Takvime dışarıya tıklama algılayıcı ekle
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Takvimin dışına tıklanıp tıklanmadığını kontrol et
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
        value={formatDate(currentDate)}  // Burada formatDate fonksiyonunu kullanıyoruz
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
        </div>
      )}
    </div>
  );
};

export default DatePicker;
