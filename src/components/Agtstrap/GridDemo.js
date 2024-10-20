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
    <div className='container'>
    <div className='row'>
      <div className='col-7 border text-red text-center bg-red'>
        <h1 className='bg-white'>Selam</h1>
      </div>
      <div className='col-5 border border-blue'>
        <h1>Selam</h1>
      </div>
    </div>
  </div>

  
  );
}
