'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectsService } from '@/services';
import { useAppState } from '@/context/AppStateContext';
import {
  BarChart3, PieChart as PieChartIcon, TrendingUp, DollarSign,
  FileText, ArrowLeft, Filter, CheckCircle2
} from 'lucide-react';
import { Project } from '@/types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function ProjectLedgerPage() {
  const { tenant } = useAppState();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    ProjectsService.getAll().then(res => setProjects(res));
  }, []);

  // Compute Analytics Data
  const totalBudget = projects.reduce((acc, p) => acc + p.budgetKsh, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.amountSpentKsh, 0);
  const executionRate = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : '0';

  // Ward breakdown
  const wardChartData = tenant.wards.map(w => {
    const wardProjects = projects.filter(p => p.wardSlug === w.slug);
    const budget = wardProjects.reduce((acc, p) => acc + p.budgetKsh, 0);
    return { name: w.name.replace(' Ward', ''), count: wardProjects.length, budgetKsh: budget / 1000000 };
  });

  // Status breakdown
  const statusCounts: Record<string, number> = {};
  projects.forEach(p => {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  });
  const statusPieData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  const COLORS = ['#059669', '#d97706', '#2563eb', '#9333ea', '#dc2626'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link href="/projects" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects List</span>
          </Link>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Lugari Development Project Ledger</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Aggregated financial, allocation, and status data across all wards in Lugari Constituency.
          </p>
        </div>
      </div>

      {/* Summary KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Projects Monitored</span>
          <div className="text-2xl font-black text-foreground">{projects.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Across 6 Wards</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Approved Allocation</span>
          <div className="text-2xl font-black text-foreground">KSh {(totalBudget / 1000000).toFixed(1)}M</div>
          <span className="text-[10px] text-muted-foreground">FY 2024/2025</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Total Disbursed & Spent</span>
          <div className="text-2xl font-black text-emerald-600">KSh {(totalSpent / 1000000).toFixed(1)}M</div>
          <span className="text-[10px] text-emerald-600 font-semibold">{executionRate}% Executed</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase">Completed Projects</span>
          <div className="text-2xl font-black text-emerald-700">
            {projects.filter(p => p.status === 'Completed').length}
          </div>
          <span className="text-[10px] text-muted-foreground">Commissioned & Active</span>
        </div>
      </div>

      {/* Recharts Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Chart 1: Budget Allocation by Ward */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" /> Budget Allocation by Ward (Millions KSh)
            </h3>
            <p className="text-xs text-muted-foreground">Distribution of total development budget per ward.</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardChartData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip formatter={(value: any) => [`KSh ${value}M`, 'Budget']} />
                <Bar dataKey="budgetKsh" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Project Status Distribution */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-600" /> Project Status Breakdown
            </h3>
            <p className="text-xs text-muted-foreground">Proportion of projects by current completion stage.</p>
          </div>

          <div className="h-64 w-full pt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value})`}
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Tabular Data Ledger */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-base text-foreground">Detailed Ledger Table</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 text-muted-foreground font-bold uppercase tracking-wider border-b border-border">
              <tr>
                <th className="p-3">Project ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Ward</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Budget (KSh)</th>
                <th className="p-3 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-accent/50 transition">
                  <td className="p-3 font-mono font-bold text-foreground">{p.projectId}</td>
                  <td className="p-3 font-semibold text-foreground">
                    <Link href={`/projects/${p.slug}`} className="hover:text-emerald-600 underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="p-3 capitalize">{p.wardSlug}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 font-bold text-emerald-700">{p.status}</td>
                  <td className="p-3 text-right font-mono">{p.budgetKsh.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-emerald-600">{p.progressPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
