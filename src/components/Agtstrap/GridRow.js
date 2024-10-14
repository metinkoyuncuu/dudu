import React from 'react';
import './gridStyles.css';

const GridRow = ({ children, noGutters, className = '', ...props }) => {
  const rowClass = `grid-row ${noGutters ? 'no-gutters' : ''} ${className}`;
  return <div className={rowClass} {...props}>{children}</div>;
};

export default GridRow;
