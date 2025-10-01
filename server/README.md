# Cosmic Meatball Portal - Backend API

Express.js backend server that handles form submissions from the hacker-themed portal and stores them in Supabase.

## Prerequisites

- Node.js 18+
- npm 9+
- A Supabase project with a `lead_submissions` table

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`:
   ```bash
   SUPABASE_URL=your-project-url
   SUPABASE_ANON_KEY=your-anon-key
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

## Supabase Table Schema

Run this SQL in your Supabase SQL editor to create the required table:

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

### Row Level Security (Optional but Recommended)

Enable RLS and allow inserts from the anon role:

```sql
alter table public.lead_submissions enable row level security;

create policy "Allow inserts from authenticated clients"
  on public.lead_submissions
  for insert
  to anon
  with check (true);
```

## Installation

Install dependencies:

```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3001).

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and timestamp.

**Response:**
```json
{
  "status": "online",
  "timestamp": "2025-10-01T12:00:00.000Z"
}
```

### Submit Form
```
POST /api/submit
```

**Request Body:**
```json
{
  "name": "Agent Nova",
  "email": "agent@signal.com",
  "referral": "Friend recommendation"
}
```

**Success Response (200):**
```json
{
  "message": "Access credentials received",
  "success": true
}
```

**Error Responses:**

- `400` - Invalid email or missing required fields
- `409` - Email already registered
- `500` - Server error

## Features

- ✅ Email validation with regex
- ✅ Duplicate email detection
- ✅ CORS enabled for frontend
- ✅ Error handling and logging
- ✅ Input sanitization (trimming, lowercasing emails)

## Tech Stack

- **Express.js** - Web framework
- **@supabase/supabase-js** - Supabase client
- **cors** - CORS middleware
- **dotenv** - Environment variables

## Project Structure

```
backend/
├── api/
│   └── submit.js         # Form submission handler
├── lib/
│   └── supabaseClient.js # Supabase configuration
├── server.js             # Express server setup
├── package.json
├── .env.example
├── .gitignore
└── README.md
```
