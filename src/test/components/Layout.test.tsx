import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from '../../components/Layout'

describe('Layout', () => {
  it('renders site title', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('UI 风格库')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0)
    expect(screen.getAllByText('风格库').length).toBeGreaterThan(0)
    expect(screen.getAllByText('产品推荐').length).toBeGreaterThan(0)
    expect(screen.getAllByText('关于').length).toBeGreaterThan(0)
  })

  it('renders children content', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>Test content</p>
        </Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('shows mobile menu button', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByLabelText('打开菜单')).toBeInTheDocument()
  })

  it('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    const button = screen.getByLabelText('打开菜单')
    await user.click(button)
    expect(screen.getByLabelText('关闭菜单')).toBeInTheDocument()
    expect(screen.getByLabelText('移动端导航')).toBeInTheDocument()
  })

  it('closes mobile menu when nav link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )

    await user.click(screen.getByLabelText('打开菜单'))
    const mobileNav = screen.getByLabelText('移动端导航')
    const aboutLink = mobileNav.querySelector('a[href="/about"]')!
    await user.click(aboutLink)
    expect(screen.queryByLabelText('移动端导航')).not.toBeInTheDocument()
  })

  it('renders skip-to-content link', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByText('跳转到主要内容')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(
      <MemoryRouter>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    expect(screen.getByText(/助力设计师和开发者/)).toBeInTheDocument()
  })

  it('marks active navigation item', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout>Content</Layout>
      </MemoryRouter>
    )
    const homeLink = screen.getByRole('navigation', { name: '主导航' })
      .querySelector('a[aria-current="page"]')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink?.textContent).toBe('首页')
  })
})
