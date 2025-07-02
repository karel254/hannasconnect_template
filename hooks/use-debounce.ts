"use client"

/**
 * Debounce a changing value.
 * @param value   The incoming value that changes rapidly
 * @param delay   Milliseconds to wait before publishing the debounced value
 */
import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
