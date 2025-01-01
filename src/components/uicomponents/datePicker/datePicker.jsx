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

  const calendarRef = useRef(null);

  const handleCalendarToggle = () => {
    if (!showCalendar) {
      setCurrentMonth(currentDate.getMonth());
      setCurrentYear(currentDate.getFullYear());
    }
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    if (onChange) {
      onChange(date);
    }
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } else {
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

  const renderWeekDays = () => {
    const weekDays = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
    return (
      <div className="calendar-weekdays">
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const daysArray = [];

    for (let i = 0; i < (firstDayOfMonth + 6) % 7; i++) {
      daysArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentYear, currentMonth, i);

      // Seçili günü kontrol et
      const isSelected = day.getDate() === currentDate.getDate() &&
        day.getMonth() === currentDate.getMonth() &&
        day.getFullYear() === currentDate.getFullYear();

      daysArray.push(
        <div
          key={i}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`datepicker-container ${className}`}>
      {label && (
        <label className="block label">
          {label} {required && <span style={{ color: 'red' }}>*</span>}
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
            <button
              type="button"
              aria-label="Previous Month"
              className="ui-datepicker-prev ui-corner-all"
              onClick={() => changeMonth(-1)}
              tabIndex="0"
            >
              &#60;
            </button>
            <span>
              {`${new Date(currentYear, currentMonth).toLocaleString('default', {
                month: 'long',
              })} ${currentYear}`}
            </span>
            <button
              type="button"
              aria-label="Next Month"
              className="ui-datepicker-next ui-corner-all"
              onClick={() => changeMonth(1)}
              tabIndex="0"
            >
              &#62;
            </button>
          </div>
          {renderWeekDays()}
          <div className="calendar-days">{renderCalendarDays()}</div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
