export interface UIStyle {
  id: number
  nameEn: string
  nameZh: string
  type: string
  keywords: string[]
  primaryColors: string
  secondaryColors: string
  effects: string
  bestFor: string
  doNotUseFor: string
  lightMode: string
  darkMode: string
  performance: string
  accessibility: string
  mobileFriendly: string
  conversionFocused: string
  frameworkCompat: string
  era: string
  complexity: string
  promptEn: string
  promptZh: string
  cssKeywords: string
  implementationChecklist: string[]
  designVariables: string
}

export interface ProductType {
  id: number
  name: string
  nameZh: string
  keywords: string[]
  primaryStyle: string
  secondaryStyles: string
  landingPattern: string
  dashboardStyle: string
  colorFocus: string
  considerations: string
}

export interface ColorPalette {
  id: number
  productType: string
  primary: string
  onPrimary: string
  secondary: string
  onSecondary: string
  accent: string
  onAccent: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  muted: string
  mutedForeground: string
  border: string
  destructive: string
  onDestructive: string
  ring: string
  notes: string
}

export interface FontPairing {
  id: number
  name: string
  category: string
  headingFont: string
  bodyFont: string
  keywords: string[]
  bestFor: string
  googleFontsUrl: string
  cssImport: string
  tailwindConfig: string
  notes: string
}

export type StyleCategory = 
  | 'General'
  | 'Landing Page'
  | 'E-commerce'
  | 'Dashboard'
  | 'Mobile'
  | 'Content'
  | 'Social'
  | 'Enterprise'
  | 'Creative'
  | 'Other'
