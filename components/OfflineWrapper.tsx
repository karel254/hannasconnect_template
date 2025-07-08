"use client";

import React, { useEffect, useState, ReactNode } from 'react';

interface OfflineWrapperProps {
  children: ReactNode;
}

const OfflineWrapper: React.FC<OfflineWrapperProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline === null) {
    // Optionally, show a loading spinner here
    return null;
  }

  if (!isOnline) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff8f6', // Soft background
        color: '#B22222', // Hanna's Connect red
        padding: '2rem',
        textAlign: 'center',
      }}>
        {/* Heart/connection icon */}
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#B22222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
          <path d="M12 21s-6.5-5.2-9-8.5C-1.5 7.5 3.5 2.5 8 6c1.7 1.4 2.5 2.5 4 4.5C13.5 8.5 14.3 7.4 16 6c4.5-3.5 9.5 1.5 5 6.5-2.5 3.3-9 8.5-9 8.5z" fill="#fff" stroke="#B22222"/>
        </svg>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#B22222' }}>You're Offline</h2>
        <p style={{ fontSize: '1.1rem', color: '#B22222', marginBottom: '1.2rem' }}>
          Hanna's Connect is best enjoyed online.<br />Please check your internet connection.<br />
          <span style={{ color: '#555', fontSize: '1rem' }}>Some features may be unavailable.</span>
        </p>
        <div style={{ fontWeight: 500, color: '#B22222', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          <em>Find Your Perfect Match, Anytime, Anywhere.</em>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default OfflineWrapper; 