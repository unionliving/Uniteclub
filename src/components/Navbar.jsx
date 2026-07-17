"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import '../index.css';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? `${(totalScroll / windowHeight) * 100}%` : '0%';
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return undefined;
  }, [isMobileMenuOpen]);



  const navLinkStyle = {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    textDecoration: 'none'
  };

  const mobileLinkStyle = {
    color: '#fff',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '600',
    padding: '16px 0',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    textDecoration: 'none',
    display: 'block'
  };

  return (
    <>
      <style>{`
        .desktop-group { display: flex; }
        .mobile-hamburger { display: none; }
        .nav-container-inner { 
          padding: 20px 144px; 
          position: relative; 
          max-width: 1600px; 
          margin: 0 auto; 
          width: 100%;
        }
        .brand-link { position: relative; z-index: 2; }
        @media (max-width: 1024px) {
          .nav-container-inner { padding: 20px 64px !important; }
        }
        @media (max-width: 900px) {
          .desktop-group { display: none !important; }
          .mobile-hamburger { display: flex !important; position: absolute; right: 24px; top: 50%; transform: translateY(-50%); }
          .nav-container-inner { padding: 12px 24px !important; justify-content: space-between !important; }
          .brand-link { position: static; margin: 0; }
        }
        @media (max-width: 768px) {
          .nav-container-inner { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1002,
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        minHeight: '64px',
        '--header-height': '64px'
      }}>
        <div className="nav-container-inner" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0px' }}>
            <img src="/Unite-logo.png" alt="Unite Logo" style={{ height: '64px', width: 'auto', display: 'block' }} />
            <span className="logo" style={{ marginLeft: '10px' }}>Unite</span>
          </Link>
          {/* DESKTOP NAV */}
          <div className="desktop-group" style={{ gap: '40px', alignItems: 'center' }}>
            <Link href="/" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>EXPLORE</Link>
            <Link href="/calendar" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>THE DROP</Link>
            <Link href="/contact" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>CONTACT</Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            className="mobile-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* The scroll progress bar container */}
        <div style={{ 
          height: '2px', 
          width: '100%', 
          backgroundColor: 'var(--grid-color)', 
          position: 'absolute',
          bottom: 0,
          left: 0
        }}>
          <div style={{
            height: '100%',
            width: scrollProgress,
            backgroundColor: '#fff',
            transition: 'width 0.15s ease-out'
          }} />
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.99)',
          backdropFilter: 'blur(20px)',
          zIndex: 11000,
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto'
        }} aria-modal="true" role="dialog">
          
          {/* Close button (Three lines) */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 11001
            }}
            aria-label="Close mobile menu"
          >
            <Menu size={28} />
          </button>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>Explore</Link>
          <Link href="/calendar" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>The Drop</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>Contact</Link>
        </div>
      )}
    </>
  );
}
