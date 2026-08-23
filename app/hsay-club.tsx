"use client";

import { useMemo, useState } from "react";

type Player = {
  id: string;
  name: string;
  nick: string;
  ntrp: string;
  rank: number;
  points: number;
  movement: string;
  winRate: number;
  style: string;
  color: string;
  initial: string;
};

const players: Player[] = [
  { id: "alex", name: "Alex Chen", nick: "暴力甜心", ntrp: "4.5", rank: 1, points: 2480, movement: "—", winRate: 82, style: "进攻型底线", color: "violet", initial: "A" },
  { id: "mika", name: "Mika Zhou", nick: "切削女王", ntrp: "4.0", rank: 2, points: 2310, movement: "+1", winRate: 76, style: "全场型", color: "lime", initial: "M" },
  { id: "shawn", name: "Shawn Liu", nick: "月亮球总监", ntrp: "4.0", rank: 3, points: 2195, movement: "-1", winRate: 73, style: "防守反击", color: "orange", initial: "S" },
  { id: "ivan", name: "Ivan Xu", nick: "网前闪电", ntrp: "3.5", rank: 4, points: 2040, movement: "+2", winRate: 69, style: "发球上网", color: "cyan", initial: "I" },
  { id: "jules", name: "Jules Wang", nick: "上旋主理人", ntrp: "3.5", rank: 5, points: 1985, movement: "—", winRate: 67, style: "旋转控制", color: "pink", initial: "J" },
  { id: "ryan", name: "Ryan Li", nick: "放小艺术家", ntrp: "3.0", rank: 6, points: 1840, movement: "+1", winRate: 61, style: "变化型", color: "blue", initial: "R" },
];

const matches = [
  { round: "决赛", winner: "Alex", loser: "Mika", score: "6–4  3–6  10–7", time: "08.23", court: "旗忠·硬地", tone: "hot" },
  { round: "季军赛", winner: "Shawn", loser: "Ivan", score: "7–5  6–3", time: "08.23", court: "旗忠·硬地", tone: "cool" },
  { round: "半决赛", winner: "Mika", loser: "Shawn", score: "6–2  6–7  10–6", time: "08.16", court: "卢湾·硬地", tone: "lime" },
];

function Avatar({ player, size = "medium" }: { player: Player; size?: "small" | "medium" | "large" }) {
  return <span className={`avatar avatar-${size} avatar-${player.color}`} aria-hidden="true">{player.initial}</span>;
}

export function HSAYClub({ isSignedIn, displayName }: { isSignedIn: boolean; displayName?: string }) {
  const [level, setLevel] = useState("全部");
  const [leftId, setLeftId] = useState("alex");
  const [rightId, setRightId] = useState("mika");
  const [mobileMenu, setMobileMenu] = useState(false);

  const visiblePlayers = useMemo(
    () => level === "全部" ? players : players.filter((player) => player.ntrp === level),
    [level],
  );
  const left = players.find((player) => player.id === leftId) ?? players[0];
  const right = players.find((player) => player.id === rightId) ?? players[1];
  const leftWins = left.rank < right.rank ? 4 : 2;
  const rightWins = 6 - leftWins;

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
          <a href="#scores" onClick={() => setMobileMenu(false)}>赛果</a>
          <a href="#ranking" onClick={() => setMobileMenu(false)}>排名</a>
          <a href="#h2h" onClick={() => setMobileMenu(false)}>H2H</a>
          <a href="#players" onClick={() => setMobileMenu(false)}>球员</a>
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
          <div className="eyebrow"><span>SHANGHAI</span><b>·</b><span>NTRP 3.0—4.5</span><b>·</b><span>EST. 2024</span></div>
          <h1><span>场下是姐妹，</span><span className="outline-text">场上撕得飞。</span></h1>
          <p>扎根上海的实力派网球社群。认真打球，认真闪耀，<br className="desktop-only" />也认真接住每一次“纯属我演”。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#ranking">查看最新排名 <span>↗</span></a>
            <a className="text-button" href="#manifesto">认识 HSAY <span>↓</span></a>
          </div>
        </div>

        <div className="hero-card-wrap" aria-label="本周赛事焦点">
          <div className="rainbow-orbit orbit-one" />
          <div className="rainbow-orbit orbit-two" />
          <article className="hero-score-card">
            <div className="score-card-top"><span className="live-pill"><i /> CLUB FINAL</span><span>NO. 028</span></div>
            <div className="trophy-ball">✦</div>
            <div className="finalist finalist-left">
              <Avatar player={players[0]} size="large" />
              <strong>ALEX</strong><span>1</span>
            </div>
            <div className="finalist finalist-right">
              <Avatar player={players[1]} size="large" />
              <strong>MIKA</strong><span>2</span>
            </div>
            <div className="final-score"><small>FINAL</small><b>6–4</b><b>3–6</b><b className="tie-score">10–7</b></div>
            <div className="card-slogan">今天演了，<em>下次横扫。</em></div>
          </article>
        </div>
        <div className="hero-scroll">SCROLL TO SERVE <span>⌄</span></div>
      </section>

      <section className="ticker" aria-label="俱乐部数据">
        <div><b>46</b><span>在册球员</span></div><i />
        <div><b>328</b><span>已记录比赛</span></div><i />
        <div><b>4.5</b><span>最高 NTRP</span></div><i />
        <div><b>∞</b><span>情绪价值</span></div>
      </section>

      <section className="section results-section" id="scores">
        <div className="section-head">
          <div><span className="section-kicker">LATEST RESULTS</span><h2>刚刚撕完</h2></div>
          <a href="#ranking">全部赛果 <span>→</span></a>
        </div>
        <div className="match-list">
          {matches.map((match, index) => (
            <article className="match-row" key={`${match.winner}-${match.loser}`}>
              <div className={`round-badge round-${match.tone}`}>{match.round}</div>
              <div className="match-number">0{index + 1}</div>
              <div className="match-player winner"><strong>{match.winner}</strong><span>WINNER</span></div>
              <div className="match-score">{match.score.split("  ").map((set) => <b key={set}>{set}</b>)}</div>
              <div className="match-player loser"><strong>{match.loser}</strong><span>本次可能在演</span></div>
              <div className="match-meta"><b>{match.time}</b><span>{match.court}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section ranking-section" id="ranking">
        <div className="section-head inverse-head">
          <div><span className="section-kicker">HSAY POWER RANKING</span><h2>本周战力榜</h2><p>综合胜负、对手强度与近期状态，每周一更新。</p></div>
          <div className="level-filter" role="group" aria-label="按 NTRP 等级筛选">
            {["全部", "4.5", "4.0", "3.5", "3.0"].map((item) => (
              <button key={item} className={level === item ? "active" : ""} onClick={() => setLevel(item)}>{item === "全部" ? item : `NTRP ${item}`}</button>
            ))}
          </div>
        </div>
        <div className="ranking-table-wrap">
          <div className="ranking-table-head"><span>排名 / 球员</span><span>战力分</span><span>胜率</span><span>状态</span></div>
          {visiblePlayers.map((player) => (
            <article className="ranking-row" key={player.id}>
              <div className="rank-player">
                <span className={`rank-number rank-${player.rank}`}>{String(player.rank).padStart(2, "0")}</span>
                <Avatar player={player} />
                <div><strong>{player.name}</strong><span>“{player.nick}” · NTRP {player.ntrp}</span></div>
              </div>
              <div className="points"><strong>{player.points.toLocaleString()}</strong><span>PTS</span></div>
              <div className="win-rate"><div><i style={{ width: `${player.winRate}%` }} /></div><b>{player.winRate}%</b></div>
              <div className={`movement ${player.movement.startsWith("+") ? "up" : player.movement.startsWith("-") ? "down" : "flat"}`}>{player.movement}</div>
            </article>
          ))}
          {visiblePlayers.length === 0 && <div className="empty-state">这个级别暂时还没有人，等一位新女王上场。</div>}
        </div>
      </section>

      <section className="section h2h-section" id="h2h">
        <div className="section-head">
          <div><span className="section-kicker">HEAD TO HEAD</span><h2>网网相对</h2><p>选两位球员，看看谁的剧本更硬。</p></div>
          <span className="public-tag">公开数据</span>
        </div>
        <div className="h2h-board">
          <div className="h2h-player left-player">
            <label>球员 A</label>
            <select value={leftId} onChange={(event) => setLeftId(event.target.value)} aria-label="选择球员 A">
              {players.filter((player) => player.id !== rightId).map((player) => <option value={player.id} key={player.id}>{player.name}</option>)}
            </select>
            <Avatar player={left} size="large" />
            <h3>{left.name}</h3><span>“{left.nick}” · {left.style}</span>
            <strong className="h2h-wins">{leftWins}<small>胜</small></strong>
          </div>
          <button className="swap-button" onClick={swapPlayers} aria-label="交换两位球员">⇄</button>
          <div className="versus-mark">VS</div>
          <div className="h2h-player right-player">
            <label>球员 B</label>
            <select value={rightId} onChange={(event) => setRightId(event.target.value)} aria-label="选择球员 B">
              {players.filter((player) => player.id !== leftId).map((player) => <option value={player.id} key={player.id}>{player.name}</option>)}
            </select>
            <Avatar player={right} size="large" />
            <h3>{right.name}</h3><span>“{right.nick}” · {right.style}</span>
            <strong className="h2h-wins">{rightWins}<small>胜</small></strong>
          </div>
          <div className="h2h-summary">
            <div><span>交手次数</span><strong>6</strong></div>
            <div className="h2h-bar"><i style={{ width: `${(leftWins / 6) * 100}%` }} /></div>
            <div><span>最近一次</span><strong>{leftWins > rightWins ? left.name : right.name} · 6–4 6–3</strong></div>
          </div>
        </div>
      </section>

      <section className="section players-section" id="players">
        <div className="section-head">
          <div><span className="section-kicker">MEET THE CAST</span><h2>本季卡司</h2></div>
          <a href="#membership">查看全部 46 位 <span>→</span></a>
        </div>
        <div className="player-grid">
          {players.slice(0, 4).map((player, index) => (
            <article className={`player-card player-card-${player.color}`} key={player.id}>
              <div className="player-card-top"><span>0{index + 1}</span><span>NTRP {player.ntrp}</span></div>
              <div className="portrait-letter">{player.initial}</div>
              <div className="player-card-info"><span>{player.style.toUpperCase()}</span><h3>{player.name}</h3><p>“{player.nick}”</p><div><b>{player.winRate}%<small>胜率</small></b><b>{player.points}<small>战力</small></b></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section metrics-section" id="membership">
        <div className="metric-copy">
          <span className="section-kicker">MEMBERS ONLY</span>
          <h2>你的球，不止输赢。</h2>
          <p>登录后解锁个人技术雷达、发球稳定性、制胜分与非受迫失误趋势，以及只对本人可见的训练建议。</p>
          <ul><li><i>✓</i>逐场表现趋势</li><li><i>✓</i>六维技术指标</li><li><i>✓</i>私密教练备注</li></ul>
          <a className="primary-button light-button" href={isSignedIn ? "/member" : "/signin-with-chatgpt?return_to=%2Fmember"}>{isSignedIn ? "进入我的数据舱" : "登录解锁我的数据"} <span>→</span></a>
          <small>会员数据仅本人及获授权的俱乐部管理员可见</small>
        </div>
        <div className="metric-preview" aria-label="会员技术数据预览">
          <div className="metric-preview-head"><div><Avatar player={players[1]} /><span><b>MIKA’S GAME</b><small>最近 8 场 · 硬地</small></span></div><span className="lock-pill">🔒 私密</span></div>
          <div className="radar-wrap">
            <div className="radar-label label-serve">发球 <b>82</b></div><div className="radar-label label-return">接发 <b>76</b></div><div className="radar-label label-forehand">正手 <b>88</b></div><div className="radar-label label-backhand">反手 <b>71</b></div><div className="radar-label label-net">网前 <b>64</b></div><div className="radar-label label-mental">关键分 <b>91</b></div>
            <div className="radar-grid"><i /><i /><i /><span /></div>
          </div>
          <div className="trend-row"><div><span>一发进球率</span><strong>68% <i>↗ 4%</i></strong></div><div><span>破发点转化</span><strong>7/12</strong></div><div><span>状态指数</span><strong className="glow-text">HOT</strong></div></div>
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
        <a href="#top">⌂<span>首页</span></a><a href="#scores">✓<span>赛果</span></a><a href="#ranking">↗<span>排名</span></a><a href="#h2h">⇄<span>H2H</span></a><a href={isSignedIn ? "/member" : "/signin-with-chatgpt?return_to=%2Fmember"}>●<span>我的</span></a>
      </nav>
    </main>
  );
}
