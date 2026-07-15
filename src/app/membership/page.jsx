"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTransitionNavigate } from '../../context/TransitionContext';
import { supabase } from '../../supabase';
import '../../index.css';

export default function Membership() {
  const { currentUser } = useAuth();
  const transitionTo = useTransitionNavigate();
  const pathname = usePathname();
  const [activeFaqs, setActiveFaqs] = useState({});
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [membership, setMembership] = useState(null);
  const [loadingMembership, setLoadingMembership] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setMembership(null);
      setLoadingMembership(false);
      return;
    }

    const fetchMembership = async () => {
      try {
        const { data, error } = await supabase
          .from('memberships')
          .select('*')
          .eq('uid', currentUser.uid)
          .maybeSingle();

        if (!error && data && data.status === 'active') {
          setMembership({
            uid: data.uid,
            email: data.email,
            name: data.name,
            paymentId: data.payment_id,
            status: data.status,
            activatedAt: data.activated_at
          });
        } else {
          setMembership(null);
        }
      } catch (err) {
        console.error("Error fetching membership:", err);
      } finally {
        setLoadingMembership(false);
      }
    };

    fetchMembership();
  }, [currentUser]);

  const toggleFaq = (index) => {
    setActiveFaqs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleJoinClick = async () => {
    const from = location.state?.from || '/membership';
    if (!currentUser) {
      // Redirect to sign up page if not logged in
      transitionTo('/signup', { state: { from: '/membership' } });
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay Checkout SDK. Please check your internet connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      amount: 299900, // ₹2,999 in paise
      currency: 'INR',
      name: 'Unite Club',
      description: 'Monthly Membership Subscription',
      image: '/favicon.svg',
      handler: async function (response) {
        try {
          const membershipData = {
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || currentUser.name || '',
            payment_id: response.razorpay_payment_id,
            status: 'active',
            activated_at: new Date().toISOString()
          };
          const { error } = await supabase
            .from('memberships')
            .upsert(membershipData);
          if (error) throw error;

          setMembership({
            uid: membershipData.uid,
            email: membershipData.email,
            name: membershipData.name,
            paymentId: membershipData.payment_id,
            status: membershipData.status,
            activatedAt: membershipData.activated_at
          });
          transitionTo(from);
        } catch (err) {
          console.error("Error activating membership:", err);
          alert("Database Error: " + err.message + "\n\nPayment succeeded, but we failed to update your status. Contact support with payment ID: " + response.razorpay_payment_id);
        }
      },
      prefill: {
        name: currentUser.displayName || currentUser.name || '',
        email: currentUser.email || ''
      },
      theme: {
        color: '#f01460'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const benefits = [
    "Unlimited entry to all members-only community mixers",
    "Access to exclusive creative workshops ",
    "Priority booking and 15% discount for co-living overnight stays",
    "Complimentary entry to mixtape and live music showcase nights",
    "Full access to the Unite co-working lounge & digital networking portal",
    "Weekly community wellness mornings (Guided yoga & meditation circle)"
  ];

  const faqs = [
    {
      q: "What is the Unite Club Membership?",
      a: "The Unite Club Membership is an all-access pass to our curated experiences, professional workshops, social mixers, and wellness programs. It is designed to connect creators, entrepreneurs, and ambitious builders in one premium community."
    },
    {
      q: "How does billing work?",
      a: "Membership is billed monthly at a recurring rate of ₹2,999/month. There is no lock-in contract, and you are free to cancel or pause your membership at any time."
    },
    {
      q: "How do I activate my membership after joining?",
      a: "Once you click 'Join the Club', you will sign up for an account. After account creation, you can submit your request, and our onboarding team will contact you to activate your subscription."
    },
    {
      q: "Can I bring guests to events?",
      a: "Yes! Members receive 2 complimentary guest passes per month for public events (such as Paint & Pour). Additional guest passes can be purchased via the portal."
    }
  ];

  if (loadingMembership) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Loading membership info...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '24px', paddingBottom: '150px', minHeight: '100vh', color: '#fff' }}>
      
      {/* Back button */}
      <section className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '40px', padding: '0' }}>
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
              fontSize: '0.8rem',
              textAlign: 'left'
            }}
          >
            <ArrowLeft size={16} /> back
          </button>
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <span className="section-tag" style={{ color: '#f01460' }}>
          {membership ? 'Unite Club Member' : 'Unite Club'}
        </span>
        <h1 className="section-title">
          <span style={{ 
            background: 'linear-gradient(to right, #f01460, #f42f4a, #fb531d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            paddingRight: '0.15em'
          }}>Membership</span>
        </h1>
        <p className="section-body" style={{ margin: '0 auto 60px', maxWidth: '700px', fontSize: '1.2rem' }}>
          {membership 
            ? `Welcome back, ${membership.name || currentUser.displayName || currentUser.email}! You have active, all-access entry to all club experiences.`
            : 'Step into a vibrant ecosystem of networking, learning, and co-living experiences. Billed monthly. Cancel anytime.'
          }
        </p>

        {membership ? (
          /* Member Dashboard Layout */
          <div style={{ 
            width: '100%', 
            maxWidth: '500px', 
            margin: '0 auto 80px',
            textAlign: 'left'
          }}>
            {/* Centered Member Card */}
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Premium red radial glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(240, 20, 96, 0.1) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 0
              }}></div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Active Subscription
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50', boxShadow: '0 0 10px #4CAF50' }}></div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#4CAF50' }}>Active Member</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Member Details
                  </span>
                  <p style={{ fontSize: '1.1rem', fontWeight: '500', color: '#fff', marginTop: '4px', margin: 0 }}>
                    {membership.name}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                    {membership.email}
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Member Since
                  </span>
                  <p style={{ fontSize: '1rem', color: '#fff', marginTop: '4px', margin: 0 }}>
                    {new Date(membership.activatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'block', wordBreak: 'break-all' }}>
                    REF ID: {membership.paymentId}
                  </span>
                </div>

                <button 
                  onClick={() => transitionTo('/calendar')}
                  className="grad-btn"
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'center',
                    marginTop: '8px'
                  }}
                >
                  Book Experiences
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Price & Benefits Split Layout */
          <section className="mobile-stack" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', 
            gap: '40px', 
            width: '100%', 
            maxWidth: '1000px', 
            textAlign: 'left',
            marginBottom: '80px'
          }}>
            
            {/* Left: Price Card */}
            <div className="mobile-col-full" style={{ 
              gridColumn: '1 / 5', 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Ambient background glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(240, 20, 96, 0.08) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 0
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#f01460', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>
                  All Access Pass
                </span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginTop: '16px', marginBottom: '8px' }}>
                  ₹2,999<span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: '400' }}> / month</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '32px' }}>
                  Full access to all physical experiences, workspaces, and our exclusive digital network list.
                </p>

                <button 
                  onClick={handleJoinClick}
                  className="grad-btn"
                  style={{ 
                    width: '100%', 
                    padding: '18px', 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {currentUser ? 'Become a Member' : 'Join the Club'}
                </button>
              </div>
            </div>

            {/* Right: Benefits List */}
            <div className="mobile-col-full" style={{ 
              gridColumn: '5 / 9', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              gap: '24px'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px' }}>What's Included</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      background: 'rgba(240, 20, 96, 0.1)',
                      borderRadius: '50%',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f01460',
                      marginTop: '2px'
                    }}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.4' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* FAQ Section */}
        <section style={{ width: '100%', maxWidth: '750px', textAlign: 'left', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '40px' }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = !!activeFaqs[idx];
              return (
                <div 
                  key={idx} 
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      color: '#fff',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: '500', paddingRight: '16px' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={20} style={{ color: '#f01460' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
                  </button>

                  <div style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    transition: 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out',
                    padding: isOpen ? '0 24px 24px 24px' : '0 24px',
                    color: 'var(--text-muted)',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    overflow: 'hidden'
                  }}>
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer Terms Link */}
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setShowTermsModal(true)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-muted)', 
              cursor: 'pointer', 
              textDecoration: 'underline',
              fontSize: '0.95rem'
            }}
          >
            Terms & Conditions Apply
          </button>
        </div>

      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: 'var(--dark2)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Terms & Conditions</h3>
              <button 
                onClick={() => setShowTermsModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  lineHeight: 1
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              padding: '32px',
              overflowY: 'auto',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <p>
                <strong>1. Acceptance of Terms:</strong> By subscribing to the Unite Club Membership, you agree to comply with and be bound by the following rules and regulations.
              </p>
              <p>
                <strong>2. Membership Billing:</strong> Memberships are billed monthly in advance. Billing is processed automatically unless cancellation is requested.
              </p>
              <p>
                <strong>3. Cancellation Policy:</strong> You may cancel your subscription at any time. Cancellations must be initiated at least 48 hours prior to the next billing date. No refunds are provided for partial months.
              </p>
              <p>
                <strong>4. Community Code of Conduct:</strong> All members must respect co-members and event spaces. Unite reserves the right to suspend or terminate membership at any time for inappropriate behavior.
              </p>
              <p>
                <strong>5. Event Attendance:</strong> Event RSVPs are subject to capacity limits. Being a member guarantees registration rights, but popular events require early booking to guarantee entry.
              </p>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '24px 32px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'right'
            }}>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="grad-btn"
                style={{ padding: '12px 32px', fontSize: '14px' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
