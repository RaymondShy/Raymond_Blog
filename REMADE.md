# Raymond Blog Web TypeScript

一个基于 Vue 3 + TypeScript + Vite 构建的现代化前端项目，提供完整的博客系统和管理后台功能。

## 项目概述

本项目是一个功能完整的博客系统，包含前台展示和后台管理两个主要部分。系统采用现代化的技术栈，提供流畅的用户体验和强大的管理功能。

### 主要功能

- 📝 文章管理
    - 文章发布、编辑、删除
    - Markdown 编辑器支持
    - 文章分类和标签管理
    - 文章评论系统
    - 文章搜索功能
- 👥 用户系统
    - 用户注册和登录
    - 用户角色管理
    - 个人中心
    - 消息通知
- 💬 社交功能
    - 评论系统
    - 群聊功能
    - 用户互动
- 📊 数据统计
    - 访问统计
    - 用户行为分析
    - 数据可视化展示
- ⚙️ 系统管理
    - 系统配置
    - 日志管理
    - 权限控制
    - 菜单管理


## 技术栈

### 核心框架

- Vue 3 - 渐进式 JavaScript 框架
- TypeScript - JavaScript 的超集，提供类型系统
- Vite - 下一代前端构建工具


### 状态管理与路由

- Pinia - Vue 的状态管理库
- Vue Router - Vue.js 的官方路由管理器


### UI 组件与样式

- Arco Design Vue - 字节跳动出品的 Vue 3 组件库
- SASS - CSS 预处理器
- Font Awesome - 图标库


### 数据可视化与编辑器

- ECharts - 功能强大的图表库
- MD Editor V3 - Markdown 编辑器组件


### 工具库

- Axios - 基于 Promise 的 HTTP 客户端
- MockJS - 数据模拟工具
- Day.js - 轻量级日期处理库
- NProgress - 进度条组件


## 项目结构

```plain
src/
├── api/                # API 接口定义
│   ├── article_api.ts  # 文章相关接口
│   ├── user_api.ts     # 用户相关接口
│   ├── chat_api.ts     # 聊天相关接口
│   └── ...
├── assets/            # 静态资源
│   ├── theme.css      # 主题样式
│   └── base.css       # 基础样式
├── components/        # 公共组件
├── global/           # 全局配置
├── lib/              # 第三方库配置
├── router/           # 路由配置
├── service/          # 服务层
├── stores/           # Pinia 状态管理
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── views/            # 页面视图组件
│   ├── admin/        # 管理后台页面
│   ├── login/        # 登录相关页面
│   └── web/          # 前台展示页面
└── main.ts           # 应用入口文件
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm 或 yarn 或 pnpm
- 现代浏览器（Chrome >= 87, Firefox >= 78, Safari >= 14, Edge >= 88）


### 安装步骤

1. 克隆项目


```plain
git clone [项目地址]
cd gvb-web-ts
```

1. 安装依赖


```plain
npm install
# 或
yarn install
# 或
pnpm install
```

1. 配置环境变量


```plain
cp .env.example .env
# 编辑 .env 文件，配置必要的环境变量
```

1. 启动开发服务器


```plain
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 构建部署

1. 构建生产版本


```plain
npm run build
# 或
yarn build
# 或
pnpm build
```

1. 预览生产构建


```plain
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 开发指南

### 代码规范

- 使用 TypeScript 编写代码，确保类型安全
- 遵循 Vue 3 组合式 API 的最佳实践
- 使用 ESLint 和 Prettier 进行代码格式化
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case


### 目录规范

- 组件文件放在 `components` 目录下
- 页面文件放在 `views` 目录下
- API 接口定义放在 `api` 目录下
- 工具函数放在 `utils` 目录下
- 类型定义放在 `types` 目录下


### 状态管理

- 使用 Pinia 进行状态管理
- 按功能模块划分 store
- 遵循 actions、state、getters 的组织方式


### 路由管理

- 使用 Vue Router 进行路由管理
- 路由配置按模块划分
- 实现路由懒加载
- 配置路由守卫进行权限控制


## 部署说明

### 生产环境要求

- Node.js >= 18
- Nginx 或其他 Web 服务器
- 支持 HTTPS
- 配置适当的缓存策略


### 部署步骤

1. 构建项目


```plain
npm run build
```

1. 配置 Nginx


```plain
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理配置
    location /api {
        proxy_pass http://your-api-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

1. 启动服务


```plain
# 使用 PM2 启动服务
pm2 start npm --name "gvb-web" -- run start
```

## 浏览器兼容性

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88


## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request
