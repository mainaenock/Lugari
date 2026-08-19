# Lugari Digital Infrastructure — Frontend Architecture

## Overview
The Lugari Digital Infrastructure frontend (`lugari.ke`) is built as a production-quality, mobile-first, multi-tenant digital hub for Lugari Sub-County. It connects residents, ward administration, schools, local businesses, project monitors, and institutions.

## Architecture Highlights
- **Framework**: Next.js 15 App Router with TypeScript (strict mode) and Tailwind CSS.
- **Multi-Tenancy**: Built around a central `TenantConfig` object (`src/config/tenant.ts`), making Lugari **Tenant #1** of a reusable multi-tenant SaaS architecture.
- **Service Abstraction**: UI components interact with mock services (`src/services/`) behind clean TypeScript interfaces, allowing seamless transition to Cloudflare Workers / D1 API endpoints.
- **Political Neutrality**: Visual separation between verified institutional sources, community reports, and sponsored listings.
- **Low-Bandwidth Mode**: Data Saver toggle reducing image weights and decorative animations for low-cost Android phones.
- **Inclusive Multichannel Distribution**: Embedded USSD simulation (`/access/ussd`), SMS previews, and WhatsApp sharing.

## Directory Structure
```
src/
  app/              # Next.js App Router routes (Public, Account, Portal, Admin)
  components/       # UI layout and design system components
  config/           # Tenant configuration (DEFAULT_TENANT)
  context/          # AppStateContext for Ward selection, Data Saver, and User personas
  data/             # Realistic mock data for Lugari
  services/         # Service layer abstractions (Projects, Cases, Businesses, etc.)
  types/            # Centralized TypeScript interfaces and status enums
```
