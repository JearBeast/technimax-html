"use strict";

$(function () {

	if(window.location.hash) {
		let hash = window.location.hash;
		//$(hash).modal('toggle');
	}

    $(document).on('change', '#extendFilterParams input', submit);
    $(document).on('click', '.collapse__title', toggleCollapse);


	function toggleCollapse() {
		if (!$(this).hasClass('collapse__title--open')) {
			$(this).parent().find('>.collapse__body').show();
			$(this).addClass('collapse__title--open');
		} else {
			$(this).parent().find('>.collapse__body').hide();
			$(this).removeClass('collapse__title--open');
		}
	}


    // Submits the filter and applies an overlay during the ajax request
	function submit() {
		let
			$this = $(this),
			$value = $this.attr('data-value'),
			$group = $this.attr('data-group'),
			$id = $this.attr('data-id'),
			str = $('#productFilter form').serializeArray();

		let
			$modal = $('#filterModal'),
			$column = $('#extendFilterLeftColumn'),
			url = $modal.data('link-changeparam'),
			defaultColumnCssPosition = null;

		delete str[5];

		$.nette.ajax({
			url: url,
			data: {
				value: [$value],
				group: $group,
				id: $id,
				basicFilter: str
			},
			beforeSend: function () {
				defaultColumnCssPosition = $column.css('position');

				if ($modal.hasClass('show')) {
					$modal
						.find('.modal-content')
						.prepend('<div class="overlay"></div>');

					return;
				}

				$column
					.css('position', 'relative')
					.prepend('<div class="overlay"></div>');
			}
		}).always(function () {
			$modal
				.find('div.overlay')
				.remove();

			$column
				.find('div.overlay')
				.remove()
				.css('position', defaultColumnCssPosition);
		});
	}

});
