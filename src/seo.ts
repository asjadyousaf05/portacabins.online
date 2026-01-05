export type LocalizedMeta = {
  title: string;
  description: string;
  keywords: string[];
};

export type SeoEntry = {
  en: LocalizedMeta;
  ar: LocalizedMeta;
};

export const seoMeta: Record<string, SeoEntry> = {
  '/': {
    en: {
      title: 'Portacabins in Jeddah | Portable Cabins, Offices & Camps Saudi Arabia',
      description:
        'Portacabins in Jeddah, Saudi Arabia delivering portable cabins, site offices, labor camps, mosques, warehouses, and sanitary units with fast design, build, and installation across KSA.',
      keywords: [
        'Portacabins Jeddah',
        'Portacabins Saudi Arabia',
        'Portable cabins Jeddah',
        'Portable site office KSA',
        'Portable labour camp Saudi Arabia',
        'Portable restroom cabin',
        'Portable security cabin',
        'Portable warehouse Jeddah',
        'Prefab modular buildings Saudi Arabia',
        'Portable houses Saudi Arabia',
        'Aluminium fabrication Jeddah',
        'Welding services Jeddah',
        'Cutting and bending Jeddah',
      ],
    },
    ar: {
      title: 'بيوت ومكاتب برتابل في جدة، السعودية',
      description:
        'بيوت ومكاتب برتابل عالية الجودة للبيع أو الإيجار في جدة. حلول سريعة للمساكن والمكاتب ومعسكرات العمال والمساجد والتخزين ودورات المياه المتنقلة.',
      keywords: [
        'بيوت برتابل جدة',
        'مكاتب برتابل جدة',
        'مكاتب موقع متنقلة جدة',
        'معسكرات عمال متنقلة جدة',
        'مساجد متنقلة جدة',
        'تخزين متنقل جدة',
        'دورات مياه متنقلة السعودية',
        'مكاتب برتابل السعودية',
        'مباني متنقلة السعودية',
        'برتابل السعودية',
      ],
    },
  },
  '/services': {
    en: {
      title: 'Portable Cabin Services in Jeddah | Aluminium, Welding, Cutting & Bending',
      description:
        'Design, build, and fit-out for portable cabins plus aluminium fabrication, welding, cutting and bending in Jeddah, Saudi Arabia.',
      keywords: [
        'Portable cabin services Jeddah',
        'Aluminium fabrication Jeddah',
        'Welding services Jeddah',
        'Cutting and bending Saudi Arabia',
        'Portable offices KSA',
        'Modular buildings Saudi Arabia',
      ],
    },
    ar: {
      title: 'خدمات البرتابل والألمنيوم واللحام في جدة',
      description: 'خدمات متكاملة للمباني البرتابل والألمنيوم واللحام والقص والثني في جدة، السعودية.',
      keywords: [
        'بيوت برتابل جدة',
        'أعمال ألمنيوم جدة',
        'خدمات لحام جدة',
        'قص وثني جدة',
        'مكاتب برتابل السعودية',
        'مباني متنقلة السعودية',
      ],
    },
  },
  '/about': {
    en: {
      title: 'About Portacabins Jeddah | Saudi Portable Building Manufacturer',
      description:
        'Learn about Portacabins in Jeddah, KSA: specialists in portable houses, site offices, labor camps, mosques, storage, and modular buildings delivered across Saudi Arabia.',
      keywords: [
        'About Portacabins',
        'Portable buildings Jeddah',
        'Portable offices KSA',
        'Portable houses Saudi Arabia',
      ],
    },
    ar: {
      title: 'عن بورتاكابين | حلول برتابل في جدة',
      description: 'تعرف على بورتاكابين في جدة وتوفير البيوت والمكاتب والمعسكرات المتنقلة في السعودية.',
      keywords: [
        'عن بورتاكابين',
        'مباني متنقلة جدة',
        'مكاتب برتابل السعودية',
        'بيوت متنقلة السعودية',
      ],
    },
  },
  '/contact': {
    en: {
      title: 'Contact Portacabins Jeddah | Quote Portable Cabins & Offices in Saudi Arabia',
      description:
        'Request a quote from Portacabins Jeddah for portable cabins, site offices, storage units, restrooms, and camps anywhere in Saudi Arabia.',
      keywords: [
        'Contact Portacabins',
        'Portable buildings Jeddah',
        'Portable offices Saudi Arabia',
        'Portacabins quote KSA',
        'Portacabins phone Jeddah',
      ],
    },
    ar: {
      title: 'اتصل ببورتاكابين | مباني متنقلة في جدة',
      description: 'تواصل مع بورتاكابين لشراء أو استئجار بيوت ومكاتب وتخزين ودورات مياه متنقلة في جدة.',
      keywords: ['اتصل بورتاكابين', 'مباني متنقلة جدة', 'مكاتب برتابل السعودية'],
    },
  },
  '/services/aluminium': {
    en: {
      title: 'Aluminium Works in Jeddah | Portacabins',
      description: 'Custom aluminium structures, doors, windows, and cladding for portable projects in Jeddah, KSA.',
      keywords: ['Aluminium Jeddah', 'Aluminium works Saudi Arabia', 'Portable aluminium solutions'],
    },
    ar: {
      title: 'أعمال الألمنيوم في جدة | بورتاكابين',
      description: 'تصاميم ألمنيوم مخصصة للأبواب والنوافذ والواجهات للمشاريع المتنقلة في جدة، السعودية.',
      keywords: ['أعمال ألمنيوم جدة', 'خدمات ألمنيوم السعودية', 'حلول ألمنيوم متنقلة'],
    },
  },
  '/services/welding': {
    en: {
      title: 'Welding Services in Jeddah | Portacabins',
      description: 'Durable welding and fabrication for portable cabins, offices, and storage in Jeddah, Saudi Arabia.',
      keywords: ['Welding Jeddah', 'Fabrication Saudi Arabia', 'Portable cabins welding'],
    },
    ar: {
      title: 'خدمات اللحام في جدة | بورتاكابين',
      description: 'لحام وتصنيع متين للمباني البرتابل والمكاتب والتخزين في جدة، السعودية.',
      keywords: ['لحام جدة', 'تصنيع برتابل السعودية', 'لحام مباني متنقلة'],
    },
  },
  '/services/cutting-and-bending': {
    en: {
      title: 'Cutting & Bending in Jeddah | Portacabins',
      description: 'Precision cutting and bending services for portable projects and structures in Jeddah, Saudi Arabia.',
      keywords: ['Cutting and bending Jeddah', 'Metal fabrication Saudi Arabia', 'Portable structures Jeddah'],
    },
    ar: {
      title: 'قص وثني المعادن في جدة | بورتاكابين',
      description: 'قص وثني دقيق للمشاريع والمباني المتنقلة في جدة، السعودية.',
      keywords: ['قص وثني جدة', 'تشكيل معادن السعودية', 'مباني متنقلة جدة'],
    },
  },
  '/services/porta-cabins': {
    en: {
      title: 'Portable Cabins in Jeddah | Houses, Offices, Camps',
      description:
        'Portable houses, site offices, labor camps, mosques, and storage units in Jeddah, built fast and durable.',
      keywords: [
        'Portable cabins Jeddah',
        'Portable houses Saudi Arabia',
        'Portable site offices Jeddah',
        'Portable labor camps KSA',
      ],
    },
    ar: {
      title: 'كبائن برتابل في جدة | بيوت ومكاتب ومعسكرات',
      description: 'بيوت ومكاتب ومعسكرات ومساجد ومستودعات برتابل في جدة بسرعة تنفيذ وجودة عالية.',
      keywords: ['كبائن برتابل جدة', 'بيوت متنقلة السعودية', 'مكاتب موقع جدة', 'معسكرات عمال متنقلة'],
    },
  },
};

export const defaultSeo: SeoEntry = seoMeta['/'];
