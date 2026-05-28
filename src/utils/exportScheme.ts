import type { UIStyle } from '../data/types'

export function generateCSSVariables(style: UIStyle, customColors?: string[]): string {
  const lines: string[] = []
  lines.push(`/* CSS Variables for ${style.nameEn} (${style.nameZh}) */`)
  lines.push(':root {')

  // Parse designVariables string
  if (style.designVariables) {
    const vars = style.designVariables.split(',').map((v) => v.trim())
    for (const v of vars) {
      const match = v.match(/^(--[\w-]+):\s*(.+)$/)
      if (match) {
        lines.push(`  ${match[1]}: ${match[2]};`)
      }
    }
  }

  // Add primary colors
  if (style.primaryColors) {
    const hexMatches = style.primaryColors.match(/#[0-9A-Fa-f]{6}/g)
    if (hexMatches) {
      hexMatches.forEach((hex, i) => {
        lines.push(`  --primary-color-${i + 1}: ${hex};`)
      })
    }
  }

  // Add secondary colors
  if (style.secondaryColors) {
    const hexMatches = style.secondaryColors.match(/#[0-9A-Fa-f]{6}/g)
    if (hexMatches) {
      hexMatches.forEach((hex, i) => {
        lines.push(`  --secondary-color-${i + 1}: ${hex};`)
      })
    }
  }

  // Add custom colors
  if (customColors && customColors.length > 0) {
    customColors.forEach((color, i) => {
      lines.push(`  --custom-color-${i + 1}: ${color};`)
    })
  }

  lines.push('}')
  return lines.join('\n')
}

export function generateMarkdownSummary(style: UIStyle, projectName?: string): string {
  const lines: string[] = []

  const title = projectName
    ? `# ${projectName} - Design Scheme`
    : `# ${style.nameEn} Design Scheme`

  lines.push(title)
  lines.push('')
  lines.push(`## Style: ${style.nameZh} (${style.nameEn})`)
  lines.push('')
  lines.push(`**Type:** ${style.type}`)
  lines.push(`**Era:** ${style.era}`)
  lines.push(`**Complexity:** ${style.complexity}`)
  lines.push('')
  lines.push('## Colors')
  lines.push('')
  lines.push(`**Primary:** ${style.primaryColors}`)
  lines.push(`**Secondary:** ${style.secondaryColors}`)
  lines.push('')
  lines.push('## Effects')
  lines.push('')
  lines.push(style.effects)
  lines.push('')
  lines.push('## CSS Keywords')
  lines.push('')
  lines.push(`\`\`\`css\n${style.cssKeywords}\n\`\`\``)
  lines.push('')
  lines.push('## Design Variables')
  lines.push('')
  lines.push(`\`\`\`\n${style.designVariables}\n\`\`\``)
  lines.push('')
  lines.push('## Implementation Checklist')
  lines.push('')
  style.implementationChecklist.forEach((item) => {
    lines.push(`- [ ] ${item.replace(/,$/, '').trim()}`)
  })
  lines.push('')

  return lines.join('\n')
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
