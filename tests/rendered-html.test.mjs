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
  assert.match(html, /场下是姐妹/);
  assert.match(html, /刚刚撕完/);
  assert.match(html, /本周战力榜/);
  assert.match(html, /网网相对/);
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
