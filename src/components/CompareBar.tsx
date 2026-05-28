import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import type { UIStyle } from '../data/types'

interface Props {
  selected: number[]
  styles: UIStyle[]
  onClear: () => void
}

export function CompareBar({ selected, styles, onClear }: Props) {
  const navigate = useNavigate()

  if (selected.length === 0) return null

  const selectedStyles = selected
    .map((id) => styles.find((s) => s.id === id))
    .filter(Boolean) as UIStyle[]

  const handleCompare = () => {
    navigate(`/compare?ids=${selected.join(',')}`)
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-3"
      role="status"
      aria-label="对比选择栏"
    >
      <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
        已选 {selected.length}/3 个风格
      </span>
      <div className="flex items-center gap-1">
        {selectedStyles.map((s) => (
          <span
            key={s.id}
            className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 max-w-[80px] truncate"
          >
            {s.nameZh}
          </span>
        ))}
      </div>
      <button
        onClick={handleCompare}
        className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
      >
        开始对比
      </button>
      <button
        onClick={onClear}
        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        aria-label="清除对比"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
