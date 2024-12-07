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
        <div className="field" style={{ display: 'flex', alignItems: 'center' }}>
            <label
                htmlFor={id}
                className="block label"
                style={{
                    width: '90px',
                    marginRight: label?.length > 10 ? '10px' : '10px',
                    display: 'inline-block',
                    wordBreak: 'break-word',   // Eğer label çok uzun olursa, kelime kesilecektir.
                    maxWidth: '100%',           // Genişliği %90 yaparak, label'in kutuyu sarmasını engeller
                }}
            >
                {label} : {required && <span style={{ color: 'red' }}>*</span>}
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
                style={{ width: '193px' }}
            />
            {helperText && <small className="block">{helperText}</small>}
        </div>
    );
};

export default InputText;
