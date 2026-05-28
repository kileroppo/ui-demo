import { useEffect, useRef, useState } from 'react'

interface Props {
  end: number
  duration?: number
  suffix?: string
  label: string
}

function getSessionAnimated(label: string, end: number): boolean {
  try {
    return sessionStorage.getItem(`counter-animated-${label}-${end}`) === 'true'
  } catch {
    return false
  }
}

function setSessionAnimated(label: string, end: number): void {
  try {
    sessionStorage.setItem(`counter-animated-${label}-${end}`, 'true')
  } catch {
    // ignore
  }
}

export function AnimatedCounter({ end, duration = 1500, suffix = '', label }: Props) {
  const alreadyAnimatedRef = useRef(getSessionAnimated(label, end))
  const [count, setCount] = useState(alreadyAnimatedRef.current ? end : 0)
  const [hasAnimated, setHasAnimated] = useState(alreadyAnimatedRef.current)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (alreadyAnimatedRef.current) return
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          setSessionAnimated(label, end)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasAnimated, label])

  useEffect(() => {
    if (!hasAnimated || alreadyAnimatedRef.current) return

    let rafId: number
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafId)
  }, [hasAnimated, end, duration])

  return (
    <div ref={ref} className="text-center" aria-label={label}>
      <div className="text-3xl md:text-4xl font-bold text-gray-900">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}
