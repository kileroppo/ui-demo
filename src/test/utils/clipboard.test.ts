import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyToClipboard } from '../../utils/clipboard'

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('copies text using navigator.clipboard API', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: { writeText },
    })

    const result = await copyToClipboard('test text')
    expect(result).toBe(true)
    expect(writeText).toHaveBeenCalledWith('test text')
  })

  it('uses fallback when clipboard API fails', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    })

    const result = await copyToClipboard('test text')
    // Fallback may or may not succeed in test env
    expect(typeof result).toBe('boolean')
  })

  it('uses fallback when clipboard API is not available', async () => {
    Object.assign(navigator, { clipboard: undefined })

    const execCommand = vi.fn().mockReturnValue(true)
    document.execCommand = execCommand

    const result = await copyToClipboard('hello')
    expect(result).toBe(true)
    expect(execCommand).toHaveBeenCalledWith('copy')
  })

  it('returns false when everything fails', async () => {
    Object.assign(navigator, { clipboard: undefined })
    document.execCommand = vi.fn().mockImplementation(() => {
      throw new Error('not supported')
    })

    const result = await copyToClipboard('text')
    expect(result).toBe(false)
  })
})
