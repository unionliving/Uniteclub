"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTransitionNavigate } from '../../context/TransitionContext';
import { supabase } from '../../lib/supabase';
import '../../index.css';

export default function Contact() {
  const router = useRouter();
  const transitionTo = useTransitionNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: supabaseError } = await supabase
        .from('contactus')
        .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '24px', paddingBottom: '150px', minHeight: '100vh', color: '#fff' }}>
      
      {/* Back button */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '40px', padding: '0' }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9' }}>
          <button 
            onClick={() => transitionTo('/')}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              textAlign: 'left'
            }}
          >
            <ArrowLeft size={16} /> back to explore
          </button>
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Get In Touch</span>
        <h1 style={{ fontFamily: 'var(--font-main), Montserrat, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px', textAlign: 'center' }}>
          Let's Create <span style={{ 
            background: 'linear-gradient(to right, #ff0055, #ff5500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic',
            paddingRight: '0.1em'
          }}>Experiences</span> Together!
        </h1>
        <p style={{ fontFamily: 'var(--font-main), Montserrat, sans-serif', margin: '0 auto 40px', maxWidth: '800px', fontSize: '1.1rem', color: '#e0e0e0', textAlign: 'center' }}>
          From brand partnerships to venue collaborations and membership enquiries, our inbox is always open.
        </p>

        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
            style={{ padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            style={{ padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' }} 
          />
          <textarea 
            placeholder="Your Message" 
            rows="5" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            required
            style={{ padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', resize: 'vertical' }}
          ></textarea>

          {error && <div style={{ color: '#ff4d4d', fontSize: '0.95rem' }}>{error}</div>}
          {success && <div style={{ color: '#4dff4d', fontSize: '0.95rem' }}>Your message has been sent successfully!</div>}

          <button 
            type="submit" 
            className="grad-btn" 
            disabled={loading}
            style={{ border: 'none', cursor: loading ? 'not-allowed' : 'pointer', padding: '16px', fontSize: '16px', fontWeight: '600', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
