import type { FilterOptions } from '../utils/filters'

interface Props {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
  categories: string[]
  performanceRatings: string[]
  accessibilityRatings: string[]
  categoryCounts?: Record<string, number>
}

export function FilterPanel({
  filters,
  onChange,
  categories,
  performanceRatings,
  accessibilityRatings,
  categoryCounts,
}: Props) {
  const handleChange = (key: keyof FilterOptions, value: string) => {
    onChange({ ...filters, [key]: value || undefined })
  }

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="筛选选项">
      <select
        value={filters.category || ''}
        onChange={(e) => handleChange('category', e.target.value)}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-150"
        aria-label="按类别筛选"
      >
        <option value="">全部类别</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}{categoryCounts ? ` (${categoryCounts[cat] || 0})` : ''}
          </option>
        ))}
      </select>

      <select
        value={filters.performance || ''}
        onChange={(e) => handleChange('performance', e.target.value)}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-150"
        aria-label="按性能筛选"
      >
        <option value="">全部性能</option>
        {performanceRatings.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={filters.accessibility || ''}
        onChange={(e) => handleChange('accessibility', e.target.value)}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-150"
        aria-label="按无障碍等级筛选"
      >
        <option value="">全部无障碍</option>
        {accessibilityRatings.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      {(filters.category || filters.performance || filters.accessibility) && (
        <button
          onClick={() => onChange({})}
          className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="清除所有筛选条件"
        >
          清除筛选
        </button>
      )}
    </div>
  )
}
