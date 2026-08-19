'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppStateContext';
import {
  ProjectsService, OpportunitiesService, BusinessesService,
  SchoolsService, EventsService, AgricultureService, CivicService
} from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import {
  MapPin, Users, Building2, Briefcase, FileText, BookOpen,
  Calendar, AlertTriangle, ArrowRight, Wheat, ChevronRight, PhoneCall
} from 'lucide-react';
import { WardSlug, Project, Opportunity, Business, School, Event, PublicProposal } from '@/types';

export default function WardPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const wardSlug = resolvedParams.slug as WardSlug;
  const { tenant, setWardBySlug } = useAppState();

  const ward = tenant.wards.find(w => w.slug === wardSlug) || tenant.wards[0];

  const [projects, setProjects] = useState<Project[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [proposals, setProposals] = useState<PublicProposal[]>([]);

  useEffect(() => {
    setWardBySlug(ward.slug);
    ProjectsService.getAll({ ward: ward.slug }).then(res => setProjects(res));
    OpportunitiesService.getAll({ ward: ward.slug }).then(res => setOpportunities(res));
    BusinessesService.getAll({ ward: ward.slug }).then(res => setBusinesses(res));
    SchoolsService.getAll({ ward: ward.slug }).then(res => setSchools(res));
    EventsService.getAll({ ward: ward.slug }).then(res => setEvents(res));
    CivicService.getProposals(ward.slug).then(res => setProposals(res));
  }, [ward.slug, setWardBySlug]);

  return (
    <div className="space-y-10 pb-16">

      {/* Ward Header Hero */}
      <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            <Link href="/wards" className="hover:underline">Lugari Wards</Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>{ward.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-emerald-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>Sub-County HQ: {ward.headquarters}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{ward.name}</h1>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">{ward.description}</p>
            </div>

            {/* Ward Representative Box */}
            <div className="bg-emerald-900/80 border border-emerald-700 p-4 rounded-xl space-y-2 text-xs max-w-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">County Assembly Representative</span>
              <p className="font-extrabold text-white text-sm">{ward.representativeName}</p>
              <p className="text-emerald-200">{ward.representativeTitle}</p>
              {ward.representativeContact && (
                <div className="pt-2 border-t border-emerald-800 flex items-center justify-between text-amber-300">
                  <span>Public Office Contact:</span>
                  <a href={`tel:${ward.representativeContact}`} className="font-bold hover:underline flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> {ward.representativeContact}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Ward Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-800/80 text-xs">
            <div>
              <span className="text-emerald-300 text-[10px] uppercase font-bold block">Population</span>
              <span className="text-lg font-black text-amber-400">{ward.population.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-emerald-300 text-[10px] uppercase font-bold block">Land Area</span>
              <span className="text-lg font-black text-amber-400">{ward.areaKm2} sq km</span>
            </div>
            <div>
              <span className="text-emerald-300 text-[10px] uppercase font-bold block">Active Projects</span>
              <span className="text-lg font-black text-amber-400">{projects.length}</span>
            </div>
            <div>
              <span className="text-emerald-300 text-[10px] uppercase font-bold block">Verified Businesses</span>
              <span className="text-lg font-black text-amber-400">{businesses.length}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Ward Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Projects Section in Ward */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Development Projects in {ward.name}
            </h2>
            <Link href={`/projects?ward=${ward.slug}`} className="text-xs font-semibold text-emerald-600 hover:underline">
              View All Projects →
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 border border-border rounded-xl text-center text-xs text-muted-foreground">
              No projects registered yet for {ward.name}.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-emerald-600">{p.category}</span>
                    <TrustBadge type="Verified Source" size="sm" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground hover:text-emerald-600">
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span>{p.status}</span>
                      <span>{p.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: `${p.progressPercentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Opportunities in Ward */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Jobs & Opportunities in {ward.name}
            </h2>
            <Link href={`/opportunities?ward=${ward.slug}`} className="text-xs font-semibold text-emerald-600 hover:underline">
              View All Opportunities →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map(o => (
              <div key={o.id} className="bg-card border border-border rounded-xl p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {o.category}
                </span>
                <h3 className="font-bold text-sm text-foreground">
                  <Link href={`/opportunities/${o.slug}`}>{o.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground">{o.organizationName}</p>
                <div className="pt-2 text-[11px] text-emerald-600 font-semibold flex justify-between">
                  <span>Deadline: {o.deadline}</span>
                  <span>{o.salaryOrValue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Businesses in Ward */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" /> Verified Businesses in {ward.name}
            </h2>
            <Link href={`/businesses?ward=${ward.slug}`} className="text-xs font-semibold text-emerald-600 hover:underline">
              View Business Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businesses.map(b => (
              <div key={b.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-foreground">{b.name}</h3>
                  <TrustBadge type="Verified Source" size="sm" />
                </div>
                <p className="text-xs text-muted-foreground">{b.shortDescription}</p>
                <div className="pt-2 border-t border-border flex justify-between text-[11px]">
                  <span>Phone: {b.phone}</span>
                  <span className="font-semibold text-emerald-600">{b.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
