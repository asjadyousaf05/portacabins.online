import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { ensureInlineStyles, ensureStylesheets, normalizeAssetHref, normalizePath } from '../utils/legacy';
import { defaultSeo, seoMeta } from '../seo';
import criticalBaseCss from '../styles/critical-base.css?raw';

type MetaState = {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
};

type PageContentProps = {
  contentPath: string;
  fallbackTitle?: string;
  locale: 'en' | 'ar';
  staticHtml?: string;
  staticLoading?: boolean;
};

export const PageContent = ({
  contentPath,
  fallbackTitle = 'Porta Cabins',
  locale,
  staticHtml,
  staticLoading,
}: PageContentProps) => {
  const [html, setHtml] = useState<string>('');
  const [heroHtml, setHeroHtml] = useState<string | null>(null);
  const [sectionHtml, setSectionHtml] = useState<string[]>([]);
  const [meta, setMeta] = useState<MetaState>({});
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const criticalId = 'critical-base-style';
    if (!document.getElementById(criticalId)) {
      const styleEl = document.createElement('style');
      styleEl.id = criticalId;
      styleEl.textContent = criticalBaseCss;
      document.head.prepend(styleEl);
    }

  }, []);

  useEffect(() => {
    let cancelled = false;
    setHeroHtml(null);
    setSectionHtml([]);

    const loadPage = async () => {
      setError(null);
      if (staticLoading && !staticHtml) {
        setHtml('');
        return;
      }

      let text = staticHtml;
      if (!text) {
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${contentPath}`);
        }
        text = await response.text();
      }
      if (cancelled) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');

      const main = doc.querySelector('main') ?? doc.body;
      const bodyClass = doc.body.getAttribute('class');

      const isHome = normalizePath(location.pathname, location.pathname) === '/';
      let pendingSections: string[] = [];

      // Ensure all images have reasonable alt text for accessibility/SEO and lazy loading
      const images = Array.from(doc.querySelectorAll('img'));
      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        if (alt && alt.trim()) return;
        const src = img.getAttribute('src') || '';
        const file = src.split('/').pop() || 'portacabins image';
        const fallbackAlt =
          locale === 'ar'
            ? 'صورة بورتاكابين'
            : file.replace(/\.[a-zA-Z0-9]+$/, '').replace(/[-_]+/g, ' ').trim() || 'Portacabins image';
        img.setAttribute('alt', fallbackAlt);
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });

      // Prioritize homepage: hero first, services image next; keep last image lazy
      if (isHome && images.length) {
        images[0].setAttribute('loading', 'eager');
        images[0].setAttribute('fetchpriority', 'high');
        const servicesImg = doc.querySelector('.services-section__image img');
        if (servicesImg) {
          servicesImg.setAttribute('loading', 'eager');
          servicesImg.setAttribute('fetchpriority', 'high');
          servicesImg.setAttribute('decoding', 'auto');
        }
        const lastImg = images[images.length - 1];
        lastImg.setAttribute('loading', 'lazy');
        lastImg.setAttribute('decoding', 'async');
      }

      main.querySelectorAll('script').forEach((el) => el.remove());

      // Replace Elementor image carousels with simple image grids for services pages
      const carousels = Array.from(main.querySelectorAll('.elementor-image-carousel-wrapper'));
      carousels.forEach((carousel) => {
        const imgs = Array.from(carousel.querySelectorAll('img'));
        const grid = doc.createElement('div');
        grid.className = 'services-images-grid';
        imgs.forEach((img) => {
          const figure = doc.createElement('figure');
          figure.className = 'services-images-grid__item';
          const newImg = doc.createElement('img');
          const src = img.getAttribute('src') || '';
          newImg.setAttribute('src', src);
          newImg.setAttribute('alt', img.getAttribute('alt') || 'service image');
          newImg.setAttribute('loading', 'lazy');
          newImg.setAttribute('decoding', 'async');
          figure.appendChild(newImg);
          grid.appendChild(figure);
        });
        carousel.replaceWith(grid);
      });

      const styles = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
        .map((link) => link.getAttribute('href') || '')
        .filter(Boolean);
      ensureStylesheets(styles, contentPath);

      const inlineStyles = Array.from(doc.querySelectorAll('style'))
        .map((style) => style.textContent || '')
        .filter(Boolean);
      const galleryGridStyle = `
        .services-images-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 20px 0; }
        .services-images-grid__item img { width: 100%; height: auto; display: block; }
      `;
      inlineStyles.push(galleryGridStyle);
      ensureInlineStyles(inlineStyles, contentPath);

      if (cancelled) return;

      const title = doc.querySelector('title')?.textContent || undefined;
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || undefined;
      const keywordsMeta = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || undefined;
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || undefined;
      const pathKey = normalizePath(location.pathname, location.pathname);
      const localizedSeo = (seoMeta[pathKey] || defaultSeo)[locale];

      const classes = [bodyClass, locale === 'ar' ? 'rtl' : ''].filter(Boolean).join(' ');
      document.body.className = classes;

      setMeta({
        title: title || localizedSeo.title,
        description: description || localizedSeo.description,
        keywords: keywordsMeta || localizedSeo.keywords.join(', '),
        canonical: canonical ? normalizeAssetHref(canonical) ?? canonical : undefined,
      });
      if (isHome) {
        const sections = Array.from(main.querySelectorAll('section.elementor-section'));
        if (sections.length) {
          const [first, ...rest] = sections;
          setHeroHtml(first.outerHTML);
          pendingSections = rest.map((s) => s.outerHTML);
          setHtml('');
        } else {
          setHeroHtml(null);
          setHtml(main.innerHTML);
        }
      } else {
        setHeroHtml(null);
        setHtml(main.innerHTML);
      }

      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (pendingSections.length) {
        const appendLater = () => setSectionHtml(pendingSections);
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(appendLater, { timeout: 800 });
        } else {
          setTimeout(appendLater, 200);
        }
      }
    };

    loadPage().catch((err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unable to load content';
      setError(message);
    });

    return () => {
      cancelled = true;
    };
  }, [contentPath, staticHtml, staticLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [contentPath]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const targetAttr = anchor.getAttribute('target');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      if (targetAttr === '_blank' || anchor.hasAttribute('download')) return;
      if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) return;

      if (href.startsWith('#')) {
        const id = href.slice(1);
        const destination = document.getElementById(id);
        if (destination) {
          event.preventDefault();
          destination.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      event.preventDefault();
      const nextPath = normalizePath(href, location.pathname);
      navigate(nextPath);
    };

    container.addEventListener('click', handleClick);
    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [location.pathname, navigate, html]);

  const pageTitle = meta.title || fallbackTitle;
  const canonical = meta.canonical
    ? meta.canonical.startsWith('http')
      ? meta.canonical
      : `${window.location.origin}${normalizePath(meta.canonical, location.pathname)}`
    : `${window.location.origin}${normalizePath(location.pathname, location.pathname)}`;

  if (staticLoading && !html && !heroHtml) {
    return (
      <div className="container" style={{ padding: '2rem', color: '#fff' }}>
        <Helmet>
          <title>{fallbackTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem', color: '#fff' }}>
        <Helmet>
          <title>{fallbackTitle}</title>
        </Helmet>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        {meta.description && <meta name="description" content={meta.description} />}
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        {canonical && <link rel="canonical" href={canonical} />}
      </Helmet>
      <div ref={containerRef}>
        {heroHtml && <div dangerouslySetInnerHTML={{ __html: heroHtml }} />}
        {html && !heroHtml && <div dangerouslySetInnerHTML={{ __html: html }} />}
        {sectionHtml.map((chunk, idx) => (
          <div key={idx} dangerouslySetInnerHTML={{ __html: chunk }} />
        ))}
      </div>
    </>
  );
};
