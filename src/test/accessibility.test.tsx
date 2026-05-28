import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { HomePage } from '../pages/HomePage'
import { StyleGallery } from '../pages/StyleGallery'
import { About } from '../pages/About'
import { StyleAdvisor } from '../pages/StyleAdvisor'
import { ComparePage } from '../pages/ComparePage'
import { ProductGallery } from '../pages/ProductGallery'

describe('Accessibility', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
    } as MediaQueryList)
    const MockIntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('skip-to-content link', () => {
    it('exists in Layout', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      const skipLink = screen.getByText('跳转到主要内容')
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })
  })

  describe('ARIA landmarks', () => {
    it('has banner role on header', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('has main role on main content', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('has contentinfo role on footer', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  describe('navigation accessible names', () => {
    it('desktop nav has accessible name', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      expect(screen.getByLabelText('主导航')).toBeInTheDocument()
    })

    it('all nav links have text content', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      const nav = screen.getByLabelText('主导航')
      const links = nav.querySelectorAll('a')
      links.forEach((link) => {
        expect(link.textContent?.trim().length).toBeGreaterThan(0)
      })
    })
  })

  describe('aria-live regions', () => {
    it('StyleGallery results count has aria-live', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      const liveRegion = screen.getByText(/显示.*种风格/)
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })

    it('ProductGallery results count has aria-live', () => {
      render(
        <MemoryRouter>
          <ProductGallery />
        </MemoryRouter>
      )
      const liveRegion = screen.getByText(/显示.*种产品类型/)
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('heading hierarchy', () => {
    it('HomePage has exactly one h1', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      )
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)
    })

    it('StyleGallery has exactly one h1', () => {
      render(
        <MemoryRouter>
          <StyleGallery />
        </MemoryRouter>
      )
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)
    })

    it('About page has exactly one h1', () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>
      )
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)
    })

    it('StyleAdvisor has exactly one h1', () => {
      render(
        <MemoryRouter>
          <StyleAdvisor />
        </MemoryRouter>
      )
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)
    })

    it('ComparePage has h1 in empty state', () => {
      render(
        <MemoryRouter initialEntries={['/compare']}>
          <ComparePage />
        </MemoryRouter>
      )
      const headings = screen.getAllByRole('heading', { level: 1 })
      expect(headings).toHaveLength(1)
    })

    it('About page h2s appear after h1', () => {
      const { container } = render(
        <MemoryRouter>
          <About />
        </MemoryRouter>
      )
      const allHeadings = container.querySelectorAll('h1, h2, h3')
      const levels = Array.from(allHeadings).map((h) => parseInt(h.tagName[1]))
      // First heading should be h1
      expect(levels[0]).toBe(1)
      // No heading should jump more than 1 level
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
      }
    })

    it('StyleAdvisor has proper h2 below h1', () => {
      const { container } = render(
        <MemoryRouter>
          <StyleAdvisor />
        </MemoryRouter>
      )
      const allHeadings = container.querySelectorAll('h1, h2, h3')
      const levels = Array.from(allHeadings).map((h) => parseInt(h.tagName[1]))
      expect(levels[0]).toBe(1)
      // All subsequent headings are h2 or h3
      levels.slice(1).forEach((level) => {
        expect(level).toBeGreaterThanOrEqual(2)
      })
    })
  })

  describe('interactive element accessibility', () => {
    it('dark mode toggle has aria-label', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      const toggles = screen.getAllByLabelText('切换到深色模式')
      expect(toggles.length).toBeGreaterThan(0)
    })

    it('mobile menu button has aria-label and aria-expanded', () => {
      render(
        <MemoryRouter>
          <Layout><div>content</div></Layout>
        </MemoryRouter>
      )
      const menuButton = screen.getByLabelText('打开菜单')
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
