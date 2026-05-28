import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CompareBar } from '../../components/CompareBar'
import { styles } from '../../data/styles'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('CompareBar', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('does not render when nothing selected', () => {
    const { container } = render(
      <MemoryRouter>
        <CompareBar selected={[]} styles={styles} onClear={vi.fn()} />
      </MemoryRouter>
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders when items are selected', () => {
    render(
      <MemoryRouter>
        <CompareBar selected={[1]} styles={styles} onClear={vi.fn()} />
      </MemoryRouter>
    )
    expect(screen.getByText('已选 1/3 个风格')).toBeInTheDocument()
  })

  it('shows selected style names', () => {
    render(
      <MemoryRouter>
        <CompareBar selected={[1, 2]} styles={styles} onClear={vi.fn()} />
      </MemoryRouter>
    )
    expect(screen.getByText('极简主义')).toBeInTheDocument()
    expect(screen.getByText('新拟态')).toBeInTheDocument()
    expect(screen.getByText('已选 2/3 个风格')).toBeInTheDocument()
  })

  it('clear button calls onClear', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(
      <MemoryRouter>
        <CompareBar selected={[1]} styles={styles} onClear={onClear} />
      </MemoryRouter>
    )
    await user.click(screen.getByLabelText('清除对比'))
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('compare button navigates to compare page', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <CompareBar selected={[1, 2]} styles={styles} onClear={vi.fn()} />
      </MemoryRouter>
    )
    await user.click(screen.getByText('开始对比'))
    expect(mockNavigate).toHaveBeenCalledWith('/compare?ids=1,2')
  })

  it('shows count for 3 items', () => {
    render(
      <MemoryRouter>
        <CompareBar selected={[1, 2, 3]} styles={styles} onClear={vi.fn()} />
      </MemoryRouter>
    )
    expect(screen.getByText('已选 3/3 个风格')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(
      <MemoryRouter>
        <CompareBar selected={[1]} styles={styles} onClear={vi.fn()} />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('对比选择栏')).toBeInTheDocument()
  })
})
