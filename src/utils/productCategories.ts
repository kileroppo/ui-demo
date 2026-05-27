import type { ProductType } from '../data/types'

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Tech & SaaS': ['saas', 'software', 'developer', 'api', 'ide', 'cloud', 'devops'],
  Finance: ['fintech', 'crypto', 'banking', 'insurance', 'finance', 'invoice', 'billing', 'payment'],
  Healthcare: ['medical', 'health', 'dental', 'pharmacy', 'veterinary', 'mental', 'clinic', 'wellness'],
  'E-commerce': ['e-commerce', 'ecommerce', 'shopping', 'marketplace', 'retail', 'subscription box', 'food delivery'],
  Services: ['beauty', 'spa', 'restaurant', 'hotel', 'legal', 'booking', 'appointment', 'home service', 'cleaning'],
  Creative: ['portfolio', 'agency', 'photography', 'gaming', 'music', 'design', 'art', 'video'],
  Education: ['education', 'course', 'learning', 'lms', 'school', 'quiz', 'tutorial'],
  Lifestyle: ['fitness', 'recipe', 'cooking', 'meditation', 'weather', 'diary', 'habit', 'mood', 'travel'],
}

export const CATEGORY_ICONS: Record<string, string> = {
  'Tech & SaaS': '💻',
  Finance: '💰',
  Healthcare: '🏥',
  'E-commerce': '🛒',
  Services: '🏨',
  Creative: '🎨',
  Education: '📚',
  Lifestyle: '🌿',
  Other: '📦',
}

function matchesKeyword(searchText: string, keyword: string): boolean {
  // For multi-word keywords, simple includes is fine
  if (keyword.includes(' ') || keyword.includes('-')) {
    return searchText.includes(keyword)
  }
  // For single-word keywords, check if it appears as a whole word in the keywords array
  // or as a substring in the product name
  const words = searchText.split(/[\s,]+/)
  return words.some((word) => word === keyword || word.startsWith(keyword) || word.endsWith(keyword))
}

function getProductCategory(product: ProductType): string {
  const searchText = [product.name, ...product.keywords].join(' ').toLowerCase()

  // Categories are checked in insertion order intentionally. The first match wins,
  // establishing a priority: Tech > Finance > Healthcare > E-commerce > Services >
  // Creative > Education > Lifestyle. This ensures that a product matching multiple
  // categories lands in the most specific/relevant one by design.
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (matchesKeyword(searchText, keyword)) {
        return category
      }
    }
  }
  return 'Other'
}

export function groupProductsByCategory(products: ProductType[]): Record<string, ProductType[]> {
  const groups: Record<string, ProductType[]> = {}

  for (const product of products) {
    const category = getProductCategory(product)
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(product)
  }

  return groups
}

export function getProductsForStyle(products: ProductType[], styleName: string): ProductType[] {
  const lower = styleName.toLowerCase()
  return products.filter((product) => {
    const primary = product.primaryStyle.toLowerCase()
    const secondary = product.secondaryStyles.toLowerCase()
    return primary.includes(lower) || secondary.includes(lower)
  })
}
