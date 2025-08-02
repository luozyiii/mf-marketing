# GitHub Pages 部署指南

本文档介绍如何将微前端营销模块部署到 GitHub Pages。

## 🚀 自动部署设置

### 1. GitHub 仓库设置

1. **推送代码到 GitHub**：
   ```bash
   git add .
   git commit -m "feat: add GitHub Pages deployment"
   git push origin main
   ```

2. **启用 GitHub Pages**：
   - 进入 GitHub 仓库页面
   - 点击 `Settings` 选项卡
   - 在左侧菜单中找到 `Pages`
   - 在 `Source` 部分选择 `GitHub Actions`

3. **配置仓库权限**：
   - 在 `Settings` > `Actions` > `General` 中
   - 确保 `Workflow permissions` 设置为 `Read and write permissions`
   - 勾选 `Allow GitHub Actions to create and approve pull requests`

### 2. 自动部署流程

GitHub Actions workflow (`.github/workflows/deploy.yml`) 会在以下情况下自动触发：

- 推送代码到 `main` 分支
- 手动触发 workflow

**部署流程**：
1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖
4. 构建项目
5. 部署到 GitHub Pages

### 3. 访问部署的应用

部署完成后，应用将可通过以下 URL 访问：
```
https://<your-username>.github.io/mf-marketing/
```

## 🛠️ 手动部署

如果需要手动部署，可以执行以下步骤：

### 1. 本地构建

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build:gh-pages
```

### 2. 验证构建

```bash
# 预览构建结果
npm run preview
```

## ⚙️ 配置说明

### Rsbuild 配置

在 `rsbuild.config.ts` 中配置了 GitHub Pages 相关设置：

```typescript
output: {
  // GitHub Pages 部署配置
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? '/mf-marketing/' // 仓库名
    : '/',
},
```

### 重要配置项

1. **assetPrefix**: 设置资源路径前缀，确保在 GitHub Pages 子路径下正确加载资源
2. **publicPath**: 自动根据环境设置公共路径
3. **html.title**: 设置页面标题

## 🔧 自定义配置

### 修改仓库名

如果你的仓库名不是 `mf-marketing`，需要修改以下文件：

1. **rsbuild.config.ts**：
   ```typescript
   assetPrefix: process.env.NODE_ENV === 'production' 
     ? '/your-repo-name/' // 替换为你的仓库名
     : '/',
   ```

2. **DEPLOYMENT.md** (本文件)：
   更新访问 URL 中的仓库名

### 自定义域名

如果要使用自定义域名：

1. 在仓库根目录创建 `public/CNAME` 文件：
   ```
   your-domain.com
   ```

2. 在 GitHub 仓库设置中配置自定义域名

## 📋 部署检查清单

部署前请确认：

- [ ] 代码已推送到 `main` 分支
- [ ] GitHub Pages 已启用并设置为 GitHub Actions
- [ ] 仓库权限已正确配置
- [ ] `rsbuild.config.ts` 中的 `assetPrefix` 路径正确
- [ ] 所有依赖都在 `package.json` 中正确声明

## 🐛 常见问题

### 1. 资源加载失败

**问题**: 页面加载后样式或 JS 文件 404
**解决**: 检查 `assetPrefix` 配置是否与仓库名匹配

### 2. 路由问题

**问题**: 刷新页面后出现 404
**解决**: GitHub Pages 不支持 SPA 路由，考虑使用 Hash 路由或配置 404.html

### 3. 构建失败

**问题**: GitHub Actions 构建失败
**解决**: 
- 检查 Node.js 版本兼容性
- 确认所有依赖都已正确安装
- 查看 Actions 日志获取详细错误信息

## 📞 支持

如果遇到部署问题：

1. 查看 GitHub Actions 运行日志
2. 检查浏览器开发者工具的控制台错误
3. 参考 [GitHub Pages 官方文档](https://docs.github.com/en/pages)
4. 参考 [Rsbuild 部署文档](https://rsbuild.dev/guide/basic/deploy)

## 🔗 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Rsbuild 部署指南](https://rsbuild.dev/guide/basic/deploy)
- [Module Federation 部署](https://module-federation.github.io/)
