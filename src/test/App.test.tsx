import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App, SkeletonLoading } from '../App'

describe('App', () => {
  beforeEach(() => {
    const MockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {})
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('UI 风格库')).toBeInTheDocument()
  })

  it('renders home page by default', () => {
    render(<App />)
    const gradientTexts = screen.getAllByText('设计风格')
    expect(gradientTexts.length).toBeGreaterThan(0)
    expect(screen.getByText(/发现你的下一个/)).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<App />)
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0)
    expect(screen.getAllByText('风格库').length).toBeGreaterThan(0)
    expect(screen.getAllByText('产品推荐').length).toBeGreaterThan(0)
    expect(screen.getAllByText('关于').length).toBeGreaterThan(0)
  })

  it('lazy loads the style gallery page', async () => {
    render(
      <MemoryRouter initialEntries={['/styles']}>
        <TestApp />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('风格库')).toBeInTheDocument()
    })
  })

  it('lazy loads the about page', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <TestApp />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('关于')).toBeInTheDocument()
    })
  })

  it('lazy loads the product gallery page', async () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <TestApp />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('产品推荐')).toBeInTheDocument()
    })
  })

  it('lazy loads a style detail page', async () => {
    render(
      <MemoryRouter initialEntries={['/styles/1']}>
        <TestApp />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText('AI 提示词')).toBeInTheDocument()
    })
  })
})

describe('SkeletonLoading', () => {
  it('renders 6 skeleton cards', () => {
    const { container } = render(<SkeletonLoading />)
    const skeletonCards = container.querySelectorAll('.skeleton')
    expect(skeletonCards).toHaveLength(6)
  })

  it('has loading role and aria-label', () => {
    render(<SkeletonLoading />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByLabelText('加载中')).toBeInTheDocument()
  })

  it('skeleton cards have proper styling classes', () => {
    const { container } = render(<SkeletonLoading />)
    const firstCard = container.querySelector('.skeleton')
    expect(firstCard).toHaveClass('h-48')
    expect(firstCard).toHaveClass('rounded-xl')
  })
})

// Test component that uses the same lazy routes but within a provided router
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { PageTransition } from '../components/PageTransition'
import { BackToTop } from '../components/BackToTop'
import { HomePage } from '../pages/HomePage'

const StyleGallery = lazy(() =>
  import('../pages/StyleGallery').then((m) => ({ default: m.StyleGallery }))
)
const StyleDetailPage = lazy(() =>
  import('../pages/StyleDetailPage').then((m) => ({ default: m.StyleDetailPage }))
)
const ProductGallery = lazy(() =>
  import('../pages/ProductGallery').then((m) => ({ default: m.ProductGallery }))
)
const About = lazy(() =>
  import('../pages/About').then((m) => ({ default: m.About }))
)

function TestApp() {
  return (
    <Layout>
      <Suspense fallback={<SkeletonLoading />}>
        <PageTransition transitionKey="test">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/styles" element={<StyleGallery />} />
            <Route path="/styles/:id" element={<StyleDetailPage />} />
            <Route path="/products" element={<ProductGallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <BackToTop />
    </Layout>
  )
}
