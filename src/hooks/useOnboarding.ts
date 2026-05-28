import { useState, useCallback } from 'react'

const STORAGE_KEY = 'onboarding-dismissed'

function getDismissed(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // ignore
  }
  return []
}

export function useOnboarding() {
  const [dismissed, setDismissed] = useState<string[]>(getDismissed)

  const shouldShow = useCallback(
    (id: string) => !dismissed.includes(id),
    [dismissed]
  )

  const dismiss = useCallback((id: string) => {
    setDismissed((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setDismissed([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { shouldShow, dismiss, resetAll }
}
