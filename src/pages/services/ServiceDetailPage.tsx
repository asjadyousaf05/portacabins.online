import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { servicesContent, servicePaths } from '../../content/servicesContent';
import criticalBaseCss from '../../styles/critical-base.css?raw';
import { ensureInlineStyles, ensureStylesheets, loadLegacyScripts, refreshLegacyUi } from '../../utils/legacy';

type Props = {
  locale: 'en' | 'ar';
  path: string;
};

const serviceStyles = [
  '/wp-content/plugins/larson-plugin/elementor/assets/css/style68b3.css?ver=1',
  '/wp-content/themes/larson/assets/styles/bootstrap-gridd4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/fonts/font-awesome/css/font-awesomed4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/styles/magnific-popupd4d0.css?ver=6.9',
  '/wp-content/themes/larson/styled4d0.css?ver=6.9',
  '/wp-content/plugins/elementor/assets/css/frontend.mine7a7.css?ver=3.34.0',
  '/wp-content/uploads/elementor/css/post-8cb81.css?ver=1766955556',
  '/wp-content/uploads/elementor/css/post-72837cb.css?ver=1766955553',
];

const inlineCss = [
  'img:is([sizes=auto i],[sizes^="auto," i]){contain-intrinsic-size:3000px 1500px}',
  'img.wp-smiley, img.emoji {display:inline !important;border:none !important;box-shadow:none !important;height:1em !important;width:1em !important;margin:0 0.07em !important;vertical-align:-0.1em !important;background:none !important;padding:0 !important;}',
  `.service-hero {position: relative; color: #fff; padding: 140px 0 110px; background-size: cover; background-position: center; overflow: hidden;}
   .service-hero::after {content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.3));}
   .service-hero .container {position: relative; z-index: 1;}
   .service-hero h1 {font-size: 48px; margin: 12px 0;}
   .service-hero__kicker {display: inline-block; padding: 6px 12px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255,255,255,0.25); font-weight: 600; letter-spacing: 0.04em;}
   .service-hero__lead {max-width: 760px; font-size: 18px; line-height: 1.7;}
   .service-hero__cta {margin-top: 18px;}
   .btn-whatsapp {display: inline-flex; align-items: center; gap: 8px; background: #25d366; color: #fff; padding: 12px 16px; border-radius: 4px; font-weight: 700; text-decoration: none;}
   .btn-whatsapp:hover {background: #1ebe5f; color: #fff;}
   .section {padding: 80px 0;}
   .service-list {list-style: none; padding: 0; margin: 0;}
   .service-list li {margin-bottom: 10px; padding-left: 18px; position: relative;}
   .service-list li::before {content: '\\2022'; position: absolute; left: 0; color: #f6b24b;}
   .services-images-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-top: 24px;}
   .services-images-grid__item img {width: 100%; height: auto; display: block; border-radius: 4px;}
   .section__header {margin-bottom: 18px;}
   @media (max-width: 767px) {.service-hero {padding: 100px 0 80px;} .service-hero h1 {font-size: 32px;}}
   .rtl .service-hero, .rtl .section__header, .rtl .service-list {text-align: right;}
   .rtl .service-list li {padding-right: 18px; padding-left: 0;}
   .rtl .service-list li::before {left: auto; right: 0;}
  `,
];

const ensureCriticalBase = () => {
  const id = 'critical-base-style';
  if (!document.getElementById(id)) {
    const styleEl = document.createElement('style');
    styleEl.id = id;
    styleEl.textContent = criticalBaseCss;
    document.head.prepend(styleEl);
  }
};

export const ServiceDetailPage = ({ locale, path }: Props) => {
  const copy = servicesContent[locale]?.services[path];
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroBg, setHeroBg] = useState<string | null>(null);

  useEffect(() => {
    ensureCriticalBase();
    ensureStylesheets(serviceStyles, path);
    ensureInlineStyles(inlineCss, 'service-detail-inline');
    loadLegacyScripts('/services/').then(refreshLegacyUi).catch(() => undefined);
  }, [locale, path]);

  useEffect(() => {
    const target = heroRef.current;
    const url = copy?.heroImage;
    if (!target || !url) return;

    const load = () => {
      const img = new Image();
      img.src = url;
      img.onload = () => setHeroBg(url);
      img.onerror = () => setHeroBg(url);
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            load();
            obs.disconnect();
          }
        },
        { rootMargin: '200px 0px' },
      );
      obs.observe(target);
      return () => obs.disconnect();
    } else {
      load();
    }
  }, [copy?.heroImage]);

  if (!copy) {
    return (
      <div className="container" style={{ padding: '2rem', color: '#fff' }}>
        <Helmet>
          <title>Service not found</title>
        </Helmet>
        <p>Service not found.</p>
      </div>
    );
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonical = `${origin}${path}`;
  const ogLocale = locale === 'ar' ? 'ar_SA' : 'en_US';
  const absoluteHeroImage = origin ? `${origin}${copy.heroImage}` : copy.heroImage;
  const keywords = copy.seo.keywords.join(', ');
  const galleryItems = copy.gallery || [];
  const ctaLabel = locale === 'ar' ? 'تحدث على واتساب' : 'Chat on WhatsApp';
  const subLabel = locale === 'ar' ? 'أنواع الكبائن' : 'Cabin types';
  const aboutLabel = locale === 'ar' ? 'عن الخدمة' : 'About the service';
  const featuresLabel = locale === 'ar' ? 'أهم المزايا' : 'Key features';
  const galleryLabel = locale === 'ar' ? 'المعرض' : 'Gallery';
  const ldService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: copy.seo.title || copy.name,
    description: copy.seo.description || copy.intro,
    areaServed: 'Saudi Arabia',
    provider: {
      '@type': 'Organization',
      name: 'Portacabins',
      url: origin || 'https://portacabins.online',
    },
    url: canonical,
    image: absoluteHeroImage,
    serviceType: copy.name,
    inLanguage: locale === 'ar' ? 'ar' : 'en',
  };
  const ldBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${origin}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: copy.name,
        item: canonical,
      },
    ],
  };
  const subServices =
    path === '/services/porta-cabins'
      ? servicePaths
          .filter((p) => p.startsWith('/services/porta-cabins/') && p !== '/services/porta-cabins')
          .map((p) => ({ path: p, name: servicesContent[locale].services[p].name }))
      : [];

  return (
    <>
      <Helmet>
        <title>{copy.seo.title}</title>
        <meta name="description" content={copy.seo.description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={canonical} />
        <link rel="alternate" hrefLang="ar" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />
        <meta property="og:title" content={copy.seo.title} />
        <meta property="og:description" content={copy.seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={absoluteHeroImage} />
        <meta property="og:locale" content={ogLocale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={copy.seo.title} />
        <meta name="twitter:description" content={copy.seo.description} />
        <meta name="twitter:image" content={absoluteHeroImage} />
        <style>{`[data-aos]{opacity:1!important;transform:none!important;transition:none!important;}`}</style>
        <script type="application/ld+json">{JSON.stringify(ldService)}</script>
        <script type="application/ld+json">{JSON.stringify(ldBreadcrumbs)}</script>
      </Helmet>
      <main className="webpage">
        <section
          className="service-hero"
          ref={heroRef}
          style={{
            backgroundImage: heroBg ? `url(${heroBg})` : undefined,
            backgroundColor: '#0c0c0c',
          }}
          aria-label={copy.heroAlt}
        >
          <div className="container">
            {copy.heroKicker && <div className="service-hero__kicker">{copy.heroKicker}</div>}
            <h1>{copy.heroTitle || copy.name}</h1>
            <p className="service-hero__lead">{copy.intro}</p>
            <div className="service-hero__cta">
              <a className="btn-whatsapp" href="https://wa.me/966506802316" target="_blank" rel="noreferrer">
                <svg width="20" height="20">
                  <use xlinkHref="#phone" />
                </svg>
                <span>{ctaLabel}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section service-body">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="section__header">
                  <h3>{aboutLabel}</h3>
                </div>
                <p>{copy.intro}</p>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="section__header">
                  <h3>{featuresLabel}</h3>
                </div>
                <ul className="service-list">
                  {copy.bullets.map((item, idx) => (
                    <li key={`${path}-bullet-${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {subServices.length > 0 && (
          <section className="section service-body">
            <div className="container">
              <div className="section__header">
                <h3>{subLabel}</h3>
              </div>
              <div className="services-images-grid">
                {subServices.map((svc) => (
                  <figure className="services-images-grid__item" key={svc.path}>
                    <a href={svc.path} className="link-arrow">
                      <span>{svc.name}</span>
                    </a>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {galleryItems.length > 0 && (
          <section className="section service-gallery">
            <div className="container">
              <div className="section__header">
                <h3>{galleryLabel}</h3>
              </div>
              <div className="services-images-grid">
                {galleryItems.map((item, idx) => (
                  <figure className="services-images-grid__item" key={`${path}-image-${idx}`}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding={idx === 0 ? 'auto' : 'async'}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};
