# CAFA 食物艺术转换器 - 部署指南

## 项目结构

```
workspace/
├── index.html          # 前端页面
├── vercel.json         # Vercel 配置
└── supabase/
    ├── config.toml
    └── functions/
        └── transform/
            └── index.ts    # Supabase Edge Function
```

## 部署步骤

### 1. 前端部署到 Vercel

#### 方法一：通过 GitHub 部署（推荐）

1. 将代码推送到 GitHub 仓库
```bash
cd /root/.openclaw/workspace
git init
git add index.html vercel.json
git commit -m "Initial commit"
git remote add origin https://github.com/zhangames2/cafa-food-art-frontend.git
git push -u origin main
```

2. 登录 Vercel 网站 https://vercel.com
3. 点击 "Add New Project"
4. 导入 GitHub 仓库 `cafa-food-art-frontend`
5. 点击 Deploy

#### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd /root/.openclaw/workspace
vercel --prod
```

### 2. 后端部署到 Supabase

#### 步骤 1：创建 Supabase 项目

1. 访问 https://app.supabase.com
2. 登录账号 zhangames2
3. 点击 "New Project"
4. 项目名称：cafa-food-art-api
5. 选择地区（建议选择 Asia Pacific - Singapore）
6. 点击 "Create new project"

#### 步骤 2：部署 Edge Function

1. 安装 Supabase CLI
```bash
npm install -g supabase
```

2. 登录 Supabase
```bash
supabase login
```

3. 初始化项目并部署
```bash
cd /root/.openclaw/workspace
supabase init
supabase link --project-ref your-project-ref
supabase functions deploy transform
```

或者直接在 Supabase Dashboard 中：

1. 进入项目 → Edge Functions
2. 点击 "Deploy a new function"
3. 函数名：transform
4. 将 `supabase/functions/transform/index.ts` 内容粘贴进去
5. 点击 Deploy

#### 步骤 3：获取 API URL

部署完成后，Edge Function URL 格式为：
```
https://your-project-ref.supabase.co/functions/v1/transform
```

### 3. 更新前端 API 地址

1. 打开 `index.html`
2. 找到 `const API_URL = 'https://your-project-ref.supabase.co/functions/v1/transform'`
3. 替换为实际的 Supabase Edge Function URL
4. 重新部署前端

## 测试 API

```bash
# 健康检查
curl https://your-project-ref.supabase.co/functions/v1/health

# 图片转换
curl -X POST \
  -F "image=@test.png" \
  https://your-project-ref.supabase.co/functions/v1/transform
```

## 注意事项

1. Supabase Edge Function 免费额度：每月 500,000 次调用
2. Vercel 免费额度：每月 100 GB 带宽
3. 如需自定义域名，可在 Vercel 和 Supabase 中配置

## 访问链接

- 前端：https://cafa-food-art-frontend.vercel.app
- API：https://your-project-ref.supabase.co/functions/v1/transform