import React, { useEffect, useState } from 'react';
import { AuthUtils } from '../utils/authUtils';
import { AppSkeleton } from './AppSkeleton';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // 检查是否跳过认证（开发环境配置）
      const skipAuth = process.env.REACT_APP_SKIP_AUTH === 'true';

      if (skipAuth) {
        console.log('跳过认证检查 (REACT_APP_SKIP_AUTH=true)');
        setIsChecking(false);
        return;
      }

      // 检查是否已登录
      if (!AuthUtils.isAuthenticated()) {
        // 未登录，跳转到登录页面
        AuthUtils.redirectToLogin();
        return;
      }

      setIsChecking(false);
    };

    // 延迟检查，避免闪烁
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    // 显示加载状态
    return <AppSkeleton />;
  }

  return <>{children}</>;
};
