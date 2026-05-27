import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CopyButton } from '../../components/CopyButton'
import * as clipboardUtil from '../../utils/clipboard'

vi.mock('../../utils/clipboard')

describe('CopyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(clipboardUtil.copyToClipboard).mockResolvedValue(true)
  })

  it('renders with default label', () => {
    render(<CopyButton text="test" />)
    expect(screen.getByText('复制提示词')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(<CopyButton text="test" label="复制" />)
    expect(screen.getByText('复制')).toBeInTheDocument()
  })

  it('copies text on click and shows feedback', async () => {
    const user = userEvent.setup()
    render(<CopyButton text="hello world" />)

    await user.click(screen.getByRole('button'))

    expect(clipboardUtil.copyToClipboard).toHaveBeenCalledWith('hello world')
    await waitFor(() => {
      expect(screen.getByText('已复制')).toBeInTheDocument()
    })
  })

  it('has correct aria-label before copy', () => {
    render(<CopyButton text="test" />)
    expect(screen.getByLabelText('复制提示词')).toBeInTheDocument()
  })

  it('shows copied aria-label after copy', async () => {
    const user = userEvent.setup()
    render(<CopyButton text="test" />)
    await user.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByLabelText('已复制')).toBeInTheDocument()
    })
  })

  it('does not show copied state when copy fails', async () => {
    vi.mocked(clipboardUtil.copyToClipboard).mockResolvedValue(false)
    const user = userEvent.setup()
    render(<CopyButton text="test" />)

    await user.click(screen.getByRole('button'))

    // Should still show the default label since copy failed
    await waitFor(() => {
      expect(screen.queryByText('已复制')).not.toBeInTheDocument()
    })
    expect(screen.getByText('复制提示词')).toBeInTheDocument()
  })
})
