# Food Art Transformer API - 部署指南

🍕 图片转化为食物艺术智能体 API 服务

## 快速开始

### 1. 本地测试

```bash
# 克隆项目
git clone <your-repo-url>
cd food-art-transformer

# 安装依赖
npm install

# 启动服务
npm start

# 访问 http://localhost:3000
```

### 2. 部署到 Render (推荐)

#### 方法一：使用 Blueprint
1. Fork 本项目到您的 GitHub 账号
2. 登录 [Render Dashboard](https://dashboard.render.com/)
3. 点击 "New" → "Blueprint"
4. 选择您的 GitHub 仓库
5. Render 会自动识别 `render.yaml` 并部署

#### 方法二：手动创建
1. 登录 [Render Dashboard](https://dashboard.render.com/)
2. 点击 "New" → "Web Service"
3. 连接您的 GitHub 仓库
4. 配置：
   - **Name**: food-art-transformer
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. 点击 "Create Web Service"

### 3. 部署到 Railway

1. Fork 本项目到您的 GitHub 账号
2. 登录 [Railway Dashboard](https://railway.app/)
3. 点击 "New Project" → "Deploy from GitHub repo"
4. 选择您的仓库
5. Railway 会自动检测并部署

### 4. 部署到 Vercel

1. Fork 本项目到您的 GitHub 账号
2. 登录 [Vercel Dashboard](https://vercel.com/)
3. 点击 "Add New..." → "Project"
4. 导入您的 GitHub 仓库
5. 框架预设选择 "Other"
6. 部署

## API 使用

### 健康检查
```bash
curl https://your-app-url.com/health
```

### 图片转化
```bash
curl -X POST \
  -F "image=@your-image.jpg" \
  https://your-app-url.com/api/transform
```

### 响应示例
```json
{
  "success": true,
  "data": {
    "originalName": "your-image.jpg",
    "artworkName": "田园风光",
    "description": "用新鲜蔬果构建的宁静田园",
    "imageType": "landscape",
    "dominantColors": ["#FF5722", "#FF9800", "#FFC107"],
    "svgImage": "<svg>...</svg>",
    "story": "温暖的故事描述...",
    "quote": "正能量语录...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 在线演示

访问根路径 `/` 可以使用在线演示页面，直接上传图片查看效果。

## 食物艺术类型

1. **田园风光** (landscape) - 蔬果田园风景
2. **美食肖像** (portrait) - 食物构成的人物肖像
3. **萌宠食艺** (animal) - 可爱的食物动物
4. **创意食艺** (creative) - 抽象食物艺术宇宙

## 技术栈

- Node.js 18+
- Express.js
- Multer (文件上传)
- SVG (矢量图形生成)

## License

MIT
