'use strict';

(function ($) {

	let $contentDiv = $('#insideContent');

	$contentDiv.on('click', 'tr.konfigurace .spinner span', function () {
		let amountInput = $(this).parent('.spinner').children('input');

		if ($(this).hasClass('spinner--plus')) {
			amountInput.val(parseInt(amountInput.val()) + 1);
		} else if ($(this).hasClass('spinner--minus')) {
			amountInput.val(parseInt(amountInput.val()) - 1);
		} else {
			return;
		}

		amountInput.attr('value', amountInput.val());
		sendRequest(amountInput);
	});

	$contentDiv.on('change', 'tr.konfigurace td.pocet input', function () {
		sendRequest($(this));
	});


	function sendRequest(element) {
		/**
		 * @property {object} metadata
		 * @property {string} metadata.url
		 * @property {string} metadata.idParam
		 * @property {string} metadata.amountParam
		 */
		let metadata = element.closest('tr').data('change-amount-metadata');

		if (!is.object(metadata)) {
			return;
		}

		let id = element.attr("name");
		let newAmount = element.val();

		let data = {};
		data[metadata.idParam] = id;
		data[metadata.amountParam] = newAmount;

		$.nette.ajax({
			url: metadata.url,
			data: data
		});
	}

})($);
