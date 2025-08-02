#!/bin/bash

# GitHub Pages 部署脚本
# 用于本地测试部署流程

set -e

echo "🚀 开始部署到 GitHub Pages..."

# 检查是否在正确的分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "⚠️  警告: 当前不在 main 分支 (当前: $CURRENT_BRANCH)"
  read -p "是否继续? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 1
  fi
fi

# 检查工作目录是否干净
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  工作目录有未提交的更改"
  git status --short
  read -p "是否继续? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 部署已取消"
    exit 1
  fi
fi

# 安装依赖
echo "📦 安装依赖..."
npm ci

# 构建项目
echo "🔨 构建项目..."
npm run build:gh-pages

# 检查构建结果
if [ ! -d "dist" ]; then
  echo "❌ 构建失败: dist 目录不存在"
  exit 1
fi

echo "✅ 构建完成!"
echo "📁 构建文件位于: ./dist"
echo ""
echo "🌐 要完成部署，请执行:"
echo "   git add ."
echo "   git commit -m 'feat: update deployment'"
echo "   git push origin main"
echo ""
echo "📋 部署后访问:"
echo "   独立访问: https://luozyiii.github.io/mf-marketing/"
echo "   主应用集成: https://luozyiii.github.io/mf-shell/marketing"
