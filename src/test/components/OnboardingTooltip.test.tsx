import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OnboardingTooltip } from '../../components/OnboardingTooltip'

describe('OnboardingTooltip', () => {
  it('renders title and description', () => {
    render(
      <OnboardingTooltip
        id="test-tip"
        title="测试标题"
        description="测试描述内容"
        onDismiss={() => {}}
      />
    )
    expect(screen.getByText('测试标题')).toBeInTheDocument()
    expect(screen.getByText('测试描述内容')).toBeInTheDocument()
  })

  it('renders dismiss button with correct text', () => {
    render(
      <OnboardingTooltip
        id="test-tip"
        title="标题"
        description="描述"
        onDismiss={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: '知道了' })).toBeInTheDocument()
  })

  it('dismiss button calls onDismiss', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(
      <OnboardingTooltip
        id="test-tip"
        title="标题"
        description="描述"
        onDismiss={onDismiss}
      />
    )

    await user.click(screen.getByRole('button', { name: '知道了' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('has correct test id based on id prop', () => {
    render(
      <OnboardingTooltip
        id="my-tooltip"
        title="标题"
        description="描述"
        onDismiss={() => {}}
      />
    )
    expect(screen.getByTestId('onboarding-tooltip-my-tooltip')).toBeInTheDocument()
  })

  it('has tooltip role', () => {
    render(
      <OnboardingTooltip
        id="test-tip"
        title="标题"
        description="描述"
        onDismiss={() => {}}
      />
    )
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('applies dark mode compatible classes', () => {
    render(
      <OnboardingTooltip
        id="test-tip"
        title="标题"
        description="描述"
        onDismiss={() => {}}
      />
    )
    const tooltip = screen.getByRole('tooltip')
    expect(tooltip.className).toContain('dark:bg-gray-800')
  })
})
