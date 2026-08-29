(() => {
  if (document.querySelector('#media-service')) return;

  const isJapanese = document.documentElement.lang === 'ja';
  const media = [
    { title: 'Attachment is linked to populating future daydreams with other people, study finds', outlet: 'PsyPost', date: '2026.07.03', url: 'https://www.psypost.org/anxious-attachment-is-linked-to-populating-future-daydreams-with-other-people-study-finds/' },
    { title: 'Using Psychological Tools To Better Understand Human-AI Relationships', outlet: 'Forbes', date: '2025.09.04', url: 'https://www.forbes.com/sites/garydrenik/2025/09/04/using-psychological-tools-to-better-understand-human-ai-relationships/' },
    { title: 'Can AI Be Mindful?', outlet: 'Psychology Today', date: '2025.09.01', url: 'https://www.psychologytoday.com/gb/blog/practical-mindfulness/202508/can-ai-be-mindful' },
    { title: 'Can You Get Emotionally Dependent on ChatGPT?', outlet: 'Greater Good Science Center · UC Berkeley', date: '2025.07.25', url: 'https://greatergood.berkeley.edu/article/item/can_you_get_emotionally_dependent_on_chatgpt' },
    { title: 'دراسة جديدة تكشف طبيعة الارتباط العاطفي بين البشر والذكاء الاصطناعي', outlet: 'AITNews', date: '2025.06.11', url: 'https://aitnews.com/2025/06/11/%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9-%D8%AC%D8%AF%D9%8A%D8%AF%D8%A9-%D8%AA%D9%83%D8%B4%D9%81-%D8%B7%D8%A8%D9%8A%D8%B9%D8%A9-%D8%A7%D9%84%D8%A7%D8%B1%D8%AA%D8%A8%D8%A7%D8%B7-%D8%A7%D9%84%D8%B9%D8%A7%D8%B7/' },
    { title: 'Peut-on vraiment s’attacher à ChatGPT ? Une étude a la réponse', outlet: 'Elle', date: '2025.06.10', url: 'https://portail.free.fr/lifestyle/sexo/peut-on-vraiment-sattacher-a-chatgpt-une-etude-a-la-reponse/' },
    { title: 'Peut-on vraiment s’attacher à une intelligence artificielle ? Une étude japonaise éclaire nos liens avec les chatbots', outlet: 'Futura‑Sciences', date: '2025.06.09', url: 'https://www.futura-sciences.com/sante/actualites/sante-mentale-peut-on-vraiment-attacher-intelligence-artificielle-etude-japonaise-eclaire-nos-liens-chatbots-122549' },
    { title: 'How we’re forming emotional bonds with AI', outlet: 'Cosmos Magazine', date: '2025.06.08', url: 'https://cosmosmagazine.com/news/how-were-forming-emotional-bonds-with-ai/' },
    { title: 'Attachment theory: A new lens for understanding human-AI relationships', outlet: 'ScienceDaily', date: '2025.06.02', url: 'https://www.sciencedaily.com/releases/2025/06/250602155325.htm' },
    { title: 'How Humans Emotionally Bond With AI', outlet: 'Neuroscience News', date: '2025.06.02', url: 'https://neurosciencenews.com/human-ai-emotional-bond-29186/' },
    { title: 'Human-AI Relationships Can Be Examined Via Attachment Theory', outlet: 'Technology Networks', date: '2025.06.02', url: 'https://www.technologynetworks.com/informatics/news/human-ai-relationships-can-be-examined-via-attachment-theory-400445' },
    { title: 'Human-AI relationships: New scale measures our attachment patterns', outlet: 'Phys.org', date: '2025.06.02', url: 'https://phys.org/news/2025-06-human-ai-relationships-scale-patterns.html' },
    { title: 'Attachment Theory: A New Lens for Understanding Human-AI Relationships', outlet: 'AlphaGalileo', date: '2025.06.02', url: 'https://www.alphagalileo.org/en-gb/Item-Display/ItemId/259120' },
    { title: 'How Attachment Theory Offers Fresh Insights into Human-AI Relationships', outlet: 'ScienMag', date: '2025.06.02', url: 'https://scienmag.com/how-attachment-theory-offers-fresh-insights-into-human-ai-relationships/' },
    { title: 'Attachment Theory: New Lens for Human-AI Bonds', outlet: 'Mirage News', date: '2025.06.02', url: 'https://www.miragenews.com/attachment-theory-new-lens-for-human-ai-bonds-1470544/' },
    { title: 'Attachment theory: A new lens for understanding human-AI relationships', outlet: 'EurekAlert!', date: '2025.06.02', url: 'https://sciencesources.eurekalert.org/news-releases/1085786' },
    { title: 'AIは人との関係と同じような視点で理解できるか？ ～ 7割が助言を頼り、4割が信頼を寄せるAI～', outlet: '早稲田大学 広報課・研究活動ニュース', date: '2025.05.27', url: 'https://www.waseda.jp/inst/research/news/80908' },
    { title: '早稻田大学・杨帆和小盐真司研究团队｜用依恋理论概念化及测量人与AI的关系体验', outlet: '三仓心理学界（微信公式アカウント）', date: '2025.05.12' },
    { title: 'How to Nourish Self-Esteem in Autistic Children', outlet: 'Psychology Today', date: '2022.07.07', url: 'https://www.psychologytoday.com/us/blog/nurturing-self-esteem-in-autistic-children/202207/how-nourish-self-esteem-in-autistic-children' }
  ];

  const reviews = [
    ['International Journal of Human-Computer Interaction', '2026.09—現在', 'Sep 2026—present'],
    ['Self & Identity', '2026—現在', '2026—present'],
    ['Japanese Psychological Research', '2025.10—現在', 'Oct 2025—present'],
    ['International Journal of Psychology', '2024.07—現在', 'Jul 2024—present'],
    ['Scientific Reports', '2024.07—現在', 'Jul 2024—present'],
    ['Emerging Adulthood', '2024.03—現在', 'Mar 2024—present'],
    ['Journal of Adult Development', '2024.01—現在', 'Jan 2024—present'],
    ['Mindfulness', '2023.12—現在', 'Dec 2023—present'],
    ['International Journal of Geriatric Psychiatry', '2023.10—現在', 'Oct 2023—present'],
    ['Discover Psychology', '2023.10—現在', 'Oct 2023—present'],
    ['Current Psychology', '2023.09—現在', 'Sep 2023—present']
  ];

  const mediaRows = media.map((item) => {
    const title = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener">${item.title}<span class="media-arrow" aria-hidden="true">↗︎</span></a>`
      : `<span>${item.title}</span>`;
    return `<li>${title}<small>${item.outlet} · ${item.date}</small></li>`;
  }).join('');

  const reviewRows = reviews.map(([journal, ja, en]) => `<li><strong>${journal}</strong><small>${isJapanese ? '査読' : 'Peer reviewer'} · ${isJapanese ? ja : en}</small></li>`).join('');

  const contact = document.querySelector('#contact');
  if (!contact) return;
  const contactIndex = contact.querySelector('.section-index');
  const currentIndex = contactIndex?.textContent.match(/^\s*(\d+)/)?.[1] || '05';
  const nextIndex = String(Number.parseInt(currentIndex, 10) + 1).padStart(currentIndex.length, '0');
  if (contactIndex) contactIndex.textContent = `${nextIndex} — ${isJapanese ? 'お問い合わせ' : 'Contact'}`;

  const section = document.createElement('section');
  section.className = 'section section-rule media-service-section';
  section.id = 'media-service';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading heading-row media-service-heading">
        <div>
          <p class="section-index">${currentIndex} — ${isJapanese ? 'メディア・学術貢献' : 'Media & Service'}</p>
          <h2>${isJapanese ? 'メディア報道・査読活動。' : 'Media coverage & peer review.'}</h2>
        </div>
        <p>${isJapanese ? '研究に関する主なメディア報道と、学術誌の査読活動を簡潔にまとめています。' : 'Selected media coverage of my research and ongoing peer-review service for academic journals.'}</p>
      </div>
      <div class="media-service-grid">
        <section class="media-service-block" aria-labelledby="media-coverage-title">
          <div class="media-service-block-head"><h3 id="media-coverage-title">${isJapanese ? 'メディア報道' : 'Media coverage'}</h3><span>${media.length}</span></div>
          <ol class="media-coverage-list">${mediaRows}</ol>
        </section>
        <section class="media-service-block" aria-labelledby="peer-review-title">
          <div class="media-service-block-head"><h3 id="peer-review-title">${isJapanese ? '査読活動' : 'Peer review'}</h3><span>${reviews.length}</span></div>
          <ol class="peer-review-list">${reviewRows}</ol>
        </section>
      </div>
    </div>`;
  contact.insertAdjacentElement('beforebegin', section);

  const styles = document.createElement('style');
  styles.textContent = `
    .media-service-section{background:var(--surface)}
    .media-service-heading{margin-bottom:28px}.media-service-heading>p{max-width:540px}
    .media-service-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(280px,.8fr);gap:18px;align-items:start}
    .media-service-block{padding:22px 24px;border:1px solid var(--line);border-radius:16px;background:var(--surface-strong)}
    .media-service-block-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--line)}
    .media-service-block-head h3{margin:0;font-size:17px}.media-service-block-head>span{color:var(--muted);font-size:12px;font-weight:750}
    .media-coverage-list,.peer-review-list{list-style:none;margin:0;padding:0}
    .media-coverage-list li,.peer-review-list li{padding:9px 0;border-bottom:1px solid color-mix(in srgb,var(--line) 70%,transparent)}
    .media-coverage-list li:last-child,.peer-review-list li:last-child{border-bottom:0}
    .media-coverage-list a,.media-coverage-list li>span{display:block;color:var(--text);font-size:13px;font-weight:650;line-height:1.45;text-decoration:none}
    .media-coverage-list a:hover{color:var(--accent-deep)}.media-arrow{display:inline-block;margin-left:5px;color:var(--accent);font-size:.86em;font-weight:400}
    .media-coverage-list small,.peer-review-list small{display:block;margin-top:3px;color:var(--muted);font-size:11px;line-height:1.35}
    .peer-review-list strong{display:block;font-size:12.5px;font-weight:680;line-height:1.4}
    @media(max-width:900px){.media-service-grid{grid-template-columns:1fr}}
    @media(max-width:680px){.media-service-block{padding:18px}.media-service-heading{margin-bottom:20px}}
  `;
  document.head.appendChild(styles);
})();
