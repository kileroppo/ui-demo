import { describe, it, expect } from 'vitest'
import {
  filterStyles,
  getCategories,
  getPerformanceRatings,
  getAccessibilityRatings,
  applyFilters,
} from '../../utils/filters'
import type { UIStyle } from '../../data/types'

const mockStyles: UIStyle[] = [
  {
    id: 1,
    nameEn: 'Glassmorphism',
    nameZh: '玻璃拟态',
    category: 'General',
    type: 'General',
    keywords: ['glass'],
    primaryColors: '',
    secondaryColors: '',
    effects: '',
    bestFor: '',
    doNotUseFor: '',
    lightMode: '',
    darkMode: '',
    performance: '⚠ Good',
    accessibility: '⚠ Ensure 4.5:1',
    mobileFriendly: '✓ Good',
    conversionFocused: '✓ High',
    frameworkCompat: '',
    era: '',
    complexity: 'Medium',
    promptEn: '',
    promptZh: '',
    cssKeywords: '',
    implementationChecklist: [],
    designVariables: '',
  },
  {
    id: 2,
    nameEn: 'Brutalism',
    nameZh: '粗野主义',
    category: 'General',
    type: 'General',
    keywords: ['raw'],
    primaryColors: '',
    secondaryColors: '',
    effects: '',
    bestFor: '',
    doNotUseFor: '',
    lightMode: '',
    darkMode: '',
    performance: '⚡ Excellent',
    accessibility: '✓ WCAG AAA',
    mobileFriendly: '◐ Medium',
    conversionFocused: '✗ Low',
    frameworkCompat: '',
    era: '',
    complexity: 'Low',
    promptEn: '',
    promptZh: '',
    cssKeywords: '',
    implementationChecklist: [],
    designVariables: '',
  },
  {
    id: 3,
    nameEn: 'Hero-Centric Design',
    nameZh: '主视觉设计',
    category: 'Landing Page',
    type: 'Landing Page',
    keywords: ['hero'],
    primaryColors: '',
    secondaryColors: '',
    effects: '',
    bestFor: '',
    doNotUseFor: '',
    lightMode: '',
    darkMode: '',
    performance: '⚡ Excellent',
    accessibility: '✓ WCAG AA',
    mobileFriendly: '✓ Full',
    conversionFocused: '✓ Very High',
    frameworkCompat: '',
    era: '',
    complexity: 'Medium',
    promptEn: '',
    promptZh: '',
    cssKeywords: '',
    implementationChecklist: [],
    designVariables: '',
  },
]

describe('getCategories', () => {
  it('returns unique sorted categories', () => {
    const categories = getCategories(mockStyles)
    expect(categories).toEqual(['General', 'Landing Page'])
  })

  it('returns empty array for empty input', () => {
    expect(getCategories([])).toEqual([])
  })
})

describe('getPerformanceRatings', () => {
  it('returns unique performance ratings', () => {
    const ratings = getPerformanceRatings(mockStyles)
    expect(ratings).toContain('⚠ Good')
    expect(ratings).toContain('⚡ Excellent')
    expect(ratings.length).toBe(2)
  })

  it('returns empty array for empty input', () => {
    expect(getPerformanceRatings([])).toEqual([])
  })
})

describe('getAccessibilityRatings', () => {
  it('returns unique accessibility ratings', () => {
    const ratings = getAccessibilityRatings(mockStyles)
    expect(ratings).toContain('⚠ Ensure 4.5:1')
    expect(ratings).toContain('✓ WCAG AAA')
    expect(ratings).toContain('✓ WCAG AA')
    expect(ratings.length).toBe(3)
  })

  it('returns empty array for empty input', () => {
    expect(getAccessibilityRatings([])).toEqual([])
  })
})

describe('filterStyles', () => {
  it('returns all styles with no filters', () => {
    const results = filterStyles(mockStyles, {})
    expect(results).toHaveLength(3)
  })

  it('filters by category', () => {
    const results = filterStyles(mockStyles, { category: 'Landing Page' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(3)
  })

  it('filters by performance', () => {
    const results = filterStyles(mockStyles, { performance: '⚡ Excellent' })
    expect(results).toHaveLength(2)
  })

  it('filters by accessibility', () => {
    const results = filterStyles(mockStyles, { accessibility: '✓ WCAG AAA' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(2)
  })

  it('filters by complexity', () => {
    const results = filterStyles(mockStyles, { complexity: 'Low' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(2)
  })

  it('filters by mobileFriendly', () => {
    const results = filterStyles(mockStyles, { mobileFriendly: '✓ Good' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('combines multiple filters', () => {
    const results = filterStyles(mockStyles, {
      category: 'General',
      performance: '⚡ Excellent',
    })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(2)
  })

  it('returns empty when no match', () => {
    const results = filterStyles(mockStyles, { category: 'NonExistent' })
    expect(results).toHaveLength(0)
  })
})

describe('applyFilters', () => {
  it('applies filters correctly', () => {
    const results = applyFilters(mockStyles, { category: 'General' })
    expect(results).toHaveLength(2)
  })
})
