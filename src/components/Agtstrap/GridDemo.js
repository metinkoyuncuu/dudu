// Gerekli React ve CSS dosyalarını import et
import React from 'react';
import GridContainer from './GridContainer';
import GridRow from './GridRow';
import GridCol from './GridCol';
import './gridStyles.css';
import SelectDemo from '../select/SelectDemo';

// GridDemo bileşeni: Farklı grid özelliklerini gösterecek
export default function GridDemo() {
  return (
    <div>
      {/* Akışkan (fluid) konteyner: Ekranın genişliğini tamamen kaplar */}
      <GridContainer fluid>
        {/* Boşluksuz satır: Sütunlar arasındaki varsayılan boşlukları kaldırır */}
        <GridRow noGutters>
          {/* Tam genişlikte sütun (12/12): Tüm satırı kaplar */}
          <GridCol size={12}>
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
              Tam genişlikte sütun (12/12)
            </div>
          </GridCol>
        </GridRow>

        {/* Duyarlı (responsive) sütunlar: Ekran boyutuna göre genişlikleri ayarlanır */}
        <GridRow  >
          {/* Yarım genişlikte sütun (6/12): Tüm ekran boyutlarında */}
          <GridCol size={{ md: 3 }}>
            <div style={{ backgroundColor: '#e9ecef' }}>
            </div>
          </GridCol> 

          {/* Çeyrek genişlikte sütun (3/12): Tüm ekran boyutlarında */}
          <GridCol size={{ md: 3 }}>
            <div style={{ backgroundColor: '#dee2e6' }}>
              Çeyrek genişlikte sütun (3/12)
            </div>
          </GridCol>
          

          {/* Üçte bir genişlikte sütun (4/12): Sadece orta ve büyük ekranlarda */}
          <GridCol size={{ md: 3 }}>
            <div style={{ backgroundColor: '#ced4da' }}>
              Üçte bir genişlikte sütun (4/12)
            </div>
          </GridCol>
        </GridRow>

        {/* Boşluksuz sütun örneği (no-gutters): Resimler için faydalı olabilir */}
        <GridRow >
          <GridCol size={{ md: 6 }}>
            <div style={{ backgroundColor: '#adb5bd', padding: '20px' }}>
              Boşluksuz sütun (6/12)
            </div>
          </GridCol>
          <GridCol size={{ md: 6 }}>
            <div style={{ backgroundColor: '#6c757d', padding: '20px' }}>
              Boşluksuz sütun (6/12)
            </div>
          </GridCol>
        </GridRow>
      </GridContainer>
    </div>
  );
}
