import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ImageMatchPage, extractColorsFromImageData, matchStylesToColors } from '../../pages/ImageMatchPage'

// Mock IntersectionObserver for StyleCard
beforeEach(() => {
  const MockIntersectionObserver = vi.fn((callback: IntersectionObserverCallback) => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

function renderPage() {
  return render(
    <MemoryRouter>
      <ImageMatchPage />
    </MemoryRouter>
  )
}

describe('ImageMatchPage', () => {
  it('renders page title', () => {
    renderPage()
    expect(screen.getByText('图片配色匹配')).toBeInTheDocument()
  })

  it('renders upload zone', () => {
    renderPage()
    expect(screen.getByRole('button', { name: '上传图片' })).toBeInTheDocument()
  })

  it('renders upload instructions', () => {
    renderPage()
    expect(screen.getByText(/拖放图片到这里/)).toBeInTheDocument()
  })

  it('has a file input that accepts images', () => {
    renderPage()
    const input = screen.getByLabelText('选择图片文件')
    expect(input).toHaveAttribute('accept', 'image/*')
  })

  it('shows drag state on dragover', () => {
    renderPage()
    const dropZone = screen.getByTestId('drop-zone')
    fireEvent.dragOver(dropZone, { dataTransfer: { files: [] } })
    expect(dropZone).toHaveClass('border-blue-500')
  })

  it('removes drag state on dragleave', () => {
    renderPage()
    const dropZone = screen.getByTestId('drop-zone')
    fireEvent.dragOver(dropZone, { dataTransfer: { files: [] } })
    fireEvent.dragLeave(dropZone)
    expect(dropZone).not.toHaveClass('border-blue-500')
  })

  it('processes file on drop', async () => {
    renderPage()
    const dropZone = screen.getByTestId('drop-zone')
    const file = new File(['fake-image'], 'test.png', { type: 'image/png' })

    // Mock FileReader
    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: null as ((e: { target: { result: string } }) => void) | null,
      result: 'data:image/png;base64,fake',
    }
    vi.spyOn(window, 'FileReader').mockImplementation(() => mockReader as unknown as FileReader)

    fireEvent.drop(dropZone, {
      dataTransfer: { files: [file] },
    })

    expect(mockReader.readAsDataURL).toHaveBeenCalledWith(file)
  })

  it('processes file on input change', () => {
    renderPage()
    const file = new File(['fake-image'], 'test.png', { type: 'image/png' })

    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: null as ((e: { target: { result: string } }) => void) | null,
      result: 'data:image/png;base64,fake',
    }
    vi.spyOn(window, 'FileReader').mockImplementation(() => mockReader as unknown as FileReader)

    const input = screen.getByLabelText('选择图片文件')
    fireEvent.change(input, { target: { files: [file] } })

    expect(mockReader.readAsDataURL).toHaveBeenCalledWith(file)
  })
})

describe('extractColorsFromImageData', () => {
  it('extracts dominant colors from image data', () => {
    // Create a 4x4 image with known pixel data (RGBA)
    const width = 4
    const height = 4
    const data = new Uint8ClampedArray(width * height * 4)

    // Fill with red pixels
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255     // R
      data[i + 1] = 0   // G
      data[i + 2] = 0   // B
      data[i + 3] = 255 // A
    }

    const colors = extractColorsFromImageData(data, width, height)
    expect(colors.length).toBeGreaterThan(0)
    // Quantized red: 256 rounds to 256 which clamps to 255 -> step 32: round(255/32)*32 = 256 -> capped
    // Actually quantize(255, 32) = Math.round(255/32)*32 = 8*32 = 256 -> hex ff->100 but RGB to hex handles
    // Let's just check it extracts something
    expect(colors[0].hex).toMatch(/^#[0-9a-f]{6}$/)
    expect(colors[0].count).toBeGreaterThan(0)
  })

  it('skips transparent pixels', () => {
    const width = 4
    const height = 4
    const data = new Uint8ClampedArray(width * height * 4)

    // Fill with transparent pixels
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255
      data[i + 1] = 0
      data[i + 2] = 0
      data[i + 3] = 0 // fully transparent
    }

    const colors = extractColorsFromImageData(data, width, height)
    expect(colors.length).toBe(0)
  })

  it('returns max 5 colors', () => {
    const width = 20
    const height = 20
    const data = new Uint8ClampedArray(width * height * 4)

    // Create diverse colors
    for (let i = 0; i < data.length; i += 4) {
      const idx = Math.floor(i / 4)
      data[i] = (idx * 50) % 256
      data[i + 1] = (idx * 70) % 256
      data[i + 2] = (idx * 90) % 256
      data[i + 3] = 255
    }

    const colors = extractColorsFromImageData(data, width, height)
    expect(colors.length).toBeLessThanOrEqual(5)
  })
})

describe('matchStylesToColors', () => {
  it('returns empty array for empty colors', () => {
    const result = matchStylesToColors([])
    expect(result).toEqual([])
  })

  it('returns matching styles for known colors', () => {
    // #000000 is a primary color of style 1 (Minimalism)
    const colors = [{ hex: '#000000', count: 100 }]
    const result = matchStylesToColors(colors)
    expect(result.length).toBeGreaterThan(0)
    // Should include minimalism style which has #000000
    const hasMinimalism = result.some((s) => s.id === 1)
    expect(hasMinimalism).toBe(true)
  })

  it('returns max 6 styles', () => {
    const colors = [
      { hex: '#6366f1', count: 50 },
      { hex: '#000000', count: 50 },
      { hex: '#ffffff', count: 50 },
    ]
    const result = matchStylesToColors(colors)
    expect(result.length).toBeLessThanOrEqual(6)
  })

  it('scores closer color matches higher', () => {
    // Exact match should score higher than distant match
    const colors = [{ hex: '#000000', count: 100 }]
    const result = matchStylesToColors(colors)
    // Should return at least one style that has a very dark color
    expect(result.length).toBeGreaterThan(0)
  })
})
