'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ProjectsService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import {
  FileText, CheckCircle2, Clock, MapPin, Building2,
  DollarSign, AlertCircle, ArrowLeft, Download, Send, Sparkles
} from 'lucide-react';
import { Project } from '@/types';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'documents' | 'observation'>('overview');

  // Observation submission state
  const [observationText, setObservationText] = useState('');
  const [observationSubmitted, setObservationSubmitted] = useState(false);

  useEffect(() => {
    ProjectsService.getBySlug(slug).then(res => setProject(res));
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-bold text-muted-foreground">Loading project details...</p>
      </div>
    );
  }

  const handleObservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (observationText) {
      setObservationSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Back link */}
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Projects</span>
      </Link>

      {/* Flagship Header Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-muted text-foreground">
              {project.projectId}
            </span>
            <span className="text-xs font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
              {project.category}
            </span>
          </div>
          <TrustBadge type={project.verificationStatus === 'verified' ? 'Verified Source' : 'Under Review'} size="md" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Financial & Progress Dashboard Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border text-xs">
          <div className="bg-muted/40 p-3.5 rounded-xl border border-border">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">Approved Budget</span>
            <div className="text-lg font-black text-foreground mt-0.5">
              KSh {project.budgetKsh.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">FY {project.financialYear}</span>
          </div>

          <div className="bg-muted/40 p-3.5 rounded-xl border border-border">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">Amount Spent</span>
            <div className="text-lg font-black text-emerald-700 mt-0.5">
              KSh {project.amountSpentKsh.toLocaleString()}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {((project.amountSpentKsh / project.budgetKsh) * 100).toFixed(0)}% Executed
            </span>
          </div>

          <div className="bg-muted/40 p-3.5 rounded-xl border border-border">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">Project Status</span>
            <div className="text-lg font-black text-foreground mt-0.5">{project.status}</div>
            <span className="text-[10px] text-muted-foreground">Target: {project.expectedCompletionDate}</span>
          </div>

          <div className="bg-muted/40 p-3.5 rounded-xl border border-border">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">Progress Milestone</span>
            <div className="text-lg font-black text-emerald-600 mt-0.5">{project.progressPercentage}%</div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1">
              <div className="h-full bg-emerald-600" style={{ width: `${project.progressPercentage}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border flex gap-4 text-xs font-bold">
        {[
          { id: 'overview', label: 'Milestones & Overview' },
          { id: 'updates', label: `Chronological Updates (${project.updates.length})` },
          { id: 'documents', label: `Public Documents (${project.documents?.length || 0})` },
          { id: 'observation', label: 'Submit Citizen Observation' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition border-b-2 ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-600 font-extrabold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">

        {/* TAB 1: OVERVIEW & MILESTONES */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Project Milestones Schedule
              </h3>

              <div className="space-y-3">
                {project.milestones.map((m, idx) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                      m.completed ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          m.completed ? 'bg-emerald-600 text-white' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <p className={`font-semibold ${m.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {m.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">Target Date: {m.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${m.completed ? 'bg-emerald-200 text-emerald-800' : 'bg-muted text-muted-foreground'}`}>
                      {m.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="font-bold text-base text-foreground">Implementing Details</h3>

              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Location</span>
                  <p className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {project.locationName}
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Implementing Body</span>
                  <p className="font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" /> {project.implementingBody}
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Source Attribution</span>
                  <p className="font-semibold text-foreground mt-0.5">{project.sourceAttribution}</p>
                </div>

                <div className="pt-3 border-t border-border">
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Last Audit Inspection</span>
                  <p className="font-bold text-emerald-600 mt-0.5">{project.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UPDATES */}
        {activeTab === 'updates' && (
          <div className="space-y-4 max-w-3xl">
            {project.updates.map(u => (
              <div key={u.id} className="bg-card border border-border rounded-xl p-5 space-y-2 text-xs">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span className="font-bold text-emerald-600">{u.author}</span>
                  <span>{u.date}</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">{u.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{u.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="space-y-3 max-w-2xl">
            {project.documents?.map((doc, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-bold text-foreground">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">Size: {doc.size} • PDF Document</p>
                  </div>
                </div>
                <a href={doc.url} className="px-3 py-1.5 rounded bg-emerald-800 text-white font-bold flex items-center gap-1 hover:bg-emerald-900 transition">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: CITIZEN OBSERVATION FORM */}
        {activeTab === 'observation' && (
          <div className="max-w-2xl bg-card border border-border rounded-2xl p-6 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-base text-foreground">Submit Project Observation</h3>
              <p className="text-muted-foreground mt-1">
                Notice any discrepancy or delay on site? Submit a verified citizen observation directly to the NG-CDF monitoring team.
              </p>
            </div>

            {observationSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold">
                ✓ Observation received! Reference #OBS-{Math.floor(1000 + Math.random() * 9000)}. Passed to field monitors.
              </div>
            ) : (
              <form onSubmit={handleObservationSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Your Observation / Feedback</label>
                  <textarea
                    rows={4}
                    value={observationText}
                    onChange={e => setObservationText(e.target.value)}
                    placeholder="E.g., Roofing completed on 12th Feb, but solar wiring is yet to commence..."
                    className="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold flex items-center gap-2 hover:bg-emerald-900 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Observation</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
