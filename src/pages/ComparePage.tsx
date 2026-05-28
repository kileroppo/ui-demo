import { useSearchParams, Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { UIStyle } from '../data/types'
import { styles } from '../data/styles'

export function ComparePage() {
  const [searchParams] = useSearchParams()
  const idsParam = searchParams.get('ids') || ''
  const ids = idsParam
    .split(',')
    .map(Number)
    .filter((id) => !isNaN(id) && id > 0)

  const selectedStyles = ids
    .map((id) => styles.find((s) => s.id === id))
    .filter(Boolean) as UIStyle[]

  if (selectedStyles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">⚖️</div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          未选择任何风格进行对比
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          请先从风格库中选择 2-3 个风格
        </p>
        <Link
          to="/styles"
          className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          前往风格库
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          风格对比
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          对比 {selectedStyles.length} 个风格的关键属性
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 p-3 w-32 border-b border-gray-200 dark:border-gray-700">
                属性
              </th>
              {selectedStyles.map((style) => (
                <th
                  key={style.id}
                  className="text-left text-sm font-semibold text-gray-900 dark:text-gray-100 p-3 border-b border-gray-200 dark:border-gray-700"
                >
                  <Link
                    to={`/styles/${style.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {style.nameZh}
                  </Link>
                  <span className="block text-xs font-normal text-gray-400 dark:text-gray-500">
                    {style.nameEn}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="分类" values={selectedStyles.map((s) => s.type)} />
            <CompareRow label="关键词" values={selectedStyles.map((s) => s.keywords.join(', '))} />
            <CompareRow label="主色" values={selectedStyles.map((s) => s.primaryColors)} />
            <CompareRow label="性能" values={selectedStyles.map((s) => s.performance)} />
            <CompareRow label="无障碍" values={selectedStyles.map((s) => s.accessibility)} />
            <CompareRow label="移动友好" values={selectedStyles.map((s) => s.mobileFriendly)} />
            <CompareRow label="复杂度" values={selectedStyles.map((s) => s.complexity)} />
            <CompareRow label="适用于" values={selectedStyles.map((s) => s.bestFor)} />
            <CompareRow label="不适用于" values={selectedStyles.map((s) => s.doNotUseFor)} />
            <CompareRow label="暗色模式" values={selectedStyles.map((s) => s.darkMode)} />
            <CompareRow label="时代" values={selectedStyles.map((s) => s.era)} />
            <PromptRow label="AI 提示词" values={selectedStyles.map((s) => s.promptZh)} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CompareRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="text-sm font-medium text-gray-500 dark:text-gray-400 p-3 align-top whitespace-nowrap">
        {label}
      </td>
      {values.map((value, i) => (
        <td key={i} className="text-sm text-gray-700 dark:text-gray-300 p-3 align-top">
          {value}
        </td>
      ))}
    </tr>
  )
}

function PromptRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="text-sm font-medium text-gray-500 dark:text-gray-400 p-3 align-top whitespace-nowrap">
        {label}
      </td>
      {values.map((value, i) => (
        <td key={i} className="text-sm text-gray-700 dark:text-gray-300 p-3 align-top">
          <div className="flex items-start gap-2">
            <span className="line-clamp-3 flex-1">{value}</span>
            <PromptCopyButton text={value} />
          </div>
        </td>
      ))}
    </tr>
  )
}

function PromptCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: ignore
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      aria-label="复制提示词"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}
