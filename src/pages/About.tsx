export function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">关于</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">什么是 UI 风格展示库？</h2>
          <p className="text-gray-600 leading-relaxed">
            UI 风格展示库是一个全面的界面设计风格参考工具。它收录了超过 60 种流行和新兴的
            UI 设计风格，每种风格都配有实时 CSS
            演示、详细的技术参数、配色方案和即用型的中文 AI 提示词。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">功能特色</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>实时 CSS 风格演示，直观展示每种风格的视觉特征</li>
            <li>中英双语搜索，支持模糊匹配</li>
            <li>按类别、性能、无障碍等维度智能筛选</li>
            <li>每种风格配有中文 AI 提示词，一键复制即用</li>
            <li>产品类型推荐，快速找到适合你项目的风格</li>
            <li>完整的技术实现清单和 CSS 代码参考</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">适用场景</h2>
          <p className="text-gray-600 leading-relaxed">
            无论你是设计师寻找灵感，还是开发者需要技术参考，或是产品经理需要与团队沟通设计方向，
            UI 风格展示库都能帮助你快速找到合适的风格并获取可执行的设计指南。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">数据来源</h2>
          <p className="text-gray-600 leading-relaxed">
            本项目的数据来源于 UI/UX Pro Max 技能库，涵盖了风格定义、产品推荐、配色方案和字体搭配等多维度的设计数据。
          </p>
        </section>
      </div>
    </div>
  )
}
