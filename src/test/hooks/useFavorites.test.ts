import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavorites } from '../../hooks/useFavorites'

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
    expect(result.current.count).toBe(0)
  })

  it('loads existing favorites from localStorage', () => {
    localStorage.setItem('favorite-styles', JSON.stringify([1, 2, 3]))
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([1, 2, 3])
    expect(result.current.count).toBe(3)
  })

  it('toggle adds an ID to favorites', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggle(5)
    })

    expect(result.current.favorites).toEqual([5])
    expect(result.current.count).toBe(1)
  })

  it('toggle removes an existing ID from favorites', () => {
    localStorage.setItem('favorite-styles', JSON.stringify([5, 10]))
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggle(5)
    })

    expect(result.current.favorites).toEqual([10])
    expect(result.current.count).toBe(1)
  })

  it('isFavorite returns true for favorited IDs', () => {
    localStorage.setItem('favorite-styles', JSON.stringify([5, 10]))
    const { result } = renderHook(() => useFavorites())

    expect(result.current.isFavorite(5)).toBe(true)
    expect(result.current.isFavorite(10)).toBe(true)
    expect(result.current.isFavorite(15)).toBe(false)
  })

  it('persists favorites to localStorage on toggle', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggle(7)
    })

    const stored = JSON.parse(localStorage.getItem('favorite-styles')!)
    expect(stored).toEqual([7])
  })

  it('handles invalid localStorage gracefully', () => {
    localStorage.setItem('favorite-styles', 'not valid json{')
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  it('filters non-number values from localStorage', () => {
    localStorage.setItem('favorite-styles', JSON.stringify([1, 'two', 3, null]))
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([1, 3])
  })

  it('handles non-array localStorage values', () => {
    localStorage.setItem('favorite-styles', JSON.stringify({ a: 1 }))
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favorites).toEqual([])
  })

  it('count updates after toggle', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggle(1)
    })
    expect(result.current.count).toBe(1)

    act(() => {
      result.current.toggle(2)
    })
    expect(result.current.count).toBe(2)

    act(() => {
      result.current.toggle(1)
    })
    expect(result.current.count).toBe(1)
  })
})
