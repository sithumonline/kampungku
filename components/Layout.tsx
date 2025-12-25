import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen pb-20 relative">
      <Toaster position="top-center" />
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;