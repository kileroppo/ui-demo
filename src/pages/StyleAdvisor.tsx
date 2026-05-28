import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, RotateCcw, Loader2 } from 'lucide-react'
import { getRecommendations, type AdvisorAnswers, type ScoredStyle } from '../utils/styleAdvisor'
import { StyleCard } from '../components/StyleCard'

interface Question {
  key: keyof AdvisorAnswers
  title: string
  options: { value: string; label: string }[]
}

const QUESTIONS: Question[] = [
  {
    key: 'productType',
    title: '你的产品类型是？',
    options: [
      { value: '科技SaaS', label: '科技SaaS' },
      { value: '电商零售', label: '电商零售' },
      { value: '医疗健康', label: '医疗健康' },
      { value: '金融保险', label: '金融保险' },
      { value: '教育文化', label: '教育文化' },
      { value: '生活服务', label: '生活服务' },
      { value: '创意设计', label: '创意设计' },
      { value: '其他', label: '其他' },
    ],
  },
  {
    key: 'feeling',
    title: '你想传达什么感觉？',
    options: [
      { value: '现代', label: '现代' },
      { value: '经典', label: '经典' },
      { value: '活泼', label: '活泼' },
      { value: '专业', label: '专业' },
      { value: '创意', label: '创意' },
    ],
  },
  {
    key: 'performance',
    title: '性能优先级？',
    options: [
      { value: '极致轻量', label: '极致轻量' },
      { value: '丰富特效', label: '丰富特效' },
      { value: '均衡', label: '均衡' },
    ],
  },
  {
    key: 'darkMode',
    title: '需要暗色模式？',
    options: [
      { value: '必须', label: '必须' },
      { value: '不需要', label: '不需要' },
      { value: '两者兼顾', label: '两者兼顾' },
    ],
  },
  {
    key: 'complexity',
    title: '你能接受的复杂度？',
    options: [
      { value: '简单', label: '简单' },
      { value: '中等', label: '中等' },
      { value: '复杂', label: '复杂' },
    ],
  },
]

export function StyleAdvisor() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AdvisorAnswers>({
    productType: '',
    feeling: '',
    performance: '',
    darkMode: '',
    complexity: '',
  })
  const [results, setResults] = useState<ScoredStyle[] | null>(null)
  const [computing, setComputing] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const totalSteps = QUESTIONS.length
  const currentQuestion = QUESTIONS[step]

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value }
    setAnswers(newAnswers)

    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      setComputing(true)
      timeoutRef.current = setTimeout(() => {
        const recs = getRecommendations(newAnswers)
        setResults(recs)
        setComputing(false)
        timeoutRef.current = null
      }, 600)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers({
      productType: '',
      feeling: '',
      performance: '',
      darkMode: '',
      complexity: '',
    })
    setResults(null)
  }

  if (computing) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" aria-hidden="true" />
        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
          正在分析你的偏好...
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          为你匹配最合适的风格
        </p>
      </div>
    )
  }

  if (results) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              推荐结果
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              根据你的偏好，为你推荐以下风格
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重新测试
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(({ style, score }) => (
            <div key={style.id} className="relative">
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                匹配度 {score} 分
              </span>
              <StyleCard style={style} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/styles"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            浏览全部风格 &rarr;
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          风格顾问
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          回答 5 个问题，找到最适合你的 UI 风格
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>第 {step + 1} 步 / 共 {totalSteps} 步</span>
          <span>{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {currentQuestion.title}
        </h2>
        <div className="grid gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                answers[currentQuestion.key] === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          上一步
        </button>
        {step < totalSteps - 1 && answers[currentQuestion.key] && (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            下一步
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
