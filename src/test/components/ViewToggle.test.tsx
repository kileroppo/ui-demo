import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ViewToggle } from '../../components/ViewToggle'

describe('ViewToggle', () => {
  it('renders grid view button', () => {
    render(<ViewToggle value="grid" onChange={vi.fn()} />)
    expect(screen.getByLabelText('网格视图')).toBeInTheDocument()
  })

  it('renders list view button', () => {
    render(<ViewToggle value="grid" onChange={vi.fn()} />)
    expect(screen.getByLabelText('列表视图')).toBeInTheDocument()
  })

  it('renders a group with accessible label', () => {
    render(<ViewToggle value="grid" onChange={vi.fn()} />)
    expect(screen.getByRole('group', { name: '视图模式' })).toBeInTheDocument()
  })

  it('calls onChange with "list" when list button clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ViewToggle value="grid" onChange={onChange} />)

    await user.click(screen.getByLabelText('列表视图'))
    expect(onChange).toHaveBeenCalledWith('list')
  })

  it('calls onChange with "grid" when grid button clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ViewToggle value="list" onChange={onChange} />)

    await user.click(screen.getByLabelText('网格视图'))
    expect(onChange).toHaveBeenCalledWith('grid')
  })

  it('grid button has active styling when grid selected', () => {
    render(<ViewToggle value="grid" onChange={vi.fn()} />)
    const gridBtn = screen.getByLabelText('网格视图')
    expect(gridBtn.className).toContain('bg-indigo-100')
    expect(gridBtn.className).toContain('text-indigo-700')
  })

  it('list button has active styling when list selected', () => {
    render(<ViewToggle value="list" onChange={vi.fn()} />)
    const listBtn = screen.getByLabelText('列表视图')
    expect(listBtn.className).toContain('bg-indigo-100')
    expect(listBtn.className).toContain('text-indigo-700')
  })

  it('grid button has aria-pressed true when grid is active', () => {
    render(<ViewToggle value="grid" onChange={vi.fn()} />)
    expect(screen.getByLabelText('网格视图')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('列表视图')).toHaveAttribute('aria-pressed', 'false')
  })

  it('list button has aria-pressed true when list is active', () => {
    render(<ViewToggle value="list" onChange={vi.fn()} />)
    expect(screen.getByLabelText('列表视图')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('网格视图')).toHaveAttribute('aria-pressed', 'false')
  })
})
