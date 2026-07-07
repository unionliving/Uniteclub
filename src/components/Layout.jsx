"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMembership = pathname === '/membership';

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
