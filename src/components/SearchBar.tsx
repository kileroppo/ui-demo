import { useEffect, useRef, useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { SearchSuggestions } from './SearchSuggestions'
import { useRecentSearches } from '../hooks/useRecentSearches'

interface Props {
  value: string
  onChange: (value: string) => void
  autoFocus?: boolean
}

const PLACEHOLDER_ITEMS = [
  '搜索玻璃拟态...',
  '搜索暗色模式...',
  '搜索极简主义...',
]

function getIsMac(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform || '') || /Macintosh/.test(navigator.userAgent || '')
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function SearchBar({ value, onChange, autoFocus }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { getRecent, addSearch } = useRecentSearches()
  const isMac = getIsMac()

  useEffect(() => {
    if (getPrefersReducedMotion()) return
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_ITEMS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
      blurTimeoutRef.current = null
    }
    setShowSuggestions(true)
  }

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setShowSuggestions(false)
    }, 150)
  }

  const handleSelect = useCallback(
    (term: string) => {
      onChange(term)
      addSearch(term)
      setShowSuggestions(false)
      inputRef.current?.blur()
    },
    [onChange, addSearch]
  )

  const handleClose = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={PLACEHOLDER_ITEMS[placeholderIndex]}
        className="w-full pl-10 pr-20 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent glow-focus transition-shadow duration-200"
        aria-label="搜索风格"
        autoFocus={autoFocus}
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="清除搜索"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-gray-500 bg-gray-100 rounded border border-gray-200 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600">
        {isMac ? '⌘K' : 'Ctrl+K'}
      </kbd>
      <SearchSuggestions
        query={value}
        onSelect={handleSelect}
        onClose={handleClose}
        visible={showSuggestions}
        recentSearches={getRecent()}
        containerRef={containerRef}
      />
    </div>
  )
}
