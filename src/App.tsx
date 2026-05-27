import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { StyleGallery } from './pages/StyleGallery'
import { StyleDetailPage } from './pages/StyleDetailPage'
import { ProductGallery } from './pages/ProductGallery'
import { About } from './pages/About'

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/styles" element={<StyleGallery />} />
          <Route path="/styles/:id" element={<StyleDetailPage />} />
          <Route path="/products" element={<ProductGallery />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
