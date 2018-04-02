import React from 'react';
import { main } from './layout.css';

const LayoutMain = ({ children }) => (
  <div className={main}>
   {children}
  </div>
);

export default LayoutMain;
