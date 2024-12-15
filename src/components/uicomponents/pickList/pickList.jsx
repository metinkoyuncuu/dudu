import React, { useState, useEffect } from "react";
import "./pick.css";

const PickList = ({ value, itemLabel, itemValue }) => {
  const [source, setSource] = useState(value || []);
  const [target, setTarget] = useState([]);
  const [selectedSource, setSelectedSource] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState([]);

  useEffect(() => {
    // Güncellemeleri LocalStorage'a yansıt
    localStorage.setItem("source", JSON.stringify(source));
    localStorage.setItem("target", JSON.stringify(target));
  }, [source, target]);

  // Seçilen öğeleri taşı
  const moveItems = (selectedItems, from, setFrom, to, setTo) => {
    const updatedFrom = from.filter((item) => !selectedItems.includes(item));
    const updatedTo = [...to, ...selectedItems];
    setFrom(updatedFrom);
    setTo(updatedTo);
    clearSelections();
  };

  // Tüm öğeleri taşı (Sadece PickList'i güncelle)
  const moveAllOptimized = (from, setFrom, to, setTo) => {
    if (from.length === 0) return; // Boş kontrolü
    const updatedTo = [...to, ...from];
    setTo(updatedTo);  // Hedef listeyi güncelle
    setFrom([]);       // Kaynak listeyi temizle
  };

  // Seçimleri temizle
  const clearSelections = () => {
    setSelectedSource([]);
    setSelectedTarget([]);
  };

  // Seçim işlemini yönet
  const toggleSelection = (item, selected, setSelected) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="picklist-container">
      {/* Kaynak Liste */}
      <div className="picklist-column">
        <ul className="picklist-source">
          {source.map((item) => (
            <li
              key={item[itemValue]}
              className={selectedSource.includes(item) ? "selected" : ""}
              onClick={() => toggleSelection(item, selectedSource, setSelectedSource)}
            >
              {item[itemLabel]}
            </li>
          ))}
        </ul>
      </div>

      {/* Butonlar */}
      <div className="picklist-buttons">
        <button
          onClick={() => moveItems(selectedSource, source, setSource, target, setTarget)}
          disabled={selectedSource.length === 0}
        >
          &gt;
        </button>
        <button
          onClick={() => moveAllOptimized(source, setSource, target, setTarget)}
          disabled={source.length === 0}
        >
          &gt;&gt;
        </button>
        <button
          onClick={() => moveItems(selectedTarget, target, setTarget, source, setSource)}
          disabled={selectedTarget.length === 0}
        >
          &lt;
        </button>
        <button
          onClick={() => moveAllOptimized(target, setTarget, source, setSource)}
          disabled={target.length === 0}
        >
          &lt;&lt;
        </button>
      </div>

      {/* Hedef Liste */}
      <div className="picklist-column">
        <ul className="picklist-target">
          {target.map((item) => (
            <li
              key={item[itemValue]}
              className={selectedTarget.includes(item) ? "selected" : ""}
              onClick={() => toggleSelection(item, selectedTarget, setSelectedTarget)}
            >
              {item[itemLabel]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PickList;
