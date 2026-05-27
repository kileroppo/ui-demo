import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NeubrutalismDemo } from '../../components/demos/NeubrutalismDemo'
import { BentoGridDemo } from '../../components/demos/BentoGridDemo'
import { CyberpunkDemo } from '../../components/demos/CyberpunkDemo'
import { LiquidGlassDemo } from '../../components/demos/LiquidGlassDemo'
import { AIUINativeDemo } from '../../components/demos/AIUINativeDemo'

describe('NeubrutalismDemo', () => {
  it('renders heading text', () => {
    render(<NeubrutalismDemo />)
    expect(screen.getByText('Bold & Raw')).toBeInTheDocument()
  })

  it('renders a button with chunky styling', () => {
    render(<NeubrutalismDemo />)
    const button = screen.getByRole('button', { name: 'Click Me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({ border: '2px solid #000000' })
  })

  it('renders description text', () => {
    render(<NeubrutalismDemo />)
    expect(screen.getByText('No subtlety here.')).toBeInTheDocument()
  })
})

describe('BentoGridDemo', () => {
  it('renders grid cells with labels', () => {
    render(<BentoGridDemo />)
    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.getByText('Card')).toBeInTheDocument()
    expect(screen.getByText('Info')).toBeInTheDocument()
  })

  it('main cell spans 2 rows', () => {
    const { container } = render(<BentoGridDemo />)
    const mainCell = container.querySelector('[style*="grid-row"]')
    expect(mainCell).toHaveStyle({ gridRow: 'span 2' })
  })
})

describe('CyberpunkDemo', () => {
  it('renders terminal text', () => {
    render(<CyberpunkDemo />)
    expect(screen.getByText('> SYSTEM ONLINE')).toBeInTheDocument()
  })

  it('renders CYBER//PUNK heading', () => {
    render(<CyberpunkDemo />)
    expect(screen.getByText('CYBER//PUNK')).toBeInTheDocument()
  })

  it('renders version number', () => {
    render(<CyberpunkDemo />)
    expect(screen.getByText('v2.0.77')).toBeInTheDocument()
  })

  it('has dark background', () => {
    const { container } = render(<CyberpunkDemo />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ background: '#0a0a0a' })
  })
})

describe('LiquidGlassDemo', () => {
  it('renders heading', () => {
    render(<LiquidGlassDemo />)
    expect(screen.getByText('Liquid Glass')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<LiquidGlassDemo />)
    expect(screen.getByText('Iridescent surface')).toBeInTheDocument()
  })

  it('uses glass morphism styling with border-radius', () => {
    const { container } = render(<LiquidGlassDemo />)
    const glassCard = container.querySelector('[style*="border-radius: 16px"]')
    expect(glassCard).not.toBeNull()
  })
})

describe('AIUINativeDemo', () => {
  it('renders AI Assistant label', () => {
    render(<AIUINativeDemo />)
    expect(screen.getByText('AI Assistant')).toBeInTheDocument()
  })

  it('renders chat bubble message', () => {
    render(<AIUINativeDemo />)
    expect(screen.getByText('Hello! How can I help?')).toBeInTheDocument()
  })

  it('renders typing indicator dots', () => {
    const { container } = render(<AIUINativeDemo />)
    const indicator = container.querySelector('[aria-label="typing indicator"]')
    expect(indicator).not.toBeNull()
    const dots = indicator!.querySelectorAll('span')
    expect(dots.length).toBe(3)
  })

  it('has dark gradient background', () => {
    const { container } = render(<AIUINativeDemo />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle({ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #3730a3)' })
  })
})
