# UI 风格展示库

一个面向中国设计师和开发者的 UI 设计风格参考工具。帮助你快速找到适合项目的设计风格，并生成可直接使用的 AI 提示词。

## 核心亮点

- **76 种 UI 设计风格** - 实时 CSS 演示，所见即所得
- **161 种产品类型推荐** - 按行业精准匹配最佳风格
- **中文 AI 提示词** - 一键复制，直接粘贴到 AI 工具使用
- **中英文双语搜索** - 无论输入中文还是英文都能精准匹配

## 功能特性

### 实时风格预览

每种风格都有 CSS 渲染的迷你演示卡片，包括 16 种专属演示组件（玻璃拟态、新拟态、暗黑模式、赛博朋克、极简主义等），无需想象，直接看效果。

### AI 提示词

每种风格配有精心编写的中文提示词，点击即可复制到剪贴板。支持 ChatGPT、Claude、通义千问等主流 AI 工具。

### 智能搜索

- 支持中英文关键词搜索
- 200ms 防抖，输入流畅不卡顿
- `Cmd/Ctrl + K` 快捷键唤起搜索
- 动态占位符轮播示例搜索词

### 搜索建议

- 历史搜索记忆（最近搜索自动保存）
- 热门推荐词条
- 实时匹配风格提示
- 键盘上下键导航建议列表

### 多维度筛选

- 按类别筛选：General / Landing Page / Dashboard
- 按性能等级筛选
- 按无障碍等级筛选

### 产品行业分组

8 大行业分类，帮助你快速定位：

| 行业 | 说明 |
|------|------|
| 科技 SaaS | 软件、AI、云服务等 |
| 电商零售 | 购物平台、品牌商城 |
| 医疗健康 | 健康管理、医疗服务 |
| 金融保险 | 银行、投资、保险 |
| 教育文化 | 在线教育、知识平台 |
| 生活服务 | 餐饮、旅行、本地服务 |
| 创意设计 | 设计工具、创意社区 |
| 其他 | 更多产品类型 |

### 风格-产品双向关联

- 从风格页可看推荐的产品类型
- 从产品页可看推荐的风格
- 点击即可跳转，形成完整浏览闭环

### 更多体验细节

- 响应式设计：手机 / 平板 / 桌面自适应
- 骨架屏加载动画
- 页面过渡动画
- 返回顶部按钮
- 滚动触发数字动画

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

启动后访问 `http://localhost:5173` 即可使用。

## 项目结构

```
ui-demo/
├── src/
│   ├── components/           # 可复用组件
│   │   ├── demos/            # 16 种风格专属演示组件
│   │   │   ├── GlassmorphismDemo.tsx
│   │   │   ├── NeumorphismDemo.tsx
│   │   │   ├── DarkModeDemo.tsx
│   │   │   ├── CyberpunkDemo.tsx
│   │   │   ├── MinimalismDemo.tsx
│   │   │   ├── BrutalismDemo.tsx
│   │   │   ├── NeubrutalismDemo.tsx
│   │   │   ├── RetroFuturismDemo.tsx
│   │   │   ├── AuroraDemo.tsx
│   │   │   ├── BentoGridDemo.tsx
│   │   │   ├── ClaymorphismDemo.tsx
│   │   │   ├── FlatDesignDemo.tsx
│   │   │   ├── LiquidGlassDemo.tsx
│   │   │   ├── VibrantBlockDemo.tsx
│   │   │   ├── AIUINativeDemo.tsx
│   │   │   └── GenericStyleDemo.tsx  # 通用风格演示
│   │   ├── Layout.tsx         # 页面布局（导航、页脚）
│   │   ├── SearchBar.tsx      # 搜索栏（动态占位符）
│   │   ├── SearchSuggestions.tsx # 搜索建议下拉
│   │   ├── FilterPanel.tsx    # 筛选面板
│   │   ├── StyleCard.tsx      # 风格卡片（悬浮视差）
│   │   ├── StyleDetail.tsx    # 风格详情展示
│   │   ├── StyleDemo.tsx      # 风格演示容器
│   │   ├── CopyButton.tsx     # 复制按钮（带动效）
│   │   ├── AnimatedCounter.tsx # 数字动画计数器
│   │   ├── BackToTop.tsx      # 返回顶部按钮
│   │   └── PageTransition.tsx # 页面过渡动画
│   ├── pages/                 # 页面路由
│   │   ├── HomePage.tsx       # 首页（Hero + 精选）
│   │   ├── StyleGallery.tsx   # 风格库（全部 76 种）
│   │   ├── StyleDetailPage.tsx # 风格详情
│   │   ├── ProductGallery.tsx # 产品推荐（161 种）
│   │   └── About.tsx          # 关于页面
│   ├── data/                  # 静态数据
│   │   ├── styles.ts          # 76 种风格数据
│   │   ├── products.ts        # 161 种产品数据
│   │   ├── types.ts           # TypeScript 类型定义
│   │   └── index.ts           # 数据导出
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useDebounce.ts     # 防抖 Hook
│   │   └── useRecentSearches.ts # 最近搜索 Hook
│   ├── utils/                 # 工具函数
│   │   ├── search.ts          # 搜索逻辑
│   │   ├── filters.ts         # 筛选逻辑
│   │   ├── clipboard.ts       # 剪贴板操作
│   │   └── productCategories.ts # 产品分类工具
│   └── test/                  # 测试文件（镜像 src 结构）
├── scripts/                   # 构建脚本
│   ├── build-data.mjs         # CSV 数据转 TypeScript
│   ├── csv-utils.mjs          # CSV 解析工具
│   └── csv-utils.d.mts        # 类型声明
├── package.json
├── vite.config.ts
├── vitest.config.ts
└── tsconfig.json
```

## 页面说明

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | Hero 区 + 搜索 + 数据统计 + 精选风格 + 分类导航 + Find My Style CTA |
| 风格库 | `/styles` | 全部 76 种风格，支持搜索和多维筛选 |
| 风格详情 | `/styles/:id` | 单个风格的完整信息、实时演示、提示词、推荐产品 |
| 产品推荐 | `/products` | 161 种产品按 8 大行业分组，含推荐风格 |
| 关于 | `/about` | 项目介绍、使用指南、技术栈 |

## 使用指南

### 1. 寻找设计灵感

- 访问首页，浏览精选风格卡片
- 或点击分类按钮快速跳转到特定类别
- 使用搜索框输入关键词（如"玻璃"、"暗色"、"极简"）
- 点击 "Find My Style" 按钮进入引导式筛选

### 2. 查看风格详情

- 点击任意风格卡片进入详情页
- 查看实时 CSS 演示效果
- 了解该风格的适用场景、技术参数、颜色方案
- 查看"推荐产品"了解该风格适合哪些产品类型

### 3. 复制 AI 提示词

- 在风格详情页找到"中文 AI 提示词"区域
- 点击复制按钮，提示词自动进入剪贴板
- 粘贴到 ChatGPT / Claude / 通义千问等 AI 工具中使用

### 4. 按产品类型选择

- 访问"产品推荐"页面
- 找到你的行业/产品类型
- 查看为该类型推荐的最佳 UI 风格
- 点击风格名称跳转到对应风格详情

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Cmd/Ctrl + K` | 聚焦搜索框 |
| `↑ / ↓` | 在搜索建议中导航 |
| `Enter` | 选择当前建议 |
| `Esc` | 关闭搜索建议 |

## 开发指南

```bash
# 运行测试
pnpm test

# 运行测试（含覆盖率报告）
pnpm test:coverage

# 开发模式（热更新）
pnpm dev

# 类型检查
tsc -b
```

测试覆盖率要求：>= 90%（语句、分支、函数、行）

详细开发文档请参阅 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。

## 数据来源

本项目数据来源于 [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) 技能库，包含：

- 67 种通用 UI 风格（General）
- 8 种着陆页风格（Landing Page）
- 10 种 BI 仪表盘风格（Dashboard）
- 161 种产品类型的设计推荐

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| Vite | 6 | 构建工具 |
| TypeScript | 5.7+ | 类型安全 |
| Tailwind CSS | 4 | 样式系统 |
| React Router | 7 | 路由管理 |
| Lucide React | - | 图标库 |
| Vitest | 3 | 测试框架 |
| React Testing Library | 16 | 组件测试 |

## License

MIT
