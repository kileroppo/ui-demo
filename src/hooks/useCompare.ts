import { useState, useCallback } from 'react'

const MAX_COMPARE = 3

export function useCompare() {
  const [selected, setSelected] = useState<number[]>([])

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
