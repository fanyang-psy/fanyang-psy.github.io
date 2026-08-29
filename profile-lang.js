(() => {
  const rawLang = document.documentElement.lang || 'en';
  const lang = rawLang.startsWith('ja') ? 'ja' : rawLang.startsWith('zh') ? 'zh' : 'en';
  const navActions = document.querySelector('.nav-actions');

  const languageLinks = {
    en: { href: '/', label: 'EN' },
    ja: { href: '/ja.html', label: 'JP' },
    zh: { href: '/zh.html', label: '中文' }
  };

  const rememberLanguage = (code) => {
    try {
      localStorage.setItem('profile-language', code);
    } catch {
      /* Preference storage can be unavailable in strict privacy modes. */
    }
  };

  if (navActions) {
    navActions.querySelector('.language-link')?.remove();
    navActions.querySelector('.profile-language-switch')?.remove();
    const wrap = document.createElement('div');
    wrap.className = 'profile-language-switch';
    wrap.setAttribute('aria-label', lang === 'ja' ? '言語' : 'Language');
    Object.entries(languageLinks).forEach(([code, item]) => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.className = 'profile-language-link';
      a.addEventListener('click', () => rememberLanguage(code));
      if (code === lang) a.setAttribute('aria-current', 'page');
      wrap.appendChild(a);
    });
    navActions.insertBefore(wrap, navActions.firstChild);
  }

  const scaleHref = lang === 'ja' ? '/scales/?lang=ja' : lang === 'zh' ? '/scales/zh.html' : '/scales/?lang=en';
  document.querySelectorAll('a[href^="/scales/"]').forEach((a) => {
    a.href = scaleHref;
  });

  if (lang === 'ja') {
    document.querySelectorAll('a, .section-index').forEach((el) => {
      if (el.textContent.includes('学術貢献的・社会的貢献')) {
        el.textContent = el.textContent.replaceAll('学術貢献的・社会的貢献', '学術的貢献・社会的貢献');
      }
    });

    const research = document.querySelector('#research');
    const grid = research?.querySelector('.jp-topic-grid');
    if (grid && grid.dataset.aligned !== 'true') {
      const cards = [
        {
          title: '人と生成AIとの愛着関係',
          copy: '愛着理論を用いて、生成AIに援助を求める、信頼する、自己開示するといった行動や、心理的なつながりが形成される過程を研究しています。',
          tags: ['尺度開発', 'AI愛着', 'パーソナリティ推定'],
          svg: '<svg viewBox="0 0 80 80"><circle cx="30" cy="40" r="20"></circle><circle cx="50" cy="40" r="20"></circle><path d="M40 19v42"></path></svg>'
        },
        {
          title: '愛着安定性と認知',
          copy: '愛着安定性が、探索、自己理解、自己効力感、思考様式、社会的認知とどのように関わるのかを、時間的な変化も含めて検討しています。',
          tags: ['安定性プライミング', '縦断モデル', '自己概念'],
          svg: '<svg viewBox="0 0 80 80"><path d="M15 56c15-2 17-34 33-34 8 0 12 8 17 18"></path><circle cx="15" cy="56" r="5"></circle><circle cx="48" cy="22" r="5"></circle><circle cx="65" cy="40" r="5"></circle></svg>'
        },
        {
          title: 'マインドフルネス・自己・レジリエンス',
          copy: '愛着安定性と、自己概念の明確さ、レジリエンス、セルフ・コンパッション、個人的成長を結ぶ心理過程を検討しています。',
          tags: ['マインドフルネス', 'レジリエンス', '個人的成長'],
          svg: '<svg viewBox="0 0 80 80"><path d="M40 66c0-22 0-36 0-52"></path><path d="M40 31c-13 0-21-7-23-17 13 0 21 7 23 17ZM40 47c13 0 21-7 23-17-13 0-21 7-23 17Z"></path></svg>'
        }
      ];

      grid.classList.remove('jp-topic-grid');
      grid.classList.add('research-grid');
      grid.dataset.aligned = 'true';

      [...grid.querySelectorAll('.jp-topic')].forEach((article, index) => {
        const config = cards[index];
        if (!config) return;
        article.classList.remove('jp-topic');
        article.classList.add('research-card');

        const number = article.querySelector(':scope > span');
        if (number) number.className = 'card-number';

        const symbol = document.createElement('div');
        symbol.className = 'card-symbol';
        symbol.setAttribute('aria-hidden', 'true');
        symbol.innerHTML = config.svg;
        number?.insertAdjacentElement('afterend', symbol);

        const h3 = article.querySelector('h3');
        const p = article.querySelector('p');
        if (h3) h3.textContent = config.title;
        if (p) p.textContent = config.copy;

        const tags = document.createElement('ul');
        tags.className = 'tag-list';
        tags.setAttribute('aria-label', `${config.title}の研究キーワード`);
        config.tags.forEach((tag) => {
          const li = document.createElement('li');
          li.textContent = tag;
          tags.appendChild(li);
        });
        article.appendChild(tags);
      });

      const title = research.querySelector('#research-title');
      if (title) title.textContent = '相互に関連する三つの研究テーマ。';
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    .profile-language-switch{display:flex;align-items:center;gap:2px;padding:2px;border:1px solid var(--line);border-radius:999px;background:color-mix(in srgb,var(--bg) 82%,transparent)}
    .profile-language-link{display:inline-flex;align-items:center;justify-content:center;min-height:28px;padding:0 8px;border-radius:999px;text-decoration:none;font-size:10px;font-weight:750;letter-spacing:.03em;color:var(--muted)}
    .profile-language-link:hover{color:var(--text)}
    .profile-language-link[aria-current="page"]{background:var(--text);color:var(--bg)}
    @media(max-width:680px){.profile-language-link{padding:0 7px;font-size:9px}.profile-language-switch{margin-right:2px}}
  `;
  document.head.appendChild(style);
})();