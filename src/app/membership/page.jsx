"use client";
import React, { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import '../../index.css';
import { supabase } from '../../lib/supabase';

export default function Membership() {
  const [activeFaqs, setActiveFaqs] = useState({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleMembershipRequest = async () => {
    if (!email || !email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase
        .from('membership_requests')
        .insert([{ email: email.trim() }]);
        
      if (error) throw error;
      
      // Send confirmation email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      
      setStatus({ type: 'success', message: 'Membership request sent! Check your email for confirmation.' });
      setEmail('');
    } catch (err) {
      console.error('Supabase Error:', err);
      setStatus({ type: 'error', message: err?.message || 'Failed to submit request. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      q: "What is Unite Membership?",
      a: "Unite Membership gives you access to exclusive events, curated experiences, workshops, premium partner rewards, and members-only privileges across every Unite city."
    },
    {
      q: "What's included with my membership?",
      a: "Your membership includes:\n• Access to members-only events and experiences\n• Creative, wellness, and networking workshops\n• Exclusive rewards from partner brands\n• Priority access to limited-capacity experiences\n• Year-round access across all Unite cities"
    },
    {
      q: "Is Unite Membership free for Union residents?",
      a: "Yes. Every active Union resident receives a complimentary Unite Membership for the duration of their lease."
    },
    {
      q: "How much does Unite Membership cost?",
      a: "Unite Membership is ₹5,000 per year. If you're staying at any Union property, your membership is included at no additional cost."
    },
    {
      q: "Can anyone become a member?",
      a: "Yes. Anyone can apply for Unite Membership. Some experiences are open to all members, while others may have limited availability or invite-only access."
    },
    {
      q: "Are all events included?",
      a: "Most Unite experiences are included with your membership. Certain premium or partner-hosted experiences may require an additional fee, which will always be communicated in advance."
    },
    {
      q: "Is my membership valid across all cities?",
      a: "Yes. Your membership works across all Unite experiences in Mumbai, Pune, Gurugram, Ahmedabad, and every new city we launch in."
    },
    {
      q: "Can I bring a guest?",
      a: "Some experiences allow guests, while others are exclusively for members. Each event page will clearly mention the guest policy."
    },
    {
      q: "How do I activate my membership?",
      a: "Once your membership is approved, you'll receive access to your member account, where you can explore experiences, reserve your spot, and unlock partner rewards."
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      color: '#fff',
      position: 'relative',
      fontFamily: 'var(--font-sans)',
      paddingBottom: '100px'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/group.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }} />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.95) 100%)',
        zIndex: -1
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        
        {/* Top Icons */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <img src="/Unite-logo.png" alt="Unite Logo" style={{ height: '90px', width: 'auto', marginBottom: '0px', display: 'block' }} />
          <span className="logo" style={{ fontSize: '3rem', textDecoration: 'none', color: '#fff', margin: 0 }}>Unite</span>
        </div>

        {/* Hero Section */}
        <h1 style={{ 
          fontFamily: 'var(--font-main), Montserrat, sans-serif',
          fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)', 
          fontWeight: '900', 
          lineHeight: '1.1',
          marginBottom: '24px',
          letterSpacing: '-1px'
        }}>
          <span style={{ whiteSpace: 'nowrap' }}>Unlock a year of unforgettable</span><br/>experiences.
        </h1>
        
        <div style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          ₹5,000 / year
        </div>
        
        <p style={{ 
          fontSize: '1rem', 
          color: 'FFFFFF', 
          maxWidth: '900px', 
          margin: '0 auto 40px',
          lineHeight: '1.5',
          fontWeight: '400'
        }}>
          Discover exclusive events, creator-led workshops, wellness experiences<br/>and member-only rewards with one annual membership.
        </p>

        {/* Top Form */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          maxWidth: '800px', 
          margin: '0 auto 60px' 
        }}>
          <div style={{ display: 'flex', gap: '12px' }} className="mobile-stack">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                flex: 1,
                padding: '16px 20px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button 
              onClick={handleMembershipRequest}
              disabled={loading}
              style={{
              backgroundColor: '#661b02',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '16px 36px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s ease',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#822404')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#661b02')}
            >
              {loading ? 'Submitting...' : 'Request Membership >'}
            </button>
          </div>
          {status && (
            <div style={{ 
              color: status.type === 'error' ? '#ff4d4d' : '#4dff4d', 
              fontSize: '0.95rem',
              marginTop: '8px',
              textAlign: 'left'
            }}>
              {status.message}
            </div>
          )}
        </div>

        {/* Included Banner */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '16px',
          marginBottom: '80px',
          fontSize: '1.8rem',
          fontWeight: '500'
        }}>
          <span>Included free with</span>
          <img 
            src="https://pub-6d08c79af1b441ba9ae8499c407fd9d0.r2.dev/files/272727%20logo%20(1)%201.png" 
            alt="Union Living" 
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
          />
          <span>lease.</span>
        </div>

        {/* FAQs */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '40px' }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{ maxWidth: '1000px', margin: '0 auto 80px', textAlign: 'left' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{ 
                borderBottom: '1px solid rgba(255,255,255,0.1)', 
                padding: '24px 0'
              }}
            >
              <button 
                onClick={() => toggleFaq(index)}
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: 'transparent', 
                  border: 'none', 
                  color: '#fff', 
                  fontSize: '1.1rem', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0',
                  textAlign: 'left'
                }}
              >
                {faq.q}
                {activeFaqs[index] ? <ChevronUp size={20} color="rgba(255,255,255,0.5)" /> : <ChevronDown size={20} color="rgba(255,255,255,0.5)" />}
              </button>
              {activeFaqs[index] && (
                <p style={{ marginTop: '16px', color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '32px' }}>
          Ready to unlock your membership?
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          maxWidth: '800px', 
          margin: '0 auto 32px' 
        }}>
          {/* Bottom Form */}
          <div style={{ display: 'flex', gap: '12px' }} className="mobile-stack">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                flex: 1,
                padding: '16px 20px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button 
              onClick={handleMembershipRequest}
              disabled={loading}
              style={{
              backgroundColor: '#661b02',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '16px 36px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s ease',
              fontFamily: 'var(--font-sans)'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#822404')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#661b02')}
            >
              {loading ? 'Submitting...' : 'Request Membership >'}
            </button>
          </div>
          {status && (
            <div style={{ 
              color: status.type === 'error' ? '#ff4d4d' : '#4dff4d', 
              fontSize: '0.95rem',
              marginTop: '8px',
              textAlign: 'left'
            }}>
              {status.message}
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.5' }}>
          Join a growing community with access to exclusive experiences, workshops, and member-only rewards throughout the year.
        </p>

      </div>
    </div>
  );
}
