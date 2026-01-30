import type { Locale } from './siteCopy';


type GalleryItem = { src: string; alt: string };

export type ServiceContent = {
  name: string;
  heroTitle?: string;
  heroKicker?: string;
  intro: string;
  bullets: string[];
  highlights?: string[];
  heroImage: string;
  heroAlt: string;
  cardImage?: string;
  cardAlt?: string;
  gallery: GalleryItem[];
  seo: { title: string; description: string; keywords: string[] };
};

export type ServicesCopy = {
  overview: {
    title: string;
    description: string;
    heroImage: string;
    heroAlt: string;
    cards: { path: string; title: string; summary: string; image: string; alt: string }[];
  };
  services: Record<string, ServiceContent>;
};

const img = (file: string) => `/wp-content/uploads/2025/09/${file}`;

const servicesEn: Record<string, ServiceContent> = {
  "/services/porta-cabins": {
    name: "Portable Cabins",
    heroKicker: "Turnkey modular spaces",
    heroTitle: "Portable Cabins Built to Last",
    intro:
      "Turnkey porta cabins for housing, offices, camps, mosques, storage, and sanitary units across Saudi Arabia with fast delivery and installation.",
    bullets: [
      "Insulated sandwich panels and robust steel frames",
      "Custom layouts with full MEP fit-out",
      "Crane-ready structures for rapid placement",
      "Fast delivery and onsite commissioning",
    ],
    heroImage: img('PORTACABIN9.webp'),
    heroAlt: "Portable cabin exterior in Jeddah",
    cardImage: img('PORTACABIN-1-IMAGE.webp'),
    gallery: [
      { src: img('PORTACABIN2.webp'), alt: "Portable cabin exterior" },
      { src: img('PORTACABIN3.webp'), alt: "Portable cabin side view" },
      { src: img('PORTACABIN4.webp'), alt: "Portable cabin installation" },
      { src: img('PORTACABIN5.webp'), alt: "Portable office cabin" },
      { src: img('PORTACABIN6.webp'), alt: "Portable cabin interior" },
    ],
    seo: {
      title: "Portable Cabins in Jeddah | Portacabins",
      description:
        "Insulated portable cabins for housing, offices, camps, mosques, storage, and restrooms in Jeddah, Saudi Arabia.",
      keywords: [
        "Portable cabins Jeddah",
        "Portable houses Saudi Arabia",
        "Portable site offices Jeddah",
        "Modular cabins KSA",
        "Portable storage Saudi Arabia",
      ],
    },
  },
  "/services/porta-cabins/portable-house": {
    name: "Portable Houses",
    heroKicker: "Comfort-first layouts",
    heroTitle: "Portable Houses for Families & Staff",
    intro:
      "Comfortable insulated portable houses with AC-ready layouts, plumbing, and clean finishes for staff or family accommodation.",
    bullets: [
      "Flexible floor plans for bedrooms and living",
      "Thermal and sound insulation",
      "Electrical and plumbing ready for hookup",
      "Clean, durable interior finishes",
    ],
    heroImage: img('PORTACABIN4.webp'),
    heroAlt: "Portable house exterior",
    gallery: [
      { src: img('PORTACABIN4.webp'), alt: "Portable house facade" },
      { src: img('PORTACABIN5.webp'), alt: "Portable house side view" },
      { src: img('PORTACABIN6.webp'), alt: "Portable cabin interior" },
    ],
    seo: {
      title: "Portable Houses in Jeddah | Portacabins",
      description: "Insulated portable houses with ready MEP for staff and family accommodation in Jeddah, Saudi Arabia.",
      keywords: ["Portable houses Jeddah", "Prefab homes Saudi Arabia", "Portable family housing"],
    },
  },
  "/services/porta-cabins/portable-labour-camps": {
    name: "Portable Labour Camps",
    heroKicker: "Durable staff housing",
    heroTitle: "Portable Labour Camps",
    intro:
      "Durable labor accommodation cabins with bunk rooms, lockers, and wash blocks sized for your crew with quick deployment.",
    bullets: [
      "Multi-room bunk layouts with storage",
      "Integrated washrooms and basins",
      "Ventilation and optional AC",
      "Easy-to-clean finishes for heavy use",
    ],
    heroImage: img('PORTACABIN10.webp'),
    heroAlt: "Portable labour camp cabin",
    gallery: [
      { src: img('PORTACABIN10.webp'), alt: "Labour camp exterior" },
      { src: img('PORTACABIN8.webp'), alt: "Portable camp entrance" },
      { src: img('PORTACABIN7.webp'), alt: "Cabin rooms layout" },
    ],
    seo: {
      title: "Portable Labour Camps in Jeddah | Portacabins",
      description:
        "Labour camp porta cabins with bunk rooms, lockers, and hygienic wash blocks delivered quickly across Saudi Arabia.",
      keywords: ["Portable labour camps", "Staff accommodation cabins", "Labour housing Jeddah"],
    },
  },
  "/services/porta-cabins/portable-log-cabins": {
    name: "Portable Log Cabins",
    heroKicker: "Wood-look finish",
    heroTitle: "Portable Log Cabins",
    intro: "Wood-look portable log cabins for resorts, offices, or guest rooms with insulated walls and clean interiors.",
    bullets: [
      "Warm timber-look exterior",
      "Insulated envelope for heat control",
      "Natural light and large windows",
      "Great for leisure, offices, or reception",
    ],
    heroImage: img('portacabins-portable-log-cabin.webp'),
    heroAlt: "Portable log cabin exterior",
    gallery: [
      { src: img('portacabins-portable-log-cabin.webp'), alt: "Log cabin style exterior" },
      { src: img('portable-cabin-1920x1440.webp'), alt: "Cabin side profile" },
      { src: img('IMG-20250919-WA0058.webp'), alt: "Cabin window detail" },
    ],
    seo: {
      title: "Portable Log Cabins in Jeddah | Portacabins",
      description: "Wood-look portable log cabins for leisure, offices, or guest rooms with insulated walls.",
      keywords: ["Portable log cabin", "Wood-look cabin Saudi Arabia", "Prefab log cabin"],
    },
  },
  "/services/porta-cabins/portable-mosques": {
    name: "Portable Mosques",
    heroKicker: "Ready prayer space",
    heroTitle: "Portable Mosques",
    intro:
      "Portable mosques with prayer hall, ablution area, carpeting, and AC-ready services for fast deployment on any site.",
    bullets: [
      "Prayer hall with carpeting",
      "Dedicated ablution and wash area",
      "Electrical distribution and AC-ready",
      "Sound and lighting provisions",
    ],
    heroImage: img('Portable-Mosques-jaddah.webp'),
    heroAlt: "Portable mosque exterior",
    gallery: [
      { src: img('modular-mosque-87101.webp'), alt: "Portable mosque module" },
      { src: img('Portable-Mosques-jaddah.webp'), alt: "Portable mosque front" },
      { src: img('IMG-20250919-WA0061.webp'), alt: "Wash area fittings" },
    ],
    seo: {
      title: "Portable Mosques in Jeddah | Portacabins",
      description: "Portable mosques with prayer hall and ablution facilities, ready for AC and lighting.",
      keywords: ["Portable mosque", "Modular mosque Saudi Arabia", "Prayer cabin Jeddah"],
    },
  },
  "/services/porta-cabins/portable-pantry": {
    name: "Portable Pantry",
    heroKicker: "Kitchen-ready pods",
    heroTitle: "Portable Pantry Units",
    intro:
      "Portable pantry and kitchen pods with stainless counters, sinks, extraction, and storage for serving crews onsite.",
    bullets: [
      "Stainless counters and splashbacks",
      "Sinks and water connections",
      "Ventilation and hood options",
      "Easy-clean hygienic finishes",
    ],
    heroImage: img('portable-office-pantry-1600x1080.webp'),
    heroAlt: "Portable pantry interior",
    gallery: [
      { src: img('portacabins-portable-pantry.webp'), alt: "Portable pantry exterior" },
      { src: img('portable-office-pantry-1600x1080.webp'), alt: "Pantry workspace" },
      { src: img('IMG-20250919-WA0060-150x150.webp'), alt: "Cabinet detail" },
    ],
    seo: {
      title: "Portable Pantry Units in Jeddah | Portacabins",
      description: "Portable pantry and kitchen pods with stainless counters, sinks, and ventilation for site service.",
      keywords: ["Portable pantry", "Kitchen pod Saudi Arabia", "Pantry cabin Jeddah"],
    },
  },
  "/services/porta-cabins/portable-restrooms": {
    name: "Portable Restrooms",
    heroKicker: "Hygienic and ventilated",
    heroTitle: "Portable Restrooms",
    intro:
      "Standalone portable restroom blocks with separate male/female layouts, ventilation, and ready plumbing connections.",
    bullets: [
      "Toilets and washbasins fully fitted",
      "Ventilation fans and odor control",
      "Water and drainage connections ready",
      "Durable hygienic wall and floor finishes",
    ],
    heroImage: img('IMG-20250919-WA0061.webp'),
    heroAlt: "Portable restroom cabin",
    gallery: [
      { src: img('IMG-20250919-WA0061.webp'), alt: "Restroom interior" },
      { src: img('IMG-20250919-WA0064-1920x1440.webp'), alt: "Restroom exterior" },
      { src: img('IMG-20250919-WA0062-1920x1440.webp'), alt: "Washroom corridor" },
    ],
    seo: {
      title: "Portable Restrooms in Jeddah | Portacabins",
      description: "Portable restroom cabins with full sanitary fit-out and ventilation for sites in Saudi Arabia.",
      keywords: ["Portable restrooms", "Sanitary cabin", "Portable toilet Saudi Arabia"],
    },
  },
  "/services/porta-cabins/portable-security-office": {
    name: "Portable Security Office",
    heroKicker: "Gatehouse comfort",
    heroTitle: "Portable Security Offices",
    intro:
      "Security offices for gates and checkpoints with desks, panoramic windows, AC-ready services, and secure doors.",
    bullets: [
      "Panoramic visibility for entrances",
      "Built-in desk and seating options",
      "AC, power, and data ready",
      "Secure doors and locks",
    ],
    heroImage: img('portacabins-portable-security-office-cabin.webp'),
    heroAlt: "Portable security office cabin",
    gallery: [
      { src: img('portacabins-portable-security-office-cabin.webp'), alt: "Security office exterior" },
      { src: img('portableCabin02.webp'), alt: "Guard cabin with windows" },
      { src: img('IMG-20250919-WA0059.webp'), alt: "Security cabin at night" },
    ],
    seo: {
      title: "Portable Security Offices in Jeddah | Portacabins",
      description: "Portable security offices with panoramic windows, desks, AC, and secure doors for gates.",
      keywords: ["Security cabin", "Guard house Jeddah", "Portable security office Saudi Arabia"],
    },
  },
  "/services/porta-cabins/portable-security-units": {
    name: "Portable Security Units",
    heroKicker: "Compact guard cabins",
    heroTitle: "Portable Security Units",
    intro:
      "Compact guard cabins with elevated visibility, rugged frames, and ready electrical points for rapid deployment.",
    bullets: [
      "Compact footprint for any gate",
      "Wide windows for 360 deg view",
      "Prewired for lighting and AC",
      "Lift-and-place installation",
    ],
    heroImage: img('portableCabin02.webp'),
    heroAlt: "Portable security unit exterior",
    gallery: [
      { src: img('portableCabin02.webp'), alt: "Portable security unit" },
      { src: img('portacabins-portable-security-office-cabin.webp'), alt: "Security cabin front" },
      { src: img('IMG-20250919-WA0058.webp'), alt: "Window detail for guard cabin" },
    ],
    seo: {
      title: "Portable Security Units in Jeddah | Portacabins",
      description: "Compact portable security cabins with panoramic windows and prewired services for checkpoints.",
      keywords: ["Portable security units", "Guard cabin KSA", "Security kiosk Jeddah"],
    },
  },
  "/services/porta-cabins/portable-site-office": {
    name: "Portable Site Offices",
    heroKicker: "Ready-to-work layouts",
    heroTitle: "Portable Site Offices",
    intro:
      "Site offices with desks, wiring, lighting, and AC-ready services so teams can move in and start working immediately.",
    bullets: [
      "Desk and meeting space layouts",
      "Power, lighting, and data ready",
      "Insulated and quiet interiors",
      "Fast delivery to active sites",
    ],
    heroImage: img('PORTACABIN2.webp'),
    heroAlt: "Portable site office exterior",
    gallery: [
      { src: img('PORTACABIN2.webp'), alt: "Site office cabin" },
      { src: img('PORTACABIN3.webp'), alt: "Office cabin side view" },
      { src: img('PORTACABIN6.webp'), alt: "Office interior corridor" },
    ],
    seo: {
      title: "Portable Site Offices in Jeddah | Portacabins",
      description: "Portable site offices with wiring, lighting, AC-ready services, and workspace layouts.",
      keywords: ["Portable site office", "Construction office cabin", "Modular office Jeddah"],
    },
  },
  "/services/porta-cabins/portable-warehouse": {
    name: "Portable Warehouse",
    heroKicker: "Storage on demand",
    heroTitle: "Portable Warehouses",
    intro:
      "Portable warehouse cabins sized for equipment and inventory with wide doors, ventilation, and secure access.",
    bullets: [
      "Wide openings for equipment",
      "Ventilation and lighting options",
      "Secure doors and locks",
      "Custom sizes for storage needs",
    ],
    heroImage: img('PORTACABIN8.webp'),
    heroAlt: "Portable warehouse cabin",
    gallery: [
      { src: img('PORTACABIN8.webp'), alt: "Portable warehouse exterior" },
      { src: img('PORTACABIN7.webp'), alt: "Warehouse cabin front" },
      { src: img('PORTACABIN5.webp'), alt: "Storage cabin in yard" },
    ],
    seo: {
      title: "Portable Warehouse Cabins in Jeddah | Portacabins",
      description: "Portable warehouse cabins with wide access doors, ventilation, and secure locking for storage.",
      keywords: ["Portable warehouse", "Storage cabin", "Portable storage Jeddah"],
    },
  },
  "/services/porta-cabins/portable-canteen": {
    name: "Portable Canteen",
    heroKicker: "Serve teams fast",
    heroTitle: "Portable Canteens",
    intro:
      "Portable canteen cabins with serving counters, seating layouts, and hygiene-focused finishes for workforce dining.",
    bullets: [
      "Serving counter and service window options",
      "Seating layouts for crews",
      "Easy-clean hygienic surfaces",
      "Power and water points ready",
    ],
    heroImage: img('PORTACABIN6.webp'),
    heroAlt: "Portable canteen cabin",
    gallery: [
      { src: img('PORTACABIN6.webp'), alt: "Canteen cabin exterior" },
      { src: img('PORTACABIN5.webp'), alt: "Canteen cabin side view" },
      { src: img('PORTACABIN4.webp'), alt: "Interior aisle" },
    ],
    seo: {
      title: "Portable Canteen Cabins in Jeddah | Portacabins",
      description: "Portable canteen cabins with serving counters, seating, and hygienic finishes for site dining.",
      keywords: ["Portable canteen", "Dining cabin", "Canteen porta cabin"],
    },
  },
  "/services/aluminium": {
    name: "Aluminium",
    heroKicker: "Precision fabrication",
    heroTitle: "Aluminium Works",
    intro:
      "Custom aluminium doors, windows, cladding, and architectural details for cabins, offices, and buildings in Jeddah.",
    bullets: [
      "Doors, windows, and curtain walls",
      "Cladding and façades for cabins",
      "Pergolas, handrails, and trims",
      "On-site measurement and fit-out",
    ],
    heroImage: img('aluminium-poster-1920x1080.webp'),
    heroAlt: "Aluminium fabrication",
    cardImage: img('aluminium-window-1024x683.webp'),
    gallery: [
      { src: img('aluminium-poster-1920x1080.webp'), alt: "Aluminium panels and cladding" },
      { src: img('aluminium-window-1024x683.webp'), alt: "Aluminium window frame" },
      { src: img('aluminium-image.jpeg2_.webp'), alt: "Aluminium profiles ready for assembly" },
    ],
    seo: {
      title: "Aluminium Works in Jeddah | Portacabins",
      description: "Custom aluminium structures, doors, windows, and cladding for portable projects in Jeddah, KSA.",
      keywords: ["Aluminium Jeddah", "Aluminium fabrication Saudi Arabia", "Cladding and doors"],
    },
  },
  "/services/cutting-and-bending": {
    name: "Cutting & Bending",
    heroKicker: "CNC accuracy",
    heroTitle: "Cutting & Bending",
    intro:
      "CNC cutting, folding, and punching for steel and aluminium sheets with accurate fit for cabin frames and trims.",
    bullets: [
      "CNC bending for panels and trims",
      "Laser/plasma cutting for patterns",
      "Tight fit for cabin frames",
      "Fast production for site deadlines",
    ],
    heroImage: img('CUTTING-AND-BENDING.webp'),
    heroAlt: "Metal cutting and bending",
    gallery: [
      { src: img('CUTTING-AND-BENDING.webp'), alt: "Sheet metal bending" },
      { src: img('image2.webp'), alt: "Metal cutting detail" },
      { src: img('aluminium-image.jpeg2_.webp'), alt: "Stacked metal profiles" },
    ],
    seo: {
      title: "Cutting and Bending in Jeddah | Portacabins",
      description: "CNC cutting and bending for steel and aluminium sheets with quick turnaround in Jeddah.",
      keywords: ["Cutting and bending", "Sheet metal Jeddah", "CNC bending Saudi Arabia"],
    },
  },
  "/services/welding": {
    name: "Welding",
    heroKicker: "Certified fabrication",
    heroTitle: "Welding Services",
    intro:
      "Structural and finishing welding for frames, stairs, handrails, gates, and accessories that match your cabin builds.",
    bullets: [
      "Structural welding for frames",
      "Stairs, handrails, and walkways",
      "Aluminium and steel per spec",
      "Surface prep and anti-rust coating",
    ],
    heroImage: img('WELDING-2.webp'),
    heroAlt: "Welding sparks on steel frame",
    cardImage: img('welding-1.webp'),
    gallery: [
      { src: img('welding-1.webp'), alt: "Welder on steel structure" },
      { src: img('WELDING-2.webp'), alt: "Welding arc close-up" },
      { src: img('portable-warehouse-1.webp'), alt: "Finished steel frame for cabin" },
    ],
    seo: {
      title: "Welding Services in Jeddah | Portacabins",
      description: "Structural and finishing welding for steel and aluminium frames, stairs, and accessories in Jeddah.",
      keywords: ["Welding Jeddah", "Steel welding Saudi Arabia", "Aluminium welding"],
    },
  },
};

const servicesAr: Record<string, ServiceContent> = {

  "/services/porta-cabins": {
    name: "كبائن برتاكابين",
    heroKicker: "مساحات جاهزة ومتينة",
    heroTitle: "كبائن متنقلة جاهزة للاستخدام",
    intro:
      "كبائن برتاكابين للسكن والمكاتب والمخازن والمعسكرات والمساجد ودورات المياه مع تسليم سريع وتركيب في جميع أنحاء السعودية.",
    bullets: [
      "ألواح ساندوتش مع هياكل فولاذية قوية",
      "تصاميم مخصصة مع تجهيز كهرباء وسباكة كامل",
      "هياكل جاهزة للرفع بالكرين والنقل السريع",
      "تسليم وتشغيل ميداني بسرعة",
    ],
    heroImage: img('PORTACABIN9.webp'),
    heroAlt: "واجهة كبينة متنقلة في جدة",
    cardImage: img('PORTACABIN-1-IMAGE.webp'),
    gallery: [
      { src: img('PORTACABIN2.webp'), alt: "كبينة متنقلة من الخارج" },
      { src: img('PORTACABIN3.webp'), alt: "منظر جانبي لكبينة متنقلة" },
      { src: img('PORTACABIN4.webp'), alt: "تركيب كبينة متنقلة" },
      { src: img('PORTACABIN5.webp'), alt: "مكتب محمول" },
      { src: img('PORTACABIN6.webp'), alt: "داخل الكبينة" },
    ],
    seo: {
      title: "كبائن متنقلة في جدة | بورتاكابين",
      description: "كبائن متنقلة معزولة للسكن والمكاتب والمعسكرات والتخزين ودورات المياه في جدة، السعودية.",
      keywords: ["كبائن متنقلة جدة", "بيوت متنقلة السعودية", "مكاتب متنقلة جدة", "كبائن تخزين متنقلة", "كبائن جاهزة KSA"],
    },
  },
  "/services/porta-cabins/portable-house": {
    name: "بيوت متنقلة",
    heroKicker: "راحة وعزل",
    heroTitle: "بيوت برتاكابين للسكن",
    intro:
      "بيوت متنقلة معزولة ومجهزة للتكييف والسباكة بتشطيبات نظيفة، مناسبة لسكن الأسر أو الموظفين.",
    bullets: ["مخططات مرنة للغرف والمعيشة", "عزل حراري وصوتي متين", "تجهيز كهرباء وسباكة جاهز للتوصيل", "تشطيبات داخلية نظيفة"],
    heroImage: img('PORTACABIN4.webp'),
    heroAlt: "بيت متنقل من الخارج",
    gallery: [
      { src: img('PORTACABIN4.webp'), alt: "واجهة بيت متنقل" },
      { src: img('PORTACABIN5.webp'), alt: "منظر جانبي للبيت" },
      { src: img('PORTACABIN6.webp'), alt: "ممر داخلي في الكبينة" },
    ],
    seo: {
      title: "بيوت متنقلة في جدة | بورتاكابين",
      description: "بيوت متنقلة معزولة ومجهزة للسكن العائلي أو لسكن الموظفين في جدة، السعودية.",
      keywords: ["بيوت متنقلة جدة", "منازل جاهزة السعودية", "سكن برتاكابين"],
    },
  },
  "/services/porta-cabins/portable-labour-camps": {
    name: "معسكرات العمال المتنقلة",
    heroKicker: "سكن عملي للفرق",
    heroTitle: "سكن عمال متنقل",
    intro:
      "كبائن سكن عمال متينة مع أسرة وخزائن ودورات مياه متكاملة، جاهزة للنقل والتركيب السريع.",
    bullets: [
      "غرف متعددة مع أسرّة وتخزين",
      "دورات مياه ومغاسل مدمجة",
      "تهوية وتكييف اختياري",
      "تشطيبات سهلة التنظيف للضغط العالي",
    ],
    heroImage: img('PORTACABIN10.webp'),
    heroAlt: "كبينات سكن عمال متنقلة",
    gallery: [
      { src: img('PORTACABIN10.webp'), alt: "واجهة سكن عمال متنقل" },
      { src: img('PORTACABIN8.webp'), alt: "مدخل كبينة سكن عمال" },
      { src: img('PORTACABIN7.webp'), alt: "توزيع غرف داخل الكبينة" },
    ],
    seo: {
      title: "سكن عمال متنقل في جدة | بورتاكابين",
      description: "معسكرات عمال متنقلة مع أسرّة وخزائن ودورات مياه جاهزة للتشغيل في السعودية.",
      keywords: ["سكن عمال متنقل", "معسكرات جاهزة جدة", "كبائن عمال السعودية"],
    },
  },
  "/services/porta-cabins/portable-log-cabins": {
    name: "كبائن خشبية متنقلة",
    heroKicker: "طابع خشبي دافئ",
    heroTitle: "كبائن لوغ متنقلة",
    intro: "كبائن بطابع خشبي للمنتجعات أو المكاتب أو غرف الضيافة مع عزل حراري وتشطيبات أنيقة.",
    bullets: [
      "مظهر خشبي أنيق ودافئ",
      "عزل للحرارة والضوضاء",
      "نوافذ كبيرة للإضاءة الطبيعية",
      "مناسبة للمنتجعات والمكاتب والاستقبال",
    ],
    heroImage: img('portacabins-portable-log-cabin.webp'),
    heroAlt: "كبينة لوغ متنقلة",
    gallery: [
      { src: img('portacabins-portable-log-cabin.webp'), alt: "واجهة كبينة خشبية" },
      { src: img('portable-cabin-1920x1440.webp'), alt: "منظر جانبي للكبينة" },
      { src: img('IMG-20250919-WA0058.webp'), alt: "تفاصيل نافذة في الكبينة" },
    ],
    seo: {
      title: "كبائن خشبية متنقلة في جدة | بورتاكابين",
      description: "كبائن بطابع خشبي معزولة للاستخدام الترفيهي أو كمكاتب وضيافة.",
      keywords: ["كبائن خشبية متنقلة", "كبينات لوغ", "مكاتب خشبية جاهزة"],
    },
  },
  "/services/porta-cabins/portable-mosques": {
    name: "مساجد متنقلة",
    heroKicker: "صالة صلاة جاهزة",
    heroTitle: "مساجد برتاكابين",
    intro:
      "مساجد متنقلة بصالة صلاة وفرش كامل ومنطقة وضوء جاهزة للتشغيل مع تكييف وإنارة حسب الحاجة.",
    bullets: [
      "صالة صلاة مفروشة",
      "منطقة وضوء ومغاسل",
      "تجهيز كهرباء وتكييف",
      "تجهيز صوت وإنارة",
    ],
    heroImage: img('Portable-Mosques-jaddah.webp'),
    heroAlt: "مسجد متنقل",
    gallery: [
      { src: img('modular-mosque-87101.webp'), alt: "وحدة مسجد متنقلة" },
      { src: img('Portable-Mosques-jaddah.webp'), alt: "واجهة مسجد متنقل" },
      { src: img('IMG-20250919-WA0061.webp'), alt: "منطقة وضوء وتجهيزات مياه" },
    ],
    seo: {
      title: "مساجد متنقلة في جدة | بورتاكابين",
      description: "مساجد متنقلة مع صالة صلاة ومنطقة وضوء وتكييف جاهزة للنقل والتركيب السريع.",
      keywords: ["مسجد متنقل", "وحدات صلاة جاهزة", "مساجد متنقلة السعودية"],
    },
  },
  "/services/porta-cabins/portable-pantry": {
    name: "مطبخ/بانتري متنقل",
    heroKicker: "جاهز للخدمة",
    heroTitle: "وحدات بانتري متنقلة",
    intro:
      "بانتري ومطابخ متنقلة بسطح ستانلس وأحواض وشفاط وتخزين لخدمة الفرق في المواقع بسرعة.",
    bullets: [
      "أسطح ستانلس وستاربورد",
      "أحواض وتوصيلات مياه جاهزة",
      "خيارات شفاط وتهوية",
      "تشطيبات صحية سهلة التنظيف",
    ],
    heroImage: img('portable-office-pantry-1600x1080.webp'),
    heroAlt: "مطبخ متنقل من الداخل",
    gallery: [
      { src: img('portacabins-portable-pantry.webp'), alt: "واجهة بانتري متنقلة" },
      { src: img('portable-office-pantry-1600x1080.webp'), alt: "مساحة عمل في المطبخ المتنقل" },
      { src: img('IMG-20250919-WA0060-150x150.webp'), alt: "تفاصيل خزانة في المطبخ" },
    ],
    seo: {
      title: "وحدات بانتري متنقلة في جدة | بورتاكابين",
      description: "بانتري ومطابخ متنقلة بأسطح ستانلس وأحواض وشفاط لخدمة المواقع بسرعة.",
      keywords: ["بانتري متنقل", "مطبخ متنقل", "كبائن مطبخ جدة"],
    },
  },
  "/services/porta-cabins/portable-restrooms": {
    name: "دورات مياه متنقلة",
    heroKicker: "حلول صحية سريعة",
    heroTitle: "حمامات متنقلة",
    intro:
      "وحدات دورات مياه متنقلة منفصلة للرجال والنساء مع تهوية وتوصيلات مياه وصرف وتشطيبات صحية.",
    bullets: [
      "مراحيض ومغاسل مجهزة بالكامل",
      "تهوية وتحكم بالروائح",
      "توصيلات مياه وصرف جاهزة",
      "تشطيبات صحية سهلة الغسل",
    ],
    heroImage: img('IMG-20250919-WA0061.webp'),
    heroAlt: "حمام متنقل",
    gallery: [
      { src: img('IMG-20250919-WA0061.webp'), alt: "داخل حمام متنقل" },
      { src: img('IMG-20250919-WA0064-1920x1440.webp'), alt: "واجهة وحدة حمام متنقلة" },
      { src: img('IMG-20250919-WA0062-1920x1440.webp'), alt: "ممر خدمات داخل الحمام" },
    ],
    seo: {
      title: "حمامات متنقلة في جدة | بورتاكابين",
      description: "دورات مياه متنقلة مجهزة بالكامل مع تهوية وتوصيلات مياه وصرف للمواقع في السعودية.",
      keywords: ["حمامات متنقلة", "كبائن دورات مياه", "دورات مياه جاهزة جدة"],
    },
  },
  "/services/porta-cabins/portable-security-office": {
    name: "مكاتب أمن متنقلة",
    heroKicker: "بوابات جاهزة",
    heroTitle: "مكاتب حراسة متنقلة",
    intro:
      "مكاتب أمن للبوابات ونقاط التفتيش مع مكاتب ثابتة ونوافذ بانورامية وتجهيز تكييف وكهرباء وأبواب أمان.",
    bullets: [
      "رؤية محيطية للنقاط الحساسة",
      "مكاتب ومقاعد ثابتة",
      "توصيلات تكييف وكهرباء جاهزة",
      "أبواب وأقفال أمان",
    ],
    heroImage: img('portacabins-portable-security-office-cabin.webp'),
    heroAlt: "مكتب حراسة متنقل",
    gallery: [
      { src: img('portacabins-portable-security-office-cabin.webp'), alt: "واجهة مكتب أمن متنقل" },
      { src: img('portableCabin02.webp'), alt: "وحدة حراسة بنوافذ واسعة" },
      { src: img('IMG-20250919-WA0059.webp'), alt: "مكتب أمن مضاء ليلاً" },
    ],
    seo: {
      title: "مكاتب حراسة متنقلة في جدة | بورتاكابين",
      description: "مكاتب أمن متنقلة بنوافذ بانورامية وتجهيز تكييف وكهرباء وأبواب أمان للبوابات.",
      keywords: ["مكتب أمن متنقل", "كبينات حراسة", "غرف حراسة جاهزة"],
    },
  },
  "/services/porta-cabins/portable-security-units": {
    name: "وحدات أمن متنقلة",
    heroKicker: "حراسة مدمجة",
    heroTitle: "وحدات حراسة جاهزة",
    intro:
      "وحدات حراسة مدمجة برؤية واسعة وهياكل قوية مع تجهيز كهرباء وتكييف للنقل والتركيب الفوري.",
    bullets: [
      "حجم مدمج لأي بوابة",
      "نوافذ واسعة لرؤية 360 deg",
      "توصيلات إنارة وتكييف جاهزة",
      "رفع وتركيب سريع",
    ],
    heroImage: img('portableCabin02.webp'),
    heroAlt: "وحدة أمن متنقلة",
    gallery: [
      { src: img('portableCabin02.webp'), alt: "وحدة أمن جاهزة" },
      { src: img('portacabins-portable-security-office-cabin.webp'), alt: "وحدة أمن بواجهة زجاجية" },
      { src: img('IMG-20250919-WA0058.webp'), alt: "تفاصيل نافذة وحدة أمن" },
    ],
    seo: {
      title: "وحدات أمن متنقلة في جدة | بورتاكابين",
      description: "وحدات حراسة مدمجة ذات رؤية محيطية مع تجهيز كهرباء وتكييف جاهز للنقل السريع.",
      keywords: ["وحدات أمن متنقلة", "كشك حراسة", "غرف حراسة متنقلة"],
    },
  },
  "/services/porta-cabins/portable-site-office": {
    name: "مكاتب مواقع متنقلة",
    heroKicker: "جاهزة للعمل",
    heroTitle: "مكاتب موقع جاهزة",
    intro:
      "مكاتب مواقع مجهزة بالكهرباء والإنارة والتكييف مع مساحات اجتماعات ومكاتب عمل جاهزة للاستخدام فوراً.",
    bullets: [
      "تصاميم مكاتب واجتماعات",
      "توصيلات كهرباء وإنارة وبيانات جاهزة",
      "عزل يضمن هدوء الداخل",
      "تسليم سريع للمشاريع القائمة",
    ],
    heroImage: img('PORTACABIN2.webp'),
    heroAlt: "مكتب موقع متنقل",
    gallery: [
      { src: img('PORTACABIN2.webp'), alt: "واجهة مكتب موقع" },
      { src: img('PORTACABIN3.webp'), alt: "منظر جانبي لمكتب موقع" },
      { src: img('PORTACABIN6.webp'), alt: "ممر داخلي في مكتب الموقع" },
    ],
    seo: {
      title: "مكاتب مواقع متنقلة في جدة | بورتاكابين",
      description: "مكاتب مواقع مجهزة بالكهرباء والبيانات والإنارة مع مساحات جاهزة للعمل فوراً.",
      keywords: ["مكاتب مواقع متنقلة", "مكاتب مشاريع جاهزة", "مكاتب متنقلة جدة"],
    },
  },
  "/services/porta-cabins/portable-warehouse": {
    name: "مستودعات متنقلة",
    heroKicker: "تخزين فوري",
    heroTitle: "مستودع متنقل",
    intro:
      "مستودعات متنقلة بأبواب واسعة وتهوية وتأمين مناسب لتخزين المعدات والمواد في المواقع بسرعة.",
    bullets: [
      "أبواب عريضة لمرور المعدات",
      "خيارات تهوية وإنارة",
      "أبواب وأقفال أمان",
      "أحجام مخصصة لاحتياجات التخزين",
    ],
    heroImage: img('PORTACABIN8.webp'),
    heroAlt: "مستودع متنقل",
    gallery: [
      { src: img('PORTACABIN8.webp'), alt: "واجهة مستودع متنقل" },
      { src: img('PORTACABIN7.webp'), alt: "مستودع متنقل في الموقع" },
      { src: img('PORTACABIN5.webp'), alt: "كبينة تخزين في الساحة" },
    ],
    seo: {
      title: "مستودعات متنقلة في جدة | بورتاكابين",
      description: "مستودعات متنقلة بأبواب واسعة وتهوية وتأمين لتخزين المعدات والمواد في السعودية.",
      keywords: ["مستودع متنقل", "تخزين متنقل", "كبائن تخزين جدة"],
    },
  },
  "/services/porta-cabins/portable-canteen": {
    name: "كافتيريا متنقلة",
    heroKicker: "تقديم سريع",
    heroTitle: "كابين كافتيريا",
    intro:
      "كافتيريا متنقلة مع شباك تقديم ومساحات جلوس وتشطيبات صحية لخدمة العمال في مواقع العمل.",
    bullets: [
      "شباك تقديم ومساحة تجهيز",
      "توزيع جلوس للفرق",
      "أسطح وتشطيبات صحية سهلة التنظيف",
      "نقاط كهرباء ومياه جاهزة",
    ],
    heroImage: img('PORTACABIN6.webp'),
    heroAlt: "كافتيريا متنقلة",
    gallery: [
      { src: img('PORTACABIN6.webp'), alt: "واجهة كافتيريا متنقلة" },
      { src: img('PORTACABIN5.webp'), alt: "منظر جانبي لكافتيريا" },
      { src: img('PORTACABIN4.webp'), alt: "ممر داخلي للكافتيريا" },
    ],
    seo: {
      title: "كافتيريا متنقلة في جدة | بورتاكابين",
      description: "كافتيريا متنقلة مع شباك تقديم ومساحات جلوس وتشطيبات صحية لخدمة العمال.",
      keywords: ["كافتيريا متنقلة", "مطعم متنقل للمواقع", "كبائن كافتيريا جدة"],
    },
  },
  "/services/aluminium": {
    name: "أعمال الألمنيوم",
    heroKicker: "تصنيع وتشطيب دقيق",
    heroTitle: "حلول ألمنيوم متينة",
    intro:
      "أبواب ونوافذ وألواح تكسية ألمنيوم مخصصة للمباني والكبائن مع تركيب في جدة والمملكة.",
    bullets: [
      "أبواب ونوافذ وجدران ستائرية",
      "تكسية وواجهات للكبينات والمباني",
      "برجولات ودرابزين وتفاصيل تشطيب",
      "رفع مقاسات في الموقع وتركيب متكامل",
    ],
    heroImage: img('aluminium-poster-1920x1080.webp'),
    heroAlt: "تصنيع ألمنيوم",
    cardImage: img('aluminium-window-1024x683.webp'),
    gallery: [
      { src: img('aluminium-poster-1920x1080.webp'), alt: "ألواح تكسية ألمنيوم" },
      { src: img('aluminium-window-1024x683.webp'), alt: "نافذة ألمنيوم" },
      { src: img('aluminium-image.jpeg2_.webp'), alt: "بروفايلات ألمنيوم جاهزة" },
    ],
    seo: {
      title: "أعمال ألمنيوم في جدة | بورتاكابين",
      description: "أبواب ونوافذ وتكسية ألمنيوم مخصصة للمشاريع والكبائن في جدة، السعودية.",
      keywords: ["ألمنيوم جدة", "تكسية ألمنيوم", "أبواب ونوافذ ألمنيوم"],
    },
  },
  "/services/cutting-and-bending": {
    name: "القص والثني",
    heroKicker: "دقة CNC",
    heroTitle: "قص وثني المعادن",
    intro:
      "قص وثني وتخريم CNC لألواح الحديد والألمنيوم بدقة عالية لتوافق كامل مع هياكل الكبائن والتشطيبات.",
    bullets: [
      "ثني ألواح وتفاصيل تشطيب بدقة",
      "قص ليزر/بلازما حسب المخططات",
      "توافق تام مع هياكل الكبائن",
      "إنتاج سريع لمواعيد المشاريع",
    ],
    heroImage: img('CUTTING-AND-BENDING.webp'),
    heroAlt: "قص وثني معادن",
    gallery: [
      { src: img('CUTTING-AND-BENDING.webp'), alt: "ثني صفائح معدنية" },
      { src: img('image2.webp'), alt: "تفاصيل قص المعادن" },
      { src: img('aluminium-image.jpeg2_.webp'), alt: "بروفايلات معدنية مكدسة" },
    ],
    seo: {
      title: "قص وثني المعادن في جدة | بورتاكابين",
      description: "خدمة قص وثني معادن CNC للألواح الحديدية والألمنيوم بتسليم سريع في جدة.",
      keywords: ["قص وثني جدة", "CNC معادن السعودية", "ثني صفائح"],
    },
  },
  "/services/welding": {
    name: "خدمات اللحام",
    heroKicker: "اعتماد صناعي",
    heroTitle: "لحام إنشائي وتشطيبي",
    intro:
      "لحام هياكل فولاذ وألمنيوم للسلالم والحواجز والأطر الإضافية مع تجهيز سطحي ومعالجة ضد الصدأ.",
    bullets: [
      "لحام إنشائي للهياكل والإطارات",
      "سلالم ودرابزين ومشايات",
      "لحام ألمنيوم وفولاذ حسب المواصفات",
      "دهان وحماية من الصدأ بعد اللحام",
    ],
    heroImage: img('WELDING-2.webp'),
    heroAlt: "شرارة لحام على هيكل فولاذي",
    cardImage: img('welding-1.webp'),
    gallery: [
      { src: img('welding-1.webp'), alt: "فني لحام على هيكل فولاذي" },
      { src: img('WELDING-2.webp'), alt: "قوس لحام قريب" },
      { src: img('portable-warehouse-1.webp'), alt: "هيكل فولاذي مكتمل لكبينة" },
    ],
    seo: {
      title: "خدمات لحام في جدة | بورتاكابين",
      description: "لحام إنشائي وتشطيبي للفولاذ والألمنيوم للسلالم والهياكل في جدة، السعودية.",
      keywords: ["لحام جدة", "لحام فولاذ السعودية", "لحام ألمنيوم"],
    },
  },
};

const buildCards = (services: Record<string, ServiceContent>) =>
  Object.entries(services).map(([path, svc]) => ({
    path,
    title: svc.name,
    summary: svc.intro,
    image: svc.cardImage || svc.heroImage,
    alt: svc.cardAlt || svc.heroAlt,
  }));

export const servicePaths = Object.keys(servicesEn);

export const servicesContent: Record<Locale, ServicesCopy> = {
  en: {
    overview: {
      title: 'Services',
      description: 'Portable cabins, aluminium works, welding, cutting and bending across Saudi Arabia.',
      heroImage: img('portable-cabin-1920x1080.webp'),
      heroAlt: 'Portable cabins in Saudi Arabia',
      cards: buildCards(servicesEn),
    },
    services: servicesEn,
  },
  ar: {
    overview: {
      title: 'الخدمات',
      description: 'كبائن جاهزة وأعمال ألمنيوم ولحام وقص وثني في جدة وجميع أنحاء السعودية.',
      heroImage: img('portable-cabin-1920x1080.webp'),
      heroAlt: 'كبائن متنقلة في السعودية',
      cards: buildCards(servicesAr),
    },
    services: servicesAr,
  },
};


