"use client";

import { useMemo, useState } from "react";

type Player = {
  id: string;
  name: string;
  rank: number;
  previousRank: number;
  bestRank: number;
  points: number;
  stops: number;
  totalStops: number;
  matches?: number;
  titles?: number;
  color: string;
  initial: string;
};

type Fixture = {
  left: string;
  right: string;
  score: string;
  type: "单打" | "双打";
  winner: "left" | "right";
};

const players: Player[] = [
  { id: "chuanlin", name: "川林贯空", rank: 1, previousRank: 1, bestRank: 1, points: 20213, stops: 21, totalStops: 21, color: "violet", initial: "川" },
  { id: "yufan", name: "宇凡", rank: 2, previousRank: 2, bestRank: 2, points: 17840, stops: 21, totalStops: 42, matches: 58, titles: 7, color: "lime", initial: "宇" },
  { id: "connor", name: "Connor", rank: 3, previousRank: 3, bestRank: 3, points: 17280, stops: 21, totalStops: 24, color: "orange", initial: "C" },
  { id: "peter", name: "Peter", rank: 4, previousRank: 4, bestRank: 4, points: 14860, stops: 21, totalStops: 42, matches: 57, titles: 8, color: "cyan", initial: "P" },
  { id: "desert", name: "沙漠", rank: 5, previousRank: 5, bestRank: 1, points: 13215, stops: 21, totalStops: 37, matches: 107, titles: 6, color: "pink", initial: "沙" },
  { id: "loker", name: "Loker", rank: 6, previousRank: 6, bestRank: 1, points: 12736, stops: 21, totalStops: 40, matches: 123, titles: 14, color: "blue", initial: "L" },
  { id: "louie", name: "Louie", rank: 7, previousRank: 7, bestRank: 7, points: 12670, stops: 20, totalStops: 27, color: "violet", initial: "L" },
  { id: "cy", name: "CY", rank: 8, previousRank: 8, bestRank: 5, points: 11896, stops: 21, totalStops: 31, color: "lime", initial: "C" },
  { id: "carlos", name: "Carlos", rank: 9, previousRank: 9, bestRank: 9, points: 11153, stops: 20, totalStops: 24, color: "orange", initial: "C" },
  { id: "johan", name: "Johan", rank: 10, previousRank: 10, bestRank: 3, points: 10992, stops: 20, totalStops: 24, color: "cyan", initial: "J" },
  { id: "tiger", name: "虎", rank: 11, previousRank: 11, bestRank: 10, points: 10084, stops: 20, totalStops: 28, color: "pink", initial: "虎" },
  { id: "adam", name: "Adam", rank: 12, previousRank: 12, bestRank: 8, points: 9540, stops: 21, totalStops: 32, color: "blue", initial: "A" },
  { id: "andrew", name: "Andrew", rank: 13, previousRank: 15, bestRank: 2, points: 9498, stops: 21, totalStops: 49, color: "violet", initial: "A" },
  { id: "daodao", name: "刀刀", rank: 14, previousRank: 13, bestRank: 1, points: 9232, stops: 21, totalStops: 40, matches: 140, titles: 7, color: "lime", initial: "刀" },
  { id: "zhuzhu", name: "猪猪", rank: 15, previousRank: 14, bestRank: 2, points: 8671, stops: 13, totalStops: 13, matches: 55, titles: 7, color: "orange", initial: "猪" },
  { id: "xiaosha", name: "小沙", rank: 16, previousRank: 16, bestRank: 16, points: 8537, stops: 21, totalStops: 48, matches: 69, titles: 7, color: "cyan", initial: "小" },
  { id: "ethan", name: "Ethan", rank: 17, previousRank: 17, bestRank: 17, points: 8362, stops: 20, totalStops: 44, color: "pink", initial: "E" },
  { id: "yaoyi", name: "耀一", rank: 18, previousRank: 18, bestRank: 6, points: 8271, stops: 21, totalStops: 39, color: "blue", initial: "耀" },
  { id: "max", name: "Max", rank: 19, previousRank: 19, bestRank: 8, points: 7799, stops: 20, totalStops: 25, color: "violet", initial: "M" },
  { id: "heijialu", name: "黑加鲁", rank: 20, previousRank: 20, bestRank: 19, points: 7675, stops: 20, totalStops: 30, color: "lime", initial: "黑" },
  { id: "doctorfu", name: "傅医生", rank: 23, previousRank: 23, bestRank: 15, points: 6591, stops: 21, totalStops: 29, matches: 151, titles: 7, color: "orange", initial: "傅" },
  { id: "sven", name: "Sven", rank: 24, previousRank: 23, bestRank: 15, points: 6591, stops: 21, totalStops: 29, color: "cyan", initial: "S" },
  { id: "stefan", name: "Stefan", rank: 24, previousRank: 22, bestRank: 20, points: 6540, stops: 21, totalStops: 24, color: "pink", initial: "S" },
  { id: "brian", name: "Brian", rank: 26, previousRank: 26, bestRank: 23, points: 5516, stops: 21, totalStops: 24, color: "blue", initial: "B" },
];

const doublesRanking = [
  { name: "宇凡", initial: "宇", score: 1648, samples: 21, movement: "—" },
  { name: "虎", initial: "虎", score: 1574, samples: 16, movement: "+1" },
  { name: "Andrew", initial: "A", score: 1571, samples: 22, movement: "-1" },
  { name: "Carlos", initial: "C", score: 1568, samples: 10, movement: "—" },
  { name: "小沙", initial: "小", score: 1563, samples: 21, movement: "—" },
  { name: "Peter", initial: "P", score: 1555, samples: 17, movement: "—" },
];

const recentResults = [
  { round: "决赛", winner: "D-I-Y", loser: "永瘦宫", score: "6–3", time: "2025.08.12", court: "冠军女性杯·团体", tone: "hot" },
  { round: "单打", winner: "Loker", loser: "Danwen", score: "15–0", time: "2025.08.12", court: "决赛第 1 场", tone: "cool" },
  { round: "双打", winner: "Max / 宇凡", loser: "川林贯空 / 铭", score: "15–3", time: "2025.08.12", court: "决赛第 8 场", tone: "lime" },
];

const eventStages: Record<string, { title: string; left: string; right: string; teamScore: string; fixtures: Fixture[] }> = {
  final: {
    title: "决赛",
    left: "永瘦宫",
    right: "D-I-Y",
    teamScore: "3–6",
    fixtures: [
      { left: "Loker", right: "Danwen", score: "15–0", type: "单打", winner: "left" },
      { left: "川林贯空", right: "Robert", score: "15–11", type: "单打", winner: "left" },
      { left: "Brian", right: "Johan", score: "7–15", type: "单打", winner: "right" },
      { left: "贡菜", right: "宇凡", score: "7–15", type: "单打", winner: "right" },
      { left: "铭", right: "Max", score: "10–15", type: "单打", winner: "right" },
      { left: "莎娃", right: "陈子坎", score: "14–15", type: "单打", winner: "right" },
      { left: "贡菜 / Brian", right: "Johan / Robert", score: "8–15", type: "双打", winner: "right" },
      { left: "川林贯空 / 铭", right: "Max / 宇凡", score: "3–15", type: "双打", winner: "right" },
      { left: "Loker / 莎娃", right: "陈子坎 / Danwen", score: "15–6", type: "双打", winner: "left" },
    ],
  },
  semifinalA: {
    title: "半决赛 A",
    left: "永瘦宫",
    right: "再次挑大梁",
    teamScore: "6–3",
    fixtures: [
      { left: "莎娃", right: "Jay", score: "15–11", type: "单打", winner: "left" },
      { left: "Brian", right: "Andrew", score: "12–15", type: "单打", winner: "right" },
      { left: "贡菜", right: "刀刀", score: "9–15", type: "单打", winner: "right" },
      { left: "铭", right: "DD", score: "15–10", type: "单打", winner: "left" },
      { left: "Loker", right: "Shawn", score: "15–2", type: "单打", winner: "left" },
      { left: "川林贯空", right: "Ivan", score: "15–6", type: "单打", winner: "left" },
      { left: "铭 / Brian", right: "DD / Shawn", score: "14–15", type: "双打", winner: "right" },
      { left: "川林贯空 / 贡菜", right: "Andrew / Ivan", score: "15–10", type: "双打", winner: "left" },
      { left: "Loker / 莎娃", right: "刀刀 / Jay", score: "15–9", type: "双打", winner: "left" },
    ],
  },
  semifinalB: {
    title: "半决赛 B",
    left: "D-I-Y",
    right: "白雪公主拍饼天团",
    teamScore: "8–1",
    fixtures: [
      { left: "陈子坎", right: "十六", score: "2–15", type: "单打", winner: "right" },
      { left: "Danwen", right: "小宇", score: "15–10", type: "单打", winner: "left" },
      { left: "宇凡", right: "Stefan", score: "15–13", type: "单打", winner: "left" },
      { left: "Robert", right: "傅医生", score: "15–11", type: "单打", winner: "left" },
      { left: "Johan", right: "黑崎", score: "15–9", type: "单打", winner: "left" },
      { left: "Max", right: "CY", score: "15–6", type: "单打", winner: "left" },
      { left: "陈子坎 / Danwen", right: "小宇 / 黑崎", score: "15–11", type: "双打", winner: "left" },
      { left: "Max / 宇凡", right: "CY / Stefan", score: "15–14", type: "双打", winner: "left" },
      { left: "Johan / Robert", right: "傅医生 / 十六", score: "15–5", type: "双打", winner: "left" },
    ],
  },
  third: {
    title: "三四名决赛",
    left: "再次挑大梁",
    right: "白雪公主拍饼天团",
    teamScore: "5–4",
    fixtures: [
      { left: "Andrew", right: "十六", score: "7–15", type: "单打", winner: "right" },
      { left: "刀刀", right: "Stefan", score: "15–10", type: "单打", winner: "left" },
      { left: "Shawn", right: "小宇", score: "15–14", type: "单打", winner: "left" },
      { left: "Ivan", right: "傅医生", score: "15–13", type: "单打", winner: "left" },
      { left: "DD", right: "CY", score: "2–15", type: "单打", winner: "right" },
      { left: "Jay", right: "黑崎", score: "15–6", type: "单打", winner: "left" },
      { left: "Andrew / Jay", right: "CY / 十六", score: "5–15", type: "双打", winner: "right" },
      { left: "刀刀 / Ivan", right: "傅医生 / Stefan", score: "10–15", type: "双打", winner: "right" },
      { left: "DD / Shawn", right: "小宇 / 黑崎", score: "15–8", type: "双打", winner: "left" },
    ],
  },
};

const eventList = [
  { month: "AUG", day: "12", year: "2025", title: "HSAY冠军女性杯团体赛", meta: "OT网球俱乐部 · 宝山", format: "4 队 · 36 场", status: "已结束", tone: "lime" },
  { month: "JUL", day: "21", year: "2026", title: "2026 双打赛季站", meta: "俱乐部登记赛 · 双打", format: "赛果已入库", status: "已结束", tone: "violet" },
  { month: "AUG", day: "—", year: "2026", title: "2026 赛季下一站", meta: "日期与场地待赛事组确认", format: "报名未开启", status: "待公布", tone: "coral" },
];

function Avatar({ player, size = "medium" }: { player: Player; size?: "small" | "medium" | "large" }) {
  return <span className={`avatar avatar-${size} avatar-${player.color}`} aria-hidden="true">{player.initial}</span>;
}

export function HSAYClub({ isSignedIn, displayName }: { isSignedIn: boolean; displayName?: string }) {
  const [rankingMode, setRankingMode] = useState<"annual" | "singles" | "doubles">("annual");
  const [eventStage, setEventStage] = useState("final");
  const [leftId, setLeftId] = useState("yufan");
  const [rightId, setRightId] = useState("sven");
  const [playerQuery, setPlayerQuery] = useState("");
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const left = players.find((player) => player.id === leftId) ?? players[1];
  const right = players.find((player) => player.id === rightId) ?? players[21];
  const isReferenceH2H = [left.id, right.id].includes("yufan") && [left.id, right.id].includes("sven");
  const leftWins = isReferenceH2H ? (left.id === "yufan" ? 6 : 0) : 0;
  const rightWins = isReferenceH2H ? (right.id === "sven" ? 0 : 6) : 0;
  const selectedStage = eventStages[eventStage];

  const roster = useMemo(() => {
    const query = playerQuery.trim().toLowerCase();
    const filtered = query ? players.filter((player) => player.name.toLowerCase().includes(query)) : players;
    return showAllPlayers || query ? filtered : filtered.slice(0, 8);
  }, [playerQuery, showAllPlayers]);

  const swapPlayers = () => {
    setLeftId(rightId);
    setRightId(leftId);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HSAY 首页">
          <span className="brand-mark">HSAY<i /></span>
          <span className="brand-sub">沪上阿姨网球俱乐部</span>
        </a>
        <nav className={mobileMenu ? "nav-open" : ""} aria-label="主导航">
          <a href="#events" onClick={() => setMobileMenu(false)}>赛事</a>
          <a href="#ranking" onClick={() => setMobileMenu(false)}>排名</a>
          <a href="#players" onClick={() => setMobileMenu(false)}>球员</a>
          <a href="#h2h" onClick={() => setMobileMenu(false)}>H2H</a>
        </nav>
        <div className="header-actions">
          <a className="login-button" href={isSignedIn ? "/member" : "/signin-with-chatgpt?return_to=%2Fmember"}>
            <span className="status-dot" />
            {isSignedIn ? `${displayName?.split("@")[0] ?? "会员"} · 会员中心` : "会员登录"}
          </a>
          <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="展开导航" aria-expanded={mobileMenu}>☰</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>SHANGHAI</span><b>·</b><span>150 PLAYERS</span><b>·</b><span>EST. 2024</span></div>
          <h1><span>场下是姐妹，</span><span className="outline-text">场上撕得飞。</span></h1>
          <p>扎根上海的实力派网球社群。查赛程、看赛果、追排名，<br className="desktop-only" />也认真接住每一次“纯属我演”。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#events">查看赛事安排 <span>↗</span></a>
            <a className="text-button" href="#ranking">2026 赛季排名 <span>↓</span></a>
          </div>
        </div>

        <div className="hero-card-wrap" aria-label="冠军女性杯决赛结果">
          <div className="rainbow-orbit orbit-one" />
          <div className="rainbow-orbit orbit-two" />
          <article className="hero-score-card">
            <div className="score-card-top"><span className="live-pill"><i /> TEAM FINAL</span><span>2025.08.12</span></div>
            <div className="trophy-ball">✦</div>
            <div className="finalist finalist-left">
              <span className="avatar avatar-large avatar-blue">永</span>
              <strong>永瘦宫</strong><span>2</span>
            </div>
            <div className="finalist finalist-right">
              <span className="avatar avatar-large avatar-lime">D</span>
              <strong>D-I-Y</strong><span>1</span>
            </div>
            <div className="final-score"><small>FINAL</small><b>3</b><b>—</b><b className="tie-score">6</b></div>
            <div className="card-slogan">冠军女性杯，<em>D-I-Y 登顶。</em></div>
          </article>
        </div>
        <div className="hero-scroll">SCROLL TO SERVE <span>⌄</span></div>
      </section>

      <section className="ticker" aria-label="俱乐部数据">
        <div><b>150</b><span>球员档案</span></div><i />
        <div><b>328+</b><span>已登记比赛</span></div><i />
        <div><b>21</b><span>2026 已计分站</span></div><i />
        <div><b>∞</b><span>情绪价值</span></div>
      </section>

      <section className="section events-section" id="events">
        <div className="section-head">
          <div><span className="section-kicker">EVENT CALENDAR</span><h2>赛事日历</h2><p>过去的荣耀、正在进行的对阵，以及下一站安排。</p></div>
          <span className="season-chip">2026 赛季</span>
        </div>
        <div className="event-list">
          {eventList.map((event) => (
            <article className="event-card" key={`${event.year}-${event.title}`}>
              <div className={`event-date event-date-${event.tone}`}><span>{event.month}</span><b>{event.day}</b><small>{event.year}</small></div>
              <div className="event-main"><span>{event.status}</span><h3>{event.title}</h3><p>{event.meta}</p></div>
              <div className="event-format"><span>赛事安排</span><b>{event.format}</b></div>
              <a href={event.title.includes("冠军女性杯") ? "#event-detail" : "#events"} aria-label={`查看${event.title}`}>→</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section event-detail-section" id="event-detail">
        <div className="event-detail-intro">
          <span className="section-kicker">FULL EVENT SCORECARD</span>
          <h2>冠军女性杯<br />完整赛果</h2>
          <p>2025.08.12 · OT网球俱乐部<br />宝山大白气模馆 · 团体赛</p>
          <div className="stage-tabs" role="group" aria-label="选择赛事阶段">
            {Object.entries(eventStages).map(([key, stage]) => <button key={key} className={eventStage === key ? "active" : ""} onClick={() => setEventStage(key)}>{stage.title}</button>)}
          </div>
        </div>
        <article className="scorecard">
          <div className="scorecard-head">
            <span>{selectedStage.title}</span>
            <div><strong>{selectedStage.left}</strong><b>{selectedStage.teamScore}</b><strong>{selectedStage.right}</strong></div>
            <small>{selectedStage.fixtures.length} 场对阵 · 先到 15 分</small>
          </div>
          <div className="fixture-head"><span>左方</span><span>比分</span><span>右方</span></div>
          <div className="fixture-list">
            {selectedStage.fixtures.map((fixture, index) => (
              <div className="fixture-row" key={`${eventStage}-${index}`}>
                <div className={fixture.winner === "left" ? "fixture-winner" : ""}><span>{fixture.type}</span><strong>{fixture.left}</strong></div>
                <b>{fixture.score}</b>
                <div className={fixture.winner === "right" ? "fixture-winner" : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{fixture.right}</strong></div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section results-section" id="scores">
        <div className="section-head">
          <div><span className="section-kicker">LATEST REGISTERED RESULTS</span><h2>最近赛果</h2></div>
          <a href="#event-detail">查看完整记分卡 <span>→</span></a>
        </div>
        <div className="match-list">
          {recentResults.map((match, index) => (
            <article className="match-row" key={`${match.winner}-${match.loser}`}>
              <div className={`round-badge round-${match.tone}`}>{match.round}</div>
              <div className="match-number">0{index + 1}</div>
              <div className="match-player winner"><strong>{match.winner}</strong><span>WINNER</span></div>
              <div className="match-score"><b>{match.score}</b></div>
              <div className="match-player loser"><strong>{match.loser}</strong><span>FINAL</span></div>
              <div className="match-meta"><b>{match.time}</b><span>{match.court}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section ranking-section" id="ranking">
        <div className="section-head inverse-head">
          <div><span className="section-kicker">2026 SEASON RANKING</span><h2>积分与排名</h2><p>年度荣誉、单打实力与双打实力分开呈现。</p></div>
          <div className="ranking-controls">
            <div className="level-filter" role="group" aria-label="选择排名类型">
              <button className={rankingMode === "annual" ? "active" : ""} onClick={() => setRankingMode("annual")}>年度积分</button>
              <button className={rankingMode === "singles" ? "active" : ""} onClick={() => setRankingMode("singles")}>单打实力</button>
              <button className={rankingMode === "doubles" ? "active" : ""} onClick={() => setRankingMode("doubles")}>双打实力</button>
            </div>
            <span className="year-select">2026⌄</span>
          </div>
        </div>

        {rankingMode === "annual" && (
          <div className="ranking-table-wrap">
            <div className="ranking-note"><b>年度积分榜</b><span>截至 2026.08.23 · 依据已登记赛事累计</span></div>
            <div className="ranking-table-head"><span>排名 / 球员</span><span>总积分</span><span>参赛站次</span><span>变化</span></div>
            {players.slice(0, 14).map((player) => {
              const delta = player.previousRank - player.rank;
              return (
                <article className="ranking-row" key={player.id}>
                  <div className="rank-player">
                    <span className={`rank-number rank-${player.rank}`}>{String(player.rank).padStart(2, "0")}</span>
                    <Avatar player={player} />
                    <div><strong>{player.name}</strong><span>历史最佳 #{player.bestRank} · 总计 {player.totalStops} 站</span></div>
                  </div>
                  <div className="points"><strong>{player.points.toLocaleString()}</strong><span>PTS</span></div>
                  <div className="stops"><strong>{player.stops}</strong><span>本期计分站</span></div>
                  <div className={`movement ${delta > 0 ? "up" : delta < 0 ? "down" : "flat"}`}>{delta > 0 ? `↑${delta}` : delta < 0 ? `↓${Math.abs(delta)}` : "—"}</div>
                </article>
              );
            })}
          </div>
        )}

        {rankingMode === "doubles" && (
          <div className="ranking-table-wrap">
            <div className="ranking-note"><b>双打实力榜 · Elo Beta</b><span>仅使用 2026 赛季已登记的逐场赛果估算，并显示样本场次</span></div>
            <div className="ranking-table-head"><span>排名 / 球员</span><span>Elo</span><span>样本场次</span><span>变化</span></div>
            {doublesRanking.map((player, index) => (
              <article className="ranking-row" key={player.name}>
                <div className="rank-player"><span className={`rank-number rank-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span><span className="avatar avatar-medium avatar-lime">{player.initial}</span><div><strong>{player.name}</strong><span>稳定样本</span></div></div>
                <div className="points"><strong>{player.score}</strong><span>ELO</span></div>
                <div className="stops"><strong>{player.samples}</strong><span>场双打</span></div>
                <div className={`movement ${player.movement.startsWith("+") ? "up" : player.movement.startsWith("-") ? "down" : "flat"}`}>{player.movement}</div>
              </article>
            ))}
          </div>
        )}

        {rankingMode === "singles" && (
          <div className="ranking-pending">
            <span>DATA IMPORT IN PROGRESS</span><b>单打实力榜正在回算</b><p>需要将历史逐场单打赛果导入后再计算 Elo；这里不使用年度积分或虚构数据替代。</p>
          </div>
        )}
      </section>

      <section className="section players-section" id="players">
        <div className="section-head roster-head">
          <div><span className="section-kicker">HSAY PLAYER ARCHIVE</span><h2>球员档案</h2><p>已将参考清单中的真实球员替换原演示人物。</p></div>
          <label className="player-search"><span>⌕</span><input value={playerQuery} onChange={(event) => setPlayerQuery(event.target.value)} placeholder="搜索球员名字" aria-label="搜索球员名字" /></label>
        </div>
        <div className="roster-grid">
          {roster.map((player) => (
            <article className="roster-card" key={player.id}>
              <Avatar player={player} size="large" />
              <div><span>2026 年度积分 #{player.rank}</span><h3>{player.name}</h3><p>{player.matches ? `${player.matches} 场已登记比赛` : `${player.totalStops} 站参赛记录`}{player.titles ? ` · ${player.titles} 冠` : ""}</p></div>
              <b>{player.points.toLocaleString()}<small>积分</small></b>
            </article>
          ))}
        </div>
        {!playerQuery && <button className="roster-more" onClick={() => setShowAllPlayers(!showAllPlayers)}>{showAllPlayers ? "收起名单 ↑" : `展开已导入的 ${players.length} 位球员 ↓`}</button>}
      </section>

      <section className="section h2h-section" id="h2h">
        <div className="section-head">
          <div><span className="section-kicker">HEAD TO HEAD</span><h2>谁是谁的主人？</h2><p>选择两位球员，查看已登记赛季中的交锋关系。</p></div>
          <span className="public-tag">公开赛果</span>
        </div>
        <div className="h2h-board">
          <div className="h2h-player left-player">
            <label>左方 · 1 人</label>
            <select value={leftId} onChange={(event) => setLeftId(event.target.value)} aria-label="选择左方球员">{players.filter((player) => player.id !== rightId).map((player) => <option value={player.id} key={player.id}>{player.name}</option>)}</select>
            <Avatar player={left} size="large" /><h3>{left.name}</h3><span>2026 年度积分 #{left.rank}</span><strong className="h2h-wins">{leftWins}<small>胜</small></strong>
          </div>
          <button className="swap-button" onClick={swapPlayers} aria-label="交换两位球员">⇄</button>
          <div className="versus-mark">VS</div>
          <div className="h2h-player right-player">
            <label>右方 · 1 人</label>
            <select value={rightId} onChange={(event) => setRightId(event.target.value)} aria-label="选择右方球员">{players.filter((player) => player.id !== leftId).map((player) => <option value={player.id} key={player.id}>{player.name}</option>)}</select>
            <Avatar player={right} size="large" /><h3>{right.name}</h3><span>2026 年度积分 #{right.rank}</span><strong className="h2h-wins">{rightWins}<small>胜</small></strong>
          </div>
          <div className="h2h-summary">
            <div><span>已登记交锋</span><strong>{leftWins + rightWins} 次</strong></div>
            <div className="h2h-bar"><i style={{ width: `${(leftWins / Math.max(1, leftWins + rightWins)) * 100}%` }} /></div>
            <div><span>当前领先</span><strong>{leftWins + rightWins === 0 ? "暂无已导入交锋" : leftWins === rightWins ? "平分秋色" : leftWins > rightWins ? left.name : right.name}</strong></div>
          </div>
        </div>
        {isReferenceH2H && <div className="h2h-history"><span>宇凡 × Sven · 已登记交锋</span>{["Sven / Ethan  4–15  宇凡 / 刀刀","宇凡 / 猪猪  15–4  Sven / Roderick","宇凡  15–6  Sven","Stone / Sven  5–15  宇凡 / 十六","Sven  9–15  宇凡","宇凡  15–13  Sven"].map((item, index) => <div key={item}><small>{index < 2 ? "双打" : index === 2 || index > 3 ? "单打" : "双打"}</small><b>{item}</b></div>)}</div>}
      </section>

      <section className="section metrics-section" id="membership">
        <div className="metric-copy">
          <span className="section-kicker">MEMBERS ONLY</span><h2>你的球，不止输赢。</h2><p>登录后解锁个人比赛画像、实力、稳定、压制、调整力与韧性趋势，以及只对本人可见的训练建议。</p>
          <ul><li><i>✓</i>逐场表现趋势</li><li><i>✓</i>比赛画像指标</li><li><i>✓</i>私密教练备注</li></ul>
          <a className="primary-button light-button" href={isSignedIn ? "/member" : "/signin-with-chatgpt?return_to=%2Fmember"}>{isSignedIn ? "进入我的数据舱" : "登录解锁我的数据"} <span>→</span></a>
          <small>会员数据仅本人及获授权的俱乐部管理员可见</small>
        </div>
        <div className="metric-preview" aria-label="会员技术数据预览">
          <div className="metric-preview-head"><div><Avatar player={players[5]} /><span><b>LOKER’S PROFILE</b><small>稳定画像 · 50 场样本</small></span></div><span className="lock-pill">🔒 私密</span></div>
          <div className="radar-wrap">
            <div className="radar-label label-serve">实力 <b>95</b></div><div className="radar-label label-return">压制 <b>28</b></div><div className="radar-label label-forehand">韧性 <b>17</b></div><div className="radar-label label-backhand">调整力 <b>33</b></div><div className="radar-label label-net">稳定 <b>87</b></div><div className="radar-label label-mental">样本 <b>50</b></div>
            <div className="radar-grid"><i /><i /><i /><span /></div>
          </div>
          <div className="trend-row"><div><span>年度积分</span><strong>12,736</strong></div><div><span>历史最佳</span><strong>#1</strong></div><div><span>比赛画像</span><strong className="glow-text">稳定得很礼貌</strong></div></div>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <span className="section-kicker">THE HSAY CODE</span><h2>四个字母，<br />一群缺你不可的人。</h2>
        <div className="letter-grid">
          <article><b>H</b><h3>HIT</h3><p>爆抽 · 撕烂全场</p><span>每一次挥拍都不退让，上场就是主宰比赛的女王。</span></article>
          <article><b>S</b><h3>SPIN</h3><p>旋转 · 纯属我演</p><span>失误不是技术不行，全靠精湛的“演技”维持体面。</span></article>
          <article><b>A</b><h3>ACE</h3><p>得分 · 我来闪耀</p><span>实力碾压的高光时刻，接受属于你的全场注目。</span></article>
          <article><b>Y</b><h3>YOU</h3><p>你 · 缺你不可</p><span>没有你的配合演出，再嚣张的球技也只是独角戏。</span></article>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark footer-mark">HSAY<i /></span><p>Hit · Spin · Ace & You<br />上海 · LGBTQ+ Friendly Tennis Club</p></div>
        <div className="footer-slogan">撕烂全场，我来闪耀。<br /><em>今天演了，下次横扫。</em></div>
        <div className="footer-meta"><span>© 2026 HSAY TENNIS CLUB</span><span>MADE WITH PRIDE IN SHANGHAI</span></div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="移动端导航">
        <a href="#top">⌂<span>首页</span></a><a href="#events">▦<span>赛事</span></a><a href="#ranking">↗<span>排名</span></a><a href="#players">●<span>球员</span></a><a href={isSignedIn ? "/member" : "/signin-with-chatgpt?return_to=%2Fmember"}>◎<span>我的</span></a>
      </nav>
    </main>
  );
}
