'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import EventTicketForm from '@/components/EventTicketForm';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="animate-slideInFromTop">
        <EventTicketForm />
      </div>
    </div>
  );
}
