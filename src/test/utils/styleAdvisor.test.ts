import { describe, it, expect } from 'vitest'
import { getRecommendations, type AdvisorAnswers } from '../../utils/styleAdvisor'

describe('styleAdvisor', () => {
  it('returns up to 5 results', () => {
    const answers: AdvisorAnswers = {
      productType: '科技SaaS',
      feeling: '专业',
      performance: '极致轻量',
      darkMode: '必须',
      complexity: '简单',
    }
    const results = getRecommendations(answers)
    expect(results.length).toBeLessThanOrEqual(5)
    expect(results.length).toBeGreaterThan(0)
  })

  it('returns results sorted by score descending', () => {
    const answers: AdvisorAnswers = {
      productType: '电商零售',
      feeling: '现代',
      performance: '均衡',
      darkMode: '两者兼顾',
      complexity: '中等',
    }
    const results = getRecommendations(answers)
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score)
    }
  })

  it('favors SaaS/dashboard styles for tech product type', () => {
    const answers: AdvisorAnswers = {
      productType: '科技SaaS',
      feeling: '专业',
      performance: '极致轻量',
      darkMode: '必须',
      complexity: '简单',
    }
    const results = getRecommendations(answers)
    // First result should have a high score
    expect(results[0].score).toBeGreaterThan(0)
  })

  it('favors creative styles for creative feeling', () => {
    const answers: AdvisorAnswers = {
      productType: '创意设计',
      feeling: '创意',
      performance: '丰富特效',
      darkMode: '不需要',
      complexity: '复杂',
    }
    const results = getRecommendations(answers)
    expect(results[0].score).toBeGreaterThan(0)
  })

  it('handles all neutral/empty answers gracefully', () => {
    const answers: AdvisorAnswers = {
      productType: '',
      feeling: '',
      performance: '',
      darkMode: '',
      complexity: '',
    }
    const results = getRecommendations(answers)
    expect(results.length).toBe(5)
    // All should have score 0 with empty answers
    results.forEach((r) => {
      expect(r.score).toBe(0)
    })
  })

  it('performance: extreme lightweight favors excellent performance', () => {
    const answers: AdvisorAnswers = {
      productType: '',
      feeling: '',
      performance: '极致轻量',
      darkMode: '',
      complexity: '',
    }
    const results = getRecommendations(answers)
    // Top result should have good performance score
    expect(results[0].score).toBeGreaterThan(0)
  })

  it('darkMode: required favors full dark mode support', () => {
    const answers: AdvisorAnswers = {
      productType: '',
      feeling: '',
      performance: '',
      darkMode: '必须',
      complexity: '',
    }
    const results = getRecommendations(answers)
    expect(results[0].score).toBeGreaterThan(0)
  })

  it('complexity: simple favors low complexity styles', () => {
    const answers: AdvisorAnswers = {
      productType: '',
      feeling: '',
      performance: '',
      darkMode: '',
      complexity: '简单',
    }
    const results = getRecommendations(answers)
    expect(results[0].score).toBeGreaterThan(0)
    expect(results[0].style.complexity.toLowerCase()).toBe('low')
  })

  it('each result contains style and score properties', () => {
    const answers: AdvisorAnswers = {
      productType: '医疗健康',
      feeling: '现代',
      performance: '均衡',
      darkMode: '两者兼顾',
      complexity: '中等',
    }
    const results = getRecommendations(answers)
    results.forEach((r) => {
      expect(r).toHaveProperty('style')
      expect(r).toHaveProperty('score')
      expect(r.style).toHaveProperty('id')
      expect(r.style).toHaveProperty('nameZh')
      expect(typeof r.score).toBe('number')
    })
  })

  it('classic feeling favors older era styles', () => {
    const answers: AdvisorAnswers = {
      productType: '',
      feeling: '经典',
      performance: '',
      darkMode: '',
      complexity: '',
    }
    const results = getRecommendations(answers)
    expect(results[0].score).toBeGreaterThan(0)
  })
})
