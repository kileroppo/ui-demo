import type { UIStyle } from '../data/types'
import { StyleDemo } from './StyleDemo'
import { CopyButton } from './CopyButton'

interface Props {
  style: UIStyle
}

export function StyleDetail({ style }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="h-64 border-b border-gray-100 rounded-t-2xl overflow-hidden">
          <StyleDemo style={style} />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{style.nameZh}</h1>
              <p className="text-lg text-gray-500">{style.nameEn}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <span className="px-2.5 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">
                {style.type}
              </span>
              <span className="px-2.5 py-1 text-xs rounded-full bg-green-50 text-green-700 font-medium">
                {style.complexity}
              </span>
            </div>
          </div>

          {/* Chinese Prompt */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-700">AI 提示词</h2>
              <CopyButton text={style.promptZh} />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{style.promptZh}</p>
          </div>

          {/* Keywords */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">关键词</h2>
            <div className="flex flex-wrap gap-1.5">
              {style.keywords.map((kw) => (
                <span key={kw} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-700 mb-1">主色调</h2>
              <p className="text-sm text-gray-600">{style.primaryColors}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-700 mb-1">辅助色</h2>
              <p className="text-sm text-gray-600">{style.secondaryColors}</p>
            </div>
          </div>

          {/* Best for / Don't use */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <h2 className="text-sm font-semibold text-green-800 mb-1">适用于</h2>
              <p className="text-sm text-green-700">{style.bestFor}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <h2 className="text-sm font-semibold text-red-800 mb-1">不适用于</h2>
              <p className="text-sm text-red-700">{style.doNotUseFor}</p>
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5">性能</p>
              <p className="text-sm font-semibold text-gray-900">{style.performance}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5">无障碍</p>
              <p className="text-sm font-semibold text-gray-900">{style.accessibility}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5">移动端</p>
              <p className="text-sm font-semibold text-gray-900">{style.mobileFriendly}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-0.5">转化率</p>
              <p className="text-sm font-semibold text-gray-900">{style.conversionFocused}</p>
            </div>
          </div>

          {/* Effects */}
          {style.effects && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-1">动效与特效</h2>
              <p className="text-sm text-gray-600">{style.effects}</p>
            </div>
          )}

          {/* Implementation Checklist */}
          {style.implementationChecklist.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">实现清单</h2>
              <ul className="space-y-1.5">
                {style.implementationChecklist.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">&#9744;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CSS Keywords */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">CSS 技术要点</h2>
            <pre className="text-sm text-gray-600 font-mono bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
              <code>{style.cssKeywords}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
