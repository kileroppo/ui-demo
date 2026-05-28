import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AnimatedCounter } from '../../components/AnimatedCounter'

describe('AnimatedCounter', () => {
  let mockObserverInstances: { callback: IntersectionObserverCallback; disconnect: ReturnType<typeof vi.fn>; observe: ReturnType<typeof vi.fn> }[]
  let rafCallbacks: ((time: number) => void)[]
  let rafId: number

  beforeEach(() => {
    mockObserverInstances = []
    rafCallbacks = []
    rafId = 0
    sessionStorage.clear()

    const MockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => {
      const instance = {
        callback,
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
      mockObserverInstances.push(instance)
      return instance
    })

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    vi.stubGlobal('requestAnimationFrame', (cb: (time: number) => void) => {
      rafCallbacks.push(cb)
      return ++rafId
    })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    vi.spyOn(performance, 'now').mockReturnValue(0)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    sessionStorage.clear()
  })

  function flushRAF(time: number) {
    vi.spyOn(performance, 'now').mockReturnValue(time)
    const cbs = [...rafCallbacks]
    rafCallbacks = []
    cbs.forEach((cb) => cb(time))
  }

  it('renders with initial count of 0', () => {
    render(<AnimatedCounter end={76} suffix=" 种" label="设计风格" />)
    expect(screen.getByText('0 种')).toBeInTheDocument()
    expect(screen.getByText('设计风格')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<AnimatedCounter end={76} suffix=" 种" label="设计风格" />)
    expect(screen.getByLabelText('设计风格')).toBeInTheDocument()
  })

  it('animates to target value when element intersects', () => {
    render(<AnimatedCounter end={100} suffix="+" label="实时演示" duration={1000} />)

    // Simulate intersection
    const observer = mockObserverInstances[0]
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    // Advance past duration via rAF
    act(() => {
      flushRAF(1100)
    })

    expect(screen.getByText('100+')).toBeInTheDocument()
  })

  it('does not animate before intersection', () => {
    render(<AnimatedCounter end={50} suffix="" label="测试" duration={500} />)

    act(() => {
      flushRAF(2000)
    })

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('does not re-animate after first animation', () => {
    render(<AnimatedCounter end={10} suffix="" label="测试" duration={500} />)

    const observer = mockObserverInstances[0]

    // First intersection
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    act(() => {
      flushRAF(600)
    })

    expect(screen.getByText('10')).toBeInTheDocument()

    // Second intersection should not reset
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    // Value should still be 10
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<AnimatedCounter end={10} suffix="" label="测试" />)
    const observer = mockObserverInstances[0]
    unmount()
    expect(observer.disconnect).toHaveBeenCalled()
  })

  it('shows partial count during animation', () => {
    render(<AnimatedCounter end={100} suffix="" label="测试" duration={1000} />)

    const observer = mockObserverInstances[0]
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    // Advance partially
    act(() => {
      flushRAF(500)
    })

    // Should be partially animated (not 0, not 100)
    const counterEl = screen.getByLabelText('测试')
    const value = parseInt(counterEl.querySelector('div')!.textContent || '0')
    expect(value).toBeGreaterThan(0)
    expect(value).toBeLessThan(100)
  })

  it('cancels animation frame on unmount', () => {
    const { unmount } = render(<AnimatedCounter end={100} suffix="" label="测试" duration={1000} />)

    const observer = mockObserverInstances[0]
    act(() => {
      observer.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    unmount()
    expect(cancelAnimationFrame).toHaveBeenCalled()
  })

  it('skips animation when sessionStorage flag is set', () => {
    sessionStorage.setItem('counter-animated-实时演示-100', 'true')
    render(<AnimatedCounter end={100} suffix="+" label="实时演示" duration={1000} />)

    // Should immediately show end value without animation
    expect(screen.getByText('100+')).toBeInTheDocument()
    // No observer created since alreadyAnimatedRef.current is true
    expect(mockObserverInstances.length).toBe(0)
  })
})
