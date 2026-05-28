import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ComparePage } from '../../pages/ComparePage'

describe('ComparePage', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('renders empty state when no styles selected', () => {
    render(
      <MemoryRouter initialEntries={['/compare']}>
        <ComparePage />
      </MemoryRouter>
    )
    expect(screen.getByText('未选择任何风格进行对比')).toBeInTheDocument()
    expect(screen.getByText('前往风格库')).toBeInTheDocument()
  })

  it('renders empty state with invalid ids', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=abc,xyz']}>
        <ComparePage />
      </MemoryRouter>
    )
    expect(screen.getByText('未选择任何风格进行对比')).toBeInTheDocument()
  })

  it('renders comparison columns for valid style ids', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=1,2']}>
        <ComparePage />
      </MemoryRouter>
    )
    expect(screen.getByText('风格对比')).toBeInTheDocument()
    expect(screen.getByText('极简主义')).toBeInTheDocument()
    expect(screen.getByText('新拟态')).toBeInTheDocument()
  })

  it('displays comparison row labels', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=1,2']}>
        <ComparePage />
      </MemoryRouter>
    )
    expect(screen.getByText('分类')).toBeInTheDocument()
    expect(screen.getByText('关键词')).toBeInTheDocument()
    expect(screen.getByText('主色')).toBeInTheDocument()
    expect(screen.getByText('性能')).toBeInTheDocument()
    expect(screen.getByText('无障碍')).toBeInTheDocument()
    expect(screen.getByText('移动友好')).toBeInTheDocument()
    expect(screen.getByText('复杂度')).toBeInTheDocument()
    expect(screen.getByText('适用于')).toBeInTheDocument()
    expect(screen.getByText('不适用于')).toBeInTheDocument()
    expect(screen.getByText('暗色模式')).toBeInTheDocument()
    expect(screen.getByText('时代')).toBeInTheDocument()
    expect(screen.getByText('AI 提示词')).toBeInTheDocument()
  })

  it('displays English name subtitle', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=1']}>
        <ComparePage />
      </MemoryRouter>
    )
    expect(screen.getByText('Minimalism & Swiss Style')).toBeInTheDocument()
  })

  it('renders copy buttons for prompt row', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=1']}>
        <ComparePage />
      </MemoryRouter>
    )
    const copyButtons = screen.getAllByLabelText('复制提示词')
    expect(copyButtons.length).toBeGreaterThan(0)
  })

  it('handles 3 styles in comparison', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=1,2,3']}>
        <ComparePage />
      </MemoryRouter>
    )
    expect(screen.getByText('对比 3 个风格的关键属性')).toBeInTheDocument()
  })

  it('links back to style gallery from empty state', () => {
    render(
      <MemoryRouter initialEntries={['/compare']}>
        <ComparePage />
      </MemoryRouter>
    )
    const link = screen.getByText('前往风格库')
    expect(link).toHaveAttribute('href', '/styles')
  })

  it('has links to individual style detail pages', () => {
    render(
      <MemoryRouter initialEntries={['/compare?ids=1']}>
        <ComparePage />
      </MemoryRouter>
    )
    const link = screen.getByText('极简主义')
    expect(link.closest('a')).toHaveAttribute('href', '/styles/1')
  })
})
