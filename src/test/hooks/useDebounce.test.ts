import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../../hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays callback execution', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebounce(callback, 200))

    act(() => {
      result.current('test')
    })

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(callback).toHaveBeenCalledWith('test')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('resets timer on subsequent calls', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebounce(callback, 200))

    act(() => {
      result.current('first')
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    act(() => {
      result.current('second')
    })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('second')
  })

  it('only fires once after rapid calls', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebounce(callback, 150))

    act(() => {
      result.current('a')
      result.current('ab')
      result.current('abc')
    })

    act(() => {
      vi.advanceTimersByTime(150)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('abc')
  })

  it('fires callback for each debounce cycle', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebounce(callback, 100))

    act(() => {
      result.current('first')
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    act(() => {
      result.current('second')
    })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenNthCalledWith(1, 'first')
    expect(callback).toHaveBeenNthCalledWith(2, 'second')
  })
})
