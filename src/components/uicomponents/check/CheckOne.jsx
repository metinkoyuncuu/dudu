import React, { useEffect, useState } from "react";
import "./checkOne.css"; // CSS dosyası
import Service from "../../../services/servicedemo";

const CheckOne = ({ item = [], label, reqGet, lefalign = "0px", rigalign = "0px" }) => {
  const [items, setItems] = useState(item); 
  const [selectedItem, setSelectedItem] = useState(null); 

  useEffect(() => {
    if (reqGet) {
      Service.get(reqGet)
        .then((response) => {
          if (response && response.data) {
            setItems(response.data); 
            const initialSelected = response.data.find((item) => item.value === "T");
            setSelectedItem(initialSelected ? initialSelected.value : null); 
          }
        })
        .catch((error) => {
          console.error("API çağrısı sırasında hata:", error);
        });
    }
  }, [reqGet]); 

  const handleCheckboxChange = (value) => {
    setSelectedItem((prevSelected) => (prevSelected === value ? null : value)); 
  };

  return (
    <div className="check-one-container" style={{ marginLeft: `${-lefalign}px`, marginRight: `${-rigalign}px`, position: "relative"}}> 
      <div className="check-title">{label}</div>
      <label className="checkbox-item">
        <input
          type="checkbox"
          value={items[0]?.value} 
          checked={selectedItem === items[0]?.value} 
          onChange={() => handleCheckboxChange(items[0]?.value)} 
        />
        <span className="checkbox-label">{items[0]?.name}</span> 
      </label>
    </div>
  );
};

export default CheckOne;
