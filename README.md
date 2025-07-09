# AI政策分析系统

一个基于AI技术的政策文件智能分析与监控平台，提供政策数据的自动爬取、智能分析、搜索查询和监控追踪功能。

## 🚀 主要功能

### 核心功能
- **智能政策爬取**: 自动爬取多个政府网站的政策文件
- **定时任务调度**: 每4小时自动执行增量爬取，获取最新政策
- **数据去重机制**: 智能检测和过滤重复政策，避免数据冗余
- **政策智能分析**: 基于LLM的政策内容分析和摘要生成
- **高级搜索**: 支持关键词、时间范围、发布机构等多维度搜索
- **政策监控**: 实时监控政策变化和更新
- **数据可视化**: 政策统计图表和趋势分析

### 管理功能
- **爬虫管理界面**: 可视化管理和监控爬虫状态
- **手动爬取**: 支持指定日期和爬虫的手动执行
- **系统监控**: 实时查看爬虫状态、数据统计和系统健康度
- **定时任务控制**: 启动/停止定时爬取任务

## 🏗️ 系统架构

```
AI政策分析系统
├── 前端 (React + TypeScript)
│   ├── 政策搜索界面
│   ├── 政策详情展示
│   ├── 爬虫管理面板
│   └── 数据可视化图表
├── 后端 (Node.js + Express)
│   ├── RESTful API
│   ├── 数据库操作
│   ├── 爬虫调度服务
│   └── 定时任务管理
├── 爬虫系统 (Python + Scrapy)
│   ├── 多站点爬虫
│   ├── 增量数据爬取
│   ├── 数据清洗和去重
│   └── 自动化任务执行
└── 数据存储 (MongoDB)
    ├── 政策文档存储
    ├── 爬虫状态记录
    └── 系统日志管理
```

## 📋 环境要求

### 系统要求
- **操作系统**: macOS / Linux / Windows
- **Node.js**: 16.0+ 
- **Python**: 3.8+
- **MongoDB**: 4.4+

### 依赖工具
- npm 或 yarn
- pip
- git

## 🛠️ 快速开始

### 1. 克隆项目
```bash
git clone [repository-url]
cd AI-Policy
```

### 2. 一键启动开发环境
```bash
# 启动所有服务（自动安装依赖、启动MongoDB、后端、前端）
./start-dev.sh
```

### 3. 访问应用
- **前端应用**: http://localhost:3000
- **后端API**: http://localhost:5000
- **健康检查**: http://localhost:5000/health

### 4. 停止服务
```bash
# 正常停止所有服务
./stop-dev.sh

# 强制停止所有服务
./stop-dev.sh --force

# 停止服务并清理日志
./stop-dev.sh --clean-logs
```

## 📁 项目结构

```
AI-Policy/
├── policy_front/              # 前端React应用
│   ├── src/
│   │   ├── components/        # 通用组件
│   │   ├── pages/            # 页面组件
│   │   ├── services/         # API服务
│   │   └── utils/            # 工具函数
│   └── package.json
├── policy_backend/            # 后端Node.js应用
│   ├── src/
│   │   ├── controllers/      # 控制器
│   │   ├── services/         # 业务逻辑
│   │   ├── routes/           # 路由定义
│   │   └── models/           # 数据模型
│   └── package.json
├── policy_scrapy/             # Python爬虫系统
│   ├── scrapy_project/       # Scrapy爬虫项目
│   ├── daily_crawler.py      # 定时爬取脚本
│   ├── run_spiders.py        # 爬虫执行脚本
│   └── requirements.txt
├── start-dev.sh              # 一键启动脚本
├── stop-dev.sh               # 停止服务脚本
└── README.md
```

## 🔧 手动部署（可选）

如果需要手动启动各个服务：

### 1. 启动MongoDB
```bash
# macOS (使用Homebrew)
brew services start mongodb/brew/mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 2. 启动后端服务
```bash
cd policy_backend
npm install
npm run dev
```

### 3. 启动前端服务
```bash
cd policy_front
npm install
npm run dev
```

### 4. 配置爬虫环境
```bash
cd policy_scrapy
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## 🕒 定时爬取功能

系统自动配置了每4小时执行一次的定时爬取任务，主要特性：

### 自动化特性
- **定时执行**: 每4小时自动运行（可配置）
- **增量爬取**: 只爬取当天发布的新政策
- **智能去重**: 自动检测并过滤重复内容
- **失败重试**: 自动重试失败的爬取任务
- **状态监控**: 实时监控爬取状态和进度

### 管理接口
```bash
# 启动定时任务
curl -X POST http://localhost:5000/api/crawler/schedule/start

# 停止定时任务  
curl -X POST http://localhost:5000/api/crawler/schedule/stop

# 查看任务状态
curl http://localhost:5000/api/crawler/schedule/status
```

### 手动执行
在爬虫管理界面中，你可以：
- 执行单个爬虫（今日模式）
- 运行所有爬虫（今日模式）  
- 指定日期的增量爬取
- 查看爬虫统计和状态

## 🔍 API接口

### 政策相关
- `GET /api/policies` - 获取政策列表
- `GET /api/policies/:id` - 获取政策详情
- `POST /api/policies/search` - 搜索政策

### 爬虫管理
- `GET /api/crawler/spiders` - 获取爬虫列表
- `POST /api/crawler/run/:spiderName` - 运行指定爬虫
- `POST /api/crawler/run-all` - 运行所有爬虫
- `POST /api/crawler/daily-crawl` - 执行每日爬取
- `GET /api/crawler/stats` - 获取爬虫统计

### 定时任务
- `POST /api/crawler/schedule/start` - 启动定时任务
- `POST /api/crawler/schedule/stop` - 停止定时任务
- `GET /api/crawler/schedule/status` - 获取任务状态

## 🔧 配置说明

### 环境变量配置
在 `policy_backend/.env` 文件中配置：

```env
# 数据库配置
MONGODB_URI=mongodb://localhost:27017/ai_policy

# 服务端口
PORT=5000

# 爬虫配置
CRAWLER_PATH=/path/to/policy_scrapy
PYTHON_CMD=python3

# 定时任务配置（可选）
CRON_SCHEDULE=0 */4 * * *  # 每4小时执行

# 日志配置
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

### 爬虫配置
在 `policy_scrapy/scrapy_project/settings.py` 中配置：

```python
# 并发设置
CONCURRENT_REQUESTS = 1
DOWNLOAD_DELAY = 2

# 去重配置
DUPEFILTER_CLASS = 'scrapy.dupefilters.RFPDupeFilter'

# 数据库配置
MONGODB_URI = 'mongodb://localhost:27017'
MONGODB_DATABASE = 'ai_policy'
```

## 📊 数据去重机制

系统实现了多层次的数据去重机制：

### 1. URL去重
- 基于URL的哈希值检测重复链接
- 避免重复爬取同一政策页面

### 2. 内容去重  
- 基于政策标题和内容的相似度检测
- 使用文本哈希算法识别重复内容

### 3. 数据库去重
- 在数据入库前进行最终去重检查
- 基于唯一索引和业务逻辑的重复检测

## 🐛 故障排除

### 常见问题

1. **MongoDB连接失败**
   ```bash
   # 检查MongoDB状态
   brew services list | grep mongodb
   
   # 重启MongoDB
   brew services restart mongodb/brew/mongodb-community
   ```

2. **端口被占用**
   ```bash
   # 检查端口占用
   lsof -i :3000  # 前端
   lsof -i :5000  # 后端
   
   # 强制停止
   ./stop-dev.sh --force
   ```

3. **Python环境问题**
   ```bash
   # 重新创建虚拟环境
   cd policy_scrapy
   rm -rf .venv
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

4. **爬虫权限问题**
   ```bash
   # 检查爬虫脚本权限
   chmod +x policy_scrapy/*.py
   ```

### 日志查看

```bash
# 后端日志
tail -f policy_backend/logs/app.log

# 爬虫日志  
tail -f policy_scrapy/logs/crawler.log

# 系统日志
./start-dev.sh  # 查看启动日志
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目Issues: [GitHub Issues](./issues)
- 邮箱: [your-email@example.com]

---

**AI政策分析系统** - 让政策分析更智能，让数据获取更高效！ # job
