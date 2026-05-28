import type { Metric } from 'web-vitals'
import { onCLS, onLCP, onINP } from 'web-vitals'

export type { Metric }

/**
 * Reports Core Web Vitals (CLS, LCP, INP).
 *
 * By default, metrics are logged to the console in development only.
 * In production the default handler is a no-op. To report metrics in
 * production, pass a custom handler (e.g. send to your analytics endpoint):
 *
 *   reportWebVitals((metric) => sendToAnalytics(metric))
 */
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
