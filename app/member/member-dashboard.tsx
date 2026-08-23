"use client";

const metrics = [
  { label: "发球", score: 82, delta: "+4" },
  { label: "接发", score: 76, delta: "+2" },
  { label: "正手", score: 88, delta: "+6" },
  { label: "反手", score: 71, delta: "-1" },
  { label: "网前", score: 64, delta: "+3" },
  { label: "关键分", score: 91, delta: "+8" },
];

export function MemberDashboard({ displayName }: { displayName: string }) {
  const name = displayName.split("@")[0];

  return (
    <main className="member-shell">
      <header className="member-header">
        <a className="brand" href="/"><span className="brand-mark">HSAY<i /></span><span className="brand-sub">MEMBER CLUBHOUSE</span></a>
        <div><span className="member-name">你好，{name}</span><a className="logout-link" href="/signout-with-chatgpt?return_to=%2F">退出</a></div>
      </header>
      <div className="member-hero">
        <div><span className="section-kicker">PRIVATE PERFORMANCE LAB</span><h1>我的数据舱</h1><p>所有指标仅你本人和获授权的俱乐部管理员可见。</p></div>
        <a className="back-link" href="/">← 返回公开首页</a>
      </div>
      <section className="member-grid">
        <article className="member-profile panel">
          <div className="member-avatar">M</div><span className="rank-chip">本周 #02</span><h2>MIKA ZHOU</h2><p>“切削女王” · NTRP 4.0</p>
          <div className="member-stats"><div><strong>12–3</strong><span>本季战绩</span></div><div><strong>76%</strong><span>胜率</span></div><div><strong>2,310</strong><span>战力分</span></div></div>
        </article>
        <article className="performance-panel panel">
          <div className="panel-title"><div><span className="section-kicker">LAST 8 MATCHES</span><h2>六维技术表现</h2></div><span className="private-chip">🔒 仅自己可见</span></div>
          <div className="metric-bars">
            {metrics.map((metric) => <div className="metric-bar" key={metric.label}><span>{metric.label}</span><div><i style={{width: `${metric.score}%`}} /></div><strong>{metric.score}</strong><em className={metric.delta.startsWith("-") ? "negative" : ""}>{metric.delta}</em></div>)}
          </div>
        </article>
        <article className="panel form-panel"><span className="section-kicker">FORM CURVE</span><h2>近期状态</h2><div className="form-chart"><i style={{height:"38%"}}/><i style={{height:"55%"}}/><i style={{height:"48%"}}/><i style={{height:"70%"}}/><i style={{height:"62%"}}/><i style={{height:"86%"}}/><i style={{height:"74%"}}/><i className="current" style={{height:"92%"}}/></div><div className="chart-axis"><span>JUN</span><span>JUL</span><span>AUG</span></div></article>
        <article className="panel coach-note"><span className="section-kicker">COACH NOTE · 08.21</span><h2>下一场，别急着闪耀。</h2><p>二发被攻后的第一拍容易过早变线。下一次训练先用 70% 力量打深中路，把回合拉到第四拍再启动正手。你已经够快了，现在要学会让对手先着急。</p><div><span>本周重点</span><b>二发 + 1</b><b>反手深度</b><b>关键分耐心</b></div></article>
        <article className="panel privacy-panel"><div className="privacy-icon">⌾</div><div><span className="section-kicker">PRIVACY</span><h2>谁能看到这些？</h2><p>详细技术数据：仅本人、主教练；训练备注：仅本人、撰写教练；公开主页只显示 NTRP、排名与胜率。</p></div></article>
      </section>
    </main>
  );
}
