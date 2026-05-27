import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from '../../pages/About'

describe('About', () => {
  beforeEach(() => {
    const MockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders hero section with title', () => {
    render(<About />)
    expect(screen.getByText('为设计师和开发者打造')).toBeInTheDocument()
  })

  it('renders brand introduction section', () => {
    render(<About />)
    expect(screen.getByLabelText('品牌介绍')).toBeInTheDocument()
  })

  it('renders stats section with counters', () => {
    render(<About />)
    const statsSection = screen.getByLabelText('数据统计')
    expect(statsSection).toBeInTheDocument()
    expect(screen.getByLabelText('设计风格')).toBeInTheDocument()
    expect(screen.getByLabelText('产品类型')).toBeInTheDocument()
    expect(screen.getByLabelText('实时演示')).toBeInTheDocument()
  })

  it('renders 3 "how to use" steps', () => {
    render(<About />)
    expect(screen.getByLabelText('使用步骤')).toBeInTheDocument()
    expect(screen.getByText('浏览')).toBeInTheDocument()
    expect(screen.getByText('选择')).toBeInTheDocument()
    expect(screen.getByText('复制')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<About />)
    expect(screen.getByText(/浏览风格库/)).toBeInTheDocument()
    expect(screen.getByText(/选择最适合你项目的设计风格/)).toBeInTheDocument()
    expect(screen.getByText(/复制 AI 提示词/)).toBeInTheDocument()
  })

  it('renders tech credits section', () => {
    render(<About />)
    expect(screen.getByLabelText('技术信息')).toBeInTheDocument()
    expect(screen.getByText('技术栈')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
  })

  it('mentions data source', () => {
    render(<About />)
    expect(screen.getByText(/UI\/UX Pro Max/)).toBeInTheDocument()
  })

  it('renders how to use heading', () => {
    render(<About />)
    expect(screen.getByText('如何使用')).toBeInTheDocument()
  })
})
