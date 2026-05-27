import { describe, it, expect } from 'vitest'
import { searchStyles, getSearchScore, searchAndSort } from '../../utils/search'
import type { UIStyle } from '../../data/types'

const mockStyles: UIStyle[] = [
  {
    id: 1,
    nameEn: 'Glassmorphism',
    nameZh: '玻璃拟态',
    type: 'General',
    keywords: ['Frosted glass', 'transparent', 'blurred background'],
    primaryColors: 'Translucent white: rgba(255,255,255,0.1-0.3)',
    secondaryColors: 'Electric Blue #0080FF',
    effects: 'Backdrop blur (10-20px)',
    bestFor: 'Modern SaaS, financial dashboards',
    doNotUseFor: 'Low-contrast backgrounds',
    lightMode: 'Full',
    darkMode: 'Full',
    performance: 'Good',
    accessibility: 'Ensure 4.5:1',
    mobileFriendly: 'Good',
    conversionFocused: 'High',
    frameworkCompat: 'Tailwind 9/10',
    era: '2020s Modern',
    complexity: 'Medium',
    promptEn: 'Design a glassmorphic interface',
    promptZh: '请设计一个玻璃拟态界面。使用：毛玻璃效果。',
    cssKeywords: 'backdrop-filter: blur(15px)',
    implementationChecklist: ['Backdrop-filter blur 10-20px', 'Translucent white'],
    designVariables: '--blur-amount: 15px',
  },
  {
    id: 2,
    nameEn: 'Brutalism',
    nameZh: '粗野主义',
    type: 'General',
    keywords: ['Raw', 'unpolished', 'stark', 'high contrast'],
    primaryColors: 'Primary: Red #FF0000, Blue #0000FF',
    secondaryColors: 'Neon Green #00FF00',
    effects: 'No smooth transitions',
    bestFor: 'Design portfolios, artistic projects',
    doNotUseFor: 'Corporate environments',
    lightMode: 'Full',
    darkMode: 'Full',
    performance: 'Excellent',
    accessibility: 'WCAG AAA',
    mobileFriendly: 'Medium',
    conversionFocused: 'Low',
    frameworkCompat: 'Tailwind 10/10',
    era: '1950s Brutalist',
    complexity: 'Low',
    promptEn: 'Create a brutalist design',
    promptZh: '请设计一个粗野主义界面。使用：原始色块。',
    cssKeywords: 'border-radius: 0px',
    implementationChecklist: ['No border-radius', 'No transitions'],
    designVariables: '--border-radius: 0px',
  },
  {
    id: 3,
    nameEn: 'Dark Mode (OLED)',
    nameZh: '深色模式',
    type: 'General',
    keywords: ['Dark theme', 'low light', 'OLED', 'night mode'],
    primaryColors: 'Deep Black #000000',
    secondaryColors: 'Neon Green #39FF14',
    effects: 'Minimal glow',
    bestFor: 'Night-mode apps, coding platforms',
    doNotUseFor: 'Print-first content',
    lightMode: 'No',
    darkMode: 'Only',
    performance: 'Excellent',
    accessibility: 'WCAG AAA',
    mobileFriendly: 'High',
    conversionFocused: 'Low',
    frameworkCompat: 'Tailwind 10/10',
    era: '2020s Modern',
    complexity: 'Low',
    promptEn: 'Create an OLED dark interface',
    promptZh: '请设计一个深色模式界面。使用：OLED纯黑背景。',
    cssKeywords: 'background: #000000',
    implementationChecklist: ['Deep black', 'Vibrant neon accents'],
    designVariables: '--bg-black: #000000',
  },
]

describe('searchStyles', () => {
  it('returns all styles for empty query', () => {
    expect(searchStyles(mockStyles, '')).toEqual(mockStyles)
    expect(searchStyles(mockStyles, '   ')).toEqual(mockStyles)
  })

  it('searches by English name', () => {
    const results = searchStyles(mockStyles, 'Glassmorphism')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('searches by Chinese name', () => {
    const results = searchStyles(mockStyles, '玻璃')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('searches by keyword', () => {
    const results = searchStyles(mockStyles, 'frosted')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('searches case-insensitively', () => {
    const results = searchStyles(mockStyles, 'BRUTALISM')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(2)
  })

  it('supports multi-term search', () => {
    const results = searchStyles(mockStyles, 'dark OLED')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(3)
  })

  it('returns empty for no match', () => {
    const results = searchStyles(mockStyles, 'xyz123nope')
    expect(results).toHaveLength(0)
  })

  it('searches by bestFor field', () => {
    const results = searchStyles(mockStyles, 'SaaS')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('searches by effects field', () => {
    const results = searchStyles(mockStyles, 'blur')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('searches by CSS keywords', () => {
    const results = searchStyles(mockStyles, 'backdrop-filter')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)
  })

  it('searches by Chinese alias (玻璃 -> glass)', () => {
    const results = searchStyles(mockStyles, '玻璃')
    expect(results).toHaveLength(1)
    expect(results[0].nameEn).toBe('Glassmorphism')
  })

  it('searches by Chinese alias (暗色 -> dark)', () => {
    const results = searchStyles(mockStyles, '暗色')
    expect(results).toHaveLength(1)
    expect(results[0].nameEn).toBe('Dark Mode (OLED)')
  })

  it('searches by Chinese alias (粗野 -> brutal)', () => {
    const results = searchStyles(mockStyles, '粗野')
    expect(results).toHaveLength(1)
    expect(results[0].nameEn).toBe('Brutalism')
  })
})

describe('getSearchScore', () => {
  it('returns 0 for empty query', () => {
    expect(getSearchScore(mockStyles[0], '')).toBe(0)
    expect(getSearchScore(mockStyles[0], '   ')).toBe(0)
  })

  it('gives highest score for exact name match', () => {
    const score = getSearchScore(mockStyles[0], 'Glassmorphism')
    expect(score).toBeGreaterThanOrEqual(100)
  })

  it('gives high score for Chinese name match', () => {
    const score = getSearchScore(mockStyles[0], '玻璃拟态')
    expect(score).toBeGreaterThanOrEqual(100)
  })

  it('gives moderate score for partial name match', () => {
    const score = getSearchScore(mockStyles[0], 'glass')
    expect(score).toBeGreaterThan(0)
  })

  it('gives score for keyword match', () => {
    const score = getSearchScore(mockStyles[0], 'frosted')
    expect(score).toBeGreaterThan(0)
  })

  it('gives score for category match', () => {
    const score = getSearchScore(mockStyles[0], 'general')
    expect(score).toBeGreaterThan(0)
  })

  it('gives score for Chinese alias match', () => {
    const score = getSearchScore(mockStyles[0], '玻璃')
    expect(score).toBeGreaterThan(0)
  })
})

describe('searchAndSort', () => {
  it('returns all styles for empty query', () => {
    const results = searchAndSort(mockStyles, '')
    expect(results).toEqual(mockStyles)
  })

  it('sorts by relevance score', () => {
    const results = searchAndSort(mockStyles, 'glass')
    expect(results[0].id).toBe(1) // Glassmorphism should be first
  })

  it('handles Chinese search and sort', () => {
    const results = searchAndSort(mockStyles, '粗野')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(2)
  })

  it('handles Chinese alias search', () => {
    const results = searchAndSort(mockStyles, '暗色')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].id).toBe(3)
  })
})
