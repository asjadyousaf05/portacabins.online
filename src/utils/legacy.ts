const loadedStyles = new Set<string>();
const loadedInlineStyles = new Set<string>();

export const loadLegacyScripts = async () => Promise.resolve();

export const refreshLegacyUi = () => {
  /* no-op: legacy scripts removed */
};

export const normalizeAssetHref = (href: string): string | null => {
  if (!href) return null;
  if (/^https?:\/\//i.test(href)) return href;
  const sanitized = href.replace(/^(\.{1,2}\/)+/, '').replace(/^\//, '');
  return `/${sanitized}`;
};

const isCriticalStyle = (href: string) => {
  const normalized = href.toLowerCase();
  return (
    normalized.includes('styled4d0.css') ||
    normalized.includes('bootstrap-grid') ||
    normalized.includes('font-awesome') ||
    normalized.includes('frontend') ||
    normalized.includes('larson-plugin/elementor/assets/css/style')
  );
};

const attachDeferredStyle = (normalized: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = normalized;
  link.dataset.legacyStyle = normalized;
  const promote = () => {
    link.rel = 'stylesheet';
    link.as = '';
  };
  link.onload = () => promote();
  setTimeout(promote, 1500);
  document.head.appendChild(link);
};

export const ensureStylesheets = (hrefs: string[], contextPath: string) => {
  const isServicesPage = contextPath.includes('/services/');
  const allowedCss = [
    'styled4d0.css',
    'bootstrap-grid',
    'font-awesome',
    'larson-plugin/elementor/assets/css/style',
    'contact-form-7/includes/css/styles',
    'frontend.min',
    'post-8',
    'post-13',
    'post-728',
    'swiper.min',
    'e-swiper',
  ];

  hrefs.forEach((href) => {
    const normalized = normalizeAssetHref(href);
    if (!normalized) return;
    if (loadedStyles.has(normalized)) return;
    if (document.querySelector(`link[data-legacy-style="${normalized}"]`)) return;

    const lower = normalized.toLowerCase();
    const isAllowed = allowedCss.some((token) => lower.includes(token));
    if (!isAllowed) return;

    if (isServicesPage) {
      if (lower.includes('pagepiling') || lower.includes('aos') || lower.includes('magnific-popup')) {
        return;
      }
    }

    if (isCriticalStyle(normalized)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = normalized;
      link.dataset.legacyStyle = normalized;
      document.head.appendChild(link);
    } else {
      attachDeferredStyle(normalized);
    }
    loadedStyles.add(normalized);
  });

  const footerCss = '/wp-content/uploads/elementor/css/post-72837cb.css?ver=1766955553';
  if (!loadedStyles.has(footerCss) && !document.querySelector(`link[data-legacy-style="${footerCss}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = footerCss;
    link.dataset.legacyStyle = footerCss;
    document.head.appendChild(link);
    loadedStyles.add(footerCss);
  }

  if (contextPath && !loadedStyles.has(contextPath)) {
    loadedStyles.add(contextPath);
  }
};

export const ensureInlineStyles = (styles: string[], keyPrefix: string) => {
  styles.forEach((css, index) => {
    const key = `${keyPrefix}-${index}`;
    if (!css.trim() || loadedInlineStyles.has(key)) return;
    const styleEl = document.createElement('style');
    styleEl.dataset.legacyInline = key;
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    loadedInlineStyles.add(key);
  });
};

export const normalizePath = (href: string, basePath: string) => {
  try {
    const url = href.startsWith('http')
      ? new URL(href)
      : new URL(href, `${window.location.origin}${basePath.endsWith('/') ? basePath : `${basePath}/`}`);
    let pathname = url.pathname.replace(/\/index\.html$/i, '').replace(/\.html$/i, '');
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    return pathname || '/';
  } catch {
    return '/';
  }
};
