# Email Scheduler Application

A production-grade email scheduling system with React frontend and Express backend.

## Features

- 📧 Schedule emails with precise timing
- 🔐 Google OAuth authentication  
- 📊 Dashboard with email status tracking
- ⚡ Built with Next.js, Express, and Prisma
- 🎯 Optional Redis queue support (works without it!)
- 💾 SQLite database (no PostgreSQL needed for development)

## Quick Start (Windows)

### Prerequisites

- Node.js (v18 or higher)
- npm

### Option 1: Automated Setup (Recommended)

Just double-click `start-dev.bat` in the project root! This will:
- Automatically set up the database (first time only)
- Start both backend and frontend servers
- Open in separate command windows

### Option 2: Manual Setup

1. **Setup Backend**
   ```powershell
   cd backend
   npm install
   npm run setup-db
   npm run dev
   ```

2. **Setup Frontend** (in a new terminal)
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Demo Mode

Click "Enter Demo Mode" on the login page to try the app without Google OAuth setup.

## Optional: Redis Setup

The app works without Redis (emails send immediately). To enable queueing:

1. Install and start Redis
2. Update `backend/.env`:
   ```
   REDIS_URL="redis://localhost:6379"
   ```

## Optional: Google OAuth

To enable Google login:

1. Create OAuth credentials at https://console.cloud.google.com
2. Update `backend/.env`:
   ```
   GOOGLE_CLIENT_ID="your_client_id"
   GOOGLE_CLIENT_SECRET="your_client_secret"
   ```

## Optional: Real Email Sending

Get free test email credentials from https://ethereal.email and update `backend/.env`:
```
SMTP_USER="your_ethereal_user"
SMTP_PASS="your_ethereal_pass"
```

## Tech Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

**Backend:**
- Express
- Prisma (SQLite)
- TypeScript
- Optional: BullMQ + Redis

## Project Structure

```
Assignment/
├── backend/          # Express API server
│   ├── src/
│   │   ├── server.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── queue/
│   │   └── worker/
│   ├── prisma/
│   └── .env
├── frontend/         # Next.js application
│   └── src/
│       ├── app/
│       ├── components/
│       └── lib/
└── start-dev.bat     # Windows startup script
```

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- Database file: `backend/dev.db`
- Logs: Check the terminal windows

## Troubleshooting

**"Site can't be reached"**
- Make sure both backend and frontend are running
- Check if ports 3000 and 5000 are available

**Database errors**
- Delete `backend/dev.db` and run `npm run setup-db` in backend folder

**Redis errors**
- The app works without Redis - emails just send immediately
- Set `REDIS_URL=""` in backend/.env to disable Redis warnings
