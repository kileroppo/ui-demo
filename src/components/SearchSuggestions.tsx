import { useEffect, useRef, useState, useMemo } from 'react'
import { Clock, TrendingUp } from 'lucide-react'
import { styles } from '../data'

const POPULAR_SEARCHES = [
  '玻璃拟态',
  '暗色模式',
  '极简主义',
  '新拟态',
  '赛博朋克',
  '极光',
  '扁平设计',
  '粗野主义',
]

interface Props {
  query: string
  onSelect: (term: string) => void
  onClose: () => void
  visible: boolean
  recentSearches: string[]
  containerRef?: React.RefObject<HTMLElement | null>
}

interface SuggestionItem {
  label: string
  section: string
  color?: string
}

export function SearchSuggestions({ query, onSelect, onClose, visible, recentSearches, containerRef }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef<HTMLDivElement>(null)

  const matchingStyles = useMemo(() => {
    if (!query.trim()) return []
    const lower = query.toLowerCase()
    return styles
      .filter(
        (s) =>
          s.nameZh.toLowerCase().includes(lower) ||
          s.nameEn.toLowerCase().includes(lower)
      )
      .slice(0, 5)
      .map((s) => ({
        name: s.nameZh,
        color: s.primaryColors.match(/#[0-9A-Fa-f]{6}/)?.[0] || '#6366f1',
      }))
  }, [query])

  const items: SuggestionItem[] = useMemo(() => {
    const result: SuggestionItem[] = []

    if (recentSearches.length > 0) {
      recentSearches.forEach((term) => {
        result.push({ label: term, section: 'recent' })
      })
    }

    POPULAR_SEARCHES.forEach((term) => {
      result.push({ label: term, section: 'popular' })
    })

    matchingStyles.forEach((style) => {
      result.push({ label: style.name, section: 'matching', color: style.color })
    })

    return result
  }, [recentSearches, matchingStyles])

  useEffect(() => {
    setActiveIndex(-1)
  }, [query, visible])

  useEffect(() => {
    if (!visible) return

    function handleKeyDown(e: KeyboardEvent) {
      // Only intercept keys when focus is within the search container
      if (containerRef?.current && !containerRef.current.contains(document.activeElement)) {
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % items.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1))
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        onSelect(items[activeIndex].label)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [visible, items, activeIndex, onSelect, onClose, containerRef])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`)
      if (activeEl && typeof activeEl.scrollIntoView === 'function') {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex])

  if (!visible || items.length === 0) return null

  let currentSection = ''
  let itemIndex = -1

  return (
    <div
      ref={listRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
      role="listbox"
      aria-label="搜索建议"
    >
      {items.map((item, idx) => {
        itemIndex = idx
        let sectionHeader = null

        if (item.section !== currentSection) {
          currentSection = item.section
          const sectionLabels: Record<string, { icon: React.ReactNode; text: string }> = {
            recent: { icon: <Clock className="w-3.5 h-3.5" />, text: '最近搜索' },
            popular: { icon: <TrendingUp className="w-3.5 h-3.5" />, text: '热门搜索' },
            matching: { icon: null, text: '匹配风格' },
          }
          const sec = sectionLabels[item.section]
          sectionHeader = (
            <div className="px-3 py-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1.5 border-t border-gray-100 dark:border-gray-700 first:border-t-0">
              {sec.icon}
              {sec.text}
            </div>
          )
        }

        const isActive = idx === activeIndex

        return (
          <div key={`${item.section}-${item.label}-${idx}`}>
            {sectionHeader}
            <div
              role="option"
              aria-selected={isActive}
              data-index={itemIndex}
              className={`px-3 py-2 text-sm cursor-pointer flex items-center gap-2 ${
                isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelect(item.label)}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {item.color && (
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
              )}
              <span>{item.label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
