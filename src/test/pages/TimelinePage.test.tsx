import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TimelinePage } from '../../pages/TimelinePage'

function renderTimeline() {
  return render(
    <MemoryRouter>
      <TimelinePage />
    </MemoryRouter>
  )
}

describe('TimelinePage', () => {
  it('renders page title', () => {
    renderTimeline()
    expect(screen.getByText('UI 风格演进时间线')).toBeInTheDocument()
  })

  it('renders description text', () => {
    renderTimeline()
    expect(screen.getByText(/从拟物化到流体玻璃/)).toBeInTheDocument()
  })

  it('renders all timeline nodes', () => {
    renderTimeline()
    const nodes = screen.getAllByTestId('timeline-node')
    expect(nodes.length).toBe(16) // 8 nodes x 2 (desktop + mobile)
  })

  it('shows year labels for each node', () => {
    renderTimeline()
    expect(screen.getAllByText('2007').length).toBeGreaterThan(0)
    expect(screen.getAllByText('2013').length).toBeGreaterThan(0)
    expect(screen.getAllByText('2025').length).toBeGreaterThan(0)
  })

  it('shows style names in Chinese', () => {
    renderTimeline()
    expect(screen.getAllByText('拟物化设计').length).toBeGreaterThan(0)
    expect(screen.getAllByText('扁平设计').length).toBeGreaterThan(0)
    expect(screen.getAllByText('流体玻璃').length).toBeGreaterThan(0)
  })

  it('links known styles to their detail pages', () => {
    renderTimeline()
    // Neumorphism has id=2, Glassmorphism id=3, Brutalism id=4, etc.
    const links = screen.getAllByRole('link')
    const styleLinks = links.filter((l) => l.getAttribute('href')?.startsWith('/styles/'))
    expect(styleLinks.length).toBeGreaterThan(0)
  })

  it('has desktop timeline container', () => {
    renderTimeline()
    expect(screen.getByTestId('timeline-desktop')).toBeInTheDocument()
  })

  it('has mobile timeline container', () => {
    renderTimeline()
    expect(screen.getByTestId('timeline-mobile')).toBeInTheDocument()
  })

  it('nodes link to correct style detail pages for known styles', () => {
    renderTimeline()
    // Neumorphism = id 2
    const neumorphLinks = screen.getAllByRole('link', { name: '新拟态' })
    expect(neumorphLinks[0]).toHaveAttribute('href', '/styles/2')
  })

  it('renders descriptions for each timeline event', () => {
    renderTimeline()
    expect(screen.getAllByText(/模仿真实物理材质/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/半透明磨砂玻璃/).length).toBeGreaterThan(0)
  })
})
