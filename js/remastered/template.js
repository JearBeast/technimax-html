$(function () {

	//submenu
	var obj = null;
	var timeout = null;
	$('.header__nav3>li,.header__nav1>li,.header__nav5>li').hover(function () {
		clearTimeout(timeout);
		$('.header__nav3__submenu, .header__nav5__submenu, .header__nav1__submenu, .header__nav3__dropcart').removeClass('d-lg-block');

		obj = $(this).find('.header__nav3__submenu, .header__nav5__submenu, .header__nav1__submenu, .header__nav3__dropcart');
		obj.addClass('d-lg-block');
	}, function () {
		if (!$(this).parent().hasClass('header__nav5')) {
			timeout = setTimeout(function () {
				obj.removeClass('d-lg-block');
			}, 800);
		} else {
			obj.removeClass('d-lg-block');
		}
	});
	//submenu

	$('.advantages').not('.advantages--4').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.advantages--4').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.products__slick').not('.products__slick--4').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	var slickInit = function () {
		$('.products__slick--4').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			adaptiveHeight: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 450,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	};

	slickInit();

	//button__dropdown__opener
	var obj2 = null;
	var timeout2 = null;
	$(document).on('click', '.button__dropdown__opener, .button--settings', function () {
		$('.button__dropdown__open, .button__dropdown__open2').addClass('d-none');
		clearTimeout(timeout2);
		obj2 = $(this).parents('.button__dropdown').find('.button__dropdown__open').toggleClass('d-none');
		return false;
	});

	$(document).on('mouseover', '.button__dropdown__opener2', function () {
		$(this).parent().find('.button__dropdown__open2').removeClass('d-none');
	});

	$(window).on('click', function () {
		$('.button__dropdown__open, .button__dropdown__open2').addClass('d-none');
	});
	//button__dropdown__opener

	//tabs__mobilheader
	$('.tabs__mobilheader').click(function () {
		$(this).parent().find('.tabs__header').slideToggle();
	});
	$('.tabsSlick__mobilheader').click(function () {
		$(this).parent().find('.tabsSlick__slick').slideToggle();
	});

	$(window).resize(function () {
		if ($(window).width() > 767) {
			$('.tabs__header').not('.tabs__header--nocollapse').show();
		} else {
			$('.tabs__header').not('.tabs__header--nocollapse').hide();
		}
	}).resize();
	//tabs__mobilheader

	//detail__cart__minus
	$('.detail__cart__minus').click(function () {
		var currentAmount = parseInt($(this).parent().find('input').val());
		var newAmount = currentAmount - 1;
		if (newAmount == 0) newAmount = 1;
		$(this).parent().find('input').val(newAmount);
		$(this).parent().find('input').change();
	});
	//detail__cart__minus

	//detail__cart__plus
	$('.detail__cart__plus').click(function () {
		var currentAmount = parseInt($(this).parent().find('input').val());
		var newAmount = currentAmount + 1;

		var input = $(this).parent().find('input');
		var max = input.attr('max');
		if (typeof max !== typeof undefined && max !== false) {
			if (newAmount > max) {
				newAmount = max;
			}
		}

		$(this).parent().find('input').val(newAmount);
		$(this).parent().find('input').change();
	});
	//detail__cart__plus

	//detail__mainGallery
	$('.detail__mainGallery').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	//detail__mainGallery

	$('.magnific:not(.slick-cloned)').magnificPopup({
	    type: 'image',
	    gallery:{enabled:true}
	});

	$('.magnific-side').magnificPopup({
		type: 'image',
		gallery:{enabled:true}
	});

	$('.magnific-video').magnificPopup({
		type: 'iframe',
		gallery:{enabled:true}
	});

	// $(".table--sortable").stupidtable();

	$('.tabs').each(function () {
		var obj = $(this);

		var aktivniZalozka = $(this).find('.tabs__header .tabs__header__item--active').index();
		if (aktivniZalozka == -1) aktivniZalozka = 1;

		$(this).find('.tabs__header .tabs__header__item').removeClass('tabs__header__item--active');
		$(this).find('.tabs__body .tabs__body__item').hide();

		$(this).find('.tabs__header .tabs__header__item').eq(aktivniZalozka).addClass('tabs__header__item--active');
		$(this).find('.tabs__body .tabs__body__item').eq(aktivniZalozka).show();

		$('.products__slick--4').slick('setPosition', 0);

		$(this).find('.tabs__header .tabs__header__item').click(function () {
			aktivniZalozka = $(this).index();

			obj.find('.tabs__header .tabs__header__item').removeClass('tabs__header__item--active');
			obj.find('.tabs__body .tabs__body__item').hide();

			obj.find('.tabs__header .tabs__header__item').eq(aktivniZalozka).addClass('tabs__header__item--active');
			obj.find('.tabs__body .tabs__body__item').eq(aktivniZalozka).show();

			$('.products__slick--4').slick('setPosition', 0);
		});
	});

	$('.modal__tabs').each(function () {
		var obj = $(this);

		var aktivniZalozka = $(this).find('.modal__tabs__header a.active').index();
		if (aktivniZalozka == -1) aktivniZalozka = 1;

		$(this).find('.modal__tabs__header a').removeClass('active');
		$(this).find('.modal__tabs__body .modal__tabs__item').hide();

		$(this).find('.modal__tabs__header a').eq(aktivniZalozka).addClass('active');
		$(this).find('.modal__tabs__body .modal__tabs__item').eq(aktivniZalozka).show();

		$(this).find('.modal__tabs__header a').click(function () {
			aktivniZalozka = $(this).index();

			obj.find('.modal__tabs__header a').removeClass('active');
			obj.find('.modal__tabs__body .modal__tabs__item').hide();

			obj.find('.modal__tabs__header a').eq(aktivniZalozka).addClass('active');
			obj.find('.modal__tabs__body .modal__tabs__item').eq(aktivniZalozka).show();
		});
	});

	$('[data-toggle="tooltip"]').tooltip();

	$('.parameters').each(function () {
		if ($(this).find('.parameters__title').hasClass('parameters__title--open')) {
			$(this).find('.parameters__hidden').show();
		} else {
			$(this).find('.parameters__hidden').hide();
		}

		$(this).find('.parameters__title').click(function () {
			if ($(this).hasClass('parameters__title--open')) {
				$(this).parent().find('.parameters__hidden').slideUp();
				$(this).removeClass('parameters__title--open');
			} else {
				$(this).parent().find('.parameters__hidden').slideDown();
				$(this).addClass('parameters__title--open');
			}
		})
	});

	// [!!!] OLD .config SCRIPT - DO NOT USE IT!
	// [!!!] Use 'js/remastered/libs/config.js' instead!
	//
	// $('.config').each(function () {
	// 	var index = 0;
	// 	var obj = $(this);
	//
	// 	if ($(this).find('.config__menu a.active').length > 0) {
	// 		index = $(this).find('.config__menu a.active').parent().index();
	// 	}
	//
	// 	$(this).find('.config__item').hide();
	// 	$(this).find('.config__item').eq(index).show();
	//
	// 	$(this).find('.config__menu a').click(function () {
	// 		index = $(this).parent().index();
	//
	// 		obj.find('.config__item').hide();
	// 		obj.find('.config__item').eq(index).show();
	//
	// 		obj.find('.config__menu a').removeClass('active');
	// 		$(this).addClass('active');
	//
	// 		return false;
	// 	});
	// });


	// $('#allConfigItems').click(function () {
	// 	$('.config__item').show();
	// 	$('.config__menu a').addClass('active');
	// 	$(this).addClass('button--checked');
	// });


	// $('.collapse').each(function(){
	//     var obj = $(this);
	//
	//     $(this).find('>.collapse__item>.collapse__title').each(function(){
	//        if(!$(this).hasClass('collapse__title--open'))
	//        {
	//            $(this).parent().find('>.collapse__body').hide();
	//        }
	//        else
	//        {
	//            $(this).parent().find('>.collapse__body').show();
	//        }
	//
	//        $(this).click(function(){
	//            if(!$(this).hasClass('collapse__title--open'))
	//            {
	//                $(this).parent().find('>.collapse__body').show();
	//                $(this).addClass('collapse__title--open');
	//            }
	//            else
	//            {
	//                $(this).parent().find('>.collapse__body').hide();
	//                $(this).removeClass('collapse__title--open');
	//            }
	//        });
	//     });
	// });

	if ($.isFunction($.fn.selectric)) {
		$('.selectric').selectric();
	}

	$('.jsButtonConfig').click(function () {
		$(this).parent().find('.config').removeClass('d-none');
		$(this).hide();
	});

	$('.jsButtonConfigClose').click(function () {
		$(this).parent().parent().find('.jsButtonConfig').show();
		$(this).parent().addClass('d-none');
	});

	$(window).resize(function () {
		$('.tabsSlick__slick').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			variableWidth: true,
			prevArrow: '<span class="icon-arrow-right slick-prev"></span>',
			nextArrow: '<span class="icon-arrow-right slick-next"></span>',
			responsive: [
				{
					breakpoint: 768,
					settings: "unslick"
				}
			]
		});
	}).resize();

	$('.slickVideo').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	$('.modal__mainGallery').slick({
		slidesToShow: 1,
		slidesToScroll: 1
	});


	$(".info-pop").on("click", function() {
		$("#infomodal .modal-title").html($(this).attr('data-title'));
		$("#infomodal .modal-body").html($(this).attr('data-body'));
		$('#infomodal').modal('show');
	});


	// $(".rateYo").rateYo({
	//     starWidth: "32px",
	//     normalFill: "#cccccc",
	//     ratedFill: "#f3a612",
	//     halfStar: true,
	//     spacing: "3px"
	// });

	// $('.header__search').click(function () {
	// 	$('.header__search__results').removeClass('d-none');
	// });

	$('tr.collapsed').click(function () {
		var index = $(this).data('for');
		$('tr[data-open="' + index + '"]').toggleClass('d-none');
		$(this).toggleClass('collapsed--open');
	});

	$('.collapsed').each(function () {
		if (!$(this).hasClass('collapsed--open')) {
			var index = $(this).data('for');
			$('tr[data-open="' + index + '"]').addClass('d-none');
		} else {
			var index = $(this).data('for');
			$('tr[data-open="' + index + '"]').removeClass('d-none');
		}
	});

	$(document).on('change', '.form__file', function (e) {
		var $filenameEl = $(this.nextElementSibling);

		var filename = this.files && this.files.length > 1
			? (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length)
			: e.target.value.split('\\').pop();

		if (filename) {
			$filenameEl.text(filename);

			return;
		}

		var caption = $(this).data('caption');

		if (caption && caption.length) {
			$filenameEl.text(caption);

			return;
		}

		$filenameEl.text('-');
	});

	$('.products__slick').hover(function () {
		$('.products__slick').css('z-index', 1);
		$(this).css('z-index', 1000);
	});

	$('.header__mobilsearch').click(function () {
		$('.header__search').toggleClass('d-none');
		$('#searchInput').focus();
		return false;
	});

	$('.header__menu').click(function () {
		$('.header__nav5')
			.toggleClass('d-none')
			.toggleClass('d-flex');
	});

	$('.header__menu2').click(function () {
		$('.header__menu2List').toggle();
	});

	$('.jsButtonVice').click(function () {
		$('.text--max').toggleClass('text--max--open');
		if ($('.text--max').hasClass('text--max--open')) {
			$(this).html($(this).attr('data-less'));
		} else {
			$(this).html($(this).attr('data-more'));
		}
	});

});
