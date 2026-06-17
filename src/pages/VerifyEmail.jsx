import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const { currentUser, reloadUser, logout } = useAuth();
  const [dotCount, setDotCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await reloadUser();
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [reloadUser]);

  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(c => (c + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // If verified, navigate to home (this acts as a fallback, App.jsx should unmount this automatically)
  useEffect(() => {
    if (currentUser?.emailVerified) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Check Your Inbox</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '30px' }}>
          We just sent a confirmation link to <strong style={{ color: '#fff' }}>{currentUser?.email}</strong>.
        </p>
        
        <div style={{ fontSize: '18px', color: 'var(--pink)', fontWeight: '600', marginBottom: '40px', height: '30px' }}>
          Waiting for verification{'.'.repeat(dotCount)}
        </div>

        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          Do not close this page! It will automatically log you in the moment you click the link.
        </p>
        
        <button onClick={handleLogout} className="outline-btn" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#fff', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', fontSize: '13px' }}>
          Use a different email
        </button>
      </div>
    </div>
  );
}
