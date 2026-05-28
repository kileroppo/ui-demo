import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCompare } from '../../hooks/useCompare'

describe('useCompare', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('starts with empty selection', () => {
    const { result } = renderHook(() => useCompare())
    expect(result.current.selected).toEqual([])
    expect(result.current.canAdd).toBe(true)
  })

  it('loads existing selections from sessionStorage', () => {
    sessionStorage.setItem('compare-selected', JSON.stringify([1, 2]))
    const { result } = renderHook(() => useCompare())
    expect(result.current.selected).toEqual([1, 2])
  })

  it('toggle adds an ID to selected', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(1)
    })

    expect(result.current.selected).toEqual([1])
    expect(result.current.canAdd).toBe(true)
  })

  it('toggle removes an existing ID from selected', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(1)
    })
    act(() => {
      result.current.toggle(1)
    })

    expect(result.current.selected).toEqual([])
  })

  it('allows up to 3 selections', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(1)
    })
    act(() => {
      result.current.toggle(2)
    })
    act(() => {
      result.current.toggle(3)
    })

    expect(result.current.selected).toEqual([1, 2, 3])
    expect(result.current.canAdd).toBe(false)
  })

  it('does not add a 4th item when max is reached', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(1)
    })
    act(() => {
      result.current.toggle(2)
    })
    act(() => {
      result.current.toggle(3)
    })
    act(() => {
      result.current.toggle(4)
    })

    expect(result.current.selected).toEqual([1, 2, 3])
    expect(result.current.canAdd).toBe(false)
  })

  it('can still remove when at max', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(1)
    })
    act(() => {
      result.current.toggle(2)
    })
    act(() => {
      result.current.toggle(3)
    })
    act(() => {
      result.current.toggle(2)
    })

    expect(result.current.selected).toEqual([1, 3])
    expect(result.current.canAdd).toBe(true)
  })

  it('isSelected returns correct state', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(5)
    })

    expect(result.current.isSelected(5)).toBe(true)
    expect(result.current.isSelected(10)).toBe(false)
  })

  it('clear removes all selections', () => {
    const { result } = renderHook(() => useCompare())

    act(() => {
      result.current.toggle(1)
    })
    act(() => {
      result.current.toggle(2)
    })
    act(() => {
      result.current.clear()
    })

    expect(result.current.selected).toEqual([])
    expect(result.current.canAdd).toBe(true)
  })

  it('canAdd is true when fewer than 3 selected', () => {
    const { result } = renderHook(() => useCompare())

    expect(result.current.canAdd).toBe(true)

    act(() => {
      result.current.toggle(1)
    })
    expect(result.current.canAdd).toBe(true)

    act(() => {
      result.current.toggle(2)
    })
    expect(result.current.canAdd).toBe(true)

    act(() => {
      result.current.toggle(3)
    })
    expect(result.current.canAdd).toBe(false)
  })

  describe('sessionStorage persistence', () => {
    it('persists selections to sessionStorage on toggle', () => {
      const { result } = renderHook(() => useCompare())

      act(() => {
        result.current.toggle(7)
      })

      const stored = JSON.parse(sessionStorage.getItem('compare-selected')!)
      expect(stored).toEqual([7])
    })

    it('clears sessionStorage on clear()', () => {
      const { result } = renderHook(() => useCompare())

      act(() => {
        result.current.toggle(1)
      })
      act(() => {
        result.current.clear()
      })

      const stored = JSON.parse(sessionStorage.getItem('compare-selected')!)
      expect(stored).toEqual([])
    })

    it('handles invalid sessionStorage gracefully', () => {
      sessionStorage.setItem('compare-selected', 'not valid json{')
      const { result } = renderHook(() => useCompare())
      expect(result.current.selected).toEqual([])
    })

    it('filters non-number values from sessionStorage', () => {
      sessionStorage.setItem('compare-selected', JSON.stringify([1, 'two', 3, null]))
      const { result } = renderHook(() => useCompare())
      expect(result.current.selected).toEqual([1, 3])
    })

    it('limits loaded items to MAX_COMPARE', () => {
      sessionStorage.setItem('compare-selected', JSON.stringify([1, 2, 3, 4, 5]))
      const { result } = renderHook(() => useCompare())
      expect(result.current.selected).toEqual([1, 2, 3])
    })
  })
})
