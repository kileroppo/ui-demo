import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StyleDetail } from '../../components/StyleDetail'
import type { UIStyle } from '../../data/types'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Glassmorphism',
  nameZh: '玻璃拟态',
  type: 'General',
  keywords: ['Frosted glass', 'transparent'],
  primaryColors: 'Translucent white',
  secondaryColors: 'Electric Blue',
  effects: 'Backdrop blur',
  bestFor: 'Modern SaaS',
  doNotUseFor: 'Low-contrast backgrounds',
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
  promptZh: '请设计一个玻璃拟态界面。使用：毛玻璃效果。',
  cssKeywords: 'backdrop-filter: blur(15px)',
  implementationChecklist: ['Blur 10-20px', 'Opacity 15-30%'],
  designVariables: '--blur: 15px',
}

describe('StyleDetail', () => {
  it('renders Chinese name as heading', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('玻璃拟态')).toBeInTheDocument()
  })

  it('renders English name', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('Glassmorphism')).toBeInTheDocument()
  })

  it('renders Chinese prompt', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('请设计一个玻璃拟态界面。使用：毛玻璃效果。')).toBeInTheDocument()
  })

  it('renders AI prompt section header', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('AI 提示词')).toBeInTheDocument()
  })

  it('renders keywords', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('Frosted glass')).toBeInTheDocument()
    expect(screen.getByText('transparent')).toBeInTheDocument()
  })

  it('renders color info', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('Translucent white')).toBeInTheDocument()
    expect(screen.getByText('Electric Blue')).toBeInTheDocument()
  })

  it('renders best for and avoid', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('Modern SaaS')).toBeInTheDocument()
    expect(screen.getByText('Low-contrast backgrounds')).toBeInTheDocument()
  })

  it('renders implementation checklist', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('Blur 10-20px')).toBeInTheDocument()
    expect(screen.getByText('Opacity 15-30%')).toBeInTheDocument()
  })

  it('renders CSS keywords', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('backdrop-filter: blur(15px)')).toBeInTheDocument()
  })

  it('renders ratings section', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('性能')).toBeInTheDocument()
    expect(screen.getByText('无障碍')).toBeInTheDocument()
    expect(screen.getByText('移动端')).toBeInTheDocument()
    expect(screen.getByText('转化率')).toBeInTheDocument()
  })

  it('renders type and complexity badges', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
  })

  it('renders copy button', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByText('复制提示词')).toBeInTheDocument()
  })
})
