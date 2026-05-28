import { useState, useRef, useCallback } from 'react'
import { Upload, ImageIcon } from 'lucide-react'
import { styles } from '../data'
import { StyleCard } from '../components/StyleCard'
import type { UIStyle } from '../data/types'

interface DominantColor {
  hex: string
  count: number
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.min(v, 255).toString(16).padStart(2, '0')).join('')
}

function quantize(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function extractColorsFromImageData(data: Uint8ClampedArray, width: number, height: number): DominantColor[] {
  const colorMap = new Map<string, number>()
  const step = 32 // quantize to reduce color space

  // Sample every 4th pixel for performance
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const i = (y * width + x) * 4
      const r = quantize(data[i], step)
      const g = quantize(data[i + 1], step)
      const b = quantize(data[i + 2], step)
      const a = data[i + 3]
      if (a < 128) continue // skip transparent pixels
      const hex = rgbToHex(r, g, b)
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
    }
  }

  const sorted = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([hex, count]) => ({ hex, count }))

  return sorted
}

function hexDistance(hex1: string, hex2: string): number {
  const r1 = parseInt(hex1.slice(1, 3), 16)
  const g1 = parseInt(hex1.slice(3, 5), 16)
  const b1 = parseInt(hex1.slice(5, 7), 16)
  const r2 = parseInt(hex2.slice(1, 3), 16)
  const g2 = parseInt(hex2.slice(3, 5), 16)
  const b2 = parseInt(hex2.slice(5, 7), 16)
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

export function matchStylesToColors(colors: DominantColor[]): UIStyle[] {
  if (colors.length === 0) return []

  const scored = styles.map((style) => {
    const colorStr = (style.primaryColors + ' ' + style.secondaryColors).toLowerCase()
    const hexMatches = colorStr.match(/#[0-9a-f]{6}/gi) || []
    let score = 0

    for (const dominant of colors) {
      for (const styleHex of hexMatches) {
        const dist = hexDistance(dominant.hex.toLowerCase(), styleHex.toLowerCase())
        if (dist < 80) {
          score += (80 - dist) * dominant.count
        }
      }
    }

    return { style, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((s) => s.style)
}

export function ImageMatchPage() {
  const [colors, setColors] = useState<DominantColor[]>([])
  const [matchedStyles, setMatchedStyles] = useState<UIStyle[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const processImage = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)

      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const maxSize = 200
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const extracted = extractColorsFromImageData(imageData.data, canvas.width, canvas.height)
        setColors(extracted)
        setMatchedStyles(matchStylesToColors(extracted))
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processImage(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        图片配色匹配
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        上传一张参考图片，我们将提取主要配色并为你匹配最适合的 UI 风格。
      </p>

      {/* Upload Zone */}
      <div
        data-testid="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
        role="button"
        aria-label="上传图片"
      >
        {preview ? (
          <img src={preview} alt="上传预览" className="max-h-48 mx-auto rounded-lg" />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-10 h-10 text-gray-400" aria-hidden="true" />
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              拖放图片到这里，或点击上传
            </p>
            <p className="text-sm text-gray-400">支持 JPG, PNG, WebP 格式</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="选择图片文件"
        />
      </div>

      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} className="hidden" data-testid="color-canvas" />

      {/* Color Preview */}
      {colors.length > 0 && (
        <section className="mt-6" aria-label="提取的颜色">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            提取的主要颜色
          </h2>
          <div className="flex gap-3 flex-wrap">
            {colors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600"
                  style={{ backgroundColor: color.hex }}
                  aria-label={`颜色 ${color.hex}`}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  {color.hex}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Matched Styles */}
      {matchedStyles.length > 0 && (
        <section className="mt-8" aria-label="匹配的风格">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            <ImageIcon className="w-5 h-5 inline-block mr-2" aria-hidden="true" />
            匹配的风格 ({matchedStyles.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedStyles.map((style) => (
              <StyleCard key={style.id} style={style} />
            ))}
          </div>
        </section>
      )}

      {colors.length > 0 && matchedStyles.length === 0 && (
        <div className="mt-8 text-center py-8" role="status">
          <p className="text-gray-500 dark:text-gray-400">
            未找到与提取颜色匹配的风格，请尝试上传其他图片。
          </p>
        </div>
      )}
    </div>
  )
}
