import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterPanel } from '../../components/FilterPanel'

const defaultProps = {
  filters: {},
  onChange: vi.fn(),
  categories: ['General', 'Landing Page', 'E-commerce'],
  performanceRatings: ['Excellent', 'Good', 'Poor'],
  accessibilityRatings: ['WCAG AAA', 'WCAG AA', 'Low'],
}

describe('FilterPanel', () => {
  it('renders category select', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByLabelText('按类别筛选')).toBeInTheDocument()
  })

  it('renders performance select', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByLabelText('按性能筛选')).toBeInTheDocument()
  })

  it('renders accessibility select', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByLabelText('按无障碍等级筛选')).toBeInTheDocument()
  })

  it('renders all category options', () => {
    render(<FilterPanel {...defaultProps} />)
    const select = screen.getByLabelText('按类别筛选')
    expect(select).toContainHTML('General')
    expect(select).toContainHTML('Landing Page')
    expect(select).toContainHTML('E-commerce')
  })

  it('calls onChange when category is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} onChange={onChange} />)

    await user.selectOptions(screen.getByLabelText('按类别筛选'), 'General')
    expect(onChange).toHaveBeenCalledWith({ category: 'General' })
  })

  it('calls onChange when performance is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} onChange={onChange} />)

    await user.selectOptions(screen.getByLabelText('按性能筛选'), 'Excellent')
    expect(onChange).toHaveBeenCalledWith({ performance: 'Excellent' })
  })

  it('calls onChange when accessibility is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} onChange={onChange} />)

    await user.selectOptions(screen.getByLabelText('按无障碍等级筛选'), 'WCAG AAA')
    expect(onChange).toHaveBeenCalledWith({ accessibility: 'WCAG AAA' })
  })

  it('shows clear button when filters are active', () => {
    render(<FilterPanel {...defaultProps} filters={{ category: 'General' }} />)
    expect(screen.getByText('清除筛选')).toBeInTheDocument()
  })

  it('does not show clear button when no filters', () => {
    render(<FilterPanel {...defaultProps} filters={{}} />)
    expect(screen.queryByText('清除筛选')).not.toBeInTheDocument()
  })

  it('calls onChange with empty object on clear', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} filters={{ category: 'General' }} onChange={onChange} />)

    await user.click(screen.getByText('清除筛选'))
    expect(onChange).toHaveBeenCalledWith({})
  })
})
