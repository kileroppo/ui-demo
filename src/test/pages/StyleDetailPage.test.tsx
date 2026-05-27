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
    // First style should be displayed
    expect(screen.getByText(/返回风格库/)).toBeInTheDocument()
    expect(screen.getByText('AI 提示词')).toBeInTheDocument()
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

  it('has back link to styles', () => {
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
