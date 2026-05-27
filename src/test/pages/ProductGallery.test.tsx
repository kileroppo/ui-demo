import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductGallery } from '../../pages/ProductGallery'

describe('ProductGallery', () => {
  it('renders page heading', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    expect(screen.getByText('产品推荐')).toBeInTheDocument()
  })

  it('shows product count', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    expect(screen.getByText(/浏览.*种产品类型/)).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText('搜索风格... (支持中英文)')).toBeInTheDocument()
  })

  it('displays product cards', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    // Should show "推荐风格" labels
    const labels = screen.getAllByText('推荐风格')
    expect(labels.length).toBeGreaterThan(0)
  })

  it('filters products by search query', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText('搜索风格... (支持中英文)')
    await user.type(input, 'zzz_nomatch_xyz')
    expect(screen.getByText('没有找到匹配的产品类型')).toBeInTheDocument()
  })

  it('shows result count', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    expect(screen.getByText(/显示.*种产品类型/)).toBeInTheDocument()
  })
})
