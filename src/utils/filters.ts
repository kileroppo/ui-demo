import type { UIStyle } from '../data/types'

export interface FilterOptions {
  category?: string
  performance?: string
  accessibility?: string
  complexity?: string
  mobileFriendly?: string
}

/**
 * Get unique categories from styles
 */
export function getCategories(styles: UIStyle[]): string[] {
  const categories = new Set(styles.map((s) => s.type))
  return Array.from(categories).sort()
}

/**
 * Get unique performance ratings
 */
export function getPerformanceRatings(styles: UIStyle[]): string[] {
  const ratings = new Set(styles.map((s) => s.performance).filter(Boolean))
  return Array.from(ratings)
}

/**
 * Get unique accessibility ratings
 */
export function getAccessibilityRatings(styles: UIStyle[]): string[] {
  const ratings = new Set(styles.map((s) => s.accessibility).filter(Boolean))
  return Array.from(ratings)
}

/**
 * Filter styles based on selected options
 */
export function filterStyles(
  styles: UIStyle[],
  filters: FilterOptions
): UIStyle[] {
  return styles.filter((style) => {
    if (filters.category && style.type !== filters.category) return false
    if (filters.performance && style.performance !== filters.performance)
      return false
    if (filters.accessibility && style.accessibility !== filters.accessibility)
      return false
    if (filters.complexity && style.complexity !== filters.complexity)
      return false
    if (filters.mobileFriendly && style.mobileFriendly !== filters.mobileFriendly)
      return false
    return true
  })
}

/**
 * Combined search and filter
 */
export function applyFilters(
  styles: UIStyle[],
  filters: FilterOptions
): UIStyle[] {
  return filterStyles(styles, filters)
}
