import React from 'react';
import { Card, Descriptions, Tag, Button } from 'antd';
import { AuthUtils } from '../utils/authUtils';
import { currentConfig } from '../config/deployment';

export const Debug: React.FC = () => {
  const handleTestLogin = () => {
    // 模拟设置一个测试token
    AuthUtils.setToken('test-token-' + Date.now());
    window.location.reload();
  };

  const handleClearToken = () => {
    AuthUtils.removeToken();
    window.location.reload();
  };

  const handleRedirectToLogin = () => {
    AuthUtils.redirectToLogin();
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="调试信息" style={{ marginBottom: '16px' }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="当前环境">
            <Tag color={process.env.NODE_ENV === 'production' ? 'red' : 'green'}>
              {process.env.NODE_ENV || 'development'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="当前URL">
            {window.location.href}
          </Descriptions.Item>
          <Descriptions.Item label="是否在iframe中">
            <Tag color={window.parent !== window ? 'blue' : 'orange'}>
              {window.parent !== window ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="主应用URL">
            {currentConfig.shellUrl}
          </Descriptions.Item>
          <Descriptions.Item label="营销模块URL">
            {currentConfig.marketingUrl}
          </Descriptions.Item>
          <Descriptions.Item label="Basename">
            {currentConfig.basename || '(空)'}
          </Descriptions.Item>
          <Descriptions.Item label="是否生产环境">
            <Tag color={currentConfig.isProduction ? 'red' : 'green'}>
              {currentConfig.isProduction ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="当前Token">
            {AuthUtils.getToken() || '(无)'}
          </Descriptions.Item>
          <Descriptions.Item label="是否已认证">
            <Tag color={AuthUtils.isAuthenticated() ? 'green' : 'red'}>
              {AuthUtils.isAuthenticated() ? '是' : '否'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="调试操作">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button type="primary" onClick={handleTestLogin}>
            设置测试Token
          </Button>
          <Button onClick={handleClearToken}>
            清除Token
          </Button>
          <Button danger onClick={handleRedirectToLogin}>
            跳转到登录页面
          </Button>
          <Button onClick={() => window.location.reload()}>
            刷新页面
          </Button>
        </div>
      </Card>

      <Card title="URL参数" style={{ marginTop: '16px' }}>
        <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
          {JSON.stringify(Object.fromEntries(new URLSearchParams(window.location.search)), null, 2)}
        </pre>
      </Card>

      <Card title="配置详情" style={{ marginTop: '16px' }}>
        <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
          {JSON.stringify(currentConfig, null, 2)}
        </pre>
      </Card>
    </div>
  );
};
