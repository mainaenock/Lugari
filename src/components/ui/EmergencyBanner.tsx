'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertsService } from '@/services';
import { useAppState } from '@/context/AppStateContext';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { Alert } from '@/types';

export function EmergencyBanner() {
  const { currentWard } = useAppState();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    AlertsService.getActiveAlerts(currentWard.slug).then(res => setAlerts(res));
  }, [currentWard]);

  if (dismissed || alerts.length === 0) return null;

  const topAlert = alerts[0];

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-medium z-30 relative shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <AlertTriangle className="w-4 h-4 shrink-0 text-slate-950 stroke-[2.5px]" />
          <span className="font-bold uppercase tracking-wider text-[10px] bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded shrink-0">
            {topAlert.category.replace('_', ' ')} ALERT
          </span>
          <p className="truncate text-slate-950 font-semibold">
            {topAlert.title}: <span className="font-normal">{topAlert.message}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/alerts"
            className="font-bold underline hover:text-slate-800 flex items-center gap-1 text-[11px]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-600 rounded transition"
            aria-label="Dismiss alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
