# HSAY Tennis Club

HSAY（Hit · Spin · Ace & You）俱乐部的网站原型，包含赛事日历、赛事清单、完整赛事记分卡、公开赛果、年度积分与 Elo 排名、真实球员档案、H2H 与登录后个人指标页。

本仓库是响应式 Web 端与产品交互基线。正式微信小程序不直接复用网页组件，而是复用后端 API、数据模型、权限策略、排名算法与设计 token。完整方案见 `ARCHITECTURE.md`。

## 本地开发

```bash
npm install
npm run dev
npm run build
npm run build:static
```

`npm run dev` 和 `npm run build` 用于本地的 vinext/Worker 运行时；
`npm run build:static` 用于生成 GitHub Pages 使用的静态资源。GitHub Pages
由 `.github/workflows/pages.yml` 自动发布仓库中的 `index.html`、`about/`、`member/`
和 `assets/`，本项目不再使用 ChatGPT Sites 托管。

## 当前版本

- `/`：游客可访问的公开俱乐部首页
- `/about`：HSAY 品牌介绍与 THE HSAY CODE
- `/member`：服务端鉴权的会员数据舱
- 示例赛事和球员数据目前为演示数据
- 正式上线前需要接入真实会员库、比赛录入后台与大陆可用的统一身份系统
