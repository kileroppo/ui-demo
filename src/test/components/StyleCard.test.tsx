import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StyleCard } from '../../components/StyleCard'
import type { UIStyle } from '../../data/types'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Glassmorphism',
  nameZh: '玻璃拟态',
  type: 'General',
  keywords: ['Frosted glass', 'transparent', 'blurred', 'layered'],
  primaryColors: 'rgba(255,255,255,0.15)',
  secondaryColors: 'Electric Blue #0080FF',
  effects: 'Backdrop blur',
  bestFor: 'Modern SaaS',
  doNotUseFor: 'Low-contrast',
  lightMode: 'Full',
  darkMode: 'Full',
  performance: 'Good',
  accessibility: 'Ensure 4.5:1',
  mobileFriendly: 'Good',
  conversionFocused: 'High',
  frameworkCompat: 'Tailwind 9/10',
  era: '2020s',
  complexity: 'Medium',
  promptEn: 'Design a glassmorphic interface',
  promptZh: '请设计一个玻璃拟态界面。',
  cssKeywords: 'backdrop-filter: blur(15px)',
  implementationChecklist: ['Blur 10-20px'],
  designVariables: '--blur: 15px',
}

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('StyleCard', () => {
  it('renders Chinese style name', () => {
    renderWithRouter(<StyleCard style={mockStyle} />)
    expect(screen.getByText('玻璃拟态')).toBeInTheDocument()
  })

  it('renders English style name', () => {
    renderWithRouter(<StyleCard style={mockStyle} />)
    expect(screen.getByText('Glassmorphism')).toBeInTheDocument()
  })

  it('renders keywords as tags', () => {
    renderWithRouter(<StyleCard style={mockStyle} />)
    expect(screen.getByText('Frosted glass')).toBeInTheDocument()
    expect(screen.getByText('transparent')).toBeInTheDocument()
  })

  it('renders style type', () => {
    renderWithRouter(<StyleCard style={mockStyle} />)
    expect(screen.getByText('General')).toBeInTheDocument()
  })

  it('includes a link to style detail', () => {
    renderWithRouter(<StyleCard style={mockStyle} />)
    const link = screen.getByRole('link', { name: /玻璃拟态/i })
    expect(link).toHaveAttribute('href', '/styles/1')
  })

  it('renders the copy button', () => {
    renderWithRouter(<StyleCard style={mockStyle} />)
    expect(screen.getByText('复制提示词')).toBeInTheDocument()
  })

  it('shows maximum 4 keywords', () => {
    const styleWith5Keywords = {
      ...mockStyle,
      keywords: ['a', 'b', 'c', 'd', 'e'],
    }
    renderWithRouter(<StyleCard style={styleWith5Keywords} />)
    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.getByText('d')).toBeInTheDocument()
    expect(screen.queryByText('e')).not.toBeInTheDocument()
  })
})
