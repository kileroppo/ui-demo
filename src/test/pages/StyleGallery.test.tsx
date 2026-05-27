import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { StyleGallery } from '../../pages/StyleGallery'

describe('StyleGallery', () => {
  it('renders page heading', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByText('风格库')).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/搜索风格/)).toBeInTheDocument()
  })

  it('renders filter panel', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('按类别筛选')).toBeInTheDocument()
  })

  it('shows result count', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByText(/显示.*种风格/)).toBeInTheDocument()
  })

  it('filters results when search is typed', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/搜索风格/)
    await user.type(input, 'zzz_nomatch')
    await waitFor(() => {
      expect(screen.getByText(/未找到/)).toBeInTheDocument()
    })
  })

  it('respects URL category parameter', () => {
    render(
      <MemoryRouter initialEntries={['/styles?category=General']}>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByText(/显示.*种风格/)).toBeInTheDocument()
  })

  it('shows page description', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByText(/浏览全部.*种 UI 设计风格/)).toBeInTheDocument()
  })

  it('shows category counts in filter options', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    const select = screen.getByLabelText('按类别筛选')
    expect(select).toBeInTheDocument()
    // Category counts should be displayed
    expect(select.innerHTML).toContain('(')
  })

  it('shows clear filter button when filter is active', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )

    const select = screen.getByLabelText('按类别筛选')
    await user.selectOptions(select, 'General')
    expect(screen.getByText('清除筛选')).toBeInTheDocument()
  })
})
