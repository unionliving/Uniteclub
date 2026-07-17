"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useTransitionNavigate } from '../context/TransitionContext';

const words = [
'Events.',
'Workshops.',
'Wellness.',
'Learning.',
'Creativity.'
];

// Append the first word at the end to create a seamless looping effect
const loopWords = [...words, words[0]];

const ProjectCard = ({ id, title, imageSrc, bgColor, textColor = '#111', imagePosition = 'center', description = "Access exclusive events, curated experiences and members-only brand rewards across India's most vibrant cities." }) => {
  return (
    <div 
      className="project-card-container"
      style={{
        backgroundColor: bgColor,
        cursor: 'default',
        borderRadius: '24px',
        padding: '48px 48px 28px 48px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px'
      }}
    >
      <h2 style={{ 
        fontFamily: 'var(--font-playfair), "Playfair Display", serif',
        fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
        fontWeight: '700',
        letterSpacing: '-0.02em',
        color: textColor,
        margin: '0 0 40px 0',
        lineHeight: '1'
      }}>
        {title}
      </h2>

      <div style={{ 
        display: 'flex', 
        gap: '40px',
        flexWrap: 'wrap',
        marginTop: 'auto',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
          <img 
            src={imageSrc} 
            alt={title} 
            className="project-card-image"
            style={{ 
              objectPosition: imagePosition,
              width: '100%',
              height: 'auto',
              maxHeight: '380px',
              objectFit: 'cover',
              display: 'block'
            }} 
          />
        </div>
        <div style={{ 
          flex: '1 1 250px',
          color: textColor,
          fontFamily: 'var(--font-main)',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          maxWidth: '350px'
        }}>
          {description}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const transitionTo = useTransitionNavigate();

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setIndex(prev => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === loopWords.length - 1) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); 
        setIndex(0); 
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const cardsData = [
    {
      id: "declutter",
      title: "Declutter",
      year: "2026",
      category: "CALM. REFLECT. RESET.",
      imageSrc: "/six-pillars/declutter.PNG",
      bgColor: "#7A7854",
      textColor: "#ffffff",
      topOffset: 0,
      imagePosition: 'top',
      description: (
        <>
          <strong>Slow down, reset and recharge.</strong><br />
         Mindful experiences designed to help you disconnect from the noise and reconnect with yourself.
        </>
      )
    },
    {
      id: "mixtape-sessions",
      title: "Mixtape Sessions",
      year: "2026",
      category: "DISCOVER. LISTEN. EXPERIENCE.",
      imageSrc: "/six-pillars/mixtape.png",
      bgColor: "rgba(87, 34, 18, 0.95)",
      textColor: "#EAEAEA",
      topOffset: 8,
      description: (
        <>
          <strong>Live music. Intimate settings. Unforgettable nights.</strong><br />
          Discover emerging artists and curated performances that bring people together through music.
        </>
      )
    },
    {
      id: "junior-senior",
      title: "Junior Senior",
      year: "2026",
      category: "LEARN. GROW. LEVEL UP.",
      imageSrc: "/six-pillars/juniorsenior.PNG",
      bgColor: "rgba(182, 69, 74, 0.95)",
      textColor: "#F5F5F5",
      topOffset: 16,
      description: (
        <>
          <strong>Learn from those who've been there.</strong><br />
          Meaningful conversations, career insights and mentorship with alumni, founders and industry professionals.
        </>
      )
    },
    {
      id: "elevate",
      title: "Elevate",
      year: "2026",
      category: "MOVE. ENERGISE. THRIVE.",
      imageSrc: "/six-pillars/elevate.PNG",
      bgColor: "rgba(105, 112, 131, 0.95)",
      textColor: "#F5F5F5",
      topOffset: 24,
      description: (
        <>
          <strong>Move better. Feel stronger. Live healthier.</strong><br />
          Fitness sessions, sports, wellness experiences and activities designed to energize your everyday.
        </>
      )
    },
    {
      id: "moodboard",
      title: "Moodboard",
      year: "2026",
      category: "CREATE. EXPRESS. EXPLORE.",
      imageSrc: "/six-pillars/moodboard.PNG",
      bgColor: "rgba(43, 58, 57, 0.95)",
      textColor: "#F5F5F5",
      topOffset: 32,
      description: (
        <>
          <strong>Create, explore and express yourself.</strong><br />
          Hands-on workshops and creative experiences spanning art, design, photography, pottery, fashion and more.
        </>
      )
    },
    {
      id: "better-together",
      title: "Better Together",
      year: "2026",
      category: "CONNECT. SHARE. BELONG.",
      imageSrc: "/six-pillars/bettertogether.png",
      bgColor: "rgba(136, 85, 34, 0.95)",
      textColor: "#F2ECE9",
      topOffset: 40,
      imagePosition: 'top',
      description: (
        <>
          <strong>Shared tables. Shared moments. Shared memories.</strong><br />
          Community dinners, social gatherings and experiences designed to make every meetup more memorable.
        </>
      )
    }
  ];

  const cardRefs = React.useRef([]);
  const [stuckCount, setStuckCount] = useState(0);

  // About Section intersection tracking
  const aboutRef = useRef(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  // Notes Section active state
  const [isBlogHovered, setIsBlogHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isMemberHovered, setIsMemberHovered] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const row1TriggerRef = useRef(null);
  const row2TriggerRef = useRef(null);
  const [isRow1Visible, setIsRow1Visible] = useState(false);
  const [isRow2Visible, setIsRow2Visible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === row1TriggerRef.current) {
              setIsRow1Visible(true);
            } else if (entry.target === row2TriggerRef.current) {
              setIsRow2Visible(true);
            }
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 250px 0px' }
    );
    if (row1TriggerRef.current) observer.observe(row1TriggerRef.current);
    if (row2TriggerRef.current) observer.observe(row2TriggerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the animation slightly before it fully centers
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      { threshold: 0.15 } // Trigger when 15% of the About section is visible
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let count = 0;
      cardRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Trigger the 'depth' transition as soon as the incoming card enters the viewport significantly (e.g., 75% down the screen),
          // rather than waiting for it to hit the 200px sticky zone. This causes the older cards to shrink *while* the new one approaches!
          if (rect.top <= window.innerHeight * 0.75) {
            count = i + 1;
          }
        }
      });
      setStuckCount(count);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed background image */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.93)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <style>{`
        .hero-section {
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 20px;
        }
        .footer-inner {
          max-width: 1600px;
          margin: 0 auto;
          padding-left: 144px;
          padding-right: 144px;
          width: 100%;
        }
        .hero-subtitle {
          font-family: var(--font-mono);
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          margin-bottom: 32px;
        }
        .hero-title {
          font-family: var(--font-playfair), 'Playfair Display', serif !important;
          font-size: clamp(1.3rem, 6vw, 4.5rem);
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.02em;
          max-width: 1400px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 0;
        }
        /* Event Calendar Row Styles */
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
        .calendar-card-line1 {
          opacity: 1;
        }
        .calendar-card-line2 {
          opacity: 1;
        }
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
          .calendar-row {
            grid-template-columns: 1fr;
          }
          .calendar-row-2 {
            margin-top: 0;
          }
          .calendar-card-img-wrapper {
            height: 55vw;
          }
          .calendar-card-info {
            padding: 24px;
            min-height: auto;
          }
          .calendar-card-text {
            font-size: clamp(1.2rem, 4vw, 1.6rem);
          }
        }

        /* Partners Section Logo Grid */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 24px;
          align-items: center;
          justify-items: center;
          width: 100%;
        }
        @media (max-width: 991px) {
          .partners-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }
        @media (max-width: 600px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }
        
        /* Scroll Top Button */
        .scroll-top-btn {
          position: fixed;
          bottom: 40px;
          right: 40px;
          background-color: #000;
          color: #fff;
          border: 1px solid var(--grid-color);
          border-radius: 24px;
          padding: 12px 24px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          cursor: pointer;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .scroll-top-btn:hover {
          background-color: #fff;
          color: #000;
        }
        
        @media (min-width: 768px) {
          .hero-section {
            padding-top: 16px;
            justify-content: flex-start;
          }
          .hero-subtitle {
            margin-bottom: 48px;
          }
          .hero-title {
            margin-top: 48px;
          }
        }

        @media (max-width: 1024px) {
          .footer-inner {
            padding-left: 64px !important;
            padding-right: 64px !important;
          }
        }

        @media (max-width: 768px) {
          .footer-inner {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .scroll-top-btn {
            bottom: 24px;
            right: 24px;
            padding: 8px 16px;
            font-size: 0.75rem;
          }
          .hero-section {
            position: relative !important;
            justify-content: center !important;
            min-height: calc(100vh - 80px) !important;
          }
          .hero-title {
            font-size: clamp(2rem, 7.8vw, 4.5rem) !important;
            line-height: 1.1 !important;
          }
          .hero-title span:first-child {
            white-space: nowrap !important;
          }
          .hero-subtitle {
            position: absolute !important;
            top: 40px !important;
            left: 24px !important;
            margin-bottom: 0 !important;
            font-size: 1rem !important;
          }
          .hero-section button {
            padding: 14px 28px !important;
            font-size: 0.95rem !important;
          }
        }
        @media (max-width: 600px) {
          .hero-subtitle {
            left: 16px !important;
            top: 30px !important;
          }
        }
      `}</style>
      <section className="hero-section">
        <div className="hero-subtitle">
         
        </div>
        
        <h1 className="hero-title">
          <span>One Membership.</span>
          <span>Unlimited <i>Experiences</i>.</span>
          
          <span>
            <span style={{ 
              display: 'inline-block', 
              height: '1.4em', 
              overflow: 'hidden', 
              verticalAlign: 'top',
              paddingRight: '0.1em'
            }}>
              <span style={{
                display: 'block',
                transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                transform: `translateY(-${index * (100 / loopWords.length)}%)`
              }}>
                {loopWords.map((w, i) => (
                  <span key={`${w}-${i}`} style={{ 
                    display: 'block', 
                    width: 'fit-content',
                    height: '1.4em', 
                    lineHeight: '1', 
                    whiteSpace: 'nowrap',
                    background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    paddingRight: '0.25em',
                    fontStyle: 'italic',
                    fontWeight: '550',
                  }}>
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </h1>

        <p style={{
          marginTop: '30px',
          maxWidth: '500px',
          color: '#e0e0e0',
          fontSize: '1.05rem',
          lineHeight: '1.5',
          fontFamily: 'var(--font-main)',
          fontWeight: '400',
          letterSpacing: '0.5px'
        }}>
          Access exclusive events, curated experiences and members-only brand rewards across India's most vibrant cities.
        </p>

        <div style={{ display: 'flex', justifyContent:'flex-end', marginTop: '20px' }}>
          <button 
            onMouseEnter={() => setIsMemberHovered(true)}
            onMouseLeave={() => setIsMemberHovered(false)}
            onClick={() => transitionTo('/membership')}
            style={{
              backgroundColor: isMemberHovered ? 'rgba(0, 180, 216, 0.1)' : 'transparent',
              border: '1px solid rgba(0, 180, 216, 0.4)',
              borderRadius: '16px',
              color: '#00b4d8',
              padding: '16px 32px',
              fontFamily: 'var(--font-main)',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transform: 'translateX(20px)'
            }}
          >
            Request Membership
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <section style={{ 
        padding: '100px 0 20px 0',
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: '700',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            color: '#fff',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            The Foundation
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '500',
            color: '#ffffff',
            margin: '0 0 16px 0',
            lineHeight: '1.2'
          }}>
            6 pillars of <i style={{ fontWeight: '900', fontStyle: 'italic' }}>Unite</i>.
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: '#FFFFFF',
            margin: 0
          }}>
            Designed to inspire, challenge and recharge.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img src="/Unite-logo.png" alt="Planetary Graphic" style={{ height: '130px', width: 'auto', display: 'block', marginTop: '-10px' }} />
        </div>
      </section>

      <div style={{ display: 'flow-root' }}>
        {cardsData.map((card, i) => {
          // Calculate depth: how many active cards are stacked ON TOP of this one
          const activeIndex = Math.max(0, stuckCount - 1);
          const depth = Math.max(0, activeIndex - i);
          
          return (
            <div 
              key={card.title} 
              ref={el => cardRefs.current[i] = el}
              className="sticky-card-wrapper"
              style={{ 
                zIndex: i,
                opacity: depth >= 2 ? 0.2 : 1, // Only fade when it is pushed back 2 levels
                // Push older cards UP by 40px and shrink them by 5% per depth level
                transform: `translateY(-${depth * 40}px) scale(${1 - depth * 0.05})` 
              }}
            >
              <ProjectCard {...card} />
            </div>
          );
        })}
      </div>


      {/* EVENT CALENDAR SECTION */}
      <section 
        className="calendar-section"
        style={{  marginBottom: '80px', marginTop: '-260px', position: 'relative', zIndex: 10 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
          <div className="mobile-col-full" style={{ gridColumn: '1 / 9', display: 'flex', alignItems: 'center', marginBottom: '40px', color: 'var(--text-muted)' }}>
            <span style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
              marginRight: '16px', 
              fontWeight: '400', 
              color: '#fff'
            }}>What's Happening</span>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
          </div>
        </div>

        {/* Row 1 Row & Trigger */}
        <div 
          className={`calendar-row calendar-row-1 ${isRow1Visible ? 'visible' : ''}`}
        >
          {[
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
            }
          ].map((event) => (
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
        <div ref={row1TriggerRef} style={{ height: '10px', background: 'transparent', pointerEvents: 'none' }} />

        {/* Row 2 Row & Trigger */}
        <div 
          className={`calendar-row calendar-row-2 ${isRow2Visible ? 'visible' : ''}`}
        >
          {[
            {
              id: "movie-under-the-stars",
              line1: "MOVIE UNDER",
              line2: "THE STARS",
              date: "A COZY OPEN-AIR MOVIE NIGHT WITH GREAT FILMS, GOOD COMPANY AND UNFORGETTABLE VIBES UNDER THE STARS.",
              image: "/Unite-3.jpeg"
            }
          ].map((event) => (
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
        <div ref={row2TriggerRef} style={{ height: '10px', background: 'transparent', pointerEvents: 'none' }} />

      </section>

      {/* Static Brands Section 
      <section className="mobile-stack" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', 
        padding: '0', 
        marginTop: '60px',
        marginBottom: '60px'
      }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9', display: 'flex', alignItems: 'center', marginBottom: '32px', color: 'var(--text-muted)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '16px' }}>.partners</span>
          <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
        </div>
        
        <div className="mobile-col-full partners-grid" style={{ 
          gridColumn: '1 / 9', 
          paddingBottom: '24px'
        }}>
          {[
            { name: 'Realty+', src: '/partners/rprealityplus.png' },
            { name: 'mid-day', src: '/partners/mid-day.png' },
            { name: 'Outlook Start-Up', src: '/partners/outlook-start-up-logo.png' },
            { name: 'Business Standard', src: '/partners/business-standard-logo.png', scale: 1.35 },
            { name: 'Projects Today', src: '/partners/project-today.png', scale: 1.4 },
            { name: 'YourStory', src: '/partners/your-story.png', scale: 1.3 }
          ].map((brand) => (
            <div 
              key={brand.name} 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                height: '80px',
                padding: brand.scale ? '2px' : '10px'
              }}
            >
              <img 
                src={brand.src} 
                alt={brand.name} 
                style={{ 
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  opacity: 0.5,
                  transition: 'opacity 0.3s ease',
                  cursor: 'default',
                  filter: 'brightness(0) invert(1)',
                  transform: brand.scale ? `scale(${brand.scale})` : 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 0.9}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
              />
            </div>
          ))}
        </div>
      </section>

*/}

      {/* NEW ABOUT SECTION */}
      {/*
      <section 
        ref={aboutRef}
        className="mobile-stack"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          marginTop: '100px', 
          paddingBottom: '150px',
        }}
      >
        // Left Side Text (Cols 1-4) 
        <div className="mobile-col-full" style={{ 
          gridColumn: '1 / 5', 
          gridRow: '1',
          marginTop: '10vw', // Moved text further up
          paddingRight: '20px', 
          zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', color: 'var(--text-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '16px' }}>.about</span>
            <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)',
            lineHeight: '1.4',
            letterSpacing: '-0.02em',
            fontWeight: 500,
            color: '#fff'
          }}>
            Redefining the way people live, connect, and grow. Housing is broken, so we are creating a win-win. By spotlighting the resident experience, our thoughtfully designed co-living homes offer community, convenience, and a place to truly thrive.
          </h2>
        </div>

        // Right Side Image (Cols 6-9) - full width to right edge 
        <div className="mobile-col-full mobile-pad-reduce" style={{ 
          gridColumn: '6 / 9', 
          gridRow: '1', 
          position: 'relative', 
          marginTop: '60px', 
          zIndex: 1 
        }}>
          <div style={{ overflow: 'hidden' }}>
            <img 
              src="/about-profile.jpg"
              alt="Profile"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isAboutVisible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(40px)',
                opacity: isAboutVisible ? 1 : 0
              }}
            />
          </div>
          
          // Subtle crosshair at the bottom right 
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            right: '-12px',
            width: '24px',
            height: '24px',
            opacity: isAboutVisible ? 1 : 0,
            transition: 'opacity 1s ease 1s',a
            pointerEvents: 'none'
          }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--grid-color)' }}></div>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: 'var(--grid-color)' }}></div>
            <div style={{ position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px', borderRadius: '50%', border: '1px solid var(--grid-color)' }}></div>
          </div>
        </div>

        // Button (Cols 5-6, below the image) 
        <div className="mobile-col-full" style={{ 
          gridColumn: '5 / 7', 
          gridRow: '2',
          marginTop: '40px', // Spacing below the image
          zIndex: 3,
        }}>
          <button 
            onMouseEnter={() => setIsAboutHovered(true)}
            onMouseLeave={() => setIsAboutHovered(false)}
            onClick={() => router.push('/our-story')}
            style={{
            width: '100%',
            backgroundColor: isAboutHovered ? '#fff' : 'transparent',
            border: '2px solid var(--grid-color)',
            color: isAboutHovered ? '#000' : 'var(--text-muted)',
            padding: '24px 32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}>
            About Us
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="square" 
              strokeLinejoin="miter"
            >
              <path d="M3 21L23 1M11 1h12v12" /> 
            </svg>
          </button> 
        </div>
      </section> */}

      {/* SAY HELLO SECTION 
      <section 
        className="mobile-stack"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          marginTop: '20px', 
          padding: '0 0 150px 0',
        }}
      >
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9', display: 'flex', alignItems: 'center', marginBottom: '80px', color: 'var(--text-muted)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '16px' }}>.get in touch</span>
          <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
        </div>

        <div className="mobile-col-full" style={{ 
          gridColumn: '1 / 7', 
          zIndex: 2,
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontWeight: 500,
            color: '#fff',
            marginBottom: '80px'
          }}>
            Ready to join the community? Get in touch with us to explore membership and discover your new home.
          </h2>
        </div>
          */}
        {/* contact me button 
        <div className="mobile-col-full" style={{ 
          gridColumn: '5 / 7', 
          alignSelf: 'start',
        }}>
          <button 
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
            onClick={() => router.push('/contact')}
            style={{
            width: '100%',
            backgroundColor: isContactHovered ? '#fff' : 'transparent',
            border: '2px solid var(--grid-color)',
            color: isContactHovered ? '#000' : 'var(--text-muted)',
            padding: '24px 32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}>
            Contact Us
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="square" 
              strokeLinejoin="miter"
            >
              <path d="M3 21L23 1M11 1h12v12" />
            </svg>
          </button>
        </div>
      </section>
*/}
      {/* FOOTER */}
      <div style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
      }}>
        <footer className="mobile-stack mobile-text-center footer-inner" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          paddingBottom: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '1.2rem',
        }}>
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/Unite-footer.jpeg" alt="Unite" style={{ height: '72px', width: 'auto', display: 'block', marginBottom: '8px' }} />
            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
              © {new Date().getFullYear()} All rights reserved
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ cursor: 'pointer', transition: 'color 0.2s ease', textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>EXPLORE</Link>
            <Link href="/calendar" style={{ cursor: 'pointer', transition: 'color 0.2s ease', textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>THE DROP</Link>
            {/* <Link href="/our-story" style={{ cursor: 'pointer', transition: 'color 0.2s ease', textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>our story</Link> */}
            <Link href="/contact" style={{ cursor: 'pointer', transition: 'color 0.2s ease', textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>CONTACT</Link>
          </div>
        {/* Social Media Icons
          <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)' }}>
            <a href="https://www.youtube.com/@unioncoliving" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="https://www.instagram.com/union_living/?hl=en" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              <svg style={{ cursor: 'pointer' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div> */}
        </footer>
      </div>
      
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-btn"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
          TOP
        </button>
      )}
    </>
  );
}
