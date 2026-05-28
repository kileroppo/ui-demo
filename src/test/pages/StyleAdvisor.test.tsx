import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { StyleAdvisor } from '../../pages/StyleAdvisor'

describe('StyleAdvisor', () => {
  beforeEach(() => {
    const MockIntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  async function completeQuiz(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByText('科技SaaS'))
    await user.click(screen.getByText('专业'))
    await user.click(screen.getByText('极致轻量'))
    await user.click(screen.getByText('必须'))
    await user.click(screen.getByText('简单'))
  }

  it('renders first question', () => {
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    expect(screen.getByText('风格顾问')).toBeInTheDocument()
    expect(screen.getByText('你的产品类型是？')).toBeInTheDocument()
  })

  it('shows progress indicator', () => {
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    expect(screen.getByText('第 1 步 / 共 5 步')).toBeInTheDocument()
  })

  it('renders all product type options for step 1', () => {
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    expect(screen.getByText('科技SaaS')).toBeInTheDocument()
    expect(screen.getByText('电商零售')).toBeInTheDocument()
    expect(screen.getByText('医疗健康')).toBeInTheDocument()
    expect(screen.getByText('金融保险')).toBeInTheDocument()
    expect(screen.getByText('教育文化')).toBeInTheDocument()
    expect(screen.getByText('生活服务')).toBeInTheDocument()
    expect(screen.getByText('创意设计')).toBeInTheDocument()
    expect(screen.getByText('其他')).toBeInTheDocument()
  })

  it('advances to step 2 when option selected', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    await user.click(screen.getByText('科技SaaS'))
    expect(screen.getByText('你想传达什么感觉？')).toBeInTheDocument()
    expect(screen.getByText('第 2 步 / 共 5 步')).toBeInTheDocument()
  })

  it('can navigate back to previous step', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    await user.click(screen.getByText('科技SaaS'))
    expect(screen.getByText('你想传达什么感觉？')).toBeInTheDocument()

    await user.click(screen.getByText('上一步'))
    expect(screen.getByText('你的产品类型是？')).toBeInTheDocument()
  })

  it('back button is disabled on first step', () => {
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    const backButton = screen.getByText('上一步')
    expect(backButton.closest('button')).toBeDisabled()
  })

  it('completes all steps and shows results', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )

    await completeQuiz(user)

    // Should show computing state first
    expect(screen.getByText('正在分析你的偏好...')).toBeInTheDocument()

    // Wait for the 600ms computing delay to pass
    await waitFor(() => {
      expect(screen.getByText('推荐结果')).toBeInTheDocument()
    }, { timeout: 2000 })

    expect(screen.getByText('重新测试')).toBeInTheDocument()
  })

  it('restart button resets the quiz', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )

    await completeQuiz(user)

    // Wait for results
    await waitFor(() => {
      expect(screen.getByText('推荐结果')).toBeInTheDocument()
    }, { timeout: 2000 })

    // Click restart
    await user.click(screen.getByText('重新测试'))
    expect(screen.getByText('你的产品类型是？')).toBeInTheDocument()
    expect(screen.getByText('第 1 步 / 共 5 步')).toBeInTheDocument()
  })

  it('shows match score badges on results', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )

    await completeQuiz(user)

    await waitFor(() => {
      expect(screen.getByText('推荐结果')).toBeInTheDocument()
    }, { timeout: 2000 })

    const scoreBadges = screen.getAllByText(/匹配度 \d+ 分/)
    expect(scoreBadges.length).toBeGreaterThan(0)
    expect(scoreBadges.length).toBeLessThanOrEqual(5)
  })

  it('renders step 3 performance question', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    await user.click(screen.getByText('科技SaaS'))
    await user.click(screen.getByText('专业'))
    expect(screen.getByText('性能优先级？')).toBeInTheDocument()
    expect(screen.getByText('极致轻量')).toBeInTheDocument()
    expect(screen.getByText('丰富特效')).toBeInTheDocument()
    expect(screen.getByText('均衡')).toBeInTheDocument()
  })

  it('renders step 4 dark mode question', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    await user.click(screen.getByText('科技SaaS'))
    await user.click(screen.getByText('专业'))
    await user.click(screen.getByText('极致轻量'))
    expect(screen.getByText('需要暗色模式？')).toBeInTheDocument()
    expect(screen.getByText('必须')).toBeInTheDocument()
    expect(screen.getByText('不需要')).toBeInTheDocument()
    expect(screen.getByText('两者兼顾')).toBeInTheDocument()
  })

  it('renders step 5 complexity question', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )
    await user.click(screen.getByText('科技SaaS'))
    await user.click(screen.getByText('专业'))
    await user.click(screen.getByText('极致轻量'))
    await user.click(screen.getByText('必须'))
    expect(screen.getByText('你能接受的复杂度？')).toBeInTheDocument()
    expect(screen.getByText('简单')).toBeInTheDocument()
    expect(screen.getByText('中等')).toBeInTheDocument()
    expect(screen.getByText('复杂')).toBeInTheDocument()
  })

  it('shows link to browse all styles in results', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )

    await completeQuiz(user)

    await waitFor(() => {
      expect(screen.getByText(/浏览全部风格/)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('shows computing state with loading indicator', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <StyleAdvisor />
      </MemoryRouter>
    )

    await completeQuiz(user)

    // Should show computing state immediately after last step
    expect(screen.getByText('正在分析你的偏好...')).toBeInTheDocument()
    expect(screen.getByText('为你匹配最合适的风格')).toBeInTheDocument()
  })
})
