import {
  MOCK_PROJECTS, MOCK_OPPORTUNITIES, MOCK_SCHOOLS, MOCK_BUSINESSES,
  MOCK_MARKETPLACE, MOCK_EVENTS, MOCK_ARTICLES, MOCK_CASES,
  MOCK_PROPOSALS, MOCK_COMMITMENTS, MOCK_ALERTS, MOCK_TALENT,
  MOCK_AGRI_PRICES, MOCK_ORGANIZATIONS, MOCK_ADS, MOCK_AUDIT_LOGS
} from '@/data/mock';

import {
  Project, Opportunity, School, Business, MarketplaceListing,
  Event, Article, CaseReport, PublicProposal, Commitment,
  Alert, Campaign, TalentProfile, AgriculturePrice, Organization,
  Advertisement, AuditEvent, WardSlug, CaseStatus, IssueCategory
} from '@/types';

// Projects Service
export const ProjectsService = {
  async getAll(filters?: { ward?: WardSlug; category?: string; status?: string; search?: string }): Promise<Project[]> {
    let result = [...MOCK_PROJECTS];
    if (filters?.ward) result = result.filter(p => p.wardSlug === filters.ward);
    if (filters?.category) result = result.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
    if (filters?.status) result = result.filter(p => p.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.projectId.toLowerCase().includes(q));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<Project | null> {
    return MOCK_PROJECTS.find(p => p.slug === slug) || null;
  },

  async create(project: Partial<Project>): Promise<Project> {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      projectId: `LUG-CDF-2025-${Math.floor(10 + Math.random() * 90)}`,
      title: project.title || 'Untitled Project',
      slug: (project.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      wardSlug: project.wardSlug || 'mautuma',
      category: project.category || 'Infrastructure',
      status: project.status || 'Planned',
      progressPercentage: project.progressPercentage || 0,
      budgetKsh: project.budgetKsh || 0,
      amountSpentKsh: project.amountSpentKsh || 0,
      financialYear: project.financialYear || '2024/2025',
      implementingBody: project.implementingBody || 'NG-CDF Lugari',
      fundingSource: project.fundingSource || 'NG-CDF',
      startDate: project.startDate || new Date().toISOString().split('T')[0],
      expectedCompletionDate: project.expectedCompletionDate || '2025-12-31',
      summary: project.summary || '',
      description: project.description || '',
      locationName: project.locationName || 'Lugari',
      milestones: project.milestones || [],
      updates: project.updates || [],
      sourceAttribution: 'NG-CDF Secretariat',
      lastUpdated: new Date().toISOString().split('T')[0],
      verificationStatus: 'verified',
    };
    MOCK_PROJECTS.unshift(newProject);
    return newProject;
  }
};

// Opportunities Service
export const OpportunitiesService = {
  async getAll(filters?: { category?: string; ward?: WardSlug; search?: string }): Promise<Opportunity[]> {
    let result = [...MOCK_OPPORTUNITIES];
    if (filters?.category) result = result.filter(o => o.category === filters.category);
    if (filters?.ward) result = result.filter(o => !o.wardSlug || o.wardSlug === filters.ward);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(o => o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<Opportunity | null> {
    return MOCK_OPPORTUNITIES.find(o => o.slug === slug) || null;
  }
};

// Businesses Service
export const BusinessesService = {
  async getAll(filters?: { category?: string; ward?: WardSlug; search?: string; verifiedOnly?: boolean }): Promise<Business[]> {
    let result = [...MOCK_BUSINESSES];
    if (filters?.category) result = result.filter(b => b.category === filters.category);
    if (filters?.ward) result = result.filter(b => b.wardSlug === filters.ward);
    if (filters?.verifiedOnly) result = result.filter(b => b.verified);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(b => b.name.toLowerCase().includes(q) || b.shortDescription.toLowerCase().includes(q) || b.services.some(s => s.toLowerCase().includes(q)));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<Business | null> {
    return MOCK_BUSINESSES.find(b => b.slug === slug) || null;
  }
};

// Schools Service
export const SchoolsService = {
  async getAll(filters?: { ward?: WardSlug; level?: string; search?: string }): Promise<School[]> {
    let result = [...MOCK_SCHOOLS];
    if (filters?.ward) result = result.filter(s => s.wardSlug === filters.ward);
    if (filters?.level) result = result.filter(s => s.level === filters.level);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<School | null> {
    return MOCK_SCHOOLS.find(s => s.slug === slug) || null;
  }
};

// Cases / Reports Service
export const CasesService = {
  async getByReference(referenceCode: string): Promise<CaseReport | null> {
    return MOCK_CASES.find(c => c.referenceCode.toUpperCase() === referenceCode.toUpperCase()) || null;
  },

  async getAll(): Promise<CaseReport[]> {
    return [...MOCK_CASES];
  },

  async createReport(report: {
    category: IssueCategory;
    wardSlug: WardSlug;
    villageLocation: string;
    description: string;
    isAnonymous: boolean;
    reporterName?: string;
    reporterPhone?: string;
    imageUrls?: string[];
  }): Promise<CaseReport> {
    const refNum = Math.floor(10000 + Math.random() * 90000);
    const referenceCode = `LUG-${refNum}`;

    // Simulate AI Triage
    const aiCategory = report.category;
    const priorityMap: Record<IssueCategory, 'High' | 'Medium' | 'Low'> = {
      electricity: 'High',
      water: 'High',
      security: 'High',
      health: 'High',
      roads: 'Medium',
      education: 'Medium',
      environment: 'Low',
      public_infrastructure: 'Medium',
      other: 'Low'
    };

    const newCase: CaseReport = {
      id: `case-${Date.now()}`,
      referenceCode,
      category: report.category,
      wardSlug: report.wardSlug,
      villageLocation: report.villageLocation,
      description: report.description,
      submittedAt: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }) + ' EAT',
      status: 'Received',
      isAnonymous: report.isAnonymous,
      reporterName: report.reporterName,
      reporterPhone: report.reporterPhone ? report.reporterPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2') : undefined,
      imageUrls: report.imageUrls,
      aiClassification: {
        category: aiCategory,
        confidence: 0.89,
        suggestedPriority: priorityMap[report.category] || 'Medium',
        duplicateCluster: `Cluster-${report.category.toUpperCase()}-${report.wardSlug.toUpperCase()}`
      },
      updates: [
        {
          id: `cu-${Date.now()}`,
          timestamp: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
          status: 'Received',
          note: 'Case report registered in system.',
          updatedBy: 'Citizen Submission'
        }
      ]
    };

    MOCK_CASES.unshift(newCase);
    return newCase;
  },

  async updateStatus(id: string, status: CaseStatus, note: string, updatedBy: string): Promise<CaseReport | null> {
    const c = MOCK_CASES.find(item => item.id === id);
    if (!c) return null;
    c.status = status;
    c.updates.push({
      id: `cu-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
      status,
      note,
      updatedBy
    });
    return c;
  }
};

// Events Service
export const EventsService = {
  async getAll(filters?: { ward?: WardSlug; category?: string; search?: string }): Promise<Event[]> {
    let result = [...MOCK_EVENTS];
    if (filters?.ward) result = result.filter(e => e.wardSlug === filters.ward);
    if (filters?.category) result = result.filter(e => e.category === filters.category);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(e => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<Event | null> {
    return MOCK_EVENTS.find(e => e.slug === slug) || null;
  }
};

// Marketplace Service
export const MarketplaceService = {
  async getAll(filters?: { ward?: WardSlug; category?: string; search?: string }): Promise<MarketplaceListing[]> {
    let result = [...MOCK_MARKETPLACE];
    if (filters?.ward) result = result.filter(m => m.wardSlug === filters.ward);
    if (filters?.category) result = result.filter(m => m.category === filters.category);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<MarketplaceListing | null> {
    return MOCK_MARKETPLACE.find(m => m.slug === slug) || null;
  }
};

// Talent Service
export const TalentService = {
  async getAll(filters?: { ward?: WardSlug; category?: string; search?: string }): Promise<TalentProfile[]> {
    let result = [...MOCK_TALENT];
    if (filters?.ward) result = result.filter(t => t.wardSlug === filters.ward);
    if (filters?.category) result = result.filter(t => t.category === filters.category);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.profession.toLowerCase().includes(q) || t.skills.some(s => s.toLowerCase().includes(q)));
    }
    return result;
  },

  async getBySlug(slug: string): Promise<TalentProfile | null> {
    return MOCK_TALENT.find(t => t.slug === slug) || null;
  }
};

// Agriculture Service
export const AgricultureService = {
  async getMarketPrices(ward?: WardSlug): Promise<AgriculturePrice[]> {
    let result = [...MOCK_AGRI_PRICES];
    if (ward) result = result.filter(p => p.wardSlug === ward);
    return result;
  }
};

// Global Search Service
export const SearchService = {
  async searchAll(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return { projects: [], opportunities: [], businesses: [], schools: [], events: [], articles: [] };

    const projects = MOCK_PROJECTS.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.locationName.toLowerCase().includes(q));
    const opportunities = MOCK_OPPORTUNITIES.filter(o => o.title.toLowerCase().includes(q) || o.category.toLowerCase().includes(q) || o.organizationName.toLowerCase().includes(q));
    const businesses = MOCK_BUSINESSES.filter(b => b.name.toLowerCase().includes(q) || b.shortDescription.toLowerCase().includes(q) || b.services.some(s => s.toLowerCase().includes(q)));
    const schools = MOCK_SCHOOLS.filter(s => s.name.toLowerCase().includes(q) || s.level.toLowerCase().includes(q));
    const events = MOCK_EVENTS.filter(e => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q));
    const articles = MOCK_ARTICLES.filter(a => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q));

    return { projects, opportunities, businesses, schools, events, articles };
  }
};

// Articles Service
export const ArticlesService = {
  async getAll(category?: string): Promise<Article[]> {
    let result = [...MOCK_ARTICLES];
    if (category) result = result.filter(a => a.category === category);
    return result;
  },

  async getBySlug(slug: string): Promise<Article | null> {
    return MOCK_ARTICLES.find(a => a.slug === slug) || null;
  }
};

// Alerts Service
export const AlertsService = {
  async getActiveAlerts(ward?: WardSlug): Promise<Alert[]> {
    let result = MOCK_ALERTS.filter(a => a.isActive);
    if (ward) result = result.filter(a => !a.wardSlug || a.wardSlug === ward);
    return result;
  }
};

// Proposals & Commitments
export const CivicService = {
  async getProposals(ward?: WardSlug): Promise<PublicProposal[]> {
    let result = [...MOCK_PROPOSALS];
    if (ward) result = result.filter(p => p.wardSlug === ward);
    return result;
  },

  async getCommitments(ward?: WardSlug): Promise<Commitment[]> {
    let result = [...MOCK_COMMITMENTS];
    if (ward) result = result.filter(c => c.wardSlug === ward);
    return result;
  }
};

// Audit & Ads Service
export const AdminService = {
  async getAuditLogs(): Promise<AuditEvent[]> {
    return [...MOCK_AUDIT_LOGS];
  },
  async getAds(): Promise<Advertisement[]> {
    return [...MOCK_ADS];
  }
};
