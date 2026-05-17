# PremiumStroe - Asphalt Paving & Road Construction

A complete, professional B2B service website for an asphalt paving and road construction company built with Next.js 16, TypeScript, and Tailwind CSS. Features a multi-step price calculator, portfolio showcase, materials store, online tracking, and full admin panel powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🧮 **Multi-Step Price Calculator** - Interactive calculator with work type selection, area slider (100-50,000 m²), and optional extras
- 🏗️ **Portfolio Showcase** - Filterable grid of completed projects with images, area, and category
- 📦 **Materials Logistics** - Store-like grid for crushed stone, sand, peat, soil with pricing
- 🚛 **Equipment Park** - Showcase of fleet units with specifications
- 💬 **Testimonials Carousel** - Detailed client reviews with ratings
- ❓ **FAQ Section** - Expandable/collapsible questions
- 📍 **Online Tracking** - Public page to track order status by ID
- 🔐 **Admin Panel** - Full CRUD for leads, projects, materials, and tracking
- ❄️ **24/7 & Winter Work Badge** - Clearly visible USPs
- 📱 **Fully Responsive** - Mobile-first design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a09a74fa6022ba88890731c&clone_repository=6a09a93ca6022ba88890733a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: "Create a complete, professional B2B service website for an asphalt paving & road construction company (exactly like premiumstroe.ru).

1. Core Business Model:

· Main Services: Asphalt paving, landscaping, excavation (pits), heavy machinery rental, material delivery.
· Additional Revenue: Sell/deliver materials (crushed stone, sand, peat, soil).
· Key Metrics: 12 years, 847 projects, 2.4M m² asphalt laid.
· USPs: Own machinery fleet, 3-year warranty, work at night & winter (down to -20°C), online tracking.

2. Frontend & User Interaction (Crucial Features):

· Advanced Multi-Step Calculator:
  · Step 1: Select Work Type (Asphalt, Paving, Excavation).
  · Step 2: Input Area (m²) via slider (100 – 50,000 m²).
  · Step 3: Optional extras (e.g., drainage, marking).
  · Output: Displays estimated price (e.g., "from 850,000 RUB") AND a button "Get exact quote" (opens form).
· Process Showcase: Visual timeline "From pit to perfect road" (3 steps with text).
· Equipment Park: Show fleet units with specs (e.g., 10-25 ton dump trucks).
· Materials Logistics: A store-like grid showing 5 materials (Name, Price per ton/m³, Image).
· Portfolio: Grid of completed projects with Image, Title, m², and filters.
· Testimonials: Carousel of 6 detailed reviews (Client name, position, project size, rating).
· FAQ Section: Expandable/collapsible questions.

3. Admin Panel (Full CRUD – Non-Negotiable):

· Secure /admin login (admin@premium.com / admin123).
· Dashboard: Statistics (projects, m², clients, revenue) – can be mock data.
· Lead Manager: Table of quote requests (Name, Phone, Area, Work Type, Status).
· Project Manager (Portfolio): Add/Edit/Delete portfolio items (Title, Image, Size, Category).
· Material Manager (Logistics): Add/Edit/Delete materials (Name, Price, Image).
· Price Manager: Update price per m² for each service type (affects calculator).
· Tracking Manager: Ability to update status of an active project (for online tracking feature).

4. Design & UX:

· Tech Stack: Next.js (App Router) + Tailwind CSS + TypeScript.
· Style: Industrial, trustworthy, data-heavy. Dark slate/charcoal background with orange/amber accents.
· Database: PostgreSQL (Vercel Postgres) or Supabase (free tier) for all dynamic content (leads, portfolio, materials, prices).
· Image Upload: Support local upload or Cloudinary (free) for portfolio/materials.
· Deployment: Must be deployable to Vercel without errors. Include a vercel.json if needed.

5. Bonus Features (from premiumstroe.ru):
· Online Tracking Demo: A public page where client enters order ID and sees status (e.g., Survey → Materials → Paving → Done).
· 24/7 & Winter Work Badge: Clearly visible on hero section.

Result: A fully functional, database-driven B2B website clone of premiumstroe.ru with working calculator, admin panel, and logistics section."»"

### Code Generation Prompt

> "Create a complete, professional B2B service website for an asphalt paving & road construction company (exactly like premiumstroe.ru)..."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic** - Headless CMS for content management
- **React 19** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies: `bun install`
3. Set up environment variables (see below)
4. Run development server: `bun dev`

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all projects with filters
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Create a new lead
await cosmic.objects.insertOne({
  type: 'leads',
  title: 'John Doe - Quote Request',
  metadata: {
    name: 'John Doe',
    phone: '+7 999 123-45-67',
    work_type: 'Asphalt Paving',
    area_m2: 500,
    status: 'New'
  }
})
```

## Cosmic CMS Integration

This app uses Cosmic CMS for all content management. The following object types are used:
- **Services** - Service offerings with pricing
- **Projects** - Portfolio items
- **Materials** - Materials for sale
- **Equipment** - Fleet equipment
- **Testimonials** - Client reviews
- **FAQs** - Frequently asked questions
- **Leads** - Quote requests
- **Tracking Orders** - Active project tracking

## Deployment Options

- **Vercel** (Recommended): Connect your Git repo and deploy
- **Netlify**: Deploy as Next.js app
- Add environment variables in your hosting platform's dashboard

<!-- README_END -->