"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../supabase';
import { useAuth } from '../../context/AuthContext';
import '../../index.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  const getCleanErrorMessage = (err, defaultMsg = "Failed to reset password") => {
    if (!err) return defaultMsg;
    if (typeof err === 'string') {
      const trimmed = err.trim();
      return (trimmed && trimmed !== '{}') ? trimmed : defaultMsg;
    }
    const message = err.message;
    if (typeof message === 'string') {
      const trimmed = message.trim();
      return (trimmed && trimmed !== '{}') ? trimmed : defaultMsg;
    }
    if (err.error_description && typeof err.error_description === 'string') {
      return err.error_description;
    }
    return defaultMsg;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setSuccess('Your password has been reset successfully! Redirecting to login...');
      setPassword('');
      setConfirmPassword('');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      const errorMessage = getCleanErrorMessage(err, "Failed to update password. Your recovery link may be expired.");
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1 className="section-title" style={{ fontSize: '36px', marginBottom: '10px' }}>
          Reset{' '}
          <span style={{ 
            background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Password</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '14px' }}>
          Enter your new password below.
        </p>

        {error && (
          <div style={{ 
            background: 'rgba(255,0,0,0.1)', 
            border: '1px solid rgba(255,0,0,0.3)', 
            color: '#ff4444', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            fontSize: '13px' 
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            background: 'rgba(0,255,0,0.1)', 
            border: '1px solid rgba(0,255,0,0.3)', 
            color: '#4CAF50', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            fontSize: '13px',
            lineHeight: '1.6' 
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            type="password" 
            placeholder="New Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input" 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input" 
          />
          <button 
            disabled={loading} 
            type="submit" 
            className="grad-btn" 
            style={{ 
              border: 'none', 
              cursor: 'pointer', 
              padding: '16px', 
              fontSize: '15px', 
              fontWeight: '600', 
              marginTop: '8px', 
              borderRadius: '50px' 
            }}
          >
            {loading ? 'Updating Password...' : 'Reset Password'}
          </button>
        </form>

        <div style={{ textAlignment: 'center', marginTop: '20px' }}>
          <Link href="/login" style={{ color: 'var(--pink)', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
