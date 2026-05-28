import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useThemeMode } from '../../hooks/useThemeMode'

describe('useThemeMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('defaults to light mode when no system preference and no stored value', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('light')
  })

  it('defaults to dark mode when system prefers dark and no stored value', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('dark')
  })

  it('reads stored preference from localStorage', () => {
    localStorage.setItem('theme-mode', 'dark')
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('dark')
  })

  it('stored preference takes precedence over system preference', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
    } as MediaQueryList)
    localStorage.setItem('theme-mode', 'light')
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('light')
  })

  it('toggle switches from light to dark', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('light')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.mode).toBe('dark')
  })

  it('toggle switches from dark to light', () => {
    localStorage.setItem('theme-mode', 'dark')
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('dark')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.mode).toBe('light')
  })

  it('toggle persists to localStorage', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())

    act(() => {
      result.current.toggle()
    })

    expect(localStorage.getItem('theme-mode')).toBe('dark')
  })

  it('setMode sets a specific mode', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())

    act(() => {
      result.current.setMode('dark')
    })

    expect(result.current.mode).toBe('dark')
    expect(localStorage.getItem('theme-mode')).toBe('dark')
  })

  it('adds dark class to documentElement in dark mode', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())

    act(() => {
      result.current.toggle()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class from documentElement in light mode', () => {
    localStorage.setItem('theme-mode', 'dark')
    const { result } = renderHook(() => useThemeMode())

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('ignores invalid localStorage values', () => {
    localStorage.setItem('theme-mode', 'invalid')
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const { result } = renderHook(() => useThemeMode())
    expect(result.current.mode).toBe('light')
  })
})
