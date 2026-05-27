import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StyleDemo } from '../../components/StyleDemo'
import type { UIStyle } from '../../data/types'

const createStyle = (nameEn: string, nameZh: string): UIStyle => ({
  id: 1,
  nameEn,
  nameZh,
  type: 'General',
  keywords: [],
  primaryColors: '#000000',
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
})

describe('StyleDemo', () => {
  it('renders GlassmorphismDemo for Glassmorphism style', () => {
    render(<StyleDemo style={createStyle('Glassmorphism', '玻璃拟态')} />)
    expect(screen.getByText('Frosted Glass')).toBeInTheDocument()
  })

  it('renders NeumorphismDemo for Neumorphism style', () => {
    render(<StyleDemo style={createStyle('Neumorphism', '新拟态')} />)
    expect(screen.getByText('Soft UI')).toBeInTheDocument()
  })

  it('renders BrutalismDemo for Brutalism style', () => {
    render(<StyleDemo style={createStyle('Brutalism', '粗野主义')} />)
    expect(screen.getByText('RAW BLOCK')).toBeInTheDocument()
  })

  it('renders MinimalismDemo for Minimalism & Swiss Style', () => {
    render(<StyleDemo style={createStyle('Minimalism & Swiss Style', '极简主义')} />)
    expect(screen.getByText('Clean Design')).toBeInTheDocument()
  })

  it('renders DarkModeDemo for Dark Mode (OLED)', () => {
    render(<StyleDemo style={createStyle('Dark Mode (OLED)', '深色模式')} />)
    expect(screen.getByText('OLED Dark')).toBeInTheDocument()
  })

  it('renders VibrantBlockDemo for Vibrant & Block-based', () => {
    render(<StyleDemo style={createStyle('Vibrant & Block-based', '活力色块')} />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('renders AuroraDemo for Aurora UI', () => {
    render(<StyleDemo style={createStyle('Aurora UI', '极光界面')} />)
    expect(screen.getByText('Aurora Flow')).toBeInTheDocument()
  })

  it('renders ClaymorphismDemo for Claymorphism', () => {
    render(<StyleDemo style={createStyle('Claymorphism', '粘土拟态')} />)
    expect(screen.getByText('Clay')).toBeInTheDocument()
  })

  it('renders RetroFuturismDemo for Retro-Futurism', () => {
    render(<StyleDemo style={createStyle('Retro-Futurism', '复古未来')} />)
    expect(screen.getByText('NEON CRT')).toBeInTheDocument()
  })

  it('renders FlatDesignDemo for Flat Design', () => {
    render(<StyleDemo style={createStyle('Flat Design', '扁平设计')} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders GenericStyleDemo for unknown styles', () => {
    render(<StyleDemo style={createStyle('Unknown Style', '未知风格')} />)
    expect(screen.getByText('未知风格')).toBeInTheDocument()
  })
})
