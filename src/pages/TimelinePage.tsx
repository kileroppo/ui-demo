import { Link } from 'react-router-dom'
import { styles } from '../data'

interface TimelineNode {
  year: number
  nameEn: string
  nameZh: string
  description: string
  color: string
  styleId: number | null
}

const TIMELINE_DATA: TimelineNode[] = [
  {
    year: 2007,
    nameEn: 'Skeuomorphism',
    nameZh: '拟物化设计',
    description: '模仿真实物理材质和纹理，创造逼真的数字界面',
    color: '#8B4513',
    styleId: null,
  },
  {
    year: 2013,
    nameEn: 'Flat Design',
    nameZh: '扁平设计',
    description: '去除多余装饰，使用纯色和简洁图形',
    color: '#2196F3',
    styleId: null,
  },
  {
    year: 2014,
    nameEn: 'Material Design',
    nameZh: 'Material Design',
    description: '基于纸片和墨水的隐喻，引入层次感和动效',
    color: '#4CAF50',
    styleId: null,
  },
  {
    year: 2020,
    nameEn: 'Neumorphism',
    nameZh: '新拟态',
    description: '柔和的凸起和凹陷效果，模拟塑料质感',
    color: '#E0E5EC',
    styleId: null,
  },
  {
    year: 2020,
    nameEn: 'Glassmorphism',
    nameZh: '玻璃拟态',
    description: '半透明磨砂玻璃效果，背景模糊与色彩叠加',
    color: '#7C4DFF',
    styleId: null,
  },
  {
    year: 2021,
    nameEn: 'Brutalism',
    nameZh: '粗野主义',
    description: '原始、大胆、无修饰的设计语言',
    color: '#FF5722',
    styleId: null,
  },
  {
    year: 2023,
    nameEn: 'Bento Grid',
    nameZh: 'Bento Grid',
    description: '模块化网格布局，灵感来自日式便当盒',
    color: '#FF9800',
    styleId: null,
  },
  {
    year: 2025,
    nameEn: 'Liquid Glass',
    nameZh: '流体玻璃',
    description: '动态流体形态与玻璃质感的融合',
    color: '#00BCD4',
    styleId: null,
  },
]

function findStyleId(nameEn: string): number | null {
  const match = styles.find((s) =>
    s.nameEn.toLowerCase().includes(nameEn.toLowerCase()) ||
    nameEn.toLowerCase().includes(s.nameEn.toLowerCase())
  )
  return match ? match.id : null
}

function getTimelineNodes(): TimelineNode[] {
  return TIMELINE_DATA.map((node) => ({
    ...node,
    styleId: findStyleId(node.nameEn),
  }))
}

export function TimelinePage() {
  const nodes = getTimelineNodes()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        UI 风格演进时间线
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        从拟物化到流体玻璃，探索界面设计风格的演变历程
      </p>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block overflow-x-auto pb-8" data-testid="timeline-desktop">
        <div className="relative min-w-[900px] px-8">
          {/* Connecting line */}
          <div className="absolute top-16 left-8 right-8 h-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="relative flex justify-between">
            {nodes.map((node, index) => (
              <div
                key={`${node.nameEn}-${index}`}
                className="flex flex-col items-center w-28"
                data-testid="timeline-node"
              >
                {/* Year label */}
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {node.year}
                </span>

                {/* Node circle */}
                <div
                  className="w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 shadow-md z-10 flex items-center justify-center"
                  style={{ backgroundColor: node.color }}
                />

                {/* Content */}
                <div className="mt-4 text-center">
                  {node.styleId ? (
                    <Link
                      to={`/styles/${node.styleId}`}
                      className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {node.nameZh}
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {node.nameZh}
                    </span>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden" data-testid="timeline-mobile">
        <div className="relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-8">
            {nodes.map((node, index) => (
              <div
                key={`${node.nameEn}-${index}`}
                className="relative"
                data-testid="timeline-node"
              >
                {/* Node circle */}
                <div
                  className="absolute -left-8 top-0 w-7 h-7 rounded-full border-4 border-white dark:border-gray-900 shadow-md z-10"
                  style={{ backgroundColor: node.color }}
                />

                {/* Content */}
                <div className="pb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {node.year}
                  </span>
                  <div className="mt-1">
                    {node.styleId ? (
                      <Link
                        to={`/styles/${node.styleId}`}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {node.nameZh}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {node.nameZh}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
