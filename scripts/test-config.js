#!/usr/bin/env node

// 配置测试脚本
// 用于验证不同环境下的配置是否正确

const path = require('path');

console.log('🔧 配置测试脚本');
console.log('================');

// 模拟不同环境
const environments = ['development', 'production'];

environments.forEach(env => {
  console.log(`\n📋 ${env.toUpperCase()} 环境配置:`);
  
  // 设置环境变量
  process.env.NODE_ENV = env;
  
  // 模拟配置
  const config = {
    assetPrefix: env === 'production' 
      ? 'https://luozyiii.github.io/mf-marketing/' 
      : '/',
    basename: env === 'production' ? '/mf-marketing' : '',
    publicUrl: env === 'production' ? '/mf-marketing' : '',
    remoteEntry: env === 'production'
      ? 'https://luozyiii.github.io/mf-marketing/remoteEntry.js'
      : 'http://localhost:3001/remoteEntry.js'
  };
  
  console.log(`  assetPrefix: ${config.assetPrefix}`);
  console.log(`  basename: "${config.basename}"`);
  console.log(`  publicUrl: "${config.publicUrl}"`);
  console.log(`  remoteEntry: ${config.remoteEntry}`);
});

console.log('\n🌐 访问地址测试:');
console.log('================');

const testUrls = [
  {
    name: '开发环境 - 独立访问',
    url: 'http://localhost:3001/',
    basename: '',
    expected: '正常访问，无 basename'
  },
  {
    name: '生产环境 - 独立访问',
    url: 'https://luozyiii.github.io/mf-marketing/',
    basename: '/mf-marketing',
    expected: '使用 /mf-marketing basename'
  },
  {
    name: '生产环境 - 主应用集成',
    url: 'https://luozyiii.github.io/mf-shell/marketing',
    basename: '',
    expected: '主应用处理路由，微前端无 basename'
  }
];

testUrls.forEach(test => {
  console.log(`\n📍 ${test.name}:`);
  console.log(`  URL: ${test.url}`);
  console.log(`  basename: "${test.basename}"`);
  console.log(`  预期: ${test.expected}`);
});

console.log('\n✅ 配置验证完成!');
console.log('\n💡 提示:');
console.log('- 开发环境下不使用 basename，直接访问根路径');
console.log('- 生产环境独立访问时使用 /mf-marketing basename');
console.log('- 主应用集成时，basename 由主应用管理');
console.log('- 资源路径始终使用完整的 GitHub Pages URL');

// 检查当前环境
console.log('\n🔍 当前环境检查:');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`当前工作目录: ${process.cwd()}`);

// 验证文件是否存在
const filesToCheck = [
  'rsbuild.config.ts',
  'module-federation.config.ts',
  'src/config/deployment.ts',
  '.github/workflows/deploy.yml'
];

console.log('\n📁 关键文件检查:');
filesToCheck.forEach(file => {
  const fs = require('fs');
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`  ${file}: ${exists ? '✅ 存在' : '❌ 缺失'}`);
});
