import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, isMember, logout } = useAuth();
  const navigate = useNavigate();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

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
    fontSize: '1.5rem',
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
        .nav-container-inner { padding: 20px 40px; position: relative; }
        .brand-link { position: relative; z-index: 2; }
        @media (max-width: 900px) {
          .desktop-group { display: none !important; }
          .mobile-hamburger { display: flex !important; position: absolute; right: 20px; top: 12px; }
          .nav-container-inner { padding: 12px 20px !important; justify-content: center !important; }
          .brand-link { position: static; margin: 0 auto; }
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
          <Link to="/" className="brand-link" style={{ 
            fontWeight: '700', 
            fontSize: '2rem',
            color: 'var(--text)',
            letterSpacing: '-0.04em',
            textDecoration: 'none'
          }}>
            Unite
          </Link>

          {/* DESKTOP NAV */}
          <div className="desktop-group" style={{ gap: '40px', alignItems: 'center' }}>
            <Link to="/" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Home</Link>
            <Link to="/calendar" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Full Calendar</Link>
            <Link to="/our-story" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Our Story</Link>
            <Link to="/contact" style={navLinkStyle} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Contact Us</Link>
            
            <div style={{ position: 'relative', marginLeft: '12px' }} ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <User size={24} />
              </button>

              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'var(--dark2)',
                  backgroundColor: 'rgba(0, 0, 0, 0.92)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  minHeight: '64px',
                  '--header-height': '64px',
                  padding: '8px 0',
                  minWidth: '160px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 50
                }}>
                  {currentUser ? (
                    <>
                      <div style={{ padding: '8px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '4px' }}>
                        {isMember && (
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            color: '#fff',
                            background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            display: 'inline-block',
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Member
                          </span>
                        )}
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Signed in as</span>
                        <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{currentUser.name || currentUser.email}</span>
                      </div>
                      <button 
                        onClick={handleLogout}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '12px 20px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          transition: 'color 0.2s ease, background 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login"
                        onClick={() => setIsDropdownOpen(false)}
                        style={{
                          color: 'var(--text-muted)',
                          padding: '12px 20px',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'color 0.2s ease, background 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup"
                        onClick={() => setIsDropdownOpen(false)}
                        style={{
                          color: 'var(--text-muted)',
                          padding: '12px 20px',
                          textDecoration: 'none',
                          fontSize: '0.95rem',
                          transition: 'color 0.2s ease, background 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>Home</Link>
          <Link to="/calendar" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>Full Calendar</Link>
          <Link to="/our-story" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>Our Story</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={mobileLinkStyle}>Contact Us</Link>
          
          <div style={{ marginTop: '32px' }}>
            {currentUser ? (
              <>
                <div style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {isMember && (
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#fff',
                      background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Member
                    </span>
                  )}
                  <br/>
                  Logged in as <br/>
                  <strong style={{ color: '#fff' }}>{currentUser.name || currentUser.email}</strong>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: '#fff',
                    color: '#000',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: '100%',
                    background: '#fff',
                    color: '#000',
                    textAlign: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
