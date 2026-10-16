(() => {
  "use strict";
  const config = window.SUITING_SITE_CONFIG || {};

  // Disallow protocol-relative URLs, backslashes and parent-directory traversal.
  function safeUrl(value) {
    if (typeof value !== "string" || !value || value !== value.trim()) return null;
    if (/[\\\u0000-\u0020\u007f]/.test(value) || value.startsWith("//")) return null;
    try {
      const decoded = decodeURIComponent(value);
      if (decoded.includes("\\") || decoded.split(/[/?#]/).includes("..")) return null;
      if (/^https:\/\//i.test(value)) {
        const url = new URL(value);
        return url.hostname && !url.username && !url.password ? url.href : null;
      }
      if (/^(?:\.\/)?[a-zA-Z0-9_-]/.test(value) && !/^[^/?#]*:/.test(value)) {
        const url = new URL(value, window.location.href);
        return url.origin === window.location.origin ? value : null;
      }
    } catch (_) { /* Invalid configuration falls back to the working default. */ }
    return null;
  }

  const downloadUrl = safeUrl(config.macDownloadUrl);
  const download = document.getElementById("mac-download");
  if (downloadUrl && download) {
    download.href = downloadUrl;
    // Cross-origin downloads are controlled by the release server.
    if (new URL(downloadUrl, window.location.href).origin !== window.location.origin) {
      download.removeAttribute("download");
    }
  }
  const repositoryUrl = safeUrl(config.repositoryUrl);
  const repository = document.getElementById("repo-link");
  if (repositoryUrl && repository) {
    repository.href = repositoryUrl;
    repository.hidden = false;
  }
})();
