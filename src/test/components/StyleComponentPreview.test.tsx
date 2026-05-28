import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StyleComponentPreview, parseHexColors } from '../../components/StyleComponentPreview'
import type { UIStyle } from '../../data/types'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Minimalism & Swiss Style',
  nameZh: '极简主义',
  type: 'General',
  keywords: ['Clean', 'simple'],
  primaryColors: 'Monochromatic, Black #000000, White #FFFFFF',
  secondaryColors: 'Neutral (Beige #F5F1E8, Grey #808080)',
  effects: 'Subtle hover, smooth transitions',
  bestFor: 'Enterprise apps',
  doNotUseFor: 'Creative portfolios',
  lightMode: 'Full',
  darkMode: 'Full',
  performance: 'Excellent',
  accessibility: 'WCAG AAA',
  mobileFriendly: 'High',
  conversionFocused: 'Medium',
  frameworkCompat: 'Tailwind 10/10',
  era: '1950s Swiss',
  complexity: 'Low',
  promptEn: 'Design a minimalist landing page.',
  promptZh: '请设计一个极简主义界面',
  cssKeywords: 'display: grid',
  implementationChecklist: ['Grid-based layout'],
  designVariables: '--spacing: 2rem, --border-radius: 0px, --font-weight: 400-700',
}

describe('StyleComponentPreview', () => {
  it('renders all 4 component preview labels', () => {
    render(<StyleComponentPreview style={mockStyle} />)
    expect(screen.getByText('Button')).toBeInTheDocument()
    expect(screen.getByText('Card')).toBeInTheDocument()
    expect(screen.getByText('Form')).toBeInTheDocument()
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('renders button preview with primary color', () => {
    const { container } = render(<StyleComponentPreview style={mockStyle} />)
    const primaryBtn = container.querySelector('button[style]') as HTMLButtonElement | null
    expect(primaryBtn).not.toBeNull()
    expect(primaryBtn?.style.backgroundColor).toBe('rgb(0, 0, 0)')
  })

  it('renders card preview with style colors', () => {
    render(<StyleComponentPreview style={mockStyle} />)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description text')).toBeInTheDocument()
  })

  it('renders form preview with input and submit button', () => {
    render(<StyleComponentPreview style={mockStyle} />)
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('renders navigation preview with active tab', () => {
    render(<StyleComponentPreview style={mockStyle} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('applies border-radius from designVariables', () => {
    const { container } = render(<StyleComponentPreview style={mockStyle} />)
    const primaryBtn = container.querySelector('button[style]') as HTMLButtonElement | null
    expect(primaryBtn?.style.borderRadius).toBe('0px')
  })

  it('uses fallback color when no hex found in primaryColors', () => {
    const noColorStyle = {
      ...mockStyle,
      primaryColors: 'no hex colors here',
    }
    const { container } = render(<StyleComponentPreview style={noColorStyle} />)
    const primaryBtn = container.querySelector('button[style]') as HTMLButtonElement | null
    // Fallback blue
    expect(primaryBtn?.style.backgroundColor).toBe('rgb(59, 130, 246)')
  })

  it('uses fallback border-radius when not specified in designVariables', () => {
    const noBrStyle = {
      ...mockStyle,
      designVariables: '--spacing: 2rem, --font-weight: 700',
    }
    const { container } = render(<StyleComponentPreview style={noBrStyle} />)
    const primaryBtn = container.querySelector('button[style]') as HTMLButtonElement | null
    expect(primaryBtn?.style.borderRadius).toBe('8px')
  })

  it('has correct section aria-label', () => {
    render(<StyleComponentPreview style={mockStyle} />)
    expect(screen.getByLabelText('Component Previews')).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(<StyleComponentPreview style={mockStyle} />)
    expect(screen.getByText('Component Previews')).toBeInTheDocument()
  })

  it('handles light primary colors correctly (dark text)', () => {
    const lightStyle = {
      ...mockStyle,
      primaryColors: 'Bright Yellow #FFFF00, White #FFFFFF',
    }
    const { container } = render(<StyleComponentPreview style={lightStyle} />)
    const primaryBtn = container.querySelector('button[style]') as HTMLButtonElement | null
    expect(primaryBtn?.style.color).toBe('rgb(0, 0, 0)')
  })

  it('handles dark primary colors correctly (light text)', () => {
    const darkStyle = {
      ...mockStyle,
      primaryColors: 'Dark Black #000000, Navy #001F3F',
    }
    const { container } = render(<StyleComponentPreview style={darkStyle} />)
    const primaryBtn = container.querySelector('button[style]') as HTMLButtonElement | null
    expect(primaryBtn?.style.color).toBe('rgb(255, 255, 255)')
  })
})

describe('parseHexColors', () => {
  it('extracts hex colors from string', () => {
    expect(parseHexColors('Black #000000, White #FFFFFF')).toEqual(['#000000', '#FFFFFF'])
  })

  it('returns empty array when no hex colors found', () => {
    expect(parseHexColors('no colors here')).toEqual([])
  })

  it('handles multiple hex colors', () => {
    expect(parseHexColors('#FF0000, #00FF00, #0000FF')).toEqual(['#FF0000', '#00FF00', '#0000FF'])
  })

  it('handles lowercase hex colors', () => {
    expect(parseHexColors('#aabbcc')).toEqual(['#aabbcc'])
  })
})
