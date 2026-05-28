# 开发指南

本文档面向希望参与本项目开发或修改数据的开发者。

## 目录

- [开发环境准备](#开发环境准备)
- [如何添加新风格](#如何添加新风格)
- [如何修改数据](#如何修改数据)
- [测试指南](#测试指南)
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

然后在 `src/components/demos/index.ts` 中注册：

```typescript
export { default as YourStyleDemo } from './YourStyleDemo'
```

最后在 `src/components/StyleDemo.tsx` 中添加映射关系。

### 第 3 步：添加测试

在 `src/test/` 目录下为新组件添加测试，确保覆盖率不低于 90%。

### 第 4 步：验证

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

### 测试文件结构

测试文件镜像 `src/` 目录结构，放在 `src/test/` 目录下：

```
src/test/
├── setup.ts               # 测试环境初始化
├── components/
│   ├── StyleCard.test.tsx
│   ├── SearchBar.test.tsx
│   └── ...
├── pages/
│   ├── HomePage.test.tsx
│   └── ...
├── utils/
│   ├── search.test.ts
│   └── ...
└── hooks/
    └── useDebounce.test.ts
```

### 运行测试

```bash
# 运行全部测试
pnpm test

# 运行并查看覆盖率
pnpm test:coverage

# 只运行特定文件的测试
npx vitest run src/test/utils/search.test.ts
```

### 覆盖率要求

项目要求所有指标 >= 90%：

| 指标 | 最低要求 |
|------|----------|
| Statements（语句） | 90% |
| Branches（分支） | 90% |
| Functions（函数） | 90% |
| Lines（行） | 90% |

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

## 构建和部署

### 本地构建

```bash
pnpm build
```

构建输出在 `dist/` 目录下，包含：
- 压缩的 JS/CSS 文件
- 优化后的静态资源
- HTML 入口文件

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
