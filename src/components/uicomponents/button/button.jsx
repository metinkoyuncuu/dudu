import React from "react";
import "./button.css"; // CSS dosyasını içe aktarıyoruz

const Button = ({ id, icon, value, actionListener, process, update, marginTop, marginRight, marginBottom, marginLeft }) => {
  const handleClick = () => {
    if (process) {
      console.log(`Processing elements: ${process}`);
    }
    if (actionListener) {
      actionListener();
    }
    if (update) {
      console.log(`Updating elements: ${update}`);
    }
  };

  // Dinamik margin değerlerini birleştiriyoruz
  const buttonStyle = {
    marginTop: marginTop || "0px",
    marginRight: marginRight || "0px",
    marginBottom: marginBottom || "0px",
    marginLeft: marginLeft || "0px"
  };

  return (
    <button id={id} className="button" onClick={handleClick} style={buttonStyle}>
      {icon && <i className={icon}></i>}
      {value && <span>{value}</span>}
    </button>
  );
};

export default Button;
