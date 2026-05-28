import { useState } from 'react'
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2 } from 'lucide-react'
import { fullPageDemos } from '../data/fullPageDemos'

interface FullPageDemoProps {
  styleId: number
}

type Viewport = 'desktop' | 'tablet' | 'mobile'

const viewportWidths: Record<Viewport, string> = {
  desktop: '1440px',
  tablet: '768px',
  mobile: '375px',
}

export function FullPageDemo({ styleId }: FullPageDemoProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [isFullScreen, setIsFullScreen] = useState(false)

  const demoHtml = fullPageDemos[styleId]

  if (!demoHtml) {
    return null
  }

  const containerClass = isFullScreen
    ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col'
    : 'mt-8'

  return (
    <section className={containerClass} aria-label="Full Page Demo">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-t-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Full Page Demo
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-2 rounded-md transition-colors ${viewport === 'desktop' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            aria-label="Desktop viewport"
            title="Desktop (1440px)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-2 rounded-md transition-colors ${viewport === 'tablet' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            aria-label="Tablet viewport"
            title="Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-2 rounded-md transition-colors ${viewport === 'mobile' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            aria-label="Mobile viewport"
            title="Mobile (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
            title={isFullScreen ? 'Exit full screen' : 'Full screen'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <div className={`flex justify-center bg-gray-50 dark:bg-gray-900 border-x border-b border-gray-200 dark:border-gray-700 rounded-b-lg overflow-hidden ${isFullScreen ? 'flex-1' : ''}`}>
        <iframe
          srcDoc={demoHtml}
          title="Style demo preview"
          className="border-0 bg-white transition-all duration-300"
          style={{
            width: isFullScreen && viewport === 'desktop' ? '100%' : viewportWidths[viewport],
            height: isFullScreen ? '100%' : '600px',
            maxWidth: '100%',
          }}
          sandbox=""
        />
      </div>
    </section>
  )
}
