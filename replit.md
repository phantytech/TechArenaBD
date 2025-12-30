# TechArena - Bangladesh Tech Events Platform

## Project Overview
TechArena is a premium tech events discovery platform specifically designed for Bangladesh. The platform connects event organizers with participants through a modern, professional UI/UX interface.

**Slogan:** "For the Organizers, For the Participants"
**Branding:** 2026@TechArena

## Architecture
- **Frontend:** React + TypeScript + Vite (Port 5000)
- **Backend:** Express.js (Port 5001)
- **Database:** PostgreSQL with Drizzle ORM
- **UI Framework:** shadcn/ui + Tailwind CSS

## Key Features Completed
✅ Homepage with Bangladesh-focused messaging
✅ Blue spinning EXPLORE badge with white text
✅ Bilingual support (Bengali + English)
✅ Premium About page with mission & impact metrics
✅ Responsive navbar with DISCOVER and ABOUT links
✅ Professional footer with 2026@TechArena branding
✅ Event discovery page with API integration
✅ Database schema (users, events, registrations)

## Pages Built
1. **Discover** (`/`) - Homepage with event discovery
2. **About** (`/about`) - Mission, values, impact metrics
3. **Event Detail** (`/event/:id`) - Individual event page
4. **Auth** (`/auth`) - Authentication page
5. **Create Event** (`/create-event`) - Event submission
6. **My Events** (`/my-events`) - User's registered events
7. **Admin** (`/admin`) - Admin dashboard

## Design Details
- **Color Scheme:** Primary blue (#1e40af), secondary backgrounds
- **Typography:** Modern sans-serif, clear hierarchy
- **Bangladesh Focus:** Bengali (বাংলা) text integrated throughout
- **Premium Feel:** Gradient accents, smooth animations, professional spacing

## Content
- **Hero Text:** "Discover সেরা Tech events in Bangladesh"
- **Subtitle:** "For the Organizers • For the Participants"
- **Bengali Description:** আপনার পরবর্তী হ্যাকাথন, প্রতিযোগিতা বা কর্মশালা খুঁজে পান। উদ্ভাবক এবং প্রযুক্তি উৎসাহীদের একটি প্রাণবন্ত সম্প্রদায়ের সাথে যোগ দিন।
- **Footer:** © 2026 TechArena • Bangladesh

## Database Schema
```
Users Table
├── id (UUID)
├── email (unique)
├── name
└── role

Events Table
├── id (UUID)
├── title
├── description
├── date/time
├── location/address
├── creator_id (FK to Users)
└── category

Event Registrations Table
├── id
├── event_id (FK)
└── user_id (FK)
```

## Running the Project
```bash
npm run dev           # Runs frontend + backend together
npm run db:push      # Create database tables
npm run db:generate  # Generate migrations
```

## API Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `POST /api/events` - Create event
- `PATCH /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/register` - Register user
- `DELETE /api/events/:id/register` - Unregister user

## User Preferences
- **Work Style:** Incremental, Fast mode (no agent/autonomous mode)
- **Design Approach:** Professional, premium UI/UX designer perspective
- **Language:** English primary, with Bengali integration
- **Target Audience:** Bangladesh tech community (organizers + participants)

## Next Steps (Priority Order)
1. **Database Setup** - Run `npm run db:push` to create tables
2. **Authentication** - Implement JWT + password hashing
3. **Event Management** - Connect forms to API
4. **Event Registration** - User registration system
5. **Admin Features** - Moderation dashboard
6. **Deploy** - Production deployment

## Recent Changes (This Session)
- Changed EXPLORE badge text to WHITE
- Added "সেরা Tech" Bengali text to hero
- Integrated slogan "For the Organizers, For the Participants"
- Created premium About page
- Updated footer with "2026@TechArena • Bangladesh"
- Added About link to navbar
- Enhanced Bangladesh-friendly messaging throughout

## File Structure
```
src/
├── pages/
│   ├── Index.tsx (Event detail)
│   ├── Discover.tsx (Homepage)
│   ├── About.tsx (About page - NEW)
│   ├── Auth.tsx
│   ├── CreateEvent.tsx
│   ├── EditEvent.tsx
│   ├── MyEvents.tsx
│   └── Admin.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── RotatingBadge.tsx (Blue EXPLORE button)
│   ├── EventsCarousel.tsx
│   └── SEOHead.tsx
├── App.tsx
└── lib/queryClient.ts

server/
├── index.ts (Express server)
├── routes.ts (API endpoints)
├── db.ts (Database connection)
└── storage.ts (Data interface)

shared/
└── schema.ts (Zod + Drizzle schemas)
```

## Styling & Colors
- **Primary Blue:** Used for buttons, badges, accent text
- **Secondary Backgrounds:** Subtle elevated surfaces
- **Text Colors:** Three-level hierarchy (default, secondary, tertiary)
- **Animations:** Smooth fade-ins, rotating badges
- **Responsive:** Mobile-first design, scales to desktop

## Status: READY FOR TESTING
Website is fully functional and displayable. Waiting for:
- Database table creation
- Authentication system setup
- Real event data integration

All UI/UX changes complete and deployed.
