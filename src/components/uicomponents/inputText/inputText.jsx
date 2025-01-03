import React, { useEffect, useState } from 'react';
import './inputText.css';
import Service from '../../../services/servicedemo';

const InputText = ({
    label,
    id,
    placeholder,
    helperText,
    required,
    dset,
    readOnly,
    visible = true, // Set default value for visible prop
    toggleMask = false // New prop for masking
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
        <div className="field" style={{ display: 'flex', alignItems: 'center' }}>
            <label
                htmlFor={id}
                className="block label"
                style={{
                    width: '90px',
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
            <input
                type={toggleMask ? "password" : "text"} // If toggleMask is true, mask the input value
                id={id}
                className="block input"
                placeholder={placeholder}
                required={required}
                value={data} // Eğer veri geldiyse, input'un değerini ayarla
                onChange={handleChange} // Kullanıcı girişi için onChange ekle
                readOnly={readOnly} // readOnly prop'u burada kullanılıyor
                style={{ width: '193px', borderColor: '#ccc' }}
            />
            {helperText && <small className="block">{helperText}</small>}
        </div>
    );
};

export default InputText;
