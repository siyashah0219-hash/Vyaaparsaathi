import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BusinessProfile,
  ActionTask,
  ExpertBooking,
  FinancialPlanInput,
  FinancialPlanResult,
  Language,
} from '../types';
import {
  defaultProfile,
  initialActionTasks,
  calculateFinancialPlan,
} from '../data/mockData';
import {
  translations,
  TranslationKey,
  getTranslation,
  applyGoogleTranslate,
} from '../lib/translations';

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

export const guestProfile: BusinessProfile = {
  name: 'Guest Entrepreneur',
  state: 'Maharashtra',
  district: 'Satara',
  villageCity: 'Koregaon',
  businessCategory: 'Dairy & Animal Husbandry',
  businessType: 'new',
  capital: 30000,
  monthlySales: 15000,
  monthlyExpenses: 9000,
  customerCount: 30,
  experienceYears: 1,
  businessGoal: 'Explore rural business setup and government scheme subsidies',
  targetCustomers: 'Local villagers & weekly haat',
  language: 'English',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
};

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
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  // Auth & Session
  isLoggedIn: boolean;
  login: (profileData?: Partial<BusinessProfile>) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  // Translation
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_PROFILE_KEY = 'vypaar_saathi_profile';
const LOCAL_TASKS_KEY = 'vypaar_saathi_tasks';
const LOCAL_BOOKINGS_KEY = 'vypaar_saathi_bookings';
const LOCAL_THEME_KEY = 'vypaar_saathi_theme';
const LOCAL_AUTH_KEY = 'vypaar_saathi_is_logged_in';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // Fallback
    }
    return 'light';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_THEME_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme', e);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  // Auth / Login State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_AUTH_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // Fallback
    }
    return true; // Default to true with defaultProfile so app starts ready to explore
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  const currentLanguage: Language = profile.language || 'English';

  const setLanguage = (lang: Language) => {
    updateProfile({ language: lang });
    // Apply live Google Translate on the DOM
    applyGoogleTranslate(lang);
  };

  // Translation helper function
  const t = (key: TranslationKey): string => {
    return getTranslation(currentLanguage, key);
  };

  // Login handler
  const login = (profileData?: Partial<BusinessProfile>) => {
    const newProfile = profileData ? { ...defaultProfile, ...profileData } : defaultProfile;
    setProfileState(newProfile);
    setIsLoggedIn(true);
    try {
      localStorage.setItem(LOCAL_AUTH_KEY, 'true');
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(newProfile));
    } catch (e) {
      console.warn('Could not persist login', e);
    }
  };

  // Logout handler
  const logout = () => {
    setIsLoggedIn(false);
    setProfileState(guestProfile);
    try {
      localStorage.setItem(LOCAL_AUTH_KEY, 'false');
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(guestProfile));
    } catch (e) {
      console.warn('Could not persist logout', e);
    }
    setActiveTab('home');
  };

  // Initial sync of Google Translate if Hindi/Marathi is saved
  useEffect(() => {
    if (currentLanguage === 'Hindi' || currentLanguage === 'Marathi') {
      const timer = setTimeout(() => {
        applyGoogleTranslate(currentLanguage);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

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
        language: currentLanguage,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        isLoggedIn,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        t,
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
