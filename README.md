# Startpath

A single-player web app for young entrepreneurs (14-25) who want to start a business and feel stuck. Startpath combines motivation with real constraint and action, storing irreversible user progress that compounds over time.

## Core Principle

This is NOT a demo, NOT a landing page, and NOT a generic SaaS dashboard. The dashboard reflects real decisions and commitments made by the user. If the app disappeared, the user would still care about the data stored.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database with RLS)

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully set up

### 2. Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste into the SQL editor and click **Run**

This will create:
- All necessary tables (profiles, user_state, commitments, evidence, session_outcomes)
- Row Level Security (RLS) policies
- Automatic triggers for new user signup
- Performance indexes

### 3. Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
startpath/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/        # Login page
│   │   │   └── signup/       # Signup page
│   │   ├── dashboard/        # THE PRODUCT HOME
│   │   └── journey/          # Immersive decision flow
│   ├── components/
│   │   ├── auth/             # Auth components
│   │   ├── dashboard/        # Dashboard components
│   │   └── journey/          # Journey components (unused in current implementation)
│   ├── lib/
│   │   ├── supabase/         # Supabase clients
│   │   └── types.ts          # TypeScript types
│   └── middleware.ts         # Auth protection
└── supabase/
    └── migrations/           # Database schema
```

## User Flow

### First Time User

1. **Land on home page** → See "Log in" and "Sign up" buttons
2. **Sign up** → Create account with email/password
3. **Redirect to dashboard** → See "no direction yet" state
4. **Click "Begin journey"** → Enter immersive decision flow
5. **Journey steps:**
   - Intro: Motivational context
   - Choose: Pick ONE direction (E-commerce, Service, or Content)
   - Eliminate: Confirm permanent elimination of other paths
   - Action: Choose a concrete real-world action
   - Deadline: Set a deadline for the action
6. **Journey complete** → Redirect to dashboard
7. **Dashboard shows:**
   - Current direction
   - Eliminated directions
   - Active commitment with deadline countdown
   - Prompt to add evidence

### Returning User

1. **Log in** → Redirect to dashboard
2. **Dashboard reflects all state:**
   - Direction chosen
   - Paths ruled out
   - Active commitment
   - Evidence log
   - Recent changes
   - Next action

## Key Features

### Persistent State

Every user has:
- `current_direction` - The chosen business path
- `eliminated_directions` - Paths permanently ruled out
- `active_commitment` - Current action + deadline
- `evidence_log` - Observations (not thoughts)
- `session_outcomes` - What changed each visit

### Irreversible Decisions

- Eliminated directions cannot be undone
- Choices are permanent
- Forces real commitment

### Row Level Security (RLS)

- Users can only access their own data
- All queries are scoped to authenticated user
- No cross-user data leaks

## What This Is NOT

- No social features
- No communities
- No feeds
- No generic progress stats
- No "complete your profile"
- No templates
- No content libraries

## Development

### Build for Production

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Database Schema

### Tables

- **profiles** - User profile data
- **user_state** - Current direction and eliminated paths
- **commitments** - Action commitments with deadlines
- **evidence** - User observations and evidence
- **session_outcomes** - What changed each session

### RLS Policies

All tables have RLS enabled with policies ensuring users can only:
- View their own data
- Insert their own data
- Update their own data

### Automatic Triggers

- New user signup automatically creates profile and user_state
- `updated_at` timestamps are automatically maintained

## Success Criteria

1. User can sign up and log in ✓
2. Dashboard reflects actual user decisions ✓
3. Journey forces real choices that persist ✓
4. Eliminated directions are permanently recorded ✓
5. Active commitment is visible with deadline ✓
6. Evidence log stores observations ✓
7. Session outcomes track what changed ✓
8. All data persists across sessions ✓
9. RLS prevents cross-user data access ✓
10. No fake progress - every piece of data is real ✓

## License

Private project - All rights reserved
