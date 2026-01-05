type Locale = 'en' | 'ar';

type Loader = () => Promise<string>;
type LoaderMap = Record<string, Loader>;

const enHtmlLoaders = import.meta.glob('../public/content/**/*.html', {
  query: '?raw',
  import: 'default',
}) as LoaderMap;
const arHtmlLoaders = import.meta.glob('../public/content-ar/**/*.html', {
  query: '?raw',
  import: 'default',
}) as LoaderMap;

const normalizeKey = (contentPath: string) => {
  const trimmed = contentPath.startsWith('/') ? contentPath.slice(1) : contentPath;
  return `../public/${trimmed}`;
};

export const loadStaticHtml = async (contentPath: string, locale: Locale): Promise<string | null> => {
  const key = normalizeKey(contentPath);
  const loaders = locale === 'ar' ? arHtmlLoaders : enHtmlLoaders;
  const loader = loaders[key];

  if (!loader) return null;

  return loader();
};
