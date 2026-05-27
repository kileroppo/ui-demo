import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../../components/SearchBar'

describe('SearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with cycling placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('搜索玻璃拟态...')).toBeInTheDocument()
  })

  it('cycles placeholder text every 3 seconds', () => {
    render(<SearchBar value="" onChange={() => {}} />)

    expect(screen.getByPlaceholderText('搜索玻璃拟态...')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByPlaceholderText('搜索暗色模式...')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByPlaceholderText('搜索极简主义...')).toBeInTheDocument()

    // Should loop back
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByPlaceholderText('搜索玻璃拟态...')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar value="glass" onChange={() => {}} />)
    expect(screen.getByDisplayValue('glass')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('has accessible label', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByLabelText('搜索风格')).toBeInTheDocument()
  })

  it('shows keyboard shortcut hint', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByText('⌘K')).toBeInTheDocument()
  })

  it('focuses input on Ctrl+K keyboard shortcut', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true })
    expect(document.activeElement).toBe(input)
  })

  it('focuses input on Cmd+K keyboard shortcut', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(document, { key: 'k', metaKey: true })
    expect(document.activeElement).toBe(input)
  })

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<SearchBar value="" onChange={() => {}} />)
    unmount()
    // No error should occur after unmount when timer fires
    act(() => {
      vi.advanceTimersByTime(3000)
    })
  })

  describe('clear button', () => {
    it('shows clear button when input has text', () => {
      render(<SearchBar value="something" onChange={() => {}} />)
      expect(screen.getByLabelText('清除搜索')).toBeInTheDocument()
    })

    it('does not show clear button when input is empty', () => {
      render(<SearchBar value="" onChange={() => {}} />)
      expect(screen.queryByLabelText('清除搜索')).not.toBeInTheDocument()
    })

    it('calls onChange with empty string when clear button is clicked', async () => {
      vi.useRealTimers()
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(<SearchBar value="test" onChange={onChange} />)

      await user.click(screen.getByLabelText('清除搜索'))
      expect(onChange).toHaveBeenCalledWith('')
    })
  })

  describe('suggestions dropdown', () => {
    it('shows dropdown on focus', () => {
      render(<SearchBar value="" onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      fireEvent.focus(input)
      expect(screen.getByText('热门搜索')).toBeInTheDocument()
    })

    it('hides dropdown on escape', () => {
      render(<SearchBar value="" onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      fireEvent.focus(input)
      expect(screen.getByText('热门搜索')).toBeInTheDocument()

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByText('热门搜索')).not.toBeInTheDocument()
    })

    it('hides dropdown on blur after delay', () => {
      render(<SearchBar value="" onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      fireEvent.focus(input)
      expect(screen.getByText('热门搜索')).toBeInTheDocument()

      fireEvent.blur(input)
      act(() => {
        vi.advanceTimersByTime(200)
      })
      expect(screen.queryByText('热门搜索')).not.toBeInTheDocument()
    })

    it('has aria-expanded attribute', () => {
      render(<SearchBar value="" onChange={() => {}} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      fireEvent.focus(input)
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
