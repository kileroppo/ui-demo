import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BackToTop } from '../../components/BackToTop'

describe('BackToTop', () => {
  let scrollHandler: (() => void) | null = null

  beforeEach(() => {
    scrollHandler = null
    vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler as () => void
      }
    })
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
    window.scrollTo = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('is hidden initially when scrollY is 0', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    render(<BackToTop />)
    expect(screen.queryByLabelText('回到顶部')).not.toBeInTheDocument()
  })

  it('appears when user scrolls past 400px', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    render(<BackToTop />)

    expect(screen.queryByLabelText('回到顶部')).not.toBeInTheDocument()

    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    act(() => {
      scrollHandler?.()
    })

    expect(screen.getByLabelText('回到顶部')).toBeInTheDocument()
  })

  it('hides when user scrolls back up below 400px', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    render(<BackToTop />)

    act(() => {
      scrollHandler?.()
    })
    expect(screen.getByLabelText('回到顶部')).toBeInTheDocument()

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    act(() => {
      scrollHandler?.()
    })
    expect(screen.queryByLabelText('回到顶部')).not.toBeInTheDocument()
  })

  it('calls window.scrollTo on click', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    render(<BackToTop />)

    act(() => {
      scrollHandler?.()
    })

    fireEvent.click(screen.getByLabelText('回到顶部'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('has proper aria-label', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    render(<BackToTop />)

    act(() => {
      scrollHandler?.()
    })

    expect(screen.getByLabelText('回到顶部')).toBeInTheDocument()
  })

  it('cleans up scroll event listener on unmount', () => {
    const { unmount } = render(<BackToTop />)
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
