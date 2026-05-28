import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { StyleGallery } from '../../pages/StyleGallery'

describe('StyleGallery', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
  })

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
    expect(screen.getByLabelText('搜索风格')).toBeInTheDocument()
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

    const input = screen.getByLabelText('搜索风格')
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

  describe('empty state', () => {
    it('shows suggestion chips when no results found', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      const input = screen.getByLabelText('搜索风格')
      await user.type(input, 'zzz_nomatch_xyz')
      await waitFor(() => {
        expect(screen.getByText('试试：')).toBeInTheDocument()
      })
      expect(screen.getByRole('button', { name: '玻璃拟态' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '极简主义' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '暗色模式' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '赛博朋克' })).toBeInTheDocument()
    })

    it('clicking a suggestion chip updates the search query', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      const input = screen.getByLabelText('搜索风格')
      await user.type(input, 'zzz_nomatch_xyz')
      await waitFor(() => {
        expect(screen.getByRole('button', { name: '玻璃拟态' })).toBeInTheDocument()
      })
      await user.click(screen.getByRole('button', { name: '玻璃拟态' }))
      await waitFor(() => {
        expect(input).toHaveValue('玻璃拟态')
      })
    })
  })

  describe('favorites filter', () => {
    it('renders favorites filter button', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByLabelText('我的收藏')).toBeInTheDocument()
    })

    it('shows favorites count in button when > 0', () => {
      localStorage.setItem('favorite-styles', JSON.stringify([1, 2]))
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByText(/我的收藏.*\(2\)/)).toBeInTheDocument()
    })

    it('filters to show only favorited styles when active', async () => {
      const user = userEvent.setup()
      localStorage.setItem('favorite-styles', JSON.stringify([1]))
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      const favButton = screen.getByLabelText('我的收藏')
      await user.click(favButton)

      await waitFor(() => {
        expect(screen.getByText(/显示 1 \//)).toBeInTheDocument()
      })
    })

    it('shows no results when favorites filter active but no favorites', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      const favButton = screen.getByLabelText('我的收藏')
      await user.click(favButton)

      await waitFor(() => {
        expect(screen.getByText(/显示 0 \//)).toBeInTheDocument()
      })
    })

    it('toggles favorites filter off on second click', async () => {
      const user = userEvent.setup()
      localStorage.setItem('favorite-styles', JSON.stringify([1]))
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      const favButton = screen.getByLabelText('我的收藏')
      await user.click(favButton)

      await waitFor(() => {
        expect(screen.getByText(/显示 1 \//)).toBeInTheDocument()
      })

      await user.click(favButton)

      await waitFor(() => {
        expect(screen.queryByText(/显示 1 \//)).not.toBeInTheDocument()
      })
    })
  })
})
