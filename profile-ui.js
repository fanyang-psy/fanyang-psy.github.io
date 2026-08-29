(() => {
  const root = document.documentElement;
  const isJapanese = root.lang === 'ja';
  const nav = document.querySelector('[data-nav]');

  const labels = isJapanese
    ? {
        about: '自己紹介',
        research: '研究テーマ',
        publications: '論文',
        history: '履歴',
        'media-service': '学術貢献的・社会的貢献',
        contact: '連絡先'
      }
    : {
        about: 'About',
        research: 'Research',
        publications: 'Publications',
        history: 'CV',
        'media-service': 'Academic & Social Contributions',
        contact: 'Contact'
      };

  const normalizeHistory = () => {
    const history = document.querySelector('#history') || document.querySelector(isJapanese ? '#activities' : '#cv');
    if (!history) return;

    history.id = 'history';
    history.setAttribute('aria-labelledby', 'history-title');

    if (nav) {
      const historyLink = nav.querySelector('a[href="#history"], a[href="#activities"], a[href="#cv"]');
      if (historyLink) {
        historyLink.href = '#history';
        if (historyLink.textContent.trim() !== labels.history) historyLink.textContent = labels.history;
      }
    }

    if (history.dataset.normalized === 'true') return;
    history.dataset.normalized = 'true';

    history.innerHTML = `
      <div class="container">
        <div class="section-heading heading-row history-heading">
          <div>
            <p class="section-index">04 — ${labels.history}</p>
            <h2 id="history-title">${isJapanese ? '履歴。' : 'Academic CV.'}</h2>
          </div>
          <p>${isJapanese ? '職歴、学歴、研究費、受賞、学会活動を簡潔にまとめています。' : 'A concise record of academic appointments, education, funding, awards, and professional service.'}</p>
        </div>
        <div class="history-grid">
          <section class="history-block" aria-labelledby="history-appointments-title">
            <h3 id="history-appointments-title">${isJapanese ? '職歴' : 'Academic Appointments'}</h3>
            <ol class="history-list">
              <li><span>${isJapanese ? '2026.04—現在' : 'Apr 2026—present'}</span><div><strong>${isJapanese ? '助教' : 'Assistant Professor'}</strong><p>${isJapanese ? '早稲田大学 文学部心理学コース' : 'Faculty of Letters, Arts and Sciences, Waseda University'}</p></div></li>
              <li><span>2025.09—2026.03</span><div><strong>${isJapanese ? '非常勤講師' : 'Part-Time Lecturer'}</strong><p>${isJapanese ? '東京家政大学' : 'Tokyo Kasei University'}</p></div></li>
            </ol>
          </section>
          <section class="history-block" aria-labelledby="history-education-title">
            <h3 id="history-education-title">${isJapanese ? '学歴' : 'Education'}</h3>
            <ol class="history-list">
              <li><span>2025</span><div><strong>${isJapanese ? '博士（文学）' : 'Ph.D. in Literature'}</strong><p>${isJapanese ? '早稲田大学 · 心理学' : 'Waseda University · Psychology'}</p></div></li>
              <li><span>2022</span><div><strong>${isJapanese ? '修士（心理学）' : 'Master’s in Psychology'}</strong><p>${isJapanese ? '日本大学' : 'Nihon University'}</p></div></li>
            </ol>
          </section>
          <section class="history-block history-service-block" aria-labelledby="history-service-title">
            <h3 id="history-service-title">${isJapanese ? '研究費・受賞・学会活動' : 'Funding, awards & professional service'}</h3>
            <ol class="history-list">
              <li><span>${isJapanese ? '2025.07—2027.03' : 'Jul 2025—Mar 2027'}</span><div><strong>${isJapanese ? '日本学術振興会 科研費・研究活動スタート支援' : 'JSPS KAKENHI · Grant-in-Aid for Research Activity Start-up'}</strong><p><a class="cv-grant-link" href="https://kaken.nii.ac.jp/${isJapanese ? 'ja' : 'en'}/grant/KAKENHI-PROJECT-25K23312" target="_blank" rel="noopener">${isJapanese ? '愛着安定性プライミングが認知および社会的認知に及ぼす影響の検討' : 'An Examination of the Effects of Attachment Security Priming on Cognition and Social Cognition'} <span class="text-arrow" aria-hidden="true">↗︎</span></a><br><span class="cv-grant-meta">${isJapanese ? '研究代表者 · 課題番号 25K23312' : 'Principal Investigator · Grant No. 25K23312'}</span></p></div></li>
              <li><span>2025</span><div><strong>${isJapanese ? '若手会員研究奨励賞' : 'Young Member Research Encouragement Award'}</strong><p>${isJapanese ? '日本応用心理学会' : 'The Japanese Society of Applied Psychology'}</p></div></li>
              <li><span>${isJapanese ? '2026.04—現在' : 'Apr 2026—present'}</span><div><strong>${isJapanese ? '日本心理学会 広報委員会 委員' : 'Committee Member'}</strong><p>${isJapanese ? '日本心理学会 広報委員会' : 'Public Relations Committee, Japanese Psychological Association'}</p></div></li>
              <li><span>${isJapanese ? '2022.12—2026.12' : 'Dec 2022—Dec 2026'}</span><div><strong>${isJapanese ? '日本心理学会 広報委員会 SNS担当' : 'SNS Manager'}</strong><p>${isJapanese ? '日本心理学会 広報委員会' : 'Public Relations Committee, Japanese Psychological Association'}</p></div></li>
            </ol>
          </section>
        </div>
      </div>`;
  };

  const ensureMediaNav = () => {
    const section = document.querySelector('#media-service');
    if (!nav || !section) return;
    let link = nav.querySelector('a[href="#media-service"]');
    if (!link) {
      link = document.createElement('a');
      link.href = '#media-service';
      const contact = nav.querySelector('a[href="#contact"]');
      nav.insertBefore(link, contact || null);
    }
    if (link.textContent.trim() !== labels['media-service']) link.textContent = labels['media-service'];
  };

  const normalizeMedia = () => {
    const section = document.querySelector('#media-service');
    if (!section) return;

    const index = section.querySelector('.section-index');
    const heading = section.querySelector('.media-service-heading h2');
    const intro = section.querySelector('.media-service-heading > p');
    const indexText = `05 — ${labels['media-service']}`;
    const headingText = isJapanese ? '査読・メディア報道。' : 'Peer review & media coverage.';
    const introText = isJapanese
      ? '学術誌の査読と、研究に関する主なメディア報道を簡潔にまとめています。'
      : 'Peer-review service for academic journals and selected media coverage of my research.';
    if (index && index.textContent.trim() !== indexText) index.textContent = indexText;
    if (heading && heading.textContent.trim() !== headingText) heading.textContent = headingText;
    if (intro && intro.textContent.trim() !== introText) intro.textContent = introText;

    const grid = section.querySelector('.media-service-grid');
    const peerReview = section.querySelector('#peer-review-title')?.closest('.media-service-block');
    const mediaCoverage = section.querySelector('#media-coverage-title')?.closest('.media-service-block');
    if (grid && peerReview && mediaCoverage && (grid.children[0] !== peerReview || grid.children[1] !== mediaCoverage)) {
      grid.append(peerReview, mediaCoverage);
    }
  };

  const syncSectionLabels = () => {
    if (!nav) return;
    Object.entries(labels).forEach(([id, label]) => {
      const link = nav.querySelector(`a[href="#${id}"]`);
      if (link && link.textContent.trim() !== label) link.textContent = label;
      const target = document.getElementById(id);
      const index = target?.querySelector('.section-index');
      if (!index || id === 'media-service') return;
      const number = index.textContent.match(/^\s*(\d+)/)?.[1];
      const next = number ? `${number} — ${label}` : null;
      if (next && index.textContent.trim() !== next) index.textContent = next;
    });
  };

  const refresh = () => {
    normalizeHistory();
    ensureMediaNav();
    normalizeMedia();
    syncSectionLabels();
  };

  window.refreshProfileUI = refresh;
  refresh();

  const style = document.createElement('style');
  style.textContent = `
    .history-heading{margin-bottom:28px}.history-heading>p{max-width:520px}
    .history-grid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,.62fr) minmax(0,1.35fr);gap:18px;align-items:start}
    .history-block{padding:22px 24px;border:1px solid var(--line);border-radius:16px;background:var(--surface-strong)}
    .history-block h3{margin:0 0 10px;padding-bottom:10px;border-bottom:1px solid var(--line);font-size:17px}
    .history-list{list-style:none;margin:0;padding:0}.history-list li{display:grid;grid-template-columns:132px 1fr;gap:16px;padding:12px 0;border-bottom:1px solid color-mix(in srgb,var(--line) 70%,transparent)}
    .history-list li:last-child{border-bottom:0}.history-list>li>span{color:var(--muted);font-size:11px;font-weight:700;line-height:1.45}.history-list strong{display:block;font-size:13px;line-height:1.4}.history-list p{margin:3px 0 0;color:var(--muted);font-size:11.5px;line-height:1.5}
    .media-service-grid{grid-template-columns:minmax(280px,.8fr) minmax(0,1.7fr)}
    @media(max-width:1080px){.history-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.history-service-block{grid-column:1/-1}}
    @media(max-width:920px){
      .site-header.is-scrolled{-webkit-backdrop-filter:none!important;backdrop-filter:none!important;background:color-mix(in srgb,var(--bg) 96%,transparent)}
      .site-header{isolation:isolate}
      .primary-nav{z-index:110!important;top:0!important;right:0!important;bottom:0!important;left:0!important;height:100dvh;min-height:100svh;max-height:100dvh;justify-content:flex-start!important;gap:18px!important;padding:max(104px,calc(env(safe-area-inset-top) + 88px)) 10vw max(36px,calc(env(safe-area-inset-bottom) + 24px))!important;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;visibility:hidden;transform:translate3d(0,-10px,0)!important;will-change:opacity,transform}
      .primary-nav.is-open{visibility:visible;transform:translate3d(0,0,0)!important}
      .primary-nav a{font-size:clamp(30px,7vw,48px)!important;line-height:1.15}
      .brand,.nav-actions{position:relative;z-index:120}
    }
    @media(max-width:900px){.history-grid,.media-service-grid{grid-template-columns:1fr}.history-service-block{grid-column:auto}}
    @media(max-width:680px){.history-block{padding:18px}.history-list li{grid-template-columns:1fr;gap:4px}.history-heading{margin-bottom:20px}}
  `;
  document.head.appendChild(style);
})();