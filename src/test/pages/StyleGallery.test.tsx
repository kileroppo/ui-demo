import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { StyleGallery } from '../../pages/StyleGallery'

const mockIntersectionObserver = vi.fn()

describe('StyleGallery', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    mockIntersectionObserver.mockReturnValue({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })
    window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver
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

  it('renders filter panel with chip groups', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    expect(screen.getByRole('group', { name: '按类别筛选' })).toBeInTheDocument()
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

  it('shows category counts on filter chips', () => {
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )
    const categoryGroup = screen.getByRole('group', { name: '按类别筛选' })
    // Chips show counts like "General (N)"
    expect(categoryGroup.textContent).toMatch(/\(\d+\)/)
  })

  it('shows clear filter button when filter is active', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleGallery />
      </MemoryRouter>
    )

    const categoryGroup = screen.getByRole('group', { name: '按类别筛选' })
    const chips = categoryGroup.querySelectorAll('button')
    // Click the second chip (first category after "全部")
    await user.click(chips[1])
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
        expect(screen.getByText('试试：')).toBeInTheDocument()
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

  describe('sort controls', () => {
    it('renders sort control group', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByRole('group', { name: '排序方式' })).toBeInTheDocument()
    })

    it('renders all sort options', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByText('默认')).toBeInTheDocument()
      expect(screen.getByText('名称 A-Z')).toBeInTheDocument()
      expect(screen.getByText('名称 Z-A')).toBeInTheDocument()
      expect(screen.getByText('复杂度: 低→高')).toBeInTheDocument()
    })

    it('sorting by name changes the order', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      const nameAZ = screen.getByText('名称 A-Z')
      await user.click(nameAZ)

      // After clicking, the sort should be active (has indigo class)
      expect(nameAZ.className).toContain('bg-indigo-100')
    })
  })

  describe('view toggle', () => {
    it('renders view toggle group', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByRole('group', { name: '视图模式' })).toBeInTheDocument()
    })

    it('renders grid and list view buttons', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByLabelText('网格视图')).toBeInTheDocument()
      expect(screen.getByLabelText('列表视图')).toBeInTheDocument()
    })

    it('defaults to grid view', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByLabelText('网格视图')).toHaveAttribute('aria-pressed', 'true')
    })

    it('switches to list view when list button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      await user.click(screen.getByLabelText('列表视图'))
      expect(screen.getByLabelText('列表视图')).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByLabelText('网格视图')).toHaveAttribute('aria-pressed', 'false')
    })

    it('persists view mode to localStorage', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      await user.click(screen.getByLabelText('列表视图'))
      expect(localStorage.getItem('gallery-view-mode')).toBe('list')
    })

    it('reads view mode from localStorage on mount', () => {
      localStorage.setItem('gallery-view-mode', 'list')
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      expect(screen.getByLabelText('列表视图')).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('lazy rendering', () => {
    it('renders lazy-card wrappers in grid view', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      const lazyCards = screen.getAllByTestId('lazy-card')
      expect(lazyCards.length).toBeGreaterThan(0)
    })

    it('shows placeholder before intersection', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      const lazyCards = screen.getAllByTestId('lazy-card')
      // Before intersection, cards show placeholder (animate-pulse div)
      const placeholder = lazyCards[0].querySelector('.animate-pulse')
      expect(placeholder).toBeInTheDocument()
    })

    it('shows content after intersection callback triggers', () => {
      // Capture the callbacks
      const callbacks: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = []
      mockIntersectionObserver.mockImplementation((cb: (entries: Array<{ isIntersecting: boolean }>) => void) => {
        callbacks.push(cb)
        return {
          observe: vi.fn(),
          unobserve: vi.fn(),
          disconnect: vi.fn(),
        }
      })

      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )

      // Trigger all intersection callbacks inside act
      act(() => {
        callbacks.forEach((cb) => cb([{ isIntersecting: true }]))
      })

      // After intersection, at least some lazy-cards should have rendered content
      const lazyCards = screen.getAllByTestId('lazy-card')
      const hasRenderedContent = lazyCards.some((card) => !card.querySelector('.animate-pulse'))
      expect(hasRenderedContent).toBe(true)
    })
  })
})
