"use strict";
(() => {
  const labels = {
    "zh-Hans": { support: "支持", privacy: "隐私政策", terms: "使用说明" },
    "zh-Hant": { support: "支援", privacy: "隱私權政策", terms: "使用說明" },
    en: { support: "Support", privacy: "Privacy Policy", terms: "Usage Guide" }
  };
  const pageKey = { "index.html": "support", "privacy.html": "privacy", "terms.html": "terms" };
  function selectLanguage() {
    const requested = location.hash.slice(1);
    const fallback = Object.prototype.hasOwnProperty.call(labels, document.documentElement.lang) ? document.documentElement.lang : "zh-Hans";
    const lang = Object.prototype.hasOwnProperty.call(labels, requested) ? requested : fallback;
    document.documentElement.lang = lang;
    for (const article of document.querySelectorAll("article[lang]")) {
      article.hidden = article.id !== lang;
      if (!article.hidden) document.title = article.dataset.pageTitle;
    }
    for (const link of document.querySelectorAll("[data-language]")) {
      if (link.dataset.language === lang) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
    for (const link of document.querySelectorAll("[data-page]")) {
      link.href = link.dataset.page + "#" + lang;
      if (link.closest(".page-nav")) link.textContent = labels[lang][pageKey[link.dataset.page]];
    }
  }
  addEventListener("hashchange", selectLanguage);
  selectLanguage();
})();
