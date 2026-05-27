import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('UI 风格库')).toBeInTheDocument()
  })

  it('renders home page by default', () => {
    render(<App />)
    expect(screen.getByText('UI 风格展示库')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(<App />)
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0)
    expect(screen.getAllByText('风格库').length).toBeGreaterThan(0)
    expect(screen.getAllByText('产品推荐').length).toBeGreaterThan(0)
    expect(screen.getAllByText('关于').length).toBeGreaterThan(0)
  })
})
