(() => {
  const measurementId = 'G-XHGG3HRJP9';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  if (!document.querySelector(`script[data-ga4-id="${measurementId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.ga4Id = measurementId;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true
  });

  const rememberProfileLanguage = () => {
    document.querySelectorAll('[data-profile-lang]').forEach((link) => {
      link.addEventListener('click', () => {
        try {
          localStorage.setItem('profile-language', link.dataset.profileLang || 'en');
        } catch (_) {}
      });
    });
  };

  const polishChineseProfile = () => {
    if (!document.documentElement.lang.toLowerCase().startsWith('zh')) return;

    const replaceText = (root, replacements) => {
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        let value = walker.currentNode.nodeValue;
        replacements.forEach(([from, to]) => { value = value.split(from).join(to); });
        walker.currentNode.nodeValue = value;
      }
    };

    replaceText(document.body, [
      ['早稻田大学 文学部心理学课程 · 助教', '早稻田大学 文学部心理学课程 · 助理教授'],
      ['早稻田大学文学学术院心理学课程助教', '早稻田大学文学学术院心理学课程助理教授'],
      ['复原力', '心理弹性'],
      ['文学博士', '博士（文学）'],
      ['心理学硕士', '硕士（心理学）'],
      ['早稻田大学 · 心理学', '早稻田大学']
    ]);

    document.querySelectorAll('.fact-grid strong, #history .history-list strong').forEach((node) => {
      if (node.textContent.trim() === '助教') node.textContent = '助理教授';
    });

    const grantItems = [...document.querySelectorAll('#history .history-list li')];
    const grantItem = grantItems.find((item) => item.textContent.includes('25K23312'));
    if (grantItem) {
      const detail = grantItem.querySelector('p');
      if (detail) {
        detail.innerHTML = '<a class="cv-grant-link" href="https://kaken.nii.ac.jp/zh-CN/grant/KAKENHI-PROJECT-25K23312" target="_blank" rel="noopener">依恋安全感启动对认知及社会认知影响的研究 <span class="text-arrow" aria-hidden="true">↗︎</span></a><br><span class="cv-grant-meta">项目负责人 · 课题编号 25K23312</span>';
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      rememberProfileLanguage();
      polishChineseProfile();
    }, { once: true });
  } else {
    rememberProfileLanguage();
    polishChineseProfile();
  }
})();