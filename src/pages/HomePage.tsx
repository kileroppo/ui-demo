import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styles } from '../data'
import { SearchBar } from '../components/SearchBar'
import { StyleCard } from '../components/StyleCard'
import { searchAndSort } from '../utils/search'
import { getCategories } from '../utils/filters'

export function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const categories = getCategories(styles)
  const featured = styles.slice(0, 6)
  const results = query ? searchAndSort(styles, query) : featured

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      // Stay on home page and show results
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          UI 风格展示库
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          探索 {styles.length} 种界面设计风格，获取即用型 AI 提示词，助力你的下一个设计项目
        </p>
        <div className="mt-6 flex justify-center">
          <SearchBar value={query} onChange={handleSearch} />
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/styles?category=${encodeURIComponent(cat)}`)}
              className="px-4 py-2 text-sm rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results / Featured Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {query ? `搜索结果 (${results.length})` : '精选风格'}
          </h2>
          {!query && (
            <Link to="/styles" className="text-sm text-blue-600 hover:underline">
              查看全部
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((style) => (
            <StyleCard key={style.id} style={style} />
          ))}
        </div>
      </section>
    </div>
  )
}
