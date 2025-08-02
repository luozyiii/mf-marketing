// 主应用 (mf-shell) 集成配置示例
// 文件路径: mf-shell/module-federation.config.ts

import { ModuleFederationConfig } from '@module-federation/enhanced/webpack';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: {
    // 营销模块配置
    marketing: {
      entry: process.env.NODE_ENV === 'production' 
        ? 'https://luozyiii.github.io/mf-marketing/remoteEntry.js'
        : 'http://localhost:3001/remoteEntry.js',
      name: 'marketing',
      type: 'module'
    }
    // 可以添加其他微前端模块
    // dashboard: {
    //   entry: process.env.NODE_ENV === 'production' 
    //     ? 'https://luozyiii.github.io/mf-dashboard/remoteEntry.js'
    //     : 'http://localhost:3002/remoteEntry.js',
    //   name: 'dashboard',
    //   type: 'module'
    // }
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

// ===================================
// 主应用路由配置示例
// 文件路径: mf-shell/src/App.tsx
// ===================================

/*
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Layout } from './components/Layout';
import { MicroFrontendErrorBoundary } from './components/MicroFrontendErrorBoundary';

// 动态导入微前端模块
const MarketingApp = React.lazy(() => import('marketing/App'));

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router basename={process.env.NODE_ENV === 'production' ? '/mf-shell' : '/'}>
        <Layout>
          <Routes>
            <Route path="/" element={<div>主页</div>} />
            <Route 
              path="/marketing/*" 
              element={
                <MicroFrontendErrorBoundary>
                  <Suspense fallback={<Spin size="large" />}>
                    <MarketingApp />
                  </Suspense>
                </MicroFrontendErrorBoundary>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
*/

// ===================================
// 错误边界组件示例
// 文件路径: mf-shell/src/components/MicroFrontendErrorBoundary.tsx
// ===================================

/*
import React from 'react';
import { Result, Button } from 'antd';

interface State {
  hasError: boolean;
  error?: Error;
}

export class MicroFrontendErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  State
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('微前端模块加载错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="模块加载失败"
          subTitle="微前端模块暂时无法加载，请检查网络连接或稍后重试"
          extra={[
            <Button type="primary" onClick={() => window.location.reload()}>
              重新加载页面
            </Button>,
            <Button onClick={() => this.setState({ hasError: false })}>
              重试加载模块
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
}
*/
