import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { PageTransition } from '../../components/PageTransition'

describe('PageTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders children', () => {
    render(
      <PageTransition transitionKey="/">
        <p>Hello World</p>
      </PageTransition>
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('does not apply animation class on initial render', () => {
    const { container } = render(
      <PageTransition transitionKey="/">
        <p>Content</p>
      </PageTransition>
    )
    expect(container.firstElementChild).not.toHaveClass('animate-fade-in-up')
  })

  it('applies animate-fade-in-up class when transitionKey changes', () => {
    const { container, rerender } = render(
      <PageTransition transitionKey="/">
        <p>Content</p>
      </PageTransition>
    )

    rerender(
      <PageTransition transitionKey="/styles">
        <p>Content</p>
      </PageTransition>
    )

    expect(container.firstElementChild).toHaveClass('animate-fade-in-up')
  })

  it('removes animation class after timeout', () => {
    const { container, rerender } = render(
      <PageTransition transitionKey="/">
        <p>Content</p>
      </PageTransition>
    )

    rerender(
      <PageTransition transitionKey="/styles">
        <p>Content</p>
      </PageTransition>
    )

    expect(container.firstElementChild).toHaveClass('animate-fade-in-up')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(container.firstElementChild).not.toHaveClass('animate-fade-in-up')
  })

  it('applies additional className', () => {
    const { container } = render(
      <PageTransition transitionKey="/" className="extra-class">
        <p>Content</p>
      </PageTransition>
    )
    expect(container.firstElementChild).toHaveClass('extra-class')
  })

  it('preserves children across transition key changes without remounting', () => {
    const { rerender } = render(
      <PageTransition transitionKey="/">
        <p>Preserved Content</p>
      </PageTransition>
    )

    rerender(
      <PageTransition transitionKey="/new">
        <p>Preserved Content</p>
      </PageTransition>
    )

    expect(screen.getByText('Preserved Content')).toBeInTheDocument()
  })
})
