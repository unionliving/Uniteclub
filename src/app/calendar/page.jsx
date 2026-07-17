"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTransitionNavigate } from '../../context/TransitionContext';
import '../../index.css';

export default function Calendar() {
  const transitionTo = useTransitionNavigate();

  const events = [
    {
      id: "delulu-wedding",
      line1: "DELULU",
      line2: "WEDDING",
      date: "A WEDDING-THEMED PARTY WHERE STRANGERS BECOME THE BARAAT AND MEMORIES LAST LONGER THAN THE VOWS.",
      image: "/Unite-1.jpeg"
    },
    {
      id: "electric-pulse",
      line1: "ELECTRIC",
      line2: "PULSE",
      date: "AN EXCLUSIVE GLOW IN THE DARK HOUSE PARTY CRAFTED FOR NMIMS NAVI MUMBAI STUDENTS TO KICKSTART COLLEGE IN STYLE.",
      image: "/Unite-2.jpeg"
    },
    {
      id: "movie-under-the-stars",
      line1: "MOVIE UNDER",
      line2: "THE STARS",
      date: "A COZY OPEN-AIR MOVIE NIGHT WITH GREAT FILMS, GOOD COMPANY AND UNFORGETTABLE VIBES UNDER THE STARS.",
      image: "/Unite-3.jpeg"
    }
  ];

  return (
    <div style={{ minHeight: '80vh', padding: '24px 24px 100px', backgroundColor: '#000' }}>
      <style>{`
        .calendar-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background-color: transparent;
          opacity: 0;
          transform: translate3d(150px, 0, 0);
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .calendar-row.visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .calendar-row-2 {
          margin-top: 24px;
        }
        .calendar-card {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: none;
        }
        .calendar-card-info {
          background-color: #000000;
          color: #ffffff;
          padding: 40px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .calendar-card-text {
          display: flex;
          flex-direction: column;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: clamp(1.4rem, 2.2vw, 2.4rem);
          line-height: 1.05;
          text-transform: uppercase;
          color: #ffffff;
          letter-spacing: -0.03em;
        }
        .calendar-card-line1 { opacity: 1; }
        .calendar-card-line2 { opacity: 1; }
        .calendar-card-date {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 24px;
          letter-spacing: 0.05em;
          font-weight: 500;
        }
        .calendar-card-img-wrapper {
          width: 100%;
          height: 30vw;
          overflow: hidden;
          position: relative;
        }
        .calendar-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .calendar-card:hover .calendar-card-img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .calendar-row { grid-template-columns: 1fr; }
          .calendar-row-2 { margin-top: 0; }
          .calendar-card-img-wrapper { height: 55vw; }
          .calendar-card-info { padding: 24px; min-height: auto; }
          .calendar-card-text { font-size: clamp(1.2rem, 4vw, 1.6rem); }
        }
      `}</style>
      
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

      <section className="calendar-section" style={{ position: 'relative', zIndex: 10, maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
          <div className="mobile-col-full" style={{ gridColumn: '1 / 9', display: 'flex', alignItems: 'center', marginBottom: '40px', color: 'var(--text-muted)' }}>
            <span style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
              marginRight: '16px', 
              fontWeight: '400', 
              color: '#fff'
            }}>What's Happening</span>
          </div>
        </div>

        <div className="calendar-row visible">
          {events.slice(0, 2).map((event) => (
            <div 
              key={event.id}
              onClick={() => transitionTo(`/event/${event.id}`)}
              className="calendar-card"
            >
              <div className="calendar-card-img-wrapper">
                <img 
                  src={event.image} 
                  alt={`${event.line1} ${event.line2}`} 
                  className="calendar-card-img"
                />
              </div>
              <div className="calendar-card-info">
                <div className="calendar-card-text">
                  <span className="calendar-card-line1">{event.line1}</span>
                  <span className="calendar-card-line2">{event.line2}</span>
                </div>
                <div className="calendar-card-date">
                  {event.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="calendar-row visible">
          {events.slice(2).map((event) => (
            <div 
              key={event.id}
              onClick={event.id === "movie-under-the-stars" ? undefined : () => transitionTo(`/event/${event.id}`)}
              className="calendar-card"
              style={{ cursor: event.id === "movie-under-the-stars" ? 'default' : 'pointer' }}
            >
              <div className="calendar-card-img-wrapper">
                <img 
                  src={event.image} 
                  alt={`${event.line1} ${event.line2}`} 
                  className="calendar-card-img"
                />
              </div>
              <div className="calendar-card-info">
                <div className="calendar-card-text">
                  <span className="calendar-card-line1">{event.line1}</span>
                  <span className="calendar-card-line2">{event.line2}</span>
                </div>
                <div className="calendar-card-date">
                  {event.date}
                </div>
              </div>
            </div>
          ))}
          {/* Spacer slot to align first card on left in row 2 */}
          <div style={{ pointerEvents: 'none' }} className="mobile-hide"></div>
        </div>
      </section>
    </div>
  );
}
