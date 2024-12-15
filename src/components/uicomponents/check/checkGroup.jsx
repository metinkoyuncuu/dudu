import React, { useEffect, useState } from "react";
import "./check.css";
import Service from "../../../services/servicedemo";

const CheckGroup = ({ item = [], label, reqGet, lefalign = "0px", rigalign = "0px" }) => {
  const [items, setItems] = useState(item); // Varsayılan olarak dışarıdan alınan item'lar kullanılır
  const [selectedItem, setSelectedItem] = useState([]); // Seçili değerleri tutar

  // Eğer reqGet varsa API çağrısı yap
  useEffect(() => {
    if (reqGet) {
      Service.get(reqGet)
        .then((response) => {
          if (response && response.data) {
            setItems(response.data); // Gelen veriyi items state'ine aktar
            const initialSelected = response.data
              .filter((item) => item.value === "T") // 'T' olanları seç
              .map((item) => item.value);
            setSelectedItem(initialSelected);
          }
        })
        .catch((error) => {
          console.error("API çağrısı sırasında hata:", error);
        });
    }
  }, [reqGet]); // reqGet değiştiğinde API çağrısı yeniden yapılır

  const handleCheckboxChange = (value) => {
    setSelectedItem((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((c) => c !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <div className="grid-checkbox"  style={{ marginLeft: `${-lefalign}px`, marginRight: `${-rigalign}px`, position: "relative"}}>
      <div className="group-title">{label}</div>
      {items.map((itemObj, index) => (
        <label key={index} className="checkbox-item">
          <input
            type="checkbox"
            value={itemObj.value} // Her öğeye karşılık gelen 'value' burada kullanılıyor
            checked={selectedItem.includes(itemObj.value)} // Seçili olanlar işaretli
            onChange={() => handleCheckboxChange(itemObj.value)} // İşaretleme değişikliği
          />
          {itemObj.name} {/* Şehir veya öğe ismi gösteriliyor */}
        </label>
      ))}
    </div>
  );
};

export default CheckGroup;
