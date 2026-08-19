'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/AppStateContext';
import { CasesService } from '@/services';
import { AlertTriangle, MapPin, Camera, ShieldAlert, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { IssueCategory, WardSlug } from '@/types';

export default function ReportPage() {
  const router = useRouter();
  const { tenant, currentWard } = useAppState();

  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<IssueCategory>('roads');
  const [wardSlug, setWardSlug] = useState<WardSlug>(currentWard.slug);
  const [villageLocation, setVillageLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedRef, setGeneratedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await CasesService.createReport({
        category,
        wardSlug,
        villageLocation,
        description,
        isAnonymous,
        reporterName: isAnonymous ? undefined : reporterName,
        reporterPhone: isAnonymous ? undefined : reporterPhone,
      });

      setGeneratedRef(res.referenceCode);
      setStep(4); // Success step
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Citizen Issue Reporting & Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          Report an Issue in Lugari
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Report broken water points, damaged roads, transformer power outages, or school infrastructure needs directly to administrators with a tracking reference code.
        </p>
      </div>

      {/* Safety / Emergency Warning */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block">For Life-Threatening Emergencies:</strong>
          Do not rely solely on this web form for immediate life-threatening criminal or medical emergencies. Contact police or local authorities immediately.
        </div>
      </div>

      {/* Step Wizard Container */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between text-xs font-bold border-b border-border pb-4">
            <span className={step >= 1 ? 'text-emerald-600' : 'text-muted-foreground'}>1. Category</span>
            <span className={step >= 2 ? 'text-emerald-600' : 'text-muted-foreground'}>2. Location & Details</span>
            <span className={step >= 3 ? 'text-emerald-600' : 'text-muted-foreground'}>3. Contact & Consent</span>
          </div>
        )}

        {/* STEP 1: CATEGORY */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-sm text-foreground">Select Issue Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'roads', label: 'Roads & Bridges' },
                { id: 'electricity', label: 'Electricity & Transformers' },
                { id: 'water', label: 'Water & Boreholes' },
                { id: 'health', label: 'Health Facilities' },
                { id: 'education', label: 'School Buildings' },
                { id: 'security', label: 'Security & Lighting' },
                { id: 'environment', label: 'Environment & Floods' },
                { id: 'public_infrastructure', label: 'Public Buildings' },
                { id: 'other', label: 'Other Issue' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as IssueCategory)}
                  className={`p-3.5 rounded-xl border font-bold text-left transition ${
                    category === cat.id
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-md'
                      : 'bg-card border-border hover:bg-accent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-1.5 hover:bg-emerald-900 transition"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & DETAILS */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-foreground mb-1">Select Ward</label>
              <select
                value={wardSlug}
                onChange={e => setWardSlug(e.target.value as WardSlug)}
                className="w-full p-3 rounded-xl border border-border bg-background font-medium focus:outline-none"
              >
                {tenant.wards.map(w => (
                  <option key={w.id} value={w.slug}>{w.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Village / Landmark / Specific Location</label>
              <input
                type="text"
                value={villageLocation}
                onChange={e => setVillageLocation(e.target.value)}
                placeholder="E.g., Mautuma Junction near Primary School"
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Description of Problem</label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what is broken, how long it has been faulty, and impact on residents..."
                className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-border font-bold hover:bg-accent"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-1.5 hover:bg-emerald-900 transition"
              >
                <span>Continue to Contact Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & SUBMIT */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-4 bg-muted/40 rounded-xl border border-border space-y-2">
              <label className="flex items-center gap-2 font-bold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <span>Submit Report Anonymously</span>
              </label>
              <p className="text-[11px] text-muted-foreground">
                If checked, your name and phone number will not be attached to the case.
              </p>
            </div>

            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={e => setReporterName(e.target.value)}
                    placeholder="E.g., Juma Omondi"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                    required={!isAnonymous}
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Your Phone Number (For SMS Status Updates)</label>
                  <input
                    type="tel"
                    value={reporterPhone}
                    onChange={e => setReporterPhone(e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none"
                    required={!isAnonymous}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-border font-bold hover:bg-accent"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering Case...' : 'Submit Citizen Report'}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && generatedRef && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Report Registered Successfully</h2>
              <p className="text-xs text-muted-foreground">Your case has been logged in the Lugari Citizen Issue System.</p>
            </div>

            <div className="p-6 bg-emerald-950 text-white rounded-2xl max-w-sm mx-auto space-y-2">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Your Unique Case Reference</span>
              <div className="text-3xl font-black font-mono text-amber-400">{generatedRef}</div>
              <p className="text-[11px] text-emerald-200">Save this reference code to track resolution status anytime.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Link
                href={`/report/status/${generatedRef}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold text-xs hover:bg-emerald-900 transition"
              >
                Track Case Status →
              </Link>
              <Link
                href="/community/issues"
                className="px-5 py-2.5 rounded-xl bg-card border border-border font-bold text-xs hover:bg-accent transition"
              >
                View Public Issues Dashboard
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
