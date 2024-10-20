import React, { useState, useEffect } from 'react';
import './toastr.css';

export default function Toastr({ position = 'top-right', duration = 5000 }) {
  const [toastrList, setToastrList] = useState([]);

  useEffect(() => {
    // Global toastr fonksiyonlarını tanımlıyoruz
    window.toastr = {
      success: (title, message) => addToastr('success', title, message),
      error: (title, message) => addToastr('error', title, message),
      info: (title, message) => addToastr('info', title, message),
      warning: (title, message) => addToastr('warning', title, message),
    };
  }, []);

  // Toastr'ı ekle ve belirli bir süre sonra gizle
  const addToastr = (type, title, message) => {
    const id = Date.now(); // Benzersiz bir ID
    setToastrList((prevList) => [...prevList, { id, type, title, message }]);

    // Belirli bir süre sonra toastr'ı listeden kaldır
    setTimeout(() => {
      setToastrList((prevList) => prevList.filter((toastr) => toastr.id !== id));
    }, duration); // Parametre olarak gelen süre
  };

  return (
    <div className={`toastr-container ${position}`}>
      {toastrList.map((toastr) => (
        <div key={toastr.id} className={`toastr toastr-${toastr.type}`}>
          <div className="toastr-content">
            {toastr.title && <h4 className="toastr-title">{toastr.title}</h4>}
            <p className="toastr-message">{toastr.message}</p>
          </div>
          <button
            className="toastr-close-btn"
            onClick={() =>
              setToastrList((prevList) => prevList.filter((t) => t.id !== toastr.id))
            }
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
