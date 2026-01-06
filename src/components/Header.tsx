import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
  locale: 'en' | 'ar';
};

type NavItem = {
  key: string;
  label: string;
  path: string;
  children?: NavItem[];
};

const copyMap = {
  en: {
    home: 'HOME',
    services: 'Services',
    portaCabins: 'PORTA CABINS | Factory – Offices & Ready Buildings',
    portableHouse: 'PORTABLE HOUSE',
    portableSiteOffice: 'PORTABLE SITE OFFICE',
    portableLabourCamps: 'PORTABLE LABOUR CAMPS',
    portableLogCabins: 'PORTABLE LOG CABINS',
    portableMosques: 'PORTABLE MOSQUES',
    portablePantry: 'PORTABLE PANTRY',
    portableRestrooms: 'PORTABLE RESTROOMS',
    portableSecurityOffice: 'PORTABLE SECURITY OFFICE',
    portableSecurityUnits: 'PORTABLE SECURITY UNITS',
    portableWarehouse: 'PORTABLE WAREHOUSE',
    aluminium: 'ALUMINIUM',
    cuttingBending: 'CUTTING AND BENDING',
    welding: 'WELDING',
    about: 'About',
    contact: 'Contact',
    gallery: 'Gallery',
    logoLarge: 'PORTACABINS',
    logoSmall: 'SUPPLY AND INSTALLMENT',
    phone: '+966506802316',
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    portaCabins: 'بورتاكابين | المصانع والمكاتب والمباني الجاهزة',
    portableHouse: 'بيت متنقل',
    portableSiteOffice: 'مكتب موقع متنقل',
    portableLabourCamps: 'مخيمات عمال متنقلة',
    portableLogCabins: 'أكواخ خشبية متنقلة',
    portableMosques: 'مساجد متنقلة',
    portablePantry: 'مطبخ متنقل',
    portableRestrooms: 'دورات مياه متنقلة',
    portableSecurityOffice: 'مكتب أمن متنقل',
    portableSecurityUnits: 'وحدات أمن متنقلة',
    portableWarehouse: 'مستودع متنقل',
    aluminium: 'الألمنيوم',
    cuttingBending: 'القص والثني',
    welding: 'اللحام',
    about: 'من نحن',
    contact: 'اتصل بنا',
    gallery: 'المعرض',
    logoLarge: 'بورتاكابين',
    logoSmall: 'توريد وتركيب',
    phone: '+966506802316',
  },
};

export const Header = ({ locale }: HeaderProps) => {
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const navShellRef = useRef<HTMLDivElement | null>(null);
  const mobileCanvasRef = useRef<HTMLDivElement | null>(null);
  const prevPathRef = useRef<string>(location.pathname);
  const dropdownRefs = useRef<Record<string, HTMLUListElement | null>>({});
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [dropdownHeights, setDropdownHeights] = useState<Record<string, number>>({});
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 992px)').matches : true,
  );
  const c = locale === 'ar' ? copyMap.ar : copyMap.en;

  const portaCabinChildren: NavItem[] = useMemo(
    () => [
      { key: 'portable-house', label: c.portableHouse, path: '/services/porta-cabins/portable-house' },
      { key: 'portable-site-office', label: c.portableSiteOffice, path: '/services/porta-cabins/portable-site-office' },
      { key: 'portable-labour-camps', label: c.portableLabourCamps, path: '/services/porta-cabins/portable-labour-camps' },
      { key: 'portable-log-cabins', label: c.portableLogCabins, path: '/services/porta-cabins/portable-log-cabins' },
      { key: 'portable-mosques', label: c.portableMosques, path: '/services/porta-cabins/portable-mosques' },
      { key: 'portable-pantry', label: c.portablePantry, path: '/services/porta-cabins/portable-pantry' },
      { key: 'portable-restrooms', label: c.portableRestrooms, path: '/services/porta-cabins/portable-restrooms' },
      { key: 'portable-security-office', label: c.portableSecurityOffice, path: '/services/porta-cabins/portable-security-office' },
      { key: 'portable-security-units', label: c.portableSecurityUnits, path: '/services/porta-cabins/portable-security-units' },
      { key: 'portable-warehouse', label: c.portableWarehouse, path: '/services/porta-cabins/portable-warehouse' },
    ],
    [c],
  );

  const navItems: NavItem[] = useMemo(
    () => [
      { key: 'home', label: c.home, path: '/' },
      {
        key: 'services',
        label: c.services,
        path: '/services',
        children: [
          {
            key: 'porta-cabins',
            label: c.portaCabins,
            path: '/services/porta-cabins',
            children: portaCabinChildren,
          },
          { key: 'aluminium', label: c.aluminium, path: '/services/aluminium' },
          { key: 'cutting-and-bending', label: c.cuttingBending, path: '/services/cutting-and-bending' },
          { key: 'welding', label: c.welding, path: '/services/welding' },
        ],
      },
      { key: 'gallery', label: c.gallery, path: '/gallery' },
      { key: 'about', label: c.about, path: '/about' },
      { key: 'contact', label: c.contact, path: '/contact' },
    ],
    [c, portaCabinChildren],
  );

  useEffect(() => {
    const styleId = 'header-rtl-mobile-fix';
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @media (max-width: 1024px) {
        .rtl .header__inner .elementor-container {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .rtl .header__logo { margin: 0; }
        .rtl .header__mobile { margin: 0; display: block; }
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 992px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handleChange(mql);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setOpenDropdowns({});
      setDropdownHeights({});
    }
  }, [isDesktop]);

  const closeSidebar = useCallback(() => {
    if (typeof console !== 'undefined' && typeof console.trace === 'function') {
      console.trace();
    }
    setMobileOpen(false);
    setOpenDropdowns({});
  }, []);

  const toggleMobile = useCallback(() => {
    if (mobileOpen) {
      closeSidebar();
      return;
    }
    setMobileOpen(true);
  }, [closeSidebar, mobileOpen]);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    if (location.pathname !== prevPath) {
      prevPathRef.current = location.pathname;
      if (mobileOpen && !isDesktop) {
        closeSidebar();
      }
    }
  }, [closeSidebar, isDesktop, location.pathname, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleOutside = (e: MouseEvent | PointerEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const isInside = [mobileCanvasRef.current, navShellRef.current, headerRef.current].some(
        (el) => el && (el === target || el.contains(target)),
      );
      if (isInside) return;
      closeSidebar();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };
    const downEvent: 'pointerdown' | 'mousedown' = 'PointerEvent' in window ? 'pointerdown' : 'mousedown';
    document.addEventListener(downEvent, handleOutside, true);
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener(downEvent, handleOutside, true);
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [closeSidebar, mobileOpen]);

  useLayoutEffect(() => {
    if (isDesktop) return;
    const next: Record<string, number> = {};
    Object.entries(dropdownRefs.current).forEach(([id, el]) => {
      if (!el) return;
      // Measure natural height even if currently collapsed.
      const prevMaxHeight = el.style.maxHeight;
      const prevOpacity = el.style.opacity;
      const prevVisibility = el.style.visibility;
      const prevDisplay = el.style.display;
      const prevPosition = el.style.position;
      el.style.display = 'block';
      el.style.position = 'relative';
      el.style.maxHeight = 'none';
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      next[id] = el.scrollHeight;
      el.style.maxHeight = prevMaxHeight;
      el.style.opacity = prevOpacity;
      el.style.visibility = prevVisibility;
      el.style.display = prevDisplay;
      el.style.position = prevPosition;
    });
    setDropdownHeights(next);
  }, [isDesktop, locale, openDropdowns, dropdownRefs]);

  useEffect(() => {
    if (isDesktop) return;
    const handleResize = () => {
      const next: Record<string, number> = {};
      Object.entries(dropdownRefs.current).forEach(([id, el]) => {
        if (el) next[id] = el.scrollHeight;
      });
      setDropdownHeights(next);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isDesktop]);

  useEffect(() => {
    const onScroll = () => {
      const headerEl = headerRef.current;
      if (!headerEl) return;
      const shouldFix = window.scrollY > headerEl.offsetHeight;
      headerEl.classList.toggle('header--fixed', shouldFix);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(`${path}/`));

  useEffect(() => {
    const styleId = 'header-desktop-nav-fix';
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @media (min-width: 992px) {
        .header__nav-shell .mobile-canvas {
          position: static;
          transform: none;
          opacity: 1;
          pointer-events: auto;
          background: transparent;
          height: auto;
          width: auto;
          display: block;
        }
        .header__nav-shell .mobile-canvas__nav {
          display: block;
          padding: 0;
        }
        .header__nav-shell .mobile-canvas__close,
        .header__nav-shell .mobile-canvas__bottom,
        .header__menu-toggle {
          display: none;
        }
        .header__nav-shell .header__nav-list {
          display: flex;
          gap: 18px;
          align-items: center;
        }
        .header__nav-shell .navigation__link {
          color: #111;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .header__nav-shell .navigation__item {
          position: relative;
        }
        .header__nav-shell .navigation__dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          display: none;
          background: #111;
          padding: 12px 0;
          min-width: 240px;
          z-index: 20;
        }
        .rtl .header__nav-shell .navigation__dropdown {
          left: auto;
          right: 0;
        }
        .header__nav-shell .navigation__item:hover > .navigation__dropdown {
          display: block;
        }
        .header__nav-shell .navigation__dropdown .navigation__item {
          padding: 6px 16px;
        }
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  const toggleDropdown = (key: string) => {
    if (isDesktop) return;
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItems = (items: NavItem[], parentKey?: string) =>
    items.map((item) => {
      const hasChildren = !!item.children?.length;
      const dropdownKey = parentKey ? `${parentKey}-${item.key}` : item.key;
      const isOpen = !isDesktop && !!openDropdowns[dropdownKey];
      const dropdownId = `submenu-${dropdownKey}`;

      return (
        <li
          key={dropdownKey}
          className={`navigation__item menu-item${hasChildren ? ' menu-item-has-children dropdown' : ''}${
            isOpen ? ' navigation__item--open' : ''
          }${
            isActive(item.path) ? ' navigation__item--current' : ''
          }`}
          data-dropdown-key={hasChildren ? dropdownKey : undefined}
        >
          <Link
            className={`navigation__link animsition-link${hasChildren ? ' dropdown-toggle' : ''}${
              !isDesktop && hasChildren && isOpen ? ' opened' : ''
            }`}
            to={item.path}
            aria-haspopup={hasChildren ? 'true' : undefined}
            aria-expanded={hasChildren ? (isDesktop ? undefined : isOpen) : undefined}
            aria-controls={hasChildren ? dropdownId : undefined}
            onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
              if (!isDesktop && hasChildren) {
                const targetEl = e.target as HTMLElement | null;
                const isToggleIcon = targetEl && targetEl.closest('.navigation__toggle-icon');
                if (!isToggleIcon) {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDropdown(dropdownKey);
                  return;
                }
                // allow navigation via arrow tap
              }

              if (!isDesktop && !hasChildren) {
                closeSidebar();
              }
            }}
          >
            {hasChildren && (
              <i
                className={`icon icon-down-open navigation__toggle-icon${isOpen ? ' navigation__toggle-icon--open' : ''}`}
                aria-hidden="true"
              >
                {'->'}
              </i>
            )}
            <span className="navigation__label">{item.label}</span>
          </Link>
          {hasChildren && (
            <ul
              className="sub-menu navigation__dropdown"
              id={dropdownId}
              ref={(el) => {
                dropdownRefs.current[dropdownId] = el;
              }}
              style={
                !isDesktop
                  ? {
                      maxHeight: isOpen ? `${dropdownHeights[dropdownId] || 0}px` : '0px',
                      opacity: isOpen ? 1 : 0,
                      visibility: isOpen ? 'visible' : 'hidden',
                      pointerEvents: isOpen ? 'auto' : 'none',
                    }
                  : undefined
              }
            >
              {renderItems(item.children!, dropdownKey)}
            </ul>
          )}
        </li>
      );
    });

  return (
    <header className="header __js_fixed-header" id="header" ref={headerRef} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="header__inner">
        <div className="header__builder">
          <div data-elementor-type="wp-post" data-elementor-id="660" className="elementor elementor-660">
            <section
              className="elementor-section elementor-top-section elementor-element elementor-element-3709333 elementor-section-full_width elementor-section-content-middle elementor-section-height-default elementor-section-height-default"
              data-id="3709333"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-no">
                <div
                  className="elementor-column elementor-col-16 elementor-top-column elementor-element elementor-element-3e82d79"
                  data-id="3e82d79"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-3078456 elementor-widget__width-initial elementor-widget-mobile__width-initial elementor-widget elementor-widget-larson-header-logo"
                      data-id="3078456"
                      data-element_type="widget"
                      data-widget_type="larson-header-logo.default"
                    >
                      <div className="elementor-widget-container">
                        <Link className="header__logo logo" to="/" title="Porta Cabins">
                          <span className="logo__large">
                            <span>{c.logoLarge}</span>
                          </span>
                          <span className="logo__small">
                            <span>{c.logoSmall}</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="elementor-column elementor-col-66 elementor-top-column elementor-element elementor-element-a186ae5"
                  data-id="a186ae5"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-ec5bf44 elementor-widget__width-initial elementor-widget elementor-widget-larson-header-menu"
                      data-id="ec5bf44"
                      data-element_type="widget"
                      data-widget_type="larson-header-menu.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="container header__nav-shell" ref={navShellRef}>
                          <div
                            className={`mobile-canvas __js_mobile-canvas header__mobile${mobileOpen ? ' mobile-canvas--opened mobile-canvas--social' : ''}`}
                            ref={mobileCanvasRef}
                          >
                            <button className="mobile-canvas__close" type="button" aria-label="Close menu" onClick={closeSidebar}>
                              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M4 4l12 12m0-12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </button>

                            <nav className="mobile-canvas__nav navigation header__nav" aria-label="Primary navigation">
                              <ul id="menu-header-menu" className="navigation__list header__nav-list">
                                {renderItems(navItems)}
                              </ul>
                            </nav>

                            <div className="mobile-canvas__bottom">
                              <a className="mobile-canvas__phone" href="https://wa.me/966506802316">
                                {c.phone}
                              </a>
                              <div className="mobile-canvas__social">
                                <a className="fab-menu__link" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                  <span className="fab-menu__icon fab-menu__icon--facebook">f</span>
                                </a>
                                <a className="fab-menu__link" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                  <span className="fab-menu__icon fab-menu__icon--linkedin">in</span>
                                </a>
                                <a className="fab-menu__link" href="https://wa.me/966506802316" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                                  <span className="fab-menu__icon fab-menu__icon--whatsapp">wa</span>
                                </a>
                                <a className="fab-menu__link" href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                  <span className="fab-menu__icon fab-menu__icon--instagram">ig</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          className={`header__menu-toggle menu-toggle${mobileOpen ? ' menu-toggle--opened' : ''}`}
                          type="button"
                          aria-expanded={mobileOpen}
                          aria-controls="menu-header-menu"
                          onClick={() => toggleMobile()}
                        >
                          <span className="visually-hidden">Menu</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="elementor-column elementor-col-16 elementor-top-column elementor-element elementor-element-404c260"
                  data-id="404c260"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-a70f4d3 elementor-widget__width-initial elementor-widget elementor-widget-larson-header-phone"
                      data-id="a70f4d3"
                      data-element_type="widget"
                      data-widget_type="larson-header-phone.default"
                    >
                      <div className="elementor-widget-container">
                        <a className="header__phone" href="https://wa.me/966506802316">
                          <span>{c.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
};
