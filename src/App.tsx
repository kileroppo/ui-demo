import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PageTransition } from './components/PageTransition'
import { BackToTop } from './components/BackToTop'
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
const ComparePage = lazy(() =>
  import('./pages/ComparePage').then((m) => ({ default: m.ComparePage }))
)
const StyleAdvisor = lazy(() =>
  import('./pages/StyleAdvisor').then((m) => ({ default: m.StyleAdvisor }))
)
const WorkshopPage = lazy(() =>
  import('./pages/WorkshopPage').then((m) => ({ default: m.WorkshopPage }))
)
const ImageMatchPage = lazy(() =>
  import('./pages/ImageMatchPage').then((m) => ({ default: m.ImageMatchPage }))
)

export function SkeletonLoading() {
  return (
    <div className="py-8" role="status" aria-label="加载中">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-48 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <Suspense fallback={<SkeletonLoading />}>
        <PageTransition transitionKey={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/styles" element={<StyleGallery />} />
            <Route path="/styles/:id" element={<StyleDetailPage />} />
            <Route path="/products" element={<ProductGallery />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/advisor" element={<StyleAdvisor />} />
            <Route path="/workshop" element={<WorkshopPage />} />
            <Route path="/image-match" element={<ImageMatchPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <BackToTop />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}
