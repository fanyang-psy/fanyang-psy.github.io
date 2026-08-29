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

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-switch a[href]').forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const language = href.includes('ja.html') ? 'ja' : href.includes('zh.html') ? 'zh' : 'en';
        try { localStorage.setItem(preferenceKey, language); } catch (_) {}
      });
    });
  });
})();
