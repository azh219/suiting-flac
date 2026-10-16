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

  const comments = config.comments || {};
  const loadButton = document.getElementById("load-comments");
  const commentsStatus = document.getElementById("comments-status");
  const commentsWidget = document.getElementById("comments-widget");
  const validId = value => typeof value === "string" && /^[A-Za-z0-9_-]{4,128}$/.test(value);
  if (loadButton && commentsStatus && commentsWidget &&
      comments.repo === "azh219/suiting-flac" && validId(comments.repoId) &&
      validId(comments.categoryId) && comments.category === "Announcements") {
    loadButton.hidden = false;
    commentsStatus.textContent = "点击加载评论，通过 giscus 连接 GitHub Discussions。";
    loadButton.addEventListener("click", () => {
      loadButton.disabled = true;
      commentsStatus.textContent = "正在加载评论；也可以直接在 GitHub 参与讨论。";
      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      const attributes = {
        "data-repo": comments.repo,
        "data-repo-id": comments.repoId,
        "data-category": comments.category,
        "data-category-id": comments.categoryId,
        "data-mapping": "specific",
        "data-term": "suiting-flac-community",
        "data-strict": "1",
        "data-reactions-enabled": "1",
        "data-emit-metadata": "0",
        "data-input-position": "top",
        "data-theme": "light",
        "data-lang": "zh-CN",
        "crossorigin": "anonymous"
      };
      Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
      script.async = true;
      const slowTimer = setTimeout(() => {
        commentsStatus.textContent = "评论加载较慢，可通过右侧链接在 GitHub 查看和留言。";
      }, 15000);
      script.onload = () => {
        clearTimeout(slowTimer);
        loadButton.hidden = true;
        commentsStatus.textContent = "评论由 GitHub Discussions 提供；若未显示，可直接在 GitHub 参与。";
      };
      script.onerror = () => {
        clearTimeout(slowTimer);
        script.remove();
        loadButton.disabled = false;
        commentsStatus.textContent = "暂时无法加载评论。可以重试，或直接在 GitHub 参与讨论。";
      };
      commentsWidget.appendChild(script);
    });
  }
})();
