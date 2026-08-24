import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

test("server-renders the public HSAY club experience", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env,
    context,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /HSAY 网球俱乐部/);
  assert.match(html, /场下是宝贝/);
  assert.match(html, /切换 Web 或小程序模式/);
  assert.match(html, /赛事日历/);
  assert.match(html, /冠军女性杯/);
  assert.match(html, /完整赛果/);
  assert.match(html, /WIN · 胜方/);
  assert.match(html, /LOST · 负方/);
  assert.match(html, /积分与排名/);
  assert.match(html, /川林贯空/);
  assert.match(html, /球员档案/);
  assert.match(html, /密友备注/);
  assert.doesNotMatch(html, /上海 · LGBTQ\+ Friendly Tennis Club/);
  assert.doesNotMatch(html, /NTRP 3\.0|NTRP 3\.5|NTRP 4\.0|NTRP 4\.5/);
  assert.match(html, /会员登录/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the member dashboard behind server-side sign-in", async () => {
  const worker = await getWorker();
  const response = await worker.fetch(
    new Request("http://localhost/member", { redirect: "manual", headers: { accept: "text/html" } }),
    env,
    context,
  );

  assert.ok([302, 303, 307, 308].includes(response.status));
  assert.match(response.headers.get("location") ?? "", /^\/signin-with-chatgpt\?return_to=/);
});
