import React, { createContext, useState, useContext } from 'react';
import Toastr from './toastr';

const ToastrContext = createContext();

export const ToastrProvider = ({ children }) => {
  const [toastr, setToastr] = useState({ isVisible: false, type: '', title: '', message: '' });

  const showToastr = (type, title, message) => {
    setToastr({ isVisible: true, type, title, message });
    // Toastr 3 saniye sonra otomatik olarak kapanır
    setTimeout(() => setToastr({ isVisible: false, type: '', title: '', message: '' }), 3000);
  };

  const toastrFunctions = {
    success: (title, message) => showToastr('success', title, message),
    error: (title, message) => showToastr('error', title, message),
    info: (title, message) => showToastr('info', title, message),
    warning: (title, message) => showToastr('warning', title, message),
  };

  return (
    <ToastrContext.Provider value={toastrFunctions}>
      {children}
      {toastr.isVisible && <Toastr title={toastr.title} message={toastr.message} type={toastr.type} />}
    </ToastrContext.Provider>
  );
};

export const useToastr = () => {
  return useContext(ToastrContext);
};
