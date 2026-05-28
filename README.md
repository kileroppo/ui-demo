# UI 风格展示库

一个面向中国设计师和开发者的 UI 设计风格参考工具。帮助你快速找到适合项目的设计风格，并生成可直接使用的 AI 提示词。

## 核心亮点

- **76 种 UI 设计风格** - 实时 CSS 演示，所见即所得
- **161 种产品类型推荐** - 按行业精准匹配最佳风格
- **中文 AI 提示词** - 一键复制，直接粘贴到 AI 工具使用
- **中英文双语搜索** - 无论输入中文还是英文都能精准匹配
- **场景化入口** - 三种用户路径引导："我知道我要什么"/"帮我选"/"我有参考图"
- **风格对比** - 选择 2-3 种风格并排对比
- **图片匹配** - 上传参考图，自动提取颜色匹配风格
- **AI 提示词工作台** - 模板变量编辑器，实时预览生成效果
- **设计方案导出** - 导出 CSS Variables 或 Markdown 摘要
- **我的项目管理** - 创建项目、绑定风格/颜色/字体，生成定制提示词

## 功能特性

### 场景化入口（首页）

首页提供三张场景卡片，引导不同需求的用户：
- **我知道我要什么** - 直接搜索已知风格
- **帮我选** - 进入风格顾问，通过问答推荐风格
- **我有参考图** - 上传图片，系统自动匹配最接近的风格

### 实时风格预览

每种风格都有 CSS 渲染的迷你演示卡片，包括 16 种专属演示组件（玻璃拟态、新拟态、暗黑模式、赛博朋克、极简主义等），无需想象，直接看效果。

### 全尺寸页面 Demo

Top 10 热门风格提供完整 HTML 页面演示，内置视口切换器支持：
- Desktop（桌面端）
- Tablet（平板）
- Mobile（手机）

### 风格组件预览

每种风格详情页展示四种常见组件的风格化预览：
- Button（按钮）
- Card（卡片）
- Form（表单）
- Nav（导航）

### AI 提示词

每种风格配有精心编写的中文提示词，点击即可复制到剪贴板。支持三种分段：
- **UI Design** - 界面设计提示词
- **Image Gen** - 图片生成提示词
- **Code Gen** - 代码生成提示词

### AI 提示词工作台

`/workshop` 页面提供模板变量编辑器：
- 选择风格模板
- 编辑模板变量（品牌色、字体、布局等）
- 实时预览生成的完整提示词
- 一键复制结果

### 风格顾问

5 步引导式问卷（`/advisor`），回答 5 个问题即可获得个性化风格推荐。

### 风格对比

在风格库中选择 2-3 种风格，通过底部 CompareBar 进入对比页面（`/compare`），并排查看各项参数差异。

### 图片匹配风格

上传参考图片（`/image-match`），系统自动提取图片主色调，匹配数据库中最接近的风格。

### 设计方案导出

在风格详情页可导出设计方案：
- **CSS Variables** - 导出为 CSS 自定义属性文件
- **Markdown Summary** - 导出为 Markdown 格式的设计方案摘要

### 我的项目

`/projects` 页面支持：
- 创建命名项目
- 为项目绑定风格、颜色、字体
- 生成项目定制化提示词
- 项目数据持久化存储在 localStorage

### 风格演变时间线

`/timeline` 页面展示 UI 设计风格的历史演变：
- Skeuomorphism（拟物化，2007）
- Flat Design（扁平设计，2013）
- Material Design（质感设计，2014）
- Neumorphism（新拟态，2020）
- Glassmorphism（玻璃拟态，2020）
- Bento Grid（便当盒布局，2023）
- Liquid Glass（液态玻璃，2025）

每个节点可点击跳转到对应风格详情页。

### 暗色模式

- 点击导航栏切换按钮开启/关闭暗色模式
- 自动跟随系统偏好设置
- 偏好保存在 localStorage 中

### 收藏系统

- 在风格卡片上点击爱心图标收藏
- 收藏数据持久化存储在 localStorage
- 快速访问已收藏的风格

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

### 性能优化

- **Web Vitals 监控** - 收集 LCP、CLS、INP 核心指标
- **懒渲染** - IntersectionObserver 驱动的懒加载，76 张风格卡片按需渲染
- **路由懒加载** - React.lazy() 代码分割，按需加载页面组件

### SEO 优化

- **react-helmet-async** - 每个风格详情页注入独立的 meta 标签（title、description、og:image）
- **sitemap.xml** - 自动生成站点地图，包含 82 个 URL

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

# 生成站点地图
pnpm generate:sitemap
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
│   │   ├── Layout.tsx         # 页面布局（导航、页脚、暗色模式切换）
│   │   ├── CompareBar.tsx     # 风格对比浮动栏
│   │   ├── ExportModal.tsx    # 设计方案导出弹窗
│   │   ├── FullPageDemo.tsx   # 全尺寸页面 Demo 容器
│   │   ├── StyleComponentPreview.tsx # 风格组件预览
│   │   ├── SearchBar.tsx      # 搜索栏（动态占位符）
│   │   ├── SearchSuggestions.tsx # 搜索建议下拉
│   │   ├── FilterPanel.tsx    # 筛选面板
│   │   ├── SortControl.tsx    # 排序控件
│   │   ├── ViewToggle.tsx     # 视图切换（网格/列表）
│   │   ├── StyleCard.tsx      # 风格卡片（悬浮视差 + 收藏）
│   │   ├── StyleListItem.tsx  # 风格列表项
│   │   ├── StyleDetail.tsx    # 风格详情展示
│   │   ├── StyleDemo.tsx      # 风格演示容器
│   │   ├── CopyButton.tsx     # 复制按钮（带动效）
│   │   ├── AnimatedCounter.tsx # 数字动画计数器
│   │   ├── BackToTop.tsx      # 返回顶部按钮
│   │   ├── OnboardingTooltip.tsx # 新手引导提示
│   │   └── PageTransition.tsx # 页面过渡动画
│   ├── pages/                 # 页面路由
│   │   ├── HomePage.tsx       # 首页（场景卡片 + Hero + 搜索 + 精选）
│   │   ├── StyleGallery.tsx   # 风格库（全部 76 种，懒渲染）
│   │   ├── StyleDetailPage.tsx # 风格详情（Demo + 组件预览 + 导出）
│   │   ├── ProductGallery.tsx # 产品推荐（161 种）
│   │   ├── StyleAdvisor.tsx   # 风格顾问（5 步问卷）
│   │   ├── ComparePage.tsx    # 风格对比
│   │   ├── WorkshopPage.tsx   # AI 提示词工作台
│   │   ├── ProjectsPage.tsx   # 我的项目
│   │   ├── TimelinePage.tsx   # 风格演变时间线
│   │   ├── ImageMatchPage.tsx # 图片匹配风格
│   │   └── About.tsx          # 关于页面
│   ├── data/                  # 静态数据
│   │   ├── styles.ts          # 76 种风格数据
│   │   ├── products.ts        # 161 种产品数据
│   │   ├── types.ts           # TypeScript 类型定义
│   │   └── index.ts           # 数据导出
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useDebounce.ts     # 防抖 Hook
│   │   ├── useRecentSearches.ts # 最近搜索 Hook
│   │   ├── useThemeMode.ts    # 暗色模式 Hook
│   │   ├── useFavorites.ts    # 收藏功能 Hook
│   │   ├── useCompare.ts      # 对比功能 Hook
│   │   ├── useProjects.ts     # 项目管理 Hook
│   │   └── useOnboarding.ts   # 新手引导 Hook
│   ├── utils/                 # 工具函数
│   │   ├── search.ts          # 搜索逻辑
│   │   ├── filters.ts         # 筛选逻辑
│   │   ├── clipboard.ts       # 剪贴板操作
│   │   ├── productCategories.ts # 产品分类工具
│   │   ├── promptGenerator.ts # 提示词生成器
│   │   ├── styleAdvisor.ts    # 风格顾问算法
│   │   ├── exportScheme.ts    # 设计方案导出
│   │   └── webVitals.ts       # Web Vitals 性能监控
│   └── test/                  # 测试文件（50 个测试文件，650+ 测试用例）
├── scripts/                   # 构建脚本
│   ├── build-data.mjs         # CSV 数据转 TypeScript
│   ├── csv-utils.mjs          # CSV 解析工具
│   ├── csv-utils.d.mts        # 类型声明
│   └── generate-sitemap.ts    # 站点地图生成脚本
├── public/
│   └── sitemap.xml            # 站点地图（82 个 URL）
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts       # E2E 测试配置
└── tsconfig.json
```

## 页面说明

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 场景化入口卡片 + Hero + 搜索 + 数据统计 + 精选风格 |
| 风格库 | `/styles` | 全部 76 种风格，搜索/筛选/排序/对比/收藏 |
| 风格详情 | `/styles/:id` | 完整信息、实时演示、全尺寸 Demo、组件预览、导出、提示词 |
| 产品推荐 | `/products` | 161 种产品按 8 大行业分组，含推荐风格 |
| 风格顾问 | `/advisor` | 5 步引导式问卷，智能推荐风格 |
| 风格对比 | `/compare` | 选择 2-3 种风格并排对比 |
| 提示词工作台 | `/workshop` | 模板变量编辑器 + 实时预览 |
| 我的项目 | `/projects` | 项目管理，绑定风格/颜色/字体 |
| 风格时间线 | `/timeline` | UI 风格演变历史可视化 |
| 图片匹配 | `/image-match` | 上传图片匹配风格 |
| 关于 | `/about` | 项目介绍、使用指南、技术栈 |

## 使用指南

### 1. 寻找设计灵感

- 访问首页，根据场景选择入口卡片
- 或浏览精选风格卡片
- 使用搜索框输入关键词（如"玻璃"、"暗色"、"极简"）
- 点击 "Find My Style" 按钮进入风格顾问

### 2. 查看风格详情

- 点击任意风格卡片进入详情页
- 查看实时 CSS 演示效果和全尺寸页面 Demo
- 切换 Desktop/Tablet/Mobile 视口预览
- 查看 Button/Card/Form/Nav 组件预览
- 了解该风格的适用场景、技术参数、颜色方案

### 3. 复制 AI 提示词

- 在风格详情页选择提示词分段（UI Design / Image Gen / Code Gen）
- 点击复制按钮，提示词自动进入剪贴板
- 或使用提示词工作台（`/workshop`）自定义模板变量

### 4. 按产品类型选择

- 访问"产品推荐"页面
- 找到你的行业/产品类型
- 查看为该类型推荐的最佳 UI 风格
- 点击风格名称跳转到对应风格详情

### 5. 图片匹配

- 访问图片匹配页面（`/image-match`）
- 上传一张参考图片
- 系统自动提取颜色并匹配最接近的风格

### 6. 对比风格

- 在风格库中点击卡片上的对比按钮，选择 2-3 种风格
- 底部浮动栏显示已选风格
- 点击"开始对比"进入对比页面

### 7. 导出设计方案

- 在风格详情页点击"导出"按钮
- 选择导出格式：CSS Variables 或 Markdown 摘要
- 下载导出文件

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

# 运行 E2E 测试
npx playwright test

# 生成站点地图
pnpm generate:sitemap

# 开发模式（热更新）
pnpm dev

# 类型检查
tsc -b
```

测试覆盖率要求：>= 90%（语句、分支、函数、行）
当前状态：50 个测试文件，650+ 测试用例

详细开发文档请参阅 [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)。
详细使用指南请参阅 [docs/USAGE.md](docs/USAGE.md)。

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
| react-helmet-async | 3 | SEO meta 标签 |
| web-vitals | 5 | 性能监控 |
| Vitest | 3 | 单元测试框架 |
| React Testing Library | 16 | 组件测试 |
| @playwright/test | 1.60+ | E2E 端到端测试 |

## License

MIT
