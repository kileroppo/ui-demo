import { Link } from 'react-router-dom'
import type { UIStyle } from '../data/types'
import { StyleDemo } from './StyleDemo'
import { CopyButton } from './CopyButton'

interface Props {
  style: UIStyle
}

const performanceBadgeClass: Record<string, string> = {
  Excellent: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Good: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Low: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function StyleListItem({ style }: Props) {
  return (
    <article className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200">
      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
        <StyleDemo style={style} />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          to={`/styles/${style.id}`}
          className="block focus:outline-none"
          aria-label={`查看${style.nameZh}风格详情`}
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate">
            {style.nameZh}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{style.type}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {style.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {style.performance && (
          <span className={`px-2 py-0.5 text-xs rounded-full ${performanceBadgeClass[style.performance] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
            {style.performance}
          </span>
        )}
        <CopyButton text={style.promptZh} />
      </div>
    </article>
  )
}
