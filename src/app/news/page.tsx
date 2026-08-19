'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArticlesService } from '@/services';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { FileText, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Article } from '@/types';

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    ArticlesService.getAll().then(res => setArticles(res));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="border-b border-border pb-6">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Official Gazette & Community News</span>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Lugari News & Announcements</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Verified updates from institutions, NG-CDF, sub-county administration, and community correspondents.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(article => (
          <div
            key={article.id}
            className="bg-card border border-border rounded-2xl p-6 hover:border-emerald-500 transition shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                  {article.category}
                </span>
                <TrustBadge type={article.verificationStatus === 'verified' ? 'Verified Source' : 'Community Report'} size="sm" />
              </div>

              <h2 className="font-extrabold text-lg text-foreground hover:text-emerald-600 transition leading-snug">
                <Link href={`/news/${article.slug}`}>{article.title}</Link>
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <div>
                <span className="font-bold text-foreground block">{article.authorName}</span>
                <span className="text-[10px]">{article.authorRole}</span>
              </div>

              <div className="text-right">
                <span className="font-bold text-emerald-600 block flex items-center gap-1 justify-end">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.publishedDate}</span>
                </span>
                <span className="text-[10px]">{article.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
