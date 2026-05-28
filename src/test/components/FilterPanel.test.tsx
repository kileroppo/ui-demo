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
  it('renders category chip group', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByRole('group', { name: '按类别筛选' })).toBeInTheDocument()
  })

  it('renders performance chip group', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByRole('group', { name: '按性能筛选' })).toBeInTheDocument()
  })

  it('renders accessibility chip group', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByRole('group', { name: '按无障碍等级筛选' })).toBeInTheDocument()
  })

  it('renders all category chips', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Landing Page')).toBeInTheDocument()
    expect(screen.getByText('E-commerce')).toBeInTheDocument()
  })

  it('renders all performance chips', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByText('Excellent')).toBeInTheDocument()
    expect(screen.getByText('Good')).toBeInTheDocument()
    expect(screen.getByText('Poor')).toBeInTheDocument()
  })

  it('renders all accessibility chips', () => {
    render(<FilterPanel {...defaultProps} />)
    expect(screen.getByText('WCAG AAA')).toBeInTheDocument()
    expect(screen.getByText('WCAG AA')).toBeInTheDocument()
  })

  it('renders "全部" chip in each group', () => {
    render(<FilterPanel {...defaultProps} />)
    const allChips = screen.getAllByText('全部')
    expect(allChips).toHaveLength(3)
  })

  it('calls onChange when a category chip is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} onChange={onChange} />)

    await user.click(screen.getByText('General'))
    expect(onChange).toHaveBeenCalledWith({ category: 'General' })
  })

  it('calls onChange when a performance chip is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} onChange={onChange} />)

    await user.click(screen.getByText('Excellent'))
    expect(onChange).toHaveBeenCalledWith({ performance: 'Excellent' })
  })

  it('calls onChange when an accessibility chip is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} onChange={onChange} />)

    await user.click(screen.getByText('WCAG AAA'))
    expect(onChange).toHaveBeenCalledWith({ accessibility: 'WCAG AAA' })
  })

  it('active category chip has indigo styling', () => {
    render(<FilterPanel {...defaultProps} filters={{ category: 'General' }} />)
    const chip = screen.getByText('General')
    expect(chip.className).toContain('bg-indigo-100')
    expect(chip.className).toContain('text-indigo-700')
  })

  it('"全部" chip is active when no filter is selected for group', () => {
    render(<FilterPanel {...defaultProps} />)
    const categoryGroup = screen.getByRole('group', { name: '按类别筛选' })
    const allChip = categoryGroup.querySelector('button')!
    expect(allChip.className).toContain('bg-indigo-100')
  })

  it('clicking "全部" chip clears the filter for that group', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterPanel {...defaultProps} filters={{ category: 'General' }} onChange={onChange} />)

    const categoryGroup = screen.getByRole('group', { name: '按类别筛选' })
    const allChips = categoryGroup.querySelectorAll('button')
    // The first button after the label is "全部"
    await user.click(allChips[0])
    expect(onChange).toHaveBeenCalledWith({ category: undefined })
  })

  it('shows category counts as badges on chips', () => {
    render(
      <FilterPanel
        {...defaultProps}
        categoryCounts={{ General: 42, 'Landing Page': 10, 'E-commerce': 5 }}
      />
    )
    expect(screen.getByText('General (42)')).toBeInTheDocument()
    expect(screen.getByText('Landing Page (10)')).toBeInTheDocument()
    expect(screen.getByText('E-commerce (5)')).toBeInTheDocument()
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
