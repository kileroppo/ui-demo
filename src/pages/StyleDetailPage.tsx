import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { styles, products } from '../data'
import { StyleDetail } from '../components/StyleDetail'
import { StyleCard } from '../components/StyleCard'
import { StyleComponentPreview } from '../components/StyleComponentPreview'
import { FullPageDemo } from '../components/FullPageDemo'
import { getProductsForStyle } from '../utils/productCategories'

export function StyleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const style = styles.find((s) => s.id === Number(id))

  const relatedStyles = useMemo(() => {
    if (!style) return []
    return styles
      .filter((s) => s.id !== style.id && s.type === style.type)
      .slice(0, 3)
  }, [style])

  const recommendedProducts = useMemo(() => {
    if (!style) return []
    return getProductsForStyle(products, style.nameEn)
  }, [style])

  const adjacentStyles = useMemo(() => {
    if (!style) return { prev: null, next: null }
    const currentIndex = styles.findIndex((s) => s.id === style.id)
    const prev = currentIndex > 0 ? styles[currentIndex - 1] : null
    const next = currentIndex < styles.length - 1 ? styles[currentIndex + 1] : null
    return { prev, next }
  }, [style])

  if (!style) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">😕</div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">未找到该风格</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">该风格可能已被移除或链接无效</p>
        <Link
          to="/styles"
          className="mt-4 inline-block px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          返回风格库
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav aria-label="面包屑导航" className="mb-4">
        <ol className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              首页
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li>
            <Link to="/styles" className="hover:text-blue-600 transition-colors">
              风格库
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5" />
          </li>
          <li className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
            {style.nameZh}
          </li>
        </ol>
      </nav>

      <StyleDetail style={style} />

      {/* Component Previews */}
      <StyleComponentPreview style={style} />

      {/* Full Page Demo */}
      <FullPageDemo styleId={style.id} />

      {/* Recommended For */}
      {recommendedProducts.length > 0 && (
        <section className="mt-10" aria-label="推荐用于">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">推荐用于</h2>
          <div className="flex flex-wrap gap-2">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products?q=${encodeURIComponent(product.nameZh)}`}
                className="px-3 py-1.5 text-sm rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-100"
              >
                {product.nameZh}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Styles */}
      {relatedStyles.length > 0 && (
        <section className="mt-10" aria-label="相关风格推荐">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">相关风格</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedStyles.map((s) => (
              <StyleCard key={s.id} style={s} />
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next Navigation */}
      <nav className="mt-10 flex items-center justify-between gap-4" aria-label="相邻风格导航">
        {adjacentStyles.prev ? (
          <Link
            to={`/styles/${adjacentStyles.prev.id}`}
            className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">上一个</span>
          </Link>
        ) : (
          <span />
        )}
        {adjacentStyles.next ? (
          <Link
            to={`/styles/${adjacentStyles.next.id}`}
            className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
          >
            <span className="text-sm font-medium">下一个</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
