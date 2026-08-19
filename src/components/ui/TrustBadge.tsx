'use client';

import React from 'react';
import { TrustBadgeType } from '@/types';
import { CheckCircle2, ShieldCheck, AlertCircle, Sparkles, Building2, HelpCircle, AlertTriangle, Archive } from 'lucide-react';

interface TrustBadgeProps {
  type: TrustBadgeType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function TrustBadge({ type, size = 'md', showIcon = true }: TrustBadgeProps) {
  const configs: Record<TrustBadgeType, { label: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
    'Verified Organization': {
      label: 'Verified Institution',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    'Official Institution': {
      label: 'Official Body',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-300 dark:border-emerald-700',
      icon: <Building2 className="w-3.5 h-3.5" />,
    },
    'Verified Source': {
      label: 'Verified Source',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    'Sponsored': {
      label: 'Sponsored',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    'Community Report': {
      label: 'Community Report',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      text: 'text-indigo-700 dark:text-indigo-400',
      border: 'border-indigo-200 dark:border-indigo-800',
      icon: <HelpCircle className="w-3.5 h-3.5" />,
    },
    'Under Review': {
      label: 'Under Verification',
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      text: 'text-orange-700 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800',
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    'AI Generated': {
      label: 'AI Summary',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-700 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    'Corrected': {
      label: 'Correction Recorded',
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-700 dark:text-slate-300',
      border: 'border-slate-300 dark:border-slate-700',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
    'Archived': {
      label: 'Archived Record',
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-600 dark:text-gray-400',
      border: 'border-gray-200 dark:border-gray-700',
      icon: <Archive className="w-3.5 h-3.5" />,
    },
  };

  const config = configs[type] || configs['Verified Source'];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
}
