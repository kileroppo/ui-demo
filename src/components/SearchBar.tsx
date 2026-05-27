import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'

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

export function SearchBar({ value, onChange, autoFocus }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
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

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={PLACEHOLDER_ITEMS[placeholderIndex]}
        className="w-full pl-10 pr-16 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent glow-focus transition-shadow duration-200"
        aria-label="搜索风格"
        autoFocus={autoFocus}
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-gray-400 bg-gray-100 rounded border border-gray-200">
        ⌘K
      </kbd>
    </div>
  )
}
