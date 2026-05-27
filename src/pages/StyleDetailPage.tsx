import { useParams, Link } from 'react-router-dom'
import { styles } from '../data'
import { StyleDetail } from '../components/StyleDetail'

export function StyleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const style = styles.find((s) => s.id === Number(id))

  if (!style) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-bold text-gray-900">未找到该风格</h1>
        <Link to="/styles" className="mt-4 inline-block text-blue-600 hover:underline">
          返回风格库
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/styles" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        &larr; 返回风格库
      </Link>
      <StyleDetail style={style} />
    </div>
  )
}
