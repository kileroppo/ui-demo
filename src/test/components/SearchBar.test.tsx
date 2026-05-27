import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../../components/SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder text in Chinese', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('搜索风格... (支持中英文)')).toBeInTheDocument()
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
})
