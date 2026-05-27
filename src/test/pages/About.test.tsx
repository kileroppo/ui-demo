import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from '../../pages/About'

describe('About', () => {
  it('renders page heading', () => {
    render(<About />)
    expect(screen.getByText('关于')).toBeInTheDocument()
  })

  it('renders what is section', () => {
    render(<About />)
    expect(screen.getByText('什么是 UI 风格展示库？')).toBeInTheDocument()
  })

  it('renders features section', () => {
    render(<About />)
    expect(screen.getByText('功能特色')).toBeInTheDocument()
  })

  it('renders use cases section', () => {
    render(<About />)
    expect(screen.getByText('适用场景')).toBeInTheDocument()
  })

  it('renders data source section', () => {
    render(<About />)
    expect(screen.getByText('数据来源')).toBeInTheDocument()
  })

  it('lists feature items', () => {
    render(<About />)
    expect(screen.getByText(/实时 CSS 风格演示/)).toBeInTheDocument()
    expect(screen.getByText(/中英双语搜索/)).toBeInTheDocument()
  })
})
