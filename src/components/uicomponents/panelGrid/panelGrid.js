import React, { useState } from 'react';
import './panelGrid.css';

export default function PanelGrid({
  title,
  children,
  backgroundImage,
  backgroundColor,
  overlayOpacity = 0.5,
  width,
  columns = 6,
  columnWidth = 3,
  height = 300,  // Default height is 500px, but it can be passed externally
}) {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const overlayStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, opacity: overlayOpacity }
    : backgroundColor
      ? { backgroundColor: backgroundColor, opacity: overlayOpacity }
      : {};

  const panelClassName = `panelGrid-panel ${width ? `w-${width}` : 'w-100'}`;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, ${columnWidth}fr)`, // Parametreler doğru şekilde yerleştirildi
    padding: '4px',  
  };

  const panelStyle = {
    height: isOpen ? `${height}px` : '0%',  
    transition: 'height 0.3s ease', 
  };

  return (
    <div className={panelClassName} style={panelStyle}>
      {(backgroundImage || backgroundColor) && (
        <div className="panelGrid-panel-overlay" style={overlayStyle}></div>
      )}
      <div className="panelGrid-panel-header" onClick={togglePanel}>
        <span className={isOpen ? '' : 'rotate'}>{isOpen ? '–' : '+'}</span> {title || 'Panel'}
      </div>
      <div className={`panelGrid-panel-content ${isOpen ? '' : 'hidden'}`} style={gridStyle}>
        {children}
      </div>
    </div>
  );
}
