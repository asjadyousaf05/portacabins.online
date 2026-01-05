(function ($) {
	"use strict";

	/* Init Elementor Front Scripts */
	$(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', function( $scope ) {
			var editorActive = $('body').hasClass('elementor-editor-active');
			if( editorActive ) {
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
			}
		} );
	});
})(jQuery);