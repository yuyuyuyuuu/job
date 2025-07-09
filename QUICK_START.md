# 快速启动指南 - 就业找工作资讯门户网站

## 🚀 一键启动

### 1. 前置准备
确保您的系统已安装：
- Node.js 16+ 
- MongoDB 4.4+
- Git

### 2. 克隆并安装
```bash
git clone <repository-url>
cd job-portal
npm run install-all
```

### 3. 环境配置
```bash
# 复制环境变量文件
cp server/.env.example server/.env

# 编辑环境变量（可选，使用默认值即可快速启动）
nano server/.env
```

### 4. 启动服务
```bash
npm run dev
```

✅ **完成！** 
- 前端：http://localhost:3000
- 后端：http://localhost:5000

## 📋 项目结构一览

```
job-portal/
├── client/          # React前端
├── server/          # Node.js后端
├── package.json     # 项目配置
└── README.md
```

## 🎯 核心页面

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/` | 热门信息聚合 |
| 企业库 | `/companies` | 企业信息检索 |
| 职位库 | `/jobs` | 职位搜索 |
| 求职社区 | `/community` | 论坛式交流 |
| 简历工坊 | `/resume` | 简历制作 |
| 职场导师 | `/mentors` | 从业者连接 |
| 个人中心 | `/profile` | 用户设置 |

## 🔧 开发命令

```bash
# 同时启动前后端
npm run dev

# 仅启动前端
npm run client

# 仅启动后端
npm run server

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 🎭 用户角色

### 学生用户
- 浏览职位信息
- 参与社区讨论
- 制作和管理简历
- 联系职场导师

### 从业者用户
- 分享职场经验
- 提供内推信息
- 指导求职者
- 参与行业交流

### HR用户
- 发布职位信息
- 管理招聘流程
- 查看求职者简历
- 企业宣传推广

## 🛠️ 技术栈

### 前端
- React 18 + TypeScript
- Redux Toolkit
- Tailwind CSS
- React Query

### 后端
- Node.js + Express
- MongoDB + Mongoose
- JWT认证
- Socket.io

## 📊 默认数据

项目启动后会自动创建：
- 示例企业数据
- 测试用户账户
- 样本职位信息
- 模拟社区内容

## 🔐 测试账户

```
学生账户：
Email: student@example.com
Password: 123456

从业者账户：
Email: professional@example.com
Password: 123456

HR账户：
Email: hr@example.com
Password: 123456
```

## 🌟 主要功能

### ✅ 已实现
- 用户注册登录
- 企业信息管理
- 职位发布搜索
- 社区论坛
- 简历系统
- 实时聊天

### 🚧 开发中
- AI简历分析
- 智能推荐
- 视频面试
- 移动端适配

## 🐛 常见问题

### Q: 无法连接数据库
A: 确保MongoDB服务正在运行
```bash
# 启动MongoDB
mongod

# 或使用Docker
docker run -d -p 27017:27017 mongo:latest
```

### Q: 端口冲突
A: 修改环境变量中的端口配置
```env
PORT=5001
CLIENT_PORT=3001
```

### Q: 依赖安装失败
A: 清除缓存重新安装
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📱 移动端访问

项目支持响应式设计，可在手机浏览器中访问：
- 地址：http://localhost:3000
- 建议使用Chrome或Safari浏览器

## 🔄 开发流程

1. **功能开发**
   - 在对应目录创建组件/页面
   - 编写业务逻辑
   - 添加样式

2. **API开发**
   - 在server/routes添加路由
   - 在server/models定义数据模型
   - 在server/controllers编写业务逻辑

3. **测试**
   - 前端：访问对应页面测试
   - 后端：使用Postman测试API
   - 集成：前后端联调

## 🚀 部署指南

### 开发环境
```bash
npm run dev
```

### 生产环境
```bash
npm run build
npm start
```

### Docker部署
```bash
docker build -t job-portal .
docker run -p 3000:3000 job-portal
```

## 📞 获取帮助

- 查看详细文档：[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- 问题反馈：创建GitHub Issue
- 技术交流：加入开发者群组

---

**祝您开发愉快！** 🎉

如果您觉得这个项目有用，请给我们一个⭐️