"use client";

import { useEffect, useState } from "react";

const metrics = [
  { label: "实力", score: 88, delta: "+4" },
  { label: "稳定", score: 84, delta: "+2" },
  { label: "压制", score: 71, delta: "+3" },
  { label: "韧性", score: 79, delta: "+1" },
  { label: "调整", score: 76, delta: "+3" },
  { label: "关键分", score: 86, delta: "+5" },
];

const recentMatches = [
  { result: "W", opponent: "夏和雪", type: "双打", score: "15–8", date: "08.21" },
  { result: "W", opponent: "Ivan", type: "双打", score: "15–11", date: "08.18" },
  { result: "L", opponent: "宇凡", type: "单打", score: "11–15", date: "08.12" },
  { result: "W", opponent: "CY", type: "双打", score: "15–9", date: "08.06" },
  { result: "L", opponent: "Loker", type: "单打", score: "8–15", date: "07.28" },
  { result: "W", opponent: "猪猪", type: "双打", score: "15–6", date: "07.21" },
  { result: "W", opponent: "川林贯空", type: "双打", score: "15–13", date: "07.14" },
  { result: "L", opponent: "刀刀", type: "单打", score: "12–15", date: "07.08" },
] as const;

function radarPolygon(values: number[]) {
  return `polygon(${values.map((rawValue, index) => {
    const value = Math.max(0, Math.min(100, rawValue));
    const angle = (-90 + index * 60) * (Math.PI / 180);
    const radius = value * 0.44;
    return `${(50 + Math.cos(angle) * radius).toFixed(2)}% ${(50 + Math.sin(angle) * radius).toFixed(2)}%`;
  }).join(", ")})`;
}

export function MemberDashboard({ displayName }: { displayName: string }) {
  const name = displayName.split("@")[0];
  const [surface, setSurface] = useState<"web" | "mini">("web");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("surface") === "mini") setSurface("mini");
  }, []);

  return (
    <main className={surface === "mini" ? "mini-surface member-shell member-mini-surface" : "member-shell"}>
      <header className="member-header">
        <a className="brand" href="/"><span className="brand-mark">HSAY<i /></span><span className="brand-sub">MEMBER CLUBHOUSE</span></a>
        <div className="member-header-actions">
          <div className="surface-toggle" role="group" aria-label="切换 Web 或小程序模式">
            <button className={surface === "web" ? "active" : ""} onClick={() => setSurface("web")} aria-pressed={surface === "web"}>Web</button>
            <button className={surface === "mini" ? "active" : ""} onClick={() => setSurface("mini")} aria-pressed={surface === "mini"}>小程序</button>
          </div>
          <span className="member-name">你好，{name}</span><a className="logout-link" href="/">退出预览</a>
        </div>
      </header>
      {surface === "mini" && <div className="surface-notice" role="status" aria-live="polite"><b>小程序模式</b><span>375px 固定画布 · 上下滑动查看我的数据</span></div>}
      <div className="member-hero">
        <div><span className="section-kicker">PRIVATE PERFORMANCE LAB</span><h1>我的数据舱</h1><p>所有指标仅你本人和获授权的俱乐部管理员可见。</p></div>
        <a className="back-link" href="/">← 返回公开首页</a>
      </div>
      <section className="member-grid">
        <article className="member-profile panel">
          <div className="member-avatar">P</div><span className="rank-chip">年度积分 #04</span><h2>PETER</h2><p>57 场已登记比赛 · 8 冠</p>
          <div className="member-stats"><div><strong>17–10</strong><span>单打战绩</span></div><div><strong>24–6</strong><span>双打战绩</span></div><div><strong>72%</strong><span>总胜率</span></div></div>
        </article>
        <article className="performance-panel panel">
          <div className="panel-title"><div><span className="section-kicker">LAST 8 MATCHES</span><h2>六维技术表现</h2></div><span className="private-chip">🔒 仅自己可见</span></div>
          <div className="metric-bars">
            {metrics.map((metric) => <div className="metric-bar" key={metric.label}><span>{metric.label}</span><div><i style={{width: `${metric.score}%`}} /></div><strong>{metric.score}</strong><em className={metric.delta.startsWith("-") ? "negative" : ""}>{metric.delta}</em></div>)}
          </div>
        </article>
        <article className="panel member-radar-panel">
          <div className="panel-title"><div><span className="section-kicker">MATCH PROFILE</span><h2>六维比赛画像</h2></div><span className="private-chip">🔒 仅自己可见</span></div>
          <div className="member-radar-wrap">
            <div className="radar-wrap">
              {metrics.map((metric, index) => <div className={`radar-label member-radar-label member-radar-label-${index + 1}`} key={metric.label}>{metric.label} <b>{metric.score}</b></div>)}
              <div className="radar-grid" aria-label="按照六项数值绘制的比赛画像雷达图"><i className="radar-ring ring-100" /><i className="radar-ring ring-75" /><i className="radar-ring ring-50" /><i className="radar-ring ring-25" /><i className="radar-axis axis-1" /><i className="radar-axis axis-2" /><i className="radar-axis axis-3" /><span className="radar-value" style={{ clipPath: radarPolygon(metrics.map((metric) => metric.score)) }} /></div>
            </div>
          </div>
          <p className="radar-note">数值基于已登记比赛样本，六个维度的定义与权重仍可继续讨论。</p>
        </article>
        <article className="panel form-panel">
          <div className="form-heading"><div><span className="section-kicker">RECENT FORM</span><h2>近期状态</h2></div><strong>5 胜 · 3 负</strong></div>
          <div className="form-sequence" aria-label="最近八场比赛结果">
            {recentMatches.map((match, index) => <span className={match.result === "W" ? "form-win" : "form-loss"} key={`${match.date}-${match.opponent}`}>{match.result}<small>{index + 1}</small></span>)}
          </div>
          <div className="recent-match-list">
            {recentMatches.slice(0, 4).map((match) => <div key={`${match.date}-${match.opponent}`}><b className={match.result === "W" ? "result-win" : "result-loss"}>{match.result}</b><span><strong>vs {match.opponent}</strong><small>{match.date} · {match.type}</small></span><em>{match.score}</em></div>)}
          </div>
          <div className="form-legend"><span><i className="legend-win-dot" />W · 胜</span><span><i className="legend-loss-dot" />L · 负</span><small>按比赛日期由近到远</small></div>
        </article>
        <article className="panel coach-note"><span className="section-kicker">CLOSE FRIEND NOTE · 08.21</span><h2>下一场，别急着闪耀。</h2><p>二发被攻后的第一拍容易过早变线。下一次训练先用 70% 力量打深中路，把回合拉到第四拍再启动正手。你已经够快了，现在要学会让对手先着急。</p><div><span>密友备注</span><b>二发 + 1</b><b>反手深度</b><b>关键分耐心</b></div></article>
        <article className="panel privacy-panel"><div className="privacy-icon">⌾</div><div><span className="section-kicker">PRIVACY</span><h2>谁能看到这些？</h2><p>详细技术数据：仅本人及获授权成员；密友备注：仅本人和被授权查看的密友；公开主页只显示赛季积分、排名、参赛记录与公开胜率。</p></div></article>
      </section>
      <nav className={`mobile-bottom-nav member-mobile-nav ${surface === "mini" ? "mini-nav-active" : ""}`} aria-label="我的数据导航">
        <a href={surface === "mini" ? "/?surface=mini#top" : "/#top"}>⌂<span>首页</span></a><a href={surface === "mini" ? "/?surface=mini#events" : "/#events"}>▦<span>赛事</span></a><a href={surface === "mini" ? "/?surface=mini#ranking" : "/#ranking"}>↗<span>排名</span></a><a href={surface === "mini" ? "/?surface=mini#players" : "/#players"}>●<span>球员</span></a><a href={surface === "mini" ? "/member?surface=mini" : "/member"}>◎<span>我的</span></a>
      </nav>
    </main>
  );
}
