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
