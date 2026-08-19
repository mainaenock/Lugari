'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import {
  Search, Globe, MapPin, Bell, Menu, X, ChevronDown,
  Sparkles, ShieldCheck, UserCheck, Briefcase, Building2,
  BookOpen, Landmark, Megaphone, FileText, Calendar,
  AlertTriangle, PhoneCall, HelpCircle, Layers, Smartphone
} from 'lucide-react';
import { WardSlug } from '@/types';

export function Header() {
  const {
    tenant,
    currentWard,
    setWardBySlug,
    language,
    setLanguage,
    dataSaver,
    setDataSaver,
    currentUser,
    setCurrentUser,
    setIsSearchOpen
  } = useAppState();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isWardDropdownOpen, setIsWardDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border transition-colors">
      {/* Top Banner for Data Saver & Neutrality Notice */}
      <div className="bg-emerald-950 text-emerald-100 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            Hyperlocal Civic Infrastructure
          </span>
          <span className="hidden sm:inline">
            Lugari Digital Infrastructure ({tenant.domain}) — Independent Community Platform
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Data Saver Toggle */}
          <button
            onClick={() => setDataSaver(!dataSaver)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-medium transition ${
              dataSaver ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200'
            }`}
            title="Toggle low-data mode to save internet bundles"
          >
            <Smartphone className="w-3 h-3" />
            <span>Data Saver: {dataSaver ? 'ON' : 'OFF'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="flex items-center gap-1 hover:text-white font-semibold uppercase text-[11px]"
          >
            <Globe className="w-3 h-3" />
            <span>{language === 'en' ? 'Kiswahili' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 text-amber-400 flex items-center justify-center font-black text-xl shadow-md group-hover:bg-emerald-900 transition">
                L
              </div>
              <div>
                <span className="font-extrabold text-lg text-foreground tracking-tight block leading-none">
                  Lugari<span className="text-amber-500">.ke</span>
                </span>
                <span className="text-[11px] text-muted-foreground font-medium block">
                  Hyperlocal Digital Hub
                </span>
              </div>
            </Link>

            {/* Ward Selector Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsWardDropdownOpen(!isWardDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 hover:bg-muted text-xs font-semibold transition"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{currentWard.name}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              {isWardDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 w-56 bg-card border border-border rounded-lg shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    Select Your Ward
                  </div>
                  {tenant.wards.map(w => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setWardBySlug(w.slug);
                        setIsWardDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-accent transition ${
                        w.slug === currentWard.slug ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                      }`}
                    >
                      <span>{w.name}</span>
                      <span className="text-[10px] text-muted-foreground">HQ: {w.headquarters}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Search Trigger */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between text-left px-3.5 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted text-muted-foreground text-xs transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span>Search jobs, projects, schools, businesses...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-background border border-border rounded font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            <Link href="/projects" className="hover:text-emerald-600 transition">Projects</Link>
            <Link href="/opportunities" className="hover:text-emerald-600 transition">Opportunities</Link>
            <Link href="/businesses" className="hover:text-emerald-600 transition">Businesses</Link>
            <Link href="/report" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
              Report Issue
            </Link>

            {/* Explore Mega Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="flex items-center gap-1 hover:text-emerald-600 transition"
              >
                <span>Explore</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isMegaMenuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-[680px] bg-card border border-border rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-6 z-50"
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5 text-emerald-600" /> Civic Infrastructure
                    </h4>
                    <ul className="space-y-2 text-xs">
                      <li><Link href={`/wards/${currentWard.slug}`} onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">My Ward ({currentWard.name})</Link></li>
                      <li><Link href="/projects" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Development Projects</Link></li>
                      <li><Link href="/data/projects" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Project Ledger & Charts</Link></li>
                      <li><Link href="/commitments" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Public Commitments</Link></li>
                      <li><Link href="/public-participation" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Public Participation</Link></li>
                      <li><Link href="/report" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600 font-semibold text-amber-600">Report an Issue</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Economy & Jobs
                    </h4>
                    <ul className="space-y-2 text-xs">
                      <li><Link href="/opportunities" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Jobs & Bursaries</Link></li>
                      <li><Link href="/education" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Bursary & Education Centre</Link></li>
                      <li><Link href="/businesses" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Business Directory</Link></li>
                      <li><Link href="/marketplace" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Local Marketplace</Link></li>
                      <li><Link href="/agriculture" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Agriculture & Prices</Link></li>
                      <li><Link href="/talent" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Talent & Skills Directory</Link></li>
                      <li><Link href="/advertise" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Advertise Local Business</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Community & Access
                    </h4>
                    <ul className="space-y-2 text-xs">
                      <li><Link href="/schools" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Schools Directory</Link></li>
                      <li><Link href="/events" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Upcoming Events</Link></li>
                      <li><Link href="/news" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">News & Gazette</Link></li>
                      <li><Link href="/leadership" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Public Leadership</Link></li>
                      <li><Link href="/access/ussd" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600 font-semibold text-emerald-600">Feature Phone USSD (*XXX#)</Link></li>
                      <li><Link href="/data" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Lugari in Numbers</Link></li>
                      <li><Link href="/corrections" onClick={() => setIsMegaMenuOpen(false)} className="hover:text-emerald-600">Report Inaccuracy</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* User Account & Demo Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted text-muted-foreground"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / Demo Persona Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-emerald-950 text-white text-xs font-semibold hover:bg-emerald-900 transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">
                  {currentUser ? currentUser.name : 'Sign In'}
                </span>
                <span className="text-[10px] bg-emerald-800 px-1.5 py-0.5 rounded text-amber-300 capitalize">
                  {currentUser?.role || 'Guest'}
                </span>
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl p-2 z-50 text-xs">
                  <div className="p-2 border-b border-border bg-muted/40 rounded-t-lg">
                    <p className="font-bold text-foreground">{currentUser?.name}</p>
                    <p className="text-[10px] text-muted-foreground">{currentUser?.phone}</p>
                  </div>

                  <div className="py-2 space-y-1">
                    <p className="px-2 text-[10px] font-bold text-muted-foreground uppercase">
                      Switch Demo Persona
                    </p>

                    <button
                      onClick={() => {
                        setCurrentUser({
                          id: 'u-res',
                          name: 'Juma Omondi',
                          phone: '+254 712 345 678',
                          role: 'resident',
                          wardSlug: 'mautuma',
                          preferredLanguage: 'en',
                          dataSaverMode: false,
                          isVerified: true
                        });
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-accent flex items-center justify-between"
                    >
                      <span>Resident Portal</span>
                      <span className="text-[10px] text-emerald-600">Demo Resident</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentUser({
                          id: 'u-inst',
                          name: 'Lugari NG-CDF Admin',
                          phone: '+254 700 111 222',
                          role: 'institution_admin',
                          wardSlug: 'lumakanda',
                          preferredLanguage: 'en',
                          dataSaverMode: false,
                          isVerified: true
                        });
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-accent flex items-center justify-between font-semibold text-emerald-700 dark:text-emerald-400"
                    >
                      <span>MP & Institution Portal</span>
                      <span className="text-[10px] text-emerald-600">Demo Staff</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentUser({
                          id: 'u-admin',
                          name: 'Lugari Platform Operator',
                          phone: '+254 700 000 000',
                          role: 'platform_admin',
                          preferredLanguage: 'en',
                          dataSaverMode: false,
                          isVerified: true
                        });
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-accent flex items-center justify-between text-indigo-600 font-semibold"
                    >
                      <span>Platform Admin Portal</span>
                      <span className="text-[10px] text-indigo-600">Demo Admin</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-border space-y-1">
                    <Link
                      href="/account"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-2 py-1.5 hover:bg-accent rounded"
                    >
                      Resident Account
                    </Link>
                    <Link
                      href="/portal/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-2 py-1.5 hover:bg-accent rounded font-semibold text-emerald-600"
                    >
                      Institutional Portal
                    </Link>
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-2 py-1.5 hover:bg-accent rounded text-indigo-600 font-semibold"
                    >
                      Platform Admin
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-border hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-6 space-y-6">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Select Your Ward</p>
            <div className="grid grid-cols-2 gap-2">
              {tenant.wards.map(w => (
                <button
                  key={w.id}
                  onClick={() => {
                    setWardBySlug(w.slug);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-xs text-left rounded-lg border ${
                    w.slug === currentWard.slug ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 font-bold' : 'border-border'
                  }`}
                >
                  {w.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm font-medium">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Home</Link>
            <Link href={`/wards/${currentWard.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-emerald-600 font-bold">
              My Ward ({currentWard.name})
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Development Projects</Link>
            <Link href="/opportunities" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Jobs & Bursaries</Link>
            <Link href="/businesses" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Local Businesses</Link>
            <Link href="/report" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-amber-600 font-bold">
              Report an Issue
            </Link>
            <Link href="/access/ussd" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-emerald-700 font-bold">
              USSD Feature Phone Simulator
            </Link>
            <Link href="/portal/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-indigo-600 font-bold">
              MP & Institution Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
