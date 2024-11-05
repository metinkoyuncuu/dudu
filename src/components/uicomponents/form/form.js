import React, { useState } from 'react';
import './form.css';

export default function Form({ title, children, backgroundImage, backgroundColor, overlayOpacity = 0.5 }) {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };


  const overlayStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, opacity: overlayOpacity }
    : backgroundColor
    ? { backgroundColor: backgroundColor, opacity: overlayOpacity }
    : {};

  return (
    <div className="form-panel">
      {(backgroundImage || backgroundColor) && (
        <div className="form-panel-overlay" style={overlayStyle}></div>
      )}
      <div className="form-panel-header" onClick={togglePanel}>
        <span className={isOpen ? '' : 'rotate'}>{isOpen ? '–' : '+'}</span> {title || 'Panel'}
      </div>
      <div className={`form-panel-content ${isOpen ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}
