# 微前端集成指南

本文档说明如何将营销模块集成到主应用 (`https://luozyiii.github.io/mf-shell/`) 中。

## 🔗 模块信息

### 营销模块 (Marketing)
- **名称**: `marketing`
- **开发环境**: `http://localhost:3001`
- **生产环境**: `https://luozyiii.github.io/mf-marketing/`
- **Remote Entry**: `https://luozyiii.github.io/mf-marketing/remoteEntry.js`

### 暴露的组件
- `./App` - 营销模块主应用组件

## 🏗️ 主应用集成配置

### 1. Module Federation 配置

在主应用的 `module-federation.config.ts` 中添加营销模块：

```typescript
import { ModuleFederationConfig } from '@module-federation/enhanced/webpack';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: {
    marketing: {
      entry: process.env.NODE_ENV === 'production' 
        ? 'https://luozyiii.github.io/mf-marketing/remoteEntry.js'
        : 'http://localhost:3001/remoteEntry.js',
      name: 'marketing',
      type: 'module'
    }
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.3.1',
      eager: false
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^18.3.1',
      eager: false
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: '^7.7.1',
      eager: false
    },
    antd: {
      singleton: true,
      requiredVersion: '^5.26.7',
      eager: false
    }
  }
};

export default config;
```

### 2. 动态导入组件

在主应用中动态导入营销模块：

```typescript
import React, { Suspense } from 'react';
import { Spin } from 'antd';

// 动态导入营销模块
const MarketingApp = React.lazy(() => import('marketing/App'));

// 在路由中使用
const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/marketing/*" 
        element={
          <Suspense fallback={<Spin size="large" />}>
            <MarketingApp />
          </Suspense>
        } 
      />
      {/* 其他路由 */}
    </Routes>
  );
};
```

### 3. 错误边界处理

```typescript
import React from 'react';
import { Result, Button } from 'antd';

class MicroFrontendErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('微前端加载错误:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <Result
          status="error"
          title="模块加载失败"
          subTitle="营销模块暂时无法加载，请稍后重试"
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              重新加载
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

// 使用错误边界包装微前端
<MicroFrontendErrorBoundary>
  <Suspense fallback={<Spin size="large" />}>
    <MarketingApp />
  </Suspense>
</MicroFrontendErrorBoundary>
```

## 🌐 路由集成

### 营销模块路由结构

营销模块提供以下路由：

**独立访问时** (https://luozyiii.github.io/mf-marketing/):
```
/mf-marketing/           # 营销仪表板
/mf-marketing/campaigns  # 营销活动管理
/mf-marketing/customers  # 客户管理
/mf-marketing/analytics  # 数据分析
```

**主应用集成时** (https://luozyiii.github.io/mf-shell/):
```
/mf-shell/marketing/              # 营销仪表板
/mf-shell/marketing/campaigns     # 营销活动管理
/mf-shell/marketing/customers     # 客户管理
/mf-shell/marketing/analytics     # 数据分析
```

### 主应用路由配置

```typescript
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'marketing/*',
        element: (
          <MicroFrontendErrorBoundary>
            <Suspense fallback={<Spin size="large" />}>
              <MarketingApp />
            </Suspense>
          </MicroFrontendErrorBoundary>
        )
      }
    ]
  }
], {
  basename: process.env.NODE_ENV === 'production' ? '/mf-shell' : '/'
});
```

## 🔧 开发环境设置

### 1. 启动顺序

```bash
# 1. 启动营销模块 (端口 3001)
cd mf-marketing
npm run dev

# 2. 启动主应用 (端口 3000)
cd mf-shell
npm run dev
```

### 2. 本地开发配置

确保主应用的开发配置指向本地营销模块：

```typescript
// 主应用的 module-federation.config.ts
remotes: {
  marketing: 'http://localhost:3001/remoteEntry.js'
}
```

## 📋 部署检查清单

### 营销模块部署
- [ ] 代码推送到 `main` 分支
- [ ] GitHub Actions 构建成功
- [ ] `https://luozyiii.github.io/mf-marketing/remoteEntry.js` 可访问
- [ ] 模块在生产环境正常加载

### 主应用集成
- [ ] 主应用配置了正确的 remote URL
- [ ] 共享依赖版本兼容
- [ ] 路由配置正确
- [ ] 错误边界已实现

## 🐛 常见问题

### 1. 模块加载失败

**问题**: `ChunkLoadError` 或模块无法加载
**解决方案**:
- 检查 `remoteEntry.js` URL 是否正确
- 确认 CORS 配置
- 检查网络连接

### 2. 样式冲突

**问题**: 样式相互影响
**解决方案**:
- 使用 CSS Modules 或 Styled Components
- 确保样式隔离
- 检查全局样式影响

### 3. 共享依赖版本冲突

**问题**: React/Antd 版本不匹配
**解决方案**:
- 统一主应用和微前端的依赖版本
- 配置正确的 `requiredVersion`
- 使用 `singleton: true`

## 📞 技术支持

如遇到集成问题：

1. 检查浏览器开发者工具的网络和控制台
2. 确认模块 URL 可正常访问
3. 验证 Module Federation 配置
4. 参考 [Module Federation 官方文档](https://module-federation.github.io/)

## 🔗 相关链接

- [主应用仓库](https://github.com/luozyiii/mf-shell)
- [营销模块仓库](https://github.com/luozyiii/mf-marketing)
- [Module Federation 文档](https://module-federation.github.io/)
- [Rsbuild Module Federation 插件](https://rsbuild.dev/plugins/list/plugin-module-federation)
