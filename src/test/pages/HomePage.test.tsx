import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    const MockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('renders main heading with gradient text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/发现你的下一个/)).toBeInTheDocument()
    const heading = screen.getByText(/发现你的下一个/)
    const gradientSpan = heading.querySelector('.gradient-text')
    expect(gradientSpan).toBeInTheDocument()
    expect(gradientSpan).toHaveTextContent('设计风格')
  })

  it('renders description with style count', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/种精心收录的 UI 风格/)).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('搜索风格')).toBeInTheDocument()
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
    vi.useRealTimers()
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('搜索风格')
    await user.type(input, 'Glassmorphism')
    await waitFor(() => {
      expect(screen.getByText(/搜索结果/)).toBeInTheDocument()
    })
  })

  it('renders category quick-links with color dots', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const nav = screen.getByLabelText('风格类别快速导航')
    expect(nav).toBeInTheDocument()
    // Category buttons should have color dot indicators
    const dots = nav.querySelectorAll('span[aria-hidden="true"]')
    expect(dots.length).toBeGreaterThan(0)
  })

  it('shows empty state when search has no results', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('搜索风格')
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

  it('renders stats section with animated counters', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const statsSection = screen.getByLabelText('数据统计')
    expect(statsSection).toBeInTheDocument()
    expect(screen.getByLabelText('设计风格')).toBeInTheDocument()
    expect(screen.getByLabelText('产品类型')).toBeInTheDocument()
    expect(screen.getByLabelText('实时演示')).toBeInTheDocument()
  })

  it('has animated gradient background on hero section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const heading = screen.getByText(/发现你的下一个/)
    const heroSection = heading.closest('section')
    expect(heroSection).toHaveClass('gradient-bg-animated')
  })

  it('renders "Find My Style" CTA button that links to /styles', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    const cta = screen.getByRole('link', { name: /找到我的风格/ })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/advisor')
  })
})
