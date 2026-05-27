import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageTransition } from '../../components/PageTransition'

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition transitionKey="/">
        <p>Hello World</p>
      </PageTransition>
    )
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('applies animate-fade-in-up class', () => {
    const { container } = render(
      <PageTransition transitionKey="/">
        <p>Content</p>
      </PageTransition>
    )
    expect(container.firstElementChild).toHaveClass('animate-fade-in-up')
  })

  it('applies additional className', () => {
    const { container } = render(
      <PageTransition transitionKey="/" className="extra-class">
        <p>Content</p>
      </PageTransition>
    )
    expect(container.firstElementChild).toHaveClass('animate-fade-in-up')
    expect(container.firstElementChild).toHaveClass('extra-class')
  })

  it('uses default empty className when not provided', () => {
    const { container } = render(
      <PageTransition transitionKey="/test">
        <p>Test</p>
      </PageTransition>
    )
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain('animate-fade-in-up')
  })
})
