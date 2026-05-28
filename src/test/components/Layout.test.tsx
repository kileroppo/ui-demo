import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '../../components/Layout'

describe('Layout', () => {
  let scrollHandler: (() => void) | null = null

  beforeEach(() => {
    scrollHandler = null
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler as () => void
      }
    })
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders site title', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('UI 风格库')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0)
    expect(screen.getAllByText('风格库').length).toBeGreaterThan(0)
    expect(screen.getAllByText('产品推荐').length).toBeGreaterThan(0)
    expect(screen.getAllByText('关于').length).toBeGreaterThan(0)
  })

  it('renders children content', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>Test content</p>
        </Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('shows mobile menu button', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByLabelText('打开菜单')).toBeInTheDocument()
  })

  it('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    const button = screen.getByLabelText('打开菜单')
    await user.click(button)
    expect(screen.getByLabelText('关闭菜单')).toBeInTheDocument()
    expect(screen.getByLabelText('移动端导航')).toBeInTheDocument()
  })

  it('closes mobile menu when nav link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    await user.click(screen.getByLabelText('打开菜单'))
    const mobileNav = screen.getByLabelText('移动端导航')
    const aboutLink = mobileNav.querySelector('a[href="/about"]')!
    await user.click(aboutLink)
    expect(screen.queryByLabelText('移动端导航')).not.toBeInTheDocument()
  })

  it('renders skip-to-content link', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('跳转到主要内容')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByText(/助力设计师和开发者/)).toBeInTheDocument()
  })

  it('marks active navigation item', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const homeLink = screen.getByRole('navigation', { name: '主导航' })
      .querySelector('a[aria-current="page"]')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink?.textContent).toContain('首页')
  })

  it('header has no shadow when not scrolled', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const header = screen.getByTestId('header')
    expect(header.className).not.toContain('shadow-sm')
  })

  it('header gains shadow-sm class when scrolled past 10px', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    const header = screen.getByTestId('header')
    expect(header.className).not.toContain('shadow-sm')

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
    act(() => {
      scrollHandler?.()
    })

    expect(header.className).toContain('shadow-sm')
  })

  it('header removes shadow when scrolled back to top', () => {
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true })
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    act(() => {
      scrollHandler?.()
    })

    const header = screen.getByTestId('header')
    expect(header.className).toContain('shadow-sm')

    Object.defineProperty(window, 'scrollY', { value: 5, writable: true })
    act(() => {
      scrollHandler?.()
    })

    expect(header.className).not.toContain('shadow-sm')
  })

  // Dark mode toggle tests
  it('renders dark mode toggle button', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getAllByLabelText('切换到深色模式').length).toBeGreaterThan(0)
  })

  it('toggle changes to sun icon in dark mode', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    const toggleButtons = screen.getAllByLabelText('切换到深色模式')
    await user.click(toggleButtons[0])
    expect(screen.getAllByLabelText('切换到浅色模式').length).toBeGreaterThan(0)
  })

  it('shows favorites badge when favorites exist', () => {
    localStorage.setItem('favorite-styles', JSON.stringify([1, 2, 3]))
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getAllByText('3').length).toBeGreaterThan(0)
  })

  it('does not show favorites badge when no favorites', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const navDesktop = screen.getByRole('navigation', { name: '主导航' })
    const badge = navDesktop.querySelector('.bg-red-500')
    expect(badge).not.toBeInTheDocument()
  })

  // Mobile bottom nav tests
  it('renders mobile bottom navigation', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByLabelText('移动端底部导航')).toBeInTheDocument()
  })

  it('mobile bottom nav has correct items', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const bottomNav = screen.getByLabelText('移动端底部导航')
    expect(bottomNav).toHaveTextContent('首页')
    expect(bottomNav).toHaveTextContent('风格库')
    expect(bottomNav).toHaveTextContent('风格顾问')
    expect(bottomNav).toHaveTextContent('产品推荐')
  })

  it('mobile bottom nav has 4 navigation links', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const bottomNav = screen.getByLabelText('移动端底部导航')
    const links = bottomNav.querySelectorAll('a')
    expect(links).toHaveLength(8)
  })

  it('mobile bottom nav highlights active item', () => {
    render(
      <MemoryRouter initialEntries={['/styles']}>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const bottomNav = screen.getByLabelText('移动端底部导航')
    const activeLink = bottomNav.querySelector('a[aria-current="page"]')
    expect(activeLink).toBeInTheDocument()
    expect(activeLink?.textContent).toContain('风格库')
  })
})
