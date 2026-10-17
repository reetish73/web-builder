// site-teardown extractor. Paste into a browser JavaScript tool on the target page.
// Read-only: it inspects the DOM and computed styles and returns a JSON summary.
// It changes nothing on the page and sends nothing anywhere.
(() => {
  const top = (map, n) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([v, c]) => ({ v, c }));
  const bump = (map, k) => k && map.set(k, (map.get(k) || 0) + 1);
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };

  const colors = new Map(), bgs = new Map(), fonts = new Map(), sizes = new Map(), weights = new Map(),
    lineHeights = new Map(), spacing = new Map(), radii = new Map(), shadows = new Map(),
    maxWidths = new Map(), transitions = new Map(), gaps = new Map(), displays = new Map();

  const els = [...document.body.querySelectorAll('*')].filter((e) => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(e.tagName)).slice(0, 4000);
  for (const el of els) {
    if (!visible(el)) continue;
    const s = getComputedStyle(el);
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (hasText) {
      bump(colors, s.color);
      bump(fonts, s.fontFamily.split(',')[0].replace(/["']/g, '').trim());
      bump(sizes, s.fontSize);
      bump(weights, s.fontWeight);
      bump(lineHeights, `${s.fontSize}/${s.lineHeight}`);
    }
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') bump(bgs, s.backgroundColor);
    for (const p of ['paddingTop', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom']) if (s[p] !== '0px') bump(spacing, s[p]);
    if (s.gap && s.gap !== 'normal' && s.gap !== '0px') bump(gaps, s.gap);
    if (s.borderRadius !== '0px') bump(radii, s.borderRadius);
    if (s.boxShadow !== 'none') bump(shadows, s.boxShadow);
    if (s.maxWidth !== 'none') bump(maxWidths, s.maxWidth);
    if (s.transitionDuration !== '0s') bump(transitions, `${s.transitionProperty} ${s.transitionDuration} ${s.transitionTimingFunction}`);
    if (['flex', 'grid', 'inline-flex', 'inline-grid'].includes(s.display)) bump(displays, s.display);
  }

  // Media queries and keyframe names from readable stylesheets (cross-origin sheets are skipped).
  const breakpoints = new Map(), keyframes = new Set();
  let unreadableSheets = 0;
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { unreadableSheets++; continue; }
    const walk = (list) => {
      for (const r of list) {
        if (r.media && r.conditionText) bump(breakpoints, r.conditionText);
        if (r.type === CSSRule.KEYFRAMES_RULE) keyframes.add(r.name.replace(/\d+/g, '#'));
        if (r.cssRules) walk(r.cssRules);
      }
    };
    walk(rules);
  }

  // Custom properties as resolved on <html> (works even when the stylesheet itself is cross-origin).
  // Design-token-like names first, since large sites define hundreds.
  const cssVars = {};
  const rootStyle = getComputedStyle(document.documentElement);
  const varNames = [...rootStyle].filter((p) => p.startsWith('--'));
  const tokenLike = /color|bg|background|text|font|size|space|spacing|gap|radius|shadow|ease|duration|brand|primary|accent|surface|border/i;
  for (const p of [...varNames.filter((p) => tokenLike.test(p)), ...varNames.filter((p) => !tokenLike.test(p))].slice(0, 80)) {
    cssVars[p] = rootStyle.getPropertyValue(p).trim().slice(0, 80);
  }

  // Page outline: landmarks, sections and headings in order.
  const outline = [...document.querySelectorAll('header, nav, main, section, article, aside, footer, h1, h2, h3')]
    .filter(visible).slice(0, 80).map((el) => {
      const r = el.getBoundingClientRect();
      const label = /^H[1-3]$/.test(el.tagName) ? el.textContent.trim().replace(/\s+/g, ' ').slice(0, 90) : (el.id || el.className?.toString().split(' ')[0] || '');
      return `${el.tagName.toLowerCase()}${label ? ': ' + label : ''} @y${Math.round(r.top + scrollY)} h${Math.round(r.height)}`;
    });

  // Stack hints from globals, script sources and markup.
  const scripts = [...document.scripts].map((s) => s.src).filter(Boolean);
  const has = (re) => scripts.some((s) => re.test(s));
  const g = window;
  const stack = {
    nextjs: !!document.getElementById('__NEXT_DATA__') || has(/\/_next\//),
    nuxt: !!g.__NUXT__ || has(/\/_nuxt\//),
    gatsby: !!document.getElementById('___gatsby'),
    astro: !!document.querySelector('astro-island') || has(/\/_astro\//),
    react: !!document.querySelector('[data-reactroot]') || !!g.React || !!document.getElementById('__NEXT_DATA__') || has(/\/_next\//) || !!document.getElementById('__next') || !!document.getElementById('root'),
    vue: !!g.Vue || !!document.querySelector('[data-v-app]'),
    svelte: !!document.querySelector('[class*="svelte-"]'),
    webflow: !!document.documentElement.dataset.wfPage || has(/webflow/),
    framer: !!document.querySelector('[data-framer-name]') || has(/framer(usercontent)?\.com/),
    wordpress: has(/wp-content|wp-includes/),
    shopify: !!g.Shopify || has(/cdn\.shopify/),
    wix: has(/wixstatic|parastorage/),
    squarespace: has(/squarespace/),
    // Needs many utility-class hits, since bare "flex"/"grid" class names are common everywhere.
    tailwind: [...document.querySelectorAll('[class]')].slice(0, 1500)
      .filter((e) => /(^|\s)((p|m)[trblxy]?-\d+(\.5)?|gap-\d+|text-(xs|sm|base|lg|[2-9]?xl)|(bg|text|border)-[a-z]+-\d{2,3}|(sm|md|lg|xl):[a-z-]+\S*)(\s|$)/.test(e.className?.toString())).length >= 20,
    gsap: !!g.gsap || has(/gsap/), scrollTrigger: !!g.ScrollTrigger || has(/ScrollTrigger/),
    lenis: !!g.Lenis || !!document.querySelector('.lenis, [data-lenis]') || has(/lenis/),
    locomotive: has(/locomotive/), framerMotion: has(/framer-motion|motion\.dev/),
    lottie: !!g.lottie || !!document.querySelector('lottie-player, dotlottie-player') || has(/lottie/),
    three: !!g.THREE || has(/three(\.module)?(\.min)?\.js/), swiper: !!g.Swiper || has(/swiper/),
    spline: !!document.querySelector('spline-viewer') || has(/spline/),
    analytics: scripts.filter((s) => /googletagmanager|google-analytics|segment|hotjar|clarity|posthog|mixpanel|plausible|fbevents/.test(s)).map((s) => new URL(s).hostname),
  };

  const imgs = [...document.images];
  const formats = new Map();
  for (const i of imgs) {
    const src = i.currentSrc || i.src;
    const ext = src.split('?')[0].match(/\.([a-z0-9]{2,5})$/i);
    bump(formats, ext ? ext[1].toLowerCase()
      : /cdn-cgi\/image|imagedelivery|_next\/image|[?&,/](url|w|fm|format|f)=/.test(src) ? 'image-cdn (format auto)' : 'other');
  }
  const media = {
    images: imgs.length,
    formats: top(formats, 6),
    lazy: imgs.filter((i) => i.loading === 'lazy').length,
    missingAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
    videos: document.querySelectorAll('video').length,
    svgs: document.querySelectorAll('svg').length,
    canvases: document.querySelectorAll('canvas').length,
  };

  const nav = performance.getEntriesByType('navigation')[0];
  const res = performance.getEntriesByType('resource');
  const kb = (n) => Math.round(n / 1024);
  const perf = nav ? {
    domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd), loadMs: Math.round(nav.loadEventEnd),
    // Cross-origin resources without Timing-Allow-Origin report 0 bytes, so this is a lower bound.
    measuredTransferKB_lowerBound: kb(nav.transferSize + res.reduce((a, r) => a + (r.transferSize || 0), 0)),
    requests: res.length + 1,
    byType: top(res.reduce((m, r) => m.set(r.initiatorType, (m.get(r.initiatorType) || 0) + 1), new Map()), 8),
  } : null;

  const meta = (n) => document.querySelector(`meta[name="${n}"], meta[property="${n}"]`)?.content || null;
  return {
    url: location.href, title: document.title, lang: document.documentElement.lang || null,
    description: meta('description'), ogImage: !!meta('og:image'), viewport: meta('viewport'),
    pageHeight: document.documentElement.scrollHeight, viewportWidth: innerWidth,
    outline,
    tokens: {
      textColors: top(colors, 10), backgrounds: top(bgs, 10), fonts: top(fonts, 6), fontSizes: top(sizes, 12),
      fontWeights: top(weights, 6), sizeLineHeight: top(lineHeights, 10), spacing: top(spacing, 14), gaps: top(gaps, 8),
      radii: top(radii, 8), shadows: top(shadows, 6), maxWidths: top(maxWidths, 6),
      cssCustomPropertyCount: varNames.length, cssCustomProperties: cssVars,
    },
    layout: { flexGrid: top(displays, 4), breakpoints: top(breakpoints, 12) },
    motion: { transitions: top(transitions, 10), keyframes: [...keyframes].slice(0, 25), reducedMotionQuery: [...breakpoints.keys()].some((b) => b.includes('prefers-reduced-motion')) },
    stack, media, perf, unreadableSheets,
    fontFaces: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight}${f.style !== 'normal' ? ' ' + f.style : ''}`).filter((v, i, a) => a.indexOf(v) === i).slice(0, 20),
  };
})();
