import { useState, useMemo } from 'react'
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
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || ''

  const [query, setQuery] = useState('')
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">风格库</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mb-6">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          categories={categories}
          performanceRatings={performanceRatings}
          accessibilityRatings={accessibilityRatings}
        />
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        显示 {results.length} / {styles.length} 种风格
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((style) => (
          <StyleCard key={style.id} style={style} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到匹配的风格，请调整搜索或筛选条件</p>
        </div>
      )}
    </div>
  )
}
