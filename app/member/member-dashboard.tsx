"use client";

import { useEffect, useState } from "react";
import { sitePath } from "../site-path";

const metrics = [
  { label: "正手", self: 8.8, peer: 8.2, delta: "+0.4" },
  { label: "反手", self: 8.4, peer: 7.9, delta: "+0.2" },
  { label: "网前", self: 7.1, peer: 7.6, delta: "+0.3" },
  { label: "截击", self: 7.9, peer: 7.3, delta: "+0.1" },
  { label: "切削", self: 7.6, peer: 8.1, delta: "+0.3" },
  { label: "发球", self: 8.6, peer: 8.4, delta: "+0.5" },
];

const radarMetrics = [
  { label: "实力", value: 95 }, { label: "压制", value: 28 }, { label: "韧性", value: 17 },
  { label: "调整力", value: 33 }, { label: "稳定", value: 87 }, { label: "样本", value: 50 },
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
  { result: "W", opponent: "Max", type: "双打", score: "15–12", date: "07.02" },
  { result: "W", opponent: "CY", type: "双打", score: "15–10", date: "06.26" },
  { result: "L", opponent: "川林贯空", type: "单打", score: "9–15", date: "06.20" },
  { result: "W", opponent: "Andrew", type: "双打", score: "15–13", date: "06.14" },
  { result: "W", opponent: "Peter", type: "双打", score: "15–11", date: "06.08" },
  { result: "L", opponent: "宇凡", type: "单打", score: "10–15", date: "06.01" },
  { result: "W", opponent: "小沙", type: "双打", score: "15–7", date: "05.26" },
  { result: "W", opponent: "虎", type: "双打", score: "15–9", date: "05.18" },
  { result: "L", opponent: "Loker", type: "单打", score: "12–15", date: "05.10" },
  { result: "W", opponent: "猪猪", type: "双打", score: "15–8", date: "05.03" },
  { result: "W", opponent: "Ivan", type: "双打", score: "15–12", date: "04.26" },
] as const;

const bestieCandidates = ["宇凡", "Loker", "CY", "Andrew", "刀刀", "小沙", "猪猪", "Max"];
const relationshipMasters = [{ name: "宇凡", losses: 6 }, { name: "Loker", losses: 4 }, { name: "刀刀", losses: 3 }];
const relationshipServants = [{ name: "CY", wins: 7 }, { name: "猪猪", wins: 5 }, { name: "Andrew", wins: 3 }];

function radarPolygon(values: number[]) {
  return `polygon(${values.map((rawValue, index) => {
    const value = Math.max(0, Math.min(100, rawValue));
    const angle = (-90 + index * 60) * (Math.PI / 180);
    const radius = value * 0.44;
    return `${(50 + Math.cos(angle) * radius).toFixed(2)}% ${(50 + Math.sin(angle) * radius).toFixed(2)}%`;
  }).join(", ")})`;
}

function MiniIcon({ kind }: { kind: "home" | "calendar" | "rank" | "players" | "profile" }) {
  const paths = { home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z", calendar: "M5 4v3M19 4v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1zM8 12h2M14 12h2M8 16h2", rank: "M4 19h4V9H4v10zM10 19h4V4h-4v15zM16 19h4v-7h-4v7z", players: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM6 8c4 1 8 1 12 0M6 16c4-1 8-1 12 0", profile: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 21a7 7 0 0 1 14 0" } as const;
  return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

export function MemberDashboard({ displayName, initialSurface = "web" }: { displayName: string; initialSurface?: "web" | "mini" }) {
  const name = displayName.split("@")[0];
  const [surface, setSurface] = useState<"web" | "mini">(initialSurface);
  const [metricMode, setMetricMode] = useState<"self" | "peer">("self");
  const [formWindow, setFormWindow] = useState<10 | 20>(10);
  const [besties, setBesties] = useState<string[]>(["宇凡", "CY"]);
  const [wishSent, setWishSent] = useState(false);
  const [ntrp, setNtrp] = useState("3.5");

  const visibleMetrics = metrics.map((metric) => ({ ...metric, score: metricMode === "self" ? metric.self : metric.peer }));
  const visibleMatches = recentMatches.slice(0, formWindow);
  const formWins = visibleMatches.filter((match) => match.result === "W").length;

  useEffect(() => {
    const querySurface = new URLSearchParams(window.location.search).get("surface");
    if (querySurface === "mini" || (!querySurface && window.matchMedia("(max-width: 720px), (orientation: portrait) and (max-width: 1024px)").matches)) setSurface("mini");
  }, []);

  return (
    <main className={surface === "mini" ? "mini-surface member-shell member-mini-surface" : "member-shell"}>
      <header className="member-header">
        <a className="brand" href={sitePath()}><span className="brand-mark">HSAY<i /></span><span className="brand-sub">MEMBER CLUBHOUSE</span></a>
        <div className="member-header-actions">
          <div className="surface-toggle" role="group" aria-label="切换 Web 或小程序模式">
            <button className={surface === "web" ? "active" : ""} onClick={() => setSurface("web")} aria-pressed={surface === "web"}>Web</button>
            <button className={surface === "mini" ? "active" : ""} onClick={() => setSurface("mini")} aria-pressed={surface === "mini"}>小程序</button>
          </div>
          <span className="member-name">你好，{name}</span><a className="logout-link" href={sitePath()}>退出预览</a>
        </div>
      </header>
      <div className="member-hero">
        <div><span className="section-kicker">PRIVATE PERFORMANCE LAB</span><h1>我的数据舱</h1><p>所有指标仅你本人和获授权的俱乐部管理员可见。</p></div>
        <a className="back-link" href={sitePath()}>← 返回公开首页</a>
      </div>
      <section className="member-grid">
        <article className="member-profile panel">
          <div className="member-avatar">P</div><span className="rank-chip">年度积分 #04</span><h2>PETER</h2><p>57 场已登记比赛 · 8 冠</p>
          <div className="member-stats"><div><strong>17–10</strong><span>单打战绩</span></div><div><strong>24–6</strong><span>双打战绩</span></div><div><strong>72%</strong><span>总胜率</span></div></div>
        </article>
        <article className="performance-panel panel">
          <div className="panel-title"><div><span className="section-kicker">TECHNICAL DIMENSIONS</span><h2>六维技术表现</h2></div><span className="private-chip">🔒 仅自己可见</span></div>
          <div className="metric-mode-toggle" role="group" aria-label="选择自评或他评"><button className={metricMode === "self" ? "active" : ""} onClick={() => setMetricMode("self")}>自评</button><button className={metricMode === "peer" ? "active" : ""} onClick={() => setMetricMode("peer")}>他评</button></div>
          <div className="metric-bars">
            {visibleMetrics.map((metric) => <div className="metric-bar" key={metric.label}><span>{metric.label}</span><div><i style={{width: `${metric.score * 10}%`}} /></div><strong>{metric.score.toFixed(1)}</strong><small>/10</small><em className={metric.delta.startsWith("-") ? "negative" : ""}>{metric.delta}</em></div>)}
          </div>
        </article>
        <article className="panel member-radar-panel">
          <div className="panel-title"><div><span className="section-kicker">MATCH PROFILE · BETA</span><h2>六维比赛画像</h2></div><span className="private-chip">🔒 仅自己可见</span></div>
          <div className="member-radar-wrap">
            <div className="radar-wrap">
              {radarMetrics.map((metric, index) => <div className={`radar-label member-radar-label member-radar-label-${index + 1}`} key={metric.label}>{metric.label} <b>{metric.value}</b></div>)}
              <div className="radar-grid" aria-label="按照六项数值绘制的比赛画像雷达图"><i className="radar-ring ring-100" /><i className="radar-ring ring-75" /><i className="radar-ring ring-50" /><i className="radar-ring ring-25" /><i className="radar-axis axis-1" /><i className="radar-axis axis-2" /><i className="radar-axis axis-3" /><span className="radar-value" style={{ clipPath: radarPolygon(radarMetrics.map((metric) => metric.value)) }} /></div>
            </div>
          </div>
          <p className="radar-note">数值基于已登记比赛样本，六个维度的定义与权重仍可继续讨论。</p>
        </article>
        <article className="panel form-panel">
          <div className="form-heading"><div><span className="section-kicker">RECENT FORM</span><h2>近期状态</h2></div><strong>{formWins} 胜 · {formWindow - formWins} 负</strong></div>
          <div className="form-window-toggle" role="group" aria-label="选择近期比赛范围"><button className={formWindow === 10 ? "active" : ""} onClick={() => setFormWindow(10)}>最近 10 场</button><button className={formWindow === 20 ? "active" : ""} onClick={() => setFormWindow(20)}>最近 20 场</button></div>
          <div className="form-sequence" aria-label={`最近${formWindow}场比赛结果`}>
            {visibleMatches.map((match, index) => <span className={match.result === "W" ? "form-win" : "form-loss"} key={`${match.date}-${match.opponent}`}>{match.result}<small>{index + 1}</small></span>)}
          </div>
          <div className="recent-match-list">
            {visibleMatches.slice(0, 5).map((match) => <div key={`${match.date}-${match.opponent}`}><b className={match.result === "W" ? "result-win" : "result-loss"}>{match.result}</b><span><strong>vs {match.opponent}</strong><small>{match.date} · {match.type}</small></span><em>{match.score}</em></div>)}
          </div>
          <div className="form-legend"><span><i className="legend-win-dot" />W · 胜</span><span><i className="legend-loss-dot" />L · 负</span><small>按比赛日期由近到远</small></div>
        </article>
        <article className="panel coach-note"><span className="section-kicker">CLOSE FRIEND NOTE · 08.21</span><h2>下一场，别急着闪耀。</h2><p>二发被攻后的第一拍容易过早变线。下一次训练先用 70% 力量打深中路，把回合拉到第四拍再启动正手。你已经够快了，现在要学会让对手先着急。</p><div><span>密友备注</span><b>二发 + 1</b><b>反手深度</b><b>关键分耐心</b></div></article>
        <article className="panel bestie-panel">
          <div className="panel-title"><div><span className="section-kicker">MY ENEMY·BESTIE</span><h2>我的敌密</h2></div><span className="private-chip">最多 5 位</span></div>
          <p className="bestie-intro">选出最想约球、最想赢、也最懂你戏剧张力的密友。许愿成功后，解锁一枚专属胜利徽章，并在下一场赛果卡留下彩蛋。</p>
          <div className="bestie-picker">{bestieCandidates.map((candidate) => <button key={candidate} className={besties.includes(candidate) ? "selected" : ""} onClick={() => setBesties((current) => current.includes(candidate) ? current.filter((item) => item !== candidate) : current.length < 5 ? [...current, candidate] : current)} aria-pressed={besties.includes(candidate)}>{candidate}{besties.includes(candidate) ? " ✓" : ""}</button>)}</div>
          <div className="bestie-footer"><span>{besties.length}/5 已选</span><button className={`wish-button ${wishSent ? "wished" : ""}`} onClick={() => setWishSent(true)} disabled={!besties.length}>{wishSent ? "愿望已点亮 ✦" : "许愿胜利"}</button></div>
          {wishSent && <div className="wish-reward">胜利后获得：<b>敌密胜利徽章</b>、一条赛果彩蛋，以及下一场训练建议优先解锁。</div>}
        </article>
        <article className="panel ntrp-panel">
          <div className="panel-title"><div><span className="section-kicker">PLAYER SELF-ASSESSMENT</span><h2>NTRP 自评</h2></div><span className="private-chip">仅自己可见</span></div>
          <p>用一个当前最接近你的级别记录状态，不用于俱乐部排名。</p>
          <div className="ntrp-options" role="group" aria-label="选择 NTRP 级别">{["<3.0", "3.0", "3.5", "4.0", "4.5", ">4.5"].map((level) => <button key={level} className={ntrp === level ? "active" : ""} onClick={() => setNtrp(level)}>{level}</button>)}</div>
          <small>当前自评：<b>NTRP {ntrp}</b> · 仅用于个人画像</small>
        </article>
        <article className="panel relationship-panel">
          <div className="panel-title"><div><span className="section-kicker">POWER DYNAMIC</span><h2>我的主人和仆人</h2></div><span className="private-chip">私密关系</span></div>
          <p>输得越多，主人圆圈越大；赢得越多，仆人圆圈越大。只是俱乐部内部的戏剧化记录。</p>
          <div className="relationship-columns"><div><b className="relationship-label">主人 · 输给 TA</b><div className="relationship-bubbles">{relationshipMasters.map((item) => <div className="relationship-bubble master-bubble" style={{ width: `${52 + item.losses * 8}px`, height: `${52 + item.losses * 8}px` }} key={item.name}><strong>{item.name}</strong><small>{item.losses} 负</small></div>)}</div></div><div><b className="relationship-label">仆人 · 赢过 TA</b><div className="relationship-bubbles">{relationshipServants.map((item) => <div className="relationship-bubble servant-bubble" style={{ width: `${52 + item.wins * 8}px`, height: `${52 + item.wins * 8}px` }} key={item.name}><strong>{item.name}</strong><small>{item.wins} 胜</small></div>)}</div></div></div>
        </article>
        <article className="panel privacy-panel"><div className="privacy-icon">⌾</div><div><span className="section-kicker">PRIVACY</span><h2>谁能看到这些？</h2><p>详细技术数据：仅本人及获授权成员；密友备注：仅本人和被授权查看的密友；公开主页只显示赛季积分、排名、参赛记录与公开胜率。</p></div></article>
      </section>
      <nav className={`mobile-bottom-nav member-mobile-nav ${surface === "mini" ? "mini-nav-active" : ""}`} aria-label="我的数据导航">
        <a href={surface === "mini" ? sitePath("?surface=mini#top") : `${sitePath()}#top`}><MiniIcon kind="home" /><span>首页</span></a><a href={surface === "mini" ? sitePath("?surface=mini#events") : `${sitePath()}#events`}><MiniIcon kind="calendar" /><span>赛事</span></a><a href={surface === "mini" ? sitePath("?surface=mini#ranking") : `${sitePath()}#ranking`}><MiniIcon kind="rank" /><span>排名</span></a><a href={surface === "mini" ? sitePath("?surface=mini#players") : `${sitePath()}#players`}><MiniIcon kind="players" /><span>球员</span></a><a href={surface === "mini" ? sitePath("member?surface=mini") : sitePath("member")}><MiniIcon kind="profile" /><span>我的</span></a>
      </nav>
    </main>
  );
}
