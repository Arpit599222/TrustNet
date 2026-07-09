# TrustNet Custom Supabase Authentication Module

This document outlines the custom authentication structure linking the Express backend with Supabase PostgreSQL and React Client.

## Monorepo Layout

```
adventurous-darwin/
├── client/                   # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/       # Shared UI and Layout
│   │   ├── layout/           # DashboardLayout wrapper
│   │   ├── context/          # AuthContext managing user sessions
│   │   ├── services/         # Axios api client injecting JWT tokens
│   │   ├── routes/           # ProtectedRoute guards
│   │   └── pages/            # 8+ Lazy-loaded application pages
├── server/                   # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/           # Supabase client credentials initialization
│   │   ├── controllers/      # SignUp, LogIn, GetMe endpoints handlers
│   │   ├── middleware/       # authenticateToken JWT verification middleware
│   │   └── routes/           # Route specifications mounting controllers
│   ├── .env                  # Backend credentials config
```

## Backend Configuration (`server/.env`)

```ini
PORT=5000
SUPABASE_URL=https://xsasovhawldmnovhifvz.supabase.co
SUPABASE_ANON_KEY=sb_publishable_TjVXnKEV...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_zpIS1...
JWT_SECRET=sb_secret_zpIS1...
CLIENT_URL=http://localhost:5174
```

## Supabase PostgreSQL Table Setup

To support custom credentials storage, execute the following query inside the Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Endpoint Reference

| Method | Endpoint | Description | Headers |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Creates custom user account in PostgreSQL, hashes password, returns JWT. | None |
| `POST` | `/api/auth/login` | Validates credentials, verifies hash, records timestamp, returns JWT. | None |
| `GET` | `/api/auth/me` | Fetches active authenticated user details. | `Authorization: Bearer <token>` |
| `POST` | `/api/auth/logout` | Performs clean session logout callback. | `Authorization: Bearer <token>` |
