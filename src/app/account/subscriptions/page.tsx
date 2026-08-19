'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { Bell, Smartphone, MessageSquare, ShieldCheck, CheckCircle2, Save } from 'lucide-react';

export default function SubscriptionsPage() {
  const { currentWard } = useAppState();

  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [bursaryAlerts, setBursaryAlerts] = useState(true);
  const [jobsAlerts, setJobsAlerts] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Granular Preferences</span>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Communication Consent Center</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Choose which channels and topics you want to receive official alerts for in {currentWard.name}.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Communication preferences updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-xs">

        {/* Channels */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">1. Select Preferred Channels</h2>

          <label className="p-4 border border-border rounded-xl flex items-center justify-between cursor-pointer hover:bg-accent/50 transition">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-bold text-foreground">WhatsApp Broadcasts</p>
                <p className="text-muted-foreground">Receive rich media notices, PDF bursary forms, and project updates.</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={whatsappEnabled}
              onChange={e => setWhatsappEnabled(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>

          <label className="p-4 border border-border rounded-xl flex items-center justify-between cursor-pointer hover:bg-accent/50 transition">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-bold text-foreground">SMS Notifications</p>
                <p className="text-muted-foreground">Short, instant SMS alerts for critical road closures and bursaries.</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={e => setSmsEnabled(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>
        </div>

        {/* Topics */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-base font-bold text-foreground">2. Select Topics of Interest</h2>

          <label className="p-3 bg-muted/30 border border-border rounded-xl flex items-center justify-between cursor-pointer">
            <span className="font-semibold text-foreground">Emergency & Road Closures (Critical)</span>
            <input
              type="checkbox"
              checked={emergencyAlerts}
              onChange={e => setEmergencyAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>

          <label className="p-3 bg-muted/30 border border-border rounded-xl flex items-center justify-between cursor-pointer">
            <span className="font-semibold text-foreground">Bursary Scheme Releases & Deadlines</span>
            <input
              type="checkbox"
              checked={bursaryAlerts}
              onChange={e => setBursaryAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>

          <label className="p-3 bg-muted/30 border border-border rounded-xl flex items-center justify-between cursor-pointer">
            <span className="font-semibold text-foreground">Local Job Matches & TVET Admissions</span>
            <input
              type="checkbox"
              checked={jobsAlerts}
              onChange={e => setJobsAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-2 hover:bg-emerald-900 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>

    </div>
  );
}
