'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_TENANT } from '@/config/tenant';
import { TenantConfig, Ward, WardSlug, User } from '@/types';

interface AppStateContextType {
  tenant: TenantConfig;
  currentWard: Ward;
  setWardBySlug: (slug: WardSlug) => void;
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  dataSaver: boolean;
  setDataSaver: (dataSaver: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  savedItemIds: string[];
  toggleSaveItem: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [tenant] = useState<TenantConfig>(DEFAULT_TENANT);
  const [currentWard, setCurrentWard] = useState<Ward>(DEFAULT_TENANT.wards[0]);
  const [language, setLanguageState] = useState<'en' | 'sw'>('en');
  const [dataSaver, setDataSaverState] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [savedItemIds, setSavedItemIds] = useState<string[]>(['opp-1', 'proj-1', 'biz-1']);

  // Demo user: Default is Resident, can switch to Institution or Admin demo
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'user-resident-1',
    name: 'Juma Omondi',
    phone: '+254 712 345 678',
    email: 'juma.omondi@lugari.ke',
    role: 'resident',
    wardSlug: 'mautuma',
    preferredLanguage: 'en',
    dataSaverMode: false,
    isVerified: true,
  });

  useEffect(() => {
    // Read local preferences
    const savedWard = localStorage.getItem('lugari_ward');
    if (savedWard) {
      const ward = tenant.wards.find(w => w.slug === savedWard);
      if (ward) setCurrentWard(ward);
    }

    const savedLang = localStorage.getItem('lugari_lang');
    if (savedLang === 'en' || savedLang === 'sw') {
      setLanguageState(savedLang);
    }

    const savedDataSaver = localStorage.getItem('lugari_datasaver');
    if (savedDataSaver !== null) {
      setDataSaverState(savedDataSaver === 'true');
    }
  }, [tenant]);

  const setWardBySlug = (slug: WardSlug) => {
    const ward = tenant.wards.find(w => w.slug === slug);
    if (ward) {
      setCurrentWard(ward);
      localStorage.setItem('lugari_ward', slug);
    }
  };

  const setLanguage = (lang: 'en' | 'sw') => {
    setLanguageState(lang);
    localStorage.setItem('lugari_lang', lang);
  };

  const setDataSaver = (enabled: boolean) => {
    setDataSaverState(enabled);
    localStorage.setItem('lugari_datasaver', enabled ? 'true' : 'false');
  };

  const toggleSaveItem = (id: string) => {
    setSavedItemIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedItemIds.includes(id);

  return (
    <AppStateContext.Provider
      value={{
        tenant,
        currentWard,
        setWardBySlug,
        language,
        setLanguage,
        dataSaver,
        setDataSaver,
        currentUser,
        setCurrentUser,
        isSearchOpen,
        setIsSearchOpen,
        savedItemIds,
        toggleSaveItem,
        isSaved,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
