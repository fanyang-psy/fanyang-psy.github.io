const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const languageButtons = [...document.querySelectorAll('[data-lang]')];

const titles = {
  ja: '日中火曜心理学研究会｜Kayo Psychology Seminar',
  en: 'Kayo Psychology Seminar | 日中火曜心理学研究会',
  zh: '日中火曜心理学研究会｜火曜心理'
};
const descriptions = {
  ja: '日中火曜心理学研究会（Kayo Psychology Seminar）の概要、趣旨、メンバー、最近の活動、2021–2026年の活動記録、作成した研究資料をまとめた公式ページ。',
  en: 'Official page of Kayo Psychology Seminar, including its purpose, current members, recent activities, 2021–2026 activity archive, and research resources.',
  zh: '日中火曜心理学研究会（火曜心理）官方网站，介绍研究会宗旨、现役成员、近期活动、2021–2026年活动记录与研究资料。'
};
const themeLabels = {
  ja: { light: 'ライトテーマに切り替える', dark: 'ダークテーマに切り替える' },
  en: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
  zh: { light: '切换到浅色模式', dark: '切换到深色模式' }
};
const personalSiteUrls = {
  ja: 'https://fanyang-psy.github.io/ja.html',
  en: 'https://fanyang-psy.github.io/',
  zh: 'https://fanyang-psy.github.io/'
};

const getMemberName = (item) => {
  const node = [...item.childNodes].find((child) => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
  return node ? node.textContent.trim().replace(/\s+/g, ' ') : '';
};
const findMemberItems = (name) => [...document.querySelectorAll('.member-list li')].filter((item) => getMemberName(item) === name);
const ensureResearchmapTag = (name, url) => {
  findMemberItems(name).forEach((item) => {
    let tag = item.querySelector('.researchmap-tag');
    if (!tag) {
      tag = document.createElement('a');
      tag.className = 'researchmap-tag';
      tag.target = '_blank';
      tag.rel = 'noopener';
      tag.textContent = 'researchmap ↗︎';
      item.appendChild(tag);
    }
    tag.dataset.baseHref = url.split('?')[0];
  });
};

const setupMembers = () => {
  const ordinaryList = document.querySelector('.member-group.wide .member-list');
  const kiji = findMemberItems('紀暁棠')[0];
  if (ordinaryList && kiji && kiji.parentElement !== ordinaryList) ordinaryList.appendChild(kiji);

  ensureResearchmapTag('楊 帆', 'https://researchmap.jp/fan.yang');
  ensureResearchmapTag('張 澤', 'https://researchmap.jp/zhang97');
  ensureResearchmapTag('章夢婷', 'https://researchmap.jp/psychomagic');
  ensureResearchmapTag('周宇暉', 'https://researchmap.jp/zhouyuhui');
  ensureResearchmapTag('趙心語', 'https://researchmap.jp/xinyu_zhao');
  ensureResearchmapTag('周若愚', 'https://researchmap.jp/Ellude');
  ensureResearchmapTag('任孟浩', 'https://researchmap.jp/mengh_ren');
  ensureResearchmapTag('劉艶艶', 'https://researchmap.jp/yanyan_liu');
  ensureResearchmapTag('温若寒', 'https://researchmap.jp/wenrh');
  ensureResearchmapTag('万 珽', 'https://researchmap.jp/Golden_Heart');

  const representative = findMemberItems('楊 帆')[0];
  if (representative && !representative.querySelector('.homepage-tag')) {
    const homepage = document.createElement('a');
    homepage.className = 'researchmap-tag homepage-tag';
    homepage.dataset.personalSite = 'true';
    homepage.innerHTML = '<span class="copy-ja">ホームページ ↗︎</span><span class="copy-en">Homepage ↗︎</span><span class="copy-zh">个人主页 ↗︎</span>';
    representative.appendChild(homepage);
  }

  if (ordinaryList) {
    const surnameOrder = {
      '程 略': 'Cheng', '鄧 娟': 'Deng', '董高志': 'Dong', '紀暁棠': 'Ji', '康 楠': 'Kang',
      '李祎飛': 'Li Yifei', '李夢然': 'Li Mengran', '劉慧存': 'Liu Huicun', '劉佳鑫': 'Liu Jiaxin', '劉艶艶': 'Liu Yanyan',
      '喬舒恒': 'Qiao', '邱 添': 'Qiu', '任孟浩': 'Ren', '唐致遠': 'Tang', '万 珽': 'Wan', '衛俊哲': 'Wei',
      '温若寒': 'Wen', '占詩苑': 'Zhan', '趙英男': 'Zhao', '鄭 旺': 'Zheng', '周若愚': 'Zhou', '諸哲恺': 'Zhu'
    };
    [...ordinaryList.children]
      .sort((a, b) => (surnameOrder[getMemberName(a)] || getMemberName(a)).localeCompare(surnameOrder[getMemberName(b)] || getMemberName(b), 'en'))
      .forEach((item) => ordinaryList.appendChild(item));
  }
};

const conferenceScheduleHtml = `
  <div class="conference-event" id="jpa90">
    <div class="conference-head">
      <span class="event-date"><span class="copy-ja">2026年9月4日（金）–5日（土）</span><span class="copy-en">September 4–5, 2026</span><span class="copy-zh">2026年9月4日（周五）–5日（周六）</span></span>
      <h4><span class="copy-ja">日本心理学会第90回大会｜研究発表日程</span><span class="copy-en">Japanese Psychological Association 90th Annual Convention | Presentation Schedule</span><span class="copy-zh">日本心理学会第90届大会｜报告日程</span></h4>
      <p><span class="copy-ja">日本心理学会第90回大会では、研究会メンバーが以下の6件の研究発表に参加します。愛着、セルフ・コンパッション、未来思考、幸福感、性的マイノリティに対する態度など、多様なテーマを扱います。ぜひ会場でご交流ください。</span><span class="copy-en">Seminar members will contribute to six presentations at the 90th Annual Convention of the Japanese Psychological Association. Topics include attachment, self-compassion, future thinking, well-being, and attitudes toward sexual minorities. We welcome discussion at the venue.</span><span class="copy-zh">研究会成员将在日本心理学会第90届大会上参与以下6项研究报告，主题涵盖依恋、自我同情、未来思考、幸福感以及对性少数群体的态度等。欢迎大家到场交流。</span></p>
      <p class="conference-location"><span class="copy-ja">会場：8号館 地下1階</span><span class="copy-en">Venue: Building 8, B1F</span><span class="copy-zh">地点：8号馆 B1层</span></p>
    </div>
    <div class="conference-day"><h5><span class="copy-ja">9月4日（金）</span><span class="copy-en">Friday, September 4</span><span class="copy-zh">9月4日（周五）</span></h5><div class="presentation-list">
      <article class="presentation-item"><div class="presentation-meta">11:30–13:10 <span>1B-011-PC</span></div><strong><span class="copy-ja">他人に優しくされたら自分も自分のことを優しくするのか？<br>―愛着安定性プライミングがセルフコンパッションに与える影響―</span><span class="copy-en">Does Receiving Kindness from Others Lead People to Be Kinder to Themselves? Effects of Attachment Security Priming on Self-Compassion</span><span class="copy-zh">他人に優しくされたら自分も自分のことを優しくするのか？<br>―愛着安定性プライミングがセルフコンパッションに与える影響―</span></strong><small><span class="copy-ja">著者：楊帆</span><span class="copy-en">Authors: 楊帆</span><span class="copy-zh">作者：楊帆</span></small></article>
      <article class="presentation-item"><div class="presentation-meta">14:00–15:40 <span>1C-021-PC</span></div><strong><span class="copy-ja">愛着理論の視点からみた未来不安における個人差</span><span class="copy-en">Individual Differences in Future Anxiety from an Attachment-Theory Perspective</span><span class="copy-zh">愛着理論の視点からみた未来不安における個人差</span></strong><small><span class="copy-ja">著者：李媚祺、楊帆、張澤</span><span class="copy-en">Authors: 李媚祺, 楊帆, 張澤</span><span class="copy-zh">作者：李媚祺、楊帆、張澤</span></small></article>
      <article class="presentation-item"><div class="presentation-meta">16:10–17:50 <span>1D-022-PC</span></div><strong><span class="copy-ja">エピソード的未来思考が状態的愛着安定性に及ぼす影響</span><span class="copy-en">Effects of Episodic Future Thinking on State Attachment Security</span><span class="copy-zh">エピソード的未来思考が状態的愛着安定性に及ぼす影響</span></strong><small><span class="copy-ja">著者：謝坤君、楊帆、伊藤大幸</span><span class="copy-en">Authors: 謝坤君, 楊帆, 伊藤大幸</span><span class="copy-zh">作者：謝坤君、楊帆、伊藤大幸</span></small></article>
    </div></div>
    <div class="conference-day"><h5><span class="copy-ja">9月5日（土）</span><span class="copy-en">Saturday, September 5</span><span class="copy-zh">9月5日（周六）</span></h5><div class="presentation-list">
      <article class="presentation-item"><div class="presentation-meta">11:30–13:10 <span>2B-113-PS</span></div><strong><span class="copy-ja">恋愛関係において男性の性的指向による愛着スタイルの違い<br>知覚された恋愛関係安定性に着目して</span><span class="copy-en">Differences in Attachment Style by Men's Sexual Orientation in Romantic Relationships: Focusing on Perceived Relationship Stability</span><span class="copy-zh">恋愛関係において男性の性的指向による愛着スタイルの違い<br>知覚された恋愛関係安定性に着目して</span></strong><small><span class="copy-ja">著者：翟梓辰、楊帆</span><span class="copy-en">Authors: 翟梓辰, 楊帆</span><span class="copy-zh">作者：翟梓辰、楊帆</span></small></article>
      <article class="presentation-item"><div class="presentation-meta">14:00–15:40 <span>2C-002-PB</span></div><strong><span class="copy-ja">「幸せへの恐れ」および「幸せの壊れやすさ」における個人差<br>―ビッグファイブと愛着理論の視点からの検討―</span><span class="copy-en">Individual Differences in Fear of Happiness and Fragility of Happiness: Perspectives from the Big Five and Attachment Theory</span><span class="copy-zh">「幸せへの恐れ」および「幸せの壊れやすさ」における個人差<br>―ビッグファイブと愛着理論の視点からの検討―</span></strong><small><span class="copy-ja">著者：黄少君、楊帆</span><span class="copy-en">Authors: 黄少君, 楊帆</span><span class="copy-zh">作者：黄少君、楊帆</span></small></article>
      <article class="presentation-item"><div class="presentation-meta">16:10–17:50 <span>2D-114-PS</span></div><strong>Attachment and Negative Attitudes Toward Lesbians and Gay Men in Adults<br>An Exploratory Item-Level Network Study</strong><small><span class="copy-ja">著者：吴涵、楊帆</span><span class="copy-en">Authors: 吴涵, 楊帆</span><span class="copy-zh">作者：吴涵、楊帆</span></small></article>
    </div></div>
    <p class="conference-foot"><span class="copy-ja">すべての発表は8号館地下1階で行われます。</span><span class="copy-en">All six presentations will be held on B1F of Building 8.</span><span class="copy-zh">6项报告均在8号馆 B1层举行。</span></p>
  </div>`;

const recentActivitiesSectionHtml = `
<section class="section recent-activities" id="recent-activities">
  <div class="container">
    <div class="section-head">
      <div><p class="section-index">04 — RECENT ACTIVITIES</p><h2><span class="copy-ja">最近の活動</span><span class="copy-en">Recent Activities</span><span class="copy-zh">近期活动</span></h2></div>
      <p><span class="copy-ja">学会発表や最近の研究会活動を紹介します。</span><span class="copy-en">Recent conference presentations and seminar activities.</span><span class="copy-zh">这里汇总近期的学会报告与研究会活动。</span></p>
    </div>
    <article class="recent-card">${conferenceScheduleHtml}</article>
  </div>
</section>`;

const additionalResourcesHtml = `
  <div class="resource-group extra-resource-group">
    <h3><span class="copy-ja">自己同一性（アイデンティティ）読書会</span><span class="copy-en">Self-identity reading group</span><span class="copy-zh">自我同一性读书会</span></h3>
    <div class="links-grid">
      <a class="link-card" href="https://b23.tv/Ntcw1wu" target="_blank" rel="noopener"><strong><span class="copy-ja">bilibili</span><span class="copy-en">Bilibili</span><span class="copy-zh">B站</span></strong><small><span class="copy-ja">自己同一性（アイデンティティ）読書会</span><span class="copy-en">Self-identity reading group</span><span class="copy-zh">自我同一性读书会</span></small><span class="arrow">↗︎</span></a>
      <a class="link-card" href="https://youtube.com/playlist?list=PLvQGBYWHCaoOTLvc7_z7Sm5nkqPrnlIWk&si=dt7_DmD4LkBs3pHk" target="_blank" rel="noopener"><strong>YouTube</strong><small><span class="copy-ja">自己同一性（アイデンティティ）読書会</span><span class="copy-en">Self-identity reading group</span><span class="copy-zh">自我同一性读书会</span></small><span class="arrow">↗︎</span></a>
    </div>
  </div>
  <div class="resource-group extra-resource-group">
    <h3><span class="copy-ja">社会心理学交流会</span><span class="copy-en">Social Psychology Exchange Seminar</span><span class="copy-zh">社会心理学交流会</span></h3>
    <div class="links-grid">
      <a class="link-card" href="https://b23.tv/vQyCDGp" target="_blank" rel="noopener"><strong><span class="copy-ja">bilibili</span><span class="copy-en">Bilibili</span><span class="copy-zh">B站</span></strong><small><span class="copy-ja">社会心理学交流会</span><span class="copy-en">Social Psychology Exchange Seminar</span><span class="copy-zh">社会心理学交流会</span></small><span class="arrow">↗︎</span></a>
      <a class="link-card" href="https://youtube.com/playlist?list=PLvQGBYWHCaoOmDZuuN2h55qdeISR-Xkw2&si=u1ofQWIz0HcH8Uly" target="_blank" rel="noopener"><strong>YouTube</strong><small><span class="copy-ja">社会心理学交流会</span><span class="copy-en">Social Psychology Exchange Seminar</span><span class="copy-zh">社会心理学交流会</span></small><span class="arrow">↗︎</span></a>
    </div>
  </div>`;

const historicalActivities = {
  '2025': [{ title: '', items: [
    ['05/13','Growing Old and Being Old: Emotional Well-Being Across Adulthood','董高志（City University of Macau）'],
    ['05/13','Give Me a Straight Answer: Response Ambiguity Diminishes Likability','邱添（韓国 嘉泉大学）'],
    ['05/20','Do Early Musical Impairments Predict Later Reading Difficulties? A Longitudinal Study of Pre-readers With and Without Familial Risk for Dyslexia','乌東陶力（東京大学大学院）'],
    ['05/20','Interactive Effects of Parental Support and Psychological Control on Children’s Emotion Regulation','翟梓辰（名古屋大学大学院）'],
    ['05/27','Exposure to Detectable Inaccuracies Makes Children More Diligent Fact-Checkers of Novel Claims','黄少君（名古屋大学大学院）'],
    ['05/27','Creative Ideation Activates Disinhibited Reward-Seeking and Indulgent Choices','黄雨琪（お茶の水女子大学大学院）'],
    ['06/03','Unmasking Moral Hypocrisy: How Preschoolers Perceive and Judge Moral Hypocrites','程略（東京大学大学院）'],
    ['06/03','Narrative Identity in Context: How Adults in Japan, Denmark, Israel, and the United States Narrate Difficult Life Events','衛俊哲（東京大学大学院）'],
    ['06/10','“The Secret” to Success? The Psychology of Belief in Manifestation','王婧嫣（南京大学）'],
    ['06/10','Codevelopment of Life Goals and the Big Five Personality Traits Across Adulthood and Old Age','李媚琪（岡山大学大学院）'],
    ['06/17','The Profiles, Predictors, and Intergroup Outcomes of Cultural Attachment','毛依文（お茶の水女子大学大学院）'],
    ['06/17','The Delusion of the Disappearing Self? Attachment Avoidance and the Experience of Externally Invisible Self-Loss in Romantic Relationships','謝坤君（お茶の水女子大学大学院）'],
    ['07/01','自発的特性推論のレビュー','程略（東京大学大学院）'],
    ['10/08','Rでのデータ分析','石峻（慶應義塾大学大学院）'],
    ['10/30','ポスター発表の練習：How Do Attachment Styles Differ Between Only Children and Firstborns?','翟梓辰（名古屋大学大学院）']
  ]}],
  '2024': [
    { title: 'social', items: [
      ['10/12','Icebreaking','楊帆（日本 早稲田大学大学院）'],
      ['10/19','The impact of threats to belonging on health, peripheral physiology, and social behavior','章夢婷（日本 立命館大学大学院）'],
      ['10/21','AI (Mind Perception Theory)','王婧嫣（中国 Nanjing Normal University）'],
      ['10/28','Affect contagion: Physiologic covariation and linkage offer insight into socially shared thoughts, emotions, and experiences','趙英男（中国 吉林大学）'],
      ['11/04','Judging change: A flexible threshold theory','李江勇（中国 陕西師範大学）'],
      ['11/10','Testosterone tradeoffs in close relationships','石峻（慶應義塾大学大学院）'],
      ['11/17','Why is POPULISM So Appealing?','李雨軒（オランダ Vrije Universiteit Amsterdam）'],
      ['11/30','Motivated empathic choices','袁麗娜（日本 早稲田大学大学院）'],
      ['—','Moral inconsistency','趙心語（日本 大阪大学大学院）']
    ]},
    { title: 'attachment', items: [
      ['06/02','Icebreaking','楊帆（日本 早稲田大学大学院）'],
      ['06/09','Defining attachment and attachment security','李夢然（イギリス University College London）'],
      ['06/16','Measuring the security of attachment','楊帆（日本 早稲田大学大学院）'],
      ['06/23','The nature and function of internal working models','任孟浩（中国 湖南師範大学）'],
      ['06/30','Stability and Change in the security of attachment','楊帆（日本 早稲田大学大学院）'],
      ['07/07','The continuing influence of early attachment','毛依文（日本 お茶の水女子大学大学院）'],
      ['07/14','Culture and attachment','紀暁棠（日本 東北大学大学院）'],
      ['07/21','Separation and loss','黎子銘（日本 立命館大学大学院）']
    ]},
    { title: 'tools', items: [
      ['03/03','Icebreaking (Based on coaching psychology)','楊帆（日本 早稲田大学大学院）'],
      ['03/10','Use R to make research collaboration easier','黎子銘（日本 立命館大学大学院）'],
      ['03/17','Use obsidian to organize your knowledge and notes','喬舒恒（日本 東北大学大学院）'],
      ['03/24','An introduction to HAD: A tool for ANOVA','蘇心寧（日本 中央大学大学院）'],
      ['03/31','An introduction to the eye movement technique','呉双（日本 早稲田大学大学院）']
    ]}
  ],
  '2023': [{ title: '', items: [
    ['12/03','愛着理論と他の心理学理論の関連','楊帆（日本 早稲田大学大学院）'],
    ['12/10','思春期の愛着理論','任孟浩（中国 湖南師範大学）'],
    ['12/17','時間的展望','張澤（日本 岡山大学大学院）'],
    ['12/24','死亡反思の紹介','黎子銘（日本 立命館大学）'],
    ['12/31','存在脅威管理理論の紹介','譚祥威']
  ]}],
  '2022': [
    { title: 'crisis', items: [
      ['11/06','Theories and Models: What They Are, What They Are for, and What They Are About','楊帆（日本 早稲田大学大学院）'],
      ['11/13','What can recent replication failures tell us about the theoretical commitments of psychology','陳雨詩（日本 日本大学大学院）'],
      ['11/20','Why Hypothesis Testers Should Spend Less Time Testing Hypotheses?','張澤（日本 岡山大学大学院）'],
      ['11/27','How Computational Modeling Can Force Theory Building in Psychological Science?','何韻涵（中国 深圳大学大学院）'],
      ['12/04','Theory Construction Methodology: A Practical Framework for Building Theories in Psychology','張正（中国 South China Normal University）'],
      ['12/11','Measurement Schmeasurement: Questionable Measurement Practices and How to Avoid Them','章夢婷（日本 立命館大学大学院）'],
      ['12/18','Addressing the theory crisis in psychology','曹雲凱（日本 東京都立大学大学院）']
    ]},
    { title: 'review', items: [
      ['09/04','愛着理論','楊帆（日本 早稲田大学大学院）'],
      ['09/11','ネットワーク分析','張正（中国 South China Normal University）'],
      ['09/18','過剰適応','章夢婷（日本 立命館大学大学院）'],
      ['09/25','Acceptance and commitment therapy','祁佳鈺（日本 早稲田大学大学院）'],
      ['10/02','中日跨文化交流','鄧娟（日本 岡山大学大学院）'],
      ['10/09','学龄前儿童抑郁症','馬旭（中国 Henan Normal University）'],
      ['10/16','時間的展望','張澤（日本 岡山大学大学院）'],
      ['10/23','マインドフルネス','王小鳳（日本 お茶の水女子大学大学院）'],
      ['10/30','存在脅威管理理論','黎子銘（日本 立命館大学大学院）']
    ]},
    { title: 'past', items: [
      ['01/02','愛着スタイル，マインドフルネスと夢の関連','楊帆（日本 早稲田大学大学院）'],
      ['01/09','階層線形モデル','黎子銘（日本 立命館大学大学院）'],
      ['01/16','Using mindfulness interventions to promote work-life balance','石小萱（中国香港 Lingnan University）'],
      ['01/23','自己概念と心理的適応','陳雨詩（日本 日本大学大学院）'],
      ['01/30','セルフコンパッションとネガティブなライフイベント','趙旭航（中国 Fudan University）'],
      ['02/06','愛着不安は親密な関係内の暴力の先行要因となり得るのか?','章夢婷（日本 立命館大学大学院）'],
      ['02/13','情绪状态、生动的心理意象、未来自我连续性与学业拖延','張澤（日本 岡山大学大学院）'],
      ['02/20','コーチング心理学の概要','楊帆（日本 早稲田大学大学院）'],
      ['02/27','传统文化/人格+心理测量杂谈','張正（中国 South China Normal University）'],
      ['03/06','父母的期待认知对大学生自我抑制行动特性和生活满足感的影响: 聚焦于期待的反应形式','章夢婷（日本 立命館大学大学院）'],
      ['03/13','青年期における社交不安とセルフコンパッション','陳雨詩（日本 日本大学大学院）'],
      ['03/20','我们能在实验室里生成爱情吗','楊帆（日本 早稲田大学大学院）'],
      ['03/27','時間的自己評価','張澤（日本 岡山大学大学院）'],
      ['04/03','Humor in work-life conflicts','石小萱（中国香港 Lingnan University）'],
      ['04/10','セルフコンパッション介入とマインドフルネス介入：どちらのほうがいいの?','趙旭航（中国 Fudan University）'],
      ['04/17','在日中国人的自我身份认同的谈判和构建','鄧娟（日本 岡山大学大学院）'],
      ['04/24','科学哲学の入門','張正（中国 South China Normal University）'],
      ['05/01','Attachment Insecurity Moderates Emotion Responses to Mindfulness and Loving-Kindness Meditation in Adults Raised in Low Socioeconomic Status Households','楊帆（日本 早稲田大学大学院）'],
      ['05/08','自我关怀与青少年的价值承诺行为关联','祁佳鈺'],
      ['05/15','基于真实自我和反刍的中介影响探讨孤独感与幸福感的关系','章夢婷'],
      ['05/22','综述：网络欺凌现状和对策','尹雪晴（日本 東京学芸大学大学院）'],
      ['05/29','《心流》阅读分享','石小萱（中国香港 Lingnan University）'],
      ['06/05','自尊对自我注目和不安之间的中介效应','陳雨詩（日本 日本大学大学院）'],
      ['06/12','正念的机制：佛教心理模型','張正（中国 South China Normal University）'],
      ['06/19','简易版DBQ的开发和验证','陳旭寧（日本 大阪大学大学院）'],
      ['06/26','网络分析','張正（中国 South China Normal University）'],
      ['07/03','愛着スタイルと自己概念','楊帆（日本 早稲田大学大学院）'],
      ['07/10','青春期注意力缺陷多动症倾向与焦虑·抑郁之间的纵向关系','陳雨詩'],
      ['07/17','Work-life balance in COVID-19 period','石小萱（中国香港 Lingnan University）'],
      ['07/24','因果推论中的后门准则','黎子銘（日本 立命館大学大学院）'],
      ['07/31','认知行为疗法：理论与实践概览','趙旭航（中国 Fudan University）'],
      ['08/07','质的研究の概要','鄧娟（日本 岡山大学大学院）'],
      ['08/14','質的研究の入門','周麗韻（日本 早稲田大学大学院）'],
      ['08/21','An introduction to Psychopathology Network Theory','張正（中国 South China Normal University）'],
      ['08/28','Ecological Momentary Assessment (EMA)','祁佳鈺（日本 早稲田大学大学院）']
    ]}
  ],
  '2021': [{ title: '', items: [
    ['04/06','自己決定理論（Self-Determination Theory）','楊帆（日本 早稲田大学大学院）'],
    ['04/14','過剰適応，進路選択と社交不安','章夢婷（日本 立命館大学大学院）'],
    ['04/21','心理尺度構成における再検査信頼性係数の評価','楊帆（日本 早稲田大学大学院）'],
    ['04/28','自己卑下的呈示と評価への恐れ','陳雨詩（日本 日本大学大学院）'],
    ['05/05','自由意志信念と裁判','楊帆（日本 早稲田大学大学院）'],
    ['05/12','感謝表出技巧的实行对降低孤独感的效果','陳雨詩（日本 日本大学大学院）'],
    ['05/19','高齢者の知能と抑うつ','章夢婷（日本 立命館大学大学院）'],
    ['05/26','An introduction to coaching psychology','楊帆（日本 早稲田大学大学院）'],
    ['06/02','Social Support in Intimate Relationships: The Role of Relationship Autonomy','楊帆（日本 早稲田大学大学院）'],
    ['06/09','自己呈示と社交不安','陳雨詩（日本 日本大学大学院）'],
    ['06/16','成人用过剩适应倾向的开发','章夢婷（日本 立命館大学大学院）'],
    ['06/23','全特质理论','楊帆（日本 早稲田大学大学院）'],
    ['06/30','教师群体正念减压疗法','張正（中国 South China Normal University）'],
    ['07/07','依恋与正念','楊帆（日本 早稲田大学大学院）'],
    ['07/14','家庭機能と主観的幸福感の関連家','章夢婷（日本 立命館大学大学院）'],
    ['07/21','研究计划：自我同情对心理弹性的影响，自我效能感的中介作用','陳雨詩（日本 日本大学大学院）'],
    ['07/28','動機づけ面接','楊帆（日本 早稲田大学大学院）'],
    ['08/03','Attachment Theory and Humor','楊帆（日本 早稲田大学大学院）'],
    ['08/10','超越享乐主义跑步机：修订幸福的适应理论','章夢婷（日本 立命館大学大学院）'],
    ['08/17','抽象艺术与脑科学','王敏卿（中国 Central China Normal University）'],
    ['08/24','从心理弹性的视点考虑如何支援自闭症亚斯伯格特性的学生','陳雨詩（日本 日本大学大学院）'],
    ['08/31','大学生过剩适应和抑郁的关系','章夢婷（日本 立命館大学大学院）'],
    ['09/07','正念，依恋与关系满意度：主客体互倚模型的分析','楊帆（日本 早稲田大学大学院）'],
    ['09/18','Effect of mindfulness on value Incongruence','楊帆（日本 早稲田大学大学院）'],
    ['09/25','证人对在高度紧张时期遇到的人的回忆的准确性','陳雨詩（日本 日本大学大学院）'],
    ['10/02','青少年过剩适应与主观幸福感','章夢婷（日本 立命館大学大学院）'],
    ['10/10','Mindfulness and false memory','楊帆（日本 早稲田大学大学院）'],
    ['10/17','心理距离与解释水平理论','曹雲凱（日本 東京都立大学大学院）'],
    ['10/24','教养方式与过剩适应：性差的作用','章夢婷（日本 立命館大学大学院）'],
    ['10/31','自我概念越分化，心理上就越适应吗：从个人能动性的层面重新审视','陳雨詩（日本 日本大学大学院）'],
    ['11/07','An introduction to meta-analysis','章夢婷（日本 立命館大学大学院）'],
    ['11/14','研究计划：自我同情对心理弹性的影响，自我效能感的作用','陳雨詩（日本 日本大学大学院）'],
    ['11/21','Humblebragging','張澤（日本 岡山大学大学院）'],
    ['11/28','An introduction to Item Response Theory','張正（中国 South China Normal University）'],
    ['12/05','自恋、无聊与手机使用','楊帆（日本 早稲田大学大学院）'],
    ['12/12','拖延、自我同情与运动行为','趙旭航（中国 Fudan University）'],
    ['12/19','关系问题，对伴侣父母反应感知的一致性和偏差及家庭功能','章夢婷（日本 立命館大学大学院）'],
    ['12/26','同伴关系和青少年手机成瘾：自尊的中介作用和归属需求的调节作用','陳雨詩（日本 日本大学大学院）']
  ]}]
};

const groupLabels = {
  social: ['社会心理学の読書会','Social psychology reading group','社会心理学读书会'],
  attachment: ['愛着理論の読書会：Attachment: The Fundamental Questions','Attachment theory reading group: Attachment: The Fundamental Questions','依恋理论读书会：Attachment: The Fundamental Questions'],
  tools: ['研究ツール・方法共有セッション','Research tools & methods sessions','研究工具与方法分享'],
  crisis: ['心理学の「理論的危機」をめぐる発表会','Series on the theoretical crisis in psychology','心理学“理论危机”系列发表'],
  review: ['各自の研究領域レビュー','Reviews of members’ research areas','成员研究领域综述'],
  past: ['その他の研究会','Other seminar sessions','其他研究会活动']
};

const escapeHtml = (value) => String(value).replace(/[&<>\"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));
const renderActivityRows = (items) => `<div class="activity-table">${items.map(([date,topic,presenter]) => `<div class="activity-row"><time>${escapeHtml(date)}</time><div class="activity-main"><strong>${escapeHtml(topic)}</strong><small>${escapeHtml(presenter)}</small></div></div>`).join('')}</div>`;
const renderHistoricalDetails = (year, groups) => {
  const body = groups.map((group) => {
    const labels = group.title ? groupLabels[group.title] : null;
    return `<div class="history-group">${labels ? `<h5><span class="copy-ja">${labels[0]}</span><span class="copy-en">${labels[1]}</span><span class="copy-zh">${labels[2]}</span></h5>` : ''}${renderActivityRows(group.items)}</div>`;
  }).join('');
  return `<details class="archive-details"><summary><span class="copy-ja">${year}年の発表テーマをすべて見る</span><span class="copy-en">View all ${year} presentation topics</span><span class="copy-zh">查看${year}年全部发表主题</span><span class="detail-arrow" aria-hidden="true">↓</span></summary><div class="archive-details-body">${body}</div></details>`;
};

const setupHistoricalArchive = () => {
  document.querySelectorAll('.archive-card').forEach((card) => {
    const year = card.querySelector('.archive-year')?.textContent.trim();
    if (!year || !historicalActivities[year] || card.querySelector('.archive-details')) return;
    card.insertAdjacentHTML('beforeend', renderHistoricalDetails(year, historicalActivities[year]));
  });
};

const setupRecentActivities = () => {
  const archiveSection = document.querySelector('#archive');
  if (archiveSection && !document.querySelector('#recent-activities')) {
    archiveSection.insertAdjacentHTML('beforebegin', recentActivitiesSectionHtml);
  }
  const archiveIndex = document.querySelector('#archive .section-index');
  const resourcesIndex = document.querySelector('#resources .section-index');
  const contactIndex = document.querySelector('#contact .section-index');
  if (archiveIndex) archiveIndex.textContent = '05 — ARCHIVE';
  if (resourcesIndex) resourcesIndex.textContent = '06 — RESOURCES';
  if (contactIndex) contactIndex.textContent = '07 — CONTACT';
};

const setupAdditionalResources = () => {
  const resources = document.querySelector('#resources .container');
  if (!resources || resources.querySelector('.extra-resource-group')) return;
  const firstGroup = resources.querySelector('.resource-group');
  if (firstGroup) firstGroup.insertAdjacentHTML('afterend', additionalResourcesHtml);
};

const setupHeroAndContent = () => {
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = 'mailto:psy.fyang@gmail.com';
    if (link.textContent.includes('psy.kayo@gmail.com')) link.textContent = 'psy.fyang@gmail.com ↗︎';
  });
  const contactEmail = document.querySelector('.contact-email');
  if (contactEmail) {
    contactEmail.href = 'mailto:psy.fyang@gmail.com';
    contactEmail.textContent = 'psy.fyang@gmail.com ↗︎';
  }
  const purposeButton = document.querySelector('.hero-actions a[href="#purpose"]');
  if (purposeButton) {
    purposeButton.classList.remove('primary');
    purposeButton.classList.add('secondary');
  }
  const latestCard = document.querySelector('.archive-card.latest');
  if (latestCard) latestCard.classList.add('wide');
  const event = document.querySelector('.archive-card.latest .event');
  if (event) event.id = 'event-2026-network';

  const heroActions = document.querySelector('.hero-actions');
  if (heroActions) {
    let eventButton = heroActions.querySelector('a[href="#event-2026-network"], a[href="#recent-events"], a[href="#recent-activities"]');
    if (!eventButton) {
      eventButton = document.createElement('a');
      eventButton.className = 'button secondary';
      eventButton.innerHTML = '<span class="copy-ja">イベント</span><span class="copy-en">Events</span><span class="copy-zh">近期活动</span> ↓︎';
      const resourcesButton = heroActions.querySelector('a[href="#resources"]');
      heroActions.insertBefore(eventButton, resourcesButton || null);
    }
    eventButton.href = '#recent-activities';
  }
  document.querySelectorAll('.copy-ja').forEach((element) => {
    const text = element.textContent.trim();
    if (text === '研究資料') element.textContent = '作成した研究資料';
    if (text === '研究資料・動画') element.textContent = '作成した研究資料・動画';
  });
  const grant = document.querySelector('.grant');
  if (grant) {
    grant.classList.add('funding-box');
    grant.innerHTML = `<span class="copy-ja"><span class="funding-title">日本心理学会　研究会制度による助成</span><span class="funding-number">研究会番号：22005・24004・25006</span></span><span class="copy-en"><span class="funding-title">Supported by the Japanese Psychological Association Seminar Grant Program</span><span class="funding-number">Seminar Nos. 22005 · 24004 · 25006</span></span><span class="copy-zh"><span class="funding-title">日本心理学会研究会制度资助</span><span class="funding-number">研究会编号：22005・24004・25006</span></span>`;
    if (!document.querySelector('.last-updated')) {
      const updated = document.createElement('p');
      updated.className = 'last-updated';
      updated.innerHTML = '<span class="copy-ja">最終更新：2026.08</span><span class="copy-en">Last updated: 2026.08</span><span class="copy-zh">最后更新：2026.08</span>';
      grant.insertAdjacentElement('afterend', updated);
    }
  }
  document.querySelectorAll('a[href^="https://fanyang-psy.github.io/"]').forEach((link) => {
    if (!link.href.includes('/kayo/') && !link.href.includes('/scales/')) link.dataset.personalSite = 'true';
  });
};

const updateThemeLabel = () => {
  if (!themeButton) return;
  const lang = root.dataset.language || 'ja';
  const dark = root.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', dark ? themeLabels[lang].light : themeLabels[lang].dark);
};
const updateLocalizedLinks = (lang) => {
  document.querySelectorAll('[data-personal-site="true"]').forEach((link) => { link.href = personalSiteUrls[lang]; });
  document.querySelectorAll('.researchmap-tag[data-base-href]').forEach((link) => { link.href = `${link.dataset.baseHref}?lang=${lang === 'ja' ? 'ja' : 'en'}`; });
};
const setLanguage = (lang) => {
  root.dataset.language = lang;
  root.lang = lang === 'zh' ? 'zh-CN' : lang;
  document.title = titles[lang];
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = descriptions[lang];
  languageButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  localStorage.setItem('kayo-language', lang);
  updateLocalizedLinks(lang);
  updateThemeLabel();
};
const setTheme = (theme) => {
  root.dataset.theme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === 'dark' ? '#151417' : '#f4f1ea';
  updateThemeLabel();
};

const enhancementStyles = document.createElement('style');
enhancementStyles.textContent = `
.last-updated{margin:9px 0 0;color:var(--accent-deep);font-size:12px;font-weight:720;letter-spacing:.02em}
#recent-activities,#event-2026-network{scroll-margin-top:94px}.archive-card.latest.wide{grid-column:1/-1}
.recent-activities{background:color-mix(in srgb,var(--surface) 46%,transparent)}.recent-card{padding:28px;border:1px solid var(--line);border-radius:18px;background:var(--card);box-shadow:var(--shadow)}
.recent-card .conference-event{margin-top:0;border:0;padding:0;background:transparent}.recent-card .conference-head{padding-bottom:2px}
.conference-event{margin-top:22px;padding:22px;border:1px solid var(--line);border-radius:16px;background:var(--surface)}
.conference-head h4{margin:4px 0 10px;font-size:clamp(20px,2.4vw,28px);line-height:1.35}.conference-head>p{max-width:900px}
.conference-location{display:inline-block;margin-top:4px!important;padding:5px 9px;border:1px solid var(--line);border-radius:999px;color:var(--text)!important;font-size:12px;font-weight:720}
.conference-day{margin-top:22px;padding-top:18px;border-top:1px solid var(--line)}.conference-day h5{margin:0 0 11px;color:var(--accent-deep);font-size:15px;letter-spacing:.01em}
.presentation-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.presentation-item{padding:15px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card)}
.presentation-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:7px;color:var(--accent);font-size:12px;font-weight:800}.presentation-meta span{padding:2px 6px;border:1px solid var(--line);border-radius:999px;color:var(--text);font-size:10px}.presentation-item strong{display:block;line-height:1.55}.presentation-item small{display:block;margin-top:8px;color:var(--muted);line-height:1.55}.conference-foot{margin:16px 0 0!important;font-size:12px}
.extra-resource-group{animation:resourceReveal .2s ease both}@keyframes resourceReveal{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.archive-details{margin-top:18px;border-top:1px solid var(--line);padding-top:14px}.archive-details summary{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;list-style:none;color:var(--accent-deep);font-size:13px;font-weight:760}.archive-details summary::-webkit-details-marker{display:none}.detail-arrow{transition:transform .18s ease}.archive-details[open] .detail-arrow{transform:rotate(180deg)}.archive-details-body{margin-top:16px;display:grid;gap:22px}.history-group h5{margin:0 0 10px;font-size:13px;color:var(--text)}.activity-table{display:grid;gap:0;border:1px solid var(--line);border-radius:13px;overflow:hidden}.activity-row{display:grid;grid-template-columns:62px minmax(0,1fr);gap:12px;padding:11px 13px;background:color-mix(in srgb,var(--card) 94%,transparent)}.activity-row+.activity-row{border-top:1px solid var(--line)}.activity-row time{color:var(--accent);font-size:12px;font-weight:800;font-variant-numeric:tabular-nums}.activity-main strong{display:block;font-size:13px;line-height:1.5}.activity-main small{display:block;margin-top:3px;color:var(--muted);font-size:11px;line-height:1.45}
@media(max-width:900px){.presentation-list{grid-template-columns:1fr}.conference-event{padding:18px}.recent-card{padding:22px}}
@media(max-width:600px){.activity-row{grid-template-columns:52px minmax(0,1fr);gap:9px;padding:10px}.activity-main strong{font-size:12px}.recent-card{padding:18px}.recent-card .conference-event{margin-left:0;margin-right:0}}
`;
document.head.appendChild(enhancementStyles);

setupMembers();
setupRecentActivities();
setupAdditionalResources();
setupHeroAndContent();
setupHistoricalArchive();
languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
setTheme(localStorage.getItem('kayo-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
const browserLanguage = ((navigator.languages && navigator.languages[0]) || navigator.language || 'ja').toLowerCase();
const detectedKayoLanguage = browserLanguage.startsWith('zh') ? 'zh' : browserLanguage.startsWith('ja') ? 'ja' : 'en';
setLanguage(localStorage.getItem('kayo-language') || detectedKayoLanguage);
if (themeButton) themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('kayo-theme', next);
  setTheme(next);
});
const yearNode = document.querySelector('[data-year]');
if (yearNode) yearNode.textContent = String(new Date().getFullYear());