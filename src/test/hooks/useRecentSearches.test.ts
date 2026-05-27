import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRecentSearches } from '../../hooks/useRecentSearches'

describe('useRecentSearches', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getRecent', () => {
    it('returns empty array when localStorage is empty', () => {
      const { result } = renderHook(() => useRecentSearches())
      expect(result.current.getRecent()).toEqual([])
    })

    it('returns stored items', () => {
      localStorage.setItem(
        'ui-gallery-recent-searches',
        JSON.stringify(['a', 'b', 'c'])
      )
      const { result } = renderHook(() => useRecentSearches())
      expect(result.current.getRecent()).toEqual(['a', 'b', 'c'])
    })

    it('returns empty array on invalid JSON', () => {
      localStorage.setItem('ui-gallery-recent-searches', 'not-json{{{')
      const { result } = renderHook(() => useRecentSearches())
      expect(result.current.getRecent()).toEqual([])
    })

    it('returns empty array if stored value is not an array', () => {
      localStorage.setItem('ui-gallery-recent-searches', JSON.stringify('string'))
      const { result } = renderHook(() => useRecentSearches())
      expect(result.current.getRecent()).toEqual([])
    })

    it('filters out non-string items', () => {
      localStorage.setItem(
        'ui-gallery-recent-searches',
        JSON.stringify(['valid', 123, null, 'also-valid'])
      )
      const { result } = renderHook(() => useRecentSearches())
      expect(result.current.getRecent()).toEqual(['valid', 'also-valid'])
    })

    it('returns empty array when localStorage throws', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('storage error')
      })
      const { result } = renderHook(() => useRecentSearches())
      expect(result.current.getRecent()).toEqual([])
      vi.restoreAllMocks()
    })
  })

  describe('addSearch', () => {
    it('adds a search term', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('glassmorphism')
      })
      expect(result.current.getRecent()).toEqual(['glassmorphism'])
    })

    it('puts the most recent search first', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('first')
        result.current.addSearch('second')
      })
      expect(result.current.getRecent()).toEqual(['second', 'first'])
    })

    it('deduplicates existing terms', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('a')
        result.current.addSearch('b')
        result.current.addSearch('a')
      })
      expect(result.current.getRecent()).toEqual(['a', 'b'])
    })

    it('maintains max 5 items', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('one')
        result.current.addSearch('two')
        result.current.addSearch('three')
        result.current.addSearch('four')
        result.current.addSearch('five')
        result.current.addSearch('six')
      })
      const recent = result.current.getRecent()
      expect(recent).toHaveLength(5)
      expect(recent[0]).toBe('six')
      expect(recent).not.toContain('one')
    })

    it('does not add empty strings', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('')
        result.current.addSearch('   ')
      })
      expect(result.current.getRecent()).toEqual([])
    })

    it('trims whitespace from terms', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('  hello  ')
      })
      expect(result.current.getRecent()).toEqual(['hello'])
    })

    it('handles localStorage setItem error gracefully', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded')
      })
      const { result } = renderHook(() => useRecentSearches())
      expect(() => {
        act(() => {
          result.current.addSearch('test')
        })
      }).not.toThrow()
      vi.restoreAllMocks()
    })
  })

  describe('clearRecent', () => {
    it('removes all stored items', () => {
      const { result } = renderHook(() => useRecentSearches())
      act(() => {
        result.current.addSearch('a')
        result.current.addSearch('b')
        result.current.clearRecent()
      })
      expect(result.current.getRecent()).toEqual([])
    })

    it('handles localStorage removeItem error gracefully', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('error')
      })
      const { result } = renderHook(() => useRecentSearches())
      expect(() => {
        act(() => {
          result.current.clearRecent()
        })
      }).not.toThrow()
      vi.restoreAllMocks()
    })
  })
})
