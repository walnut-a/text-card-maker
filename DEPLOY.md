# GitHub 部署步骤

## 1. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`text-card-maker`
3. 描述：`极简的单文件文字分享卡片生成工具`
4. 选择 **Public**（公开）
5. **不要**勾选 "Add a README file"（我们已经有了）
6. 点击 "Create repository"

## 2. 推送代码到 GitHub

在终端执行以下命令：

```bash
cd "/Users/zhaolixing/Documents/GitHub/简单前端项目/"
git remote add origin https://github.com/你的用户名/text-card-maker.git
git branch -M main
git push -u origin main
```

## 3. 启用 GitHub Pages

1. 进入仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 "Source" 下选择：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 **Save**
6. 等待几分钟，页面会显示访问地址：
   `https://你的用户名.github.io/text-card-maker/`

## 4. 访问你的卡片生成器

打开浏览器访问：
`https://你的用户名.github.io/text-card-maker/`

---

## 快速命令（复制粘贴）

```bash
# 1. 进入项目目录
cd "/Users/zhaolixing/Documents/GitHub/简单前端项目/"

# 2. 添加远程仓库（替换成你的用户名）
git remote add origin https://github.com/你的用户名/text-card-maker.git

# 3. 推送到 GitHub
git branch -M main
git push -u origin main
```

## 注意事项

- 确保替换 `你的用户名` 为你的 GitHub 用户名
- GitHub Pages 部署可能需要几分钟时间
- 部署成功后，每次推送更新都会自动部署
