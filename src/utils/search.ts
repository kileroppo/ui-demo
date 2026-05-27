import type { UIStyle } from '../data/types'

/**
 * Fuzzy search across style names, keywords, categories
 * in both Chinese and English
 */
export function searchStyles(styles: UIStyle[], query: string): UIStyle[] {
  if (!query.trim()) return styles

  const normalizedQuery = query.toLowerCase().trim()
  const terms = normalizedQuery.split(/\s+/)

  return styles.filter((style) => {
    const searchableText = [
      style.nameEn,
      style.nameZh,
      style.category,
      style.type,
      ...style.keywords,
      style.bestFor,
      style.effects,
      style.primaryColors,
      style.cssKeywords,
    ]
      .join(' ')
      .toLowerCase()

    return terms.every((term) => searchableText.includes(term))
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
  if (style.category.toLowerCase().includes(normalizedQuery)) score += 30

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
