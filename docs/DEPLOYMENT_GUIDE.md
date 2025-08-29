# GitHub Pages 部署指南

## 🚨 重要：解决权限问题

如果您遇到 `403 Forbidden` 错误，请按以下步骤操作：

### 步骤1：配置GitHub Actions权限

1. 进入您的GitHub仓库页面
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Actions** → **General**
4. 向下滚动到 **Workflow permissions** 部分
5. 选择 **Read and write permissions**
6. 勾选 **Allow GitHub Actions to create and approve pull requests**
7. 点击 **Save**

### 步骤2：配置GitHub Pages

1. 进入 **Settings** → **Pages**
2. 在 **Source** 部分选择 **GitHub Actions**

### 步骤3：推送代码

```bash
git add .
git commit -m "Fix deployment permissions"
git push origin main
```

## 📋 部署前准备

### 1. 更新 package.json 中的 homepage

确保 `package.json` 中的 `homepage` 字段正确：

```json
{
  "homepage": "https://xiguapopo67.github.io/melon-music-share"
}
```

### 2. 确保仓库设置正确

- 确保您的GitHub仓库是公开的（public）
- 仓库名称应该是 `melon-music-share`

## 🚀 自动部署

项目已配置了自动部署工作流，当您推送代码到 `main` 分支时，会自动构建并部署到GitHub Pages。

## 🔧 手动部署

如果自动部署失败，可以使用手动部署：

```bash
# 构建项目
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 🔍 常见问题

### 1. 权限错误 (403 Forbidden)

**解决方案**：
- 确保已配置GitHub Actions权限（见步骤1）
- 检查仓库是否为公开仓库
- 确保您有仓库的管理员权限

### 2. 页面显示空白

**解决方案**：
- 检查 `vite.config.ts` 中的 `base` 配置
- 确保 `package.json` 中的 `homepage` 字段正确
- 强制刷新浏览器（Ctrl+F5）

### 3. 部署后页面不更新

**解决方案**：
- 等待5-10分钟
- 清除浏览器缓存
- 强制刷新页面

## 📱 访问网站

部署完成后，您可以通过以下地址访问您的网站：

```
https://xiguapopo67.github.io/melon-music-share
```

---

**注意**：首次部署可能需要等待5-10分钟才能生效。
