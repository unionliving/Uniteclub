"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTransitionNavigate } from '../../../context/TransitionContext';

const pillarData = {
  "declutter": {
    title: "DECLUTTER",
    subtitle: "Pause your routine and reconnect with yourself.",
    category: "CALM. REFLECT. RESET.",
    items: [
      "Meditation circles",
      "Mental wellness sessions",
      "Mindfulness workshops",
      "Journaling clubs",
      "Digital detox experiences"
    ],
    image: "/six-pillars/declutter.PNG",
    themeColor: "rgba(242, 240, 235, 0.95)",
    textColor: "#1A1A1A"
  },
  "elevate": {
    title: "ELEVATE",
    subtitle: "Move your body. Elevate your mind.",
    category: "MOVE. ENERGISE. THRIVE.",
    items: [
      "Fitness sessions",
      "Sports leagues",
      "Group workouts",
      "Wellness challenges",
      "Outdoor activities"
    ],
    image: "/six-pillars/elevate.PNG",
    themeColor: "rgba(45, 45, 45, 0.95)",
    textColor: "#F5F5F5"
  },
  "junior-senior": {
    title: "JUNIOR SENIOR",
    subtitle: "Learn from those who've already walked the path.",
    category: "LEARN. GROW. LEVEL UP.",
    items: [
      "Mentorship programs",
      "LinkedIn audits",
      "Career guidance",
      "Masterclasses",
      "Industry conversations",
      "Skill-building workshops",
      "Alumni AMAs"
    ],
    image: "/six-pillars/juniorsenior.PNG",
    themeColor: "rgba(178, 186, 175, 0.95)",
    textColor: "#111111"
  },
  "mixtape-sessions": {
    title: "MIXTAPE SESSIONS",
    subtitle: "A platform for music, culture and unforgettable nights.",
    category: "DISCOVER. LISTEN. EXPERIENCE.",
    items: [
      "Live music",
      "Indie artists",
      "Listening sessions",
      "Open mics",
      "Creative showcases"
    ],
    image: "/six-pillars/mixtape.png",
    themeColor: "rgba(28, 30, 38, 0.95)",
    textColor: "#EAEAEA"
  },
  "moodboard": {
    title: "MOODBOARD",
    subtitle: "Where creativity comes alive.",
    category: "CREATE. EXPRESS. EXPLORE.",
    items: [
      "Art jams",
      "Creative workshops",
      "Design sessions",
      "Community markets",
      "Painting experiences",
      "Photography walks"
    ],
    image: "/six-pillars/moodboard.PNG",
    themeColor: "rgba(222, 214, 204, 0.95)",
    textColor: "#1E1E1E"
  },
  "better-together": {
    title: "BETTER TOGETHER",
    subtitle: "The social heart of Unite.",
    category: "CONNECT. SHARE. BELONG.",
    items: [
      "Community dinners",
      "Game nights",
      "House parties",
      "Food trails",
      "Movie screenings",
      "Celebrations"
    ],
    image: "/six-pillars/bettertogether.png",
    themeColor: "rgba(60, 45, 40, 0.95)",
    textColor: "#F2ECE9"
  }
};

export default function Pillar() {
  const { id } = useParams();
  const router = useRouter();
  const transitionTo = useTransitionNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const data = pillarData[id];

  useEffect(() => {
    // Small delay to trigger entry animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [id]);

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h2>Pillar not found</h2>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '24px', paddingBottom: '150px', minHeight: '100vh', color: '#fff' }}>
      
      {/* Back button */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '24px', padding: '0' }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9' }}>
          <button 
            onClick={() => transitionTo(-1)}
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
              fontSize: '0.8rem'
            }}
          >
            <ArrowLeft size={16} /> back to home
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '48px', padding: '0' }}>
        <div className="mobile-col-full" style={{ 
          gridColumn: '1 / 6',
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', color: 'var(--text-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '16px' }}>{data.category}</span>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 6rem)',
            lineHeight: '1',
            letterSpacing: '-0.03em',
            fontWeight: 500,
            marginBottom: '32px'
          }}>
            {data.title}
          </h1>

          <p style={{
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            color: '#EAEAEA',
            lineHeight: '1.4',
            fontWeight: 400,
            maxWidth: '80%'
          }}>
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: '40px', padding: '0' }}>
        
        {/* Left Side: Features List */}
        <div className="mobile-col-full" style={{ 
          gridColumn: '1 / 4',
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--grid-color)',
            borderRadius: '16px',
            padding: '40px',
            height: '100%'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '32px', fontWeight: 500 }}>What to expect</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.items.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={20} style={{ color: '#fff' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="mobile-col-full" style={{ 
          gridColumn: '4 / 9',
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
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
        </div>
      </section>

    </div>
  );
}
