import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useOnboarding } from '../../hooks/useOnboarding'

describe('useOnboarding', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shouldShow returns true for unseen tips', () => {
    const { result } = renderHook(() => useOnboarding())
    expect(result.current.shouldShow('tip-1')).toBe(true)
    expect(result.current.shouldShow('tip-2')).toBe(true)
  })

  it('dismiss marks tip as seen', () => {
    const { result } = renderHook(() => useOnboarding())

    act(() => {
      result.current.dismiss('tip-1')
    })

    expect(result.current.shouldShow('tip-1')).toBe(false)
    expect(result.current.shouldShow('tip-2')).toBe(true)
  })

  it('persists dismissed tips to localStorage', () => {
    const { result } = renderHook(() => useOnboarding())

    act(() => {
      result.current.dismiss('tip-1')
    })

    const stored = JSON.parse(localStorage.getItem('onboarding-dismissed') || '[]')
    expect(stored).toContain('tip-1')
  })

  it('reads dismissed state from localStorage on mount', () => {
    localStorage.setItem('onboarding-dismissed', JSON.stringify(['tip-1', 'tip-2']))
    const { result } = renderHook(() => useOnboarding())

    expect(result.current.shouldShow('tip-1')).toBe(false)
    expect(result.current.shouldShow('tip-2')).toBe(false)
    expect(result.current.shouldShow('tip-3')).toBe(true)
  })

  it('resetAll clears all dismissed tips', () => {
    const { result } = renderHook(() => useOnboarding())

    act(() => {
      result.current.dismiss('tip-1')
      result.current.dismiss('tip-2')
    })

    expect(result.current.shouldShow('tip-1')).toBe(false)

    act(() => {
      result.current.resetAll()
    })

    expect(result.current.shouldShow('tip-1')).toBe(true)
    expect(result.current.shouldShow('tip-2')).toBe(true)
    expect(localStorage.getItem('onboarding-dismissed')).toBeNull()
  })

  it('does not duplicate dismissed ids', () => {
    const { result } = renderHook(() => useOnboarding())

    act(() => {
      result.current.dismiss('tip-1')
      result.current.dismiss('tip-1')
    })

    const stored = JSON.parse(localStorage.getItem('onboarding-dismissed') || '[]')
    expect(stored.filter((id: string) => id === 'tip-1')).toHaveLength(1)
  })

  it('handles invalid localStorage data gracefully', () => {
    localStorage.setItem('onboarding-dismissed', 'not-valid-json')
    const { result } = renderHook(() => useOnboarding())
    expect(result.current.shouldShow('tip-1')).toBe(true)
  })
})
