import { ModuleFederationConfig } from '@module-federation/enhanced/webpack';

const config: ModuleFederationConfig = {
  name: 'marketing',
  exposes: {
    './App': './src/App.tsx',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: false,
      eager: false
    },
    'react-dom': {
      singleton: true,
      requiredVersion: false,
      eager: false
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: false,
      eager: false
    },
    antd: {
      singleton: true,
      requiredVersion: false,
      eager: false
    },
  },
};

export default config;
