"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import '../../index.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions.');
    } catch (err) {
      setMessage('');
      let errorMessage = "Failed to reset password.";
      
      const getCleanErrorMessage = (eObj) => {
        if (!eObj) return "";
        if (typeof eObj === 'string') {
          const trimmed = eObj.trim();
          return trimmed !== '{}' ? trimmed : "";
        }
        if (typeof eObj.message === 'string') {
          const trimmed = eObj.message.trim();
          return trimmed !== '{}' ? trimmed : "";
        }
        if (eObj.error_description && typeof eObj.error_description === 'string') {
          return eObj.error_description;
        }
        return "";
      };

      const messageStr = getCleanErrorMessage(err);
      
      if (messageStr.includes('User not found') || messageStr.includes('user-not-found')) {
        errorMessage = "There is no account associated with this email.";
      } else if (messageStr.includes('valid email') || messageStr.includes('invalid-email')) {
        errorMessage = "Please enter a valid email address.";
      } else if (messageStr.includes('rate limit exceeded') || messageStr.includes('rate_limit_exceeded')) {
        errorMessage = "Email rate limit exceeded. Please wait a few minutes before trying again.";
      } else if (messageStr) {
        errorMessage = messageStr;
      }
      
      setError(errorMessage);
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2 style={{ fontSize: '24px', marginBottom: '8px', textAlign: 'center' }}>Reset Password</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
          Enter your email and we'll send you a link to reset your password.
        </p>

        {error && <div style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}
        {message && <div style={{ background: 'rgba(0,255,0,0.1)', border: '1px solid rgba(0,255,0,0.3)', color: '#4CAF50', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input" 
          />
          <button disabled={loading} type="submit" className="grad-btn" style={{ border: 'none', cursor: 'pointer', padding: '16px', fontSize: '15px', fontWeight: '600', marginTop: '8px', borderRadius: '50px' }}>
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/login" style={{ color: 'var(--pink)', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
