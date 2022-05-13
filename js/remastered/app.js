"use strict";

$(function () {

	$.nette.init();


	LiveForm.setOptions({
		showMessageClassOnParent: false,
		controlErrorClass: 'form__input--error',
		controlValidClass: 'form__input--valid',
		messageErrorClass: 'form__error text-right',
		messageTag: 'div',
		messageErrorPrefix: ''
	});


	$(document).on('click', '#eu-cookies__button', function () {
		let date = new Date();
		date.setFullYear(date.getFullYear() + 10);
		document.cookie = 'eu-cookies=1; path=/; expires=' + date.toUTCString();
		$('#eu-cookies').hide();
	});


	$(document).on('click', 'button.notification__close-button', function () {
		$(this).parents('.notification').remove();
	});


	$(document).on('click', '.buy .buyAjax', function () {
		var buyId = $(this).attr('data-buy');
		var buyCount = $(this).attr('data-count');
		var buyKonfigurace = $(this).attr('data-konf');
		var buyKonfiguraceAmount = $(this).attr('data-konf-amount');

		if (buyKonfigurace !== undefined) {
			var confBuyKonfigurace = buyKonfigurace.split("-");
			var confBuyKonfiguraceAmount = [];
			if (buyKonfiguraceAmount !== undefined) {
				confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
			}
			//$("html, body").animate({scrollTop: 0}, "slow");
			$.nette.ajax({
				'url': '?do=addToBasketKonfigurace',
				'data': {
					id: buyId,
					count: buyCount,
					konf: confBuyKonfigurace,
					konfamounts: confBuyKonfiguraceAmount
				}
			}).done(function () {
				/*$("#basketContent").removeClass('d-none');
				setTimeout(function () {
					$("#basketContent").addClass('d-none');
				}, 3000);*/
			});
		} else {
			//$("html, body").animate({scrollTop: 0}, "slow");
			$.nette.ajax({
				'url': '?do=addToBasket',
				'data': {
					id: buyId,
					count: buyCount
				}
			}).done(function () {
				/*$("#basketContent").removeClass('d-none');
				setTimeout(function () {
					$("#basketContent").addClass('d-none');
				}, 3000);*/
			});
		}
	});


	$(document).on('click', '.compare-button', function (e) {
		e.preventDefault();

		let
			$this = $(this),
			data = {'id': $this.data('rel')};

		$("html, body").animate({ scrollTop: 0 }, "slow");

		if ($this.hasClass('active')) {
			$.nette.ajax({
				url: '?do=porovnatRemove',
				data: data
			});

			$this.removeClass('active');
			$this.text($this.data('add'));

			return;
		}

		$.nette.ajax({
			url: '?do=porovnat',
			data: data
		});

		$this.addClass('active');
		$this.text($this.data('remove'));
	});


	$(document).on('click', '.favourite-button', function (e) {
		e.preventDefault();
		$("html, body").animate({scrollTop: 0}, "slow");
		var rel = $(this).attr("data-rel");
		if ($(this).hasClass('active')) {
			$(this).removeClass("active");
			$(this).text($(this).attr('data-add'));
			$.nette.ajax({
				'url': '?do=favouriteRemove',
				'data':{
					id: rel
				}
			}).done(function () {
				$("#listsContent").removeClass('d-none');
				setTimeout(function () {
					$("#listsContent").addClass('d-none');
				}, 2000);
			});
		} else {
			$(this).addClass("active");
			$(this).text($(this).attr('data-remove'));
			$.nette.ajax({
				'url': '?do=favourite',
				'data':{
					id: rel
				}
			}).done(function () {
				$("#listsContent").removeClass('d-none');
				setTimeout(function () {
					$("#listsContent").addClass('d-none');
				}, 2000);
			});
		}
	});


	$(document).on('click', '.reservationAjax', function (e) {
		e.preventDefault();
		$("html, body").animate({scrollTop: 0}, "slow");
		var buyId = $(this).attr('data-buy');
		var buyCount = $(this).attr('data-count');
		var buyKonfigurace = $(this).attr('data-konf');
		var buyKonfiguraceAmount = $(this).attr('data-konf-amount');

		if (buyKonfigurace !== undefined) {
			var confBuyKonfigurace = buyKonfigurace.split("-");
			var confBuyKonfiguraceAmount = [];
			if (buyKonfiguraceAmount !== undefined) {
				confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
			}
			$.nette.ajax({
				'url': '?do=addToReservationKonfigurace',
				'data': {
					id: buyId,
					count: buyCount,
					konf: confBuyKonfigurace,
					konfamounts: confBuyKonfiguraceAmount
				}
			}).done(function() {
				$("#listsContent").removeClass('d-none');
				setTimeout(function () {
					$("#listsContent").addClass('d-none');
				}, 2000);
			});
		} else {
			$.nette.ajax({
				'url': '?do=addToReservation',
				'data': {
					id: buyId,
					count: buyCount
				}
			}).done(function() {
				$("#listsContent").removeClass('d-none');
				setTimeout(function () {
					$("#listsContent").addClass('d-none');
				}, 2000);
			});
		}
	});


	$(document).on('click', '.offerAjax', function (e) {
		e.preventDefault();
		$("html, body").animate({scrollTop: 0}, "slow");
		var buyId = $(this).attr('data-buy');
		var buyCount = $(this).attr('data-count');
		var buyKonfigurace = $(this).attr('data-konf');
		var buyKonfiguraceAmount = $(this).attr('data-konf-amount');

		if (buyKonfigurace !== undefined) {
			var confBuyKonfigurace = buyKonfigurace.split("-");
			var confBuyKonfiguraceAmount = [];
			if (buyKonfiguraceAmount !== undefined) {
				confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
			}
			$.nette.ajax({
				'url': '?do=addToOfferKonfigurace',
				'data': {
					id: buyId,
					count: buyCount,
					konf: confBuyKonfigurace,
					konfamounts: confBuyKonfiguraceAmount
				}
			}).done(function() {
				$("#listsContent").removeClass('d-none');
				setTimeout(function () {
					$("#listsContent").addClass('d-none');
				}, 2000);
			});
		} else {
			$.nette.ajax({
				'url': '?do=addToOffer',
				'data': {
					id: buyId,
					count: buyCount
				}
			}).done(function() {
				$("#listsContent").removeClass('d-none');
				setTimeout(function () {
					$("#listsContent").addClass('d-none');
				}, 2000);
			});
		}
	});


	$(document).on('click', '.offerExistsAjax', function(e) {
		e.preventDefault();
		var buyId = $(this).attr('data-buy');
		var buyCount = $(this).attr('data-count');
		var buyKonfigurace = $(this).attr('data-konf');
		var buyKonfiguraceAmount = $(this).attr('data-konf-amount');
		var offerId = $(this).attr('data-offer-id');

		if (buyKonfigurace !== undefined) {
			var confBuyKonfigurace = buyKonfigurace.split("-");
			var confBuyKonfiguraceAmount = [];
			if (buyKonfiguraceAmount !== undefined) {
				confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
			}
			$.nette.ajax({
				'url': '?do=addToOfferExistsKonfigurace',
				'data': {
					offerid: offerId,
					productid: buyId,
					count: buyCount,
					konf: confBuyKonfigurace,
					konfamounts: confBuyKonfiguraceAmount
				}
			})
		} else {
			$.nette.ajax({
				'url': '?do=addToOfferExists',
				'data': {
					offerid: offerId,
					productid: buyId,
					count: buyCount
				}
			})
		}
	});


	$(document).on('click', '.next-button', function () {
		$('.stepContinueInput').click();
	});


	$('#frm-searchForm').on('submit', function (e) {
		let
			$input = $('#searchInput'),
			value = $input.val();

		if (value.length) {
			return;
		}

		e.preventDefault();
		$input.focus();
	});

	let request = null;
	$('#frm-searchForm input.ajax').on({
		click: function() {
			let value = $(this).val();
			dataLayer.push({'event': 'trackWhisper', 'status': 'klik', 'whisperText': value, 'whisperClickGroup': 'Input'});
			if (value.length >= 3){
				dataLayer.push({'event': 'trackWhisper', 'status': 'klik 3+', 'whisperText': value, 'whisperClickGroup': 'Input'});
				$.nette.ajax({
					'url':'?do=search',
					'data':{
						textsSearch:value
					}
				}).done(function() {
					$("#snippet--searching").addClass('d-block');
				});

			} else {
				$("#snippet--searching").removeClass('d-block');
			}
		}, keyup: function(e) {
			let value = $(this).val();
			if (e.keyCode == 13) {
				dataLayer.push({'event': 'trackWhisper', 'status': 'Submit (ENTER)', 'whisperText': value, 'whisperClickGroup': 'Input'});
				if (request != null){
					request.abort();
					request = null;
				}
			} else {
				dataLayer.push({'event': 'trackWhisper', 'status': 'writing', 'whisperText': value, 'whisperClickGroup': 'Input'});
				if (value.length>=2){
					if (request != null){
						request.abort();
						request = null;
					}
					request = $.nette.ajax({
						'url':'?do=search',
						'data':{
							textsSearch:value
						}
					}).done(function() {
						$("#snippet--searching").addClass('d-block');
					});
				} else {
					$("#snippet--searching").removeClass('d-block');
				}
			}
		}
	});


	/**
	 * Disables an <input> HTML element with 'data-loading-text' attribute
	 * and applies the text contained in this attribute
	 *
	 * @todo Disable all submit buttons of the form
	 * @todo Make it work with inputs, buttons, anchors
	 */
	$.nette.ext('buttons', {
		before: function (jqXHR, settings) {
			if (!this.isWatched(settings)) {
				return;
			}

			this.defaultValue = settings.nette.el.val();

			settings.nette.el.prop('disabled', true);
			settings.nette.el.val(settings.nette.el.data('loading-text'));
		},
		complete: function (jqXHR, status, settings) {
			if (!this.isWatched(settings)) {
				return;
			}

			settings.nette.el.prop('disabled', false);
			settings.nette.el.val(this.defaultValue);
		}
	}, {
		isWatched: function (settings) {
			return settings.nette
				&& settings.nette.el.length
				&& settings.nette.el.is('input[type="submit"]')
				&& settings.nette.el.data('loading-text');
		},
		defaultValue: null
	});

});


$(function () {

	// Extension to disable form submit buttons if form is submitted, is valid
	// and submit buttons have 'data-loading-disable' attribute

	// Generally applies to non-ajax form submits

	let forms = document.getElementsByTagName('form');

	for (let form of forms) {
		form.addEventListener('submit', onFormSubmitted, false);
	}


	function onFormSubmitted(e) {
		let form = e.target;

		if ( ! LiveFormValidationHelper.isValid(form)) {
			return;
		}

		let submitButtons = form.querySelectorAll('input[type="submit"][data-loading-disable="true"]');

		for (let submitButton of submitButtons) {
			$(submitButton).prop('disabled', true);
			$(submitButton).val($(submitButton).attr('data-loading-text'));
		}
	}

});
