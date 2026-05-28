export type SortOption =
  | 'default'
  | 'name-asc'
  | 'name-desc'
  | 'complexity-asc'
  | 'complexity-desc'
  | 'performance-desc'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: '默认' },
  { value: 'name-asc', label: '名称 A-Z' },
  { value: 'name-desc', label: '名称 Z-A' },
  { value: 'complexity-asc', label: '复杂度: 低→高' },
  { value: 'complexity-desc', label: '复杂度: 高→低' },
  { value: 'performance-desc', label: '性能: 高→低' },
]

interface Props {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortControl({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="排序方式">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">排序:</span>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 text-sm rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            value === option.value
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
