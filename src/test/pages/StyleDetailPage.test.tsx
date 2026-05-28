import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StyleDetailPage } from '../../pages/StyleDetailPage'

describe('StyleDetailPage', () => {
  it('renders style detail for valid id', () => {
    render(
      <MemoryRouter initialEntries={['/styles/1']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('AI 提示词')).toBeInTheDocument()
    // Breadcrumbs
    expect(screen.getByLabelText('面包屑导航')).toBeInTheDocument()
  })

  it('shows not found for invalid id', () => {
    render(
      <MemoryRouter initialEntries={['/styles/99999']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('未找到该风格')).toBeInTheDocument()
  })

  it('has back link to styles in breadcrumb', () => {
    render(
      <MemoryRouter initialEntries={['/styles/1']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    const stylesLink = links.find((l) => l.getAttribute('href') === '/styles')
    expect(stylesLink).toBeInTheDocument()
  })

  it('shows related styles section', () => {
    render(
      <MemoryRouter initialEntries={['/styles/1']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('相关风格')).toBeInTheDocument()
  })

  it('shows not-found helper text for invalid id', () => {
    render(
      <MemoryRouter initialEntries={['/styles/99999']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText(/该风格可能已被移除或链接无效/)).toBeInTheDocument()
  })

  it('shows return link on not found page', () => {
    render(
      <MemoryRouter initialEntries={['/styles/99999']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: /返回风格库/ })
    expect(link).toHaveAttribute('href', '/styles')
  })

  it('shows "Recommended For" section when style has matching products', () => {
    // Style 2 is "Glassmorphism" which is referenced by multiple products
    render(
      <MemoryRouter initialEntries={['/styles/2']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByLabelText('推荐用于')).toBeInTheDocument()
    expect(screen.getByText('推荐用于')).toBeInTheDocument()
  })

  it('product chips in recommended section are clickable links', () => {
    render(
      <MemoryRouter initialEntries={['/styles/2']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    const section = screen.getByLabelText('推荐用于')
    const links = section.querySelectorAll('a')
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => {
      expect(link.getAttribute('href')).toContain('/products')
    })
  })

  it('hides "Recommended For" section when no products match', () => {
    // Style ID 13 is "Skeuomorphism" which is not referenced by any product's
    // primaryStyle or secondaryStyles fields
    render(
      <MemoryRouter initialEntries={['/styles/13']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    // The section should not exist since no products reference this style
    expect(screen.queryByLabelText('推荐用于')).toBeNull()
  })

  // Previous / Next navigation tests
  it('renders previous and next navigation buttons', () => {
    render(
      <MemoryRouter initialEntries={['/styles/2']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('上一个')).toBeInTheDocument()
    expect(screen.getByText('下一个')).toBeInTheDocument()
  })

  it('prev/next link to correct adjacent styles', () => {
    render(
      <MemoryRouter initialEntries={['/styles/2']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    const prevLink = screen.getByText('上一个').closest('a')
    const nextLink = screen.getByText('下一个').closest('a')
    expect(prevLink).toHaveAttribute('href', '/styles/1')
    expect(nextLink).toHaveAttribute('href', '/styles/3')
  })

  it('first style has no previous button', () => {
    render(
      <MemoryRouter initialEntries={['/styles/1']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.queryByText('上一个')).not.toBeInTheDocument()
    expect(screen.getByText('下一个')).toBeInTheDocument()
  })

  it('renders adjacent style navigation section', () => {
    render(
      <MemoryRouter initialEntries={['/styles/3']}>
        <Routes>
          <Route path="/styles/:id" element={<StyleDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByLabelText('相邻风格导航')).toBeInTheDocument()
  })
})
