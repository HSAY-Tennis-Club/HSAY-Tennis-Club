# HSAY Tennis Club

HSAY（Hit · Spin · Ace & You）俱乐部的网站原型，包含公开赛果、积分排名、球员档案、H2H 与登录后个人指标页。

本仓库是响应式 Web 端与产品交互基线。正式微信小程序不直接复用网页组件，而是复用后端 API、数据模型、权限策略、排名算法与设计 token。完整方案见 `ARCHITECTURE.md`。

## 本地开发

```bash
npm install
npm run dev
npm run build
```

## 当前版本

- `/`：游客可访问的公开俱乐部首页
- `/member`：服务端鉴权的会员数据舱
- 示例赛事和球员数据目前为演示数据
- 正式上线前需要接入真实会员库、比赛录入后台与大陆可用的统一身份系统
