import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const DATA_DIR = '/projects/sandbox/ui-ux-pro-max-skill/src/ui-ux-pro-max/data'
const OUT_DIR = join(import.meta.dirname, '..', 'src', 'data')

mkdirSync(OUT_DIR, { recursive: true })

// Simple CSV parser that handles quoted fields with commas
function parseCSV(text) {
  const lines = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i+1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      lines.push(current)
      current = ''
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i+1] === '\n') i++
      lines.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  if (current) lines.push(current)
  
  // Re-parse as rows
  const rawText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const rows = []
  let row = []
  let field = ''
  let insideQuotes = false
  
  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText[i]
    if (ch === '"') {
      if (insideQuotes && rawText[i+1] === '"') {
        field += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (ch === ',' && !insideQuotes) {
      row.push(field.trim())
      field = ''
    } else if (ch === '\n' && !insideQuotes) {
      row.push(field.trim())
      if (row.some(f => f.length > 0)) rows.push(row)
      row = []
      field = ''
    } else {
      field += ch
    }
  }
  row.push(field.trim())
  if (row.some(f => f.length > 0)) rows.push(row)
  
  return rows
}

function readCSV(filename) {
  const text = readFileSync(join(DATA_DIR, filename), 'utf-8')
  const rows = parseCSV(text)
  const headers = rows[0]
  return rows.slice(1).map(row => {
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = row[i] || ''
    })
    return obj
  })
}

// Chinese translations for style names
const zhNames = {
  'Minimalism & Swiss Style': '极简主义',
  'Neumorphism': '新拟态',
  'Glassmorphism': '玻璃拟态',
  'Brutalism': '粗野主义',
  '3D & Hyperrealism': '3D超写实',
  'Vibrant & Block-based': '活力色块',
  'Dark Mode (OLED)': '深色模式',
  'Accessible & Ethical': '无障碍设计',
  'Claymorphism': '粘土拟态',
  'Aurora UI': '极光界面',
  'Retro-Futurism': '复古未来',
  'Flat Design': '扁平设计',
  'Skeuomorphism': '拟物化设计',
  'Liquid Glass': '流体玻璃',
  'Motion-Driven': '动效驱动',
  'Micro-interactions': '微交互',
  'Inclusive Design': '包容性设计',
  'Zero Interface': '零界面',
  'Soft UI Evolution': '柔和界面进化',
  'Hero-Centric Design': '主视觉设计',
  'Conversion-Optimized': '转化优化',
  'Storytelling Layout': '故事化布局',
  'Minimal & Direct': '极简直达',
  'Interactive Demo': '互动演示',
  'Product-Led': '产品主导',
  'Social Proof Heavy': '社会认证',
  'Comparison-Focused': '对比聚焦',
  'Waitlist/Pre-launch': '预发布',
  'Long-form Sales': '长文案销售',
  'Card-based Commerce': '卡片电商',
  'Immersive Product': '沉浸式产品',
  'Speed Commerce': '极速电商',
  'Luxury E-commerce': '奢侈品电商',
  'Marketplace Multi-vendor': '多商户市集',
  'Subscription Commerce': '订阅制电商',
  'Social Commerce': '社交电商',
  'Data-Dense Dashboard': '数据密集仪表盘',
  'Executive Dashboard': '管理层仪表盘',
  'Real-Time Monitoring': '实时监控',
  'Analytics & Insights': '分析洞察',
  'Creative Dashboard': '创意仪表盘',
  'Mobile-First Minimal': '移动优先极简',
  'Gesture-Heavy Mobile': '手势驱动移动端',
  'Bottom-Nav Mobile': '底部导航移动端',
  'Card-Stack Mobile': '卡片堆叠移动端',
  'Super App Mobile': '超级应用移动端',
  'Long-form Content': '长文内容',
  'Magazine Editorial': '杂志编辑',
  'Documentation/Wiki': '文档知识库',
  'Blog/Personal': '博客个人',
  'News/Media Feed': '新闻媒体流',
  'Social Feed': '社交动态流',
  'Community Platform': '社区平台',
  'Messaging/Chat': '即时通讯',
  'Creator Platform': '创作者平台',
  'Enterprise SaaS': '企业级SaaS',
  'Admin Panel': '管理后台',
  'CRM Interface': 'CRM界面',
  'Internal Tools': '内部工具',
  'Design Tool UI': '设计工具界面',
  'Code Editor UI': '代码编辑器界面',
  'Music/Audio UI': '音频界面',
  'Video Platform': '视频平台',
  'AI/ML Interface': 'AI智能界面',
  'Gamified UI': '游戏化界面',
  'Organic & Natural': '有机自然风',
  'Cyberpunk': '赛博朋克',
}

function generatePromptZh(style) {
  const name = zhNames[style['Style Category']] || style['Style Category']
  const effects = style['Effects & Animation'] || '视觉效果'
  const colors = style['Primary Colors'] || '品牌色'
  const bestFor = style['Best For'] || '通用场景'
  const css = style['CSS/Technical Keywords'] || 'CSS3'
  
  return `请设计一个${name}界面。使用：${effects.substring(0, 60)}。配色：${colors.substring(0, 50)}。适用于：${bestFor.substring(0, 50)}。技术要点：${css.substring(0, 60)}。`
}

// Process styles
const stylesRaw = readCSV('styles.csv')
const styles = stylesRaw.map((s, i) => ({
  id: parseInt(s['No']) || i + 1,
  nameEn: s['Style Category'] || '',
  nameZh: zhNames[s['Style Category']] || s['Style Category'],
  category: s['Type'] || 'General',
  type: s['Type'] || 'General',
  keywords: (s['Keywords'] || '').split(',').map(k => k.trim()).filter(Boolean),
  primaryColors: s['Primary Colors'] || '',
  secondaryColors: s['Secondary Colors'] || '',
  effects: s['Effects & Animation'] || '',
  bestFor: s['Best For'] || '',
  doNotUseFor: s['Do Not Use For'] || '',
  lightMode: s['Light Mode ✓'] || '',
  darkMode: s['Dark Mode ✓'] || '',
  performance: s['Performance'] || '',
  accessibility: s['Accessibility'] || '',
  mobileFriendly: s['Mobile-Friendly'] || '',
  conversionFocused: s['Conversion-Focused'] || '',
  frameworkCompat: s['Framework Compatibility'] || '',
  era: s['Era/Origin'] || '',
  complexity: s['Complexity'] || '',
  promptEn: s['AI Prompt Keywords'] || '',
  promptZh: generatePromptZh(s),
  cssKeywords: s['CSS/Technical Keywords'] || '',
  implementationChecklist: (s['Implementation Checklist'] || '').split('☐').map(c => c.trim()).filter(Boolean),
  designVariables: s['Design System Variables'] || '',
}))

// Process products
const productsRaw = readCSV('products.csv')
const productZhNames = {
  'SaaS (General)': '通用SaaS',
  'Micro SaaS': '微型SaaS',
  'E-commerce (General)': '通用电商',
  'FinTech': '金融科技',
  'EdTech': '教育科技',
  'HealthTech': '健康科技',
  'AI/ML Platform': 'AI/ML平台',
  'Social Media': '社交媒体',
  'Marketplace': '交易市场',
  'Gaming': '游戏',
  'Food & Delivery': '餐饮外卖',
  'Travel & Booking': '旅行预订',
  'Real Estate': '房地产',
  'Fitness & Wellness': '健身养生',
  'News & Media': '新闻媒体',
}

const products = productsRaw.map((p, i) => ({
  id: parseInt(p['No']) || i + 1,
  name: p['Product Type'] || '',
  nameZh: productZhNames[p['Product Type']] || p['Product Type'],
  keywords: (p['Keywords'] || '').split(',').map(k => k.trim()).filter(Boolean),
  primaryStyle: p['Primary Style Recommendation'] || '',
  secondaryStyles: p['Secondary Styles'] || '',
  landingPattern: p['Landing Page Pattern'] || '',
  dashboardStyle: p['Dashboard Style (if applicable)'] || '',
  colorFocus: p['Color Palette Focus'] || '',
  considerations: p['Key Considerations'] || '',
}))

// Process colors
const colorsRaw = readCSV('colors.csv')
const colors = colorsRaw.map((c, i) => ({
  id: parseInt(c['No']) || i + 1,
  productType: c['Product Type'] || '',
  primary: c['Primary'] || '',
  onPrimary: c['On Primary'] || '',
  secondary: c['Secondary'] || '',
  onSecondary: c['On Secondary'] || '',
  accent: c['Accent'] || '',
  onAccent: c['On Accent'] || '',
  background: c['Background'] || '',
  foreground: c['Foreground'] || '',
  card: c['Card'] || '',
  cardForeground: c['Card Foreground'] || '',
  muted: c['Muted'] || '',
  mutedForeground: c['Muted Foreground'] || '',
  border: c['Border'] || '',
  destructive: c['Destructive'] || '',
  onDestructive: c['On Destructive'] || '',
  ring: c['Ring'] || '',
  notes: c['Notes'] || '',
}))

// Process typography
const typographyRaw = readCSV('typography.csv')
const typography = typographyRaw.map((t, i) => ({
  id: parseInt(t['No']) || i + 1,
  name: t['Font Pairing Name'] || '',
  category: t['Category'] || '',
  headingFont: t['Heading Font'] || '',
  bodyFont: t['Body Font'] || '',
  keywords: (t['Mood/Style Keywords'] || '').split(',').map(k => k.trim()).filter(Boolean),
  bestFor: t['Best For'] || '',
  googleFontsUrl: t['Google Fonts URL'] || '',
  cssImport: t['CSS Import'] || '',
  tailwindConfig: t['Tailwind Config'] || '',
  notes: t['Notes'] || '',
}))

// Write output files
function writeTS(filename, varName, data, typeName) {
  const content = `import type { ${typeName} } from './types'\n\nexport const ${varName}: ${typeName}[] = ${JSON.stringify(data, null, 2)}\n`
  writeFileSync(join(OUT_DIR, filename), content, 'utf-8')
}

writeTS('styles.ts', 'styles', styles, 'UIStyle')
writeTS('products.ts', 'products', products, 'ProductType')
writeTS('colors.ts', 'colors', colors, 'ColorPalette')
writeTS('typography.ts', 'typography', typography, 'FontPairing')

// Write index
const indexContent = `export { styles } from './styles'
export { products } from './products'
export { colors } from './colors'
export { typography } from './typography'
export type { UIStyle, ProductType, ColorPalette, FontPairing, StyleCategory } from './types'
`
writeFileSync(join(OUT_DIR, 'index.ts'), indexContent, 'utf-8')

console.log(`Generated data files:`)
console.log(`  - styles.ts: ${styles.length} styles`)
console.log(`  - products.ts: ${products.length} products`)
console.log(`  - colors.ts: ${colors.length} color palettes`)
console.log(`  - typography.ts: ${typography.length} font pairings`)
