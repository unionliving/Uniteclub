"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTransitionNavigate } from '../../context/TransitionContext';
import '../../index.css';

export default function Calendar() {
  const router = useRouter();
  const transitionTo = useTransitionNavigate();
  const { currentUser } = useAuth();

  return (
    <div style={{ minHeight: '80vh', textAlign: 'center', padding: '24px 24px 100px' }}>
      
      {/* Back button */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '24px', padding: '0' }}>
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
            <ArrowLeft size={16} /> back to home
          </button>
        </div>
      </section>

      <span className="section-tag" style={{ color: '#f01460' }}>What's Coming</span>
      <h1 className="section-title">
        <span style={{ 
          background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          paddingRight: '0.15em'
        }}>Full Calendar</span>
      </h1>
      <p className="section-body" style={{ margin: '0 auto 60px', maxWidth: '800px', fontSize: '1.2rem' }}>
         A complete schedule of all upcoming experiences, workshops, and meetups.
      </p>

      <div className="events-grid" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
        {[
          {
            id: "founder-mixer",
            cat: "Networking",
            name: "Founder Mixer",
            desc: "Meet entrepreneurs, creators and ambitious builders in one room. Magic tends to happen here.",
            img: "/fun_networking.png"
          },
          {
            id: "paint-pour",
            cat: "Creative",
            name: "Paint & Pour",
            desc: "An evening of art, conversation and good company.",
            img: "/six-pillars/moodboard.PNG"
          },
          {
            id: "linkedin-audit",
            cat: "Career",
            name: "LinkedIn Audit Session",
            desc: "Build a profile that opens doors.",
            img: "/creative_workshop.png"
          },
          {
            id: "mixtape-night",
            cat: "Culture",
            name: "Mixtape Night",
            desc: "A curated evening of music, culture and unforgettable moments.",
            img: "/six-pillars/mixtape.png"
          },
          {
            id: "wellness-morning",
            cat: "Wellness",
            name: "Wellness Morning Club",
            desc: "Move, meditate and reset. The best way to start your week.",
            img: "/wellness_morning.png"
          }
        ].map((event) => (
          <div key={event.id} className="event-card" onClick={() => transitionTo(`/event/${event.id}`)}>
            <img className="event-img" loading="lazy" src={event.img} alt={event.name} />
            <div className="event-body">
              <span className="event-cat">{event.cat}</span>
              <div className="event-name">{event.name}</div>
              <div className="event-desc">{event.desc}</div>
              <div className="event-arrow"><ArrowRight size={20} strokeWidth={2} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
