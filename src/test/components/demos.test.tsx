import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlassmorphismDemo } from '../../components/demos/GlassmorphismDemo'
import { NeumorphismDemo } from '../../components/demos/NeumorphismDemo'
import { BrutalismDemo } from '../../components/demos/BrutalismDemo'
import { MinimalismDemo } from '../../components/demos/MinimalismDemo'
import { DarkModeDemo } from '../../components/demos/DarkModeDemo'
import { VibrantBlockDemo } from '../../components/demos/VibrantBlockDemo'
import { AuroraDemo } from '../../components/demos/AuroraDemo'
import { ClaymorphismDemo } from '../../components/demos/ClaymorphismDemo'
import { RetroFuturismDemo } from '../../components/demos/RetroFuturismDemo'
import { FlatDesignDemo } from '../../components/demos/FlatDesignDemo'
import { GenericStyleDemo } from '../../components/demos/GenericStyleDemo'
import type { UIStyle } from '../../data/types'

describe('Demo Components', () => {
  it('GlassmorphismDemo renders frosted glass text', () => {
    render(<GlassmorphismDemo />)
    expect(screen.getByText('Frosted Glass')).toBeInTheDocument()
  })

  it('NeumorphismDemo renders soft UI text', () => {
    render(<NeumorphismDemo />)
    expect(screen.getByText('Soft UI')).toBeInTheDocument()
  })

  it('BrutalismDemo renders raw block text', () => {
    render(<BrutalismDemo />)
    expect(screen.getByText('RAW BLOCK')).toBeInTheDocument()
  })

  it('MinimalismDemo renders clean design text', () => {
    render(<MinimalismDemo />)
    expect(screen.getByText('Clean Design')).toBeInTheDocument()
  })

  it('DarkModeDemo renders OLED dark text', () => {
    render(<DarkModeDemo />)
    expect(screen.getByText('OLED Dark')).toBeInTheDocument()
    expect(screen.getByText('Power Efficient')).toBeInTheDocument()
  })

  it('VibrantBlockDemo renders block labels', () => {
    render(<VibrantBlockDemo />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })

  it('AuroraDemo renders aurora text', () => {
    render(<AuroraDemo />)
    expect(screen.getByText('Aurora Flow')).toBeInTheDocument()
  })

  it('ClaymorphismDemo renders clay text', () => {
    render(<ClaymorphismDemo />)
    expect(screen.getByText('Clay')).toBeInTheDocument()
  })

  it('RetroFuturismDemo renders neon CRT text', () => {
    render(<RetroFuturismDemo />)
    expect(screen.getByText('NEON CRT')).toBeInTheDocument()
  })

  it('FlatDesignDemo renders flat design blocks', () => {
    render(<FlatDesignDemo />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})

describe('GenericStyleDemo', () => {
  const baseStyle: UIStyle = {
    id: 99,
    nameEn: 'Custom Style',
    nameZh: '自定义风格',
    type: 'General',
    keywords: [],
    primaryColors: '#6366f1',
    secondaryColors: '',
    effects: '',
    bestFor: '',
    doNotUseFor: '',
    lightMode: '',
    darkMode: '',
    performance: '',
    accessibility: '',
    mobileFriendly: '',
    conversionFocused: '',
    frameworkCompat: '',
    era: '',
    complexity: '',
    promptEn: '',
    promptZh: '',
    cssKeywords: '',
    implementationChecklist: [],
    designVariables: '',
  }

  it('renders Chinese name as heading', () => {
    render(<GenericStyleDemo style={baseStyle} />)
    expect(screen.getByText('自定义风格')).toBeInTheDocument()
  })

  it('renders a button element', () => {
    render(<GenericStyleDemo style={baseStyle} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders type and complexity info', () => {
    render(<GenericStyleDemo style={baseStyle} />)
    expect(screen.getByText('General · Standard')).toBeInTheDocument()
  })

  it('uses hex color from primaryColors for heading', () => {
    render(<GenericStyleDemo style={baseStyle} />)
    const heading = screen.getByText('自定义风格')
    expect(heading).toHaveStyle({ color: '#6366f1' })
  })

  it('uses fallback color when no hex found', () => {
    const styleNoColor = { ...baseStyle, primaryColors: 'no color here' }
    render(<GenericStyleDemo style={styleNoColor} />)
    const heading = screen.getByText('自定义风格')
    expect(heading).toHaveStyle({ color: '#6366f1' })
  })

  it('applies border-radius from cssKeywords', () => {
    const styleWithRadius = { ...baseStyle, cssKeywords: 'border-radius: 20px; color: red;' }
    const { container } = render(<GenericStyleDemo style={styleWithRadius} />)
    const card = container.querySelector('[style*="border-radius: 20px"]')
    expect(card).not.toBeNull()
  })

  it('applies box-shadow from cssKeywords', () => {
    const styleWithShadow = { ...baseStyle, cssKeywords: 'box-shadow: 0 8px 24px rgba(0,0,0,0.2);' }
    const { container } = render(<GenericStyleDemo style={styleWithShadow} />)
    const card = container.querySelector('[style*="box-shadow"]')
    expect(card).not.toBeNull()
  })

  it('shows gradient button for high complexity styles', () => {
    const complexStyle = { ...baseStyle, complexity: 'High' }
    render(<GenericStyleDemo style={complexStyle} />)
    expect(screen.getByRole('button', { name: '探索' })).toBeInTheDocument()
  })

  it('shows simple button for normal complexity styles', () => {
    render(<GenericStyleDemo style={baseStyle} />)
    expect(screen.getByRole('button', { name: '查看' })).toBeInTheDocument()
  })

  it('renders with multiple hex colors from primaryColors', () => {
    const multiColorStyle = { ...baseStyle, primaryColors: '#ff6b6b and #4ecdc4' }
    render(<GenericStyleDemo style={multiColorStyle} />)
    const heading = screen.getByText('自定义风格')
    expect(heading).toHaveStyle({ color: '#ff6b6b' })
  })
})
