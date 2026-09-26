import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileHeader } from './components/MobileHeader';
import { LiveTicker } from './components/LiveTicker';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { MandiView } from './views/MandiView';
import { FinanceView } from './views/FinanceView';
import { SchemesView } from './views/SchemesView';
import { AIChatView } from './views/AIChatView';
import { RoadmapView } from './views/RoadmapView';
import { MentorsView } from './views/MentorsView';
import { ProfileView } from './views/ProfileView';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      {/* Mobile Sticky Header */}
      <MobileHeader />

      {/* Live Market Marquee Ticker */}
      <LiveTicker />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        <div key={activeTab} className="animate-fade-in-up">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'mandi' && <MandiView />}
          {activeTab === 'finance' && <FinanceView />}
          {activeTab === 'schemes' && <SchemesView />}
          {activeTab === 'ai-chat' && <AIChatView />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'mentors' && <MentorsView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>
      </main>

      {/* Native-style Floating Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
