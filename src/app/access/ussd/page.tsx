'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Radio, Play, CheckCircle2, ChevronRight } from 'lucide-react';

export default function USSDSimulatorPage() {
  const [screen, setScreen] = React.useState<'main' | 'news' | 'jobs' | 'projects' | 'report'>('main');
  const [userInput, setUserInput] = React.useState('');

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput === '1') setScreen('news');
    else if (userInput === '2') setScreen('jobs');
    else if (userInput === '3') setScreen('projects');
    else if (userInput === '0') setScreen('main');
    setUserInput('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
          <Smartphone className="w-4 h-4 text-emerald-700" />
          <span>Feature Phone & Offline Connectivity Access</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Lugari USSD & Feature Phone Service
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Allowing residents without smartphones or internet bundles to query jobs, project status, and emergency notices on any basic mobile phone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* USSD Phone Screen Simulation */}
        <div className="mx-auto w-full max-w-xs bg-slate-900 text-slate-100 p-6 rounded-[36px] border-4 border-slate-700 shadow-2xl space-y-4">
          <div className="text-center text-[10px] text-slate-400 font-mono tracking-widest uppercase">
            SAFARICOM / AIRTEL USSD
          </div>

          <div className="bg-emerald-950 text-amber-300 font-mono text-xs p-4 rounded-xl min-h-[180px] border border-emerald-800 space-y-2">
            {screen === 'main' && (
              <>
                <p className="font-bold text-white border-b border-emerald-800 pb-1">KARIBU LUGARI (*384*45#)</p>
                <p>1. Latest News & Gazette</p>
                <p>2. Jobs & Bursaries</p>
                <p>3. Track Projects</p>
                <p>4. Report Issue</p>
                <p>5. My Ward Alerts</p>
              </>
            )}

            {screen === 'news' && (
              <>
                <p className="font-bold text-white border-b border-emerald-800 pb-1">LUGARI NEWS</p>
                <p>1. Mautuma Lab 75% complete</p>
                <p>2. KPLC Power Maintenance Thu</p>
                <p>0. Back to Main Menu</p>
              </>
            )}

            {screen === 'jobs' && (
              <>
                <p className="font-bold text-white border-b border-emerald-800 pb-1">LUGARI JOBS</p>
                <p>1. Math Teacher - Lumakanda</p>
                <p>2. Youth Agri Grant 2025</p>
                <p>0. Back to Main Menu</p>
              </>
            )}

            {screen === 'projects' && (
              <>
                <p className="font-bold text-white border-b border-emerald-800 pb-1">PROJECT TRACKER</p>
                <p>1. Mautuma Science Lab (75%)</p>
                <p>2. Chekalini Borehole (60%)</p>
                <p>0. Back to Main Menu</p>
              </>
            )}
          </div>

          <form onSubmit={handleInputSubmit} className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Type number (e.g. 1)"
              className="flex-1 bg-slate-800 text-white font-mono text-xs p-2 rounded-lg border border-slate-700 text-center focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-emerald-600 text-white font-mono font-bold text-xs rounded-lg hover:bg-emerald-500"
            >
              SEND
            </button>
          </form>

          <div className="flex justify-center gap-2 pt-2">
            <button onClick={() => setScreen('main')} className="text-[10px] text-slate-400 hover:text-white underline font-mono">
              Reset Keypad
            </button>
          </div>
        </div>

        {/* Informational Text */}
        <div className="space-y-4 text-xs">
          <h2 className="text-xl font-bold text-foreground">Inclusive Digital Infrastructure</h2>
          <p className="text-muted-foreground leading-relaxed">
            Over 40% of residents in rural sub-counties access news via basic feature phones. The Lugari USSD service syncs directly with the central web database via lightweight Worker APIs.
          </p>

          <div className="space-y-2 pt-2">
            <div className="p-3 bg-card border border-border rounded-xl font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>USSD Shortcode *384*45# pending telecom integration</span>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero data bundle requirement for end citizens</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
