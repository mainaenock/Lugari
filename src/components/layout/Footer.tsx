'use client';

import React from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import { ShieldAlert, Globe, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  const { tenant } = useAppState();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Col 1: Brand & Disclaimer */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-emerald-700 text-amber-400 font-bold flex items-center justify-center text-lg">
                L
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Lugari<span className="text-amber-500">.ke</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Lugari Digital Infrastructure is an independent, permanent, hyperlocal digital infrastructure platform for Lugari, connecting residents, businesses, projects, and civic services.
            </p>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-400 leading-normal">
              <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Independence Disclaimer
              </p>
              Lugari.ke is an independent community platform and NOT an official Government of Kenya or County Government website. Verified institutional profiles are hosted under tenant supervision.
            </div>
          </div>

          {/* Col 2: Hyperlocal Wards */}
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Lugari Wards
            </h4>
            <ul className="space-y-2 text-xs">
              {tenant.wards.map(w => (
                <li key={w.id}>
                  <Link href={`/wards/${w.slug}`} className="hover:text-emerald-400 transition">
                    {w.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Civic & Public Services */}
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Civic Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/projects" className="hover:text-emerald-400">Development Projects</Link></li>
              <li><Link href="/data/projects" className="hover:text-emerald-400">Project Ledger</Link></li>
              <li><Link href="/report" className="hover:text-emerald-400 text-amber-400 font-semibold">Report an Issue</Link></li>
              <li><Link href="/public-participation" className="hover:text-emerald-400">Public Participation</Link></li>
              <li><Link href="/commitments" className="hover:text-emerald-400">Commitment Tracker</Link></li>
              <li><Link href="/leadership" className="hover:text-emerald-400">Leadership Directory</Link></li>
              <li><Link href="/access/ussd" className="hover:text-emerald-400 text-emerald-400 font-bold">USSD Service (*XXX#)</Link></li>
            </ul>
          </div>

          {/* Col 4: Economy & Opportunities */}
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">
              Economy & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/opportunities" className="hover:text-emerald-400">Jobs & Bursaries</Link></li>
              <li><Link href="/businesses" className="hover:text-emerald-400">Business Directory</Link></li>
              <li><Link href="/marketplace" className="hover:text-emerald-400">Marketplace</Link></li>
              <li><Link href="/agriculture" className="hover:text-emerald-400">Agriculture & Prices</Link></li>
              <li><Link href="/talent" className="hover:text-emerald-400">Talent Directory</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400">Privacy & Consent</Link></li>
              <li><Link href="/corrections" className="hover:text-emerald-400">Corrections Log</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Lugari Digital Infrastructure. Tenant #1 of Civic Infrastructure Platform.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>            <Link href="/corrections" className="hover:text-slate-300">Report Inaccuracy</Link>
            <Link href="/portal/dashboard" className="text-amber-400 font-semibold hover:underline">Institution Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
