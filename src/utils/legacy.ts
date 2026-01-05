type LegacyWindow = Window &
  typeof globalThis & {
    AOS?: { refresh?: () => void; refreshHard?: () => void };
    jQuery?: any;
    elementorFrontendConfig?: unknown;
    wpcf7?: unknown;
  };

const loadedStyles = new Set<string>();
const loadedInlineStyles = new Set<string>();
let scriptsPromise: Promise<void> | null = null;
const loadedScripts = new Set<string>();

const ensureScriptLoaded = (src: string) =>
  loadedScripts.has(src)
    ? Promise.resolve()
    : loadScriptsSequential([src]).then(() => {
        loadedScripts.add(src);
      });

const criticalScripts: string[] = [
  '/wp-includes/js/jquery/jquery.minf43b.js',
  '/wp-includes/js/jquery/jquery-migrate.min5589.js',
  '/wp-includes/js/dist/hooks.minaf5f.js',
  '/wp-includes/js/dist/i18n.min1cde.js',
  '/wp-content/plugins/elementor/assets/js/webpack.runtime.mine7a7.js',
  '/wp-content/plugins/elementor/assets/js/frontend-modules.mine7a7.js',
  '/wp-includes/js/jquery/ui/core.minb37e.js',
  '/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min94a4.js',
  '/wp-content/plugins/elementor/assets/js/frontend.mine7a7.js',
  '/wp-content/themes/larson/assets/js/main8a54.js',
];

const deferredScripts: string[] = [
  '/wp-content/plugins/larson-plugin/elementor/assets/js/front-end-widgetsd4d0.js',
  '/wp-content/themes/larson/assets/js/skip-link-focus-fix4a7d.js',
  '/wp-content/themes/larson/assets/js/jquery.pagepiling8a54.js',
  '/wp-content/themes/larson/assets/js/aos8a54.js',
  '/wp-content/themes/larson/assets/js/jquery.easy_number_animate8a54.js',
  '/wp-content/themes/larson/assets/js/magnific-popup8a54.js',
  '/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min94a4.js',
  '/wp-includes/js/imagesloaded.minbb93.js',
  '/wp-content/themes/larson/assets/js/isotope.pkgd8a54.js',
  '/wp-content/themes/larson/assets/js/main8a54.js',
  '/wp-content/themes/larson/assets/js/rrssb8a54.js',
];

const preloadGlobals = () => {
  const w = window as LegacyWindow;
  const elementorRtl = false; // keep Elementor/Swiper in LTR mode so the hero slider matches English
  const ensureMagnificStub = () => {
    const jq = (window as any).jQuery;
    if (jq && jq.fn && !jq.fn.magnificPopup) {
      jq.fn.magnificPopup = function () {
        return this;
      };
      return true;
    }
    return false;
  };
  // Try immediately and keep retrying briefly until jQuery arrives.
  ensureMagnificStub();
  const stubTimer = window.setInterval(() => {
    if (ensureMagnificStub()) {
      window.clearInterval(stubTimer);
    }
  }, 50);
  window.setTimeout(() => window.clearInterval(stubTimer), 5000);

  if (!w.elementorFrontendConfig) {
    w.elementorFrontendConfig = {
      environmentMode: { edit: false, wpPreview: false, isScriptDebug: false },
      i18n: {
        shareOnFacebook: 'Share on Facebook',
        shareOnTwitter: 'Share on Twitter',
        pinIt: 'Pin it',
        download: 'Download',
        downloadImage: 'Download image',
        fullscreen: 'Fullscreen',
        zoom: 'Zoom',
        share: 'Share',
        playVideo: 'Play Video',
        previous: 'Previous',
        next: 'Next',
        close: 'Close',
        a11yCarouselPrevSlideMessage: 'Previous slide',
        a11yCarouselNextSlideMessage: 'Next slide',
        a11yCarouselFirstSlideMessage: 'This is the first slide',
        a11yCarouselLastSlideMessage: 'This is the last slide',
        a11yCarouselPaginationBulletMessage: 'Go to slide',
      },
      is_rtl: elementorRtl,
      breakpoints: { xs: 0, sm: 480, md: 768, lg: 1025, xl: 1440, xxl: 1600 },
      responsive: {
        breakpoints: {
          mobile: { label: 'Mobile Portrait', value: 767, default_value: 767, direction: 'max', is_enabled: true },
          mobile_extra: { label: 'Mobile Landscape', value: 880, default_value: 880, direction: 'max', is_enabled: false },
          tablet: { label: 'Tablet Portrait', value: 1024, default_value: 1024, direction: 'max', is_enabled: true },
          tablet_extra: { label: 'Tablet Landscape', value: 1200, default_value: 1200, direction: 'max', is_enabled: false },
          laptop: { label: 'Laptop', value: 1366, default_value: 1366, direction: 'max', is_enabled: false },
          widescreen: { label: 'Widescreen', value: 2400, default_value: 2400, direction: 'min', is_enabled: false },
        },
        hasCustomBreakpoints: false,
      },
      version: '3.34.0',
      is_static: false,
      experimentalFeatures: {
        e_font_icon_svg: true,
        additional_custom_breakpoints: true,
        container: true,
        e_optimized_markup: true,
        e_pro_free_trial_popup: true,
        nested_elements: true,
        home_screen: true,
        global_classes_should_enforce_capabilities: true,
        e_variables: true,
        cloud_library: true,
        e_opt_in_v4_page: true,
        e_interactions: true,
        import_export_customization: true,
      },
      urls: {
        assets: '/wp-content/plugins/elementor/assets/',
        ajaxurl: '/wp-admin/admin-ajax.php',
        uploadUrl: '/wp-content/uploads',
      },
      nonces: { floatingButtonsClickTracking: 'legacy' },
      swiperClass: 'swiper',
      settings: { page: [], editorPreferences: [] },
      kit: {
        active_breakpoints: ['viewport_mobile', 'viewport_tablet'],
        global_image_lightbox: 'yes',
        lightbox_enable_counter: 'yes',
        lightbox_enable_fullscreen: 'yes',
        lightbox_enable_zoom: 'yes',
        lightbox_enable_share: 'yes',
        lightbox_title_src: 'title',
        lightbox_description_src: 'description',
      },
      post: { id: 0, title: '', excerpt: '', featuredImage: false },
    };
  } else {
    try {
      const cfg = w.elementorFrontendConfig as any;
      if (cfg && typeof cfg === 'object') {
        cfg.is_rtl = elementorRtl;
      }
    } catch {
      /* noop */
    }
  }
};

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[data-legacy-script="${src}"]`)) {
      resolve();
      return;
    }

    const el = document.createElement('script');
    el.src = src;
    el.defer = false;
    el.async = false;
    el.dataset.legacyScript = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });

const loadScriptsSequential = (list: string[]) =>
  list.reduce((chain, src) => chain.then(() => loadScript(src)), Promise.resolve() as Promise<void>);

const shouldSkipScript = (src: string) => {
  const lower = src.toLowerCase();
  return (
    lower.includes('pagepiling') ||
    lower.includes('aos') ||
    lower.includes('magnific') ||
    lower.includes('imagesloaded') ||
    lower.includes('isotope') ||
    lower.includes('rrssb') ||
    lower.includes('easy_number_animate')
  );
};

const installNoopJqueryPlugins = () => {
  const jq = (window as any).jQuery;
  if (!jq || !jq.fn) return;

  if (!jq.fn.magnificPopup) {
    jq.fn.magnificPopup = function () {
      return this;
    };
  }
};

export const loadLegacyScripts = async (contextPath?: string) => {
  preloadGlobals();

  // If we've already loaded scripts but Swiper is still missing (e.g., we first visited a services page),
  // ensure we load the Swiper bundle so the hero slider works.
  if (scriptsPromise) {
    if (!(window as any).Swiper) {
      return (scriptsPromise = scriptsPromise.then(() =>
        ensureScriptLoaded('/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min94a4.js'),
      ));
    }
    return scriptsPromise;
  }

  const isServicesPage = contextPath?.includes('/services/');
  const criticalList = isServicesPage ? criticalScripts.filter((s) => !shouldSkipScript(s)) : criticalScripts;
  const deferredList = isServicesPage ? deferredScripts.filter((s) => !shouldSkipScript(s)) : deferredScripts;

  const loadDeferred = () =>
    new Promise<void>((resolve) => {
      const runner = () => {
        loadScriptsSequential(deferredList).then(resolve).catch(resolve);
      };
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(runner, { timeout: 1200 });
      } else {
        setTimeout(runner, 200);
      }
    });

  scriptsPromise = loadScriptsSequential(criticalList).then(() => {
    installNoopJqueryPlugins();
    return loadDeferred();
  });

  return scriptsPromise;
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
    'styled4d0.css', // main theme
    'bootstrap-grid', // layout grid
    'font-awesome', // icons
    'larson-plugin/elementor/assets/css/style', // header/footer widgets
    'contact-form-7/includes/css/styles', // forms
    'frontend.min', // elementor core frontend
    'post-8', // elementor kit css
    'post-13', // elementor page css
    'post-728', // footer/elementor css
    'swiper.min', // hero slider
    'e-swiper', // elementor swiper conditionals
  ];

  hrefs.forEach((href) => {
    const normalized = normalizeAssetHref(href);
    if (!normalized) return;
    if (loadedStyles.has(normalized)) return;
    if (document.querySelector(`link[data-legacy-style="${normalized}"]`)) return;

    const lower = normalized.toLowerCase();
    const isAllowed = allowedCss.some((token) => lower.includes(token));
    if (!isAllowed) return;

    // Skip unused CSS for services pages where we removed carousels/animations
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

  // ensure the base page stylesheet stays nearest the top of the stack
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

export const refreshLegacyUi = () => {
  const w = window as LegacyWindow;

  if (w.AOS) {
    w.AOS.refreshHard?.();
    w.AOS.refresh?.();
  }

  if (w.jQuery) {
    w.jQuery(window).trigger('load');
    w.jQuery(document).trigger('ready');
  }

  window.dispatchEvent(new Event('resize'));
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
