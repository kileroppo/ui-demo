import type { UIStyle } from '../data/types'

interface StyleComponentPreviewProps {
  style: UIStyle
}

/**
 * Parse hex colors from a primaryColors string.
 * e.g., "Monochromatic, Black #000000, White #FFFFFF" => ["#000000", "#FFFFFF"]
 */
export function parseHexColors(colorString: string): string[] {
  const matches = colorString.match(/#[0-9A-Fa-f]{6}/g)
  return matches ?? []
}

/**
 * Parse design variables string into key-value pairs.
 */
function parseDesignVariables(vars: string): Record<string, string> {
  const result: Record<string, string> = {}
  const parts = vars.split(',')
  for (const part of parts) {
    const [key, value] = part.split(':').map((s) => s.trim())
    if (key && value) {
      result[key] = value
    }
  }
  return result
}

function getBorderRadius(vars: Record<string, string>): string {
  const br = vars['--border-radius']
  if (br && br.includes('px')) return br
  return '8px'
}

export function StyleComponentPreview({ style }: StyleComponentPreviewProps) {
  const colors = parseHexColors(style.primaryColors)
  const primaryColor = colors[0] || '#3b82f6'
  const secondaryColor = colors[1] || '#6366f1'
  const designVars = parseDesignVariables(style.designVariables)
  const borderRadius = getBorderRadius(designVars)

  const bgColor = secondaryColor
  const textOnPrimary = isLightColor(primaryColor) ? '#000000' : '#ffffff'
  const textOnSecondary = isLightColor(secondaryColor) ? '#000000' : '#ffffff'

  return (
    <section className="mt-8" aria-label="Component Previews">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Component Previews
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Button Preview */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 block">
            Button
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              style={{
                backgroundColor: primaryColor,
                color: textOnPrimary,
                borderRadius,
                padding: '0.5rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Primary
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: primaryColor,
                borderRadius,
                padding: '0.5rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: `2px solid ${primaryColor}`,
                cursor: 'pointer',
              }}
            >
              Secondary
            </button>
          </div>
        </div>

        {/* Card Preview */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 block">
            Card
          </span>
          <div
            style={{
              borderRadius,
              border: `1px solid ${primaryColor}33`,
              padding: '1rem',
              background: `${primaryColor}0a`,
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: primaryColor,
                marginBottom: '0.5rem',
              }}
            />
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              Card Title
            </div>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>
              Card description text
            </div>
          </div>
        </div>

        {/* Form Preview */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 block">
            Form
          </span>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Email address"
              readOnly
              style={{
                borderRadius,
                border: `1px solid ${primaryColor}66`,
                padding: '0.5rem 0.75rem',
                fontSize: '0.8rem',
                width: '100%',
                outline: 'none',
              }}
            />
            <button
              style={{
                backgroundColor: primaryColor,
                color: textOnPrimary,
                borderRadius,
                padding: '0.5rem 1rem',
                fontWeight: 600,
                fontSize: '0.8rem',
                border: 'none',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Navigation Preview */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 block">
            Navigation
          </span>
          <div
            style={{
              display: 'flex',
              gap: '0.25rem',
              padding: '0.25rem',
              background: `${bgColor}15`,
              borderRadius,
            }}
          >
            <span
              style={{
                backgroundColor: primaryColor,
                color: textOnPrimary,
                borderRadius,
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Active
            </span>
            <span
              style={{
                color: primaryColor,
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              Tab 2
            </span>
            <span
              style={{
                color: primaryColor,
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              Tab 3
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Determine if a hex color is "light" (better with dark text).
 */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}
