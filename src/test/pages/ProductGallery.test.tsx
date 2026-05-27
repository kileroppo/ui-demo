import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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
    expect(screen.getByLabelText('搜索风格')).toBeInTheDocument()
  })

  it('displays product cards with style links', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    const styleLinks = links.filter((l) => l.getAttribute('href')?.startsWith('/styles?q='))
    expect(styleLinks.length).toBeGreaterThan(0)
  })

  it('renders category sections with headers', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    // Should have category section headings
    const techSection = screen.getByLabelText(/Tech & SaaS 类别/)
    expect(techSection).toBeInTheDocument()
  })

  it('shows category count badges', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    // Category badges show counts as numbers
    const badges = document.querySelectorAll('.rounded-full.bg-indigo-50.text-indigo-600')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('renders category navigation when not searching', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('产品分类导航')).toBeInTheDocument()
  })

  it('filters products by search query', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('搜索风格')
    await user.type(input, 'zzz_nomatch_xyz')
    await waitFor(() => {
      expect(screen.getByText(/未找到/)).toBeInTheDocument()
    })
  })

  it('shows result count', () => {
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )
    expect(screen.getByText(/显示.*种产品类型/)).toBeInTheDocument()
  })

  it('search still works across categories', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProductGallery />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('搜索风格')
    await user.type(input, 'SaaS')
    await waitFor(() => {
      expect(screen.getByText(/显示/)).toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('shows suggestion chips when no results found', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <ProductGallery />
        </MemoryRouter>
      )

      const input = screen.getByLabelText('搜索风格')
      await user.type(input, 'zzz_nomatch_xyz')
      await waitFor(() => {
        expect(screen.getByText('试试：')).toBeInTheDocument()
      })
      expect(screen.getByRole('button', { name: '电商' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '社交' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '金融' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '医疗' })).toBeInTheDocument()
    })

    it('clicking a suggestion chip updates the search query', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <ProductGallery />
        </MemoryRouter>
      )

      const input = screen.getByLabelText('搜索风格')
      await user.type(input, 'zzz_nomatch_xyz')
      await waitFor(() => {
        expect(screen.getByRole('button', { name: '电商' })).toBeInTheDocument()
      })
      await user.click(screen.getByRole('button', { name: '电商' }))
      await waitFor(() => {
        expect(input).toHaveValue('电商')
      })
    })
  })
})
