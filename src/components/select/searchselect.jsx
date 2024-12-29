import React, { useState } from 'react';

const MyMultiSelect = () => {
    const [selectedCities, setSelectedCities] = useState([]); // Seçilen şehirler
    const [filter, setFilter] = useState(''); // Filtreleme için kullanıcı girişi

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    // Kullanıcının girdiği filtreyi şehirler listesine uygula
    const filteredCities = cities.filter(city => 
        city.name.toLowerCase().includes(filter.toLowerCase())
    );

    // Şehir seçimi değiştiğinde
    const handleCityChange = (event, city) => {
        const selected = [...selectedCities];
        if (event.target.checked) {
            selected.push(city); // Seçilen şehri ekle
        } else {
            // Seçili şehirlerden kaldır
            const index = selected.indexOf(city);
            if (index > -1) {
                selected.splice(index, 1);
            }
        }
        setSelectedCities(selected); // Güncellenen şehirleri kaydet
    };

    return (
        <div >
            <h3>Select Cities</h3>
            <input 
                type="text" 
                placeholder="Search Cities..." 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
            />
            <div className="city-list">
                {filteredCities.map(city => (
                    <div key={city.code}>
                        <input 
                            type="checkbox" 
                            value={city.name}
                            onChange={(e) => handleCityChange(e, city)}
                        />
                        <label>{city.name}</label>
                    </div>
                ))}
            </div>
            <p>Selected Cities: {selectedCities.map(city => city.name).join(', ')}</p>
        </div>
    );
};

export default MyMultiSelect;