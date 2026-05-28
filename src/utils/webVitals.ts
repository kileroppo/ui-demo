import type { Metric } from 'web-vitals'
import { onCLS, onLCP, onINP } from 'web-vitals'

export type { Metric }

export function reportWebVitals(onReport?: (metric: Metric) => void): void {
  const handler = onReport || ((metric: Metric) => {
    if (import.meta.env.DEV) {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value)
    }
  })

  onCLS(handler)
  onLCP(handler)
  onINP(handler)
}
