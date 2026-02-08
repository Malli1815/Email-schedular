"use client";

import React from 'react';
import { Button } from './ui/Button';

interface PromoBannerProps {
  onComposeClick: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onComposeClick }) => {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      overflow: 'hidden', 
      borderRadius: '48px', 
      backgroundColor: '#4F46E5', 
      padding: '48px', 
      color: 'white', 
      boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)' 
    }}>
      {/* Background Shapes */}
      <div style={{ position: 'absolute', right: '-10%', top: '-20%', height: '150%', width: '50%', transform: 'rotate(12deg)', backgroundColor: 'rgba(255, 255, 255, 0.1)', filter: 'blur(60px)', borderRadius: '9999px' }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '672px' }}>
        <h2 style={{ fontSize: '60px', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '32px', lineHeight: 1.1, margin: 0 }}>
          Start scheduling<br />like a pro today.
        </h2>
        <p style={{ fontSize: '20px', color: 'rgba(238, 242, 255, 0.9)', fontWeight: 500, marginBottom: '48px', lineHeight: 1.6, margin: 0 }}>
          Create and manage your email jobs with ease. Our system handles the heavy lifting, ensuring every message reaches its destination.
        </p>
        <button
          onClick={onComposeClick}
          style={{ 
            backgroundColor: 'white', 
            color: '#4F46E5', 
            padding: '20px 40px', 
            borderRadius: '16px', 
            fontWeight: 700, 
            fontSize: '18px', 
            border: 'none', 
            cursor: 'pointer', 
            transition: 'all 0.3s',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
        >
          Compose New Email
        </button>
      </div>

      {/* Decorative Icon */}
      <div style={{ position: 'absolute', right: '80px', bottom: '-20px', width: '384px', height: '384px', opacity: 0.1, pointerEvents: 'none' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </div>
    </div>
  );
};
