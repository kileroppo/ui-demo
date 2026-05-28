import type { UIStyle } from '../data/types'
import { styles } from '../data/styles'

export interface AdvisorAnswers {
  productType: string
  feeling: string
  performance: string
  darkMode: string
  complexity: string
}

export interface ScoredStyle {
  style: UIStyle
  score: number
}

export function getRecommendations(answers: AdvisorAnswers): ScoredStyle[] {
  const scored: ScoredStyle[] = styles.map((style) => ({
    style,
    score: calculateScore(style, answers),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 5)
}

function calculateScore(style: UIStyle, answers: AdvisorAnswers): number {
  let score = 0

  // productType: match against bestFor content
  if (answers.productType) {
    const bestForLower = style.bestFor.toLowerCase()
    const productMapping: Record<string, string[]> = {
      '科技SaaS': ['saas', 'platform', 'dashboard', 'app', 'tech', 'software'],
      '电商零售': ['e-commerce', 'shop', 'retail', 'store', 'marketplace', 'product'],
      '医疗健康': ['health', 'wellness', 'medical', 'fitness', 'healthcare'],
      '金融保险': ['finance', 'fintech', 'bank', 'insurance', 'trading'],
      '教育文化': ['education', 'learning', 'course', 'academic', 'culture'],
      '生活服务': ['service', 'lifestyle', 'food', 'travel', 'booking'],
      '创意设计': ['creative', 'portfolio', 'design', 'art', 'studio', 'agency'],
      '其他': [],
    }
    const keywords = productMapping[answers.productType] || []
    for (const kw of keywords) {
      if (bestForLower.includes(kw)) {
        score += 3
      }
    }
  }

  // feeling: modern/classic/playful/professional/creative
  if (answers.feeling) {
    const era = style.era.toLowerCase()
    const type = style.type.toLowerCase()
    const complexity = style.complexity.toLowerCase()
    const keywords = style.keywords.map((k) => k.toLowerCase())

    switch (answers.feeling) {
      case '现代':
        if (era.includes('2020') || era.includes('2010') || era.includes('modern')) score += 4
        if (era.includes('2000')) score += 2
        break
      case '经典':
        if (era.includes('1950') || era.includes('1960') || era.includes('1970') || era.includes('1980') || era.includes('1990')) score += 4
        if (era.includes('2000')) score += 2
        break
      case '活泼':
        if (type.includes('creative') || type.includes('social')) score += 3
        if (keywords.some((k) => k.includes('colorful') || k.includes('playful') || k.includes('fun') || k.includes('vibrant'))) score += 3
        break
      case '专业':
        if (type.includes('enterprise') || type.includes('dashboard')) score += 3
        if (keywords.some((k) => k.includes('professional') || k.includes('corporate') || k.includes('clean') || k.includes('functional'))) score += 3
        break
      case '创意':
        if (complexity === 'high') score += 3
        if (type.includes('creative')) score += 3
        if (keywords.some((k) => k.includes('artistic') || k.includes('creative') || k.includes('experimental') || k.includes('bold'))) score += 2
        break
    }
  }

  // performance preference
  if (answers.performance) {
    const perf = style.performance.toLowerCase()
    switch (answers.performance) {
      case '极致轻量':
        if (perf.includes('excellent')) score += 4
        if (perf.includes('good')) score += 2
        break
      case '丰富特效':
        // neutral - no penalty or bonus
        break
      case '均衡':
        if (perf.includes('excellent') || perf.includes('good')) score += 2
        break
    }
  }

  // darkMode preference
  if (answers.darkMode) {
    const darkMode = style.darkMode.toLowerCase()
    switch (answers.darkMode) {
      case '必须':
        if (darkMode.includes('full')) score += 4
        if (darkMode.includes('partial')) score += 1
        break
      case '不需要':
        // neutral
        break
      case '两者兼顾':
        if (darkMode.includes('full')) score += 2
        break
    }
  }

  // complexity preference
  if (answers.complexity) {
    const complexity = style.complexity.toLowerCase()
    switch (answers.complexity) {
      case '简单':
        if (complexity === 'low') score += 4
        if (complexity === 'medium') score += 1
        break
      case '中等':
        if (complexity === 'medium') score += 4
        if (complexity === 'low' || complexity === 'high') score += 1
        break
      case '复杂':
        if (complexity === 'high') score += 4
        if (complexity === 'medium') score += 1
        break
    }
  }

  return score
}
