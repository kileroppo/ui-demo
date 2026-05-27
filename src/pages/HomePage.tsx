import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Palette, Sparkles, Zap } from 'lucide-react'
import { styles } from '../data'
import { SearchBar } from '../components/SearchBar'
import { StyleCard } from '../components/StyleCard'
import { searchAndSort } from '../utils/search'
import { getCategories } from '../utils/filters'
import { useDebounce } from '../hooks/useDebounce'

export function HomePage() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const navigate = useNavigate()

  const categories = getCategories(styles)
  const featured = styles.slice(0, 6)
  const results = debouncedQuery ? searchAndSort(styles, debouncedQuery) : featured

  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedQuery(value)
  }, 200)

  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedSearch(value)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          发现你的下一个<span className="text-blue-600">设计风格</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          收录 {styles.length} 种主流 UI 设计风格，每种风格配有实时演示、
          技术参数和中文 AI 提示词，帮你快速落地设计方案。
        </p>
        <div className="mt-8 flex justify-center">
          <SearchBar value={query} onChange={handleSearch} />
        </div>

        {/* Feature highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600">
            <Palette className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>实时风格预览</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span>AI 提示词一键复制</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600">
            <Zap className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span>中英双语搜索</span>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="mb-10" aria-label="风格类别快速导航">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/styles?category=${encodeURIComponent(cat)}`)}
              className="px-4 py-2 text-sm rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {debouncedQuery ? `搜索结果 (${results.length})` : '精选风格'}
          </h2>
          {!debouncedQuery && (
            <Link to="/styles" className="text-sm text-blue-600 hover:underline">
              查看全部 &rarr;
            </Link>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((style) => (
              <StyleCard key={style.id} style={style} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16" role="status">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-600 font-medium">未找到「{debouncedQuery}」相关的风格</p>
            <p className="text-sm text-gray-400 mt-1">
              试试其他关键词，如「玻璃」「极简」「暗色」
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
