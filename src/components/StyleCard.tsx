import { Link } from 'react-router-dom'
import type { UIStyle } from '../data/types'
import { StyleDemo } from './StyleDemo'
import { CopyButton } from './CopyButton'

interface Props {
  style: UIStyle
}

export function StyleCard({ style }: Props) {
  return (
    <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-blue-500">
      <div className="overflow-hidden h-40">
        <StyleDemo style={style} />
      </div>
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
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {style.nameZh}
            </h3>
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-0.5 ml-[18px]">{style.nameEn}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {style.keywords.slice(0, 4).map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {keyword}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">{style.type}</span>
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
