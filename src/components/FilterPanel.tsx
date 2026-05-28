import type { FilterOptions } from '../utils/filters'

interface Props {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
  categories: string[]
  performanceRatings: string[]
  accessibilityRatings: string[]
  categoryCounts?: Record<string, number>
}

interface ChipGroupProps {
  label: string
  options: string[]
  selected: string | undefined
  onSelect: (value: string) => void
  counts?: Record<string, number>
  ariaLabel: string
}

function ChipGroup({ label, options, selected, onSelect, counts, ariaLabel }: ChipGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={ariaLabel}>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}:</span>
      <button
        onClick={() => onSelect('')}
        className={`px-3 py-1.5 text-sm rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          !selected
            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        全部
      </button>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-3 py-1.5 text-sm rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            selected === option
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {option}{counts && counts[option] !== undefined ? ` (${counts[option]})` : ''}
        </button>
      ))}
    </div>
  )
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
    <div className="flex flex-col gap-3" role="group" aria-label="筛选选项">
      <ChipGroup
        label="类别"
        options={categories}
        selected={filters.category}
        onSelect={(v) => handleChange('category', v)}
        counts={categoryCounts}
        ariaLabel="按类别筛选"
      />
      <ChipGroup
        label="性能"
        options={performanceRatings}
        selected={filters.performance}
        onSelect={(v) => handleChange('performance', v)}
        ariaLabel="按性能筛选"
      />
      <ChipGroup
        label="无障碍"
        options={accessibilityRatings}
        selected={filters.accessibility}
        onSelect={(v) => handleChange('accessibility', v)}
        ariaLabel="按无障碍等级筛选"
      />
      {(filters.category || filters.performance || filters.accessibility) && (
        <button
          onClick={() => onChange({})}
          className="self-start px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="清除所有筛选条件"
        >
          清除筛选
        </button>
      )}
    </div>
  )
}
