import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExportModal } from '../../components/ExportModal'
import type { UIStyle } from '../../data/types'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Minimalism & Swiss Style',
  nameZh: '极简主义',
  type: 'General',
  keywords: ['Clean', 'simple'],
  primaryColors: 'Black #000000, White #FFFFFF',
  secondaryColors: 'Beige #F5F1E8',
  effects: 'Subtle hover, smooth transitions',
  bestFor: 'Enterprise apps',
  doNotUseFor: 'Creative portfolios',
  lightMode: '✓ Full',
  darkMode: '✓ Full',
  performance: '⚡ Excellent',
  accessibility: '✓ WCAG AAA',
  mobileFriendly: '✓ High',
  conversionFocused: '◐ Medium',
  frameworkCompat: 'Tailwind 10/10',
  era: '1950s Swiss',
  complexity: 'Low',
  promptEn: 'Design a minimalist page.',
  promptZh: '请设计一个极简主义界面。',
  cssKeywords: 'display: grid, gap: 2rem',
  implementationChecklist: ['Grid layout'],
  designVariables: '--spacing: 2rem, --border-radius: 0px',
}

describe('ExportModal', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    // Mock URL methods
    window.URL.createObjectURL = vi.fn().mockReturnValue('blob:test')
    window.URL.revokeObjectURL = vi.fn()
  })

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <ExportModal style={mockStyle} isOpen={false} onClose={vi.fn()} />
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders modal when isOpen is true', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('导出设计方案')).toBeInTheDocument()
  })

  it('shows style name in preview', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText(/极简主义.*Minimalism/)).toBeInTheDocument()
  })

  it('shows CSS keywords in preview', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText(/display: grid/)).toBeInTheDocument()
  })

  it('has Export CSS button', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText('Export CSS')).toBeInTheDocument()
  })

  it('has Export Markdown button', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText('Export Markdown')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<ExportModal style={mockStyle} isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('关闭'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(<ExportModal style={mockStyle} isOpen={true} onClose={onClose} />)
    const backdrop = screen.getByRole('dialog')
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not close when modal content is clicked', () => {
    const onClose = vi.fn()
    render(<ExportModal style={mockStyle} isOpen={true} onClose={onClose} />)
    const title = screen.getByText('导出设计方案')
    fireEvent.click(title)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('closes on Escape key', () => {
    const onClose = vi.fn()
    render(<ExportModal style={mockStyle} isOpen={true} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('triggers CSS download on Export CSS click', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)

    const mockClick = vi.fn()
    const origCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        const el = origCreateElement('a')
        el.click = mockClick
        return el
      }
      return origCreateElement(tag)
    })

    fireEvent.click(screen.getByText('Export CSS'))
    expect(mockClick).toHaveBeenCalled()
  })

  it('triggers Markdown download on Export Markdown click', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)

    const mockClick = vi.fn()
    const origCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') {
        const el = origCreateElement('a')
        el.click = mockClick
        return el
      }
      return origCreateElement(tag)
    })

    fireEvent.click(screen.getByText('Export Markdown'))
    expect(mockClick).toHaveBeenCalled()
  })

  it('has aria-modal attribute', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('renders color swatches for primary colors', () => {
    render(<ExportModal style={mockStyle} isOpen={true} onClose={vi.fn()} />)
    const swatches = screen.getByRole('dialog').querySelectorAll('[title]')
    const titles = Array.from(swatches).map((el) => el.getAttribute('title'))
    expect(titles).toContain('#000000')
    expect(titles).toContain('#FFFFFF')
  })
})
