import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Home, Palette, Sparkles, Package, PenTool, FolderOpen, Clock } from 'lucide-react'
import { useThemeMode } from '../hooks/useThemeMode'
import { useFavorites } from '../hooks/useFavorites'

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/styles', label: '风格库' },
  { path: '/timeline', label: '时间线' },
  { path: '/products', label: '产品推荐' },
  { path: '/advisor', label: '风格顾问' },
  { path: '/workshop', label: '提示词工坊' },
  { path: '/projects', label: '我的项目' },
  { path: '/about', label: '关于' },
]

const BOTTOM_NAV_ITEMS = [
  { path: '/', label: '首页', icon: Home },
  { path: '/styles', label: '风格库', icon: Palette },
  { path: '/timeline', label: '时间线', icon: Clock },
  { path: '/advisor', label: '风格顾问', icon: Sparkles },
  { path: '/workshop', label: '提示词工坊', icon: PenTool },
  { path: '/projects', label: '我的项目', icon: FolderOpen },
  { path: '/products', label: '产品推荐', icon: Package },
]

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { mode, toggle } = useThemeMode()
  const { count } = useFavorites()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        跳转到主要内容
      </a>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
        data-testid="header"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            UI 风格库
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="主导航">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium transition-colors duration-150 group ${
                  location.pathname === item.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
                {item.path === '/styles' && count > 0 && (
                  <span className="absolute -top-2 -right-4 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold rounded-full bg-red-500 text-white" aria-live="polite" aria-label={`${count} 个收藏`}>
                    {count}
                  </span>
                )}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-transform duration-200 origin-left ${
                    location.pathname === item.path
                      ? 'w-full scale-x-100'
                      : 'w-full scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mode === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {mode === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </nav>

          {/* Mobile: theme toggle + menu button */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mode === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {mode === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Gradient bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 dark:via-blue-900 to-transparent" />

        {/* Mobile Nav (hamburger dropdown) */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900" aria-label="移动端导航">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium border-b border-gray-50 dark:border-gray-800 transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
                {item.path === '/styles' && count > 0 && (
                  <span className="ml-2 inline-flex min-w-[18px] h-[18px] items-center justify-center text-[10px] font-bold rounded-full bg-red-500 text-white">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="hidden md:block border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
          UI 风格展示库 - 助力设计师和开发者快速选择合适的界面风格
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
        aria-label="移动端底部导航"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around h-14">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
