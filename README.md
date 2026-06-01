# 🚀 ComradeHustle

A campus-based earning and trading platform for university students in Kenya.

## Features

### 1. Jobs & Gigs System
- Freelance services marketplace (tutoring, assignments, coding, design, photography, etc.)
- M-Pesa escrow payment system
- Job activation only after payment deposit
- Real-time notifications
- Status tracking: OPEN → ACTIVE → IN_PROGRESS → COMPLETED

### 2. Marketplace System  
- Buy and sell physical products (food, clothes, phones, laptops, accessories)
- Add to cart functionality
- Order tracking with status updates
- Seller dashboard with earnings
- Built-in dispute system & buyer protection

### 3. Discover Feed
- Unified feed combining jobs and products
- Infinite scroll with smart ranking
- Campus-based filtering
- AI recommendations
- Trending section

## Architecture

**3 Independent Modules:**
- **Jobs/Gigs** - Services only (separate database tables & UI)
- **Marketplace** - Physical goods only (separate database tables & UI)
- **Discover** - Unified feed merging both

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend/Auth**: Supabase
- **State Management**: Zustand
- **Real-time**: Supabase Realtime with WebSockets

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- M-Pesa sandbox account

### Installation

```bash
npm install
cp .env.example .env.local
```

Add your Supabase and M-Pesa credentials to `.env.local`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages
│   ├── (dashboard)/              # Protected routes
│   ├── discover/                 # Discover feed
│   ├── jobs/                     # Jobs module
│   ├── marketplace/              # Marketplace module
│   └── layout.tsx
├── components/
│   ├── auth/                     # Auth components
│   ├── jobs/                     # Job-specific components
│   ├── marketplace/              # Marketplace components
│   ├── discover/                 # Discover feed components
│   ├── common/                   # Shared UI components
│   └── layout/                   # Layout components
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── types.ts                  # TypeScript types
│   ├── constants.ts              # App constants
│   └── utils.ts                  # Utility functions
├── store/                        # Zustand stores
│   ├── authStore.ts
│   ├── jobsStore.ts
│   ├── marketplaceStore.ts
│   ├── cartStore.ts
│   └── walletStore.ts
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useJobs.ts
│   ├── useMarketplace.ts
│   └── useWallet.ts
└── styles/
    └── globals.css
```

## Campus Support

- University of Nairobi (UoN)
- Kenyatta University (KU)
- Maseno University
- Moi University
- Extending to more campuses...

## Security

- Supabase Auth with email/password
- M-Pesa escrow system for all transactions
- Seller verification & scam detection
- Buyer protection & dispute resolution
- Row-level security (RLS) on database

## License

MIT