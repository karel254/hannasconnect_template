import React, { useEffect, useState, ReactNode } from 'react';

interface OfflineWrapperProps {
  children: ReactNode;
}

const OfflineWrapper: React.FC<OfflineWrapperProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8fafc',
        color: '#222',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginBottom: '1rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657A8 8 0 003.515 6.343m2.828 2.828A4 4 0 0012 20m0 0v-2m0 2a4 4 0 004-4m0 0h-2m2 0a8 8 0 00-8-8" />
        </svg>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>You are offline</h2>
        <p style={{ fontSize: '1rem', color: '#555' }}>Please check your internet connection.<br/>Some features may be unavailable.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default OfflineWrapper; 