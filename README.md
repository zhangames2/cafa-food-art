# Food Art Transformer API

🍕 图片转化为食物艺术智能体 API 服务

## 功能介绍

将上传的图片转化为充满正能量的食物艺术作品，包括：
- 分析图片颜色和风格
- 生成 SVG 格式的食物艺术图片
- 创作温暖励志的故事描述
- 提供积极正能量语录

## API 端点

### 健康检查
```
GET /health
```

### 图片转化
```
POST /api/transform
Content-Type: multipart/form-data

参数:
- image: 图片文件 (支持 JPG, PNG, GIF, WEBP, 最大 10MB)
```

### 响应格式
```json
{
  "success": true,
  "data": {
    "originalName": "原文件名.jpg",
    "artworkName": "作品名称",
    "description": "作品描述",
    "imageType": "landscape|portrait|animal|creative",
    "dominantColors": ["#FF5722", "#FF9800", "#FFC107"],
    "svgImage": "<svg>...</svg>",
    "story": "温暖的故事描述...",
    "quote": "正能量语录...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产模式
npm start
```

## 部署

支持部署到 Render、Railway、Vercel 等平台。

### Render 部署
1. 创建 Web Service
2. 选择 Node.js 环境
3. 设置启动命令: `npm start`
4. 设置环境变量: `PORT=10000`

### Railway 部署
1. 连接 GitHub 仓库
2. 自动检测 Node.js 项目
3. 部署完成

### Vercel 部署
需要添加 `vercel.json` 配置:
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

## 食物艺术类型

1. **田园风光** (landscape) - 蔬果田园风景
2. **美食肖像** (portrait) - 食物构成的人物肖像
3. **萌宠食艺** (animal) - 可爱的食物动物
4. **创意食艺** (creative) - 抽象食物艺术宇宙

## 技术栈

- Node.js
- Express
- Multer (文件上传)
- SVG (矢量图形)

## License

MIT
