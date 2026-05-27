import type { UIStyle } from '../data/types'
import { StyleDemo } from './StyleDemo'
import { CopyButton } from './CopyButton'

interface Props {
  style: UIStyle
}

export function StyleDetail({ style }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <div className="h-48">
          <StyleDemo style={style} />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{style.nameZh}</h1>
              <p className="text-lg text-gray-500">{style.nameEn}</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                {style.type}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600">
                {style.complexity}
              </span>
            </div>
          </div>

          {/* Chinese Prompt */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-700">AI 提示词</h2>
              <CopyButton text={style.promptZh} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{style.promptZh}</p>
          </div>

          {/* Keywords */}
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">关键词</h2>
            <div className="flex flex-wrap gap-1">
              {style.keywords.map((kw) => (
                <span key={kw} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-1">主色调</h2>
              <p className="text-sm text-gray-600">{style.primaryColors}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-1">辅助色</h2>
              <p className="text-sm text-gray-600">{style.secondaryColors}</p>
            </div>
          </div>

          {/* Best for / Don't use */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-semibold text-green-700 mb-1">适用于</h2>
              <p className="text-sm text-gray-600">{style.bestFor}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-red-700 mb-1">不适用于</h2>
              <p className="text-sm text-gray-600">{style.doNotUseFor}</p>
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">性能</p>
              <p className="text-sm font-medium">{style.performance}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">无障碍</p>
              <p className="text-sm font-medium">{style.accessibility}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">移动端</p>
              <p className="text-sm font-medium">{style.mobileFriendly}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">转化率</p>
              <p className="text-sm font-medium">{style.conversionFocused}</p>
            </div>
          </div>

          {/* Implementation Checklist */}
          {style.implementationChecklist.length > 0 && (
            <div className="mt-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">实现清单</h2>
              <ul className="space-y-1">
                {style.implementationChecklist.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400">&#9744;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CSS Keywords */}
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">CSS 技术要点</h2>
            <p className="text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded-lg">
              {style.cssKeywords}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
