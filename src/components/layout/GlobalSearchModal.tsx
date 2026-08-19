'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchService } from '@/services';
import { useAppState } from '@/context/AppStateContext';
import { Search, X, Briefcase, Building2, BookOpen, Calendar, FileText, ArrowRight } from 'lucide-react';
import { Project, Opportunity, Business, School, Event, Article } from '@/types';

export function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useAppState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    projects: Project[];
    opportunities: Opportunity[];
    businesses: Business[];
    schools: School[];
    events: Event[];
    articles: Article[];
  }>({
    projects: [],
    opportunities: [],
    businesses: [],
    schools: [],
    events: [],
    articles: [],
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      SearchService.searchAll(query).then(res => setResults(res));
    } else {
      setResults({ projects: [], opportunities: [], businesses: [], schools: [], events: [], articles: [] });
    }
  }, [query]);

  if (!isSearchOpen) return null;

  const totalCount =
    results.projects.length +
    results.opportunities.length +
    results.businesses.length +
    results.schools.length +
    results.events.length +
    results.articles.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="p-4 border-b border-border flex items-center gap-3 bg-muted/30">
          <Search className="w-5 h-5 text-emerald-600" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search bursaries, teachers, Mautuma transformer, roads, agrovet..."
            className="flex-1 bg-transparent border-none text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Suggestions if empty */}
        {query.trim().length <= 1 && (
          <div className="p-6 text-xs text-muted-foreground space-y-4 overflow-y-auto">
            <p className="font-bold text-foreground uppercase tracking-wider text-[11px]">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['bursary', 'teacher jobs', 'Mautuma transformer', 'dairy heifer', 'Lumakanda school', 'road project'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-1 rounded-full bg-muted hover:bg-accent border border-border text-foreground transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        {query.trim().length > 1 && (
          <div className="p-4 overflow-y-auto space-y-6 flex-1 text-xs">
            {totalCount === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <p className="text-sm font-semibold">No results found for &quot;{query}&quot;</p>
                <p className="text-xs mt-1">Try searching for broader terms like &quot;jobs&quot;, &quot;water&quot;, or ward names.</p>
              </div>
            ) : (
              <>
                {/* Opportunities / Jobs */}
                {results.opportunities.length > 0 && (
                  <div>
                    <h4 className="font-bold text-muted-foreground uppercase text-[10px] mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Opportunities & Jobs ({results.opportunities.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.opportunities.map(o => (
                        <Link
                          key={o.id}
                          href={`/opportunities/${o.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-2 rounded-lg hover:bg-accent border border-border/50 transition"
                        >
                          <div className="font-semibold text-foreground">{o.title}</div>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                            <span>{o.organizationName}</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-medium">Deadline: {o.deadline}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {results.projects.length > 0 && (
                  <div>
                    <h4 className="font-bold text-muted-foreground uppercase text-[10px] mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" /> Development Projects ({results.projects.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.projects.map(p => (
                        <Link
                          key={p.id}
                          href={`/projects/${p.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-2 rounded-lg hover:bg-accent border border-border/50 transition"
                        >
                          <div className="font-semibold text-foreground">{p.title}</div>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                            <span className="capitalize">{p.wardSlug} Ward</span>
                            <span>•</span>
                            <span className="font-bold text-emerald-700">{p.status} ({p.progressPercentage}%)</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Businesses */}
                {results.businesses.length > 0 && (
                  <div>
                    <h4 className="font-bold text-muted-foreground uppercase text-[10px] mb-2 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Local Businesses ({results.businesses.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.businesses.map(b => (
                        <Link
                          key={b.id}
                          href={`/businesses/${b.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-2 rounded-lg hover:bg-accent border border-border/50 transition"
                        >
                          <div className="font-semibold text-foreground">{b.name}</div>
                          <div className="text-[11px] text-muted-foreground">{b.shortDescription}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schools */}
                {results.schools.length > 0 && (
                  <div>
                    <h4 className="font-bold text-muted-foreground uppercase text-[10px] mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Schools ({results.schools.length})
                    </h4>
                    <div className="space-y-1.5">
                      {results.schools.map(s => (
                        <Link
                          key={s.id}
                          href={`/schools/${s.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-2 rounded-lg hover:bg-accent border border-border/50 transition"
                        >
                          <div className="font-semibold text-foreground">{s.name}</div>
                          <div className="text-[11px] text-muted-foreground">{s.level} • {s.type}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer Link */}
        <div className="p-3 border-t border-border bg-muted/20 text-center text-xs">
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => setIsSearchOpen(false)}
            className="text-emerald-600 hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>View detailed search results page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
