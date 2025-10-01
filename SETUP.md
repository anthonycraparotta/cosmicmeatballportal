# Cosmic Meatball Portal - Complete Setup Guide

This guide will walk you through setting up both the frontend and backend for the Cosmic Meatball Portal.

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Supabase account and project

## 🗄️ Step 1: Set Up Supabase Database

1. Go to your Supabase project SQL editor
2. Run the following SQL to create the table:

```sql
create table if not exists public.lead_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  referral_source text,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists lead_submissions_email_idx
  on public.lead_submissions (email);
```

3. Enable Row Level Security (recommended):

```sql
alter table public.lead_submissions enable row level security;

create policy "Allow inserts from authenticated clients"
  on public.lead_submissions
  for insert
  to anon
  with check (true);
```

## 🔧 Step 2: Configure Environment Variables

Your Supabase credentials are already configured in:
- `backend/.env`
- `frontend/.env`

**Supabase Details:**
- Project URL: `https://wumihzhynenstttxgzpl.supabase.co`
- Database ID: `wumihzhynenstttxgzpl`

## 🚀 Step 3: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## ▶️ Step 4: Run the Application

You'll need two terminal windows:

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Server will start on http://localhost:3001

### Terminal 2 - Frontend Dev Server
```bash
cd frontend
npm run dev
```
Frontend will start on http://localhost:5173

## ✅ Step 5: Test the Application

1. Open http://localhost:5173 in your browser
2. You should see the cyberpunk hacker terminal
3. Fill in the form with:
   - Name: Any name
   - Email: A valid email address
   - Referral: Optional
4. Click "Initiate Access"
5. Watch the loading animation
6. See "ACCESS GRANTED" with glitch effect
7. Data will be saved to Supabase
8. You'll be redirected to the Robots Game demo

## 🔍 Verify Data in Supabase

1. Go to your Supabase project
2. Navigate to Table Editor
3. Open the `lead_submissions` table
4. You should see your submitted data

## 🌐 Production Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables in your hosting platform
2. Deploy the `backend` directory
3. Note your backend URL (e.g., `https://your-app.railway.app`)

### Frontend (Vercel/Netlify)
1. Set environment variable: `VITE_API_URL=https://your-backend-url.com`
2. Deploy the `frontend` directory

## 🐛 Troubleshooting

### CORS Errors
- Make sure backend is running on port 3001
- Check that `FRONTEND_URL` in `backend/.env` matches your frontend URL

### Database Errors
- Verify Supabase credentials in `backend/.env`
- Check that the table exists and RLS policies are set correctly

### Form Submission Fails
- Open browser DevTools Console to see error messages
- Check backend logs in the terminal
- Verify API_URL in frontend `.env` file

## 📁 Project Structure

```
Portal/
├── frontend/              # React + Vite frontend
│   ├── src/
│   ├── .env              # Frontend environment variables
│   └── package.json
├── backend/              # Express.js backend
│   ├── api/
│   ├── lib/
│   ├── .env              # Backend environment variables
│   └── package.json
└── SETUP.md              # This file
```

## 🎮 Ready to Go!

Your hacker-themed portal is now ready to capture leads and redirect users to the Robots Game demo!
