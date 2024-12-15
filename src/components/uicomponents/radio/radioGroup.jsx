import React, { useEffect, useState } from "react";
import "./rediogroup.css";
import Service from "../../../services/servicedemo";

const RadioGroup = ({ item = [], label, reqGet, onSelect, lefalign = "0px", rigalign = "0px" }) => {
  const [items, setItems] = useState(item); // Varsayılan olarak dışarıdan alınan item'lar kullanılır
  const [selectedItem, setSelectedItem] = useState(""); // Seçili değeri tutar

  // Eğer reqGet varsa API çağrısı yap
  useEffect(() => {
    if (reqGet) {
      Service.get(reqGet)
        .then((response) => {
          if (response && response.data) {
            setItems(response.data); // Gelen veriyi items state'ine aktar
            const initialSelected = response.data.find((item) => item.value === "T")?.value || ""; // 'T' olanı seç
            setSelectedItem(initialSelected);
          }
        })
        .catch((error) => {
          console.error("API çağrısı sırasında hata:", error);
        });
    }
  }, [reqGet]); // reqGet değiştiğinde API çağrısı yeniden yapılır

  const handleRadioChange = (value) => {
    setSelectedItem(value); // Seçili değeri güncelle
    if (onSelect) {
      onSelect(value); // `onSelect` fonksiyonu varsa, tıklanan değeri döndür
    }
  };

  return (
    <div className="radio-group-container" style={{marginLeft: `${-lefalign}px`, marginRight: `${-rigalign}px`, position: "relative"}}>
      <div className="groupradio-title">{label}</div>
      <div className="radio-group-box">
        {items.map((itemObj, index) => (
          <label key={index} className="radio-item">
            <input
              type="radio"
              name={label} // Aynı grup adı kullanarak yalnızca birini seçilmesini sağla
              value={itemObj.value}
              checked={selectedItem === itemObj.value} // Seçili olan öğe işaretli
              onChange={() => handleRadioChange(itemObj.value)} // Seçim değişikliği
            />
            {itemObj.name} {/* Şehir veya öğe ismi gösteriliyor */}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
