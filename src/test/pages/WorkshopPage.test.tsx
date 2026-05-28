import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { WorkshopPage } from '../../pages/WorkshopPage'

vi.mock('../../utils/clipboard', () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <WorkshopPage />
    </MemoryRouter>
  )
}

describe('WorkshopPage', () => {
  it('renders the page title', () => {
    renderPage()
    expect(screen.getByText('提示词工坊')).toBeInTheDocument()
  })

  it('renders all template variable inputs', () => {
    renderPage()
    expect(screen.getByLabelText('产品名称')).toBeInTheDocument()
    expect(screen.getByLabelText('主色调')).toBeInTheDocument()
    expect(screen.getByLabelText('目标设备')).toBeInTheDocument()
    expect(screen.getByLabelText('技术框架')).toBeInTheDocument()
  })

  it('renders the template editor', () => {
    renderPage()
    expect(screen.getByLabelText(/提示词模板/)).toBeInTheDocument()
  })

  it('renders live preview section', () => {
    renderPage()
    expect(screen.getByText('实时预览')).toBeInTheDocument()
    expect(screen.getByTestId('prompt-preview')).toBeInTheDocument()
  })

  it('updates preview when filling in product name', async () => {
    const user = userEvent.setup()
    renderPage()

    const input = screen.getByLabelText('产品名称')
    await user.type(input, '健康App')

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('健康App')
  })

  it('updates preview when filling in main color', async () => {
    const user = userEvent.setup()
    renderPage()

    const input = screen.getByLabelText('主色调')
    await user.type(input, '#6366f1')

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('#6366f1')
  })

  it('updates preview when filling in target device', async () => {
    const user = userEvent.setup()
    renderPage()

    const input = screen.getByLabelText('目标设备')
    await user.type(input, '移动端')

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('移动端')
  })

  it('updates preview when filling in framework', async () => {
    const user = userEvent.setup()
    renderPage()

    const input = screen.getByLabelText('技术框架')
    await user.type(input, 'React')

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('React')
  })

  it('shows placeholder text in preview when variables are empty', () => {
    renderPage()

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('{产品名}')
    expect(preview).toHaveTextContent('{主色}')
    expect(preview).toHaveTextContent('{目标设备}')
    expect(preview).toHaveTextContent('{框架}')
  })

  it('renders copy button', () => {
    renderPage()
    expect(screen.getByText('复制提示词')).toBeInTheDocument()
  })

  it('copy button triggers clipboard copy', async () => {
    const { copyToClipboard } = await import('../../utils/clipboard')
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('复制提示词'))
    expect(copyToClipboard).toHaveBeenCalled()
  })

  it('allows editing the template', async () => {
    const user = userEvent.setup()
    renderPage()

    const textarea = screen.getByLabelText(/提示词模板/) as HTMLTextAreaElement
    await user.clear(textarea)
    await user.type(textarea, 'custom template here')

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('custom template here')
  })

  it('fills multiple variables simultaneously in preview', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText('产品名称'), 'TodoApp')
    await user.type(screen.getByLabelText('主色调'), '蓝色')

    const preview = screen.getByTestId('prompt-preview')
    expect(preview).toHaveTextContent('TodoApp')
    expect(preview).toHaveTextContent('蓝色')
  })
})
