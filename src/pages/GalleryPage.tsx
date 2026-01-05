import { Helmet } from 'react-helmet';
import { siteCopy } from '../content/siteCopy';
import { ensureInlineStyles, ensureStylesheets } from '../utils/legacy';
import { defaultSeo, seoMeta } from '../seo';
import { useEffect } from 'react';

type Props = {
  locale: 'en' | 'ar';
};

const galleryStyles = [
  '/wp-content/themes/larson/styled4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/fonts/font-awesome/css/font-awesomed4d0.css?ver=6.9',
  '/wp-content/themes/larson/assets/styles/bootstrap-gridd4d0.css?ver=6.9',
  '/wp-content/plugins/elementor/assets/css/frontend.mine7a7.css?ver=3.34.0',
  '/wp-content/uploads/elementor/css/post-8cb81.css?ver=1766955556',
  '/wp-content/uploads/elementor/css/post-72837cb.css?ver=1766955553',
];

const inlineCss = [
  '.gallery-hero { position: relative; min-height: 40vh; display: flex; align-items: center; justify-content: center; color: #fff; text-align: center; overflow: hidden; }',
  '.gallery-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.55); }',
  '.gallery-hero__content { position: relative; z-index: 1; padding: 60px 20px; }',
  '.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; padding: 24px 0; }',
  '.gallery-grid__item { overflow: hidden; border-radius: 6px; background: #0f0f0f; border: 1px solid rgba(255,255,255,0.08); }',
  '.gallery-grid__item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease; }',
  '.gallery-grid__item:hover img { transform: scale(1.03); }',
  '.gallery-page__wrap { padding: 20px 0 60px; }',
  '.gallery-page__heading { margin: 0; color: #fff; font-size: 32px; letter-spacing: 0.02em; }',
  '.gallery-page__description { color: #bfbfbf; max-width: 720px; margin: 10px auto 0; font-size: 16px; line-height: 1.6; }',
];

export const GalleryPage = ({ locale }: Props) => {
  const copy = siteCopy[locale];
  const page = copy.galleryPage;
  const seo = (seoMeta['/gallery'] || defaultSeo)[locale];

  useEffect(() => {
    ensureStylesheets(galleryStyles, '/content/gallery/index.html');
    ensureInlineStyles(inlineCss, 'gallery-inline');
  }, []);

  if (!page) return null;

  return (
    <>
      <Helmet>
        <title>{seo.title || `${copy.galleryPage?.title || 'Gallery'} - Porta Cabins`}</title>
        <meta name="description" content={seo.description || page.description} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <link rel="canonical" href={`${window.location.origin}/gallery`} />
      </Helmet>
      <main className="webpage gallery-page__wrap">
        <section className="gallery-hero" aria-label={page.title}>
          <div className="gallery-hero__bg" style={{ backgroundImage: `url(${page.heroImage.src})` }} />
          <div className="gallery-hero__content container">
            <h1 className="gallery-page__heading">{page.title}</h1>
            {page.description && <p className="gallery-page__description">{page.description}</p>}
          </div>
        </section>

        <section className="container">
          <div className="gallery-grid">
            {page.images.map((img, idx) => (
              <div className="gallery-grid__item" key={`${img.src}-${idx}`}>
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
