import type { UIStyle } from '../data/types'

/**
 * Chinese keyword alias map for better search experience.
 * Maps common Chinese terms to their English equivalents that
 * appear in the style data.
 */
const CHINESE_ALIASES: Record<string, string[]> = {
  '玻璃': ['glass', 'glassmorphism', 'frosted'],
  '电商': ['e-commerce', 'shopping', 'product'],
  '暗色': ['dark', 'oled', 'night'],
  '极简': ['minimal', 'swiss', 'clean'],
  '扁平': ['flat', 'material'],
  '渐变': ['gradient', 'aurora'],
  '复古': ['retro', 'vintage', 'nostalgic'],
  '卡通': ['cartoon', 'playful', 'illustration'],
  '科技': ['tech', 'futurism', 'cyber'],
  '商务': ['enterprise', 'corporate', 'professional'],
  '手机': ['mobile', 'responsive'],
  '动画': ['animation', 'motion', 'transition'],
  '圆角': ['rounded', 'pill', 'soft'],
  '阴影': ['shadow', 'depth', 'elevation'],
  '粗野': ['brutal', 'brutalism', 'raw'],
  '新拟态': ['neumorphism', 'soft ui'],
  '赛博': ['cyber', 'cyberpunk', 'neon'],
  '黏土': ['clay', 'claymorphism'],
}

/**
 * Expand a Chinese query with English aliases for broader search matching.
 */
function expandQuery(query: string): string[] {
  const terms = query.toLowerCase().trim().split(/\s+/)
  const expanded: string[] = [...terms]

  for (const term of terms) {
    for (const [zhKey, enValues] of Object.entries(CHINESE_ALIASES)) {
      if (term.includes(zhKey)) {
        expanded.push(...enValues)
      }
    }
  }

  return expanded
}

/**
 * Fuzzy search across style names, keywords, categories
 * in both Chinese and English. Uses Chinese alias expansion
 * for better cross-language results.
 */
export function searchStyles(styles: UIStyle[], query: string): UIStyle[] {
  if (!query.trim()) return styles

  const expandedTerms = expandQuery(query)
  const originalTerms = query.toLowerCase().trim().split(/\s+/)

  return styles.filter((style) => {
    const searchableText = [
      style.nameEn,
      style.nameZh,
      style.type,
      ...style.keywords,
      style.bestFor,
      style.effects,
      style.primaryColors,
      style.cssKeywords,
      style.promptZh,
    ]
      .join(' ')
      .toLowerCase()

    // All original terms must match (either directly or through alias expansion)
    return originalTerms.every((term) => {
      if (searchableText.includes(term)) return true
      // Check if any alias of this term matches
      const aliases = CHINESE_ALIASES[term]
      if (aliases) {
        return aliases.some((alias) => searchableText.includes(alias))
      }
      // Check partial alias matches
      for (const [zhKey, enValues] of Object.entries(CHINESE_ALIASES)) {
        if (term.includes(zhKey)) {
          if (enValues.some((alias) => searchableText.includes(alias))) return true
        }
      }
      return false
    })
  })
}

/**
 * Calculate a relevance score for sorting search results
 */
export function getSearchScore(style: UIStyle, query: string): number {
  if (!query.trim()) return 0

  const normalizedQuery = query.toLowerCase().trim()
  let score = 0

  // Exact name match (highest)
  if (style.nameEn.toLowerCase() === normalizedQuery) score += 100
  if (style.nameZh === normalizedQuery) score += 100

  // Name contains query
  if (style.nameEn.toLowerCase().includes(normalizedQuery)) score += 50
  if (style.nameZh.includes(normalizedQuery)) score += 50

  // Keywords match
  style.keywords.forEach((kw) => {
    if (kw.toLowerCase().includes(normalizedQuery)) score += 20
  })

  // Category match
  if (style.type.toLowerCase().includes(normalizedQuery)) score += 30

  // Chinese alias boost
  for (const [zhKey, enValues] of Object.entries(CHINESE_ALIASES)) {
    if (normalizedQuery.includes(zhKey)) {
      if (style.nameEn.toLowerCase().includes(enValues[0])) score += 60
      for (const alias of enValues) {
        if (style.keywords.some((kw) => kw.toLowerCase().includes(alias))) score += 15
      }
    }
  }

  return score
}

/**
 * Search and sort by relevance
 */
export function searchAndSort(styles: UIStyle[], query: string): UIStyle[] {
  const results = searchStyles(styles, query)
  if (!query.trim()) return results

  return results.sort(
    (a, b) => getSearchScore(b, query) - getSearchScore(a, query)
  )
}
