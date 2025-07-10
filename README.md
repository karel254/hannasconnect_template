# Hanna's Connect

A modern dating and social connection platform built with Next.js and TypeScript.

## Features

- User authentication and profile setup
- Smart matching algorithm and suggestions
- Real-time messaging (chat) with sticky header and input
- Connection requests: accept, reject, cancel, block, and unfriend
- Only connected users can chat with each other
- Requests, connections, and blocked user management
- Mobile-responsive design with bottom navigation
- Dark/light theme support
- Blog, success stories, and more

## How It Works

1. **Landing Page**: Users are greeted with a welcoming hero section and can log in or sign up.
2. **Registration**: New users complete a multi-step registration form, including profile, health, lifestyle, and dating info.
3. **Dashboard**: After login, users see stats, suggestions, and quick links to browse, requests, messages, and profile.
4. **Requests**: Users can view, accept, or reject incoming connection requests. Accepted requests allow messaging.
5. **Connections**: Manage your connections, unfriend, or block users. Only connected users can chat.
6. **Blocked**: View and unblock users you've blocked.
7. **Chat**: Real-time messaging with sticky header (shows avatar and online status) and sticky input. Chat autoscrolls to latest message.
8. **Profile & Settings**: Edit your profile, change avatar, manage privacy, notifications, and connections.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## Project Structure

```
app/
  page.tsx                # Landing page
  dashboard/              # User dashboard
  register/               # Registration flow
  login/                  # Login page
  profile/                # User profile and settings
  messages/               # Chat and messaging
  requests/               # Connection requests
  connections/            # Manage connections
  blocked/                # Blocked users management
  browse/                 # Browse/search members
  notifications/          # Notifications
  blog/                   # Blog section
  success-stories/        # Success stories
  ...
components/
  mobile-bottom-navigation.tsx  # Mobile nav bar
  theme-provider.tsx            # Theme context
  ui/                          # Reusable UI components (Button, Card, Avatar, etc)
hooks/
  use-toast.ts                 # Toast notification hook
lib/
  utils.ts                     # Utility functions
contexts/
  ...                          # React contexts
public/
  images/                      # Avatars, hero images, etc
styles/
  ...                          # Tailwind and global styles
```

## Avatars
All avatars are in `public/images/` and referenced as `/images/male1.jpg`, `/images/female1.jpg`, etc.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

# Backend Migration & Integration Guide

## Overview
This frontend currently uses mock data, localStorage, and in-memory state for all user profiles, connection requests, and authentication. The following guide is for the backend developer (Rust) to migrate these placeholders to real backend endpoints, authentication, and websocket integration **without changing any UI/UX**.

---

## Migration Checklist

### 1. User Profiles & Listings
- **Current:** Hardcoded in `baseUsers` (browse), `suggestions` (dashboard), etc.
- **Backend:** Replace with API endpoints to fetch user lists, individual profiles, and update preferences.
- **Websockets:** If using, add hooks for real-time profile updates.

### 2. Authentication & Current User
- **Current:** Loaded from `localStorage` as `demoUser`.
- **Backend:** Implement secure authentication (JWT, OAuth, etc.) and session management. Fetch current user from backend.

### 3. Connection Requests
- **Current:** Mock data and status changes in frontend state/localStorage.
- **Backend:** Replace with endpoints for sending, accepting, rejecting, and fetching requests. Persist status changes.
- **Websockets:** Add hooks for real-time request updates if needed.

### 4. Messaging/Chat
- **Current:** Placeholder or missing.
- **Backend:** Implement endpoints for sending, receiving, and fetching messages. Add real-time support if needed.

### 5. Compatibility Calculation
- **Current:** Done on frontend using all available fields.
- **Backend:** For scale, consider moving to backend or supporting websocket-driven live updates.

### 6. Filtering, Pagination, Search
- **Current:** Done in-memory on frontend.
- **Backend:** Implement server-side filtering, pagination, and search for scalability.

### 7. Blog, Notifications, More About This App
- **Current:** Hardcoded or missing.
- **Backend:** Add endpoints for blog posts, notifications, and "More About This App" content.

---

## Admin Site (Planned)
- **Purpose:** Separate admin site will control all accounts, blogs, privileges, "More About This App" data, and have access to all user data, passwords, and chats.
- **Features:**
  - View and manage all accounts (registered, unregistered, men, women, diaspora, etc.)
  - Update blogs, app info, and user privileges
  - View all payments and transactions
  - Log in as any user (no notification to user)
  - Full access to all chats and data

---

## Websocket Integration
- If using websockets for real-time updates (profiles, requests, chat):
  - Add connection and event handling in the relevant React files (see comments in code).
  - Ensure all updates are reflected in the UI without requiring a page reload.

---

## General Notes
- **Do not change any UI/UX or frontend logic.**
- All placeholder/mock logic is clearly commented in the code for easy replacement.
- See comments in `app/browse/page.tsx`, `app/dashboard/page.tsx`, and `app/requests/page.tsx` for exact locations to replace with backend logic.

---

## Questions?
Contact the frontend team for clarification on any integration points or UI requirements.
