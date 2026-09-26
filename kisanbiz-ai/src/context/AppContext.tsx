import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BusinessProfile,
  ActionTask,
  ExpertBooking,
  FinancialPlanInput,
  FinancialPlanResult,
} from '../types';
import {
  defaultProfile,
  initialActionTasks,
  calculateFinancialPlan,
} from '../data/mockData';

export type ActiveTab =
  | 'home'
  | 'profile'
  | 'analyze'
  | 'financial-plan'
  | 'risk-analysis'
  | 'schemes'
  | 'advisor'
  | 'action-plan'
  | 'expert-session';

interface AppContextType {
  profile: BusinessProfile;
  updateProfile: (updated: Partial<BusinessProfile>) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  actionTasks: ActionTask[];
  toggleTask: (id: string) => void;
  expertBookings: ExpertBooking[];
  addExpertBooking: (booking: ExpertBooking) => void;
  financialInput: FinancialPlanInput;
  setFinancialInput: React.Dispatch<React.SetStateAction<FinancialPlanInput>>;
  financialResult: FinancialPlanResult;
  language: 'Hindi' | 'Marathi' | 'English';
  setLanguage: (lang: 'Hindi' | 'Marathi' | 'English') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_PROFILE_KEY = 'vypaar_saathi_profile';
const LOCAL_TASKS_KEY = 'vypaar_saathi_tasks';
const LOCAL_BOOKINGS_KEY = 'vypaar_saathi_bookings';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load profile from localStorage or default
  const [profile, setProfileState] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback to default
    }
    return defaultProfile;
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');

  // Tasks state
  const [actionTasks, setActionTasks] = useState<ActionTask[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_TASKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return initialActionTasks;
  });

  // Expert Bookings state
  const [expertBookings, setExpertBookings] = useState<ExpertBooking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_BOOKINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Financial Input state synchronized with profile
  const [financialInput, setFinancialInput] = useState<FinancialPlanInput>({
    startupCost: profile.businessType === 'new' ? 120000 : 75000,
    ownCapital: profile.capital || 45000,
    monthlyRevenue: profile.monthlySales || 35000,
    monthlyExpenses: profile.monthlyExpenses || 22000,
    interestRate: 11.5,
    tenureMonths: 24,
  });

  // Automatically sync financial defaults when profile capital/sales change
  useEffect(() => {
    setFinancialInput((prev) => ({
      ...prev,
      ownCapital: profile.capital || prev.ownCapital,
      monthlyRevenue: profile.monthlySales || prev.monthlyRevenue,
      monthlyExpenses: profile.monthlyExpenses || prev.monthlyExpenses,
    }));
  }, [profile.capital, profile.monthlySales, profile.monthlyExpenses]);

  // Derived financial calculation result
  const financialResult = calculateFinancialPlan(financialInput);

  const updateProfile = (updated: Partial<BusinessProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save profile to localStorage', err);
      }
      return next;
    });
  };

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTask = (id: string) => {
    setActionTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      try {
        localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save tasks', err);
      }
      return next;
    });
  };

  const addExpertBooking = (booking: ExpertBooking) => {
    setExpertBookings((prev) => {
      const next = [booking, ...prev];
      try {
        localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save booking', err);
      }
      return next;
    });
  };

  const setLanguage = (lang: 'Hindi' | 'Marathi' | 'English') => {
    updateProfile({ language: lang });
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        activeTab,
        setActiveTab,
        actionTasks,
        toggleTask,
        expertBookings,
        addExpertBooking,
        financialInput,
        setFinancialInput,
        financialResult,
        language: profile.language || 'Hindi',
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
