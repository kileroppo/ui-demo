import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'

describe('HomePage', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/发现你的下一个/)).toBeInTheDocument()
    expect(screen.getByText('设计风格')).toBeInTheDocument()
  })

  it('renders description with style count', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/种主流 UI 设计风格/)).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/搜索风格/)).toBeInTheDocument()
  })

  it('renders featured styles section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('精选风格')).toBeInTheDocument()
  })

  it('renders view all link', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/查看全部/)).toBeInTheDocument()
  })

  it('shows search results when query is entered', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/搜索风格/)
    await user.type(input, 'Glassmorphism')
    await waitFor(() => {
      expect(screen.getByText(/搜索结果/)).toBeInTheDocument()
    })
  })

  it('renders category quick-links', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const nav = screen.getByLabelText('风格类别快速导航')
    expect(nav).toBeInTheDocument()
  })

  it('shows empty state when search has no results', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/搜索风格/)
    await user.type(input, 'zzz_nomatch_xyz')
    await waitFor(() => {
      expect(screen.getByText(/未找到/)).toBeInTheDocument()
    })
  })

  it('renders feature highlights', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('实时风格预览')).toBeInTheDocument()
    expect(screen.getByText('AI 提示词一键复制')).toBeInTheDocument()
    expect(screen.getByText('中英双语搜索')).toBeInTheDocument()
  })
})
