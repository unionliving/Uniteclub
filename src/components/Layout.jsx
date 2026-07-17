"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMembership = pathname === '/membership';

  return (
    <>
      <Navbar />
      <div className="main-wrapper">

        
        <div className="content-container">
          <main>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
