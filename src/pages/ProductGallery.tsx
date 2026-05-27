import { useState, useMemo } from 'react'
import { products } from '../data'
import { SearchBar } from '../components/SearchBar'

export function ProductGallery() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return products
    const lower = query.toLowerCase()
    return products.filter((p) => {
      const text = [p.name, p.nameZh, ...p.keywords, p.primaryStyle, p.considerations]
        .join(' ')
        .toLowerCase()
      return text.includes(lower)
    })
  }, [query])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">产品推荐</h1>
      <p className="text-gray-500 mb-6">
        浏览 {products.length} 种产品类型，快速找到最适合的 UI 风格方案
      </p>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <p className="text-sm text-gray-500 mb-4" aria-live="polite">
        显示 {filtered.length} / {products.length} 种产品类型
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              <h3 className="font-semibold text-gray-900">{product.nameZh}</h3>
              <p className="text-sm text-gray-500">{product.name}</p>
              <div className="mt-3">
                <p className="text-xs text-gray-500">推荐风格</p>
                <p className="text-sm text-blue-600 font-medium">{product.primaryStyle}</p>
              </div>
              {product.secondaryStyles && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">备选风格</p>
                  <p className="text-sm text-gray-600">{product.secondaryStyles}</p>
                </div>
              )}
              {product.considerations && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">设计要点</p>
                  <p className="text-sm text-gray-600">{product.considerations}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16" role="status">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-600 font-medium">未找到「{query}」相关的产品类型</p>
          <p className="text-sm text-gray-400 mt-1">
            试试其他关键词，如「电商」「社交」「金融」
          </p>
        </div>
      )}
    </div>
  )
}
