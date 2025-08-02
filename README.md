# 微前端营销系统 (Micro Frontend Marketing)

一个基于 React + TypeScript + Module Federation 的微前端营销管理系统，提供营销活动管理、客户管理、数据分析等功能。

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Rsbuild + Module Federation
- **UI 组件库**: Ant Design 5.x
- **路由管理**: React Router DOM 7.x
- **数据可视化**: Ant Design Charts
- **样式方案**: CSS Modules + Styled Components
- **开发语言**: TypeScript 5.x

## 📦 项目结构

```
mf-marketing/
├── src/
│   ├── components/          # 公共组件
│   │   ├── AppSkeleton.tsx  # 应用骨架屏
│   │   ├── AuthGuard.tsx    # 权限守卫
│   │   └── Layout.tsx       # 布局组件
│   ├── pages/               # 页面组件
│   │   ├── Dashboard.tsx    # 仪表板
│   │   ├── Campaigns.tsx    # 营销活动
│   │   ├── Customers.tsx    # 客户管理
│   │   ├── Analytics.tsx    # 数据分析
│   │   └── NotFound.tsx     # 404页面
│   ├── utils/               # 工具函数
│   │   └── authUtils.ts     # 认证工具
│   ├── App.tsx              # 主应用组件
│   ├── bootstrap.tsx        # 应用启动文件
│   ├── index.tsx            # 入口文件
│   └── routes.ts            # 路由配置
├── public/                  # 静态资源
├── dist/                    # 构建输出
├── rsbuild.config.ts        # Rsbuild 配置
├── module-federation.config.ts # Module Federation 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目依赖
```

## 🛠️ 开发环境

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 启动开发服务器 (默认端口: 3001)
npm run dev

# 或使用 yarn
yarn dev
```

开发服务器启动后，访问 [http://localhost:3001](http://localhost:3001) 查看应用。

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 或使用 yarn
yarn build
```

### 预览生产版本

```bash
# 预览构建后的应用
npm run preview

# 或使用 yarn
yarn preview
```

### GitHub Pages 部署

```bash
# 构建 GitHub Pages 版本
npm run build:gh-pages

# 部署到 GitHub Pages (自动化)
npm run deploy
```

项目配置了自动部署到 GitHub Pages，当代码推送到 `main` 分支时会自动触发部署。

**在线访问**: [https://your-username.github.io/mf-marketing/](https://your-username.github.io/mf-marketing/)

详细部署说明请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 🏗️ 微前端架构

本项目作为微前端架构中的营销模块，具有以下特点：

### Module Federation 配置

- **端口**: 3001
- **模块名称**: marketing
- **暴露组件**: 营销相关的页面和组件
- **共享依赖**: React、React-DOM、Ant Design 等

### 路由集成

项目支持与主应用的路由集成，提供以下路由：

- `/marketing` - 营销仪表板
- `/marketing/campaigns` - 营销活动管理
- `/marketing/customers` - 客户管理
- `/marketing/analytics` - 数据分析

## 📋 功能模块

### 1. 营销仪表板 (Dashboard)
- 营销数据概览
- 关键指标展示
- 实时数据更新

### 2. 营销活动管理 (Campaigns)
- 活动创建和编辑
- 活动状态管理
- 活动效果跟踪

### 3. 客户管理 (Customers)
- 客户信息管理
- 客户分群分析
- 客户行为跟踪

### 4. 数据分析 (Analytics)
- 营销数据可视化
- 转化率分析
- ROI 计算

## 🔧 配置说明

### Rsbuild 配置

项目使用 Rsbuild 作为构建工具，配置文件为 `rsbuild.config.ts`：

- React 插件支持
- Module Federation 插件
- 开发服务器端口: 3001

### TypeScript 配置

项目使用 TypeScript 进行开发，配置文件为 `tsconfig.json`，包含：

- 严格类型检查
- 路径别名配置
- 模块解析配置

## 🚦 开发规范

### 代码规范

- 使用 TypeScript 进行类型安全开发
- 遵循 React Hooks 最佳实践
- 使用 CSS Modules 进行样式隔离
- 组件采用函数式组件 + Hooks

### 文件命名

- 组件文件使用 PascalCase: `ComponentName.tsx`
- 样式文件使用 camelCase: `componentName.module.css`
- 工具文件使用 camelCase: `utilityName.ts`

### 目录结构

- `components/` - 可复用组件
- `pages/` - 页面级组件
- `utils/` - 工具函数
- `types/` - TypeScript 类型定义

## 🔗 相关链接

- [Rsbuild 文档](https://rsbuild.dev/)
- [Module Federation 文档](https://module-federation.github.io/)
- [Ant Design 文档](https://ant.design/)
- [React Router 文档](https://reactrouter.com/)

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 项目讨论区
