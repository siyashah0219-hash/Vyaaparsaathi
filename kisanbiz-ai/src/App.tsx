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

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-emerald-950 font-sans antialiased selection:bg-amber-300 selection:text-emerald-950">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'analyze' && <HyperLocalAnalysisPage />}
        {activeTab === 'financial-plan' && <FinancialPlanPage />}
        {activeTab === 'risk-analysis' && <RiskAnalysisPage />}
        {activeTab === 'schemes' && <SchemesPage />}
        {activeTab === 'advisor' && <AdvisorPage />}
        {activeTab === 'action-plan' && <ActionPlanPage />}
        {activeTab === 'expert-session' && <ExpertSessionPage />}
      </main>

      <Footer />
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