export type WardSlug = 'mautuma' | 'lumakanda' | 'lugari' | 'chekalini' | 'chevaywa' | 'lwandeti';

export interface Ward {
  id: string;
  name: string;
  slug: WardSlug;
  population: number;
  areaKm2: number;
  headquarters: string;
  description: string;
  representativeName: string;
  representativeTitle: string;
  representativeContact?: string;
  coordinates: { lat: number; lng: number };
}

export interface TenantConfig {
  id: string;
  name: string;
  shortName: string;
  domain: string;
  county: string;
  country: string;
  logo: string;
  primaryColor: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    officeHours: string;
  };
  wards: Ward[];
  featureFlags: FeatureFlags;
}

export interface FeatureFlags {
  marketplace: boolean;
  ussd: boolean;
  liveStreaming: boolean;
  politicalAds: boolean;
  talentDirectory: boolean;
  agriculture: boolean;
  aiSummaries: boolean;
  bursaries: boolean;
}

export type UserRole = 'resident' | 'institution_staff' | 'institution_admin' | 'platform_admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  wardSlug?: WardSlug;
  organizationId?: string;
  avatarUrl?: string;
  preferredLanguage: 'en' | 'sw';
  dataSaverMode: boolean;
  isVerified: boolean;
}

export type VerificationStatus = 'verified' | 'unverified' | 'pending' | 'rejected' | 'corrected';

export type TrustBadgeType =
  | 'Verified Organization'
  | 'Verified Source'
  | 'Sponsored'
  | 'Community Report'
  | 'Under Review'
  | 'AI Generated'
  | 'Corrected'
  | 'Archived'
  | 'Official Institution';

export type ProjectStatus = 'Proposed' | 'Planned' | 'Procurement' | 'In Progress' | 'Completed' | 'Delayed' | 'Suspended';

export interface ProjectMilestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  mediaUrls?: string[];
}

export interface Project {
  id: string;
  projectId: string;
  title: string;
  slug: string;
  wardSlug: WardSlug;
  category: 'Education' | 'Infrastructure' | 'Health' | 'Water & Sanitation' | 'Agriculture' | 'Youth & Sports';
  status: ProjectStatus;
  progressPercentage: number;
  budgetKsh: number;
  amountSpentKsh: number;
  financialYear: string;
  implementingBody: string;
  fundingSource: 'NG-CDF' | 'County Government' | 'National Government' | 'Donor Partner' | 'Private/Community';
  startDate: string;
  expectedCompletionDate: string;
  summary: string;
  description: string;
  locationName: string;
  coordinates?: { lat: number; lng: number };
  beforePhotoUrl?: string;
  currentPhotoUrl?: string;
  milestones: ProjectMilestone[];
  updates: ProjectUpdate[];
  documents?: { name: string; url: string; size: string }[];
  sourceAttribution: string;
  lastUpdated: string;
  verificationStatus: VerificationStatus;
}

export type OpportunityCategory = 'jobs' | 'internships' | 'attachments' | 'scholarships' | 'bursaries' | 'tenders' | 'training' | 'grants';

export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  organizationName: string;
  organizationLogo?: string;
  organizationVerified: boolean;
  category: OpportunityCategory;
  wardSlug?: WardSlug;
  location: string;
  educationLevel?: string;
  salaryOrValue?: string;
  deadline: string;
  closingSoon?: boolean;
  description: string;
  eligibility: string[];
  requirements: string[];
  applicationInstructions: string;
  externalLink?: string;
  postedDate: string;
  source: string;
}

export interface School {
  id: string;
  name: string;
  slug: string;
  wardSlug: WardSlug;
  level: 'Primary' | 'Secondary' | 'TVET' | 'Special Needs' | 'ECDE';
  type: 'Public' | 'Private';
  gender: 'Co-ed' | 'Boys' | 'Girls';
  principalName: string;
  contactPhone: string;
  contactEmail?: string;
  facilities: string[];
  studentCount: number;
  teacherCount: number;
  academicPerformanceNote?: string;
  photoUrl: string;
  verified: boolean;
  address: string;
}

export type BusinessCategory = 'agrovets' | 'restaurants' | 'accommodation' | 'electronics' | 'hardware' | 'construction' | 'mechanics' | 'transport' | 'professional' | 'agriculture' | 'tailoring' | 'salons' | 'entertainment' | 'other';

export interface Business {
  id: string;
  name: string;
  slug: string;
  category: BusinessCategory;
  wardSlug: WardSlug;
  shortDescription: string;
  fullDescription: string;
  address: string;
  phone: string;
  whatsapp?: string;
  openingHours: string;
  verified: boolean;
  isClaimed: boolean;
  logoUrl?: string;
  photoUrls?: string[];
  services: string[];
  rating?: number;
  isSponsored?: boolean;
}

export type MarketplaceCategory = 'livestock' | 'property' | 'farm_produce' | 'equipment' | 'electronics' | 'furniture' | 'services' | 'vehicles';

export interface MarketplaceListing {
  id: string;
  title: string;
  slug: string;
  category: MarketplaceCategory;
  priceKsh: number;
  wardSlug: WardSlug;
  sellerName: string;
  sellerPhone: string;
  sellerVerified: boolean;
  postedDate: string;
  description: string;
  images: string[];
  condition?: 'New' | 'Like New' | 'Used' | 'Refurbished';
}

export type EventCategory = 'public_participation' | 'school' | 'sports' | 'community' | 'institutional' | 'business' | 'training' | 'youth';

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  wardSlug: WardSlug;
  venue: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  organizerName: string;
  organizerVerified: boolean;
  description: string;
  rsvpCount: number;
  livestreamUrl?: string;
  isPast?: boolean;
  resolutions?: string[];
}

export type ArticleCategory = 'community' | 'development' | 'education' | 'opportunity' | 'emergency' | 'institutional' | 'business';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  summary: string;
  content: string;
  authorName: string;
  authorRole: string;
  publishedDate: string;
  source: string;
  verificationStatus: VerificationStatus;
  imageUrl?: string;
  correctionsHistory?: { date: string; note: string }[];
}

export type IssueCategory = 'roads' | 'electricity' | 'water' | 'security' | 'health' | 'education' | 'environment' | 'public_infrastructure' | 'other';
export type CaseStatus = 'Received' | 'Under Review' | 'Verified' | 'Referred' | 'Action in Progress' | 'Resolved' | 'Closed' | 'Unable to Verify';

export interface CaseUpdate {
  id: string;
  timestamp: string;
  status: CaseStatus;
  note: string;
  updatedBy: string;
}

export interface CaseReport {
  id: string;
  referenceCode: string;
  category: IssueCategory;
  wardSlug: WardSlug;
  villageLocation: string;
  description: string;
  submittedAt: string;
  status: CaseStatus;
  isAnonymous: boolean;
  reporterPhone?: string;
  reporterName?: string;
  imageUrls?: string[];
  aiClassification?: {
    category: IssueCategory;
    confidence: number;
    suggestedPriority: 'High' | 'Medium' | 'Low';
    duplicateCluster?: string;
  };
  assignedTo?: string;
  updates: CaseUpdate[];
}

export interface PublicProposal {
  id: string;
  title: string;
  slug: string;
  wardSlug: WardSlug;
  category: string;
  proposerName: string;
  summary: string;
  supporterCount: number;
  commentsCount: number;
  status: 'Open for Feedback' | 'Under Review by NG-CDF' | 'Accepted for FY Planning' | 'Closed';
  createdDate: string;
}

export interface Commitment {
  id: string;
  title: string;
  institution: string;
  wardSlug: WardSlug;
  targetDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed' | 'Revised';
  evidence: string;
  lastUpdated: string;
}

export interface Alert {
  id: string;
  title: string;
  category: 'security' | 'weather' | 'road_closure' | 'power_outage' | 'water_outage' | 'fire' | 'health';
  severity: 'critical' | 'warning' | 'info';
  wardSlug?: WardSlug;
  message: string;
  issuedAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  audienceWardSlug?: WardSlug;
  interestCategory?: string;
  channels: ('SMS' | 'WhatsApp' | 'Email')[];
  messageContent: string;
  estimatedReach: number;
  estimatedCostKsh: number;
  status: 'Draft' | 'Awaiting Approval' | 'Approved' | 'Scheduled' | 'Sending' | 'Completed' | 'Rejected';
  createdAt: string;
  scheduledFor?: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  slug: string;
  profession: string;
  category: 'electrician' | 'plumber' | 'carpenter' | 'photographer' | 'developer' | 'designer' | 'tutor' | 'welder' | 'mechanic' | 'other';
  wardSlug: WardSlug;
  phone: string;
  whatsapp?: string;
  bio: string;
  skills: string[];
  portfolioUrls?: string[];
  verified: boolean;
  availability: 'Available' | 'Busy' | 'By Appointment';
}

export interface AgriculturePrice {
  id: string;
  item: string;
  unit: string;
  marketName: string;
  wardSlug: WardSlug;
  priceKsh: number;
  previousPriceKsh?: number;
  updatedDate: string;
  isStale: boolean;
  source: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: 'school' | 'health_facility' | 'religious' | 'ngo' | 'cbo' | 'government' | 'business' | 'youth_group';
  wardSlug: WardSlug;
  description: string;
  phone: string;
  email?: string;
  verified: boolean;
  logoUrl?: string;
  address: string;
}

export interface Advertisement {
  id: string;
  title: string;
  advertiserName: string;
  placement: 'homepage_banner' | 'sidebar' | 'ward_top' | 'marketplace_featured';
  imageUrl: string;
  targetUrl: string;
  targetWardSlug?: WardSlug;
  categoryInterest?: string;
  isApproved: boolean;
  impressionsCount: number;
  clicksCount: number;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  summary: string;
  ipAddress: string;
}
