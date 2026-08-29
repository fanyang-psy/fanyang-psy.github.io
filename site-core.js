const root = document.documentElement;
const header = document.querySelector('[data-header]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const isJapanese = root.lang === 'ja';
const heroName = document.querySelector('#hero-title');
const heroRole = document.querySelector('.hero-role');
const scaleLanguage = isJapanese ? 'ja' : 'en';
const scaleHref = `/scales/?lang=${scaleLanguage}`;
const setScaleLanguage = () => localStorage.setItem('scales-language', scaleLanguage);

if (nav && !nav.querySelector('a[href^="/scales/"]')) {
  const link = document.createElement('a');
  link.href = scaleHref;
  link.textContent = isJapanese ? '心理尺度' : 'Scales';
  link.addEventListener('click', setScaleLanguage);
  const publications = nav.querySelector('a[href="#publications"]');
  nav.insertBefore(link, publications || nav.querySelector('a[href="#contact"]'));
}

const heroActions = document.querySelector('.hero-actions');
if (heroActions) {
  const emailButton = heroActions.querySelector('a[href^="mailto:"]');
  if (!heroActions.querySelector('a[href^="/scales/"]')) {
    const scaleButton = document.createElement('a');
    scaleButton.className = 'button button-secondary scale-resource-button';
    scaleButton.href = scaleHref;
    scaleButton.addEventListener('click', setScaleLanguage);
    scaleButton.innerHTML = `${isJapanese ? '作成した心理尺度' : 'Psychological Scales'} <span class="text-arrow" aria-hidden="true">↗︎</span>`;
    heroActions.insertBefore(scaleButton, emailButton || null);
  }
  if (!heroActions.querySelector('a[href="/kayo/"]')) {
    const kayoButton = document.createElement('a');
    kayoButton.className = 'button button-secondary';
    kayoButton.href = '/kayo/';
    kayoButton.innerHTML = `${isJapanese ? '日中火曜心理学研究会' : 'Kayo Psychology Seminar'} <span class="text-arrow" aria-hidden="true">↗︎</span>`;
    heroActions.insertBefore(kayoButton, emailButton || null);
  }
}

const textArrows = new Set(['↗', '→', '↓', '↑']);
document.querySelectorAll('span[aria-hidden="true"]').forEach((span) => {
  const raw = span.textContent.trim().replace(/[\uFE0E\uFE0F]/g, '');
  if (!textArrows.has(raw)) return;
  span.textContent = `${raw}\uFE0E`;
  span.classList.add('text-arrow');
});

if (!isJapanese) {
  const researchCards = document.querySelectorAll('.research-grid .research-card');
  if (researchCards[0]) {
    const title = researchCards[0].querySelector('h3');
    const description = researchCards[0].querySelector('p');
    const topics = researchCards[0].querySelector('.tag-list');
    if (title) title.textContent = 'Human-AI Relationships';
    if (description) description.textContent = 'Applying attachment theory to understand how people seek support from, trust, disclose to, and form emotional bonds with generative AI, and to provide an attachment-based framework for understanding this emerging form of human-AI relationship.';
    if (topics) topics.setAttribute('aria-label', 'Human-AI relationships topics');
  }
  if (researchCards[1]) {
    const description = researchCards[1].querySelector('p');
    if (description) description.textContent = 'Examining the effects of attachment security on exploration, self-knowledge, efficacy, thinking style, and social cognition, as well as the psychological mechanisms through which these effects emerge.';
  }

  const researchTitle = document.querySelector('#research-title');
  if (researchTitle) researchTitle.textContent = 'Research Lines';
  const researchIntro = document.querySelector('#research .heading-row > p');
  if (researchIntro) researchIntro.textContent = 'My current research develops along three lines, all grounded in attachment theory.';

  const profileFacts = document.querySelectorAll('#about .fact-grid strong');
  if (profileFacts[2]) profileFacts[2].textContent = 'Social & Personality Psychology';
  if (profileFacts[3]) profileFacts[3].textContent = 'Public Relations Committee, Japanese Psychological Association';
  const portraitField = document.querySelector('.portrait-note strong');
  if (portraitField) portraitField.textContent = 'Social & Personality Psychology';

  const cvSection = document.querySelector('#cv');
  if (cvSection) {
    const tokyoKaseiContainer = [...cvSection.querySelectorAll('*')]
      .filter((element) => element.textContent.includes('Tokyo Kasei University') && element.textContent.includes('Part-Time Lecturer'))
      .sort((a, b) => a.textContent.length - b.textContent.length)[0];
    if (tokyoKaseiContainer) {
      const walker = document.createTreeWalker(tokyoKaseiContainer, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (/2025\s*[—–-]\s*present/i.test(node.textContent)) {
          node.textContent = node.textContent.replace(/2025\s*[—–-]\s*present/i, '2025.09—2026.03');
          break;
        }
      }
    }
    const fundingItem = [...cvSection.querySelectorAll('.timeline li')].find((item) => item.textContent.includes('JSPS KAKENHI') && item.textContent.includes('Grant-in-Aid for Research Activity Start-up'));
    if (fundingItem) {
      const period = fundingItem.querySelector(':scope > span');
      const title = fundingItem.querySelector('strong');
      const detail = fundingItem.querySelector('p');
      if (period) period.textContent = '2025.07—2027.03';
      if (title) title.textContent = 'JSPS KAKENHI · Grant-in-Aid for Research Activity Start-up';
      if (detail) detail.innerHTML = `<a class="cv-grant-link" href="https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-25K23312" target="_blank" rel="noopener">An Examination of the Effects of Attachment Security Priming on Cognition and Social Cognition <span class="text-arrow" aria-hidden="true">↗︎</span></a><br><span class="cv-grant-meta">Principal Investigator · Grant No. 25K23312</span>`;
    }
  }

  if (heroName && !heroName.querySelector('.hero-degree')) {
    const degree = document.createElement('span');
    degree.className = 'hero-degree';
    degree.textContent = 'Ph.D.';
    heroName.append(' ', degree);
  }
} else if (heroName && heroRole) {
  heroName.textContent = '楊　帆';
  const romanName = document.createElement('span');
  romanName.className = 'hero-name-roman';
  romanName.textContent = 'ヨウ　ホ・YANG, Fan';
  heroName.appendChild(romanName);

  let degree = document.querySelector('.hero-degree-ja');
  if (!degree) {
    degree = document.createElement('p');
    degree.className = 'hero-degree-ja';
    heroRole.insertAdjacentElement('beforebegin', degree);
  }
  degree.textContent = '博士（文学）';
  heroRole.textContent = '早稲田大学 文学部心理学コース · 助教';

  document.querySelectorAll('.about-copy p, .jp-topic p').forEach((element) => {
    element.textContent = element.textContent.replaceAll('自己概念の明確さ', '自己概念明確性');
  });
  const researchTitle = document.querySelector('#research-title');
  if (researchTitle) researchTitle.textContent = '愛着理論を軸に、三つの研究テーマを展開しています。';
  const jpTopics = document.querySelectorAll('.jp-topic-grid .jp-topic');
  if (jpTopics[0]) {
    const description = jpTopics[0].querySelector('p');
    if (description) description.textContent = '愛着理論を用いて、生成AIに援助を求める、信頼する、自己開示するといった行動や、心理的なつながりが形成される過程を研究しています。さらに、人と生成AIとの新しい関係のあり方を、愛着理論の観点から理解するための枠組みを提示することを目指しています。';
  }
  if (jpTopics[1]) {
    const description = jpTopics[1].querySelector('p');
    if (description) description.textContent = '愛着安定性が、探索、自己理解、自己効力感、思考様式、社会的認知などに及ぼす影響と、その影響が生じる心理的メカニズムを検討しています。';
  }

  const activitiesSection = document.querySelector('#activities');
  if (activitiesSection) {
    const index = activitiesSection.querySelector('.section-index');
    const heading = activitiesSection.querySelector('h2');
    const activityList = activitiesSection.querySelector('.jp-activity-list');
    if (index) index.textContent = '04 — 研究費・受賞・学会活動';
    if (heading) heading.textContent = '研究費・受賞・学会活動。';
    if (activityList) activityList.innerHTML = `
      <div><dt>研究費</dt><dd><strong>日本学術振興会 科研費・研究活動スタート支援</strong>（研究代表者、2025年7月—2027年3月）<br><a href="https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-25K23312" target="_blank" rel="noopener">愛着安定性プライミングが認知および社会的認知に及ぼす影響の検討 <span class="text-arrow" aria-hidden="true">↗︎</span></a><br><span class="cv-grant-meta">課題番号 25K23312</span></dd></div>
      <div><dt>受賞</dt><dd><strong>若手会員研究奨励賞</strong><br>日本応用心理学会（2025年）</dd></div>
      <div><dt>学会活動</dt><dd><strong>日本心理学会 広報委員会 委員</strong>（2026年4月—現在）</dd></div>
      <div><dt>学会活動</dt><dd><strong>日本心理学会 広報委員会 SNS担当</strong>（2022年12月—2026年12月）</dd></div>`;
  }
}

const correspondingAuthorDois = new Set([
  '10.1002/ijop.70252','10.1111/ajsp.70102','10.1027/1614-0001/a000462','10.1111/jpr.12490',
  '10.1027/1614-0001/a000444','10.1007/s12144-025-07917-6','10.5114/cipp/197265','10.1027/1614-0001/a000432',
  '10.1007/s12144-024-06310-z','10.1007/s12144-023-05250-4','10.3389/fpsyg.2023.1302197','10.1111/ajsp.70079'
]);
const publicationSection = document.querySelector('#publications');
if (publicationSection) {
  publicationSection.querySelectorAll('.compact-publication-list li').forEach((item) => {
    const doiLink = [...item.querySelectorAll('a[href*="doi.org/"]')].find((link) => correspondingAuthorDois.has(link.href.replace(/^https?:\/\/doi\.org\//i, '').replace(/\/$/, '')));
    if (!doiLink) return;
    const authorName = [...item.querySelectorAll('strong')].find((element) => element.textContent.trim() === 'Yang, F.');
    if (!authorName || authorName.nextElementSibling?.classList.contains('corresponding-author-mark')) return;
    const mark = document.createElement('sup');
    mark.className = 'corresponding-author-mark';
    mark.textContent = '*';
    mark.setAttribute('aria-hidden', 'true');
    authorName.insertAdjacentElement('afterend', mark);
  });
  const columns = publicationSection.querySelector('.publication-columns');
  if (columns && !publicationSection.querySelector('.publication-corresponding-note')) {
    const note = document.createElement('p');
    note.className = 'publication-corresponding-note';
    note.textContent = isJapanese ? '* は責任著者を示します。' : '* indicates corresponding author.';
    columns.insertAdjacentElement('afterend', note);
  }
}

const profileStyles = document.createElement('style');
profileStyles.textContent = `
html[lang="en"] body{font-family:"Avenir Next",Avenir,"SF Pro Text","Helvetica Neue",Helvetica,"Segoe UI",Arial,sans-serif}
html[lang="en"] h1,html[lang="en"] .hero-tagline,html[lang="en"] .contact-email{font-family:Charter,"Iowan Old Style",Baskerville,Georgia,serif}
html[lang="en"] h2,html[lang="en"] h3{font-family:"Avenir Next",Avenir,"SF Pro Display","Helvetica Neue",Helvetica,"Segoe UI",Arial,sans-serif;font-weight:650;letter-spacing:-.025em}
html[lang="ja"] body{font-family:"Hiragino Sans","ヒラギノ角ゴシック","Yu Gothic","游ゴシック",YuGothic,"Noto Sans JP",Meiryo,sans-serif;letter-spacing:.01em}
html[lang="ja"] h1,html[lang="ja"] h2,html[lang="ja"] .hero-tagline,html[lang="ja"] .contact-email{font-family:"Hiragino Mincho ProN","ヒラギノ明朝 ProN","Yu Mincho","游明朝",YuMincho,"MS PMincho",serif}
html[lang="ja"] h3,html[lang="ja"] .primary-nav,html[lang="ja"] .nav-actions,html[lang="ja"] .button,html[lang="ja"] .profile-links,html[lang="ja"] .section-index,html[lang="ja"] .eyebrow,html[lang="ja"] .fact-grid span,html[lang="ja"] .publication-group-heading,html[lang="ja"] .contact-links,html[lang="ja"] .site-footer{font-family:"Hiragino Sans","ヒラギノ角ゴシック","Yu Gothic","游ゴシック",YuGothic,"Noto Sans JP",Meiryo,sans-serif}
html[lang="ja"] h2{font-weight:600;letter-spacing:-.02em}.text-arrow{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif!important;font-style:normal;font-weight:400;font-variant-emoji:text}
.scale-resource-button{border-color:color-mix(in srgb,var(--accent) 48%,var(--line));background:color-mix(in srgb,var(--accent) 8%,transparent);color:var(--accent-deep)}.scale-resource-button:hover{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 13%,transparent)}
.cv-grant-link{text-decoration-thickness:1px;text-underline-offset:.18em}.cv-grant-meta{color:var(--muted)}.corresponding-author-mark{margin-left:1px;color:var(--accent-deep);font-size:.72em;font-weight:750;line-height:0;vertical-align:super}.publication-corresponding-note{margin:16px 0 0;color:var(--muted);font-size:12px;line-height:1.5}
.menu-toggle{gap:2.7px;align-content:center}.menu-toggle span,.menu-toggle span+span{margin-top:0!important}.menu-toggle[aria-expanded="true"] span:first-child{transform:translateY(3.8px) rotate(45deg)}.menu-toggle[aria-expanded="true"] span:last-child{transform:translateY(-3.8px) rotate(-45deg)}
.hero-degree{display:inline-block;margin-left:.14em;color:var(--muted);font-family:"Avenir Next",Avenir,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:.24em;font-weight:700;letter-spacing:.02em;vertical-align:.72em;white-space:nowrap}.hero-name-roman{display:block;margin-top:12px;color:var(--muted);font-family:"Avenir Next",Avenir,"SF Pro Text","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:.055em;line-height:1.45}.hero-degree-ja{margin:-2px 0 8px;color:var(--muted);font-family:"Hiragino Sans","ヒラギノ角ゴシック","Yu Gothic","游ゴシック",YuGothic,Meiryo,sans-serif;font-size:14px;font-weight:600;letter-spacing:.04em}.page-ja .contact-email span[aria-hidden="true"]{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif!important}
@media(max-width:680px){.hero-degree{font-size:.27em;vertical-align:.65em}.hero-name-roman,.hero-degree-ja{font-size:12px}}
`;
document.head.appendChild(profileStyles);

const labels = isJapanese
  ? { lightTheme:'ライトテーマに切り替える',darkTheme:'ダークテーマに切り替える',openMenu:'メニューを開く',closeMenu:'メニューを閉じる' }
  : { lightTheme:'Switch to light theme',darkTheme:'Switch to dark theme',openMenu:'Open menu',closeMenu:'Close menu' };
const getPreferredTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
const setTheme = (theme) => {
  root.dataset.theme = theme;
  if (themeToggle) themeToggle.setAttribute('aria-label', theme === 'dark' ? labels.lightTheme : labels.darkTheme);
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#151417' : '#f4f1ea');
};
setTheme(getPreferredTheme());
if (themeToggle) themeToggle.addEventListener('click', () => { const next = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', next); setTheme(next); });

const closeMenu = () => {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label',labels.openMenu);
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded',String(willOpen));
    menuToggle.setAttribute('aria-label',willOpen ? labels.closeMenu : labels.openMenu);
    nav.classList.toggle('is-open',willOpen);
    document.body.classList.toggle('menu-open',willOpen);
  });
  document.addEventListener('keydown',(event)=>{ if(event.key==='Escape') closeMenu(); });
}
const navLinks = [...document.querySelectorAll('.primary-nav a')];
navLinks.forEach((link)=>link.addEventListener('click',closeMenu));
const handleHeader = () => { if (header) header.classList.toggle('is-scrolled',window.scrollY>16); };
handleHeader(); window.addEventListener('scroll',handleHeader,{passive:true});
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries)=>entries.forEach((entry)=>{ if(!entry.isIntersecting)return; navLinks.forEach((link)=>{ const current=link.getAttribute('href')===`#${entry.target.id}`; if(current)link.setAttribute('aria-current','true'); else link.removeAttribute('aria-current'); }); }),{rootMargin:'-35% 0px -58%',threshold:0});
  sections.forEach((section)=>observer.observe(section));
}
const year = document.querySelector('[data-year]'); if (year) year.textContent = String(new Date().getFullYear());

const profileExtraScript = document.createElement('script');
profileExtraScript.src = '/profile-extra.js?v=20260829';
profileExtraScript.async = false;
document.body.appendChild(profileExtraScript);
