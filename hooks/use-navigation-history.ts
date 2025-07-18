import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface NavigationHistory {
  path: string
  timestamp: number
}

export function useNavigationHistory() {
  const router = useRouter()
  const pathname = usePathname()
  const historyRef = useRef<NavigationHistory[]>([])
  const isNavigatingRef = useRef(false)

  // Protected routes that shouldn't be accessible via back navigation unless logged out
  const protectedRoutes = ['/login', '/register', '/signup']
  
  // Routes that should be skipped in back navigation
  const skipRoutes = ['/login', '/register', '/signup', '/verification']

  useEffect(() => {
    // Don't add protected routes to history unless user is logged out
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('demoUser')
    
    if (isLoggedIn && protectedRoutes.includes(pathname)) {
      return
    }

    // Add current path to history
    const currentHistory: NavigationHistory = {
      path: pathname,
      timestamp: Date.now()
    }

    // Remove duplicate consecutive entries
    const lastEntry = historyRef.current[historyRef.current.length - 1]
    if (lastEntry && lastEntry.path !== pathname) {
      historyRef.current.push(currentHistory)
    } else if (historyRef.current.length === 0) {
      historyRef.current.push(currentHistory)
    }

    // Keep only last 10 entries
    if (historyRef.current.length > 10) {
      historyRef.current = historyRef.current.slice(-10)
    }
  }, [pathname])

  const goBack = () => {
    if (isNavigatingRef.current) return
    
    const history = historyRef.current
    if (history.length < 2) {
      // If no history, go to dashboard
      router.push('/dashboard')
      return
    }

    // Remove current page from history
    const previousPages = history.slice(0, -1)
    
    // Find the last valid page to go back to
    let targetPage = '/dashboard' // fallback
    
    for (let i = previousPages.length - 1; i >= 0; i--) {
      const page = previousPages[i]
      if (!skipRoutes.includes(page.path)) {
        targetPage = page.path
        break
      }
    }

    isNavigatingRef.current = true
    router.push(targetPage)
    
    // Reset flag after navigation
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 100)
  }

  const getLastPage = (): string => {
    const history = historyRef.current
    if (history.length < 2) return '/dashboard'
    
    const previousPages = history.slice(0, -1)
    for (let i = previousPages.length - 1; i >= 0; i--) {
      const page = previousPages[i]
      if (!skipRoutes.includes(page.path)) {
        return page.path
      }
    }
    return '/dashboard'
  }

  return {
    goBack,
    getLastPage,
    history: historyRef.current
  }
} 