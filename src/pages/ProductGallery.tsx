import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data'
import { SearchBar } from '../components/SearchBar'
import { useDebounce } from '../hooks/useDebounce'
import { groupProductsByCategory, CATEGORY_ICONS } from '../utils/productCategories'

export function ProductGallery() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedQuery(value)
  }, 200)

  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedSearch(value)
  }

  const filtered = useMemo(() => {
    if (!debouncedQuery) return products
    const lower = debouncedQuery.toLowerCase()
    return products.filter((p) => {
      const text = [p.name, p.nameZh, ...p.keywords, p.primaryStyle, p.considerations]
        .join(' ')
        .toLowerCase()
      return text.includes(lower)
    })
  }, [debouncedQuery])

  const grouped = useMemo(() => groupProductsByCategory(filtered), [filtered])

  const categoryNames = Object.keys(grouped)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">产品推荐</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        浏览 {products.length} 种产品类型，快速找到最适合的 UI 风格方案
      </p>

      <div className="mb-6">
        <SearchBar value={query} onChange={handleSearch} />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4" aria-live="polite">
        显示 {filtered.length} / {products.length} 种产品类型
      </p>

      {/* Category navigation */}
      {!debouncedQuery && categoryNames.length > 1 && (
        <nav className="mb-6 flex flex-wrap gap-2" aria-label="产品分类导航">
          {categoryNames.map((cat) => (
            <a
              key={cat}
              href={`#category-${cat}`}
              className="px-3 py-1.5 text-sm rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors"
            >
              {CATEGORY_ICONS[cat] || '📦'} {cat} ({grouped[cat].length})
            </a>
          ))}
        </nav>
      )}

      {filtered.length > 0 ? (
        <div className="space-y-10">
          {categoryNames.map((category) => (
            <section key={category} id={`category-${category}`} aria-label={`${category} 类别`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl" aria-hidden="true">
                  {CATEGORY_ICONS[category] || '📦'}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{category}</h2>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600">
                  {grouped[category].length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[category].map((product) => (
                  <article
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{product.nameZh}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.name}</p>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">推荐风格</p>
                      <Link
                        to={`/styles?q=${encodeURIComponent(product.primaryStyle)}`}
                        className="text-sm text-blue-600 font-medium hover:underline"
                      >
                        {product.primaryStyle}
                      </Link>
                    </div>
                    {product.colorFocus && (
                      <div className="mt-2 flex gap-1">
                        <div
                          className="h-2 flex-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                          title={product.colorFocus}
                          aria-label={`配色: ${product.colorFocus}`}
                        />
                      </div>
                    )}
                    {product.considerations && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">设计要点</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{product.considerations}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16" role="status">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">未找到「{query}」相关的产品类型</p>
          <div className="mt-4">
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">试试：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['电商', '社交', '金融', '医疗'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSearch(chip)}
                  className="px-3 py-1.5 text-sm rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
