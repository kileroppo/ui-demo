import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { StyleListItem } from '../../components/StyleListItem'
import type { UIStyle } from '../../data/types'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Glassmorphism',
  nameZh: '玻璃拟态',
  type: 'General',
  keywords: ['透明', '模糊', '光泽', '现代'],
  primaryColors: '#ffffff',
  secondaryColors: '#e0e0e0',
  effects: 'blur, transparency',
  bestFor: 'Modern dashboards',
  doNotUseFor: 'Text-heavy content',
  lightMode: 'Yes',
  darkMode: 'Yes',
  performance: 'Good',
  accessibility: 'WCAG AA',
  mobileFriendly: 'Yes',
  conversionFocused: 'Medium',
  frameworkCompat: 'All',
  era: '2020s',
  complexity: 'Medium',
  promptEn: 'Glassmorphism UI style',
  promptZh: '玻璃拟态 UI 风格',
  cssKeywords: 'backdrop-filter, blur',
  implementationChecklist: ['Add blur effect'],
  designVariables: '--glass-opacity: 0.3',
}

describe('StyleListItem', () => {
  it('renders style name', () => {
    render(
      <MemoryRouter>
        <StyleListItem style={mockStyle} />
      </MemoryRouter>
    )
    expect(screen.getByText('玻璃拟态')).toBeInTheDocument()
  })

  it('renders category', () => {
    render(
      <MemoryRouter>
        <StyleListItem style={mockStyle} />
      </MemoryRouter>
    )
    expect(screen.getByText('General')).toBeInTheDocument()
  })

  it('renders keywords (max 3)', () => {
    render(
      <MemoryRouter>
        <StyleListItem style={mockStyle} />
      </MemoryRouter>
    )
    expect(screen.getByText('透明')).toBeInTheDocument()
    expect(screen.getByText('模糊')).toBeInTheDocument()
    expect(screen.getByText('光泽')).toBeInTheDocument()
    expect(screen.queryByText('现代')).not.toBeInTheDocument()
  })

  it('renders performance badge', () => {
    render(
      <MemoryRouter>
        <StyleListItem style={mockStyle} />
      </MemoryRouter>
    )
    expect(screen.getByText('Good')).toBeInTheDocument()
  })

  it('links to correct detail page', () => {
    render(
      <MemoryRouter>
        <StyleListItem style={mockStyle} />
      </MemoryRouter>
    )
    const link = screen.getByLabelText('查看玻璃拟态风格详情')
    expect(link).toHaveAttribute('href', '/styles/1')
  })

  it('renders copy button', () => {
    render(
      <MemoryRouter>
        <StyleListItem style={mockStyle} />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('复制提示词')).toBeInTheDocument()
  })
})
