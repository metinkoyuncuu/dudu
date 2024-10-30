import React from 'react';

const InputText = ({ label, id, placeholder, helperText }) => {
    return (
        <div className="field">
            <label htmlFor={id} className="block"> {label} </label>
            <input type="text" id={id} className="block" placeholder={placeholder} />
            {helperText && <small className="block">{helperText}</small>}
        </div>
    );
};

export default InputText;