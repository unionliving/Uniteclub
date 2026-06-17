import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Zap, MonitorSmartphone, Palette, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

// A simple hook to animate sections on scroll
const useScrollFade = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.15 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);
  
  return [domRef, isVisible];
};

const FadeInSection = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollFade();
  return (
    <div 
      ref={ref}
      style={{
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0
      }}
    >
      {children}
    </div>
  );
};

export default function OurStory() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      paddingTop: '24px', 
      paddingBottom: '150px', 
      minHeight: '100vh', 
      color: '#fff',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url("/group.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      
      {/* Back button */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '24px', padding: '0' }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9' }}>
          <button 
            onClick={() => navigate('/')}
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
      
      {/* HERO SECTION */}
      <section className="mobile-stack" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', 
        padding: '0',
        minHeight: 'calc(100vh - 120px)',
        alignContent: 'center'
      }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9', display: 'flex', alignItems: 'center', marginBottom: '40px', color: 'var(--text-muted)' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '1.8rem', 
            marginRight: '16px',
            background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '600'
          }}> Our Story</span>
          <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
        </div>

        <div className="mobile-col-full" style={{ gridColumn: '1 / 8' }}>
          <FadeInSection>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              fontWeight: 600,
              marginBottom: '40px'
            }}>
              Transforming the way people <span style={{ 
                background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingRight: '0.15em'
              }}>rent, live and grow</span>
            </h1>
          </FadeInSection>
          
          <FadeInSection delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '2px solid #fff', paddingLeft: '24px', marginBottom: '0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Our Mission</span>
              <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: '#EAEAEA', margin: 0, fontWeight: 400, lineHeight: '1.4' }}>
                Through hassle-free amenities and community based living.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '80px' }}>
        <div className="mobile-col-full" style={{ gridColumn: '2 / 8' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Zap size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 24px', opacity: 0.5 }} />
              <h2 style={{ 
                fontSize: 'clamp(1.8rem, 3vw, 3rem)', 
                fontWeight: 800, 
                marginBottom: '24px',
                background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingRight: '0.15em'
              }}>Our Vision</h2>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                Co-Living Spaces in Mumbai, Pune, Ahmedabad, Gurugram <p>Premium Amenities, Modern Living, Community-Focused</p>
              </p>
            </div>
          </FadeInSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <FadeInSection delay={0.1}>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', color: '#fff', fontWeight: 400, lineHeight: 1.3 }}>
                Housing is broken. We are creating a win-win for everyone involved.
              </h3>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                From the lack of discoverability of millennial friendly spaces to having to deal with leaks and locks by yourself, it’s a vicious cycle. By spotlighting the resident experience and zeroing in on their unique concerns and housing needs, our occupancy rates are best-in-class.
              </p>
            </FadeInSection>
            
            <FadeInSection delay={0.3}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Whilst coliving is being recognised as a form of asset-class, we have started to create and design our own supply, generating rental yield like never before.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* THREE PILLARS: TECH, DESIGN, COMMUNITY */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', gap: '40px', marginBottom: '80px' }}>
        
        {/* TECH */}
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9', marginBottom: '60px' }}>
          <FadeInSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }} className="mobile-stack">
              <div className="mobile-col-full" style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
                <MonitorSmartphone size={48} strokeWidth={1} style={{ color: 'var(--text-muted)' }} />
                <h3 style={{ fontSize: '2rem', fontWeight: 500 }}>Tech is the Catalyst.</h3>
              </div>
              <div className="mobile-col-full" style={{ gridColumn: '5 / 9', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>Smart digital renting at Union Living.</strong> Traditional renting ways no longer complement our modern lifestyle. At Union, everything is digitally made smart. Starting from the discovery of a property to managing stays, technology hones the entire process.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  The website, application, and social media also induce greater transparency between residents and the team. With the use of the app, R&M is streamlined, resulting in better TAT and therefore higher appreciation and loyalty.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* DESIGN */}
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9', marginBottom: '60px' }}>
          <FadeInSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }} className="mobile-stack">
              <div className="mobile-col-full" style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
                <Palette size={48} strokeWidth={1} style={{ color: 'var(--text-muted)' }} />
                <h3 style={{ fontSize: '2rem', fontWeight: 500 }}>We are design obsessed.</h3>
              </div>
              <div className="mobile-col-full" style={{ gridColumn: '5 / 9', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: '#fff', fontWeight: 500 }}>Stylish and smartly designed co-living homes.</strong> Conventional rental provisions such as PGs and apartments in the unorganized sector fail to offer a sense of design.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  With most of the time spent indoors, the space has a major role in uplifting the vibes. Each of the properties are thoughtfully designed and tastefully decorated to complement your personality. And of course, notwithstanding functionality by making sure each nook and corner serves a purpose.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* COMMUNITY */}
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9' }}>
          <FadeInSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }} className="mobile-stack">
              <div className="mobile-col-full" style={{ gridColumn: '1 / 4', display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
                <Users size={48} strokeWidth={1} style={{ color: 'var(--text-muted)' }} />
                <h3 style={{ fontSize: '2rem', fontWeight: 500 }}>Community is what escalates the graph.</h3>
              </div>
              <div className="mobile-col-full" style={{ gridColumn: '5 / 9', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  There are friends, there is family and then there are friends who turn into family. At Union, you stay with friends that stay for life.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  While sharing a space with peers lets you grow your network and dodge loneliness, workshops and events keep the mood cheered up. Needless to say, it forms a sustainable revenue model owing to a lower vacancy rate and automated Word of Mouth and therefore higher returns.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

      </section>

      {/* FUTURE EXPANSION */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
        <div className="mobile-col-full" style={{ gridColumn: '1 / 9', display: 'flex', alignItems: 'center', marginBottom: '40px', color: 'var(--text-muted)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '16px' }}>.future</span>
          <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--grid-color)' }}></div>
        </div>

        <div className="mobile-col-full" style={{ gridColumn: '2 / 8', textAlign: 'center' }}>
          <FadeInSection>
            <TrendingUp size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 24px', opacity: 0.5 }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 500, marginBottom: '24px', lineHeight: 1.1 }}>
              We are here for the <span style={{ color: 'var(--text-muted)' }}>Long Haul.</span>
            </h2>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#fff', textTransform: 'uppercase', marginBottom: '40px', letterSpacing: '0.05em' }}>
              Live, connect, and grow together. Union Living future expansion plans.
            </h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto 24px' }}>
              Union is the first coliving approach based in the city of dreams, Mumbai. With property management demanding time, effort, and constant improvements, Union has drawn an exceptional graph of growth in the given amount of time.
            </p>
            <p style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 500, lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
              The plans for the future are mapped out with 5+ cities.
            </p>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
}
