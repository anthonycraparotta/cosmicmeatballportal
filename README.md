# Cosmic Meatball Portal

A hacker-themed access console that captures user credentials and redirects to the Robots Game demo. Built with React + Vite frontend and Express.js + Supabase backend.

## 🚀 Quick Start

### 1. Set up Supabase database

See [SETUP.md](SETUP.md) for the SQL schema.

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Run both servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit **http://localhost:5173** to see the hacker terminal!

## 📖 Documentation

- [SETUP.md](SETUP.md) - Complete setup guide with Supabase configuration
- [frontend/README.md](frontend/README.md) - Frontend documentation
- [backend/README.md](backend/README.md) - Backend API documentation

## 🎯 Features

### Frontend
- Cyberpunk terminal UI with CRT scanline and glitch effects
- Custom validation for name and email inputs with themed error messages
- Loading animation and "ACCESS GRANTED" sequence with glitch animation
- Responsive layout for desktop and mobile
- Auto-redirect to Robots Game demo after successful submission

### Backend
- Express.js REST API
- Supabase PostgreSQL integration
- Email validation and duplicate detection
- CORS enabled for frontend
- Error handling and logging

## 🛠️ Tech Stack

**Frontend:**
- React 19.1.1
- Vite 7.1.7
- CSS with cyberpunk glitch effects

**Backend:**
- Express.js 4.18
- Supabase Client 2.39
- Node.js 18+

## 📁 Project Structure

```
Portal/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx       # Main component
│   │   ├── App.css       # Cyberpunk styling
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── .env              # Frontend config
│   └── package.json
├── backend/              # Express.js backend
│   ├── api/
│   │   └── submit.js     # Form submission handler
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── server.js         # Express server
│   ├── .env              # Backend config (with credentials)
│   └── package.json
├── SETUP.md              # Complete setup guide
└── README.md             # This file
```

## 🔒 Environment Variables

Environment files are already configured with Supabase credentials:
- `backend/.env` - Backend configuration
- `frontend/.env` - Frontend API URL

## 🎮 Usage

1. User enters name and email on the hacker terminal
2. Form validates with cyberpunk-styled error messages
3. On submit, data is sent to backend API
4. Backend stores data in Supabase
5. Loading animation plays
6. "ACCESS GRANTED" appears with glitch effect
7. User is redirected to Robots Game demo

## 🐛 Troubleshooting

See [SETUP.md](SETUP.md) for common issues and solutions.

## 📝 License

Private project for Cosmic Meatball Portal.
