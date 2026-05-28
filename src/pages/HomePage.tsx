import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Palette, Sparkles, Zap } from 'lucide-react'
import { styles } from '../data'
import { SearchBar } from '../components/SearchBar'
import { StyleCard } from '../components/StyleCard'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { searchAndSort } from '../utils/search'
import { getCategories } from '../utils/filters'
import { useDebounce } from '../hooks/useDebounce'

const CATEGORY_COLORS: Record<string, string> = {
  General: '#6366f1',
  'Landing Page': '#ec4899',
  'E-commerce': '#f59e0b',
  Dashboard: '#10b981',
  Mobile: '#3b82f6',
  Content: '#8b5cf6',
  Social: '#ef4444',
  Enterprise: '#06b6d4',
  Creative: '#f97316',
  Other: '#64748b',
}

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
      <section className="text-center py-16 px-4 rounded-2xl gradient-bg-animated mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
          发现你的下一个<span className="gradient-text">设计风格</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          从 {styles.length} 种精心收录的 UI 风格中获取灵感，配有实时演示、
          技术参数和中文 AI 提示词，让你的设计方案从概念到落地只需一步。
        </p>
        <div className="mt-8 flex justify-center">
          <SearchBar value={query} onChange={handleSearch} />
        </div>

        {/* Feature highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-gray-300">
            <Palette className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <span>实时风格预览</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-gray-300">
            <Sparkles className="w-4 h-4 text-purple-500" aria-hidden="true" />
            <span>AI 提示词一键复制</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600 dark:text-gray-300">
            <Zap className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span>中英双语搜索</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-10 py-8 border-y border-gray-100 dark:border-gray-700" aria-label="数据统计">
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <AnimatedCounter end={76} suffix=" 种" label="设计风格" />
          <AnimatedCounter end={161} suffix=" 种" label="产品类型" />
          <AnimatedCounter end={10} suffix="+" label="实时演示" />
        </div>
      </section>

      {/* Find My Style CTA */}
      <section className="mb-10 text-center">
        <Link
          to="/styles"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:scale-105 transition-all duration-200 shadow-md"
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          找到我的风格
        </Link>
      </section>

      {/* Category Quick Links */}
      <section className="mb-10" aria-label="风格类别快速导航">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/styles?category=${encodeURIComponent(cat)}`)}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[cat] || '#64748b' }}
                aria-hidden="true"
              />
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results / Featured Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
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
            <p className="text-gray-600 dark:text-gray-300 font-medium">未找到「{debouncedQuery}」相关的风格</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              试试其他关键词，如「玻璃」「极简」「暗色」
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
