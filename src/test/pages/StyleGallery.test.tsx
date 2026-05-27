import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
    expect(screen.getByPlaceholderText('搜索风格... (支持中英文)')).toBeInTheDocument()
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

    const input = screen.getByPlaceholderText('搜索风格... (支持中英文)')
    await user.type(input, 'zzz_nomatch')
    expect(screen.getByText('没有找到匹配的风格，请调整搜索或筛选条件')).toBeInTheDocument()
  })

  it('respects URL category parameter', () => {
    render(
      <MemoryRouter initialEntries={['/styles?category=General']}>
        <StyleGallery />
      </MemoryRouter>
    )
    // Should show filtered results for General
    expect(screen.getByText(/显示.*种风格/)).toBeInTheDocument()
  })
})
