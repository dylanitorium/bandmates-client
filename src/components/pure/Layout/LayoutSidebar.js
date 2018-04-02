import React from 'react';
import { sidebar } from './layout.css';

const LayoutSidebar = ({ children }) => (
  <div className={sidebar}>
   {children}
  </div>
);

export default LayoutSidebar;
