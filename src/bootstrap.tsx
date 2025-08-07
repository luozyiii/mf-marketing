import React from 'react';
import ReactDOM from 'react-dom/client';
import { marketingRoutes } from './routes';

// 向父窗口发送路由配置
const sendRoutesToParent = () => {
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage(
        {
          type: 'MICRO_FRONTEND_ROUTES',
          appKey: 'marketing',
          routes: marketingRoutes,
        },
        '*'
      );
      console.log('Marketing routes sent to parent:', marketingRoutes);
    } catch (error) {
      console.warn('Failed to send routes to parent:', error);
    }
  }
};

// 立即发送路由配置
sendRoutesToParent();

// 也暴露到本地window，以防直接访问
(window as any).marketingRoutes = marketingRoutes;

// 导入App组件
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
