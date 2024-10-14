import React from 'react';
import './gridStyles.css';

const GridCol = ({ children, size, className = '', ...props }) => {
  let colClass = 'grid-col';

  if (size) {
    if (typeof size === 'object') {
      Object.keys(size).forEach((breakpoint) => {
        colClass += ` grid-col-${breakpoint}-${size[breakpoint]}`;
      });
    } else {
      colClass += ` grid-col-${size}`;
    }
  }

  return <div className={`${colClass} ${className}`} {...props}>{children}</div>;
};

export default GridCol;
