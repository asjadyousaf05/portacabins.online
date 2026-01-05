import { useEffect, useRef, useState, type MouseEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { siteCopy } from '../../content/siteCopy';

type Props = {
  copy: (typeof siteCopy)['en']['hero'];
  locale: 'en' | 'ar';
};

export const HeroSection = ({ copy, locale }: Props) => {
  const [restSlides, setRestSlides] = useState(copy.slides.slice(1));
  const [useManualSlider, setUseManualSlider] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperElRef = useRef<HTMLElement | null>(null);
  const swiperInstance = useRef<any>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const firstSlide = copy.slides[0];

  useEffect(() => {
    setRestSlides(copy.slides.slice(1));
  }, [copy.slides]);

  // Preload first slides to avoid white flashes while Swiper initializes.
  useEffect(() => {
    const preload = (src?: string) => {
      if (!src) return;
      const img = new Image();
      img.src = src;
    };
    preload(copy.slides[0]?.image);
    preload(copy.slides[1]?.image);
  }, [copy.slides]);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const tryInit = () => {
      if (cancelled) return;
      const Swiper = (window as any).Swiper;
      if (!Swiper || swiperInstance.current) {
        if (!Swiper && attempts < 5) {
          attempts += 1;
          setTimeout(tryInit, 120);
        }
        if (!Swiper && attempts >= 5) {
          setUseManualSlider(true);
        }
        return;
      }
      setUseManualSlider(false);
      const el = document.querySelector('.__js_main-slider') as HTMLElement | null;
      if (!el) return;
      if ((el as any).__reactBoundSwiper || el.classList.contains('swiper-initialized')) return;
      swiperElRef.current = el;

      const paginationEl = document.querySelector('.swiper-custom-pagination ul') as HTMLElement | null;
      if (paginationEl) {
        paginationEl.innerHTML = '';
      }
      swiperInstance.current = new Swiper(el, {
        loop: true,
        speed: 600,
        autoplay: { delay: 4000, disableOnInteraction: false },
        allowTouchMove: true,
        simulateTouch: true,
        grabCursor: true,
        preventClicks: false,
        preventClicksPropagation: false,
        navigation: {
          prevEl: '.swiper-custom-nav .prev',
          nextEl: '.swiper-custom-nav .next',
        },
        pagination: {
          el: '.swiper-custom-pagination ul',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index: number, className: string) =>
            `<li class="${className}"><span class="num">${String(index + 1).padStart(2, '0')}</span><span class="label"><span>${
              copy.slides[index]?.label || ''
            }</span></span></li>`,
        },
        on: {
          slideChange() {
            const idx = swiperInstance.current?.realIndex ?? swiperInstance.current?.activeIndex ?? 0;
            setActiveIndex(idx);
          },
        },
      });
      (el as any).__reactBoundSwiper = true;
    };

    tryInit();
    fallbackTimer = setTimeout(() => {
      if (!swiperInstance.current && !cancelled) {
        setUseManualSlider(true);
      }
    }, 1200);
    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (swiperInstance.current?.destroy) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
      if (swiperElRef.current) {
        delete (swiperElRef.current as any).__reactBoundSwiper;
      }
      cancelled = true;
    };
  }, [copy.slides]);

  useEffect(() => {
    setActiveIndex(0);
  }, [copy.slides]);

  useEffect(() => {
    if (!useManualSlider) return;
    if (copy.slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((idx) => (idx + 1) % copy.slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [useManualSlider, copy.slides.length]);

  const totalSlides = copy.slides.length;

  const slidePrev = () => {
    const inst = swiperInstance.current;
    if (inst?.slidePrev) {
      inst.slidePrev();
      return;
    }
    setActiveIndex((idx) => ((idx - 1 + totalSlides) % totalSlides));
  };

  const slideNext = () => {
    const inst = swiperInstance.current;
    if (inst?.slideNext) {
      inst.slideNext();
      return;
    }
    setActiveIndex((idx) => (idx + 1) % totalSlides);
  };

  const goToIndex = (idx: number) => {
    const inst = swiperInstance.current;
    const next = ((idx % totalSlides) + totalSlides) % totalSlides;
    if (inst?.slideToLoop) {
      inst.slideToLoop(next);
      return;
    }
    setActiveIndex(next);
  };

  const handlePrevClick = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    slidePrev();
  };

  const handleNextClick = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    slideNext();
  };

  const slidesToRender = [firstSlide, ...restSlides];

  useEffect(() => {
    const el = document.querySelector('.__js_main-slider') as HTMLElement | null;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX.current;
      const dy = t.clientY - touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;
      if (Math.abs(dx) < 28 || Math.abs(dx) <= Math.abs(dy)) return;
      if (dx > 0) {
        slidePrev();
      } else {
        slideNext();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [totalSlides]);

  // If Swiper never loaded, lock into manual mode to avoid blank states.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!swiperInstance.current) {
        setUseManualSlider(true);
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-7795526 elementor-section-full_width elementor-section-height-default elementor-section-height-default"
      data-element_type="section"
      data-id="7795526"
      dir={locale === 'ar' ? 'ltr' : undefined}
    >
      <div className="elementor-container elementor-column-gap-no">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-823bd72"
          data-element_type="column"
          data-id="823bd72"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-826053a elementor-widget elementor-widget-larson-hero-slider"
              data-element_type="widget"
              data-id="826053a"
              data-widget_type="larson-hero-slider.default"
            >
              <div className="elementor-widget-container">
                <div className="webpage__main-slider main-slider">
                  <div
                    className="swiper-container __js_main-slider"
                    data-delay="4000"
                    style={{ backgroundColor: '#0c0c0c' }}
                  >
                    <div className="swiper-wrapper">
                      {slidesToRender.map((slide, idx) => (
                        <div
                          className="swiper-slide"
                          data-swiper-autoplay=""
                          key={slide.id || idx}
                          style={useManualSlider ? { display: idx === activeIndex ? 'block' : 'none' } : undefined}
                        >
                          <div
                          className="slide"
                          data-dimg={slide.image}
                          data-mimg=""
                          style={{ backgroundImage: `url(${slide.image})`, backgroundColor: '#0c0c0c' }}
                          role="img"
                          aria-label={slide.alt}
                        />
                          <div className="container">
                            <div className="info">
                              <div className="bline">
                                <span className="bline-1" />
                                <span className="bline-2" />
                                <span className="bline-3" />
                              </div>
                              <div className="title">
                                <span>
                                  {slide.headline.before}
                                  <br />
                                  <b>{slide.headline.highlight}</b>
                                  <br />
                                  {slide.headline.after}
                                </span>
                              </div>
                              <div className="more">
                                {slide.ctaHref ? (
                                  <Link className="link-arrow link-arrow--white" to={slide.ctaHref}>
                                    <span>{locale === 'ar' ? 'عرض المشروع' : 'See project'}</span>
                                    <svg width="20" height="20">
                                      <use xlinkHref="#chevron-right" />
                                    </svg>
                                  </Link>
                                ) : (
                                  <span className="link-arrow link-arrow--white">
                                    <span>{locale === 'ar' ? 'عرض المشروع' : 'See project'}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="swiper-custom-nav" style={{ pointerEvents: 'auto', zIndex: 5 }}>
                      <a
                        className="prev"
                        href="#"
                        role="button"
                        tabIndex={0}
                        onClick={handlePrevClick}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handlePrevClick(e);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {locale === 'ar' ? 'السابق' : 'Prev'}
                      </a>
                      <a
                        className="next"
                        href="#"
                        role="button"
                        tabIndex={0}
                        onClick={handleNextClick}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleNextClick(e);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {locale === 'ar' ? 'التالي' : 'Next'}
                      </a>
                    </div>
                  </div>
                  <div className="swiper-custom-pagination">
                    <ul>
                      {useManualSlider
                        ? slidesToRender.map((slide, idx) => (
                            <li
                              key={`${slide.id}-pg`}
                              className={idx === activeIndex ? 'swiper-pagination-bullet-active' : ''}
                              onClick={() => goToIndex(idx)}
                              style={{ cursor: 'pointer' }}
                            >
                              <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                              <span className="label">
                                <span>{slide.label}</span>
                              </span>
                            </li>
                          ))
                        : copy.slides.map((slide, idx) => (
                            <li key={`${slide.id}-pg`}>
                              <span className="num">{String(idx + 1).padStart(2, '0')}</span>
                              <span className="label">
                                <span>{slide.label}</span>
                              </span>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
