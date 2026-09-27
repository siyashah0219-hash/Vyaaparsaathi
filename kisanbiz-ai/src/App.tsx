import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { HyperLocalAnalysisPage } from './pages/HyperLocalAnalysisPage';
import { FinancialPlanPage } from './pages/FinancialPlanPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { SchemesPage } from './pages/SchemesPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { ActionPlanPage } from './pages/ActionPlanPage';
import { ExpertSessionPage } from './pages/ExpertSessionPage';

import { AIChatBox } from './components/AIChatBox';
import { AuthModal } from './components/AuthModal';

const MainContent: React.FC = () => {
  const { activeTab, isAuthModalOpen, closeAuthModal } = useApp();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-gradient-to-br from-emerald-50/40 via-slate-50 to-amber-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-[1820px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-5 sm:py-7 transition-all">
        <div key={activeTab} className="animate-fade-in-up">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'analyze' && <HyperLocalAnalysisPage />}
          {activeTab === 'financial-plan' && <FinancialPlanPage />}
          {activeTab === 'risk-analysis' && <RiskAnalysisPage />}
          {activeTab === 'schemes' && <SchemesPage />}
          {activeTab === 'advisor' && <AdvisorPage />}
          {activeTab === 'action-plan' && <ActionPlanPage />}
          {activeTab === 'expert-session' && <ExpertSessionPage />}
        </div>
      </main>

      {/* Persistent Floating AI Chat Box Assistant */}
      <AIChatBox />

      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}