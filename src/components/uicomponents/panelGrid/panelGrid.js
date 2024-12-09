import React, { useState } from 'react';
import './panelGrid.css';

export default function PanelGrid({
  title,
  children,
  backgroundImage,
  backgroundColor,
  overlayOpacity = 0.5,
  width, // Varsayılan genişlik 100% olarak ayarlanır
  columns,
  columnWidth = 3,
  height = 500,
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
    width: formattedWidth,
    height: isOpen ? `${height}px` : '40px', // Açıkken tam yükseklik, kapalıyken başlık kadar
    transition: 'height 0.3s ease', // Yüksekliği pürüzsüz bir şekilde değiştirmek için animasyon	
  };

  const gridStyle = {
    display: 'grid',
    overflow: 'hidden', // İçerik taşmasını önler
    gridTemplateColumns: `repeat(${columns}, 0.21fr)`, // Kolon sayısına göre dinamik düzen
    gap: '1rem', // Grid elemanları arasındaki boşluk
    padding: '1rem',
    transition: 'height 0.3s ease'
  };


  const headerStyle = {
    width: `${parseInt(formattedWidth, 11)}%`, // Header'ın genişliği   
  };

  return (
    <div className="panel-grid" style={panelClassName}>
      <div className="panel-grid-header" onClick={togglePanel} style={headerStyle}>        
        <span className="panel-grid-title">{title}</span>
      </div>
      {isOpen && (
        <form className="panel-grid-form" style={gridStyle}>
          {children}

          <button // Bunu altta boşluk oluşması için dizayn edildi.
            type="button"
            style={{
              width: '1%', // Genişlik tüm alanı kapsar
              gridColumn: `span ${columns}`, // Tüm grid kolonlarını kapsayacak şekilde genişler
              padding: '0.5rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              height: height ? `${height / 3}px` : 'initial',
              cursor: 'pointer',
              visibility: 'hidden',
            }}
          >
            Add Space Below Last Input
          </button>
        </form>
      )}
    </div>
  );
}
