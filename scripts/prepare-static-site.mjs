import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const outputRoot = join(projectRoot, "static-dist");
const manifestPath = join(outputRoot, ".vite", "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const entries = {
  home: "static-entry.tsx",
  member: "static-member-entry.tsx",
  about: "static-about-entry.tsx",
};

function findEntry(source) {
  const entry = manifest[source];
  if (!entry?.file) {
    throw new Error(`Missing Vite manifest entry for ${source}`);
  }
  return entry;
}

function collectCss(entry) {
  const css = new Set(entry.css ?? []);
  for (const importedEntry of entry.imports ?? []) {
    const imported = manifest[importedEntry];
    if (imported) {
      for (const asset of collectCss(imported)) css.add(asset);
    }
  }
  return css;
}

function renderHtml(title, entry, assetPrefix) {
  const css = [...collectCss(entry)]
    .map((asset) => `<link rel="stylesheet" crossorigin href="${assetPrefix}${asset}">`)
    .join("");
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><script type="module" crossorigin src="${assetPrefix}${entry.file}"></script>${css}</head><body><div id="root"></div></body></html>`;
}

const home = findEntry(entries.home);
const member = findEntry(entries.member);
const about = findEntry(entries.about);

writeFileSync(join(outputRoot, "index.html"), renderHtml("HSAY Tennis Club", home, ""));

mkdirSync(join(outputRoot, "member"), { recursive: true });
writeFileSync(join(outputRoot, "member", "index.html"), renderHtml("HSAY 我的", member, "../"));

mkdirSync(join(outputRoot, "about"), { recursive: true });
writeFileSync(join(outputRoot, "about", "index.html"), renderHtml("关于 HSAY｜THE HSAY CODE", about, "../"));

console.log(`Prepared static site from ${Object.values(entries).join(", ")}`);
