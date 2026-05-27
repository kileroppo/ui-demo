import { describe, it, expect } from 'vitest'
import { groupProductsByCategory, getProductsForStyle, CATEGORY_ICONS } from '../../utils/productCategories'
import { products } from '../../data'

describe('productCategories', () => {
  describe('groupProductsByCategory', () => {
    it('assigns all products to a category (no product lost)', () => {
      const groups = groupProductsByCategory(products)
      const totalGrouped = Object.values(groups).reduce((sum, arr) => sum + arr.length, 0)
      expect(totalGrouped).toBe(products.length)
    })

    it('returns at least one category', () => {
      const groups = groupProductsByCategory(products)
      expect(Object.keys(groups).length).toBeGreaterThan(0)
    })

    it('places SaaS products in Tech & SaaS category', () => {
      const saasProduct = products.find((p) => p.name === 'SaaS (General)')
      expect(saasProduct).toBeDefined()
      const groups = groupProductsByCategory(products)
      expect(groups['Tech & SaaS']).toContain(saasProduct)
    })

    it('places E-commerce products in E-commerce category', () => {
      const ecomProduct = products.find((p) => p.name === 'E-commerce')
      expect(ecomProduct).toBeDefined()
      const groups = groupProductsByCategory(products)
      expect(groups['E-commerce']).toContain(ecomProduct)
    })

    it('places unmatched products in Other category', () => {
      const fakeProducts = [
        {
          id: 999,
          name: 'Unique Xyz',
          nameZh: 'XYZ',
          keywords: ['xyz', 'unique'],
          primaryStyle: 'Test',
          secondaryStyles: '',
          landingPattern: '',
          dashboardStyle: '',
          colorFocus: '',
          considerations: '',
        },
      ]
      const groups = groupProductsByCategory(fakeProducts)
      expect(groups['Other']).toHaveLength(1)
      expect(groups['Other'][0].id).toBe(999)
    })

    it('does case-insensitive matching', () => {
      const fakeProducts = [
        {
          id: 998,
          name: 'My SAAS Tool',
          nameZh: 'SaaS工具',
          keywords: ['SAAS', 'CLOUD'],
          primaryStyle: 'Flat',
          secondaryStyles: '',
          landingPattern: '',
          dashboardStyle: '',
          colorFocus: '',
          considerations: '',
        },
      ]
      const groups = groupProductsByCategory(fakeProducts)
      expect(groups['Tech & SaaS']).toHaveLength(1)
    })

    it('returns empty object for empty product list', () => {
      const groups = groupProductsByCategory([])
      expect(Object.keys(groups)).toHaveLength(0)
    })
  })

  describe('getProductsForStyle', () => {
    it('finds products that reference a given style name in primaryStyle', () => {
      const result = getProductsForStyle(products, 'Glassmorphism')
      expect(result.length).toBeGreaterThan(0)
      result.forEach((p) => {
        const combined = (p.primaryStyle + ' ' + p.secondaryStyles).toLowerCase()
        expect(combined).toContain('glassmorphism')
      })
    })

    it('finds products matching in secondaryStyles', () => {
      const result = getProductsForStyle(products, 'Minimalism')
      expect(result.length).toBeGreaterThan(0)
    })

    it('returns empty array when no products match', () => {
      const result = getProductsForStyle(products, 'NonexistentStyleXYZ')
      expect(result).toHaveLength(0)
    })

    it('is case-insensitive', () => {
      const result1 = getProductsForStyle(products, 'glassmorphism')
      const result2 = getProductsForStyle(products, 'GLASSMORPHISM')
      expect(result1).toEqual(result2)
    })
  })

  describe('CATEGORY_ICONS', () => {
    it('has an icon for each defined category', () => {
      const expectedCategories = [
        'Tech & SaaS',
        'Finance',
        'Healthcare',
        'E-commerce',
        'Services',
        'Creative',
        'Education',
        'Lifestyle',
        'Other',
      ]
      expectedCategories.forEach((cat) => {
        expect(CATEGORY_ICONS[cat]).toBeDefined()
      })
    })
  })
})
