import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onLCP: vi.fn(),
  onINP: vi.fn(),
}))

import { onCLS, onLCP, onINP } from 'web-vitals'
import { reportWebVitals } from '../../utils/webVitals'

describe('reportWebVitals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls onCLS, onLCP, and onINP', () => {
    reportWebVitals()
    expect(onCLS).toHaveBeenCalledTimes(1)
    expect(onLCP).toHaveBeenCalledTimes(1)
    expect(onINP).toHaveBeenCalledTimes(1)
  })

  it('passes custom handler to vitals functions', () => {
    const handler = vi.fn()
    reportWebVitals(handler)
    expect(onCLS).toHaveBeenCalledWith(handler)
    expect(onLCP).toHaveBeenCalledWith(handler)
    expect(onINP).toHaveBeenCalledWith(handler)
  })

  it('uses default handler when no custom handler provided', () => {
    reportWebVitals()
    const clsHandler = (onCLS as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(typeof clsHandler).toBe('function')
  })

  it('default handler logs in dev mode', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    reportWebVitals()
    const handler = (onCLS as ReturnType<typeof vi.fn>).mock.calls[0][0]
    handler({ name: 'CLS', value: 0.1 })
    expect(consoleSpy).toHaveBeenCalledWith('[Web Vitals] CLS:', 0.1)
    consoleSpy.mockRestore()
  })
})
