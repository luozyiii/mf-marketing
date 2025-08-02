import React, { useEffect, useState } from 'react';
import { AuthUtils } from '../utils/authUtils';
import { AppSkeleton } from './AppSkeleton';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 如果在iframe中运行，跳过认证检查（主应用已处理认证）
        if (window.parent !== window) {
          setIsAuthenticated(true);
          setIsChecking(false);
          return;
        }

        // 等待一小段时间，确保App组件中的token处理完成
        await new Promise(resolve => setTimeout(resolve, 100));

        // 检查是否有token
        const hasToken = AuthUtils.isAuthenticated();

        if (!hasToken) {
          // 没有token，跳转到登录页面
          AuthUtils.redirectToLogin();
          return;
        }

        // 认证通过
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        // 认证检查失败，跳转到登录页面
        AuthUtils.redirectToLogin();
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // sessionStorage不支持跨标签页同步，每个标签页独立管理登录状态

  if (isChecking) {
    // 显示加载状态
    return <AppSkeleton />;
  }

  if (!isAuthenticated) {
    // 这种情况理论上不会出现，因为未认证会直接跳转
    return <div>正在跳转到登录页面...</div>;
  }

  // 认证通过，渲染子组件
  return <>{children}</>;
};
