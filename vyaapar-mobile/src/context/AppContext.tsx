import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessProfile,
  FinancialPlanInput,
  FinancialPlanResult,
  ActionTask,
  ExpertBooking,
  Language,
  MobileTab,
} from '../types';
import {
  defaultProfile,
  calculateFinancialPlan,
  initialActionTasks as defaultActionTasks,
} from '../data/mockData';

interface AppContextType {
  profile: BusinessProfile;
  updateProfile: (updates: Partial<BusinessProfile>) => void;
  financialInput: FinancialPlanInput;
  setFinancialInput: React.Dispatch<React.SetStateAction<FinancialPlanInput>>;
  financialResult: FinancialPlanResult;
  actionTasks: ActionTask[];
  toggleTask: (id: string) => void;
  expertBookings: ExpertBooking[];
  addExpertBooking: (booking: ExpertBooking) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: MobileTab;
  setActiveTab: (tab: MobileTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  unreadNotifications: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    const saved = localStorage.getItem('vypaar_mobile_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('vypaar_mobile_lang') as Language) || 'English';
  });

  const [activeTab, setActiveTab] = useState<MobileTab>('home');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('vypaar_mobile_theme') === 'dark';
  });

  const [financialInput, setFinancialInput] = useState<FinancialPlanInput>({
    startupCost: 150000,
    ownCapital: 45000,
    monthlyRevenue: 38000,
    monthlyExpenses: 22000,
    interestRate: 8.5,
    tenureMonths: 24,
  });

  const [actionTasks, setActionTasks] = useState<ActionTask[]>(() => {
    const saved = localStorage.getItem('vypaar_mobile_tasks');
    return saved ? JSON.parse(saved) : defaultActionTasks;
  });

  const [expertBookings, setExpertBookings] = useState<ExpertBooking[]>(() => {
    const saved = localStorage.getItem('vypaar_mobile_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const financialResult = calculateFinancialPlan(financialInput);

  useEffect(() => {
    localStorage.setItem('vypaar_mobile_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('vypaar_mobile_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('vypaar_mobile_tasks', JSON.stringify(actionTasks));
  }, [actionTasks]);

  useEffect(() => {
    localStorage.setItem('vypaar_mobile_bookings', JSON.stringify(expertBookings));
  }, [expertBookings]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vypaar_mobile_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vypaar_mobile_theme', 'light');
    }
  }, [isDarkMode]);

  const updateProfile = (updates: Partial<BusinessProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const toggleTask = (id: string) => {
    setActionTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addExpertBooking = (booking: ExpertBooking) => {
    setExpertBookings((prev) => [booking, ...prev]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        financialInput,
        setFinancialInput,
        financialResult,
        actionTasks,
        toggleTask,
        expertBookings,
        addExpertBooking,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
        unreadNotifications: 3,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
