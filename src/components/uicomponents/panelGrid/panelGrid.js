import React, { useState } from 'react';
import './panelGrid.css';

export default function PanelGrid({
  title,
  children,
  backgroundImage,
  backgroundColor,
  overlayOpacity = 0.5,
  width, // Varsayılan genişlik 100% olarak ayarlanır
  columns = 6,
  columnWidth = 3,
  height = 200,
}) {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Gelen width değerini yüzde olarak biçimlendir
  const formattedWidth = `${parseInt(width, 0)}%`; 
  const formattedGridWidth = `${parseInt(width, 0) + 5}%`; 

  const overlayStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, opacity: overlayOpacity }
    : backgroundColor
      ? { backgroundColor: backgroundColor, opacity: overlayOpacity }
      : {};

  const panelClassName = {
    height: isOpen ? `${height}px` : '40px', // Açıkken tam yükseklik, kapalıyken başlık kadar
    overflow: 'hidden', // İçerik taşmasını önler
    transition: 'height 0.3s ease', // Geçiş animasyonu
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 0.21fr)`, // Dinamik kolon düzeni
    gap: '1rem', // Grid elemanlar arası boşluk
    padding: '0.5rem', // Formun iç kenar boşluklarını daraltıyoruz
    width: formattedWidth, // Grid tamamını kaplar
  };

  const headerStyle = {
    width: formattedWidth, // Header'ın genişliği
  };

  return (
    <div className="panel-grid" style={{ width: formattedGridWidth }}>
      <div className="panel-grid-header" onClick={togglePanel} style={headerStyle}>
        <button className="panel-grid-button">{isOpen ? '–' : '+'}</button>
        <span className="panel-grid-title">{title}</span>
      </div>
      {isOpen && (
        <form className="panel-grid-form" style={gridStyle}>
          {children}
        </form>
      )}
    </div>
  );
}
