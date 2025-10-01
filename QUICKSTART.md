# 🚀 Quick Start - Cosmic Meatball Portal

Get up and running in 5 minutes!

## Step 1: Set Up Database (2 minutes)

1. Open your Supabase project at https://app.supabase.com
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** ✅

## Step 2: Install Dependencies (1 minute)

Open two terminal windows and run:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

## Step 3: Start Servers (30 seconds)

**Terminal 1 - Backend:**
```bash
npm run dev
```
✅ Backend running on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Frontend running on http://localhost:5173

## Step 4: Test It! (30 seconds)

1. Open http://localhost:5173
2. Fill in the hacker terminal form
3. Submit and watch the glitch animation
4. Check Supabase to see your data!

---

## 🎯 What You Should See

### Frontend
- Cyberpunk terminal with neon cyan/teal colors
- CRT scanline overlay
- Animated noise texture
- Three form fields (Name, Email, Referral)

### On Submit
1. Loading animation (3 pulsing blocks)
2. "ACCESS GRANTED" with glitch effect
3. Redirect to Robots Game demo

### In Supabase
- Your submission in the `lead_submissions` table
- All fields populated (name, email, referral_source, created_at)

---

## ❌ Troubleshooting

**Can't connect to backend?**
- Make sure backend is running on port 3001
- Check `backend/.env` has Supabase credentials

**Form won't submit?**
- Open browser DevTools (F12) → Console tab
- Look for error messages
- Verify backend logs in terminal

**CORS error?**
- Backend must be running
- Check `FRONTEND_URL` in `backend/.env` = `http://localhost:5173`

**Database error?**
- Make sure you ran the SQL schema
- Check RLS policies are enabled
- Verify credentials in `backend/.env`

---

## 📊 Check Your Data

1. Go to https://app.supabase.com
2. Select your project
3. Click **Table Editor** → `lead_submissions`
4. See your submissions! 🎉

---

## 🎮 Next Steps

- Deploy backend to Railway/Render/Heroku
- Deploy frontend to Vercel/Netlify
- Update environment variables for production URLs
- Test the full flow end-to-end

Enjoy your hacker portal! 🚀⚡
