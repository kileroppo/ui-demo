import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateCSSVariables, generateMarkdownSummary, downloadFile } from '../../utils/exportScheme'
import type { UIStyle } from '../../data/types'

const mockStyle: UIStyle = {
  id: 1,
  nameEn: 'Minimalism & Swiss Style',
  nameZh: '极简主义',
  type: 'General',
  keywords: ['Clean', 'simple'],
  primaryColors: 'Monochromatic, Black #000000, White #FFFFFF',
  secondaryColors: 'Neutral (Beige #F5F1E8, Grey #808080)',
  effects: 'Subtle hover (200-250ms), smooth transitions',
  bestFor: 'Enterprise apps',
  doNotUseFor: 'Creative portfolios',
  lightMode: '✓ Full',
  darkMode: '✓ Full',
  performance: '⚡ Excellent',
  accessibility: '✓ WCAG AAA',
  mobileFriendly: '✓ High',
  conversionFocused: '◐ Medium',
  frameworkCompat: 'Tailwind 10/10',
  era: '1950s Swiss',
  complexity: 'Low',
  promptEn: 'Design a minimalist landing page.',
  promptZh: '请设计一个极简主义界面。',
  cssKeywords: 'display: grid, gap: 2rem, font-family: sans-serif',
  implementationChecklist: ['Grid-based layout 12-16 columns,', 'Typography hierarchy clear,'],
  designVariables: '--spacing: 2rem, --border-radius: 0px, --font-weight: 400-700',
}

describe('generateCSSVariables', () => {
  it('generates CSS with design variables', () => {
    const result = generateCSSVariables(mockStyle)
    expect(result).toContain(':root {')
    expect(result).toContain('--spacing: 2rem;')
    expect(result).toContain('--border-radius: 0px;')
    expect(result).toContain('--font-weight: 400-700;')
    expect(result).toContain('}')
  })

  it('includes primary colors as CSS variables', () => {
    const result = generateCSSVariables(mockStyle)
    expect(result).toContain('--primary-color-1: #000000;')
    expect(result).toContain('--primary-color-2: #FFFFFF;')
  })

  it('includes secondary colors as CSS variables', () => {
    const result = generateCSSVariables(mockStyle)
    expect(result).toContain('--secondary-color-1: #F5F1E8;')
    expect(result).toContain('--secondary-color-2: #808080;')
  })

  it('includes custom colors when provided', () => {
    const result = generateCSSVariables(mockStyle, ['#FF0000', '#00FF00'])
    expect(result).toContain('--custom-color-1: #FF0000;')
    expect(result).toContain('--custom-color-2: #00FF00;')
  })

  it('handles empty custom colors array', () => {
    const result = generateCSSVariables(mockStyle, [])
    expect(result).not.toContain('--custom-color')
  })

  it('includes comment with style name', () => {
    const result = generateCSSVariables(mockStyle)
    expect(result).toContain('/* CSS Variables for Minimalism & Swiss Style')
    expect(result).toContain('极简主义')
  })

  it('handles style with no hex colors in primaryColors', () => {
    const styleNoHex = { ...mockStyle, primaryColors: 'Warm tones', secondaryColors: 'Cool tones' }
    const result = generateCSSVariables(styleNoHex)
    expect(result).toContain(':root {')
    expect(result).not.toContain('--primary-color')
    expect(result).not.toContain('--secondary-color')
  })

  it('handles empty designVariables', () => {
    const styleEmpty = { ...mockStyle, designVariables: '' }
    const result = generateCSSVariables(styleEmpty)
    expect(result).toContain(':root {')
  })
})

describe('generateMarkdownSummary', () => {
  it('generates markdown with style info', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('# Minimalism & Swiss Style Design Scheme')
    expect(result).toContain('## Style: 极简主义 (Minimalism & Swiss Style)')
  })

  it('includes color information', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('**Primary:** Monochromatic, Black #000000, White #FFFFFF')
    expect(result).toContain('**Secondary:**')
  })

  it('includes effects', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('Subtle hover (200-250ms)')
  })

  it('includes CSS keywords in code block', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('```css')
    expect(result).toContain('display: grid')
  })

  it('includes design variables', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('--spacing: 2rem')
  })

  it('includes implementation checklist', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('- [ ] Grid-based layout 12-16 columns')
    expect(result).toContain('- [ ] Typography hierarchy clear')
  })

  it('uses project name in title when provided', () => {
    const result = generateMarkdownSummary(mockStyle, 'My Project')
    expect(result).toContain('# My Project - Design Scheme')
  })

  it('includes type, era, and complexity', () => {
    const result = generateMarkdownSummary(mockStyle)
    expect(result).toContain('**Type:** General')
    expect(result).toContain('**Era:** 1950s Swiss')
    expect(result).toContain('**Complexity:** Low')
  })
})

describe('downloadFile', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('creates a blob and triggers download', () => {
    const mockUrl = 'blob:http://localhost/test-url'
    const createObjectURLSpy = vi.fn().mockReturnValue(mockUrl)
    const revokeObjectURLSpy = vi.fn()
    window.URL.createObjectURL = createObjectURLSpy
    window.URL.revokeObjectURL = revokeObjectURLSpy

    const mockClick = vi.fn()
    const mockAnchor = {
      href: '',
      download: '',
      click: mockClick,
    } as unknown as HTMLAnchorElement

    vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as unknown as HTMLElement)
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node)
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node)

    downloadFile('test content', 'test.css', 'text/css')

    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob))
    expect(mockAnchor.href).toBe(mockUrl)
    expect(mockAnchor.download).toBe('test.css')
    expect(mockClick).toHaveBeenCalled()
    expect(revokeObjectURLSpy).toHaveBeenCalledWith(mockUrl)
  })

  it('creates blob with correct mime type', () => {
    const createObjectURLSpy = vi.fn().mockReturnValue('blob:test')
    window.URL.createObjectURL = createObjectURLSpy
    window.URL.revokeObjectURL = vi.fn()

    const mockAnchor = { href: '', download: '', click: vi.fn() } as unknown as HTMLAnchorElement
    vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as unknown as HTMLElement)
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node)
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node)

    downloadFile('# Markdown', 'file.md', 'text/markdown')

    const blobArg = createObjectURLSpy.mock.calls[0][0] as Blob
    expect(blobArg).toBeInstanceOf(Blob)
    expect(blobArg.type).toBe('text/markdown')
  })

  it('removes the anchor element after click', () => {
    window.URL.createObjectURL = vi.fn().mockReturnValue('blob:test')
    window.URL.revokeObjectURL = vi.fn()

    const mockAnchor = { href: '', download: '', click: vi.fn() } as unknown as HTMLAnchorElement
    vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor as unknown as HTMLElement)
    const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node)
    const removeSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node)

    downloadFile('content', 'file.txt', 'text/plain')

    expect(appendSpy).toHaveBeenCalledWith(mockAnchor)
    expect(removeSpy).toHaveBeenCalledWith(mockAnchor)
  })
})
