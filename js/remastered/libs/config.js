"use strict";

$(function () {

	$(document).on('click', '.config__menu a', toggleConfigItem);


	$('.config').each(function () {
		let
			index = 0,
			$this = $(this),
			$activeToggle = $this.find('.config__menu a.active'),
			$items = $this.find('.config__item');

		if ($activeToggle.length) {
			index = $activeToggle.parent().index();
		}

		if (index === 0) {
			$("#extendFilterCategory a:first").addClass('active');
		}

		$items
			.hide()
			.eq(index)
			.show();
	});


	function toggleConfigItem() {
		let
			$this = $(this),
			$config = $this.parents('.config'),
			$items = $config.find('.config__item'),
			index = $this.parent().index();

		$items
			.hide()
			.eq(index)
			.show();

		$config.find('.config__menu a').removeClass('active');
		$this.addClass('active');

		return false;
	}
});
