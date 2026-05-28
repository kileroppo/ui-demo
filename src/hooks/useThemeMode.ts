import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'theme-mode'

type Mode = 'light' | 'dark'

function getInitialMode(): Mode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore localStorage errors
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function applyMode(mode: Mode): void {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function useThemeMode() {
  const [mode, setModeState] = useState<Mode>(getInitialMode)

  useEffect(() => {
    applyMode(mode)
  }, [mode])

  const setMode = useCallback((m: Mode) => {
    setModeState(m)
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch {
      // ignore localStorage errors
    }
  }, [])

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore localStorage errors
      }
      return next
    })
  }, [])

  return { mode, toggle, setMode }
}
