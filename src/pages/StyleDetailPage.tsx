import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { styles } from '../data'
import { StyleDetail } from '../components/StyleDetail'
import { StyleCard } from '../components/StyleCard'

export function StyleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const style = styles.find((s) => s.id === Number(id))

  const relatedStyles = useMemo(() => {
    if (!style) return []
    return styles
      .filter((s) => s.id !== style.id && s.type === style.type)
      .slice(0, 3)
  }, [style])

  if (!style) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">😕</div>
        <h1 className="text-xl font-bold text-gray-900">未找到该风格</h1>
        <p className="text-sm text-gray-500 mt-2">该风格可能已被移除或链接无效</p>
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
        <ol className="flex items-center gap-1 text-sm text-gray-500">
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
          <li className="text-gray-900 font-medium" aria-current="page">
            {style.nameZh}
          </li>
        </ol>
      </nav>

      <StyleDetail style={style} />

      {/* Related Styles */}
      {relatedStyles.length > 0 && (
        <section className="mt-10" aria-label="相关风格推荐">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相关风格</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedStyles.map((s) => (
              <StyleCard key={s.id} style={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
