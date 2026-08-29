(() => {
  const core = document.createElement('script');
  core.src = 'core.js?v=20260829-2';
  core.async = false;

  core.onload = () => {
    const jaTextReplacements = [
      ['心理学の研究・方法・理論について継続的に議論し、研究生活を支えるつながりを育てる学術交流コミュニティです。', '心理学の研究・方法・理論について継続的に議論し、研究活動を支え合うつながりを育む学術交流コミュニティです。'],
      ['2020年12月に楊帆らによって運営を開始しました。日本、中国、イギリス、アメリカなどに在住する中国人の心理学専攻学生・若手研究者を主な対象とし、原則として週1回、約120分の活動を行っています。学術的な交流に加え、メンバーに必要なソーシャルサポートを提供することも大切にしています。', '2020年12月に楊帆らが立ち上げ、運営を開始しました。日本、中国、イギリス、アメリカなどに在住する、心理学を専攻する中国人大学院生・若手研究者を主な対象とし、原則として週1回、約120分の活動を行っています。学術交流に加え、メンバー同士が必要なソーシャルサポートを得られる場であることも大切にしています。'],
      ['「独学にして友なければ、則ち孤陋にして寡聞なり」という考えを背景に、心理学研究を一人で抱え込まず、互いの専門性を持ち寄って学ぶ場をつくっています。', '「独学にして友なければ、則ち孤陋にして寡聞なり」という言葉を大切にし、心理学研究を一人で抱え込むのではなく、互いの専門性を持ち寄って学び合える場を目指しています。'],
      ['研究会の活動を支える三つの基本的な考え方です。', '研究会の活動を支える、三つの基本方針です。'],
      ['メンバーの研究テーマが交差する領域を中心に、秘密保持を守りながら理性的な共有と議論を行います。意見が異なる場合も、感情的な評価や人格攻撃ではなく、論理と証拠に基づいて議論することを重視します。', 'メンバーの研究テーマが交差する領域を中心に、守秘を徹底しながら、建設的な情報共有と議論を行います。意見が異なる場合も、感情的な評価や個人への攻撃ではなく、論理と根拠に基づいて議論することを重視します。'],
      ['自発的な参加と約束の遵守を前提に、発達心理学、パーソナリティ心理学、社会心理学などを専門とする若手研究者や、人間関係・ポジティブな心理的特性を研究する大学院生・研究者を中心に構成されています。', '自主的な参加と基本的なルールの遵守を前提とし、発達心理学、パーソナリティ心理学、社会心理学などを専門とする大学院生・若手研究者を中心に構成されています。対人関係やポジティブな心理特性を研究するメンバーも多く参加しています。'],
      ['研究や留学生活に伴うストレスを和らげ、心理学知識を応用する力を育てるため、コーチング心理学の考え方を参考に傾聴や共感などの支援を行います。診断、心理的異常への対応、心理カウンセリングは行いません。', '研究や留学生活に伴うストレスを和らげ、心理学の知識を実践的に活かす力を育むため、コーチング心理学の考え方を参考に、傾聴や共感を中心としたピアサポートを行います。なお、診断や治療、専門的な心理支援・カウンセリングを行う場ではありません。'],
      ['組織運営、企画、広報、情報共有を分担しながら、研究会を継続的に運営しています。', '組織運営、企画、広報、情報共有などの役割を分担しながら、研究会を運営しています。'],
      ['各委員会の管理、組織運営、事務を担当。', '各委員会の統括、研究会全体の運営、事務を担当。'],
      ['活動全般の企画および財務管理。', '研究会全体の企画および財務管理を担当。'],
      ['研究会とメンバーの活動・社会貢献に関する広報を企画・運営。', '研究会およびメンバーの活動・社会貢献に関する広報活動を企画・運営。'],
      ['最新文献、研究動向、研究ツール、経験の共有と共同研究を促進。', '最新文献、研究動向、研究ツール、研究経験の共有を促進し、共同研究につなげます。'],
      ['所属は研究会資料に掲載された表記を基にしています。', '所属は、研究会資料に記載された表記に基づいています。'],
      ['2021–2026年 活動記録', '2021–2026年の活動記録'],
      ['個々の研究発表、理論・方法論のレビュー、読書会、研究ツール共有など、多様な形式で活動してきました。', '個人の研究発表、理論・方法論のレビュー、読書会、研究ツールの共有など、さまざまな形式で活動を続けてきました。'],
      ['方法論・共同研究の共有', '研究方法と共同研究事例の共有'],
      ['研究手法を実際の共同研究事例と結びつけながら学ぶセッションを実施しています。', '研究方法を、実際の共同研究事例と結びつけながら学ぶセッションを実施しています。'],
      ['最新研究の輪読・発表', '最新研究の輪読・研究発表'],
      ['方法・発表支援', '研究方法・発表支援'],
      ['研究ツール共有', '研究ツールの共有'],
      ['理論をつなぐ', '心理学理論をつなぐ'],
      ['愛着理論と他の心理学理論、思春期の愛着、時間的展望、死亡反思、存在脅威管理理論などを取り上げました。', '愛着理論と他の心理学理論との関連、思春期の愛着、時間的展望、死についての内省、恐怖管理理論などを取り上げました。'],
      ['心理学の「理論的危機」をテーマとする連続発表、各自の研究領域レビュー、ネットワーク分析、ACT、質的研究、EMAなどの方法・理論を扱いました。', '心理学の「理論的危機」をテーマとした連続発表、各メンバーの研究領域レビューに加え、ネットワーク分析、ACT、質的研究、EMAなどの理論・方法を取り上げました。'],
      ['自己決定理論、心理尺度の再検査信頼性、コーチング心理学、愛着とマインドフルネス、メタ分析、項目反応理論、自己概念、社会的支援など、心理学研究の幅広いテーマを継続的に共有しました。', '自己決定理論、心理尺度の再検査信頼性、コーチング心理学、愛着とマインドフルネス、メタ分析、項目反応理論、自己概念、ソーシャルサポートなど、心理学に関する幅広いテーマを継続的に取り上げました。'],
      ['研究会で企画・整理してきた読書会、研究ツール共有、心理尺度索引などを公開しています。', '研究会で企画・作成してきた読書会動画、研究ツールの共有資料、心理尺度索引などを公開しています。'],
      ['愛着理論読書会', '愛着理論の読書会'],
      ['bilibili（依恋读书会）', 'Bilibili'],
      ['心理学尺度索引', '心理尺度索引'],
      ['中国語版・常用心理学尺度索引（2022）', '中国語版・心理尺度索引（2022）'],
      ['2024年3月には中国のSNS上で研究ツール・方法を共有するライブセッションを企画・運営し、2023年には一般向けの「エビデンスに基づく心理学的提案カレンダー」（中国語）を制作しました。', '2024年3月には、中国のSNS上で研究ツールや研究方法を紹介するライブ配信を企画・運営しました。2023年には、一般向けに「エビデンスに基づく心理学アドバイス・カレンダー」（中国語）を制作しました。'],
      ['自己同一性（アイデンティティ）読書会', '自己同一性（アイデンティティ）の読書会'],
      ['学会発表や最近の研究会活動を紹介します。', '最近の学会発表や研究会での活動をご紹介します。'],
      ['日本心理学会第90回大会では、研究会メンバーが以下の6件の研究発表に参加します。愛着、セルフ・コンパッション、未来思考、幸福感、性的マイノリティに対する態度など、多様なテーマを扱います。ぜひ会場でご交流ください。', '日本心理学会第90回大会では、研究会メンバーが関わる6件の研究発表を予定しています。愛着、セルフ・コンパッション、未来思考、幸福感、性的マイノリティに対する態度など、多様なテーマを扱います。会場で皆さまと交流できることを楽しみにしています。'],
      ['すべての発表は8号館地下1階で行われます。', '6件の発表はいずれも8号館地下1階で行われます。'],
      ['研究でよく用いられる心理尺度索引（2024）', '一般的研究用心理学尺度索引（2024）'],
      ['恐怖管理理論', '存在脅威管理理論']
    ];

    const jaSharedReplacements = [
      ['R／Obsidian／HAD／Eye movement methods', 'R／Obsidian／HAD／眼球運動測定法']
    ];

    const zhNameReplacements = [
      ['唐致遠', '唐致远'], ['呉双', '吴双'], ['紀暁棠', '纪晓棠'],
      ['楊 帆', '杨帆'], ['張 澤', '张泽'], ['鄧 娟', '邓娟'], ['邱 添', '邱添'],
      ['万 珽', '万珽'], ['鄭 旺', '郑旺'], ['程 略', '程略'], ['康 楠', '康楠'],
      ['楊 帆', '杨 帆'], ['楊帆', '杨帆'], ['張 澤', '张 泽'], ['張澤', '张泽'],
      ['章夢婷', '章梦婷'], ['趙心語', '赵心语'], ['趙旭航', '赵旭航'], ['趙英男', '赵英男'],
      ['劉艶艶', '刘艳艳'], ['劉慧存', '刘慧存'], ['劉佳鑫', '刘佳鑫'], ['紀暁棠', '纪晓棠'],
      ['喬舒恒', '乔舒恒'], ['鄧 娟', '邓 娟'], ['鄧娟', '邓娟'], ['衛俊哲', '卫俊哲'],
      ['李祎飛', '李祎飞'], ['諸哲恺', '诸哲恺'], ['占詩苑', '占诗苑'], ['鄭 旺', '郑 旺'],
      ['周宇暉', '周宇晖'], ['李夢然', '李梦然'], ['黎子銘', '黎子铭'], ['蘇心寧', '苏心宁'],
      ['呉双', '吴双'], ['陳雨詩', '陈雨诗'], ['何韻涵', '何韵涵'], ['曹雲凱', '曹云凯'],
      ['祁佳鈺', '祁佳钰'], ['王小鳳', '王小凤'], ['馬旭', '马旭'], ['周麗韻', '周丽韵'],
      ['譚祥威', '谭祥威'], ['李雨軒', '李雨轩'], ['袁麗娜', '袁丽娜'], ['謝坤君', '谢坤君'],
      ['張正', '张正'], ['烏東陶力', '乌东陶力'], ['乌東陶力', '乌东陶力']
    ];

    const zhSharedReplacements = [
      ['早稲田大学文学学術院', '早稻田大学文学学术院'],
      ['早稲田大学大学院', '早稻田大学大学院'],
      ['立命館大学大学院', '立命馆大学大学院'],
      ['慶應義塾大学大学院', '庆应义塾大学大学院'],
      ['東京都立大学大学院', '东京都立大学大学院'],
      ['東京学芸大学大学院', '东京学艺大学大学院'],
      ['お茶の水女子大学大学院', '御茶水女子大学大学院'],
      ['東京大学大学院', '东京大学大学院'],
      ['東北大学大学院', '东北大学大学院'],
      ['岡山大学大学院', '冈山大学大学院'],
      ['名古屋大学大学院', '名古屋大学大学院'],
      ['日本大学大学院', '日本大学大学院'],
      ['大阪大学大学院', '大阪大学大学院'],
      ['中央大学大学院', '中央大学大学院'],
      ['京都大学大学院', '京都大学大学院'],
      ['九州大学大学院', '九州大学大学院'],
      ['筑波大学大学院', '筑波大学大学院'],
      ['北海道大学大学院', '北海道大学大学院'],
      ['東洋大学大学院', '东洋大学大学院'],
      ['South China Normal University', '华南师范大学'],
      ['Nanjing Normal University', '南京师范大学'],
      ['Henan Normal University', '河南师范大学'],
      ['University College London', '伦敦大学学院'],
      ['Vrije Universiteit Amsterdam', '阿姆斯特丹自由大学'],
      ['City University of Macau', '澳门城市大学'],
      ['Fudan University', '复旦大学'],
      ['Lingnan University', '岭南大学'],
      ['日本心理学会会員', '日本心理学会会员'],
      ['立命館大学', '立命馆大学'],
      ['慶應義塾大学', '庆应义塾大学'],
      ['東京都立大学', '东京都立大学'],
      ['東京学芸大学', '东京学艺大学'],
      ['お茶の水女子大学', '御茶水女子大学'],
      ['東京大学', '东京大学'],
      ['東北大学', '东北大学'],
      ['岡山大学', '冈山大学'],
      ['北海道大学', '北海道大学'],
      ['東洋大学', '东洋大学'],
      ['韓国', '韩国'], ['オランダ', '荷兰'], ['イギリス', '英国'],
      ...zhNameReplacements
    ];

    const replaceMany = (text, replacements) => replacements.reduce((value, [from, to]) => value.split(from).join(to), text);

    document.querySelectorAll('.copy-ja').forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        walker.currentNode.nodeValue = replaceMany(walker.currentNode.nodeValue, jaTextReplacements);
      }
    });

    const ordinaryList = document.querySelector('.member-group.wide .member-list');
    if (ordinaryList && ![...ordinaryList.children].some((item) => item.textContent.trim().startsWith('吴涵'))) {
      const item = document.createElement('li');
      item.append(document.createTextNode('吴涵 '));
      const affiliation = document.createElement('span');
      affiliation.className = 'affiliation';
      affiliation.textContent = '東京大学大学院';
      item.appendChild(affiliation);
      ordinaryList.appendChild(item);
    }

    const tanXiangwei = [...document.querySelectorAll('.member-list li')].find((item) => item.textContent.trim().startsWith('譚祥威'));
    const tanAffiliation = tanXiangwei?.querySelector('.affiliation');
    if (tanAffiliation && !tanAffiliation.textContent.includes('日本心理学会会員')) {
      tanAffiliation.textContent = `${tanAffiliation.textContent.trim()} · 日本心理学会会員`;
    }

    if (ordinaryList) {
      const surnameOrder = {
        '程 略': 'Cheng', '鄧 娟': 'Deng', '董高志': 'Dong', '紀暁棠': 'Ji', '康 楠': 'Kang',
        '李祎飛': 'Li Yifei', '李夢然': 'Li Mengran', '劉慧存': 'Liu Huicun', '劉佳鑫': 'Liu Jiaxin', '劉艶艶': 'Liu Yanyan',
        '喬舒恒': 'Qiao', '邱 添': 'Qiu', '任孟浩': 'Ren', '唐致遠': 'Tang', '万 珽': 'Wan', '衛俊哲': 'Wei',
        '温若寒': 'Wen', '吴涵': 'Wu', '占詩苑': 'Zhan', '趙英男': 'Zhao', '鄭 旺': 'Zheng', '周若愚': 'Zhou', '諸哲恺': 'Zhu'
      };
      const memberName = (item) => {
        const node = [...item.childNodes].find((child) => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
        return node ? node.textContent.trim().split(/[　\s]{2,}/)[0].trim() : '';
      };
      [...ordinaryList.children]
        .sort((a, b) => (surnameOrder[memberName(a)] || memberName(a)).localeCompare(surnameOrder[memberName(b)] || memberName(b), 'en'))
        .forEach((item) => ordinaryList.appendChild(item));
    }

    const conferenceLocation = document.querySelector('#jpa90 .conference-location');
    if (conferenceLocation) {
      conferenceLocation.innerHTML = '<span class="copy-ja">会場：東洋大学白山キャンパス・8号館 地下1階</span><span class="copy-en">Venue: Toyo University Hakusan Campus · Building 8, B1F</span><span class="copy-zh">会场：东洋大学白山校区 · 8号馆 B1层</span>';
    }

    document.querySelectorAll('#jpa90 .presentation-item small .copy-ja').forEach((node) => {
      node.textContent = node.textContent.replace(/^著者：/, '発表者：');
    });
    document.querySelectorAll('#jpa90 .presentation-item small .copy-en').forEach((node) => {
      const names = node.textContent.replace(/^Authors:\s*/, '');
      node.textContent = `${names.includes(',') ? 'Presenters' : 'Presenter'}: ${names}`;
    });
    document.querySelectorAll('#jpa90 .presentation-item small .copy-zh').forEach((node) => {
      const names = replaceMany(node.textContent.replace(/^作者：/, ''), zhNameReplacements);
      node.textContent = `报告者：${names}`;
    });

    document.querySelectorAll('.copy-zh').forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        walker.currentNode.nodeValue = replaceMany(walker.currentNode.nodeValue, zhNameReplacements);
      }
    });

    const originalSharedText = new WeakMap();
    const localizeSharedText = (lang) => {
      document.querySelectorAll('.member-list li, .activity-main small, .series > span').forEach((root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach((node) => {
          if (node.parentElement?.closest('.copy-ja, .copy-en, .copy-zh')) return;
          if (!originalSharedText.has(node)) originalSharedText.set(node, node.nodeValue);
          const original = originalSharedText.get(node);
          if (lang === 'zh') node.nodeValue = replaceMany(original, zhSharedReplacements);
          else if (lang === 'ja') node.nodeValue = replaceMany(original, jaSharedReplacements);
          else node.nodeValue = original;
        });
      });
    };

    const japaneseDescription = '日中火曜心理学研究会（Kayo Psychology Seminar）の概要、趣旨、現役メンバー、最近の活動、2021–2026年の活動記録、作成した研究資料をまとめた公式ページです。';
    const applyLanguageSpecificText = () => {
      const lang = document.documentElement.dataset.language || 'ja';
      localizeSharedText(lang);
      if (lang === 'ja') {
        const description = document.querySelector('meta[name="description"]');
        if (description) description.content = japaneseDescription;
      }
    };
    applyLanguageSpecificText();

    new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.type === 'attributes' && mutation.attributeName === 'data-language')) {
        applyLanguageSpecificText();
      }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-language'] });
  };

  document.head.appendChild(core);
})();