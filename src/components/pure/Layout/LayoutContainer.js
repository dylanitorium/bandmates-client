import React from 'react';
import { container } from './layout.css';

const LayoutContainer = ({ children }) => (
  <div className={container}>
   {children}
  </div>
);

export default LayoutContainer;
