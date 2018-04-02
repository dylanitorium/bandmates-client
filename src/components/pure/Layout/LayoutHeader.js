import React from 'react';
import { header } from './layout.css';

const LayoutHeader = ({ children }) => (
  <div className={header}>
   {children}
  </div>
);

export default LayoutHeader;
