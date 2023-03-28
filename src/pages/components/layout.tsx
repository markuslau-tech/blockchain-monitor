import React, { PropsWithChildren } from 'react';
import Navbar from './navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
