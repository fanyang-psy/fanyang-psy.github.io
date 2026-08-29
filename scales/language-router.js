(() => {
  const preferenceKey = 'profile-language';
  const normalize = (value = '') => {
    const v = String(value).toLowerCase();
    if (v.startsWith('ja')) return 'ja';
    if (v.startsWith('zh')) return 'zh';
    return 'en';
  };

  const rootEntry = location.pathname === '/scales/' || location.pathname === '/scales/index.html';
  if (rootEntry) {
    let stored = '';
    try { stored = localStorage.getItem(preferenceKey) || ''; } catch (_) {}
    const detected = stored || normalize((navigator.languages && navigator.languages[0]) || navigator.language || 'en');
    const target = detected === 'ja' ? '/scales/ja.html' : detected === 'zh' ? '/scales/zh.html' : '';
    if (target) {
      location.replace(target + location.search + location.hash);
      return;
    }
  }

  const currentLanguage = () => {
    if (location.pathname.endsWith('/ja.html')) return 'ja';
    if (location.pathname.endsWith('/zh.html')) return 'zh';
    return 'en';
  };

  const languageHref = (language, hash = '') => {
    const base = language === 'ja' ? '/scales/ja.html' : language === 'zh' ? '/scales/zh.html' : '/scales/';
    return `${base}${hash}`;
  };

  const rememberLanguage = (language) => {
    try { localStorage.setItem(preferenceKey, language); } catch (_) {}
  };

  document.addEventListener('DOMContentLoaded', () => {
    const language = currentLanguage();

    document.querySelectorAll('.lang-switch a[href]').forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const selected = href.includes('ja.html') ? 'ja' : href.includes('zh.html') ? 'zh' : 'en';
        rememberLanguage(selected);
      });
    });

    const style = document.createElement('style');
    style.textContent = `
      .hero-meta{align-items:center}
      .hero-meta .scale-jump-pill{cursor:pointer;text-decoration:none;color:var(--text);background:var(--card);transition:border-color .16s ease,background .16s ease,transform .16s ease}
      .hero-meta .scale-jump-pill:hover{border-color:var(--accent);background:var(--accent-soft);transform:translateY(-1px)}
      .hero-meta .update-pill{opacity:.8}
      .scale-language-tabs{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:16px}
      .scale-language-tabs .version-label{margin-right:3px;color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.035em}
      .scale-language-tabs a{display:inline-flex;align-items:center;justify-content:center;min-height:29px;padding:3px 10px;border:1px solid var(--line);border-radius:999px;color:var(--muted);font-size:11px;font-weight:750;line-height:1;text-decoration:none;transition:border-color .16s ease,background .16s ease,color .16s ease}
      .scale-language-tabs a:hover{border-color:var(--accent);color:var(--text)}
      .scale-language-tabs a[aria-current="true"]{border-color:var(--accent);background:var(--accent-soft);color:var(--text)}
      @media(max-width:560px){.scale-language-tabs{margin-top:14px}.scale-language-tabs .version-label{width:100%;margin-bottom:2px}}
    `;
    document.head.appendChild(style);

    const heroMeta = document.querySelector('.hero-meta');
    if (heroMeta) {
      const pills = Array.from(heroMeta.querySelectorAll('.pill'));
      const targets = ['#ehars', '#lms-j'];
      pills.slice(0, 2).forEach((pill, index) => {
        const link = document.createElement('a');
        link.className = `${pill.className} scale-jump-pill`;
        link.href = targets[index];
        link.textContent = pill.textContent;
        link.setAttribute('aria-label', `${pill.textContent.trim()} — jump to scale`);
        pill.replaceWith(link);
      });
      const lastPill = heroMeta.querySelector('.pill:last-child');
      if (lastPill && !lastPill.classList.contains('scale-jump-pill')) lastPill.classList.add('update-pill');
    }

    const labels = {
      en: 'Language version',
      ja: '言語版',
      zh: '语言版本'
    };
    const languageNames = [
      ['en', 'EN'],
      ['ja', '日本語'],
      ['zh', '中文']
    ];

    document.querySelectorAll('.scale-section[id]').forEach((section) => {
      const title = section.querySelector('.scale-title');
      if (!title || title.querySelector('.scale-language-tabs')) return;
      const hash = `#${section.id}`;
      const tabs = document.createElement('div');
      tabs.className = 'scale-language-tabs';
      tabs.setAttribute('aria-label', labels[language]);

      const label = document.createElement('span');
      label.className = 'version-label';
      label.textContent = labels[language];
      tabs.appendChild(label);

      languageNames.forEach(([code, name]) => {
        const link = document.createElement('a');
        link.href = languageHref(code, hash);
        link.textContent = name;
        link.hreflang = code === 'zh' ? 'zh-Hans' : code;
        if (code === language) link.setAttribute('aria-current', 'true');
        link.addEventListener('click', () => rememberLanguage(code));
        tabs.appendChild(link);
      });
      title.appendChild(tabs);
    });
  });
})();
