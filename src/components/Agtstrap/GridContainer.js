import React from 'react';
import './gridStyles.css';

const GridContainer = ({ children, fluid }) => {
  const className = fluid ? 'grid-container-fluid' : 'grid-container';
  return <div className={className}>{children}</div>;
};

export default GridContainer;
