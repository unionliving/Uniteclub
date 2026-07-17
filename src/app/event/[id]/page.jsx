"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, CheckCircle2 } from 'lucide-react';

import { useTransitionNavigate } from '../../../context/TransitionContext';
import { supabase } from '../../../lib/supabase';

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
  },
  "delulu-wedding": {
    title: "Delulu Wedding",
    category: "PARTY",
    date: "18 July | 🕛 10 PM onwards",
    location: "Levitate,Hotel Sea Princess, Juhu",
    description: "Step into the most iconic wedding-themed party in town! Delulu Wedding, curated by Union Living, is a night of music, dancing and unforgettable vibes with immersive wedding décor and electrifying performances by Man of God, Mehta Music and Synxx. Dress to impress, bring your baraat and celebrate because #NoRishtaAttached.\n\n📍 Levitate,Hotel Sea Princess, Juhu\n🗓️ 18 July | 🕙 10 PM onwards",
    image: "/Unite-1.jpeg",
    themeColor: "rgba(30, 20, 25, 0.95)",
    expect: [
      "Baraat entry experience",
      "Live DJ playing wedding bangers",
      "Themed photo booths",
      "Late night snacks & drinks"
    ],
    lumaLink: "https://luma.com/iofe88p8"
  },
  "electric-pulse": {
    title: "Electric Pulse",
    category: "PARTY",
    date: "25 July 2026 • 9:00 PM",
    location: "NMIMS Navi Mumbai",
    description: "College is back, and we’re setting the benchmark for how NMIMS Navi Mumbai house parties should be done. Join an exclusive, invite-only night curated by Union Living, featuring a Glow in the Dark theme, high-energy music, interactive games and an incredible crowd. Meet new people, make unforgettable memories and kick off college with a party you’ll be talking about long after it’s over.\n\nLimited spots. Start your college journey the Union way.\n\n📍 Union Student Residences - Kharghar 21\n🎓 Exclusively for NMIMS Navi Mumbai Students\n🎟️ Limited Entry | Invite Only",
    image: "/Unite-2.jpeg",
    themeColor: "rgba(15, 25, 40, 0.95)",
    expect: [
      "Glow in the dark accessories provided",
      "High energy EDM & House music",
      "Exclusive for college students",
      "Unforgettable kickoff party"
    ],
    lumaLink: "https://luma.com/vw53kq1q"
  }
};

export default function EventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const transitionTo = useTransitionNavigate();
  const pathname = usePathname();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  let data = eventData[id];
  if (!data && id) {
    const decoded = decodeURIComponent(id);
    const hyphenated = decoded.toLowerCase().replace(/\s+/g, '-');
    data = eventData[hyphenated] || Object.values(eventData).find(e => e.title.toLowerCase() === decoded.toLowerCase() || e.title.toLowerCase().replace(/\s+/g, '-') === hyphenated);
  }

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

  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ paddingTop: '80px', paddingBottom: '150px', minHeight: '100vh', color: '#fff', maxWidth: '1400px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
      <style>{`
        .event-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 60px;
        }
        .left-col {
          grid-column: span 7;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .right-col {
          grid-column: span 5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
        }
        .right-col-rsvp {
          align-items: flex-end;
        }
        @media (max-width: 1024px) {
          .event-grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }
          .right-col {
            justify-content: flex-start;
          }
          .right-col-rsvp {
            align-items: center;
          }
          .title-alignment {
            align-items: flex-start !important;
            text-align: left !important;
          }
        }
      `}</style>
      <button 
        onClick={() => transitionTo('/calendar')} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#fff', 
          cursor: 'pointer', 
          padding: '0 0 24px 0', 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <ArrowLeft size={28} />
      </button>

      <div className="event-grid">
        
        {/* Image (Top Left) */}
        <div style={{ gridColumn: 'span 7' }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: data.themeColor || 'rgba(255,255,255,0.05)',
          }}>
            <img 
              src={data.image} 
              alt={data.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Title (Responsive Alignment) */}
        <div className="title-alignment" style={{ 
          gridColumn: 'span 5', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'flex-end',
          textAlign: 'right'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
            fontWeight: 700, 
            lineHeight: 1, 
            textTransform: 'uppercase', 
            fontFamily: 'serif',
            margin: 0
          }}>
            {data.title.split(' ').map((word, idx) => (
              <React.Fragment key={idx}>
                {word}
                {idx !== data.title.split(' ').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>

        {/* Description & Details (Bottom Left) */}
        <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.6', color: '#EAEAEA' }}>
            {data.description.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i !== data.description.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          
        </div>

        {/* RSVP Section (Bottom Right) */}
        <div className="right-col-rsvp" style={{ 
          gridColumn: 'span 5', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          paddingTop: '8px'
        }}>
          {!showForm ? (
            <button 
              onClick={() => {
                if (data.lumaLink) {
                  window.open(data.lumaLink, '_blank');
                } else {
                  setShowForm(true);
                }
              }}
              style={{ 
                backgroundColor: '#351111', 
                color: '#fff', 
                padding: '20px 40px', 
                fontSize: '1.4rem', 
                fontWeight: '600', 
                borderRadius: '40px', 
                border: 'none', 
                cursor: 'pointer',
                transition: 'transform 0.2s ease, opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Reserve Your Spot
            </button>
          ) : (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--grid-color)',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              textAlign: 'left'
            }}>
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
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
