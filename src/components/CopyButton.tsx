import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { copyToClipboard } from '../utils/clipboard'

interface Props {
  text: string
  label?: string
}

export function CopyButton({ text, label = '复制提示词' }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-colors duration-200"
      style={{
        background: copied ? '#22c55e' : '#3b82f6',
        color: '#ffffff',
      }}
      aria-label={copied ? '已复制' : label}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          <span>已复制</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
