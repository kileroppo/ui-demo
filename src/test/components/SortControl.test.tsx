import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SortControl, SORT_OPTIONS } from '../../components/SortControl'

describe('SortControl', () => {
  it('renders all sort option buttons', () => {
    render(<SortControl value="default" onChange={vi.fn()} />)
    SORT_OPTIONS.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument()
    })
  })

  it('renders a group with accessible label', () => {
    render(<SortControl value="default" onChange={vi.fn()} />)
    expect(screen.getByRole('group', { name: '排序方式' })).toBeInTheDocument()
  })

  it('calls onChange when a sort option is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SortControl value="default" onChange={onChange} />)

    await user.click(screen.getByText('名称 A-Z'))
    expect(onChange).toHaveBeenCalledWith('name-asc')
  })

  it('calls onChange with complexity-asc', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SortControl value="default" onChange={onChange} />)

    await user.click(screen.getByText('复杂度: 低→高'))
    expect(onChange).toHaveBeenCalledWith('complexity-asc')
  })

  it('active sort option has indigo styling', () => {
    render(<SortControl value="name-asc" onChange={vi.fn()} />)
    const activeChip = screen.getByText('名称 A-Z')
    expect(activeChip.className).toContain('bg-indigo-100')
    expect(activeChip.className).toContain('text-indigo-700')
  })

  it('inactive sort options have gray styling', () => {
    render(<SortControl value="default" onChange={vi.fn()} />)
    const inactiveChip = screen.getByText('名称 A-Z')
    expect(inactiveChip.className).toContain('bg-gray-100')
    expect(inactiveChip.className).toContain('text-gray-600')
  })

  it('sets aria-pressed on active option', () => {
    render(<SortControl value="name-desc" onChange={vi.fn()} />)
    expect(screen.getByText('名称 Z-A')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('默认')).toHaveAttribute('aria-pressed', 'false')
  })
})
