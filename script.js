(() => {
  const getStoredLanguage = () => {
    try {
      const value = localStorage.getItem('profile-language');
      return ['en', 'ja', 'zh'].includes(value) ? value : null;
    } catch {
      return null;
    }
  };

  const isEnglishEntry = location.pathname === '/' || location.pathname.endsWith('/index.html');
  if (isEnglishEntry) {
    const storedLanguage = getStoredLanguage();
    let sameOriginReferrer = false;
    try {
      sameOriginReferrer = Boolean(document.referrer) && new URL(document.referrer).origin === location.origin;
    } catch {
      sameOriginReferrer = false;
    }

    if (storedLanguage !== 'en' && (!sameOriginReferrer || storedLanguage)) {
      const systemLanguage = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
      const preferredLanguage = storedLanguage || (systemLanguage.startsWith('ja') ? 'ja' : systemLanguage.startsWith('zh') ? 'zh' : 'en');
      const target = preferredLanguage === 'ja' ? '/ja.html' : preferredLanguage === 'zh' ? '/zh.html' : null;
      if (target) {
        location.replace(`${target}${location.hash || ''}`);
        return;
      }
    }
  }

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  const removeExternalNavLinks = () => {
    document.querySelector('[data-nav] a[href^="/scales/"]')?.remove();
  };

  loadScript('profile-extra.js?v=20260829-2')
    .then(() => loadScript('profile-ui.js?v=20260829-11'))
    .then(() => loadScript('site-core.js?v=20260829-1'))
    .then(() => loadScript('profile-lang.js?v=20260829-2'))
    .then(() => {
      removeExternalNavLinks();
      window.refreshProfileUI?.();
      if (document.documentElement.lang === 'ja') {
        document.querySelectorAll('a, .section-index').forEach((el) => {
          if (el.textContent.includes('学術貢献的・社会的貢献')) {
            el.textContent = el.textContent.replaceAll('学術貢献的・社会的貢献', '学術的貢献・社会的貢献');
          }
        });
      }
    })
    .catch((error) => {
      console.error('Failed to initialize profile enhancements.', error);
      if (!document.querySelector('script[src^="site-core.js"]')) {
        loadScript('site-core.js?v=20260829-1').then(() => loadScript('profile-lang.js?v=20260829-2')).then(() => {
          removeExternalNavLinks();
          window.refreshProfileUI?.();
        });
      } else {
        removeExternalNavLinks();
        window.refreshProfileUI?.();
      }
    });
})();