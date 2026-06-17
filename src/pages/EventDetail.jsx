import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import { useTransitionNavigate } from '../context/TransitionContext';

const eventData = {
  "founder-mixer": {
    title: "Founder Mixer",
    category: "NETWORKING",
    date: "Saturday, June 20, 2026 • 7:00 PM",
    location: "Union Living Co-living Space, Mumbai",
    description: "Meet entrepreneurs, creators, and ambitious builders in one room. Magic tends to happen here. Connect with like-minded individuals, share ideas, and find potential collaborators for your next big project.",
    image: "/fun_networking.png",
    themeColor: "rgba(28, 30, 38, 0.95)",
    expect: [
      "Speed networking sessions to meet every attendee",
      "Q&A session with invited startup founders",
      "Curated food, drinks, and casual discussions",
      "Access to the exclusive Unite digital network"
    ]
  },
  "paint-pour": {
    title: "Paint & Pour",
    category: "CREATIVE",
    date: "Wednesday, June 24, 2026 • 6:30 PM",
    location: "Union Living Rooftop, Mumbai",
    description: "An evening of art, conversation, and good company. Unleash your creativity on canvas while enjoying fine wine and sharing stories. No prior painting experience required—our resident artist will guide you step-by-step.",
    image: "/six-pillars/moodboard.PNG",
    themeColor: "rgba(222, 214, 204, 0.95)",
    expect: [
      "All painting materials (canvas, paints, brushes) provided",
      "Complimentary wine, cheese, and refreshments",
      "Hands-on guidance from a professional artist",
      "Take home your very own masterpiece"
    ]
  },
  "linkedin-audit": {
    title: "LinkedIn Audit Session",
    category: "CAREER",
    date: "Monday, June 29, 2026 • 5:00 PM",
    location: "Co-working lounge, Mumbai",
    description: "Build a profile that opens doors. Learn how to optimize your LinkedIn presence, attract recruiters, and construct a powerful personal brand. Our industry experts will review your profile live and provide actionable feedback.",
    image: "/creative_workshop.png",
    themeColor: "rgba(178, 186, 175, 0.95)",
    expect: [
      "1-on-1 profile review with an industry mentor",
      "Resume and LinkedIn optimization workshops",
      "Professional headshot photo session",
      "Networking with local professionals"
    ]
  },
  "mixtape-night": {
    title: "Mixtape Night",
    category: "CULTURE",
    date: "Friday, July 3, 2026 • 8:00 PM",
    location: "Social Lounge, Mumbai",
    description: "A curated evening of music, culture, and unforgettable moments. Experience live performances by local indie artists and discover fresh talent in an intimate acoustic setting.",
    image: "/six-pillars/mixtape.png",
    themeColor: "rgba(60, 45, 40, 0.95)",
    expect: [
      "Live performances by 3 local indie artists",
      "Intimate acoustic vibe and cozy lounge seating",
      "Exclusive vinyl listening session",
      "Signature cocktails and snacks"
    ]
  },
  "wellness-morning": {
    title: "Wellness Morning Club",
    category: "WELLNESS",
    date: "Sunday, July 5, 2026 • 8:00 AM",
    location: "Green Terrace, Mumbai",
    description: "Move, meditate, and reset. The best way to start your week. Join us for a rejuvenating morning flow followed by group mindfulness meditation and a healthy community breakfast.",
    image: "/wellness_morning.png",
    themeColor: "rgba(45, 45, 45, 0.95)",
    expect: [
      "60-minute guided vinyasa yoga flow",
      "Mindfulness and breathing meditation circle",
      "Freshly squeezed cold juices and smoothie bowls",
      "Mental wellness journaling session"
    ]
  }
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const transitionTo = useTransitionNavigate();
  const location = useLocation();
  const { currentUser, isMember, checkingMembership } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const isMixtape = id === 'mixtape-night' || id === 'mixtape-sessions';

  useEffect(() => {
    if (!isMixtape) return;
    if (!document.getElementById('luma-checkout')) {
      const s = document.createElement('script');
      s.id = 'luma-checkout';
      s.src = 'https://embed.lu.ma/checkout-button.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, [isMixtape]);

  const data = eventData[id];

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h2>Event not found</h2>
        <button onClick={() => transitionTo('/calendar')} className="grad-btn" style={{ marginTop: '20px' }}>Back to Calendar</button>
      </div>
    );
  }

  const handleRsvp = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([
          {
            event_id: id,
            event_title: data.title,
            name: name.trim(),
            gmail: email.trim()
          }
        ]);
      if (error) throw error;
      setSuccess(true);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error submitting RSVP:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '24px', paddingBottom: '150px', minHeight: '100vh', color: '#fff' }}>
      
      {/* Back button */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '24px', padding: '0' }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9' }}>
          <button 
            onClick={() => transitionTo('/calendar')}
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
            <ArrowLeft size={16} /> back to calendar
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '48px', padding: '0' }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 6' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', color: 'var(--text-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '16px' }}>{data.category}</span>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            fontWeight: 500,
            marginBottom: '32px'
          }}>
            {data.title}
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#EAEAEA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
              <CalendarIcon size={20} style={{ color: 'var(--text-muted)' }} />
              <span>{data.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem' }}>
              <MapPin size={20} style={{ color: 'var(--text-muted)' }} />
              <span>{data.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Registration */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: '40px', padding: '0' }}>
        
        {/* Left Side: About the Event & Expectation List */}
        <div className="mobile-col-full" style={{ gridColumn: '1 / 5', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 500 }}>About the event</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{data.description}</p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--grid-color)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '24px', fontWeight: 500 }}>What's included</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.expect.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={18} style={{ color: '#fff', marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Image & RSVP Form */}
        <div className="mobile-col-full" style={{ gridColumn: '5 / 9', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Featured Image */}
          <div style={{
            width: '100%',
            height: '280px',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: data.themeColor,
            position: 'relative'
          }}>
            <img 
              src={data.image} 
              alt={data.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9
              }}
            />
          </div>

          {/* RSVP Card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--grid-color)',
            borderRadius: '16px',
            padding: '32px'
          }}>
            {isMixtape ? (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, margin: 0 }}>Register for Event</h3>
                <a
                  href="https://luma.com/event/evt-fKs4fJ5RZCRsr2N"
                  className="luma-checkout--button"
                  data-luma-action="checkout"
                  data-luma-event-id="evt-fKs4fJ5RZCRsr2N"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(90deg,#7c5cff,#4da6ff)',
                    color: '#fff',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Register for Event
                </a>
              </div>
            ) : checkingMembership && id !== 'paint-pour' ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>Checking membership status...</p>
              </div>
            ) : (id === 'paint-pour' || isMember) ? (
              <>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontWeight: 500 }}>Reserve your spot</h3>
                <form onSubmit={handleRsvp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

                  {error && <div style={{ color: '#ff4d4d', fontSize: '0.95rem' }}>{error}</div>}
                  {success && <div style={{ color: '#4dff4d', fontSize: '0.95rem' }}>RSVP submitted! We will email you the details.</div>}

                  <button 
                    type="submit" 
                    className="grad-btn"
                    disabled={loading}
                    style={{ border: 'none', cursor: loading ? 'not-allowed' : 'pointer', padding: '16px', fontSize: '16px', fontWeight: '600', opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Submitting...' : 'Register'}
                  </button>
                </form>
              </>
            ) : currentUser ? (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, margin: 0 }}>Become a Member</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  You're signed in! However, this experience is members-only. Please explore membership to activate your club access.
                </p>
                <button 
                  onClick={() => transitionTo('/membership', { state: { from: location.pathname } })}
                  className="grad-btn"
                  style={{ border: 'none', cursor: 'pointer', padding: '16px', fontSize: '16px', fontWeight: '600', width: '100%' }}
                >
                  Become a Member
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 500, margin: 0 }}>Become a Member</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                  This experience is members-only. To reserve your spot, please become a member or sign in.
                </p>
                <button 
                  onClick={() => transitionTo('/membership', { state: { from: location.pathname } })}
                  className="grad-btn"
                  style={{ border: 'none', cursor: 'pointer', padding: '16px', fontSize: '16px', fontWeight: '600', width: '100%' }}
                >
                  Become a Member
                </button>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  Already a member?{' '}
                  <button 
                    onClick={() => transitionTo('/login', { state: { from: location.pathname } })}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '14px' }}
                  >
                    Log In
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
