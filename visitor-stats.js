(() => {
  const ua = navigator.userAgent || '';
  if (/bot|crawler|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse/i.test(ua)) return;

  const jstDate = () => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return `${values.year}${values.month}${values.day}`;
  };

  const day = jstDate();
  const storageKey = `fy-academic-visit-counted-${day}`;
  try { if (localStorage.getItem(storageKey)) return; } catch (_) {}

  fetch('https://countries.dev/ip', { cache: 'no-store' })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('country lookup failed')))
    .then((data) => {
      const code = String(data.countryCode || '').toUpperCase();
      const region = code === 'JP' ? 'japan' : code === 'CN' ? 'china' : 'overseas';
      const counterKey = `fyacademic-${day}-${region}`;
      return fetch(`https://countapi.mileshilliard.com/api/v1/hit/${counterKey}`, {
        method: 'GET', mode: 'no-cors', cache: 'no-store', keepalive: true
      }).finally(() => {
        try { localStorage.setItem(storageKey, region); } catch (_) {}
      });
    })
    .catch(() => {
      // If country lookup is unavailable, do not guess the visitor's region.
    });
})();
