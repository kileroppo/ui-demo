import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchSuggestions } from '../../components/SearchSuggestions'

describe('SearchSuggestions', () => {
  const defaultProps = {
    query: '',
    onSelect: vi.fn(),
    onClose: vi.fn(),
    visible: true,
    recentSearches: [] as string[],
  }

  it('renders nothing when not visible', () => {
    const { container } = render(
      <SearchSuggestions {...defaultProps} visible={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders popular searches section', () => {
    render(<SearchSuggestions {...defaultProps} />)
    expect(screen.getByText('热门搜索')).toBeInTheDocument()
    expect(screen.getByText('玻璃拟态')).toBeInTheDocument()
    expect(screen.getByText('暗色模式')).toBeInTheDocument()
  })

  it('renders recent searches when provided', () => {
    render(
      <SearchSuggestions {...defaultProps} recentSearches={['test1', 'test2']} />
    )
    expect(screen.getByText('最近搜索')).toBeInTheDocument()
    expect(screen.getByText('test1')).toBeInTheDocument()
    expect(screen.getByText('test2')).toBeInTheDocument()
  })

  it('does not render recent section when recentSearches is empty', () => {
    render(<SearchSuggestions {...defaultProps} recentSearches={[]} />)
    expect(screen.queryByText('最近搜索')).not.toBeInTheDocument()
  })

  it('renders matching styles when query has text', () => {
    render(<SearchSuggestions {...defaultProps} query="极简" />)
    expect(screen.getByText('匹配风格')).toBeInTheDocument()
    // "极简主义" appears in both popular searches and matching styles
    const items = screen.getAllByText('极简主义')
    expect(items.length).toBeGreaterThanOrEqual(2)
  })

  it('limits matching styles to 5 results', () => {
    render(<SearchSuggestions {...defaultProps} query="a" />)
    const matchingSection = screen.getByText('匹配风格')
    expect(matchingSection).toBeInTheDocument()
    // Color dots indicate matching styles
    const dots = document.querySelectorAll('.rounded-full')
    expect(dots.length).toBeLessThanOrEqual(5)
  })

  it('calls onSelect when an item is clicked', () => {
    const onSelect = vi.fn()
    render(<SearchSuggestions {...defaultProps} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('玻璃拟态'))
    expect(onSelect).toHaveBeenCalledWith('玻璃拟态')
  })

  describe('keyboard navigation', () => {
    it('ArrowDown moves highlight down', () => {
      render(
        <SearchSuggestions {...defaultProps} recentSearches={['recent1']} />
      )
      fireEvent.keyDown(document, { key: 'ArrowDown' })
      // First item should be highlighted (recent1)
      const firstOption = screen.getByText('recent1').closest('[role="option"]')
      expect(firstOption).toHaveAttribute('aria-selected', 'true')
    })

    it('ArrowUp wraps to last item', () => {
      render(<SearchSuggestions {...defaultProps} />)
      // ArrowUp from -1 should go to last item
      fireEvent.keyDown(document, { key: 'ArrowUp' })
      const options = screen.getAllByRole('option')
      const lastOption = options[options.length - 1]
      expect(lastOption).toHaveAttribute('aria-selected', 'true')
    })

    it('ArrowDown wraps around to first item', () => {
      render(<SearchSuggestions {...defaultProps} />)
      const options = screen.getAllByRole('option')
      // Navigate to last item then one more
      for (let i = 0; i <= options.length; i++) {
        fireEvent.keyDown(document, { key: 'ArrowDown' })
      }
      // Should wrap to first
      const firstOption = options[0]
      expect(firstOption).toHaveAttribute('aria-selected', 'true')
    })

    it('Enter on highlighted item calls onSelect', () => {
      const onSelect = vi.fn()
      render(
        <SearchSuggestions {...defaultProps} onSelect={onSelect} recentSearches={['myterm']} />
      )
      fireEvent.keyDown(document, { key: 'ArrowDown' })
      fireEvent.keyDown(document, { key: 'Enter' })
      expect(onSelect).toHaveBeenCalledWith('myterm')
    })

    it('Enter does nothing when no item is highlighted', () => {
      const onSelect = vi.fn()
      render(<SearchSuggestions {...defaultProps} onSelect={onSelect} />)
      fireEvent.keyDown(document, { key: 'Enter' })
      expect(onSelect).not.toHaveBeenCalled()
    })

    it('Escape calls onClose', () => {
      const onClose = vi.fn()
      render(<SearchSuggestions {...defaultProps} onClose={onClose} />)
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onClose).toHaveBeenCalled()
    })
  })

  it('has proper accessibility attributes', () => {
    render(<SearchSuggestions {...defaultProps} />)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    const options = screen.getAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
  })

  it('mouseEnter on item updates active index', () => {
    render(
      <SearchSuggestions {...defaultProps} recentSearches={['hover-test']} />
    )
    const option = screen.getByText('hover-test').closest('[role="option"]')
    fireEvent.mouseEnter(option!)
    expect(option).toHaveAttribute('aria-selected', 'true')
  })

  it('does not attach keyboard listener when not visible', () => {
    const onClose = vi.fn()
    render(<SearchSuggestions {...defaultProps} visible={false} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })
})
