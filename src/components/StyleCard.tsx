import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { UIStyle } from '../data/types'
import { StyleDemo } from './StyleDemo'
import { CopyButton } from './CopyButton'
import { useFavorites } from '../hooks/useFavorites'

interface Props {
  style: UIStyle
}

export function StyleCard({ style }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const favorited = isFavorite(style.id)

  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-blue-500">
      <div className="overflow-hidden h-40 transition-transform duration-300 group-hover:scale-[1.02]">
        <StyleDemo style={style} />
      </div>
      {/* Favorite button */}
      <button
        onClick={() => toggle(style.id)}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={favorited ? '取消收藏' : '收藏'}
      >
        <Heart
          className={`w-4 h-4 ${
            favorited
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </button>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: extractColor(style.primaryColors) }}
            aria-hidden="true"
          />
          <Link
            to={`/styles/${style.id}`}
            className="block focus:outline-none"
            aria-label={`查看${style.nameZh}风格详情`}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {style.nameZh}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 ml-[18px]">{style.nameEn}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {style.keywords.slice(0, 4).map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {keyword}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-gray-700">
          <span className="text-xs text-gray-400 dark:text-gray-500">{style.type}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <CopyButton text={style.promptZh} />
          </div>
        </div>
      </div>
    </article>
  )
}

function extractColor(colorStr: string): string {
  // Try to extract a hex color or rgba from the primaryColors field
  const hexMatch = colorStr.match(/#[0-9A-Fa-f]{3,8}/)
  if (hexMatch) return hexMatch[0]
  const rgbaMatch = colorStr.match(/rgba?\([^)]+\)/)
  if (rgbaMatch) return rgbaMatch[0]
  return '#6366f1' // fallback indigo
}
