#!/bin/bash


# 依赖安装
npm ci

# 检测版本是否可用并获取标签
tag=$(npx @qqi/check-version c=. 2>&1)
exit_code=$?
if [ $exit_code -ne 0 ]; then
  echo "版本检测失败：$tag"
  exit 1
fi

# 构建项目
if ! npm run build; then 
  echo "构建失败" 
  exit 1
fi

# 切换到构建目录
if [ ! -d "dist" ]; then 
  echo "未找到 dist 构建码"
  exit 1
fi

# 确保脚本在遇见错误时立即退出
set -e

cd "dist"
echo "开始发布 npm 包 ${tag} 版本"
if ! npm publish --provenance --access public --tag "${tag}"; then
    echo "发布失败" 
    exit 1
fi
echo "🚀🚀  发布成功，完结 🎉🎉 撒花 🎉🎉"

