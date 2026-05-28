import { useState } from 'react'
import { Plus, Trash2, Wand2 } from 'lucide-react'
import { useProjects } from '../hooks/useProjects'
import { styles } from '../data'

export function ProjectsPage() {
  const { projects, createProject, deleteProject } = useProjects()
  const [showForm, setShowForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [formStyleId, setFormStyleId] = useState(styles[0]?.id ?? 1)
  const [formColors, setFormColors] = useState('')
  const [formFont, setFormFont] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return
    const colorPalette = formColors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
    createProject({
      name: formName.trim(),
      styleId: formStyleId,
      colorPalette,
      fontChoice: formFont.trim(),
    })
    setFormName('')
    setFormColors('')
    setFormFont('')
    setShowForm(false)
  }

  const handleGeneratePrompts = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return
    const style = styles.find((s) => s.id === project.styleId)
    if (!style) return

    const colorStr =
      project.colorPalette.length > 0
        ? `Color palette: ${project.colorPalette.join(', ')}.`
        : ''
    const fontStr = project.fontChoice ? `Font: ${project.fontChoice}.` : ''

    const prompt = [
      `Project: ${project.name}`,
      `Style: ${style.nameEn} (${style.nameZh})`,
      colorStr,
      fontStr,
      '',
      `Design prompt: ${style.promptEn}`,
      '',
      `CSS keywords: ${style.cssKeywords}`,
    ]
      .filter(Boolean)
      .join('\n')

    setGeneratedPrompt(prompt)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          我的项目
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          新建项目
        </button>
      </div>

      {/* Create Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          role="dialog"
          aria-modal="true"
          aria-label="新建项目"
        >
          <form
            onSubmit={handleCreate}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              新建项目
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  项目名称
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  placeholder="输入项目名称"
                  required
                />
              </div>

              <div>
                <label htmlFor="project-style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  选择风格
                </label>
                <select
                  id="project-style"
                  value={formStyleId}
                  onChange={(e) => setFormStyleId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                >
                  {styles.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nameZh} ({s.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="project-colors" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  颜色 (逗号分隔)
                </label>
                <input
                  id="project-colors"
                  type="text"
                  value={formColors}
                  onChange={(e) => setFormColors(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  placeholder="#FF5733, #33FF57, #3357FF"
                />
              </div>

              <div>
                <label htmlFor="project-font" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  字体选择
                </label>
                <input
                  id="project-font"
                  type="text"
                  value={formFont}
                  onChange={(e) => setFormFont(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  placeholder="Inter, Noto Sans SC"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                创建
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Generated Prompt Modal */}
      {generatedPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => e.target === e.currentTarget && setGeneratedPrompt(null)}
          role="dialog"
          aria-modal="true"
          aria-label="生成的提示词"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              生成的提示词
            </h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-60 overflow-y-auto">
              {generatedPrompt}
            </pre>
            <button
              onClick={() => setGeneratedPrompt(null)}
              className="mt-4 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              关闭
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && !showForm && (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📁</div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            暂无项目
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            创建一个项目来管理你的设计方案
          </p>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const style = styles.find((s) => s.id === project.styleId)
            return (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {project.name}
                  </h3>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={`删除项目 ${project.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {style && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    风格: {style.nameZh}
                  </p>
                )}

                {project.colorPalette.length > 0 && (
                  <div className="flex gap-1 mb-2">
                    {project.colorPalette.slice(0, 5).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded border border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                )}

                {project.fontChoice && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                    字体: {project.fontChoice}
                  </p>
                )}

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                  创建于: {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleGeneratePrompts(project.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm font-medium"
                >
                  <Wand2 className="w-4 h-4" />
                  生成提示词
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
