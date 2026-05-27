import type { UIStyle } from '../../data/types'

interface Props {
  style: UIStyle
}

/**
 * Extract hex colors from a string
 */
function extractHexColors(str: string): string[] {
  return str.match(/#[0-9A-Fa-f]{6}/g) || []
}

/**
 * Parse border-radius from cssKeywords string
 */
function parseBorderRadius(cssKeywords: string): string | null {
  const match = cssKeywords.match(/border-radius:\s*([^;]+)/i)
  return match ? match[1].trim() : null
}

/**
 * Parse box-shadow from cssKeywords string
 */
function parseBoxShadow(cssKeywords: string): string | null {
  const match = cssKeywords.match(/box-shadow:\s*([^;]+)/i)
  return match ? match[1].trim() : null
}

/**
 * Generic demo component that renders a mini UI vignette
 * dynamically styled based on the style's data properties
 */
export function GenericStyleDemo({ style }: Props) {
  const colors = extractHexColors(style.primaryColors)
  const primaryColor = colors[0] || '#6366f1'
  const secondaryColor = colors[1] || primaryColor

  const borderRadius = parseBorderRadius(style.cssKeywords) || '12px'
  const boxShadow = parseBoxShadow(style.cssKeywords) || `0 4px 12px ${primaryColor}33`

  const isComplex = style.complexity === 'High' || style.complexity === 'Very High'

  return (
    <div
      className="w-full h-full flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}11, ${secondaryColor}22)`,
      }}
    >
      <div
        className="flex flex-col gap-2 p-4 w-full max-w-[220px]"
        style={{
          borderRadius,
          boxShadow,
          background: '#ffffff',
          border: `1px solid ${primaryColor}33`,
        }}
      >
        <h4
          className="text-sm font-bold truncate"
          style={{ color: primaryColor }}
        >
          {style.nameZh}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {style.type} · {style.complexity || 'Standard'}
        </p>
        <button
          type="button"
          className="mt-1 px-3 py-1.5 text-xs font-medium text-white rounded-md transition-opacity hover:opacity-90"
          style={{
            background: isComplex
              ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
              : primaryColor,
            borderRadius: isComplex ? '8px' : '6px',
          }}
        >
          {isComplex ? '探索' : '查看'}
        </button>
      </div>
    </div>
  )
}
