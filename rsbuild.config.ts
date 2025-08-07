import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  server: {
    port: 3001,
  },
  html: {
    title: '微前端营销系统',
  },
  output: {
    // GitHub Pages 部署配置
    assetPrefix:
      process.env.NODE_ENV === 'production'
        ? '/mf-marketing/' // 使用相对路径，让浏览器自动处理协议和域名
        : '/',
  },
  source: {
    // 设置 basename 用于路由
    define: {
      'process.env.PUBLIC_URL': JSON.stringify(
        process.env.NODE_ENV === 'production' ? '/mf-marketing' : ''
      ),
      'process.env.REACT_APP_SKIP_AUTH': JSON.stringify(
        process.env.REACT_APP_SKIP_AUTH
      ),
    },
  },
});
