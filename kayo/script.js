(() => {
  const analytics = document.createElement('script');
  analytics.src = '/visitor-stats.js';
  analytics.defer = true;
  document.head.appendChild(analytics);

  const site = document.createElement('script');
  site.src = 'site.js?v=20260829-2';
  site.async = false;

  const chineseNameReplacements = [
    ['唐致遠', '唐致远'],
    ['紀暁棠', '纪晓棠'],
    ['呉双', '吴双'],
    ['楊 帆', '杨帆'],
    ['張 澤', '张泽'],
    ['程 略', '程略'],
    ['鄧 娟', '邓娟'],
    ['康 楠', '康楠'],
    ['邱 添', '邱添'],
    ['万 珽', '万珽'],
    ['鄭 旺', '郑旺']
  ];

  const replaceMany = (value) => chineseNameReplacements.reduce((text, [from, to]) => text.split(from).join(to), value);

  const polishChineseNames = () => {
    document.querySelectorAll('.copy-zh').forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) walker.currentNode.nodeValue = replaceMany(walker.currentNode.nodeValue);
    });

    if ((document.documentElement.dataset.lang || '').startsWith('zh')) {
      document.querySelectorAll('.member-list li, .event-presenter').forEach((root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) walker.currentNode.nodeValue = replaceMany(walker.currentNode.nodeValue);
      });
    }
  };

  const setInitialLanguageFromSystem = () => {
    let stored = '';
    try { stored = localStorage.getItem('kayo-language') || ''; } catch (_) {}
    if (stored) return;
    const raw = ((navigator.languages && navigator.languages[0]) || navigator.language || 'ja').toLowerCase();
    const preferred = raw.startsWith('zh') ? 'zh' : raw.startsWith('ja') ? 'ja' : 'en';
    const button = document.querySelector(`[data-lang="${preferred}"]`);
    button?.click();
  };

  site.onload = () => {
    const event = document.querySelector('#event-2026-network') || document.querySelector('.archive-card.latest .event');
    if (event && !event.querySelector('.event-presenter')) {
      const presenter = document.createElement('span');
      presenter.className = 'event-presenter';
      presenter.innerHTML = '<span class="copy-ja">発表者：吴涵（東京大学大学院）</span><span class="copy-en">Presenter: 吴涵 (Graduate School, The University of Tokyo)</span><span class="copy-zh">报告者：吴涵（东京大学大学院）</span>';
      event.appendChild(presenter);
    }

    if (!document.querySelector('#event-presenter-style')) {
      const style = document.createElement('style');
      style.id = 'event-presenter-style';
      style.textContent = '.event-presenter{display:block;margin-top:8px;color:var(--muted);font-size:12px;font-weight:650;line-height:1.5}';
      document.head.appendChild(style);
    }

    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => queueMicrotask(polishChineseNames));
    });

    setInitialLanguageFromSystem();
    queueMicrotask(polishChineseNames);
    setTimeout(polishChineseNames, 80);
  };

  document.head.appendChild(site);
})();
