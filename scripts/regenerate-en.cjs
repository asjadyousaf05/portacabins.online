const fs = require('fs');
const path = require('path');

const domainRegex = /https?:\/\/(www\.)?portacabins\.online/gi;

const pages = [
  { id: 13, ar: 'public/content-ar/index.html', en: 'public/content/index.html', route: '/' },
  { id: 246, ar: 'public/content-ar/about/index.html', en: 'public/content/about/index.html', route: '/about/' },
  { id: 368, ar: 'public/content-ar/contact/index.html', en: 'public/content/contact/index.html', route: '/contact/' },
  { id: 336, ar: 'public/content-ar/services/index.html', en: 'public/content/services/index.html', route: '/services/' },
  {
    id: 1788,
    ar: 'public/content-ar/services/aluminium/index.html',
    en: 'public/content/services/aluminium/index.html',
    route: '/services/aluminium/',
  },
  {
    id: 1792,
    ar: 'public/content-ar/services/cutting-and-bending/index.html',
    en: 'public/content/services/cutting-and-bending/index.html',
    route: '/services/cutting-and-bending/',
  },
  {
    id: 1790,
    ar: 'public/content-ar/services/welding/index.html',
    en: 'public/content/services/welding/index.html',
    route: '/services/welding/',
  },
  {
    id: 1733,
    ar: 'public/content-ar/services/porta-cabins/index.html',
    en: 'public/content/services/porta-cabins/index.html',
    route: '/services/porta-cabins/',
  },
  {
    id: 1731,
    ar: 'public/content-ar/services/porta-cabins/portable-canteen/index.html',
    en: 'public/content/services/porta-cabins/portable-canteen/index.html',
    route: '/services/porta-cabins/portable-canteen/',
  },
  {
    id: 1729,
    ar: 'public/content-ar/services/porta-cabins/portable-house/index.html',
    en: 'public/content/services/porta-cabins/portable-house/index.html',
    route: '/services/porta-cabins/portable-house/',
  },
  {
    id: 1730,
    ar: 'public/content-ar/services/porta-cabins/portable-labour-camps/index.html',
    en: 'public/content/services/porta-cabins/portable-labour-camps/index.html',
    route: '/services/porta-cabins/portable-labour-camps/',
  },
  {
    id: 1766,
    ar: 'public/content-ar/services/porta-cabins/portable-log-cabins/index.html',
    en: 'public/content/services/porta-cabins/portable-log-cabins/index.html',
    route: '/services/porta-cabins/portable-log-cabins/',
  },
  {
    id: 1732,
    ar: 'public/content-ar/services/porta-cabins/portable-mosques/index.html',
    en: 'public/content/services/porta-cabins/portable-mosques/index.html',
    route: '/services/porta-cabins/portable-mosques/',
  },
  {
    id: 1756,
    ar: 'public/content-ar/services/porta-cabins/portable-pantry/index.html',
    en: 'public/content/services/porta-cabins/portable-pantry/index.html',
    route: '/services/porta-cabins/portable-pantry/',
  },
  {
    id: 1757,
    ar: 'public/content-ar/services/porta-cabins/portable-restrooms/index.html',
    en: 'public/content/services/porta-cabins/portable-restrooms/index.html',
    route: '/services/porta-cabins/portable-restrooms/',
  },
  {
    id: 1771,
    ar: 'public/content-ar/services/porta-cabins/portable-security-office/index.html',
    en: 'public/content/services/porta-cabins/portable-security-office/index.html',
    route: '/services/porta-cabins/portable-security-office/',
  },
  {
    id: 1763,
    ar: 'public/content-ar/services/porta-cabins/portable-security-units/index.html',
    en: 'public/content/services/porta-cabins/portable-security-units/index.html',
    route: '/services/porta-cabins/portable-security-units/',
  },
  {
    id: 1759,
    ar: 'public/content-ar/services/porta-cabins/portable-site-office/index.html',
    en: 'public/content/services/porta-cabins/portable-site-office/index.html',
    route: '/services/porta-cabins/portable-site-office/',
  },
  {
    id: 1758,
    ar: 'public/content-ar/services/porta-cabins/portable-warehouse/index.html',
    en: 'public/content/services/porta-cabins/portable-warehouse/index.html',
    route: '/services/porta-cabins/portable-warehouse/',
  },
  {
    id: 1413,
    ar: 'public/content-ar/privacy-policy/index.html',
    en: 'public/content/privacy-policy/index.html',
    route: '/privacy-policy/',
  },
  // Direct porta-cabins paths (non /services prefix) share the same content.
  {
    id: 1731,
    ar: 'public/content-ar/porta-cabins/portable-canteen/index.html',
    en: 'public/content/porta-cabins/portable-canteen/index.html',
    route: '/porta-cabins/portable-canteen/',
  },
  {
    id: 1729,
    ar: 'public/content-ar/porta-cabins/portable-house/index.html',
    en: 'public/content/porta-cabins/portable-house/index.html',
    route: '/porta-cabins/portable-house/',
  },
  {
    id: 1730,
    ar: 'public/content-ar/porta-cabins/portable-labour-camps/index.html',
    en: 'public/content/porta-cabins/portable-labour-camps/index.html',
    route: '/porta-cabins/portable-labour-camps/',
  },
  {
    id: 1766,
    ar: 'public/content-ar/porta-cabins/portable-log-cabins/index.html',
    en: 'public/content/porta-cabins/portable-log-cabins/index.html',
    route: '/porta-cabins/portable-log-cabins/',
  },
  {
    id: 1732,
    ar: 'public/content-ar/porta-cabins/portable-mosques/index.html',
    en: 'public/content/porta-cabins/portable-mosques/index.html',
    route: '/porta-cabins/portable-mosques/',
  },
  {
    id: 1756,
    ar: 'public/content-ar/porta-cabins/portable-pantry/index.html',
    en: 'public/content/porta-cabins/portable-pantry/index.html',
    route: '/porta-cabins/portable-pantry/',
  },
  {
    id: 1757,
    ar: 'public/content-ar/porta-cabins/portable-restrooms/index.html',
    en: 'public/content/porta-cabins/portable-restrooms/index.html',
    route: '/porta-cabins/portable-restrooms/',
  },
  {
    id: 1771,
    ar: 'public/content-ar/porta-cabins/portable-security-office/index.html',
    en: 'public/content/porta-cabins/portable-security-office/index.html',
    route: '/porta-cabins/portable-security-office/',
  },
  {
    id: 1763,
    ar: 'public/content-ar/porta-cabins/portable-security-units/index.html',
    en: 'public/content/porta-cabins/portable-security-units/index.html',
    route: '/porta-cabins/portable-security-units/',
  },
  {
    id: 1759,
    ar: 'public/content-ar/services/porta-cabins/portable-site-office/index.html',
    en: 'public/content/porta-cabins/portable-site-office/index.html',
    route: '/porta-cabins/portable-site-office/',
  },
  {
    id: 1758,
    ar: 'public/content-ar/porta-cabins/portable-warehouse/index.html',
    en: 'public/content/porta-cabins/portable-warehouse/index.html',
    route: '/porta-cabins/portable-warehouse/',
  },
];

const stripHtml = (html) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const replaceOrInsertCanonical = (html, href) => {
  const canonicalTag = `<link rel="canonical" href="${href}">`;
  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, canonicalTag);
  }
  return html.replace(/<\/head>/i, `  ${canonicalTag}\n</head>`);
};

const buildPage = (page) => {
  const jsonPath = path.join('public', 'wp-json', 'wp', 'v2', 'pages', `${page.id}.json`);
  const arHtmlPath = path.join(page.ar);
  const enPath = path.join(page.en);

  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const arHtml = fs.readFileSync(arHtmlPath, 'utf8');

  const rendered = (json.content?.rendered || '').replace(domainRegex, '');
  const title = stripHtml(json.title?.rendered || 'Porta Cabins');
  const description = stripHtml(json.excerpt?.rendered || '');

  const lowerHtml = arHtml.toLowerCase();
  const mainOpenIndex = lowerHtml.indexOf('<main');
  const mainCloseIndex = lowerHtml.lastIndexOf('</main>');

  let prefix;
  let suffix;
  let hasMain = false;

  if (mainOpenIndex !== -1 && mainCloseIndex !== -1) {
    const mainOpenMatch = arHtml.slice(mainOpenIndex).match(/<main[^>]*>/i);
    const openTag = mainOpenMatch ? mainOpenMatch[0] : '<main>';
    const start = mainOpenIndex + openTag.length;
    prefix = arHtml.slice(0, start);
    suffix = arHtml.slice(mainCloseIndex);
    hasMain = true;
  } else {
    const bodyCloseIndex = lowerHtml.lastIndexOf('</body>');
    if (bodyCloseIndex === -1) {
      prefix = '<!doctype html>\n<html lang="en-US">\n<head></head>\n<body>';
      suffix = '\n</body>\n</html>';
    } else {
      prefix = arHtml.slice(0, bodyCloseIndex);
      suffix = arHtml.slice(bodyCloseIndex);
    }
  }

  let nextHtml = hasMain
    ? `${prefix}\n${rendered}\n${suffix}`
    : `${prefix}\n<main>\n${rendered}\n</main>\n${suffix}`;
  nextHtml = nextHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  if (description) {
    if (/<meta[^>]+name=["']description["'][^>]*>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(
        /<meta[^>]+name=["']description["'][^>]*>/i,
        `<meta name="description" content="${description}">`,
      );
    }
  }

  if (page.route) {
    const href = page.route;
    nextHtml = replaceOrInsertCanonical(nextHtml, href);
  }

  fs.mkdirSync(path.dirname(enPath), { recursive: true });
  fs.writeFileSync(enPath, nextHtml, 'utf8');
  console.log(`Wrote ${enPath}`);
};

pages.forEach(buildPage);
