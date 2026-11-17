'use client';

import React, { useEffect, useState } from 'react';
import { TopHeader } from './TopHeader';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { OfflineBanner } from './OfflineBanner';
import { registerServiceWorker, subscribeNetworkStatus } from '@/lib/offline/serviceWorkerRegistration';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Register Service Worker for Offline-First caching
    registerServiceWorker();

    // Listen to network status changes
    const unsubscribe = subscribeNetworkStatus((online) => {
      setIsOnline(online);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 antialiased selection:bg-safety-500 selection:text-black">
      {/* Top Header */}
      <TopHeader isOnline={isOnline} />

      {/* Offline Alert Banner */}
      <OfflineBanner isOnline={isOnline} />

      {/* Main Body Area */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Desktop Left Sidebar */}
        <DesktopSidebar />

        {/* Content Area (padded bottom on mobile to accommodate bottom nav bar) */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Fixed Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};
