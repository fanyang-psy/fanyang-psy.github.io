(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('.tab[data-target]')];
    const panels = [...group.querySelectorAll('.tab-panel[id]')];
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
      panels.forEach((panel) => panel.classList.toggle('active', panel.id === target));
    }));
  });
})();
