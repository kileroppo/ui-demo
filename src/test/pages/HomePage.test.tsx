import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'

describe('HomePage', () => {
  it('renders main heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('UI 风格展示库')).toBeInTheDocument()
  })

  it('renders description with style count', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText(/探索.*种界面设计风格/)).toBeInTheDocument()
  })

  it('renders search bar', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText('搜索风格... (支持中英文)')).toBeInTheDocument()
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
    expect(screen.getByText('查看全部')).toBeInTheDocument()
  })

  it('shows search results when query is entered', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText('搜索风格... (支持中英文)')
    await user.type(input, 'Glassmorphism')
    expect(screen.getByText(/搜索结果/)).toBeInTheDocument()
  })

  it('renders category quick-links', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    // Should have some category buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
