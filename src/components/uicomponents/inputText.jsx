import React, { useEffect, useState } from 'react';
import '../uicomponents/uicomponentscss/inputText.css';
import Service from '../../services/servicedemo'; // Service dosyasının doğru yolunu ayarlayın

const InputText = ({ 
    label, 
    id, 
    placeholder, 
    helperText, 
    required, 
    dset, 
    readOnly, 
    visible = true // Set default value for visible prop
}) => {
    const [data, setData] = useState(''); // API'den çekilen veriyi tutmak için state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Service.get(dset);
                const defaultValues = typeof res === 'string' ? res : res.data; 
                console.log('defaultValues : ', defaultValues);
                setData(defaultValues);                
            } catch (error) {
                console.error("API'den veri çekilirken bir hata oluştu:", error);
            }
        };

        fetchData();
    }, [dset]); // dset değiştiğinde veriyi tekrar çek

    const handleChange = (event) => {
        setData(event.target.value); // Input değerini state'e kaydet
    };

    // Render null if the input should not be visible
    if (!visible) return null;

    return (
        <div className="field">
            <label htmlFor={id} className="block label">
                {label} : {required && <span style={{ color: 'red' }}>*</span>} {/* Kırmızı yıldız ekleyin */}
            </label>
            <input
                type="text"
                id={id}
                className="block input"
                placeholder={placeholder}
                required={required}
                value={data} // Eğer veri geldiyse, input'un değerini ayarla
                onChange={handleChange} // Kullanıcı girişi için onChange ekle
                readOnly={readOnly} // readOnly prop'u burada kullanılıyor
            />
            {helperText && <small className="block">{helperText}</small>}
        </div>
    );
};

export default InputText;