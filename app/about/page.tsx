import { sitePath } from "../site-path";

const codeWords = [
  { letter: "H", title: "HIT", label: "爆抽 · 撕烂全场", copy: "每一次挥拍都不退让，上场就是主宰比赛的女王。" },
  { letter: "S", title: "SPIN", label: "旋转 · 弧线跳动", copy: "失误波动不是技术问题，全靠精湛的“演技”维持体面。" },
  { letter: "A", title: "ACE", label: "得分 · 我来闪耀", copy: "实力碾压的高光时刻，接受属于你的全场注目。" },
  { letter: "Y", title: "YOU", label: "你 · 缺你不可", copy: "没有你的配合演出，再嚣张的球技也只是独角戏。" },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="site-header about-header">
        <a className="brand" href={sitePath("")} aria-label="HSAY 首页">
          <span className="brand-mark">HSAY<i /></span>
        </a>
        <nav aria-label="关于页面导航">
          <a href={sitePath("")}>首页</a>
          <a href={`${sitePath("")}#events`}>赛事</a>
          <a href={`${sitePath("")}#ranking`}>排名</a>
          <a href={sitePath("about")} aria-current="page">关于 HSAY</a>
        </nav>
        <div className="header-actions">
          <a className="login-button" href={sitePath("member")}>
            <span className="status-dot" />
            我的数据
          </a>
        </div>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="section-kicker">ABOUT HSAY / SHANGHAI</span>
          <h1>THE HSAY<br /><em>CODE.</em></h1>
          <p>扎根上海的实力派网球社群。查赛程、看赛果、追排名，<br className="desktop-only" />每一场都是“真我演出”。</p>
        </div>
        <div className="about-hero-note">
          <span className="about-note-mark">H·S·A·Y</span>
          <p>不是一套标准答案，<br />是一群人一起打出来的暗号。</p>
          <a className="text-button" href="#code">读懂这四个字母 <span>↓</span></a>
        </div>
      </section>

      <section className="about-code" id="code">
        <div className="about-code-heading">
          <div>
            <span className="section-kicker">THE HSAY CODE</span>
            <h2>四个字母，<br />一群缺你不可的人。</h2>
          </div>
          <p>把比赛打得认真，把自己活得尽兴。<br />这里不只记录输赢，也记录每一次上场。</p>
        </div>
        <div className="letter-grid about-letter-grid">
          {codeWords.map((word) => (
            <article key={word.letter}>
              <b>{word.letter}</b>
              <h3>{word.title}</h3>
              <p>{word.label}</p>
              <span>{word.copy}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-belief">
        <span className="section-kicker">OUR COURT, OUR RULES</span>
        <h2>场下是宝贝，<br /><em>场上撕得飞。</em></h2>
        <p>你可以为一分庆祝，为一次失误懊恼，也可以在下一球重新把气势打回来。HSAY 让每一次挥拍都有同伴，让每一场比赛都值得被记住。</p>
      </section>

      <section className="about-tags" aria-label="HSAY 标签">
        <div className="about-tag-line">
          <span>SHANGHAI</span><b>·</b><span>150 PLAYERS</span><b>·</b><span>EST. 2024</span>
        </div>
        <div className="about-stat-line">
          <div><strong>150</strong><span>球员档案</span></div>
          <i />
          <div><strong>328+</strong><span>已登记比赛</span></div>
          <i />
          <div><strong>21</strong><span>2026 已计分站</span></div>
          <i />
          <div><strong>∞</strong><span>情绪价值</span></div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark footer-mark">HSAY<i /></span><p>Hit · Spin · Ace &amp; You</p></div>
        <div className="footer-slogan"><span className="footer-ace-line">撕烂全场，我来闪耀。</span><br /><em><span className="slogan-strike">今天演了，下次横扫。</span></em></div>
        <div className="footer-meta"><span>© 2026 HSAY TENNIS CLUB</span><a href={sitePath("")}>BACK TO COURT ↗</a></div>
      </footer>
    </main>
  );
}
