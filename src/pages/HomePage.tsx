import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { siteCopy } from '../content/siteCopy';
import criticalBaseCss from '../styles/critical-base.css?raw';
import { HeroSection } from '../sections/home/HeroSection';
import { ServicesSection } from '../sections/home/ServicesSection';
import { StatsSection } from '../sections/home/StatsSection';
import { GallerySection } from '../sections/home/GallerySection';
import { AboutSection } from '../sections/home/AboutSection';
import { ensureInlineStyles, ensureStylesheets } from '../utils/legacy';
import { defaultSeo, seoMeta } from '../seo';

type Props = {
  locale: 'en' | 'ar';
};

const homeStyles = [
  '/wp-content/plugins/larson-plugin/elementor/assets/css/style68b3.css?ver=1',
  '/wp-content/themes/larson/assets/styles/bootstrap-gridd4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/fonts/font-awesome/css/font-awesomed4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/styles/magnific-popupd4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/styles/aosd4d0.css?ver=6.9',
  '/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min94a4.css?ver=8.4.5',
  '/wp-content/themes/larson/assets/styles/jquery.pagepilingd4d0.css?ver=6.9',
  '/wp-content/themes/larson/styled4d0.css?ver=6.9',
  '/wp-content/plugins/elementor/assets/css/frontend.mine7a7.css?ver=3.34.0',
  '/wp-content/uploads/elementor/css/post-8cb81.css?ver=1766955556',
  '/wp-content/uploads/elementor/css/post-1304ea.css?ver=1766961090',
  '/wp-content/uploads/elementor/css/post-72837cb.css?ver=1766955553',
];

// Minimal inline styles pulled from the original head that influence layout/reset.
const inlineCss = [
  'img:is([sizes=auto i],[sizes^=\"auto,\" i]){contain-intrinsic-size:3000px 1500px}',
  'img.wp-smiley, img.emoji {display:inline !important;border:none !important;box-shadow:none !important;height:1em !important;width:1em !important;margin:0 0.07em !important;vertical-align:-0.1em !important;background:none !important;padding:0 !important;}',
];

export const HomePage = ({ locale }: Props) => {
  const copy = siteCopy[locale];
  const seo = (seoMeta['/'] || defaultSeo)[locale];
  const [showRest, setShowRest] = useState(true);

  useEffect(() => {
    const id = 'critical-base-style';
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent = criticalBaseCss;
      document.head.prepend(styleEl);
    }

    ensureStylesheets(homeStyles, '/content/index.html');
    ensureInlineStyles(inlineCss, 'home-inline');

    const revealRest = () => setShowRest(true);
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(revealRest);
    } else {
      setTimeout(revealRest, 50);
    }

    // Minimal scroll-in for non-hero sections
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              if (observer) observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
    }

    const revealEls = Array.from(document.querySelectorAll('.js-reveal'));
    if (observer) {
      revealEls.forEach((el) => observer.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <link rel="canonical" href={window.location.origin + '/'} />
        <link rel="preload" as="image" href={copy.services.cards[0]?.image} />
        <style>{`[data-aos]{opacity:1!important;transform:none!important;transition:none!important;}`}</style>
        <style>{`
          .js-reveal { opacity: 0; transform: translateY(16px); }
          .js-reveal.is-visible { opacity: 1; transform: translateY(0); transition: opacity 0.4s ease, transform 0.4s ease; }
          html[dir='rtl'], html[dir='rtl'] body { overflow-x: hidden; }
          html[dir='rtl'] body, html[dir='rtl'] #root, html[dir='rtl'] .container-page { width: 100%; max-width: 100vw; }
          html[dir='rtl'] .webpage,
          html[dir='rtl'] .elementor-section,
          html[dir='rtl'] .elementor-container,
          html[dir='rtl'] .elementor-column,
          html[dir='rtl'] .main-slider,
          html[dir='rtl'] .swiper-container {
            width: 100%;
            max-width: 100vw;
            overflow: hidden;
          }
          .rtl-page { direction: rtl; text-align: right; }
          .rtl-page .services-section__heading span { display: block; text-align: right; }
          .rtl-page .services-section__pseudoheading span { display: block; text-align: right; }
          .rtl-page .services-section__list { padding-right: 0; }
          .rtl-page .about-block__heading span,
          .rtl-page .about-block__pseudoheading span,
          .rtl-page .about-block__text { text-align: right; }
          .rtl-page .gallery-section__heading,
          .rtl-page .stats__item { text-align: right; }
        `}</style>
      </Helmet>
      <main className={`webpage ${locale === 'ar' ? 'rtl-page' : ''}`}>
        <HeroSection copy={copy.hero} locale={locale} />
        {showRest && (
          <>
            <div className="js-reveal">
              <ServicesSection copy={copy.services} />
            </div>
            <div className="js-reveal">
              <AboutSection copy={copy.about} />
            </div>
            {copy.stats && (
              <div className="js-reveal">
                <StatsSection stats={copy.stats} />
              </div>
            )}
            {copy.galleryPreview && (
              <div className="js-reveal">
                <GallerySection copy={copy.galleryPreview} />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};
