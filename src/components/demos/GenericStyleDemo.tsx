import type { UIStyle } from '../../data/types'

interface Props {
  style: UIStyle
}

/**
 * Generic demo component that applies CSS properties dynamically
 * Used for styles that don't have a dedicated demo component
 */
export function GenericStyleDemo({ style }: Props) {
  const colors = style.primaryColors.match(/#[0-9A-Fa-f]{6}/g) || ['#6366f1']
  const bgColor = colors[0] || '#6366f1'

  return (
    <div
      className="w-full h-32 rounded-xl flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${bgColor}22, ${bgColor}44)` }}
    >
      <div
        className="px-3 py-2 rounded-lg text-xs font-medium text-center"
        style={{
          background: bgColor,
          color: '#ffffff',
          opacity: 0.9,
        }}
      >
        {style.nameZh}
      </div>
    </div>
  )
}
