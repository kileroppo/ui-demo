import { useState } from 'react'
import { products } from '../data'
import { SearchBar } from '../components/SearchBar'

export function ProductGallery() {
  const [query, setQuery] = useState('')

  const filtered = query
    ? products.filter((p) => {
        const text = [p.name, p.nameZh, ...p.keywords, p.primaryStyle, p.considerations]
          .join(' ')
          .toLowerCase()
        return text.includes(query.toLowerCase())
      })
    : products

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">产品推荐</h1>
      <p className="text-gray-500 mb-6">
        浏览 {products.length} 种产品类型及其推荐的 UI 风格
      </p>

      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        显示 {filtered.length} / {products.length} 种产品类型
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
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
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到匹配的产品类型</p>
        </div>
      )}
    </div>
  )
}
