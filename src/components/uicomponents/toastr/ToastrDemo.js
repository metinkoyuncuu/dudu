import React from 'react';

function ToastrDemo() {
  const showSuccess = () => {
    window.toastr.success('Başarılı!', 'İşlem başarıyla tamamlandı!');
  };

  const showWarning = () => {
    window.toastr.warning('Warning!', 'Uyarı mesajı.');
  };

  const showInfo = () => {
    window.toastr.info('Info!', 'Bilgilendirme mesajı.');
  };

  const showError = () => {
    window.toastr.error('Hata!', 'Bir hata oluştu.');
  };

  return (
    <div>
      <h1>Toastr Demo Sayfası</h1>
      <button onClick={showSuccess}>Başarı Mesajı Göster</button>
      <button onClick={showError}>Hata Mesajı Göster</button>
      <button onClick={showInfo}>Bilgi Mesajı Göster</button>
      <button onClick={showWarning}>Uyarı Mesajı Göster</button>
    </div>
  );
}

export default ToastrDemo;
