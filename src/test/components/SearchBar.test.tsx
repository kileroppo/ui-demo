import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../../components/SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder text in Chinese', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText(/搜索风格/)).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar value="glass" onChange={() => {}} />)
    expect(screen.getByDisplayValue('glass')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
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
})
