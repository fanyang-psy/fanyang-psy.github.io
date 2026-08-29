(() => {
  const site = document.createElement('script');
  site.src = 'site.js?v=20260829-1';
  site.async = false;

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
  };

  document.head.appendChild(site);
})();
