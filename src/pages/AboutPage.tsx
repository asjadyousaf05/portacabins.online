import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import criticalBaseCss from '../styles/critical-base.css?raw';
import { ensureInlineStyles, ensureStylesheets } from '../utils/legacy';

type Props = {
  locale: 'en' | 'ar';
};

const styles = [
  '/wp-content/plugins/larson-plugin/elementor/assets/css/style68b3.css?ver=1',
  '/wp-content/themes/larson/assets/styles/bootstrap-gridd4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/fonts/font-awesome/css/font-awesomed4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/styles/magnific-popupd4d0.css?ver=6.9',
  '/wp-content/themes/larson/styled4d0.css?ver=6.9',
  '/wp-content/plugins/elementor/assets/css/frontend.mine7a7.css?ver=3.34.0',
  '/wp-content/uploads/elementor/css/post-8cb81.css?ver=1766955556',
  '/wp-content/uploads/elementor/css/post-246c65e.css?ver=1766957889',
  '/wp-content/uploads/elementor/css/post-72837cb.css?ver=1766955553',
];

const inlineCss = [
  'img:is([sizes=auto i],[sizes^="auto," i]){contain-intrinsic-size:3000px 1500px}',
  'img.wp-smiley, img.emoji {display:inline !important;border:none !important;box-shadow:none !important;height:1em !important;width:1em !important;margin:0 0.07em !important;vertical-align:-0.1em !important;background:none !important;padding:0 !important;}',
  `.about-hero {position: relative; color: #fff; padding: 140px 0 110px; background-size: cover; background-position: center;}
   .about-hero::after {content:''; position:absolute; inset:0; background: linear-gradient(90deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));}
   .about-hero .container {position: relative; z-index: 1;}
   .about-hero h1 {font-size: 46px; margin: 10px 0;}
   .about-hero__lead {max-width: 760px; font-size: 18px; line-height: 1.7;}
   .section {padding: 80px 0;}
   .about-grid {display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;}
   .card {background: #fff; border: 1px solid #eee; border-radius: 6px; padding: 20px;}
   .card h3 {margin-top: 0; margin-bottom: 10px;}
   .card p {margin: 0; color: #666; line-height: 1.7;}
   .stat-row {display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-top: 24px;}
   .stat {background: #111; color: #fff; padding: 16px; border-radius: 6px; text-align: center;}
   .stat strong {display: block; font-size: 28px; margin-bottom: 6px;}
   @media (max-width: 767px) {.about-hero {padding: 100px 0 80px;} .about-hero h1 {font-size: 30px;}}
   .rtl .about-hero, .rtl .card, .rtl .stat {text-align: right;}
  `,
];

const aboutCopy = {
  en: {
    title: 'About Portacabins',
    lead:
      'Portacabins delivers portable cabins, aluminium works, welding, and cutting & bending services with fast deployment across Saudi Arabia.',
    body: `From site offices and worker housing to portable mosques and storage, our cabins are built with insulated panels, durable steel frames, and full MEP fit-out. Our aluminium and steel fabrication teams handle doors, windows, façades, pergolas, and structural welding to keep every project moving quickly.`,
    promise: 'Speed, durability, and a perfect fit for every site.',
    stats: [
      { value: '20+', label: 'Years of experience' },
      { value: '100+', label: 'Completed projects' },
      { value: '24/7', label: 'Support in KSA' },
    ],
  },
  ar: {
    title: 'عن بورتاكابنز',
    lead:
      'تقدم بورتاكابنز كبائن جاهزة وأعمال الألمنيوم واللحام والقص والثني مع تركيب سريع في جميع أنحاء السعودية.',
    body: `من المكاتب الميدانية وسكن العمال إلى المساجد والمستودعات الجاهزة، نبني كبائن معزولة بهياكل فولاذية متينة وخدمات ميكانيكية وكهرباء وصحية متكاملة. فرق الألمنيوم والحديد لدينا تنجز الأبواب والنوافذ والواجهات والبرجولات واللحامات الهيكلية لتسريع كل مشروع.`,
    promise: 'سرعة، متانة، وتفصيل يناسب موقعك.',
    stats: [
      { value: '20+', label: 'عاماً من الخبرة' },
      { value: '100+', label: 'مشروعاً منجزاً' },
      { value: '24/7', label: 'دعم داخل المملكة' },
    ],
  },
};

export const AboutPage = ({ locale }: Props) => {
  const copy = aboutCopy[locale];
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroBg, setHeroBg] = useState<string | null>(null);

  useEffect(() => {
    const id = 'critical-base-style';
    if (!document.getElementById(id)) {
      const styleEl = document.createElement('style');
      styleEl.id = id;
      styleEl.textContent = criticalBaseCss;
      document.head.prepend(styleEl);
    }
    ensureStylesheets(styles, '/content/about/index.html');
    ensureInlineStyles(inlineCss, 'about-inline');
  }, [locale]);

  useEffect(() => {
    const target = heroRef.current;
    const url = '/wp-content/uploads/2025/09/portable-cabin-1920x1080.webp';
    if (!target) return;

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
  }, []);

  return (
    <>
      <Helmet>
        <title>{locale === 'ar' ? 'عن بورتاكابنز' : 'About - Porta Cabins'}</title>
        <meta
          name="description"
          content={
            locale === 'ar'
              ? 'بورتاكابنز تقدم كبائن جاهزة معزولة وأعمال ألمنيوم ولحام وقص وثني مع تركيب سريع في السعودية.'
              : 'Portacabins provides portable cabins, aluminium works, welding, and cutting & bending services across Saudi Arabia.'
          }
        />
        <link rel="canonical" href={`${window.location.origin}/about`} />
        <style>{`[data-aos]{opacity:1!important;transform:none!important;transition:none!important;}`}</style>
      </Helmet>
      <main className="webpage">
        <section
          className="about-hero"
          ref={heroRef}
          style={{
            backgroundImage: heroBg ? `url(${heroBg})` : undefined,
            backgroundColor: '#0c0c0c',
          }}
          aria-label={copy.title}
        >
          <div className="container">
            <div className="service-hero__kicker">{copy.title}</div>
            <h1>{copy.title}</h1>
            <p className="about-hero__lead">{copy.lead}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="about-grid">
              <div className="card">
                <h3>{locale === 'ar' ? 'من نحن' : 'Who we are'}</h3>
                <p>{copy.body}</p>
              </div>
              <div className="card">
                <h3>{locale === 'ar' ? 'وعدنا' : 'Our promise'}</h3>
                <p>{copy.promise}</p>
              </div>
            </div>
            <div className="stat-row">
              {copy.stats.map((s, idx) => (
                <div className="stat" key={idx}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
