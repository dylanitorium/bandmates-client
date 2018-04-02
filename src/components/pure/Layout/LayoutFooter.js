import React from 'react';
import { footer } from './layout.css';

const LayoutFooter = ({ children }) => (
  <div className={footer}>
   {children}
  </div>
);

export default LayoutFooter;
