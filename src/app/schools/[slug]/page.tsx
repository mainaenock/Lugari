'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { SchoolsService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { BookOpen, MapPin, PhoneCall, ArrowLeft, Users, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { School } from '@/types';

export default function SchoolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [school, setSchool] = useState<School | null>(null);

  useEffect(() => {
    SchoolsService.getBySlug(slug).then(res => setSchool(res));
  }, [slug]);

  if (!school) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold text-muted-foreground">Loading school profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Link href="/schools" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Schools</span>
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
            {school.level} • {school.type} • {school.gender}
          </span>
          <TrustBadge type={school.verified ? 'Verified Source' : 'Under Review'} size="md" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">{school.name}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{school.address}, {school.wardSlug.toUpperCase()} Ward</span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Principal / Head</span>
            <span className="font-bold text-foreground mt-0.5">{school.principalName}</span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Student Population</span>
            <span className="font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{school.studentCount} Students ({school.teacherCount} Teachers)</span>
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Contact Phone</span>
            <a href={`tel:${school.contactPhone}`} className="font-bold text-foreground hover:underline mt-0.5 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{school.contactPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {school.academicPerformanceNote && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-2 text-xs sm:text-sm">
          <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" /> Academic & CBC Performance Note
          </h3>
          <p className="text-muted-foreground leading-relaxed">{school.academicPerformanceNote}</p>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
        <h3 className="font-extrabold text-base text-foreground">Key Campus Facilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {school.facilities.map((fac, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border flex items-center gap-2 text-foreground font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{fac}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
