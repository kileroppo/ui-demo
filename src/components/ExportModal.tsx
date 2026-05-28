import { useEffect, useRef } from 'react'
import { X, FileCode, FileText } from 'lucide-react'
import type { UIStyle } from '../data/types'
import { generateCSSVariables, generateMarkdownSummary, downloadFile } from '../utils/exportScheme'

interface Props {
  style: UIStyle
  isOpen: boolean
  onClose: () => void
}

export function ExportModal({ style, isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleExportCSS = () => {
    const content = generateCSSVariables(style)
    const filename = `${style.nameEn.toLowerCase().replace(/\s+/g, '-')}-variables.css`
    downloadFile(content, filename, 'text/css')
  }

  const handleExportMarkdown = () => {
    const content = generateMarkdownSummary(style)
    const filename = `${style.nameEn.toLowerCase().replace(/\s+/g, '-')}-scheme.md`
    downloadFile(content, filename, 'text/markdown')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Extract hex colors for preview
  const primaryHexColors = style.primaryColors.match(/#[0-9A-Fa-f]{6}/g) || []
  const secondaryHexColors = style.secondaryColors.match(/#[0-9A-Fa-f]{6}/g) || []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="导出设计方案"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            导出设计方案
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="关闭"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Preview */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {style.nameZh} ({style.nameEn})
          </h3>

          {/* Color swatches */}
          <div className="flex flex-wrap gap-2 mb-3">
            {primaryHexColors.map((color, i) => (
              <div
                key={`p-${i}`}
                className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-600"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {secondaryHexColors.map((color, i) => (
              <div
                key={`s-${i}`}
                className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-600"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Key CSS */}
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono line-clamp-2">
            {style.cssKeywords}
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleExportCSS}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <FileCode className="w-4 h-4" />
            Export CSS
          </button>
          <button
            onClick={handleExportMarkdown}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
          >
            <FileText className="w-4 h-4" />
            Export Markdown
          </button>
        </div>
      </div>
    </div>
  )
}
