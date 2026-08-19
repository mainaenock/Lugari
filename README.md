# Lugari Digital Infrastructure — Production Frontend

Primary domain: **lugari.ke**

Lugari Digital Infrastructure is an independent, permanent, hyperlocal digital infrastructure platform for Lugari Sub-County. It connects residents, wards, businesses, schools, development projects, bursaries, agriculture market prices, and civic communication channels (SMS/USSD/WhatsApp).

---

## Key Technical Features

1. **Multi-Tenancy**: Lugari is Tenant #1 of a multi-tenant platform architecture configured via `TenantConfig`.
2. **Political Neutrality**: Visual separation of verified institutional records, community reports, and sponsored listings.
3. **Data Saver Mode**: Low-bandwidth preference setting reducing imagery weights and animations for rural networks.
4. **Interactive USSD Simulator**: Feature phone simulation (`/access/ussd`) demonstrating offline citizen access.
5. **AI Weekly Brief & Case Triage**: Executive synthesis (`/portal/ai-brief`) and AI classification assistant (`/portal/cases`).
6. **Project Ledger**: Interactive data visualizations powered by Recharts (`/data/projects`).

---

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Validation**: React Hook Form & Zod

---

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build Verification
```bash
npm run build
```

---

## Demo Persona Accounts
Switch persona shortcuts via the header user button:
1. **Resident Demo**: Juma Omondi (Mautuma Ward)
2. **MP & Institution Demo**: Lugari NG-CDF Admin
3. **Platform Operator Admin**: Lugari Platform Operator
