"use client";

import { useEffect, useMemo, useState } from "react";
import { sitePath } from "./site-path";

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

const singlesRanking = [
  { name: "川林贯空", initial: "川", score: 1712, samples: 20, movement: "—" },
  { name: "宇凡", initial: "宇", score: 1684, samples: 20, movement: "+1" },
  { name: "Loker", initial: "L", score: 1659, samples: 20, movement: "-1" },
  { name: "Peter", initial: "P", score: 1638, samples: 20, movement: "—" },
  { name: "刀刀", initial: "刀", score: 1604, samples: 20, movement: "+2" },
  { name: "Connor", initial: "C", score: 1588, samples: 20, movement: "-1" },
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
  { id: "event-0812", month: "AUG", day: "12", year: "2026", title: "HSAY冠军女性杯团体赛", meta: "OT网球俱乐部 · 宝山大白气模馆", format: "4 队 · 完整赛果", status: "已结束", tone: "lime" },
  { id: "event-0818", month: "AUG", day: "18", year: "2026", title: "HSAY星桥鸳鸯杯团体赛", meta: "OT网球俱乐部 · 宝山大白气模馆", format: "4 队 · 编排已录入", status: "已结束", tone: "violet" },
  { id: "event-0825", month: "AUG", day: "25", year: "2026", title: "HSAY伏风蟹鸣杯大白单打赛", meta: "OT网球俱乐部 · 宝山大白气模馆", format: "8 组 · 小组赛", status: "赛程已定", tone: "coral" },
];

const event0818Teams = [
  { name: "校长带学员团", tone: "pink", players: ["Stone", "William", "Michael", "Peter", "晓阳", "刀刀"], doubles: ["William / Michael", "刀刀 / Peter", "晓阳 / Stone"] },
  { name: "牛转乾坤", tone: "blue", players: ["子承", "Loker", "小沙", "Jay", "Kerber", "Ivan"], doubles: ["Kerber / 小沙", "Loker / Jay", "Ivan / 子承"] },
  { name: "牛来", tone: "ink", players: ["1999", "LL", "呆呆", "Alex", "Adam", "Ethan"], doubles: ["Adam / LL", "Ethan / 呆呆", "Alex / 1999"] },
  { name: "兔女郎们的狂欢日", tone: "paper", players: ["Andrew", "宇凡", "鱼渔", "程泽", "龙忻", "傅医生"], doubles: ["宇凡 / 龙忻", "Andrew / 程泽", "鱼渔 / 傅医生"] },
];

const event0825Groups = [
  ["A", "[1] 川林贯空", "夏和雪", "Josh"], ["B", "[6] 虎", "傅医生", "阳阳"],
  ["C", "[7] Adam", "刀刀", "Casper"], ["D", "[4] 沙漠", "LL", "Jacky"],
  ["E", "[3] Connor", "Sven", "Lay"], ["F", "[5] Loker", "Ethan", "许伟洪"],
  ["G", "[8] Andrew", "Max", "铭"], ["H", "[2] 宇凡", "东山", "Kerber"],
];

const radarMetrics = [
  { label: "实力", value: 95 },
  { label: "压制", value: 28 },
  { label: "韧性", value: 17 },
  { label: "调整力", value: 33 },
  { label: "稳定", value: 87 },
  { label: "样本", value: 50 },
];

function radarPolygon(values: number[]) {
  const points = values.map((rawValue, index) => {
    const value = Math.max(0, Math.min(100, rawValue));
    const angle = (-90 + index * 60) * (Math.PI / 180);
    const radius = value * 0.44;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  });
  return `polygon(${points.join(", ")})`;
}

function Avatar({ player, size = "medium" }: { player: Player; size?: "small" | "medium" | "large" }) {
  return <span className={`avatar avatar-${size} avatar-${player.color}`} aria-hidden="true">{player.initial}</span>;
}

function MiniIcon({ kind }: { kind: "home" | "calendar" | "rank" | "players" | "profile" }) {
  const paths = {
    home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
    calendar: "M5 4v3M19 4v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1zM8 12h2M14 12h2M8 16h2",
    rank: "M4 19h4V9H4v10zM10 19h4V4h-4v15zM16 19h4v-7h-4v7z",
    players: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM6 8c4 1 8 1 12 0M6 16c4-1 8-1 12 0",
    profile: "M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 21a7 7 0 0 1 14 0",
  } as const;
  return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[kind]} /></svg>;
}

function TennisCourtIcon() {
  return <svg className="event-court-logo" viewBox="0 0 32 24" aria-hidden="true"><rect x="2" y="2" width="28" height="20" rx="1" /><path d="M16 2v20M2 12h28M7 2v20M25 2v20M7 7h18M7 17h18" /></svg>;
}

export function HSAYClub({ initialSurface = "web" }: { initialSurface?: "web" | "mini" }) {
  const [surface, setSurface] = useState<"web" | "mini">(initialSurface);
  const [rankingMode, setRankingMode] = useState<"annual" | "singles" | "doubles">("annual");
  const [eloWindow, setEloWindow] = useState<20 | 50>(20);
  const [eventStage, setEventStage] = useState("final");
  const [activeEventId, setActiveEventId] = useState("event-0812");
  const [leftId, setLeftId] = useState("yufan");
  const [rightId, setRightId] = useState("sven");
  const [rightIds, setRightIds] = useState<string[]>(["sven"]);
  const [playerQuery, setPlayerQuery] = useState("");
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const querySurface = new URLSearchParams(window.location.search).get("surface");
    if (querySurface === "mini") setSurface("mini");
    else if (!querySurface && window.matchMedia("(max-width: 720px), (orientation: portrait) and (max-width: 1024px)").matches) setSurface("mini");
  }, []);

  const left = players.find((player) => player.id === leftId) ?? players[1];
  const right = players.find((player) => player.id === rightId) ?? players[21];
  const isReferenceH2H = [left.id, right.id].includes("yufan") && [left.id, right.id].includes("sven");
  const leftWins = isReferenceH2H ? (left.id === "yufan" ? 6 : 0) : 0;
  const rightWins = isReferenceH2H ? (right.id === "sven" ? 0 : 6) : 0;
  const selectedStage = eventStages[eventStage];
  const activeEvent = eventList.find((event) => event.id === activeEventId) ?? eventList[0];

  const roster = useMemo(() => {
    const query = playerQuery.trim().toLowerCase();
    const filtered = query ? players.filter((player) => player.name.toLowerCase().includes(query)) : [...players];
    filtered.sort((a, b) => (b.matches ?? b.totalStops) - (a.matches ?? a.totalStops));
    return showAllPlayers || query ? filtered : filtered.slice(0, 8);
  }, [playerQuery, showAllPlayers]);

  const swapPlayers = () => {
    setLeftId(rightId);
    setRightId(leftId);
  };

  return (
    <main className={surface === "mini" ? "mini-surface" : "web-surface"}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HSAY 首页">
          <span className="brand-mark">HSAY<i /></span>
        </a>
        <nav className={mobileMenu ? "nav-open" : ""} aria-label="主导航">
          <a href="#top" onClick={() => setMobileMenu(false)}>首页</a>
          <a href="#events" onClick={() => setMobileMenu(false)}>赛事</a>
          <a href="#ranking" onClick={() => setMobileMenu(false)}>排名</a>
          <a href="#players" onClick={() => setMobileMenu(false)}>球员</a>
          <a href={surface === "mini" ? sitePath("member?surface=mini") : sitePath("member")} onClick={() => setMobileMenu(false)}>我的</a>
        </nav>
        <div className="header-actions">
          <div className="surface-toggle" role="group" aria-label="切换 Web 或小程序模式">
            <button className={surface === "web" ? "active" : ""} onClick={() => setSurface("web")} aria-pressed={surface === "web"}>Web</button>
            <button className={surface === "mini" ? "active" : ""} onClick={() => setSurface("mini")} aria-pressed={surface === "mini"}>小程序</button>
          </div>
          <a className="login-button" href={surface === "mini" ? sitePath("member?surface=mini") : sitePath("member")}>
            <span className="status-dot" />
            我的数据
          </a>
          <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="展开导航" aria-expanded={mobileMenu}>☰</button>
        </div>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>SHANGHAI</span><b>·</b><span>150 PLAYERS</span><b>·</b><span>EST. 2024</span></div>
          <h1><span className="hero-line hero-line-top">场下宝贝，</span><span className="hero-line hero-line-bottom">场上撕飞。</span></h1>
          <p>扎根上海的实力派网球社群。查赛程、看赛果、追排名，<br className="desktop-only" />每一场都是“真我演出”。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#events">查看赛事安排 <span>↗</span></a>
            <a className="text-button" href="#ranking">2026 赛季排名 <span>↓</span></a>
          </div>
        </div>

        <div className="hero-card-wrap" aria-label="冠军女性杯决赛结果">
          <div className="rainbow-orbit orbit-one" />
          <div className="rainbow-orbit orbit-two" />
          <article className="hero-score-card">
            <div className="score-card-top"><span className="live-pill"><i /> TEAM FINAL</span><span>2026.08.12</span></div>
            <div className="trophy-ball">ACE</div>
            <svg className="court-svg" viewBox="0 0 600 360" aria-hidden="true">
              <rect x="22" y="22" width="556" height="316" rx="2" />
              <line x1="300" y1="22" x2="300" y2="338" />
              <line x1="22" y1="180" x2="578" y2="180" />
              <line x1="92" y1="22" x2="92" y2="338" />
              <line x1="508" y1="22" x2="508" y2="338" />
              <line x1="92" y1="116" x2="508" y2="116" />
              <line x1="92" y1="244" x2="508" y2="244" />
            </svg>
            <div className="finalist finalist-left">
              <span className="avatar avatar-large avatar-blue">永</span>
              <strong>永瘦宫</strong>
            </div>
            <div className="finalist finalist-right">
              <span className="avatar avatar-large avatar-lime">D</span>
              <strong>D-I-Y</strong>
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
          <div><span className="section-kicker">EVENT CALENDAR</span><h2>赛事</h2><p>过去的荣耀、正在进行的对阵，以及下一站安排。</p></div>
          <span className="season-chip">2026 赛季</span>
        </div>
        <div className="event-list">
          {eventList.map((event) => (
            <article className="event-card" key={event.id}>
              <div className={`event-date event-date-${event.tone}`}><span>{event.month}</span><b>{event.day}</b><small>{event.year}</small></div>
              <div className="event-main"><div className="event-status-line"><TennisCourtIcon /><span>{event.status}</span></div><h3>{event.title}</h3><p>{event.meta}</p></div>
              <div className="event-format"><span>赛事安排</span><b>{event.format}</b></div>
              <a href="#event-detail" onClick={() => setActiveEventId(event.id)} aria-label={`查看${event.title}`}>→</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section event-detail-section" id="event-detail">
        <div className="event-detail-intro">
          <span className="section-kicker">EVENT ARRANGEMENT</span>
          <h2>{activeEvent.id === "event-0812" ? <>冠军女性杯<br />完整赛果</> : activeEvent.title.replace("HSAY", "")}</h2>
          <p>{activeEvent.year}.08.{activeEvent.day} · OT网球俱乐部<br />宝山大白气模馆 · {activeEvent.id === "event-0825" ? "小组单打" : "团体赛"}</p>
          {activeEvent.id === "event-0812" && <div className="stage-tabs" role="group" aria-label="选择赛事阶段">
            {Object.entries(eventStages).map(([key, stage]) => <button key={key} className={eventStage === key ? "active" : ""} onClick={() => setEventStage(key)}>{stage.title}</button>)}
          </div>}
        </div>
        {activeEvent.id === "event-0812" && <article className="scorecard">
          <div className="scorecard-head">
            <span>{selectedStage.title}</span>
            <div><strong>{selectedStage.left}</strong><b>{selectedStage.teamScore}</b><strong>{selectedStage.right}</strong></div>
            <small>{selectedStage.fixtures.length} 场对阵 · 先到 15 分</small>
          </div>
          <div className="fixture-list">
            {selectedStage.fixtures.map((fixture, index) => (
              <div className="fixture-row" key={`${eventStage}-${index}`}>
                <div className={fixture.winner === "left" ? "fixture-winner" : "fixture-loser"}><strong>{fixture.left}</strong></div>
                <b>{fixture.score}</b>
                <div className={fixture.winner === "right" ? "fixture-winner" : "fixture-loser"}><strong>{fixture.right}</strong></div>
              </div>
            ))}
          </div>
        </article>}
        {activeEvent.id === "event-0818" && <article className="arrangement-card">
          <div className="arrangement-heading"><b>半决赛对阵</b><span>4 队 · 每队 6 位球员</span></div>
          <div className="team-grid">{event0818Teams.map((team) => <div className={`team-card team-${team.tone}`} key={team.name}><h3>{team.name}</h3><div className="team-players">{team.players.map((player) => <span key={player}>{player}</span>)}</div><div className="team-doubles"><small>双打组合</small>{team.doubles.map((pair) => <b key={pair}>{pair}</b>)}</div></div>)}</div>
          <div className="bracket-placeholder"><b>三四名决赛</b><span>待录入</span><i>决赛 · 待录入</i></div>
        </article>}
        {activeEvent.id === "event-0825" && <article className="arrangement-card">
          <div className="arrangement-heading"><b>小组赛 · 抢 11 金球</b><span>8 组 · 每组 3 人</span></div>
          <div className="group-grid">{event0825Groups.map(([group, first, second, third]) => <div className="group-card" key={group}><h3>{group}组</h3><div><span>{first}</span><span>{second}</span><span>{third}</span></div></div>)}</div>
          <div className="bracket-placeholder"><b>金组 / 银组 / 铜组淘汰赛</b><span>小组赛结束后录入</span></div>
        </article>}
      </section>

      <section className="section ranking-section" id="ranking">
        <div className="section-head inverse-head">
          <div><span className="section-kicker">2026 SEASON RANKING</span><h2>排名</h2><p>年度荣誉、单打实力与双打实力分开呈现。</p></div>
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
            {players.slice(0, 20).map((player) => {
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
                  {delta !== 0 && <div className={`movement ${delta > 0 ? "up" : "down"}`}>{delta > 0 ? `↑${delta}` : `↓${Math.abs(delta)}`}</div>}
                </article>
              );
            })}
          </div>
        )}

        {rankingMode !== "annual" && (
          <div className="ranking-table-wrap">
            <div className="ranking-note"><b>{rankingMode === "doubles" ? "双打" : "单打"} 实力榜 · Elo</b><span>按最近 {eloWindow} 场已登记赛果计算</span><div className="elo-window-toggle" role="group" aria-label="选择 Elo 样本范围"><button className={eloWindow === 20 ? "active" : ""} onClick={() => setEloWindow(20)}>近期 20 场</button><button className={eloWindow === 50 ? "active" : ""} onClick={() => setEloWindow(50)}>近期 50 场</button></div></div>
            <div className="ranking-table-head"><span>排名 / 球员</span><span>Elo</span><span>样本场次</span><span>变化</span></div>
            {(rankingMode === "doubles" ? doublesRanking : singlesRanking).map((player, index) => (
              <article className="ranking-row" key={player.name}>
                <div className="rank-player"><span className={`rank-number rank-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span><span className="avatar avatar-medium avatar-lime">{player.initial}</span><div><strong>{player.name}</strong><span>稳定样本</span></div></div>
                <div className="points"><strong>{player.score}</strong><span>ELO</span></div>
                <div className="stops"><strong>{player.samples}</strong><span>场{rankingMode === "doubles" ? "双打" : "单打"}</span></div>
                {player.movement !== "—" && <div className={`movement ${player.movement.startsWith("+") ? "up" : "down"}`}>{player.movement}</div>}
              </article>
            ))}
          </div>
        )}

      </section>

      <section className="section players-section" id="players">
        <div className="section-head roster-head">
          <div><span className="section-kicker">HSAY PLAYER ARCHIVE</span><h2>球员</h2><p>按参赛量浏览 HSAY 球员。</p></div>
          <label className="player-search"><span>⌕</span><input value={playerQuery} onChange={(event) => setPlayerQuery(event.target.value)} placeholder="搜索球员名字" aria-label="搜索球员名字" /></label>
        </div>
        <div className="roster-grid">
          {roster.map((player) => (
            <article className="roster-card" key={player.id}>
              <Avatar player={player} size="large" />
              <div className="roster-card-copy"><strong className="roster-rank"><b>#{String(player.rank).padStart(2, "0")}</b><span>年度积分</span></strong><h3>{player.name}</h3><p>{player.matches ? `${player.matches} 场已登记比赛` : `${player.totalStops} 站参赛记录`}{player.titles ? ` · ${player.titles} 冠` : ""}</p></div>
              <b>{player.points.toLocaleString()}<small>积分</small></b>
            </article>
          ))}
        </div>
        {!playerQuery && <button className="roster-more" onClick={() => setShowAllPlayers(!showAllPlayers)}>{showAllPlayers ? "收起名单 ↑" : `展开已导入的 ${players.length} 位球员 ↓`}</button>}
      </section>

      <section className="section h2h-section" id="h2h">
        <div className="section-head">
          <div><span className="section-kicker">HEAD TO HEAD</span><h2>H2H</h2></div>
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
            <select value={rightId} onChange={(event) => { setRightId(event.target.value); setRightIds((current) => current.includes(event.target.value) ? current : [event.target.value, ...current].slice(0, 4)); }} aria-label="选择右方球员">{players.filter((player) => player.id !== leftId).map((player) => <option value={player.id} key={player.id}>{player.name}</option>)}</select>
            <div className="h2h-multi-picker" aria-label="追加右方球员"><small>右方可多选</small>{players.filter((player) => player.id !== leftId).slice(0, 8).map((player) => <button key={player.id} className={rightIds.includes(player.id) ? "active" : ""} onClick={() => setRightIds((current) => current.includes(player.id) ? (current.length > 1 ? current.filter((id) => id !== player.id) : current) : current.length < 4 ? [...current, player.id] : current)}>{player.name}</button>)}</div>
            <div className="h2h-multi-avatars">{rightIds.map((id) => { const player = players.find((item) => item.id === id); return player ? <div className="h2h-multi-avatar" key={player.id}><Avatar player={player} size="medium" /><small>{player.name}</small></div> : null; })}</div><h3>{rightIds.length > 1 ? `${right.name} 等` : right.name}</h3><span>2026 年度积分 #{right.rank}</span><strong className="h2h-wins">{rightWins}<small>胜</small></strong>
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
          <span className="section-kicker">MEMBER DATA</span><h2>你的球，不止输赢。</h2><p>会员数据舱展示个人比赛画像、实力、稳定、压制、调整力与韧性趋势，以及只对本人可见的训练建议。</p>
          <ul><li><i>✓</i>逐场表现趋势</li><li><i>✓</i>比赛画像指标</li><li><i>✓</i>密友备注</li></ul>
          <a className="primary-button light-button" href={surface === "mini" ? sitePath("member?surface=mini") : sitePath("member")}>进入我的数据舱 <span>→</span></a>
          <small>会员数据仅本人及获授权的俱乐部管理员可见</small>
        </div>
        <div className="metric-preview metric-lock-preview" aria-label="会员技术数据预览">
          <div className="metric-preview-head"><div><Avatar player={players[5]} /><span><b>PRIVATE PROFILE</b><small>登录后查看个人比赛画像</small></span></div><span className="lock-pill">🔒 仅自己可见</span></div>
          <div className="metric-lock-copy"><b>六维比赛画像已移入“我的”</b><p>进入我的数据舱，查看按实际数值渲染的雷达图、近期状态和密友备注。</p><a href={surface === "mini" ? sitePath("member?surface=mini") : sitePath("member")}>打开我的数据舱 →</a></div>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <span className="section-kicker">THE HSAY CODE</span><h2>四个字母，<br />一群缺你不可的人。</h2>
        <div className="letter-grid">
          <article><b>H</b><h3>HIT</h3><p>爆抽 · 撕烂全场</p><span>每一次挥拍都不退让，上场就是主宰比赛的女王。</span></article>
          <article><b>S</b><h3>SPIN</h3><p>旋转 · 弧线跳动</p><span>失误波动不是技术问题，全靠精湛的“演技”维持体面。</span></article>
          <article><b>A</b><h3>ACE</h3><p>得分 · 我来闪耀</p><span>实力碾压的高光时刻，接受属于你的全场注目。</span></article>
          <article><b>Y</b><h3>YOU</h3><p>你 · 缺你不可</p><span>没有你的配合演出，再嚣张的球技也只是独角戏。</span></article>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark footer-mark">HSAY<i /></span><p>Hit · Spin · Ace & You</p></div>
        <div className="footer-slogan"><span className="footer-ace-line">撕烂全场，我来闪耀。</span><br /><em><span className="slogan-strike">今天演了，下次横扫。</span></em></div>
        <div className="footer-meta"><span>© 2026 HSAY TENNIS CLUB</span><span>MADE WITH PRIDE IN SHANGHAI</span></div>
      </footer>

      <nav className={`mobile-bottom-nav ${surface === "mini" ? "mini-nav-active" : ""}`} aria-label="移动端导航">
        <a href={surface === "mini" ? sitePath("?surface=mini#top") : "#top"}><MiniIcon kind="home" /><span>首页</span></a><a href={surface === "mini" ? sitePath("?surface=mini#events") : "#events"}><MiniIcon kind="calendar" /><span>赛事</span></a><a href={surface === "mini" ? sitePath("?surface=mini#ranking") : "#ranking"}><MiniIcon kind="rank" /><span>排名</span></a><a href={surface === "mini" ? sitePath("?surface=mini#players") : "#players"}><MiniIcon kind="players" /><span>球员</span></a><a href={surface === "mini" ? sitePath("member?surface=mini") : sitePath("member")}><MiniIcon kind="profile" /><span>我的</span></a>
      </nav>
    </main>
  );
}
