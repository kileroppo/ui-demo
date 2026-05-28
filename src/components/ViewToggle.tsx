import { LayoutGrid, List } from 'lucide-react'

export type ViewMode = 'grid' | 'list'

interface Props {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="视图模式">
      <button
        onClick={() => onChange('grid')}
        className={`p-2 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          value === 'grid'
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="网格视图"
        aria-pressed={value === 'grid'}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-2 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          value === 'list'
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="列表视图"
        aria-pressed={value === 'list'}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  )
}
