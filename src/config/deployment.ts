// 部署配置
export const deploymentConfig = {
  // 主应用 URL
  shellApp: {
    development: 'http://localhost:3000',
    production: 'https://luozyiii.github.io/mf-shell',
  },

  // 当前营销模块 URL
  marketingApp: {
    development: 'http://localhost:3001',
    production: 'https://luozyiii.github.io/mf-marketing',
  },

  // 路由 basename 配置
  basename: {
    development: '',
    production: '/mf-marketing',
  },

  // 获取当前环境的配置
  getCurrentConfig() {
    const env = process.env.NODE_ENV || 'development';
    return {
      shellUrl: this.shellApp[env as keyof typeof this.shellApp],
      marketingUrl: this.marketingApp[env as keyof typeof this.marketingApp],
      basename: this.basename[env as keyof typeof this.basename],
      isProduction: env === 'production',
    };
  },
};

// 导出当前环境配置
export const currentConfig = deploymentConfig.getCurrentConfig();
