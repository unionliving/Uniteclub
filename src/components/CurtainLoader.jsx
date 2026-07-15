"use client";
import React, { useEffect, useState } from 'react';

export default function CurtainLoader({ onComplete }) {
  const [slide, setSlide] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const slideTimeout = setTimeout(() => {
      setSlide(true);
    }, 1800);

    const completeTimeout = setTimeout(() => {
      setRemoved(true);
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(slideTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '-20vh',
      left: 0,
      width: '100vw',
      height: '140vh',
      zIndex: 99999,
      backgroundImage: 'linear-gradient(to bottom, #f01460 0%, #f42f4a 45%, #fb531d 75%, transparent 100%)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      boxShadow: '0 -30px 100px rgba(240, 20, 96, 0.45), 0 30px 100px rgba(251, 83, 29, 0.45)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0vh, black 20vh, black 120vh, transparent 140vh)',
      maskImage: 'linear-gradient(to bottom, transparent 0vh, black 20vh, black 120vh, transparent 140vh)',
      transition: 'transform 1.0s cubic-bezier(0.33, 1, 0.68, 1)', // Slightly slower slide up (1s)
      transform: slide ? 'translateY(-120vh)' : 'translateY(0)',
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <style>{`
        .hello-letter {
          opacity: 0;
          display: inline-block;
          transform: translateY(15px);
          animation: letterFadeIn 0.6s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
        .letter-0 { animation-delay: 0.1s; }
        .letter-1 { animation-delay: 0.3s; }
        .letter-2 { animation-delay: 0.5s; }
        .letter-3 { animation-delay: 0.7s; }
        .letter-4 { animation-delay: 0.9s; }

        @keyframes letterFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={{
        marginTop: '20vh',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(4.5rem, 12vw, 9rem)',
          fontWeight: '900', // Matches logo weight
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic', // Matches logo style
          color: '#fff',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          <span className="hello-letter letter-0">u</span>
          <span className="hello-letter letter-1">n</span>
          <span className="hello-letter letter-2">i</span>
          <span className="hello-letter letter-3">t</span>
          <span className="hello-letter letter-4">e</span>
        </h1>
      </div>
    </div>
  );
}
