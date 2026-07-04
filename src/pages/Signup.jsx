import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signup, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const { session } = await signup(name, email, password);
      if (!session) {
        setSuccess("Registration successful! Please check your email inbox to confirm your account before logging in.");
        setName('');
        setEmail('');
        setPassword('');
      } else {
        navigate(from);
      }
    } catch (err) {
      setSuccess('');
      let errorMessage = "Failed to sign up";
      
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
      
      if (messageStr.includes('already registered') || messageStr.includes('already-in-use')) {
        errorMessage = "This email is already registered. Please log in instead.";
      } else if (messageStr.includes('should be at least') || messageStr.includes('weak-password')) {
        errorMessage = "Your password is too weak. It must be at least 6 characters long.";
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
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle(from);
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error(err);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h1 className="section-title" style={{ fontSize: '36px', marginBottom: '10px' }}>

          <span style={{ 
            background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Join Unite</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '14px' }}>Create an account to start exploring.</p>
        
        {error && <div style={{ background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', color: '#ff4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}
        {success && <div style={{ background: 'rgba(0,255,0,0.1)', border: '1px solid rgba(0,255,0,0.3)', color: '#4CAF50', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', lineHeight: '1.6' }}>{success}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input 
            type="text" 
            placeholder="Full Name" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input" 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input" 
          />
          <button disabled={loading} type="submit" className="grad-btn" style={{ border: 'none', cursor: 'pointer', padding: '16px', fontSize: '15px', fontWeight: '600', marginTop: '8px', borderRadius: '50px' }}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        <button disabled={loading} onClick={handleGoogle} className="outline-btn" style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.02)', color: '#fff' }}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ marginTop: '30px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
          Already have an account? <Link to="/login" state={{ from }} style={{ color: 'var(--pink)', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
