( function( $ ) {
	'use strict';

/*------------------------------------------------

1. AOS init
3. Mobile menu
4. Fixed header
5. Project slider
6. Project carousel
  6.1 Filter carousel
7. Reviews carousel
8. Animation of statistics
9. Modal
10. Packery init
11. Pagepiling
12. Form validation
13. Fixed footer
14. Parallax slider
15. Home grid background

-------------------------------------------------*/

var body = $('body');
var DURATION = 300;
var header = $('.header');
var mobileBreakpoint = 992;

function setOverlay(cb) {
	var overlay = $('<div class="overlay"></div>');
	overlay.on('click', cb);
	return overlay;
}

/*
	0. Preloader
*/

$(window).on("load", function() {
	var preload = $('.preloader');
	preload.find('.preloader__spinner').fadeOut(function(){
		preload.fadeOut(500);
	});
});

/* 1. AOS init */
$(window).on('load', function() {
	AOS.init({
		duration: 1000,
		once: true,
	});
});

/* 3. Mobile menu */
(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menu = $('.__js_mobile-canvas');
	var menuCloseBtn = menu.find('.mobile-canvas__close');
	var headerContainer = $('.header .container');
	var isHandled = false;

	$('.dropdownnavigation__item').append('<i class="icon icon-down-open"></i>');
	var mobileDropdownLinks = $('.dropdownnavigation__item .icon');

	var ModifierClass = {
		MENU: 'mobile-canvas--opened',
		TOGGLE: 'menu-toggle--opened'
	};

	menuOpenBtn.on('click', function() {
		var overlay = setOverlay(closeMenu);
		body.append(overlay);

		menuCloseBtn.on('click', closeMenu);
		menuOpenBtn.addClass(ModifierClass.TOGGLE);

		setTimeout(function() {
			overlay.fadeIn(DURATION);

			menu.addClass(ModifierClass.MENU);
		}, DURATION + 50);
	});

	if ($(window).width() < mobileBreakpoint) {
		$('.mobile-canvas__nav-h').html($('.header .mobile-canvas__nav'));
	}

	if ($(window).width() < mobileBreakpoint && !isHandled) {
		$('.dropdownnavigation__item').on('click', '> .icon', openMobileDropdown);
		isHandled = true;
	}

	function openMobileDropdown(evt) {
		if ($(this).hasClass('opened')) {
			$(this).parent().find('> a').next().slideUp();
			$(this).removeClass('opened');
		} else {
			$(this).parent().find('> a').next().slideDown();
			$(this).addClass('opened');
		}
	}

	$( ".mobile-canvas__nav" ).on( "click", '.navigation__link', function(){
		$('.mobile-canvas__close').click();
	});

	function closeMenu() {
		menuCloseBtn.off('click', closeMenu);
		menu.removeClass(ModifierClass.MENU);
		var overlay = $('.overlay').fadeOut(DURATION);

		setTimeout(function() {
			menuOpenBtn.removeClass(ModifierClass.TOGGLE);
			overlay.remove();
		}, DURATION + 50);
	}

	$(window).on('resize', function() {
		var windowWidth = $(window).width();

		if (windowWidth < mobileBreakpoint) {
			$('.mobile-canvas__nav-h').html($('.header .mobile-canvas__nav').html());
		}

		if (windowWidth >= mobileBreakpoint) {
			closeMenu();
		}

		if ($(window).width() < mobileBreakpoint && !isHandled) {
			$('.dropdownnavigation__item').on('click', '> .icon', openMobileDropdown);
			isHandled = true;
		}
	});
})();

/* 4. Fixed header */
(function() {
	var header = $('.__js_fixed-header');
	if (header.length) {
		var headerOffset = header.offset().top;
		var headerHeight = header.outerHeight();
	}
	var classes = 'header--fixed';
	var scroll = $(window).scrollTop();
	var isScroll = false;
	var isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;

	$(window).on('scroll', function() {
		scroll = $(window).scrollTop();

		if (scroll >= headerOffset + headerHeight) {
			isScroll = true;

			headerHeight = isScroll ? header.outerHeight() : null;
			header.addClass(classes);

			if (!header.hasClass('is-fixed')) {
				header.css({'top': -headerHeight + 'px', 'transform': ' translateY(' + headerHeight + 'px)'}).addClass('is-fixed');

				if (!isNotStatic) {
					body.css('padding-top', headerHeight + 'px');
				}
			}
		} else {
			isScroll = false;
			header.removeClass(classes + ' is-fixed').removeAttr('style');
			body.css('padding-top', 0);

			if (!isNotStatic) {
				body.css('padding-top', 0);
			}
		}
	});

	$(window).on('resize', function() {
		headerHeight = header.outerHeight();
		isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;

		if (scroll >= headerOffset + headerHeight && isScroll) {
			header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'});
			body.css('padding-top', headerHeight + 'px');

			if (!isNotStatic) {
				body.css('padding-top', headerHeight + 'px');
			}
		}
	});
})();

/* Home slider */
(function(){
	var sliderDelay = false;
	var interleaveOffset = 0.5;
	var sliderSpeed = 1200;
	var sliderDelay = 4000;
	var sliderDelay_val = $('.__js_main-slider').data('delay');
	if (sliderDelay_val > 1) {
		var sliderDelay = true;
		$('.__js_main-slider').find('.swiper-slide').attr('data-swiper-autoplay', sliderDelay_val);
	}
	var mainSliderSelector = new Swiper('.__js_main-slider', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: false,
		rewind: true,
		speed: sliderSpeed,
		parallax: true,
		autoplay: sliderDelay,
		grabCursor: false,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.main-slider .swiper-custom-nav .next',
			prevEl: '.main-slider .swiper-custom-nav .prev',
		},
		on: {
			progress: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress,
						innerOffset = swiper.width * interleaveOffset,
						innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector('.slide').style.transform = 'translateX(' + innerTranslate + 'px)';
				}
			},
			touchStart: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = '';
				}
			},
			setTransition: function(swiper, speed) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + 'ms';
					swiper.slides[i].querySelector('.slide').style.transition = speed + 'ms';
				}
			},
			transitionEnd: function(swiper) {
				var active_index = $('.main-slider .swiper-slide-active').index()+1;
				$('.swiper-custom-pagination ul li').removeClass('pag-active');
				$('.swiper-custom-pagination ul li:nth-child('+active_index+')').addClass('pag-active');
			}
		}
	});
	$( ".main-slider .swiper-slide .slide" ).each(function() {
		var img_d = $(this).attr('data-dimg');
		var img_m = $(this).attr('data-mimg');
		if($(window).width() < 768) {
			if(img_m != 0) {
				$(this).css({'background-image' : 'url('+img_m+')'});
			}
			else {
				$(this).css({'background-image' : 'url('+img_d+')'});
			}
		} else {
			if(img_d != 0) {
				$(this).css({'background-image' : 'url('+img_d+')'});
			}
		}
	});
	$('.swiper-custom-pagination ul li').on('click', function(){
		var slide_i = $(this).index();
		mainSliderSelector.slideTo(slide_i, 1200);
	});
	$('.swiper-custom-pagination ul li:first-child').addClass('pag-active');
})();

/* 5. Project slider */
(function(){
	var projectsSlider = new Swiper('.__js_projects-slider', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.projects-slider__next',
			prevEl: '.projects-slider__prev',
		},
	});
})();

/* 6. Project carousel */
(function(){
	var mySwiper = new Swiper('.__js_projects-carousel', {
		slidesPerView: 'auto',
		spaceBetween: 32,
		loop: false,

		navigation: {
			nextEl: '.projects-carousel__next',
			prevEl: '.projects-carousel__prev',
		},

		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});

	var latestProjectsInHomeCarousel = new Swiper('.__js_latest-projects-carousel', {
		slidesPerView: 1,
		loop: false,
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30
			},
		},

		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});

	/* 6.1 Filter carousel */
	$('.__js_latest-projects-filter-item').on('click', function() {
		var selector = $(this).attr('data-filter');

		$('.__js_latest-projects-carousel').fadeOut(DURATION);
		$('.__js_latest-projects-carousel').fadeIn(DURATION);

		setTimeout(function(){
			$('.__js_latest-projects-carousel .swiper-slide').hide();
			$(selector).closest('.__js_latest-projects-carousel .swiper-slide').show();

			latestProjectsInHomeCarousel.update();
		}, DURATION);

		return false;
	});
})();

/* 7. Reviews carousel */
(function() {
	var reviewCarousel = new Swiper('.__js_review-carousel', {
		slidesPerView: 1,
		loop: false,
		spaceBetween: 15,
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			1200: {
				slidesPerView: 2,
				spaceBetween: 60
			},
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});
})();

/* 8. Animation of statistics */
(function() {
	$(window).on('load', function() {
		var statistics = $('.statistics');
		var numbers = $('.__js_number');
		var animationIsDone = false;
		var scroll = $(window).scrollTop() + $(window).height();

		if ($('*').is('.statistics')) {
			var offset = statistics.offset().top;

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
			}

			$(window).on('scroll', function() {
				scroll = $(window).scrollTop() + $(window).height();

				if (!animationIsDone && scroll >= offset) {
					animateNumbers();
				}
			});
		}

		function animateNumbers() {
			numbers.each(function() {
				var endValue = parseInt($(this).attr('data-end-value'), 10);

				$(this).easy_number_animate({
					start_value: 0,
					end_value: endValue,
					duration: 2500
				});

			});

			animationIsDone = true;
		}
	});
})();

/* 9. Modal
(function(){
	$(document).ready(function() {
		$(".fancybox").fancybox({
			margin: 0
		});
	});
})();*/

/* 10. Packery init */
(function() {
	$(window).on('load', function(){
		var filterItem = $('.filter__item');
		var filterItemAll = $('.filter__item[data-filter="*"]');
		var filterActiveClass = 'filter__item--active';

		var $grid = $('.__js_projects-grid');
		$grid.imagesLoaded(function() {
		$grid.isotope({
			itemSelector: '.__js_masonry-item',
      		percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
		});

		var $grid2 = $('.__js_news-grid');
		$grid2.imagesLoaded(function() {
		$grid2.isotope({
			itemSelector: '.__js_masonry-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
		});

		var $grid3 = $('.__js_images-grid');
		$grid3.imagesLoaded(function() {
		$grid3.isotope({
			itemSelector: '.__js_masonry-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
		});

		$(document).on('lazyloaded', function(e){
			$grid.isotope( 'reloadItems' ).isotope();
			$grid2.isotope( 'reloadItems' ).isotope();
			$grid3.isotope( 'reloadItems' ).isotope();
		});

		setTimeout(function () {
			var $grid4 = $('.masonry');
			$grid4.imagesLoaded(function() {
			$grid4.isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery'
			});
			});

			$(document).on('lazyloaded', function(e){
				$grid4.isotope( 'reloadItems' ).isotope();
			});
		}, 100);

		filterItem.on('click', function() {
			var filterValue = $(this).attr('data-filter');

			$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
			$grid.isotope({ filter: filterValue });
			$grid2.isotope({ filter: filterValue });

			if ($('.__js_news-list-filter') && $('.__js_news-list-filter').length > 0) {
				var destination = $('.__js_news-list-filter').offset().top - 200;

				$('html').animate({ scrollTop: destination }, 1100); //1100 - скорость
			}
		});
	});
})();

/* 11. Pagepiling */
(function(){
	initFullPage();

	if ($('#pagepiling .section.active').hasClass('dark')) {
		setDark();
	}

	function initFullPage() {
		if ($('#pagepiling') && $('#pagepiling').length > 0) {
			var loop_bottom = $('#pagepiling').attr('data-loop');
			$('#pagepiling').pagepiling({
				scrollingSpeed: 280,
				touchSensitivity: 10,
				loopBottom: loop_bottom,
				afterLoad: function (anchorLink, index) {
					var current = $('#pagepiling .section.active');

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}

					if (current.hasClass('__js_bg')) {
						$('.header').addClass('header--bg');
						$('.footer').addClass('footer--bg');
					} else {
						$('.header').removeClass('header--bg');
						$('.footer').removeClass('footer--bg');
					}
					$('.fp-table.active .aos-init').addClass('aos-animate');

					if($(window).width() < 768) {
						$('.parallax').animate({scrollTop: 40}, 200);
					}

				}
			});
			$( ".elementor-widget-larson-hero-parallax #pagepiling .parallax" ).each(function() {
				var attr_d = $(this).attr('data-dimg');
				var attr_m = $(this).attr('data-mimg');
				if($(window).width() < 768) {
					if(attr_m != 0) {
						$(this).css({'background-image' : 'url('+attr_m+')'});
					}
					else {
						$(this).css({'background-image' : 'url('+attr_d+')'});
					}
				} else {
					if(attr_d != 0) {
						$(this).css({'background-image' : 'url('+attr_d+')'});
					}
				}
			});
		}
	}

	function setDark() {
		$('.webpage').addClass('webpage--parallax-dark');
	}

	function removeDark() {
		$('.webpage').removeClass('webpage--parallax-dark');
	}


    //$.fn.pagepiling.setAllowScrolling(false, 'left, right');


})();

/* 13. Fixed footer */
(function() {

	$(window).on('load', function() {
		var footer = $('.__js_fixed-footer');
		var footerParent = footer.parent();
		var footerHeight = footer.innerHeight();

		if(footer.length !== 0) {
			if (footerHeight <= $(window).height()) {
				var leftValue = footerParent.css('padding-left');
				footer.css({ 'position': 'fixed', 'left': leftValue, 'right': '0', 'bottom': '0'});
				body.css('padding-bottom', footerHeight);
			} else {
				body.css('padding-bottom', '0');
				footer.removeAttr('style')
			}

			$(window).on('resize', function() {
				footerHeight = footer.innerHeight();

				if (footerHeight <= $(window).height()) {
					leftValue = footerParent.css('padding-left');
					footer.css({ 'position': 'fixed', 'left': leftValue, 'right': '0', 'bottom': '0'});
					body.css('padding-bottom', footerHeight);
				} else {
					body.css('padding-bottom', '0');
					footer.removeAttr('style');
				}
			});
		}
	});
})();

/* 14. Parallax slider */
(function(){
	var mainSliderParallaxSelector = '.__js_slider-parallax', interleaveOffset = 0.5;
	var mainSliderParallaxOptions = {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		speed: 1000,
		autoplay: false,
		grabCursor: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.slider-parallax__nav-btn--next',
			prevEl: '.slider-parallax__nav-btn--prev',
		},
		on: {
			progress: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress,
						innerOffset = swiper.width * interleaveOffset,
						innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector('.slide').style.transform = 'translateX(' + innerTranslate + 'px)';
				}
			},
			touchStart: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = '';
				}
			},
			setTransition: function(swiper, speed) {
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + 'ms';
					swiper.slides[i].querySelector('.slide').style.transition = speed + 'ms';

				}
			}
		}
	};
	var mainSliderParallax = new Swiper(mainSliderParallaxSelector, mainSliderParallaxOptions);
	$( ".__js_slider-parallax .swiper-slide .slide" ).each(function() {
		var img_d = $(this).attr('data-dimg');
		var img_m = $(this).attr('data-mimg');
		if($(window).width() < 768) {
			if(img_m != 0) {
				$(this).css({'background-image' : 'url('+img_m+')'});
			}
			else {
				$(this).css({'background-image' : 'url('+img_d+')'});
			}
		} else {
			if(img_d != 0) {
				$(this).css({'background-image' : 'url('+img_d+')'});
			}
		}
	});
})();

/* 15. Home grid background */
(function () {
	var cards = $('.__js_home-grid-card');
	var bgContainer = $('.__js_projects-grid-bg');

	cards.each(function(index){
		var bg = $(this).attr('data-bg');
		var flag = index === 0 ? true : false;
		bgContainer.append(setBgItem(bg, flag));

		$(this).on('mouseover focus', function() {
			cards.removeClass('card--active');
			$(this).addClass('card--active');
			$('.projects-grid__bg-item').removeClass('active').eq(index).addClass('active');
		})
	});

	function setBgItem(url, isActive) {
		var bgItem = $('<div class="projects-grid__bg-item" style="background-image: url(' + url + ')"></div>');

		if (isActive) {
			bgItem.addClass('active')
		}
		return bgItem;
	}


})();

/* 16. Custom */
(function () {

	if ( $('.elementor-section-wrap').length ) {
		var f_sec = $('.elementor-section-wrap').find('> section:first');
		if ( f_sec.find('.hero').length ) {
			$('.header').addClass('header--half __js_no-static');
		}
 	}

 	if ( $('.video-section--fixed').length ) {
 		var video_section = $('.video-section');
 		var video_section_html = video_section.parent().html();

 		video_section.closest('.elementor-section').remove();
 		$('.container-page').prepend(video_section_html);
 	}

 	/* popup video */
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		preloader: false,
		fixedContentPos: false,
		mainClass: 'popup-box',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});

	/* 
		X Icon
	*/
	if($('.social__link .fab.fa-twitter').length){
		$('.social__link .fab.fa-twitter').addClass('x-icon');
		$('.social__link .fab.fa-twitter').append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
	}
	if($('.social__link .fa.fa-twitter').length){
		$('.social__link .fa.fa-twitter').addClass('x-icon');
		$('.social__link .fa.fa-twitter').append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
	}

})();

} )( jQuery );
