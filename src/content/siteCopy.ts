export type Locale = 'en' | 'ar';

type HeroSlide = {
  id: string;
  badge: string;
  headline: { before: string; highlight: string; after: string };
  description?: string;
  features?: string[];
  image: string;
  alt: string;
  ctaHref?: string;
  label: string;
};

type ServiceCard = {
  slug: string;
  title: string;
  description?: string;
  href: string;
  image: string;
  alt: string;
};

type Stat = { value: string; lines: string[] };

type ContactInfo = {
  phone: string;
  whatsapp: string;
  email?: string;
  address?: string;
};

type GalleryItem = { src: string; alt: string };

export type PageCopy = {
  hero: { slides: HeroSlide[] };
  services: { heading: string; subheading?: string; cards: ServiceCard[] };
  about: { heading: string; tagline: string; body: string; ctas?: { label: string; href: string }[] };
  stats?: Stat[];
  galleryPreview?: { heading: string; items: GalleryItem[]; viewAllHref?: string };
  galleryPage?: { title: string; description?: string; heroImage: GalleryItem; images: GalleryItem[] };
  contact?: { heading: string; body: string; info: ContactInfo };
};

const img = (path: string) => `/wp-content/uploads/2025/09/${path}`;

export const siteCopy: Record<Locale, PageCopy> = {
  en: {
    hero: {
      slides: [
        {
          id: 'porta-cabins',
          badge: 'Strong spaces anywhere',
          headline: { before: 'STRONG', highlight: 'SPACES', after: 'ANYWHERE' },
          image: img('PORTACABIN9.webp'),
          alt: 'Portable cabin exterior',
          label: 'PORTABLE CABINS',
          ctaHref: '/services/porta-cabins',
        },
        {
          id: 'aluminium',
          badge: 'Lightweight durable reliable',
          headline: { before: 'Lightweight', highlight: 'Durable', after: 'Reliable' },
          image: img('aluminium-poster-1920x1080.webp'),
          alt: 'Aluminium fabrication project',
          label: 'ALUMINIUM',
          ctaHref: '/services/aluminium',
        },
        {
          id: 'welding',
          badge: 'From sparks to strength',
          headline: { before: 'From Sparks', highlight: 'TO', after: 'Strength' },
          image: img('WELDING-2.webp'),
          alt: 'Welding sparks on metal frame',
          label: 'WELDING',
          ctaHref: '/services/welding',
        },
      ],
    },
    services: {
      heading: 'Services We Provide: Portable Solutions',
      cards: [
        {
          slug: 'porta-cabins',
          title: 'PORTABLE CABINS',
          href: '/services/porta-cabins/',
          image: '/wp-content/uploads/2025/09/PORTACABIN-1-IMAGE.webp',
          alt: 'Portable cabins',
        },
        {
          slug: 'aluminium',
          title: 'ALUMINIUM',
          href: '/services/aluminium/',
          image: '/wp-content/uploads/2025/09/1.webp',
          alt: 'Aluminium',
        },
        {
          slug: 'welding',
          title: 'WELDING',
          href: '/services/welding/',
          image: '/wp-content/uploads/2025/09/1.webp',
          alt: 'Welding',
        },
        {
          slug: 'cutting-and-bending',
          title: 'CUTTING AND BENDING',
          href: '/services/cutting-and-bending/',
          image: '/wp-content/uploads/2025/09/1.webp',
          alt: 'Cutting and bending',
        },
      ],
    },
    about: {
      heading: 'About us',
      tagline: 'PORTABLE SOLUTIONS PERMANENT TRUST',
      body: 'Portacabins delivers innovative portable cabin solutions designed for speed and durability across housing, offices, camps, mosques, storage, and sanitary needs.',
      ctas: [
        { label: 'Read more', href: '/about' },
      ],
    },
    stats: [
      { value: '20', lines: ['Years', 'working'] },
      { value: '7', lines: ['Talanted', 'managers'] },
      { value: '100', lines: ['Complitly', 'projects'] },
    ],
    galleryPreview: {
      heading: 'Featured Projects',
      items: [
        { src: img('PORTACABIN2.webp'), alt: 'Portable cabin exterior' },
        { src: img('PORTACABIN3.webp'), alt: 'Portable cabin front view' },
        { src: img('PORTACABIN4.webp'), alt: 'Portable office cabin' },
        { src: img('PORTACABIN5.webp'), alt: 'Portable cabin on site' },
        { src: img('PORTACABIN6.webp'), alt: 'Portable cabin interior' },
        { src: img('PORTACABIN7.webp'), alt: 'Portable security cabin' },
        { src: img('PORTACABIN8.webp'), alt: 'Portable storage cabin' },
        { src: img('PORTACABIN10.webp'), alt: 'Portable labour cabin' },
      ],
      viewAllHref: '/gallery',
    },
    galleryPage: {
      title: 'Gallery',
      description: 'Portable cabins, offices, mosques, warehouses, storage and restrooms across Jeddah, Saudi Arabia.',
      heroImage: { src: img('PORTACABIN9.webp'), alt: 'Portable cabin hero' },
      images: [
        { src: img('PORTACABIN2.webp'), alt: 'Portable cabin exterior' },
        { src: img('PORTACABIN3.webp'), alt: 'Portable cabin front view' },
        { src: img('PORTACABIN4.webp'), alt: 'Portable office cabin' },
        { src: img('PORTACABIN5.webp'), alt: 'Portable cabin on site' },
        { src: img('PORTACABIN6.webp'), alt: 'Portable cabin interior' },
        { src: img('PORTACABIN7.webp'), alt: 'Portable security cabin' },
        { src: img('PORTACABIN8.webp'), alt: 'Portable storage cabin' },
        { src: img('PORTACABIN10.webp'), alt: 'Portable labour cabin' },
        { src: img('IMG-20250919-WA0061.webp'), alt: 'Portable washroom interior' },
        { src: img('portable-washroom-portacabins.online.webp'), alt: 'Portable washroom exterior' },
      ],
    },
    contact: {
      heading: 'Contact',
      body: 'Call or message us for portable cabins, aluminium works, welding, and cutting services in Jeddah, Saudi Arabia.',
      info: {
        phone: '+966506802316',
        whatsapp: '+966506802316',
        email: 'info@portacabins.online',
        address: 'Jeddah, Saudi Arabia',
      },
    },
  },
  ar: {
    hero: {
      slides: [
        {
          id: 'porta-cabins',
          badge: 'مساحات قوية في أي مكان',
          headline: { before: 'مساحات', highlight: 'قوية', after: 'في أي مكان' },
          image: img('PORTACABIN9.webp'),
          alt: 'حاوية متنقلة خارجية',
          label: 'الحاويات المتنقلة',
          ctaHref: '/services/porta-cabins',
        },
        {
          id: 'aluminium',
          badge: 'خفيفة - متينة - موثوقة',
          headline: { before: 'خفيفة', highlight: 'متينة', after: 'موثوقة' },
          image: img('aluminium-poster-1920x1080.webp'),
          alt: 'ورشة ألمنيوم',
          label: 'الألمنيوم',
          ctaHref: '/services/aluminium',
        },
        {
          id: 'welding',
          badge: 'من الشرارة إلى القوة',
          headline: { before: 'من الشرارة', highlight: 'إلى', after: 'القوة' },
          image: img('WELDING-2.webp'),
          alt: 'عملية لحام معدني',
          label: 'اللحام',
          ctaHref: '/services/welding',
        },
      ],
    },
    services: {
      heading: 'الخدمات التي نقدمها: حلول متنقلة',
      cards: [
        {
          slug: 'porta-cabins',
          title: 'الحاويات المتنقلة',
          href: '/services/porta-cabins/',
          image: '/wp-content/uploads/2025/09/PORTACABIN-1-IMAGE.webp',
          alt: 'الحاويات المتنقلة',
        },
        {
          slug: 'aluminium',
          title: 'الألمنيوم',
          href: '/services/aluminium/',
          image: '/wp-content/uploads/2025/09/1.webp',
          alt: 'الألمنيوم',
        },
        {
          slug: 'welding',
          title: 'اللحام',
          href: '/services/welding/',
          image: '/wp-content/uploads/2025/09/1.webp',
          alt: 'اللحام',
        },
        {
          slug: 'cutting-and-bending',
          title: 'القص والثني',
          href: '/services/cutting-and-bending/',
          image: '/wp-content/uploads/2025/09/1.webp',
          alt: 'القص والثني',
        },
      ],
    },
    about: {
      heading: 'من نحن',
      tagline: 'حلول متنقلة وثقة دائمة',
      body: 'نقدم حاويات متنقلة مبتكرة مصممة للسرعة والمتانة لتلبية احتياجات المكاتب والسكن والمخيمات والمساجد والتخزين والمرافق الصحية.',
      ctas: [
        { label: 'اقرأ المزيد', href: '/about' },
      ],
    },
    stats: [
      { value: '20', lines: ['سنوات', 'من العمل'] },
      { value: '7', lines: ['مديرون', 'موهوبون'] },
      { value: '100', lines: ['مشاريع', 'مكتملة'] },
    ],
    galleryPreview: {
      heading: 'أعمال مختارة',
      items: [
        { src: img('PORTACABIN2.webp'), alt: 'حاوية متنقلة خارجية' },
        { src: img('PORTACABIN3.webp'), alt: 'حاوية متنقلة من الأمام' },
        { src: img('PORTACABIN4.webp'), alt: 'حاوية مكتبية متنقلة' },
        { src: img('PORTACABIN5.webp'), alt: 'حاوية متنقلة في الموقع' },
        { src: img('PORTACABIN6.webp'), alt: 'داخل حاوية متنقلة' },
        { src: img('PORTACABIN7.webp'), alt: 'كابينة أمنية متنقلة' },
        { src: img('PORTACABIN8.webp'), alt: 'كابينة تخزين متنقلة' },
        { src: img('PORTACABIN10.webp'), alt: 'كابينة عمال متنقلة' },
      ],
      viewAllHref: '/gallery',
    },
    galleryPage: {
      title: 'المعرض',
      description: 'حاويات متنقلة، مكاتب، مساجد، مستودعات، تخزين ودورات مياه في جدة، السعودية.',
      heroImage: { src: img('PORTACABIN9.webp'), alt: 'حاوية متنقلة' },
      images: [
        { src: img('PORTACABIN2.webp'), alt: 'حاوية متنقلة خارجية' },
        { src: img('PORTACABIN3.webp'), alt: 'حاوية متنقلة من الأمام' },
        { src: img('PORTACABIN4.webp'), alt: 'حاوية مكتبية متنقلة' },
        { src: img('PORTACABIN5.webp'), alt: 'حاوية متنقلة في الموقع' },
        { src: img('PORTACABIN6.webp'), alt: 'داخل حاوية متنقلة' },
        { src: img('PORTACABIN7.webp'), alt: 'كابينة أمنية متنقلة' },
        { src: img('PORTACABIN8.webp'), alt: 'كابينة تخزين متنقلة' },
        { src: img('PORTACABIN10.webp'), alt: 'كابينة عمال متنقلة' },
        { src: img('IMG-20250919-WA0061.webp'), alt: 'دورة مياه متنقلة' },
        { src: img('portable-washroom-portacabins.online.webp'), alt: 'دورة مياه متنقلة خارجية' },
      ],
    },
    contact: {
      heading: 'تواصل معنا',
      body: 'اتصل أو أرسل رسالة للحصول على الحاويات وأعمال الألمنيوم واللحام والقص في جدة، السعودية.',
      info: {
        phone: '+966506802316',
        whatsapp: '+966506802316',
        email: 'info@portacabins.online',
        address: 'جدة، المملكة العربية السعودية',
      },
    },
  },
};
