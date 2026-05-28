import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  // Tabbed prompt tests
  it('renders 3 prompt tabs', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    expect(screen.getByRole('tab', { name: 'UI 设计' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '图片生成' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '代码生成' })).toBeInTheDocument()
  })

  it('UI 设计 tab is active by default', () => {
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)
    const uiTab = screen.getByRole('tab', { name: 'UI 设计' })
    expect(uiTab).toHaveAttribute('aria-selected', 'true')
  })

  it('clicking tabs switches content', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)

    // Default: UI Design content contains the base prompt
    const panel = screen.getByRole('tabpanel')
    expect(panel.textContent).toContain('请设计一个玻璃拟态界面')

    // Click image gen tab
    await user.click(screen.getByRole('tab', { name: '图片生成' }))
    const imagePanel = screen.getByRole('tabpanel')
    expect(imagePanel.textContent).toContain('生成一张')
    expect(imagePanel.textContent).toContain('色彩')

    // Click code gen tab
    await user.click(screen.getByRole('tab', { name: '代码生成' }))
    const codePanel = screen.getByRole('tabpanel')
    expect(codePanel.textContent).toContain('请用')
    expect(codePanel.textContent).toContain('backdrop-filter')
  })

  it('each tab has a copy button', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)

    // UI design tab has copy button
    expect(screen.getByText('复制提示词')).toBeInTheDocument()

    // Image gen tab
    await user.click(screen.getByRole('tab', { name: '图片生成' }))
    expect(screen.getByText('复制提示词')).toBeInTheDocument()

    // Code gen tab
    await user.click(screen.getByRole('tab', { name: '代码生成' }))
    expect(screen.getByText('复制提示词')).toBeInTheDocument()
  })

  it('content differs between tabs', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><StyleDetail style={mockStyle} /></MemoryRouter>)

    const getContent = () => screen.getByRole('tabpanel').textContent

    const uiContent = getContent()

    await user.click(screen.getByRole('tab', { name: '图片生成' }))
    const imageContent = getContent()

    await user.click(screen.getByRole('tab', { name: '代码生成' }))
    const codeContent = getContent()

    expect(uiContent).not.toBe(imageContent)
    expect(imageContent).not.toBe(codeContent)
    expect(uiContent).not.toBe(codeContent)
  })
})
