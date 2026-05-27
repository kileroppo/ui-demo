const STORAGE_KEY = 'ui-gallery-recent-searches'
const MAX_ITEMS = 5

export function useRecentSearches() {
  function getRecent(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      const parsed = JSON.parse(stored)
      if (!Array.isArray(parsed)) return []
      return parsed.filter((item): item is string => typeof item === 'string')
    } catch {
      return []
    }
  }

  function addSearch(term: string): void {
    const trimmed = term.trim()
    if (!trimmed) return
    try {
      const current = getRecent()
      const deduped = current.filter((item) => item !== trimmed)
      const updated = [trimmed, ...deduped].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // silently ignore localStorage errors
    }
  }

  function clearRecent(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // silently ignore localStorage errors
    }
  }

  return { getRecent, addSearch, clearRecent }
}
