import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'favorite-styles'
const SYNC_EVENT = 'favorites-updated'

function loadFavorites(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is number => typeof item === 'number')
  } catch {
    return []
  }
}

function saveFavorites(favorites: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // ignore localStorage errors
  }
  window.dispatchEvent(new CustomEvent(SYNC_EVENT))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(loadFavorites)

  useEffect(() => {
    const handleSync = () => {
      setFavorites(loadFavorites())
    }
    window.addEventListener(SYNC_EVENT, handleSync)
    window.addEventListener('storage', handleSync)
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  const toggle = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
      saveFavorites(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  )

  return { favorites, toggle, isFavorite, count: favorites.length }
}
