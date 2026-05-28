import { useState, useCallback, useEffect } from 'react'

const MAX_COMPARE = 3
const SESSION_KEY = 'compare-selected'

function loadSelected(): number[] {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is number => typeof item === 'number').slice(0, MAX_COMPARE)
  } catch {
    return []
  }
}

function saveSelected(ids: number[]): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(ids))
  } catch {
    // ignore sessionStorage errors
  }
}

export function useCompare() {
  const [selected, setSelected] = useState<number[]>(loadSelected)

  useEffect(() => {
    saveSelected(selected)
  }, [selected])

  const toggle = useCallback((id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((sid) => sid !== id)
      }
      if (prev.length >= MAX_COMPARE) {
        return prev
      }
      return [...prev, id]
    })
  }, [])

  const isSelected = useCallback(
    (id: number) => selected.includes(id),
    [selected]
  )

  const clear = useCallback(() => {
    setSelected([])
  }, [])

  const canAdd = selected.length < MAX_COMPARE

  return { selected, toggle, isSelected, clear, canAdd }
}
