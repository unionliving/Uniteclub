import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMembership = location.pathname === '/membership';

  return (
    <div className="main-wrapper">
      {/* 8 column grid background (hidden on home page & membership page) */}
      {!(isHome || isMembership) && (
        <div className="grid-overlay">
          <div/><div/><div/><div/><div/><div/><div/><div/>
        </div>
      )}
      
      <div className="content-container">
        <Navbar />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
