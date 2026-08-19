'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import {
  ProjectsService, OpportunitiesService, BusinessesService,
  EventsService, CasesService, AgricultureService, ArticlesService
} from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import {
  Search, MapPin, Briefcase, FileText, AlertTriangle, Building2,
  BookOpen, Calendar, ArrowRight, ShieldCheck, CheckCircle2,
  Sparkles, TrendingUp, Users, Smartphone, Wheat, DollarSign, Send
} from 'lucide-react';
import { Project, Opportunity, Business, Event, Article, AgriculturePrice } from '@/types';

export default function HomePage() {
  const { tenant, currentWard, setWardBySlug, setIsSearchOpen, dataSaver } = useAppState();

  const [projects, setProjects] = useState<Project[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [prices, setPrices] = useState<AgriculturePrice[]>([]);

  // Newsletter SMS/WhatsApp state
  const [subscribePhone, setSubscribePhone] = useState('');
  const [subscribeChannel, setSubscribeChannel] = useState<'SMS' | 'WhatsApp'>('WhatsApp');
  const [subscribeSubmitted, setSubscribeSubmitted] = useState(false);

  useEffect(() => {
    ProjectsService.getAll().then(res => setProjects(res.slice(0, 3)));
    OpportunitiesService.getAll().then(res => setOpportunities(res.slice(0, 3)));
    BusinessesService.getAll({ verifiedOnly: true }).then(res => setBusinesses(res.slice(0, 3)));
    EventsService.getAll().then(res => setEvents(res.slice(0, 2)));
    ArticlesService.getAll().then(res => setArticles(res.slice(0, 2)));
    AgricultureService.getMarketPrices().then(res => setPrices(res.slice(0, 4)));
  }, []);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribePhone) {
      setSubscribeSubmitted(true);
    }
  };

  return (
    <div className="space-y-12 pb-12">

      {/* A. HERO SECTION - Politically Neutral & Hyperlocal */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-700/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Independent Hyperlocal Civic Platform for Lugari</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Everything Lugari. <span className="text-amber-400">One Place.</span>
          </h1>

          <p className="text-sm sm:text-lg text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Development projects, bursaries, jobs, local businesses, schools, public participation, and community alerts across all 6 wards of Lugari.
          </p>

          {/* Search Box Trigger */}
          <div className="max-w-2xl mx-auto pt-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-white dark:bg-card text-foreground rounded-2xl shadow-2xl p-2.5 sm:p-3 flex items-center justify-between border-2 border-emerald-500/50 hover:border-amber-400 transition"
            >
              <div className="flex items-center gap-3 text-muted-foreground text-xs sm:text-sm pl-2">
                <Search className="w-5 h-5 text-emerald-600" />
                <span>Search bursaries, teacher jobs, road projects, agrovets...</span>
              </div>
              <span className="bg-emerald-800 text-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl hidden sm:inline-flex items-center gap-1">
                <span>Search All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Ward Switcher Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-emerald-300 font-medium">Explore by Ward:</span>
            {tenant.wards.map(w => (
              <button
                key={w.id}
                onClick={() => setWardBySlug(w.slug)}
                className={`px-3 py-1 rounded-full border transition font-semibold ${
                  w.slug === currentWard.slug
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border-emerald-700/60'
                }`}
              >
                {w.name}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* C. QUICK ACTION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Find Jobs', href: '/opportunities', icon: Briefcase, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50' },
            { label: 'Track Projects', href: '/projects', icon: FileText, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50' },
            { label: 'Report Issue', href: '/report', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50' },
            { label: 'Find Business', href: '/businesses', icon: Building2, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50' },
            { label: 'Bursaries', href: '/education', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' },
            { label: 'Upcoming Events', href: '/events', icon: Calendar, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50' },
            { label: 'My Ward', href: `/wards/${currentWard.slug}`, icon: MapPin, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50' },
            { label: 'USSD Access', href: '/access/ussd', icon: Smartphone, color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/50' },
          ].map(action => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="bg-card border border-border hover:border-emerald-500 rounded-xl p-3.5 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition group"
              >
                <div className={`p-2.5 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 stroke-[2px]" />
                </div>
                <span className="text-xs font-semibold text-foreground leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* D. LATEST VERIFIED UPDATES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Latest Verified Updates
            </h2>
            <p className="text-xs text-muted-foreground">Verified public information from institutions and community monitors.</p>
          </div>
          <Link href="/news" className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1">
            <span>View All Gazette</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <div key={article.id} className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500 transition flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    {article.category}
                  </span>
                  <TrustBadge type={article.verificationStatus === 'verified' ? 'Verified Source' : 'Community Report'} size="sm" />
                </div>
                <h3 className="font-bold text-base text-foreground hover:text-emerald-600 transition">
                  <Link href={`/news/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Source: {article.source}</span>
                <span>{article.publishedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. DEVELOPMENT SNAPSHOT */}
      <section className="bg-muted/40 border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Transparency & Accountability</span>
              <h2 className="text-2xl font-black text-foreground tracking-tight">Development Projects in Lugari</h2>
              <p className="text-xs text-muted-foreground">Track budget execution, progress milestones, and project photos.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/data/projects" className="px-3.5 py-2 rounded-lg bg-card border border-border text-xs font-semibold hover:bg-accent transition">
                Project Ledger
              </Link>
              <Link href="/projects" className="px-3.5 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition flex items-center gap-1">
                <span>Explore All Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(proj => (
              <div key={proj.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                {!dataSaver && proj.currentPhotoUrl && (
                  <div className="h-44 bg-muted relative overflow-hidden">
                    <img src={proj.currentPhotoUrl} alt={proj.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <TrustBadge type="Verified Source" size="sm" />
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                      <span className="font-semibold capitalize text-emerald-600">{proj.wardSlug} Ward</span>
                      <span>FY {proj.financialYear}</span>
                    </div>
                    <h3 className="font-bold text-sm text-foreground hover:text-emerald-600 transition line-clamp-2">
                      <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                    </h3>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-muted-foreground">Status: {proj.status}</span>
                      <span className="text-emerald-600">{proj.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${proj.progressPercentage}%` }} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Budget: KSh {(proj.budgetKsh / 1000000).toFixed(1)}M</span>
                    <span className="font-semibold text-foreground">{proj.fundingSource}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. OPPORTUNITIES & BURSARIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Jobs, Bursaries & Grants
            </h2>
            <p className="text-xs text-muted-foreground">Empowering youth, students, and businesses in Lugari.</p>
          </div>
          <Link href="/opportunities" className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1">
            <span>View All Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map(opp => (
            <div key={opp.id} className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                    {opp.category}
                  </span>
                  {opp.closingSoon && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      Closing Soon
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-foreground hover:text-emerald-600 transition">
                  <Link href={`/opportunities/${opp.slug}`}>{opp.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground">{opp.organizationName}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{opp.description}</p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Value: <strong className="text-foreground">{opp.salaryOrValue}</strong></span>
                <span className="font-semibold text-emerald-600">Deadline: {opp.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* H. COMMUNITY REPORT SNAPSHOT */}
      <section className="bg-slate-900 text-slate-100 rounded-2xl max-w-7xl mx-auto mx-4 sm:mx-6 lg:mx-8 p-8 border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Citizen Feedback Loop</span>
            <h2 className="text-3xl font-black tracking-tight text-white">
              342 Community Issues Resolved This Month
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Report broken water pumps, transformer oil leaks, damaged roads, or public school facility needs directly to local administrators with instant reference numbers.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/report" className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 stroke-[2.5px]" />
                <span>Report an Issue Now</span>
              </Link>
              <Link href="/community/issues" className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition">
                View Public Issues Dashboard
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-amber-400">92%</div>
              <div className="text-[11px] text-slate-400 mt-1">Verification Rate</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-emerald-400">4.2 Days</div>
              <div className="text-[11px] text-slate-400 mt-1">Avg Resolution Time</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-blue-400">6 Wards</div>
              <div className="text-[11px] text-slate-400 mt-1">Coverage</div>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="text-2xl font-black text-purple-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-1">Anonymous Option</div>
            </div>
          </div>
        </div>
      </section>

      {/* L. AGRICULTURE SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Wheat className="w-5 h-5 text-emerald-600" /> Agriculture & Market Prices
            </h2>
            <p className="text-xs text-muted-foreground">Daily grain, livestock, and commodity prices in Lugari markets.</p>
          </div>
          <Link href="/agriculture" className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1">
            <span>View Agriculture Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {prices.map(item => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="text-[11px] font-bold text-muted-foreground uppercase">{item.marketName}</div>
              <div className="font-extrabold text-foreground text-sm">{item.item}</div>
              <div className="text-lg font-black text-emerald-600">
                KSh {item.priceKsh.toLocaleString()} <span className="text-[10px] font-normal text-muted-foreground">/ {item.unit}</span>
              </div>
              <div className="text-[10px] text-muted-foreground pt-1 border-t border-border flex justify-between">
                <span>Updated: {item.updatedDate}</span>
                <span className="font-semibold text-emerald-600">Fresh</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* O. NEWSLETTER & SMS ALERTS CTA */}
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-emerald-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-700/80 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Receive Instant SMS or WhatsApp Updates</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Stay Connected to Opportunities in Your Ward
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            Get instant alerts for bursary releases, local job openings, emergency road alerts, and public participation meetings.
          </p>

          {subscribeSubmitted ? (
            <div className="bg-emerald-900 border border-emerald-700 p-4 rounded-xl text-amber-300 font-bold text-sm max-w-md mx-auto">
              ✓ Subscribed successfully! You will receive alerts for {currentWard.name}.
            </div>
          ) : (
            <form onSubmit={handleSubscribeSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                value={subscribePhone}
                onChange={e => setSubscribePhone(e.target.value)}
                placeholder="Enter phone (+254 7XX XXX XXX)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-900/80 border border-emerald-700 text-white placeholder:text-emerald-300 text-xs focus:outline-none focus:border-amber-400"
                required
              />
              <select
                value={subscribeChannel}
                onChange={e => setSubscribeChannel(e.target.value as 'SMS' | 'WhatsApp')}
                className="px-3 py-2.5 rounded-xl bg-emerald-900/80 border border-emerald-700 text-white text-xs focus:outline-none"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="SMS">SMS</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition shrink-0 flex items-center justify-center gap-1"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-emerald-300">
            Zero spam policy. Unsubscribe anytime. View <Link href="/privacy" className="underline hover:text-white">Privacy Center</Link>.
          </p>
        </div>
      </section>

    </div>
  );
}
