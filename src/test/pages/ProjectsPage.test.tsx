import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProjectsPage } from '../../pages/ProjectsPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>
  )
}

describe('ProjectsPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows empty state when no projects exist', () => {
    renderPage()
    expect(screen.getByText('暂无项目')).toBeInTheDocument()
  })

  it('shows page title', () => {
    renderPage()
    expect(screen.getByText('我的项目')).toBeInTheDocument()
  })

  it('shows create button', () => {
    renderPage()
    expect(screen.getByText('新建项目')).toBeInTheDocument()
  })

  it('opens create form when clicking new project button', () => {
    renderPage()
    fireEvent.click(screen.getByText('新建项目'))
    expect(screen.getByLabelText('项目名称')).toBeInTheDocument()
    expect(screen.getByLabelText('选择风格')).toBeInTheDocument()
  })

  it('creates a project via the form', () => {
    renderPage()
    fireEvent.click(screen.getByText('新建项目'))

    fireEvent.change(screen.getByLabelText('项目名称'), { target: { value: 'Test Project' } })
    fireEvent.change(screen.getByLabelText('颜色 (逗号分隔)'), { target: { value: '#FF0000, #00FF00' } })
    fireEvent.change(screen.getByLabelText('字体选择'), { target: { value: 'Inter' } })
    fireEvent.click(screen.getByText('创建'))

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.queryByText('暂无项目')).not.toBeInTheDocument()
  })

  it('displays project card with style name', () => {
    const projects = [
      { id: 'p1', name: 'My App', styleId: 1, colorPalette: ['#FF0000'], fontChoice: 'Inter', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    expect(screen.getByText('My App')).toBeInTheDocument()
    expect(screen.getByText(/风格:/)).toBeInTheDocument()
  })

  it('displays font choice on project card', () => {
    const projects = [
      { id: 'p2', name: 'Font App', styleId: 1, colorPalette: [], fontChoice: 'Roboto', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    expect(screen.getByText(/字体: Roboto/)).toBeInTheDocument()
  })

  it('deletes a project when delete button is clicked', () => {
    const projects = [
      { id: 'del1', name: 'Delete Me', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    expect(screen.getByText('Delete Me')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('删除项目 Delete Me'))
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument()
    expect(screen.getByText('暂无项目')).toBeInTheDocument()
  })

  it('generates prompts when clicking generate button', () => {
    const projects = [
      { id: 'gen1', name: 'Prompt App', styleId: 1, colorPalette: ['#FF0000'], fontChoice: 'Inter', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    fireEvent.click(screen.getByText('生成提示词'))
    expect(screen.getByText('生成的提示词')).toBeInTheDocument()
    expect(screen.getByText(/Project: Prompt App/)).toBeInTheDocument()
    expect(screen.getByText(/Style: Minimalism/)).toBeInTheDocument()
  })

  it('closes generated prompt modal', () => {
    const projects = [
      { id: 'close1', name: 'Close Test', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    fireEvent.click(screen.getByText('生成提示词'))
    expect(screen.getByText('生成的提示词')).toBeInTheDocument()
    fireEvent.click(screen.getByText('关闭'))
    expect(screen.queryByText('生成的提示词')).not.toBeInTheDocument()
  })

  it('cancel button closes create form', () => {
    renderPage()
    fireEvent.click(screen.getByText('新建项目'))
    expect(screen.getByLabelText('项目名称')).toBeInTheDocument()
    fireEvent.click(screen.getByText('取消'))
    expect(screen.queryByLabelText('项目名称')).not.toBeInTheDocument()
  })

  it('shows color swatches on project card', () => {
    const projects = [
      { id: 'cs1', name: 'Colors', styleId: 1, colorPalette: ['#FF0000', '#00FF00'], fontChoice: '', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    const swatches = screen.getAllByTitle(/#[0-9A-Fa-f]{6}/)
    expect(swatches.length).toBeGreaterThanOrEqual(2)
  })

  it('shows creation date on project card', () => {
    const projects = [
      { id: 'dt1', name: 'Date Test', styleId: 1, colorPalette: [], fontChoice: '', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    expect(screen.getByText(/创建于:/)).toBeInTheDocument()
  })

  it('generated prompt includes color palette info', () => {
    const projects = [
      { id: 'cp1', name: 'Color Prompt', styleId: 1, colorPalette: ['#AABBCC'], fontChoice: '', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    fireEvent.click(screen.getByText('生成提示词'))
    expect(screen.getByText(/Color palette: #AABBCC/)).toBeInTheDocument()
  })

  it('generated prompt includes font info', () => {
    const projects = [
      { id: 'fp1', name: 'Font Prompt', styleId: 1, colorPalette: [], fontChoice: 'Poppins', createdAt: '2024-01-15T00:00:00.000Z' },
    ]
    localStorage.setItem('ui-demo-projects', JSON.stringify(projects))
    renderPage()

    fireEvent.click(screen.getByText('生成提示词'))
    expect(screen.getByText(/Font: Poppins/)).toBeInTheDocument()
  })
})
