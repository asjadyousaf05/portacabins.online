import { Helmet } from 'react-helmet';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { IconSprite } from './components/IconSprite';
import { LanguageToggle } from './components/LanguageToggle';
import { MobileCanvas } from './components/MobileCanvas';
import { PageContent } from './components/PageContent';
import { Preloader } from './components/Preloader';
import { FloatingMenu } from './components/FloatingMenu';
import { pageRoutes } from './routes';
import { servicePaths } from './content/servicesContent';
import { normalizePath } from './utils/legacy';
import { loadStaticHtml } from './utils/staticHtml';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const ServiceDetailPage = lazy(() =>
  import('./pages/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
);
const PortaCabinsPage = lazy(() =>
  import('./pages/services/PortaCabinsPage').then((m) => ({ default: m.PortaCabinsPage })),
);

type Locale = 'en' | 'ar';

type ContentRouterProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const ContentRouter = ({ locale, setLocale }: ContentRouterProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const normalizedPath = useMemo(() => normalizePath(location.pathname, location.pathname), [location.pathname]);

  useEffect(() => {
    if (location.pathname !== normalizedPath) {
      navigate(normalizedPath, { replace: true });
    }
  }, [location.pathname, navigate, normalizedPath]);

  useEffect(() => {
    document.documentElement.lang = locale === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (locale === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleLocale = (nextLocale: Locale) => setLocale(nextLocale);

  const match = pageRoutes.find((route) => route.path === normalizedPath);
  const localizedContentPath =
    locale === 'ar' ? match?.contentPath.replace('/content/', '/content-ar/') : match?.contentPath;

  const staticRoutes = useMemo<Record<string, JSX.Element>>(
    () => {
      const base: Record<string, JSX.Element> = {
        '/': <HomePage locale={locale} />,
        '/about': <AboutPage locale={locale} />,
        '/services': <ServicesPage locale={locale} />,
        '/services/porta-cabins': <PortaCabinsPage locale={locale} />,
        '/contact': <ContactPage locale={locale} />,
        '/privacy-policy': <PrivacyPage locale={locale} />,
        '/gallery': <GalleryPage locale={locale} />,
      };

      servicePaths.forEach((path) => {
        if (path === '/services/porta-cabins') return;
        base[path] = <ServiceDetailPage locale={locale} path={path} />;
      });

      return base;
    },
    [locale],
  );

  const staticComponent = staticRoutes[normalizedPath];

  useEffect(() => {
    if (!match) return;
    const dataLayer = (window as any).dataLayer || ((window as any).dataLayer = []);
    dataLayer.push({
      event: 'page_view',
      page_path: normalizedPath,
      page_locale: locale,
      page_type: staticComponent ? 'app' : 'static-html',
    });
  }, [locale, match, normalizedPath, staticComponent]);

  const [staticHtml, setStaticHtml] = useState<string | null>(null);
  const [loadingStatic, setLoadingStatic] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setStaticHtml(null);
    setLoadingStatic(false);

    if (!match || staticComponent) return;

    const pathToLoad = localizedContentPath || match.contentPath;
    setLoadingStatic(true);

    loadStaticHtml(pathToLoad, locale)
      .then((html) => {
        if (cancelled) return;
        setStaticHtml(html);
      })
      .catch(() => {
        if (cancelled) return;
        setStaticHtml(null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoadingStatic(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, localizedContentPath, match, staticComponent]);

  if (!match) {
    return (
      <div className="container" style={{ padding: '2rem', color: '#fff' }}>
        <Helmet>
          <title>Page Not Found - Porta Cabins</title>
        </Helmet>
        <p>Page not found.</p>
      </div>
    );
  }

  return (
    <>
      <LanguageToggle locale={locale} onToggle={toggleLocale} />
      <Suspense
        fallback={
          <div className="container" style={{ padding: '2rem', color: '#fff' }}>
            <p>Loading...</p>
          </div>
        }
      >
        {staticComponent}
      </Suspense>
      {!staticComponent && (
        <div>
          {loadingStatic ? (
            <div className="container" style={{ padding: '2rem', color: '#fff' }}>
              <p>Loading...</p>
            </div>
          ) : (
            <PageContent
              contentPath={localizedContentPath || match.contentPath}
              fallbackTitle="Porta Cabins"
              locale={locale}
              staticHtml={staticHtml || undefined}
              staticLoading={loadingStatic}
            />
          )}
        </div>
      )}
    </>
  );
};

const gtmId = 'GTM-WZVLPB6G';

const App = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem('locale');
    return stored === 'ar' ? 'ar' : 'en';
  });

  useEffect(() => {
    const win = window as any;
    const dataLayer = win.dataLayer || (win.dataLayer = []);

    if (!document.querySelector(`script[src*="${gtmId}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);
    }

    const pushInteraction = (type: 'whatsapp' | 'phone', href: string, label?: string) => {
      dataLayer.push({
        event: type === 'whatsapp' ? 'whatsapp_click' : 'phone_call',
        event_category: 'engagement',
        event_label: label || href,
        destination_href: href,
        interaction_type: type,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a,button');
      if (!anchor) return;

      const href = (anchor as HTMLAnchorElement).getAttribute('href') || '';
      const label =
        (anchor.textContent || '').trim() ||
        anchor.getAttribute?.('aria-label') ||
        anchor.getAttribute?.('title') ||
        undefined;
      const isWhatsApp = /wa\.me|whatsapp\.com/i.test(href);
      const isPhone = /^tel:/i.test(href) || /callto:/i.test(href);

      if (isWhatsApp) {
        pushInteraction('whatsapp', href, label);
      } else if (isPhone) {
        pushInteraction('phone', href, label);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en-US" />
      </Helmet>
      <IconSprite />
      <Preloader />
      <div className="container-page">
        <Header locale={locale} />
        <MobileCanvas locale={locale} />
        <main>
          <ContentRouter locale={locale} setLocale={setLocale} />
        </main>
        <Footer locale={locale} />
      </div>
      <FloatingMenu />
    </>
  );
};

export default App;
