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

  const apaReferences = {
    'ehars': [
      'Yang, F., &amp; Oshio, A. (2025). Using attachment theory to conceptualize and measure the experiences in human-AI relationships. <em>Current Psychology, 44</em>(11), 10658–10669. <a href="https://doi.org/10.1007/s12144-025-07917-6" target="_blank" rel="noopener">https://doi.org/10.1007/s12144-025-07917-6</a>',
      'Yang, F., &amp; Oshio, A. (2026). Attachment towards generative AI influences self–AI agreement in personality reports. <em>Asian Journal of Social Psychology, 29</em>(3), e70102. <a href="https://doi.org/10.1111/ajsp.70102" target="_blank" rel="noopener">https://doi.org/10.1111/ajsp.70102</a>'
    ],
    'lms-j': [
      'Yang, F., Sawada, N., &amp; Oshio, A. (2026). Development and validation of the Japanese version of the Langer Mindfulness Scale. <em>Japanese Psychological Research, 68</em>(2), 298–309. <a href="https://doi.org/10.1111/jpr.12490" target="_blank" rel="noopener">https://doi.org/10.1111/jpr.12490</a>',
      'Pirson, M. A., Langer, E., &amp; Zilcha, S. (2018). Enabling a socio-cognitive perspective of mindfulness: The development and validation of the Langer mindfulness scale. <em>Journal of Adult Development, 25</em>(3), 168–185. <a href="https://doi.org/10.1007/s10804-018-9282-4" target="_blank" rel="noopener">https://doi.org/10.1007/s10804-018-9282-4</a>'
    ]
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
      .refs .ref p{line-height:1.72}
      .refs .ref a{overflow-wrap:anywhere}

      html[lang="zh-CN"] body{
        font-family:"PingFang SC","Hiragino Sans GB","Noto Sans CJK SC","Noto Sans SC","Microsoft YaHei","Helvetica Neue",Arial,sans-serif;
        letter-spacing:0;
      }
      html[lang="zh-CN"] .hero h1,
      html[lang="zh-CN"] .section-head h2,
      html[lang="zh-CN"] .scale-title h2{
        font-family:"PingFang SC","Hiragino Sans GB","Noto Sans CJK SC","Noto Sans SC","Microsoft YaHei",sans-serif;
        font-weight:650;
        letter-spacing:-.035em;
      }
      html[lang="zh-CN"] .section-head h2{font-weight:620;letter-spacing:-.025em}
      html[lang="zh-CN"] .scale-card h3,
      html[lang="zh-CN"] .panel h3,
      html[lang="zh-CN"] .items-head h3,
      html[lang="zh-CN"] .item-group h4,
      html[lang="zh-CN"] .status-row,
      html[lang="zh-CN"] .scale-tags,
      html[lang="zh-CN"] .pill{font-family:inherit}
      html[lang="zh-CN"] .scale-card h3{font-weight:650;letter-spacing:-.012em}
      html[lang="zh-CN"] .hero-copy,
      html[lang="zh-CN"] .section-head p,
      html[lang="zh-CN"] .lead,
      html[lang="zh-CN"] .panel p,
      html[lang="zh-CN"] .item-list{line-height:1.8}

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
      if (title && !title.querySelector('.scale-language-tabs')) {
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
      }

      const refs = apaReferences[section.id];
      if (refs) {
        const refNodes = section.querySelectorAll('.refs .ref p');
        refs.forEach((html, index) => {
          if (refNodes[index]) refNodes[index].innerHTML = html;
        });
      }
    });
  });
})();
