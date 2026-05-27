import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { styles } from '../data'
import { StyleCard } from '../components/StyleCard'
import { SearchBar } from '../components/SearchBar'
import { FilterPanel } from '../components/FilterPanel'
import { searchAndSort } from '../utils/search'
import {
  filterStyles,
  getCategories,
  getPerformanceRatings,
  getAccessibilityRatings,
  type FilterOptions,
} from '../utils/filters'

export function StyleGallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<FilterOptions>(
    initialCategory ? { category: initialCategory } : {}
  )

  const categories = useMemo(() => getCategories(styles), [])
  const performanceRatings = useMemo(() => getPerformanceRatings(styles), [])
  const accessibilityRatings = useMemo(() => getAccessibilityRatings(styles), [])

  const results = useMemo(() => {
    const searched = searchAndSort(styles, query)
    return filterStyles(searched, filters)
  }, [query, filters])

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

  const handleQueryChange = (value: string) => {
    setQuery(value)
    updateSearchParams(value, filters)
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    updateSearchParams(query, newFilters)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">风格库</h1>
      <p className="text-sm text-gray-500 mb-6">
        浏览全部 {styles.length} 种 UI 设计风格，支持按类别、性能等维度筛选
      </p>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar value={query} onChange={handleQueryChange} />
      </div>

      <div className="mb-6">
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          categories={categories}
          performanceRatings={performanceRatings}
          accessibilityRatings={accessibilityRatings}
          categoryCounts={getCategoryCounts(styles)}
        />
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4" aria-live="polite">
        显示 {results.length} / {styles.length} 种风格
      </p>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((style) => (
            <StyleCard key={style.id} style={style} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16" role="status">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-600 font-medium">
            {query ? `未找到「${query}」相关的风格` : '没有符合筛选条件的风格'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            试试调整搜索词或清除筛选条件
          </p>
          {(filters.category || filters.performance || filters.accessibility) && (
            <button
              onClick={() => handleFilterChange({})}
              className="mt-4 px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              清除全部筛选
            </button>
          )}
        </div>
      )}
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
