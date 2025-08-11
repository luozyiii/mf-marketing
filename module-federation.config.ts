import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';
import { getBaseMFConfig } from './shared-config';

export default createModuleFederationConfig(
  getBaseMFConfig('marketing', {
    filename: 'remoteEntry.js',
    exposes: {
      './App': './src/App.tsx',
    },
  })
);
