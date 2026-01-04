import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex">
      <Sidebar collapsed={collapsed} />
      <div className="flex-grow-1">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;