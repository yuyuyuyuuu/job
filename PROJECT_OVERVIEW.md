# 就业找工作资讯门户网站 - 项目概览

## 项目简介

本项目是一个专业的就业找工作资讯门户网站，旨在为高校毕业生提供全面的求职服务。网站整合了就业咨询信息、求职者与从业者连接平台、社区互动功能、简历服务中心等核心功能。

## 技术栈

### 后端
- **Node.js** + **Express** - 服务器框架
- **TypeScript** - 类型安全的JavaScript
- **MongoDB** + **Mongoose** - 数据库
- **JWT** - 身份验证
- **Socket.io** - 实时通信
- **Cloudinary** - 图片存储
- **Nodemailer** - 邮件服务
- **Bcryptjs** - 密码加密

### 前端
- **React 18** + **TypeScript** - 用户界面
- **Redux Toolkit** - 状态管理
- **React Router** - 路由管理
- **React Query** - 数据获取和缓存
- **Tailwind CSS** - 样式框架
- **Headless UI** - 无头组件
- **React Hook Form** - 表单处理
- **Framer Motion** - 动画效果
- **Recharts** - 图表展示

### 开发工具
- **ESLint** + **Prettier** - 代码规范
- **Husky** - Git hooks
- **Concurrently** - 并行运行脚本

## 项目结构

```
job-portal/
├── client/                     # 前端代码
│   ├── public/                # 静态文件
│   ├── src/
│   │   ├── components/        # React组件
│   │   ├── pages/            # 页面组件
│   │   ├── store/            # Redux状态管理
│   │   │   └── slices/       # Redux切片
│   │   ├── services/         # API服务
│   │   ├── hooks/            # 自定义Hooks
│   │   ├── utils/            # 工具函数
│   │   ├── types/            # TypeScript类型定义
│   │   └── assets/           # 静态资源
│   ├── package.json
│   └── tailwind.config.js
├── server/                    # 后端代码
│   ├── src/
│   │   ├── models/           # 数据模型
│   │   ├── routes/           # API路由
│   │   ├── middleware/       # 中间件
│   │   ├── controllers/      # 控制器
│   │   ├── services/         # 业务逻辑
│   │   ├── utils/            # 工具函数
│   │   ├── config/           # 配置文件
│   │   └── socket/           # Socket.io处理
│   ├── package.json
│   └── tsconfig.json
├── package.json              # 根目录配置
└── README.md
```

## 核心功能

### 1. 用户系统
- 多类型用户注册（学生、从业者、HR）
- JWT身份验证
- 用户资料管理
- 会员体系（免费、高级、VIP）

### 2. 就业咨询信息
- 企业招聘动态
- 历年录用数据
- 多维度信息检索
- 个性化订阅推送

### 3. 求职者与从业者连接
- 从业者认证展示
- 多样化沟通方式
- 内推信息资源
- 行业交流区

### 4. 社区互动
- 论坛式社区
- 行业分区和主题板块
- 图文内容发布
- 互动功能（点赞、评论、分享）

### 5. 简历服务中心
- AI简历分析
- 简历模板库
- 专家咨询服务
- 简历版本管理

### 6. 实用功能
- 笔试面试资源库
- 求职工具集
- 校园招聘专属通道
- 实时聊天系统

## 页面结构

### 主要页面
1. **首页** - 热门信息聚合展示
2. **企业招聘库** - 企业信息检索和对比
3. **求职社区** - 论坛式交流平台
4. **简历工坊** - 简历制作和优化
5. **个人中心** - 用户资料和设置管理
6. **职场导师** - 从业者连接平台
7. **笔试面试资源库** - 考试资源和模拟
8. **校园招聘** - 校园专属信息

### 认证页面
- 登录页面
- 注册页面
- 密码重置

## 数据库设计

### 主要模型
1. **User** - 用户信息（学生、从业者、HR信息）
2. **Company** - 企业信息和历史数据
3. **Job** - 职位信息和招聘状态
4. **Post** - 社区帖子和评论
5. **Resume** - 简历信息和版本
6. **Message** - 聊天消息
7. **Application** - 求职申请
8. **Review** - 企业评价

## 安装和运行

### 前置要求
- Node.js 16+
- MongoDB 4.4+
- Git

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd job-portal
```

2. **安装依赖**
```bash
npm run install-all
```

3. **环境配置**
```bash
# 复制环境变量文件
cp server/.env.example server/.env

# 编辑环境变量
vim server/.env
```

4. **启动开发服务器**
```bash
npm run dev
```

访问 http://localhost:3000 查看前端
访问 http://localhost:5000 查看后端API

### 生产部署

1. **构建前端**
```bash
npm run build
```

2. **启动生产服务器**
```bash
npm start
```

## 环境变量配置

### 必需的环境变量
```env
# 数据库
MONGODB_URI=mongodb://localhost:27017/job-portal

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=30d

# 邮件服务
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-password

# 云存储
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 特色功能

### 1. 智能推荐系统
- 基于用户行为的职位推荐
- 个性化内容推送
- 智能匹配算法

### 2. 实时通信
- Socket.io实现即时聊天
- 消息推送系统
- 在线状态显示

### 3. 移动端适配
- 响应式设计
- 触摸友好的交互
- PWA支持

### 4. 性能优化
- 图片懒加载
- 虚拟滚动
- 代码分割
- 缓存策略

## 安全特性

- JWT token认证
- 密码bcrypt加密
- 输入验证和过滤
- SQL注入防护
- 跨站脚本攻击(XSS)防护
- 请求频率限制

## 未来扩展

1. **移动端应用** - React Native实现
2. **微信小程序** - 扩展移动端覆盖
3. **AI功能增强** - 更智能的推荐和分析
4. **视频面试** - 集成视频通话功能
5. **大数据分析** - 就业趋势分析
6. **企业SaaS** - 为企业提供招聘管理系统

## 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 许可证

MIT License

## 联系方式

- 项目地址: [GitHub Repository]
- 问题反馈: [Issues]
- 邮箱: contact@jobportal.com

---

*本项目旨在为高校毕业生提供一站式求职服务，助力每一位求职者找到理想工作。*