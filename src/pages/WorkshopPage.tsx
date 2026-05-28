import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { CopyButton } from '../components/CopyButton'

const DEFAULT_TEMPLATE = `请为"{产品名}"设计一个现代化的 UI 界面。

主色调使用 {主色}，需要适配 {目标设备} 设备。
技术栈使用 {框架} 框架实现。

要求：
- 界面风格简洁大气
- 配色协调，以主色为基准
- 响应式布局适配目标设备
- 组件化设计，便于复用`

interface TemplateVars {
  产品名: string
  主色: string
  目标设备: string
  框架: string
}

const DEFAULT_VARS: TemplateVars = {
  产品名: '',
  主色: '',
  目标设备: '',
  框架: '',
}

const VARIABLE_LABELS: Record<keyof TemplateVars, string> = {
  产品名: '产品名称',
  主色: '主色调',
  目标设备: '目标设备',
  框架: '技术框架',
}

const VARIABLE_PLACEHOLDERS: Record<keyof TemplateVars, string> = {
  产品名: '例如: 健康管理App',
  主色: '例如: #6366f1 或 蓝紫色',
  目标设备: '例如: 移动端、桌面端',
  框架: '例如: React + Tailwind',
}

function fillTemplate(template: string, vars: TemplateVars): string {
  let result = template
  for (const [key, value] of Object.entries(vars)) {
    const placeholder = `{${key}}`
    result = result.split(placeholder).join(value || placeholder)
  }
  return result
}

export function WorkshopPage() {
  const [vars, setVars] = useState<TemplateVars>(DEFAULT_VARS)
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE)

  const preview = fillTemplate(template, vars)

  const handleVarChange = (key: keyof TemplateVars, value: string) => {
    setVars((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Wand2 className="w-6 h-6 text-purple-500" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          提示词工坊
        </h1>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        自定义 AI 提示词模板，填入变量即可生成专属于你的设计提示词。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form inputs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            模板变量
          </h2>
          <div className="space-y-4">
            {(Object.keys(VARIABLE_LABELS) as Array<keyof TemplateVars>).map((key) => (
              <div key={key}>
                <label
                  htmlFor={`var-${key}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {VARIABLE_LABELS[key]}
                </label>
                <input
                  id={`var-${key}`}
                  type="text"
                  value={vars[key]}
                  onChange={(e) => handleVarChange(key, e.target.value)}
                  placeholder={VARIABLE_PLACEHOLDERS[key]}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          {/* Template editor */}
          <div className="mt-6">
            <label
              htmlFor="template-editor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              提示词模板（可自定义编辑）
            </label>
            <textarea
              id="template-editor"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
            />
          </div>
        </div>

        {/* Right: Live preview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              实时预览
            </h2>
            <CopyButton text={preview} label="复制提示词" />
          </div>
          <div
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-h-[200px]"
            aria-label="提示词预览"
            data-testid="prompt-preview"
          >
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
              {preview}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
