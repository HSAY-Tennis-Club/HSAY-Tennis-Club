const GITHUB_PAGES_PREFIX = "/HSAY-Tennis-Club";

/**
 * Build an internal URL that works both at the domain root and under the
 * GitHub Pages project prefix used by the public static preview.
 */
export function sitePath(path = "") {
  const normalizedPath = path.replace(/^\/+/, "");
  const currentPath = typeof window === "undefined" ? "" : window.location.pathname;
  const isGitHubPagesProject =
    currentPath === GITHUB_PAGES_PREFIX || currentPath.startsWith(`${GITHUB_PAGES_PREFIX}/`);
  const prefix = isGitHubPagesProject ? GITHUB_PAGES_PREFIX : "";
  return `${prefix}/${normalizedPath}`;
}
