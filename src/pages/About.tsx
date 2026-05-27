import { Search, Palette, Copy } from 'lucide-react'
import { AnimatedCounter } from '../components/AnimatedCounter'

export function About() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 mb-10" aria-label="品牌介绍">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          为设计师和开发者打造
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          UI 风格展示库是一个全面的界面设计风格参考工具，帮助你快速找到灵感、
          选择风格、生成 AI 提示词，从概念到落地只需一步。
        </p>
      </section>

      {/* Stats */}
      <section className="mb-12 py-8 border-y border-gray-100" aria-label="数据统计">
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <AnimatedCounter end={76} suffix="种" label="设计风格" />
          <AnimatedCounter end={161} suffix="种" label="产品类型" />
          <AnimatedCounter end={15} suffix="+" label="实时演示" />
        </div>
      </section>

      {/* How to Use */}
      <section className="mb-12" aria-label="使用步骤">
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">如何使用</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <Search className="w-6 h-6 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">浏览</h3>
            <p className="text-sm text-gray-600">浏览风格库，发现各种设计可能性</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-600" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">选择</h3>
            <p className="text-sm text-gray-600">选择最适合你项目的设计风格</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <Copy className="w-6 h-6 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">复制</h3>
            <p className="text-sm text-gray-600">复制 AI 提示词，开始构建你的设计</p>
          </div>
        </div>
      </section>

      {/* Tech Credits */}
      <section className="bg-white rounded-xl border border-gray-100 p-6" aria-label="技术信息">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">技术栈</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          本项目使用现代前端技术栈构建，数据来源于 UI/UX Pro Max 技能库。
        </p>
        <div className="flex flex-wrap gap-2">
          {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'React Router'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-gray-50 text-gray-600 border border-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
