import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { servicesContent, servicePaths } from '../../content/servicesContent';
import criticalBaseCss from '../../styles/critical-base.css?raw';
import { ensureInlineStyles, ensureStylesheets } from '../../utils/legacy';

type Props = {
  locale: 'en' | 'ar';
};

const heroStyles = [
  '/wp-content/plugins/larson-plugin/elementor/assets/css/style68b3.css?ver=1',
  '/wp-content/themes/larson/assets/styles/bootstrap-gridd4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/fonts/font-awesome/css/font-awesomed4d0.css?ver=6.9',
  '/wp-content/themes/larson/styled4d0.css?ver=6.9',
  '/wp-content/plugins/elementor/assets/css/frontend.mine7a7.css?ver=3.34.0',
  '/wp-content/uploads/elementor/css/post-8cb81.css?ver=1766955556',
  '/wp-content/uploads/elementor/css/post-72837cb.css?ver=1766955553',
];

const inlineCss = [
  'img:is([sizes=auto i],[sizes^="auto," i]){contain-intrinsic-size:3000px 1500px}',
  'img.wp-smiley, img.emoji {display:inline !important;border:none !important;box-shadow:none !important;height:1em !important;width:1em !important;margin:0 0.07em !important;vertical-align:-0.1em !important;background:none !important;padding:0 !important;}',
  `.service-hero {position: relative; color: #fff; padding: 140px 0 100px; background-size: cover; background-position: center;}
   .service-hero::after {content:''; position:absolute; inset:0; background: linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.25));}
   .service-hero .container {position: relative; z-index: 1;}
   .service-hero h1 {font-size: 46px; margin: 10px 0;}
   .service-hero__lead {max-width: 760px; font-size: 18px; line-height: 1.7;}
   .services-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 32px;}
   .service-card {background: #fff; border: 1px solid #eee; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; height: 100%;}
   .service-card__image img {width: 100%; height: auto; display: block;}
   .service-card__body {padding: 18px 18px 14px; flex: 1 1 auto; display: flex; flex-direction: column; gap: 10px;}
   .service-card__title {font-size: 20px; margin: 0;}
   .service-card__summary {margin: 0; color: #666; line-height: 1.6; font-size: 15px;}
   .service-card__link {margin-top: auto;}
   @media (max-width: 767px) {.service-hero {padding: 100px 0 80px;} .service-hero h1 {font-size: 30px;}}
   .rtl .service-hero, .rtl .service-card__title, .rtl .service-card__summary {text-align: right;}
  `,
];

export const PortaCabinsPage = ({ locale }: Props) => {
  const copy = servicesContent[locale];
  const main = copy.services['/services/porta-cabins'];
  const pageTitle = main?.name || (locale === 'ar' ? 'كبائن برتاكابين' : 'Porta Cabins');
  const detailLabel = locale === 'ar' ? 'عرض التفاصيل' : 'View details';

  const childCards = servicePaths
    .filter((p) => p.startsWith('/services/porta-cabins/') && p !== '/services/porta-cabins')
    .map((path) => {
      const svc = copy.services[path];
      return {
        path,
        title: svc.name,
        summary: svc.intro,
        image: svc.cardImage || svc.heroImage,
        alt: svc.cardAlt || svc.heroAlt,
      };
    });

  useEffect(() => {
    const id = 'critical-base-style';
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent = criticalBaseCss;
      document.head.prepend(styleEl);
    }
    ensureStylesheets(heroStyles, '/content/services/porta-cabins/index.html');
    ensureInlineStyles(inlineCss, 'services-inline');
  }, [locale]);

  if (!main) {
    return (
      <div className="container" style={{ padding: '2rem', color: '#fff' }}>
        <Helmet>
          <title>Porta Cabins</title>
        </Helmet>
        <p>Content not available.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{main.seo.title}</title>
        <meta name="description" content={main.seo.description} />
        <link rel="canonical" href={`${window.location.origin}/services/porta-cabins`} />
        <style>{`[data-aos]{opacity:1!important;transform:none!important;transition:none!important;}`}</style>
      </Helmet>
      <main className="webpage">
        <section
          className="service-hero"
          style={{
            backgroundImage: `url(${main.heroImage})`,
          }}
          aria-label={main.heroAlt}
        >
          <div className="container">
            <div className="service-hero__kicker">{pageTitle}</div>
            <h1>{main.heroTitle || pageTitle}</h1>
            <p className="service-hero__lead">{main.intro}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="services-grid">
              {childCards.map((card) => (
                <div className="service-card" key={card.path}>
                  <div className="service-card__image">
                    <img src={card.image} alt={card.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className="service-card__body">
                    <h3 className="service-card__title">{card.title}</h3>
                    <p className="service-card__summary">{card.summary}</p>
                    <div className="service-card__link">
                      <Link className="link-arrow" to={card.path}>
                        <span>{detailLabel}</span>
                        <svg width="20" height="20">
                          <use xlinkHref="#chevron-right" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
