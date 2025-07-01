# Hanna's Connect - Professional Dating Platform

A modern, professional dating platform built with Next.js 13, TypeScript, and Tailwind CSS. Features a clean architecture with comprehensive user management, messaging system, and responsive design.

## 🚀 Features

- **Modern Tech Stack**: Next.js 13 with Pages Router, TypeScript, Tailwind CSS
- **Professional UI**: Clean, responsive design with shadcn/ui components
- **User Authentication**: Complete registration and login system
- **Profile Management**: Avatar selection, personal information, preferences
- **Messaging System**: Real-time chat interface with unread message indicators
- **Member Discovery**: Browse and connect with other members
- **Blog System**: Content management with user access control
- **Mobile-First**: Responsive design with mobile bottom navigation
- **Theme Support**: Light/dark mode with system preference detection

## 📁 Project Structure

\`\`\`
src/
├── pages/                 # Next.js Pages Router
│   ├── _app.tsx          # App component with providers
│   ├── _document.tsx     # Document component
│   ├── index.tsx         # Landing page
│   ├── login.tsx         # Login page
│   ├── register.tsx      # Registration page
│   └── ...
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── mobile-bottom-nav.tsx
│   └── ...
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS and custom styles
├── utils/               # Utility functions
│   └── cn.ts           # Class name utility
├── hooks/               # Custom React hooks
│   └── use-toast.ts    # Toast hook
├── contexts/            # React contexts
│   └── theme-context.js # Theme provider
└── types/               # TypeScript type definitions

public/                  # Static assets
├── images/             # Application images
└── ...

Configuration files at root level
\`\`\`

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd hannas-connect
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Clean Code Structure
- **Separation of Concerns**: Pages, components, utilities, and styles are properly organized
- **TypeScript**: Full type safety throughout the application
- **Modular Components**: Reusable UI components with consistent styling
- **Custom Hooks**: Shared logic extracted into custom hooks

### Key Components
- **Authentication System**: Complete user registration and login flow
- **Profile Management**: Avatar selection from curated collection
- **Messaging Interface**: Chat system with real-time feel
- **Responsive Navigation**: Mobile bottom navigation for optimal UX
- **Theme System**: Light/dark mode with system preference support

### State Management
- **Local Storage**: User session and preference management
- **React State**: Component-level state management
- **Context API**: Theme and global state management

## 🎨 Design System

### Color Palette
- **Primary**: #B22222 (Firebrick Red)
- **Secondary**: #DAA520 (Goldenrod)
- **Neutral**: Gray scale for text and backgrounds
- **System**: Automatic light/dark mode support

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: Consistent typography scale
- **Responsive**: Adaptive text sizes

### Components
- **shadcn/ui**: Professional component library
- **Custom Components**: Application-specific components
- **Consistent Styling**: Unified design language

## 📱 Features

### User Management
- Registration with avatar selection
- Profile customization
- Preference settings
- Account management

### Social Features
- Member browsing
- Connection requests
- Messaging system
- Match notifications

### Content System
- Blog with access control
- Success stories
- FAQ system
- Help documentation

### Mobile Experience
- Responsive design
- Touch-friendly interface
- Mobile bottom navigation
- Optimized performance

## 🔧 Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit checks (recommended)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## 🔒 Security

- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Secure rendering of user content
- **CSRF Protection**: Built-in Next.js protections
- **Secure Headers**: Security headers configuration

## 📈 Performance

- **Next.js Optimizations**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized bundle sizes
- **Caching**: Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **shadcn**: For the beautiful UI components
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the icon library

---

Built with ❤️ using modern web technologies for a professional dating platform experience.
