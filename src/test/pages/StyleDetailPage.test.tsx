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
})
