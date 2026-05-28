# 开发指南

本文档面向希望参与本项目开发或修改数据的开发者。

## 目录

- [开发环境准备](#开发环境准备)
- [页面路由与组件](#页面路由与组件)
- [如何添加新风格](#如何添加新风格)
- [如何修改数据](#如何修改数据)
- [测试指南](#测试指南)
- [E2E 测试](#e2e-测试)
- [性能监控](#性能监控)
- [SEO 站点地图](#seo-站点地图)
- [构建和部署](#构建和部署)
- [代码规范](#代码规范)

---

## 开发环境准备

### 前置要求

- Node.js >= 18（推荐 22）
- pnpm >= 9

### 安装步骤

```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd ui-demo

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（热更新） |
| `pnpm build` | 构建生产版本（含类型检查） |
| `pnpm preview` | 预览生产构建结果 |
| `pnpm test` | 运行测试 |
| `pnpm test:coverage` | 运行测试并生成覆盖率报告 |
| `pnpm generate:sitemap` | 生成 sitemap.xml |
| `npx playwright test` | 运行 E2E 端到端测试 |

---

## 页面路由与组件

### 路由表

所有页面路由定义在 `src/App.tsx` 中，使用 React.lazy() 懒加载：

| 路由 | 页面组件 | 文件 | 说明 |
|------|----------|------|------|
| `/` | HomePage | `src/pages/HomePage.tsx` | 场景化入口 + Hero + 搜索 + 精选 |
| `/styles` | StyleGallery | `src/pages/StyleGallery.tsx` | 76 种风格，搜索/筛选/排序/对比/收藏 |
| `/styles/:id` | StyleDetailPage | `src/pages/StyleDetailPage.tsx` | 风格详情 + Demo + 组件预览 + 导出 |
| `/products` | ProductGallery | `src/pages/ProductGallery.tsx` | 161 种产品按行业分组 |
| `/advisor` | StyleAdvisor | `src/pages/StyleAdvisor.tsx` | 5 步引导式风格推荐问卷 |
| `/compare` | ComparePage | `src/pages/ComparePage.tsx` | 2-3 种风格并排对比 |
| `/workshop` | WorkshopPage | `src/pages/WorkshopPage.tsx` | 提示词模板变量编辑器 |
| `/projects` | ProjectsPage | `src/pages/ProjectsPage.tsx` | 项目管理（CRUD） |
| `/timeline` | TimelinePage | `src/pages/TimelinePage.tsx` | 风格演变时间线 |
| `/image-match` | ImageMatchPage | `src/pages/ImageMatchPage.tsx` | 图片上传匹配风格 |
| `/about` | About | `src/pages/About.tsx` | 关于页面 |

### 核心组件

| 组件 | 文件 | 说明 |
|------|------|------|
| Layout | `src/components/Layout.tsx` | 全局布局，导航栏、底部导航、暗色模式切换 |
| CompareBar | `src/components/CompareBar.tsx` | 对比功能浮动栏 |
| ExportModal | `src/components/ExportModal.tsx` | 设计方案导出弹窗 |
| FullPageDemo | `src/components/FullPageDemo.tsx` | 全尺寸页面 Demo + 视口切换器 |
| StyleComponentPreview | `src/components/StyleComponentPreview.tsx` | Button/Card/Form/Nav 组件预览 |
| StyleCard | `src/components/StyleCard.tsx` | 风格卡片（悬浮视差 + 收藏 + 对比） |
| FilterPanel | `src/components/FilterPanel.tsx` | 多维筛选面板 |
| SortControl | `src/components/SortControl.tsx` | 排序控件 |
| SearchBar | `src/components/SearchBar.tsx` | 搜索栏（动态占位符 + 快捷键） |

### 自定义 Hooks

| Hook | 文件 | 说明 |
|------|------|------|
| useThemeMode | `src/hooks/useThemeMode.ts` | 暗色模式切换 + 系统偏好跟随 |
| useFavorites | `src/hooks/useFavorites.ts` | 收藏功能（localStorage 持久化） |
| useCompare | `src/hooks/useCompare.ts` | 对比选择管理 |
| useProjects | `src/hooks/useProjects.ts` | 项目 CRUD 操作 |
| useDebounce | `src/hooks/useDebounce.ts` | 防抖 Hook |
| useRecentSearches | `src/hooks/useRecentSearches.ts` | 最近搜索历史 |
| useOnboarding | `src/hooks/useOnboarding.ts` | 新手引导状态 |

### 工具函数

| 模块 | 文件 | 说明 |
|------|------|------|
| webVitals | `src/utils/webVitals.ts` | Web Vitals 指标收集（LCP、CLS、INP） |
| exportScheme | `src/utils/exportScheme.ts` | CSS Variables / Markdown 导出逻辑 |
| promptGenerator | `src/utils/promptGenerator.ts` | 提示词模板生成器 |
| styleAdvisor | `src/utils/styleAdvisor.ts` | 风格推荐算法 |
| search | `src/utils/search.ts` | 搜索逻辑 |
| filters | `src/utils/filters.ts` | 筛选逻辑 |

---

## 如何添加新风格

### 第 1 步：添加风格数据

编辑 `src/data/styles.ts`，在数组中添加新的风格对象：

```typescript
{
  id: 'your-style-id',           // 唯一标识，用于 URL
  nameEn: 'Your Style Name',     // 英文名称
  nameZh: '你的风格名称',         // 中文名称
  category: 'General',           // 类别：General / Landing Page / Dashboard
  description: '风格描述...',     // 中文描述
  promptZh: '用于 AI 的中文提示词...', // 中文 AI 提示词
  colors: {
    primary: '#hexcolor',        // 主色
    secondary: '#hexcolor',      // 辅色
    accent: '#hexcolor',         // 强调色
  },
  performance: 'High',           // 性能等级：High / Medium / Low
  accessibility: 'AA',           // 无障碍等级：A / AA / AAA
  tags: ['tag1', 'tag2'],        // 标签（用于搜索）
}
```

### 第 2 步：创建专属演示组件（可选）

如果新风格需要专属的视觉演示，在 `src/components/demos/` 目录下创建：

```typescript
// src/components/demos/YourStyleDemo.tsx
export default function YourStyleDemo() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* 你的风格演示 CSS */}
    </div>
  )
}
```

然后在 `src/components/StyleDemo.tsx` 中添加映射关系。

### 第 3 步：添加测试

在 `src/test/` 目录下为新组件添加测试，确保覆盖率不低于 90%。

### 第 4 步：更新站点地图

添加新风格后需要重新生成 sitemap：

```bash
pnpm generate:sitemap
```

### 第 5 步：验证

```bash
# 确认构建通过
pnpm build

# 确认测试通过且覆盖率达标
pnpm test:coverage
```

---

## 如何修改数据

### 风格数据

风格数据在 `src/data/styles.ts` 中，直接编辑该文件即可。

数据结构参考 `src/data/types.ts` 中的类型定义。

### 产品数据

产品数据在 `src/data/products.ts` 中。每个产品包含：

- 产品名称（中英文）
- 推荐的主要风格
- 推荐的备选风格
- 适用行业

### 从 CSV 重新生成数据

如果你有更新的 CSV 数据源，可以使用构建脚本重新生成：

```bash
node scripts/build-data.mjs
```

脚本会读取 CSV 文件并生成对应的 TypeScript 数据文件。

### 产品分类

产品行业分类逻辑在 `src/utils/productCategories.ts` 中。如需修改分类规则，编辑该文件中的关键词映射。

---

## 测试指南

### 测试框架

- **Vitest** - 测试运行器
- **React Testing Library** - 组件测试
- **jsdom** - 浏览器环境模拟
- **@playwright/test** - E2E 端到端测试

### 测试统计

- **测试文件数**：50 个
- **测试用例数**：650+
- **覆盖率**：语句 98.69%、分支 92.93%、函数 94.2%、行 98.69%

### 测试文件结构

测试文件镜像 `src/` 目录结构，放在 `src/test/` 目录下：

```
src/test/
├── setup.ts                    # 测试环境初始化
├── accessibility.test.tsx      # 无障碍测试
├── App.test.tsx               # App 主组件测试
├── components/
│   ├── StyleCard.test.tsx
│   ├── SearchBar.test.tsx
│   ├── CompareBar.test.tsx
│   ├── ExportModal.test.tsx
│   ├── FullPageDemo.test.tsx
│   ├── StyleComponentPreview.test.tsx
│   ├── Layout.test.tsx
│   └── ...（21 个组件测试文件）
├── pages/
│   ├── HomePage.test.tsx
│   ├── StyleGallery.test.tsx
│   ├── StyleDetailPage.test.tsx
│   ├── ComparePage.test.tsx
│   ├── WorkshopPage.test.tsx
│   ├── ProjectsPage.test.tsx
│   ├── TimelinePage.test.tsx
│   ├── ImageMatchPage.test.tsx
│   ├── StyleAdvisor.test.tsx
│   └── ...（11 个页面测试文件）
├── hooks/
│   ├── useThemeMode.test.ts
│   ├── useFavorites.test.ts
│   ├── useCompare.test.ts
│   ├── useProjects.test.ts
│   └── ...（7 个 Hook 测试文件）
└── utils/
    ├── webVitals.test.ts
    ├── exportScheme.test.ts
    ├── promptGenerator.test.ts
    ├── styleAdvisor.test.ts
    └── ...（9 个工具函数测试文件）
```

### 运行测试

```bash
# 运行全部测试
pnpm test

# 运行并查看覆盖率
pnpm test:coverage

# 只运行特定文件的测试
npx vitest run src/test/utils/search.test.ts

# 只运行特定目录的测试
npx vitest run src/test/pages/

# 监听模式（开发时）
npx vitest src/test/components/
```

### 覆盖率要求

项目要求所有指标 >= 90%：

| 指标 | 最低要求 | 当前值 |
|------|----------|--------|
| Statements（语句） | 90% | 98.69% |
| Branches（分支） | 90% | 92.93% |
| Functions（函数） | 90% | 94.2% |
| Lines（行） | 90% | 98.69% |

覆盖率配置在 `vitest.config.ts` 中。以下文件被排除在覆盖率统计之外：

- `src/test/**` - 测试文件本身
- `src/main.tsx` - 入口文件
- `src/vite-env.d.ts` - 类型声明
- `src/data/types.ts` - 纯类型定义

### 编写测试的建议

1. **测试用户行为，而不是实现细节**
2. 优先使用 `getByRole`、`getByText`、`getByLabelText` 查询
3. 异步操作使用 `waitFor` 或 `findBy` 查询
4. 模拟外部依赖（如 `navigator.clipboard`）
5. 事件模拟优先使用 `@testing-library/user-event`
6. IntersectionObserver 需要在测试中 mock（参考 StyleGallery 测试）
7. 包含 state 更新的操作需要用 `act()` 包裹

示例：

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { YourComponent } from '../components/YourComponent'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>
    )
    expect(screen.getByText('预期文本')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>
    )
    await user.click(screen.getByRole('button', { name: '按钮名称' }))
    expect(screen.getByText('交互后的文本')).toBeInTheDocument()
  })
})
```

---

## E2E 测试

项目使用 Playwright 进行端到端测试。

### 配置

E2E 测试配置在 `playwright.config.ts` 中，包括：
- 浏览器：Chromium
- 基础 URL：http://localhost:5173
- 截图和视频设置

### 运行 E2E 测试

```bash
# 安装 Playwright 浏览器（首次）
npx playwright install

# 运行所有 E2E 测试
npx playwright test

# 运行指定测试文件
npx playwright test tests/homepage.spec.ts

# 打开交互式 UI 运行测试
npx playwright test --ui

# 生成测试报告
npx playwright show-report
```

### 编写 E2E 测试

E2E 测试文件放在项目根目录的 `tests/` 或 `e2e/` 目录下：

```typescript
import { test, expect } from '@playwright/test'

test('首页场景卡片导航', async ({ page }) => {
  await page.goto('/')
  await page.click('text=帮我选')
  await expect(page).toHaveURL('/advisor')
})
```

---

## 性能监控

### Web Vitals

项目集成了 Web Vitals 性能指标收集，位于 `src/utils/webVitals.ts`。

收集的核心指标：

| 指标 | 说明 | 良好阈值 |
|------|------|----------|
| LCP | Largest Contentful Paint（最大内容绘制） | < 2.5s |
| CLS | Cumulative Layout Shift（累积布局偏移） | < 0.1 |
| INP | Interaction to Next Paint（交互到下一次绘制） | < 200ms |

`reportWebVitals` 函数在 `src/main.tsx` 中调用，当前将指标输出到控制台。可扩展为发送到分析服务。

### 懒渲染优化

`src/pages/StyleGallery.tsx` 使用 IntersectionObserver 实现懒渲染：
- 76 张风格卡片不会一次性全部渲染
- 只有进入视口的卡片才会完整渲染
- 显著减少首屏渲染时间和内存占用

---

## SEO 站点地图

### 自动生成

站点地图通过脚本自动生成，包含所有页面 URL：

```bash
pnpm generate:sitemap
```

脚本位于 `scripts/generate-sitemap.ts`，生成的 `public/sitemap.xml` 包含 82 个 URL：
- 主要页面（首页、风格库、产品推荐等）
- 全部 76 个风格详情页
- 功能页面（对比、工作台、项目、时间线等）

### Meta 标签

每个风格详情页通过 `react-helmet-async` 注入独立的 SEO meta 标签：

```tsx
<Helmet>
  <title>{style.nameZh} - UI 风格展示库</title>
  <meta name="description" content={style.description} />
  <meta property="og:title" content={style.nameZh} />
  <meta property="og:description" content={style.description} />
</Helmet>
```

`HelmetProvider` 包裹在 `src/App.tsx` 的最外层。

### 添加新页面后

如果添加了新的路由页面，需要：
1. 更新 `scripts/generate-sitemap.ts` 中的 URL 列表
2. 重新运行 `pnpm generate:sitemap`
3. 确认新 URL 出现在 `public/sitemap.xml` 中

---

## 构建和部署

### 本地构建

```bash
pnpm build
```

构建输出在 `dist/` 目录下，包含：
- 压缩的 JS/CSS 文件
- 优化后的静态资源
- HTML 入口文件
- sitemap.xml

### 部署方式

本项目是纯静态 SPA，可以部署到任何静态托管服务：

**Vercel：**
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

**Netlify：**
- 构建命令：`pnpm build`
- 发布目录：`dist`

**Nginx：**
```nginx
server {
    listen 80;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

注意：由于使用了客户端路由（React Router），需要配置所有路径回退到 `index.html`。

**GitHub Pages：**

需要额外配置 `vite.config.ts` 中的 `base` 路径：

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

---

## 代码规范

### TypeScript

- 使用严格模式（`strict: true`）
- 优先使用 `interface` 定义对象类型
- 组件 Props 使用 `interface` 并以 `Props` 后缀命名
- 避免使用 `any`，必要时使用 `unknown`

### React 组件

- 使用函数组件 + Hooks
- 组件文件使用 PascalCase 命名（如 `StyleCard.tsx`）
- 每个文件导出一个主组件
- 使用 `React.lazy()` 实现页面级路由懒加载

### 样式

- 使用 Tailwind CSS v4 的工具类
- 自定义动画在 `src/index.css` 中定义
- 响应式断点遵循 Tailwind 默认值（sm/md/lg/xl）
- 避免内联 style 对象，除非是动态计算的值

### 文件组织

- 组件放在 `src/components/`
- 页面放在 `src/pages/`
- 工具函数放在 `src/utils/`
- 自定义 Hooks 放在 `src/hooks/`
- 测试文件放在 `src/test/`，镜像源码目录结构

### Git 提交规范

使用语义化提交信息：

- `feat:` - 新功能
- `fix:` - 修复 Bug
- `docs:` - 文档变更
- `refactor:` - 重构（不改变行为）
- `test:` - 测试相关
- `chore:` - 构建/工具变更
