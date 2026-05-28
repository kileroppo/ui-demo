import { describe, it, expect } from 'vitest'
import { generatePromptVariants } from '../../utils/promptGenerator'
import type { UIStyle } from '../../data/types'
import { styles } from '../../data/styles'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Glassmorphism',
  nameZh: '玻璃拟态',
  type: 'General',
  keywords: ['Frosted glass', 'transparent', 'blur'],
  primaryColors: 'Translucent white rgba(255,255,255,0.2)',
  secondaryColors: 'Electric Blue #3B82F6',
  effects: 'Backdrop blur, frosted glass layering',
  bestFor: 'Modern SaaS dashboards, creative portfolios',
  doNotUseFor: 'Low-contrast backgrounds',
  lightMode: 'Full',
  darkMode: 'Full',
  performance: 'Good',
  accessibility: 'Ensure 4.5:1',
  mobileFriendly: 'Good',
  conversionFocused: 'High',
  frameworkCompat: 'Tailwind 9/10',
  era: '2020s',
  complexity: 'Medium',
  promptEn: 'Design a glassmorphic interface',
  promptZh: '请设计一个玻璃拟态界面。使用：毛玻璃效果、模糊背景。',
  cssKeywords: 'backdrop-filter: blur(15px), background: rgba(255,255,255,0.1)',
  implementationChecklist: ['Blur 10-20px', 'Opacity 15-30%', 'Border: 1px solid rgba'],
  designVariables: '--blur: 15px, --glass-opacity: 0.2',
}

describe('generatePromptVariants', () => {
  it('generates all 3 non-empty prompt variants', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.uiDesign).toBeTruthy()
    expect(variants.imageGen).toBeTruthy()
    expect(variants.codeGen).toBeTruthy()
  })

  it('uiDesign contains style name and colors', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.uiDesign).toContain('玻璃拟态')
    expect(variants.uiDesign).toContain('Translucent white')
  })

  it('uiDesign contains effects and bestFor', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.uiDesign).toContain('Backdrop blur')
    expect(variants.uiDesign).toContain('Modern SaaS')
  })

  it('imageGen contains visual keywords and color palette', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.imageGen).toContain('Frosted glass')
    expect(variants.imageGen).toContain('transparent')
    expect(variants.imageGen).toContain('Translucent white')
  })

  it('imageGen contains style name and format markers', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.imageGen).toContain('玻璃拟态')
    expect(variants.imageGen).toContain('色彩')
    expect(variants.imageGen).toContain('视觉效果')
    expect(variants.imageGen).toContain('氛围')
    expect(variants.imageGen).toContain('适合')
  })

  it('codeGen contains CSS keywords and implementation checklist items', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.codeGen).toContain('backdrop-filter: blur(15px)')
    expect(variants.codeGen).toContain('Blur 10-20px')
    expect(variants.codeGen).toContain('Opacity 15-30%')
  })

  it('codeGen contains design variables and style name', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.codeGen).toContain('--blur: 15px')
    expect(variants.codeGen).toContain('玻璃拟态')
    expect(variants.codeGen).toContain('设计变量')
    expect(variants.codeGen).toContain('实现清单')
  })

  it('works with General style type (style ID 1)', () => {
    const generalStyle = styles.find((s) => s.type === 'General')!
    const variants = generatePromptVariants(generalStyle)
    expect(variants.uiDesign.length).toBeGreaterThan(10)
    expect(variants.imageGen.length).toBeGreaterThan(10)
    expect(variants.codeGen.length).toBeGreaterThan(10)
  })

  it('works with Landing Page style type', () => {
    const landingStyle = styles.find((s) => s.type === 'Landing Page')!
    const variants = generatePromptVariants(landingStyle)
    expect(variants.uiDesign).toContain(landingStyle.nameZh)
    expect(variants.imageGen).toContain(landingStyle.nameZh)
    expect(variants.codeGen).toContain(landingStyle.nameZh)
  })

  it('works with Dashboard style type', () => {
    const biStyle = styles.find((s) => s.type === 'BI/Analytics')!
    const variants = generatePromptVariants(biStyle)
    expect(variants.uiDesign).toContain(biStyle.nameZh)
    expect(variants.imageGen).toContain(biStyle.primaryColors)
    expect(variants.codeGen).toContain(biStyle.cssKeywords)
  })

  it('all variants produce different content', () => {
    const variants = generatePromptVariants(mockStyle)
    expect(variants.uiDesign).not.toBe(variants.imageGen)
    expect(variants.imageGen).not.toBe(variants.codeGen)
    expect(variants.uiDesign).not.toBe(variants.codeGen)
  })
})
