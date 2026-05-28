import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { styles } from '../data'
import { StyleCard } from '../components/StyleCard'
import { StyleListItem } from '../components/StyleListItem'
import { SearchBar } from '../components/SearchBar'
import { FilterPanel } from '../components/FilterPanel'
import { SortControl, type SortOption } from '../components/SortControl'
import { ViewToggle, type ViewMode } from '../components/ViewToggle'
import { OnboardingTooltip } from '../components/OnboardingTooltip'
import { CompareBar } from '../components/CompareBar'
import { searchAndSort } from '../utils/search'
import { useDebounce } from '../hooks/useDebounce'
import { useFavorites } from '../hooks/useFavorites'
import { useOnboarding } from '../hooks/useOnboarding'
import {
  filterStyles,
  getCategories,
  getPerformanceRatings,
  getAccessibilityRatings,
  type FilterOptions,
} from '../utils/filters'
import type { UIStyle } from '../data/types'

const COMPLEXITY_ORDER: Record<string, number> = { Low: 1, Medium: 2, High: 3 }
const PERFORMANCE_ORDER: Record<string, number> = { Excellent: 1, Good: 2, Medium: 3, Low: 4 }

function sortStyles(list: UIStyle[], sort: SortOption): UIStyle[] {
  if (sort === 'default') return list
  const sorted = [...list]
  switch (sort) {
    case 'name-asc':
      return sorted.sort((a, b) => a.nameZh.localeCompare(b.nameZh, 'zh'))
    case 'name-desc':
      return sorted.sort((a, b) => b.nameZh.localeCompare(a.nameZh, 'zh'))
    case 'complexity-asc':
      return sorted.sort(
        (a, b) => (COMPLEXITY_ORDER[a.complexity] || 99) - (COMPLEXITY_ORDER[b.complexity] || 99)
      )
    case 'complexity-desc':
      return sorted.sort(
        (a, b) => (COMPLEXITY_ORDER[b.complexity] || 0) - (COMPLEXITY_ORDER[a.complexity] || 0)
      )
    case 'performance-desc':
      return sorted.sort(
        (a, b) => (PERFORMANCE_ORDER[a.performance] || 99) - (PERFORMANCE_ORDER[b.performance] || 99)
      )
    default:
      return sorted
  }
}

function getStoredViewMode(): ViewMode {
  try {
    const stored = localStorage.getItem('gallery-view-mode')
    if (stored === 'list' || stored === 'grid') return stored
  } catch {
    // ignore
  }
  return 'grid'
}

function LazyCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-testid="lazy-card">
      {isVisible ? children : <div className="h-48 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />}
    </div>
  )
}

export function StyleGallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<FilterOptions>(
    initialCategory ? { category: initialCategory } : {}
  )
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [sortOption, setSortOption] = useState<SortOption>('default')
  const [viewMode, setViewMode] = useState<ViewMode>(getStoredViewMode)
  const [compareSelected, setCompareSelected] = useState<number[]>([])
  const { favorites, count: favoritesCount } = useFavorites()
  const { shouldShow, dismiss } = useOnboarding()

  const handleCompareToggle = useCallback((id: number) => {
    setCompareSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id)
      }
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }, [])

  const handleCompareClear = useCallback(() => {
    setCompareSelected([])
  }, [])

  const activeOnboardingTip = shouldShow('gallery-search')
    ? 'gallery-search'
    : shouldShow('gallery-favorites')
      ? 'gallery-favorites'
      : null

  const categories = useMemo(() => getCategories(styles), [])
  const performanceRatings = useMemo(() => getPerformanceRatings(styles), [])
  const accessibilityRatings = useMemo(() => getAccessibilityRatings(styles), [])

  const results = useMemo(() => {
    const searched = searchAndSort(styles, debouncedQuery)
    const filtered = filterStyles(searched, filters)
    const favFiltered = showFavoritesOnly
      ? filtered.filter((s) => favorites.includes(s.id))
      : filtered
    return sortStyles(favFiltered, sortOption)
  }, [debouncedQuery, filters, showFavoritesOnly, favorites, sortOption])

  const updateSearchParams = useCallback(
    (newQuery: string, newFilters: FilterOptions) => {
      const params = new URLSearchParams()
      if (newQuery) params.set('q', newQuery)
      if (newFilters.category) params.set('category', newFilters.category)
      if (newFilters.performance) params.set('performance', newFilters.performance)
      if (newFilters.accessibility) params.set('accessibility', newFilters.accessibility)
      setSearchParams(params, { replace: true })
    },
    [setSearchParams]
  )

  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedQuery(value)
    updateSearchParams(value, filters)
  }, 200)

  const handleQueryChange = (value: string) => {
    setQuery(value)
    debouncedSearch(value)
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    updateSearchParams(debouncedQuery, newFilters)
  }

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    try {
      localStorage.setItem('gallery-view-mode', mode)
    } catch {
      // ignore
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">风格库</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        浏览全部 {styles.length} 种 UI 设计风格，支持按类别、性能等维度筛选
      </p>

      {/* Search and Filter */}
      <div className="relative flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar value={query} onChange={handleQueryChange} />
        {activeOnboardingTip === 'gallery-search' && (
          <OnboardingTooltip
            id="gallery-search"
            title="搜索风格"
            description="输入中文或英文关键词搜索风格，试试'玻璃'或'dark'"
            onDismiss={() => dismiss('gallery-search')}
          />
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          categories={categories}
          performanceRatings={performanceRatings}
          accessibilityRatings={accessibilityRatings}
          categoryCounts={getCategoryCounts(styles)}
        />
        <div className="relative">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              showFavoritesOnly
                ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            aria-pressed={showFavoritesOnly}
            aria-label="我的收藏"
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : ''}`} />
            我的收藏{favoritesCount > 0 && ` (${favoritesCount})`}
          </button>
          {activeOnboardingTip === 'gallery-favorites' && (
            <OnboardingTooltip
              id="gallery-favorites"
              title="收藏风格"
              description="点击心形图标收藏喜欢的风格"
              onDismiss={() => dismiss('gallery-favorites')}
            />
          )}
        </div>
      </div>

      {/* Sort and View Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SortControl value={sortOption} onChange={setSortOption} />
        <ViewToggle value={viewMode} onChange={handleViewModeChange} />
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4" aria-live="polite">
        显示 {results.length} / {styles.length} 种风格
      </p>

      {/* Grid / List */}
      {results.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((style) => (
              <LazyCard key={style.id}>
                <StyleCard
                  style={style}
                  onCompareToggle={handleCompareToggle}
                  isCompareSelected={compareSelected.includes(style.id)}
                />
              </LazyCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((style) => (
              <StyleListItem
                key={style.id}
                style={style}
                onCompareToggle={handleCompareToggle}
                isCompareSelected={compareSelected.includes(style.id)}
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16" role="status">
          <div className="text-4xl mb-3">{showFavoritesOnly ? '❤️' : '🔍'}</div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {showFavoritesOnly
              ? '还没有收藏的风格'
              : query
                ? `未找到「${query}」相关的风格`
                : '没有符合筛选条件的风格'}
          </p>
          {showFavoritesOnly ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              浏览风格库，点击心形图标收藏你喜欢的风格吧！
            </p>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">试试：</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['玻璃拟态', '极简主义', '暗色模式', '赛博朋克'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleQueryChange(chip)}
                    className="px-3 py-1.5 text-sm rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}
          {(filters.category || filters.performance || filters.accessibility) && (
            <button
              onClick={() => handleFilterChange({})}
              className="mt-4 px-4 py-2 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              清除全部筛选
            </button>
          )}
        </div>
      )}

      <CompareBar selected={compareSelected} styles={styles} onClear={handleCompareClear} />
    </div>
  )
}

function getCategoryCounts(allStyles: typeof styles): Record<string, number> {
  const counts: Record<string, number> = {}
  allStyles.forEach((s) => {
    counts[s.type] = (counts[s.type] || 0) + 1
  })
  return counts
}
