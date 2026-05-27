import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

const StyleGallery = lazy(() =>
  import('./pages/StyleGallery').then((m) => ({ default: m.StyleGallery }))
)
const StyleDetailPage = lazy(() =>
  import('./pages/StyleDetailPage').then((m) => ({ default: m.StyleDetailPage }))
)
const ProductGallery = lazy(() =>
  import('./pages/ProductGallery').then((m) => ({ default: m.ProductGallery }))
)
const About = lazy(() =>
  import('./pages/About').then((m) => ({ default: m.About }))
)

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20" role="status" aria-label="加载中">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
        <p className="mt-3 text-sm text-gray-500">加载中...</p>
      </div>
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/styles" element={<StyleGallery />} />
            <Route path="/styles/:id" element={<StyleDetailPage />} />
            <Route path="/products" element={<ProductGallery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
