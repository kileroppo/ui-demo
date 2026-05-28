import { useState } from 'react'
import type { UIStyle } from '../data/types'
import { StyleDemo } from './StyleDemo'
import { CopyButton } from './CopyButton'
import { generatePromptVariants } from '../utils/promptGenerator'

interface Props {
  style: UIStyle
}

const PROMPT_TABS = [
  { key: 'uiDesign', label: 'UI 设计' },
  { key: 'imageGen', label: '图片生成' },
  { key: 'codeGen', label: '代码生成' },
] as const

type TabKey = (typeof PROMPT_TABS)[number]['key']

export function StyleDetail({ style }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('uiDesign')
  const prompts = generatePromptVariants(style)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="h-64 border-b border-gray-100 dark:border-gray-700 rounded-t-2xl overflow-hidden">
          <StyleDemo style={style} />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{style.nameZh}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">{style.nameEn}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <span className="px-2.5 py-1 text-xs rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                {style.type}
              </span>
              <span className="px-2.5 py-1 text-xs rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                {style.complexity}
              </span>
            </div>
          </div>

          {/* Tabbed Prompt Section */}
          <div className="mt-6">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-600" role="tablist" aria-label="AI 提示词">
              {PROMPT_TABS.map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  aria-controls={`tabpanel-${tab.key}`}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors duration-200 relative min-h-[44px] ${
                    activeTab === tab.key
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <div
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              aria-label={PROMPT_TABS.find((t) => t.key === activeTab)?.label}
              className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">AI 提示词</h2>
                <CopyButton text={prompts[activeTab]} />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {prompts[activeTab]}
              </p>
            </div>
          </div>

          {/* Keywords */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">关键词</h2>
            <div className="flex flex-wrap gap-1.5">
              {style.keywords.map((kw) => (
                <span key={kw} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">主色调</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{style.primaryColors}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">辅助色</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{style.secondaryColors}</p>
            </div>
          </div>

          {/* Best for / Don't use */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
              <h2 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">适用于</h2>
              <p className="text-sm text-green-700 dark:text-green-400">{style.bestFor}</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
              <h2 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">不适用于</h2>
              <p className="text-sm text-red-700 dark:text-red-400">{style.doNotUseFor}</p>
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">性能</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{style.performance}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">无障碍</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{style.accessibility}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">移动端</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{style.mobileFriendly}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">转化率</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{style.conversionFocused}</p>
            </div>
          </div>

          {/* Effects */}
          {style.effects && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">动效与特效</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{style.effects}</p>
            </div>
          )}

          {/* Implementation Checklist */}
          {style.implementationChecklist.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">实现清单</h2>
              <ul className="space-y-1.5">
                {style.implementationChecklist.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5" aria-hidden="true">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CSS Keywords */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">CSS 技术要点</h2>
            <div className="relative">
              <pre className="text-sm text-gray-600 font-mono bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
                <code>{style.cssKeywords}</code>
              </pre>
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent rounded-r-lg pointer-events-none sm:hidden" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
