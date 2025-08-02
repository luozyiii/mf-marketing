import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { marketingRoutes } from './routes';
import { Layout } from './components/Layout';
import { AuthGuard } from './components/AuthGuard';
import { AuthUtils } from './utils/authUtils';
import { Dashboard } from './pages/Dashboard';
import { Campaigns } from './pages/Campaigns';
import { Customers } from './pages/Customers';
import { Analytics } from './pages/Analytics';
import { NotFound } from './pages/NotFound';
import { Debug } from './pages/Debug';
import { AppSkeleton } from './components/AppSkeleton';
import './App.css';

// 内部路由组件，用于处理路由监听
const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 暴露路由配置API
    (window as any).getRoutes = () => marketingRoutes;

    // 处理 404 重定向
    const redirectPath = sessionStorage.getItem('spa_redirect_path');
    if (redirectPath) {
      console.log('Found redirect path:', redirectPath);
      sessionStorage.removeItem('spa_redirect_path');
      // 使用 navigate 进行路由跳转
      navigate(redirectPath, { replace: true });
    }

    // 模拟应用初始化加载
    const initializeApp = async () => {
      // 模拟数据加载、权限检查等
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    initializeApp();

    // 监听来自主应用的路由变化消息
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ROUTE_CHANGE') {
        const targetPath = event.data.path;
        navigate(targetPath);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  // 在加载期间显示骨架屏
  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/debug" element={<Debug />} />
      <Route path="/" element={<Dashboard />} />
      {/* 404 页面 - 必须放在最后 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  // 检测是否在微前端环境中（iframe中运行）
  const isInMicroFrontend = window.parent !== window;

  // 检查URL中的token参数并存储
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // 存储token到localStorage
      AuthUtils.setToken(token);

      // 清除URL中的token参数，避免token暴露在URL中
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('token');
      window.history.replaceState({}, '', newUrl.toString());

      console.log('Token received and stored from URL');
    }
  }, []);

  // 获取 basename 配置
  // 在生产环境下使用 /mf-marketing，开发环境下不使用 basename
  const getBasename = () => {
    if (process.env.NODE_ENV === 'production') {
      // 在 GitHub Pages 上独立运行时使用 /mf-marketing
      // 在主应用中集成时，主应用会处理 /mf-shell/marketing 路径
      return window.location.pathname.startsWith('/mf-marketing') ? '/mf-marketing' : '';
    }
    return '';
  };

  const basename = getBasename();

  // 调试信息
  console.log('App Debug Info:', {
    NODE_ENV: process.env.NODE_ENV,
    pathname: window.location.pathname,
    href: window.location.href,
    basename: basename,
    isInMicroFrontend: isInMicroFrontend
  });

  return (
    <ConfigProvider locale={zhCN}>
      <Router basename={basename}>
        {isInMicroFrontend ? (
          // 微前端环境：只显示内容，不显示导航（主应用已处理认证）
          <AppRoutes />
        ) : (
          // 独立运行：需要认证守卫 + 完整布局
          <AuthGuard>
            <Layout>
              <AppRoutes />
            </Layout>
          </AuthGuard>
        )}
      </Router>
    </ConfigProvider>
  );
};

export default App;
