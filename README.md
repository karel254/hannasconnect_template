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

---

# 🚀 Backend Integration Guide

## Overview
This frontend is ready for backend integration. All mock data and localStorage usage can be replaced with real API calls without changing the UI/UX. The following guide provides organized API endpoints and implementation details for the backend developer.

---

## 📋 API Endpoints Overview

### 🔐 Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### 👤 User Profile Endpoints
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get specific user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/suggestions` - Get dashboard suggestions
- `POST /api/users/avatar` - Upload avatar

### 💬 Messaging Endpoints
- `GET /api/messages` - Get conversations
- `GET /api/messages/:conversationId` - Get messages for conversation
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark message as read

### 🔗 Connection Endpoints
- `GET /api/connections` - Get user connections
- `GET /api/connections/requests` - Get connection requests
- `POST /api/connections/request` - Send connection request
- `PUT /api/connections/request/:id/accept` - Accept request
- `PUT /api/connections/request/:id/reject` - Reject request
- `DELETE /api/connections/:id` - Remove connection
- `POST /api/connections/:id/block` - Block user
- `DELETE /api/connections/:id/block` - Unblock user

### 🔍 Search & Filter Endpoints
- `GET /api/users/search` - Search users with filters
- `GET /api/users/filters` - Get available filter options

### 📧 Notification Endpoints
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `POST /api/push-subscribe` - Subscribe to push notifications

### 📝 Content Endpoints
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:id` - Get specific blog post
- `GET /api/success-stories` - Get success stories
- `GET /api/faq` - Get FAQ content

---

## 🔧 Detailed Implementation Guide

### 1. Authentication Integration

**Current State:** Uses localStorage with `demoUser` object
**Backend Implementation:**

```typescript
// Replace in app/login/page.tsx and app/register/page.tsx
const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (response.ok) {
      const { user, token } = await response.json();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    }
  } catch (error) {
    // Handle error
  }
};
```

**Required Backend Endpoints:**
- `POST /api/auth/login` - Return `{ user, token }`
- `POST /api/auth/register` - Return `{ user, token }`
- `GET /api/auth/me` - Return current user data

### 2. User Profile Integration

**Current State:** Mock data in `baseUsers` array
**Backend Implementation:**

```typescript
// Replace in app/browse/page.tsx, app/dashboard/page.tsx
const fetchUsers = async (filters?: UserFilters) => {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`/api/users?${queryParams}`);
  return response.json();
};

const fetchSuggestions = async () => {
  const response = await fetch('/api/users/suggestions');
  return response.json();
};
```

**Required Backend Endpoints:**
- `GET /api/users` - Support query parameters for filtering
- `GET /api/users/suggestions` - Return compatible users for dashboard
- `GET /api/users/:id` - Return detailed user profile

### 3. Connection Requests Integration

**Current State:** Mock data and localStorage
**Backend Implementation:**

```typescript
// Replace in app/requests/page.tsx
const fetchRequests = async () => {
  const response = await fetch('/api/connections/requests');
  return response.json();
};

const handleAcceptRequest = async (requestId: string) => {
  await fetch(`/api/connections/request/${requestId}/accept`, {
    method: 'PUT'
  });
  // Refresh requests list
};
```

**Required Backend Endpoints:**
- `GET /api/connections/requests` - Return pending requests
- `POST /api/connections/request` - Send new request
- `PUT /api/connections/request/:id/accept` - Accept request
- `PUT /api/connections/request/:id/reject` - Reject request

### 4. Messaging Integration

**Current State:** Placeholder/mock data
**Backend Implementation:**

```typescript
// Replace in app/messages/page.tsx
const fetchConversations = async () => {
  const response = await fetch('/api/messages');
  return response.json();
};

const sendMessage = async (conversationId: string, message: string) => {
  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, message })
  });
};
```

**Required Backend Endpoints:**
- `GET /api/messages` - Return user conversations
- `GET /api/messages/:conversationId` - Return messages for conversation
- `POST /api/messages` - Send new message
- `PUT /api/messages/:id/read` - Mark as read

### 5. Profile Management Integration

**Current State:** localStorage updates
**Backend Implementation:**

```typescript
// Replace in app/profile/page.tsx
const updateProfile = async (profileData: Partial<UserProfile>) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData)
  });
  return response.json();
};
```

**Required Backend Endpoints:**
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/avatar` - Upload avatar image

### 6. Search & Filter Integration

**Current State:** Client-side filtering
**Backend Implementation:**

```typescript
// Replace in app/browse/page.tsx
const searchUsers = async (filters: SearchFilters) => {
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'any') {
      queryParams.append(key, value.toString());
    }
  });
  
  const response = await fetch(`/api/users/search?${queryParams}`);
  return response.json();
};
```

**Required Backend Endpoints:**
- `GET /api/users/search` - Support all filter parameters
- `GET /api/users/filters` - Return available filter options

---

## 🔄 Real-time Integration (WebSockets)

### Connection Status Updates
```typescript
// In app/connections/page.tsx
useEffect(() => {
  const ws = new WebSocket('ws://your-backend/connections');
  
  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === 'connection_update') {
      // Update connection status
    }
  };
}, []);
```

### Real-time Messaging
```typescript
// In app/messages/page.tsx
useEffect(() => {
  const ws = new WebSocket('ws://your-backend/messages');
  
  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === 'new_message') {
      // Add new message to conversation
    }
  };
}, []);
```

---

## 📊 Data Models

### User Profile
```typescript
interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  bio: string;
  avatar: string;
  gender: string;
  country: string;
  // ... all other profile fields
  preferences: {
    ageRange: [number, number];
    lookingFor: string;
    // ... all preference fields
  };
  settings: {
    notifications: {
      messages: boolean;
      matches: boolean;
      // ... other notification settings
    };
    privacy: {
      showOnline: boolean;
      showReadReceipts: boolean;
      // ... other privacy settings
    };
  };
}
```

### Connection Request
```typescript
interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Message
```typescript
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}
```

---

## 🔒 Security Considerations

### Authentication
- Implement JWT tokens with refresh mechanism
- Store tokens securely (httpOnly cookies recommended)
- Implement proper session management

### Authorization
- Validate user permissions for all endpoints
- Ensure users can only access their own data
- Implement rate limiting

### Data Validation
- Validate all input data on backend
- Sanitize user inputs
- Implement proper error handling

---

## 📱 Push Notifications

### Backend Implementation
```typescript
// Store subscription in database
POST /api/push-subscribe
{
  "userId": "user_id",
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/...",
    "keys": {
      "p256dh": "...",
      "auth": "..."
    }
  }
}

// Send notification
const sendPushNotification = async (userId: string, notification: {
  title: string;
  body: string;
  icon?: string;
  data?: any;
}) => {
  // Use Web Push Protocol with VAPID keys
};
```

---

## 🎯 Migration Checklist

### Phase 1: Core Authentication
- [ ] Implement login/register endpoints
- [ ] Replace localStorage auth with backend auth
- [ ] Add token refresh mechanism

### Phase 2: User Profiles
- [ ] Implement user CRUD endpoints
- [ ] Replace mock user data
- [ ] Add avatar upload functionality

### Phase 3: Connections
- [ ] Implement connection request endpoints
- [ ] Replace mock connection data
- [ ] Add real-time status updates

### Phase 4: Messaging
- [ ] Implement messaging endpoints
- [ ] Add real-time messaging
- [ ] Add message read receipts

### Phase 5: Search & Filters
- [ ] Implement server-side filtering
- [ ] Add pagination support
- [ ] Optimize search performance

### Phase 6: Notifications
- [ ] Implement push notifications
- [ ] Add in-app notifications
- [ ] Add email notifications

---

## 🛠️ Development Tips

### Error Handling
```typescript
// Implement consistent error handling
const handleApiError = (error: any) => {
  if (error.status === 401) {
    // Redirect to login
    router.push('/login');
  } else if (error.status === 403) {
    // Show access denied
    toast.error('Access denied');
  } else {
    // Show generic error
    toast.error('Something went wrong');
  }
};
```

### Loading States
```typescript
// Add loading states for better UX
const [isLoading, setIsLoading] = useState(false);

const fetchData = async () => {
  setIsLoading(true);
  try {
    const data = await apiCall();
    setData(data);
  } catch (error) {
    handleApiError(error);
  } finally {
    setIsLoading(false);
  }
};
```

### Caching Strategy
```typescript
// Implement caching for better performance
const useCachedData = (key: string, fetcher: () => Promise<any>) => {
  const [data, setData] = useState(null);
  const [cache, setCache] = useState({});

  useEffect(() => {
    if (cache[key]) {
      setData(cache[key]);
    } else {
      fetcher().then(result => {
        setData(result);
        setCache(prev => ({ ...prev, [key]: result }));
      });
    }
  }, [key]);
};
```

---

## 📞 Support

For backend integration questions or clarifications:
- Review the code comments in each component
- Check the TypeScript interfaces for data structures
- Test endpoints with the provided frontend

The frontend is designed to be backend-agnostic and can work with any RESTful API that follows the specified endpoints and data structures.

---

## Push Notifications (Frontend PWA)

This project includes a full client-side push notification setup for a Next.js PWA. Backend developers should note:

### How it Works
- The frontend registers a service worker and subscribes the user to push notifications using the VAPID public key.
- The subscription object is POSTed to `/api/push-subscribe` (currently a mock endpoint).
- The service worker (`public/service-worker.js`) listens for `push` events and displays notifications.

### Backend Integration
- The backend should store the subscription object received at `/api/push-subscribe` for each user.
- To send a push notification, the backend should use the [Web Push Protocol](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) and the VAPID private key to send a payload to the user's subscription endpoint.
- The push payload should be a JSON object like:

```json
{
  "title": "New Message",
  "body": "You have a new message!",
  "icon": "/images/favicon.ico",
  "tag": "message",
  "data": { "url": "/messages" }
}
```

- The service worker will display the notification and handle clicks (default: opens the app homepage).

### VAPID Key
- The VAPID public key is set in `hooks/usePushNotifications.tsx`.
- The backend must use the matching VAPID private key to send push messages.

### API Endpoint
- `/api/push-subscribe` should be implemented on the backend to store and manage subscriptions.
- The current implementation is a mock and does not persist data.

### Service Worker
- See `public/service-worker.js` for the push event handler and notification display logic.
- You can customize the notification options and click behavior as needed.

---

# Hanna's Connect Backend API

## Hanna's Help Email Endpoint

This endpoint allows the frontend to send user help requests directly to the admin/support team via email.

### Endpoint

`POST /api/send-help`

### Request Body (JSON)
```
{
  "username": "kajwangbrian420",
  "email": "kajwangbrian420@outlook.com",
  "message": "Describe the user's issue here"
}
```

### Response (JSON)
- On success:
  ```
  { "success": true }
  ```
- On error:
  ```
  { "success": false, "error": "Error message" }
  ```

### What the backend should do
- Validate all fields are present and valid.
- Compose an email with:
  - **To:** support@hannasconnect.com, assist@hannasconnect.com
  - **Subject:** "Hanna's Help Issue"
  - **Body:**
    ```
    User: <username>
    Email: <email>
    Message: <message>
    ```
- Send the email using a secure mail service (e.g., Nodemailer, SendGrid, Mailgun, etc.).
- Return a JSON response indicating success or failure.

### Example Implementation (see `app/api/send-help.ts`)
- Accepts POST requests only.
- Validates input.
- Uses Nodemailer (or similar) to send the email (backend dev must configure SMTP credentials).
- Returns `{ success: true }` on success, or `{ success: false, error }` on failure.
