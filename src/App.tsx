import { Helmet } from 'react-helmet';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { IconSprite } from './components/IconSprite';
import { LanguageToggle } from './components/LanguageToggle';
import { PageContent } from './components/PageContent';
import { Preloader } from './components/Preloader';
import { FloatingMenu } from './components/FloatingMenu';
import { pageRoutes } from './routes';
import { servicePaths } from './content/servicesContent';
import { normalizePath } from './utils/legacy';
import { loadStaticHtml } from './utils/staticHtml';
import { lazy } from 'react';

type SeoMeta = {
  title: string;
  description: string;
  ogImage?: string;
  robots?: string;
};

const baseUrl = 'https://portacabins.online';
const defaultOgImage = `${baseUrl}/portacabins-logo.png`;

const seoMetaMap: Record<string, SeoMeta> = {
  '/': {
    title: 'Porta Cabins | Portable Buildings, Site Offices, Labour Camps',
    description:
      'Premium portable cabins, turnkey site offices, labour camps, and custom modular buildings across Saudi Arabia with fast delivery and quality materials.',
  },
  '/about': {
    title: 'About Porta Cabins | Modular Building Experts in KSA',
    description: 'Learn about Porta Cabins, our experience delivering durable modular cabins, offices, and site solutions in Saudi Arabia.',
  },
  '/contact': {
    title: 'Contact Porta Cabins | Get a Quote for Portable Buildings',
    description: 'Talk to Porta Cabins for portable cabins, site offices, labour camps, and custom modular spaces. WhatsApp and phone support available.',
  },
  '/services': {
    title: 'Services | Porta Cabins, Aluminium, Welding, Cutting & Bending',
    description: 'Explore Porta Cabins services: modular buildings, aluminium fabrication, welding, and cutting & bending solutions for every project.',
  },
  '/services/porta-cabins': {
    title: 'Porta Cabins Services | Factory, Offices & Ready Buildings',
    description: 'Complete porta cabin solutions: factory-built offices, labour camps, houses, and custom modular buildings tailored to your site needs.',
  },
  '/services/aluminium': {
    title: 'Aluminium Fabrication | Doors, Windows, Cladding',
    description: 'High-quality aluminium fabrication for doors, windows, cladding, and custom designs built to last.',
  },
  '/services/cutting-and-bending': {
    title: 'Cutting & Bending | Precision Metal Fabrication',
    description: 'Accurate cutting and bending services for steel and aluminium components, ready for fast installation.',
  },
  '/services/welding': {
    title: 'Welding Services | Structural, Industrial, Custom Fabrication',
    description: 'Professional welding for structural steel, industrial repairs, and custom fabrication with strict quality and safety control.',
  },
  '/gallery': {
    title: 'Project Gallery | Porta Cabins in Action',
    description: 'Browse finished porta cabin projects, site offices, labour camps, and custom modular builds across Saudi Arabia.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Porta Cabins',
    description: 'How Porta Cabins handles your data, cookies, and privacy across our website and services.',
    robots: 'noindex,follow',
  },
};

const serviceSeoMeta: Record<string, SeoMeta> = {
  'portable-canteen': {
    title: 'Portable Canteen Cabins | Hygienic Food Service Units',
    description: 'Modular portable canteen cabins with ventilation, storage, and easy-to-clean finishes for camps and sites.',
  },
  'portable-house': {
    title: 'Portable Houses | Comfortable Modular Living Units',
    description: 'Durable, insulated portable houses with customizable layouts, ready for quick setup and long-term use.',
  },
  'portable-labour-camps': {
    title: 'Portable Labour Camps | Turnkey Workforce Housing',
    description: 'Complete labour camp cabins with sleeping, hygiene, and common areas for remote and urban projects.',
  },
  'portable-log-cabins': {
    title: 'Portable Log Cabins | Warm, Durable Timber Look',
    description: 'Log-style portable cabins that deliver warmth, durability, and fast deployment for residential or site needs.',
  },
  'portable-mosques': {
    title: 'Portable Mosques | Ready Prayer Spaces Anywhere',
    description: 'Portable mosque cabins designed with proper orientation, ablution options, and durable finishes for any location.',
  },
  'portable-pantry': {
    title: 'Portable Pantry Cabins | Compact Food Prep Units',
    description: 'Space-efficient pantry cabins with ventilation and storage, built for camps, events, and remote projects.',
  },
  'portable-restrooms': {
    title: 'Portable Restrooms | Clean, Ventilated Sanitary Units',
    description: 'Hygienic portable restroom cabins with quality fittings, ventilation, and easy maintenance.',
  },
  'portable-security-office': {
    title: 'Portable Security Offices | Guard Cabins & Checkpoints',
    description: 'Secure, visible portable security offices with windows, lighting, and durable construction for checkpoints.',
  },
  'portable-security-units': {
    title: 'Portable Security Units | Guard Booths & Site Control',
    description: 'Flexible guard units for site access control, built tough with clear visibility and fast deployment.',
  },
  'portable-site-office': {
    title: 'Portable Site Offices | Ready-to-Use Workspace Cabins',
    description: 'Turnkey portable site offices with workspace, storage, and climate comfort, delivered and installed quickly.',
  },
  'portable-warehouse': {
    title: 'Portable Warehouses | Modular Storage Buildings',
    description: 'Large-format portable warehouse cabins for secure on-site storage with rapid installation.',
  },
};

const prettyLabel = (segment: string) =>
  segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());

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

  const canonicalUrl = useMemo(() => `${baseUrl}${normalizedPath}`, [normalizedPath]);

  const seo = useMemo<SeoMeta>(() => {
    const direct = seoMetaMap[normalizedPath];
    if (direct) return { ...direct, ogImage: direct.ogImage || defaultOgImage };
    const slug = normalizedPath.split('/').filter(Boolean).pop() || '';
    const serviceMeta = serviceSeoMeta[slug];
    if (serviceMeta) return { ...serviceMeta, ogImage: serviceMeta.ogImage || defaultOgImage };
    return {
      title: 'Porta Cabins | Portable Buildings in Saudi Arabia',
      description:
        'Portable cabins, site offices, labour camps, aluminium fabrication, welding, and modular building solutions across Saudi Arabia.',
      ogImage: defaultOgImage,
    };
  }, [normalizedPath]);

  const breadcrumbLd = useMemo(() => {
    if (normalizedPath === '/') return null;
    const segments = normalizedPath.split('/').filter(Boolean);
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
    ];
    let acc = '';
    segments.forEach((segment, idx) => {
      acc += `/${segment}`;
      items.push({
        '@type': 'ListItem',
        position: idx + 2,
        name: prettyLabel(segment),
        item: `${baseUrl}${acc}`,
      });
    });
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  }, [normalizedPath]);

  const organizationLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'Porta Cabins',
      url: baseUrl,
      logo: `${baseUrl}/portacabins-logo.png`,
      telephone: '+966506802316',
      sameAs: [
        'https://www.facebook.com/profile.php?id=61581004881100&mibextid=ZbWKwL',
        'https://www.instagram.com/portacabins39/',
        'https://www.linkedin.com/in/porta-cabins-b50820385',
        'https://wa.me/966506802316',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+966506802316',
        areaServed: 'SA',
        availableLanguage: ['en', 'ar'],
      },
    }),
    [],
  );

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
      <Helmet>
        <html lang={locale === 'ar' ? 'ar' : 'en'} dir={locale === 'ar' ? 'rtl' : 'ltr'} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content={seo.robots || 'index,follow'} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}${normalizedPath}`} />
        <link rel="alternate" hrefLang="ar" href={`${baseUrl}${normalizedPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${normalizedPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Porta Cabins" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={seo.ogImage || defaultOgImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage || defaultOgImage} />
        <script type="application/ld+json">{JSON.stringify(organizationLd)}</script>
        {breadcrumbLd && <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>}
      </Helmet>
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
      <IconSprite />
      <Preloader />
      <div className="container-page">
        <Header locale={locale} />
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
