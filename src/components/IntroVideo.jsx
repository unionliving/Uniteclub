"use client";
import React, { useState, useEffect } from 'react';

export default function IntroVideo() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    // Determine which video to load based on screen width
    setVideoSrc(window.innerWidth <= 768 ? "/unite-mobile.mp4" : "/UNITE.mp4");
    
    // Lock scrolling while the video is active
    if (!isRemoved) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount just in case
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isRemoved]);

  const handleVideoEnd = () => {
    // Start the fade out transition
    setIsFadingOut(true);
    
    // Remove the component from the DOM after the 1 second fade finishes
    setTimeout(() => {
      setIsRemoved(true);
    }, 1000);
  };

  if (isRemoved) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#000',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <style>{`
        .responsive-intro-video {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          object-fit: cover;
        }
      `}</style>
      {videoSrc && (
        <video
          className="responsive-intro-video"
          src={videoSrc}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      )}
    </div>
  );
}
