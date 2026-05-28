import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FullPageDemo } from '../../components/FullPageDemo'
import { fullPageDemos } from '../../data/fullPageDemos'

describe('FullPageDemo', () => {
  it('renders iframe with srcdoc for a valid style ID', () => {
    const { container } = render(<FullPageDemo styleId={1} />)
    const iframe = container.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute('srcdoc')).toBe(fullPageDemos[1])
  })

  it('renders nothing when style has no demo', () => {
    const { container } = render(<FullPageDemo styleId={999} />)
    expect(container.innerHTML).toBe('')
  })

  it('shows viewport switcher with Desktop, Tablet, and Mobile buttons', () => {
    render(<FullPageDemo styleId={1} />)
    expect(screen.getByLabelText('Desktop viewport')).toBeInTheDocument()
    expect(screen.getByLabelText('Tablet viewport')).toBeInTheDocument()
    expect(screen.getByLabelText('Mobile viewport')).toBeInTheDocument()
  })

  it('defaults to desktop viewport width (1440px)', () => {
    const { container } = render(<FullPageDemo styleId={1} />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.style.width).toBe('1440px')
  })

  it('switches to tablet width (768px) when tablet button is clicked', () => {
    const { container } = render(<FullPageDemo styleId={1} />)
    fireEvent.click(screen.getByLabelText('Tablet viewport'))
    const iframe = container.querySelector('iframe')
    expect(iframe?.style.width).toBe('768px')
  })

  it('switches to mobile width (375px) when mobile button is clicked', () => {
    const { container } = render(<FullPageDemo styleId={1} />)
    fireEvent.click(screen.getByLabelText('Mobile viewport'))
    const iframe = container.querySelector('iframe')
    expect(iframe?.style.width).toBe('375px')
  })

  it('switches back to desktop width when desktop button is clicked', () => {
    const { container } = render(<FullPageDemo styleId={1} />)
    fireEvent.click(screen.getByLabelText('Mobile viewport'))
    fireEvent.click(screen.getByLabelText('Desktop viewport'))
    const iframe = container.querySelector('iframe')
    expect(iframe?.style.width).toBe('1440px')
  })

  it('has a full screen toggle button', () => {
    render(<FullPageDemo styleId={1} />)
    expect(screen.getByLabelText('Enter full screen')).toBeInTheDocument()
  })

  it('toggles full screen mode', () => {
    render(<FullPageDemo styleId={1} />)
    const btn = screen.getByLabelText('Enter full screen')
    fireEvent.click(btn)
    expect(screen.getByLabelText('Exit full screen')).toBeInTheDocument()
  })

  it('renders demos for all 10 style IDs', () => {
    for (let id = 1; id <= 10; id++) {
      const { container, unmount } = render(<FullPageDemo styleId={id} />)
      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe?.getAttribute('srcdoc')).toBe(fullPageDemos[id])
      unmount()
    }
  })

  it('has correct section aria-label', () => {
    render(<FullPageDemo styleId={1} />)
    expect(screen.getByLabelText('Full Page Demo')).toBeInTheDocument()
  })

  it('iframe has sandbox attribute for security', () => {
    const { container } = render(<FullPageDemo styleId={1} />)
    const iframe = container.querySelector('iframe')
    expect(iframe?.getAttribute('sandbox')).toBe('allow-same-origin')
  })
})
