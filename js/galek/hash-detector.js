/**
 * The MIT License
 *
 * Copyright 2016 Galek.
 */

/**
 * @param {type} options
 * @param {function} callback
 * @returns {undefined}
 */

$.fn.hashDetector = function (options, callback) {
	var settings = $.fn.extend(
		{
			name : 'foto',
			detect: '#gallery',
			hashType: '.',
			event: 'addClass',
			eventParam: 'active',
			eventOtherParam: '',
			hashById: false,
			changedHash: false,
			showhide: false
		},
		options
	);

	var hash = window.location.hash;

	var search = hash.replace('#', '');
	var object = $(this);
	var objectID = "#" + object.attr('id');

	var pattern = settings.name + '-';
	var name = '';

	if (search.match(pattern)) {
		if($(objectID + " " + settings.detect + '' + name).length > 0) {
		   name = '.' + search.replace(pattern, '');
		   name = name.replace('%20', '');
		}
	}

	if (settings.hashById === true) {
		if (hash === settings.detect) {
			if ($(objectID + " " + settings.detect).length > 0) {
				if (typeof callback === 'function') {
					callback.call(this);
				}
			}
		}
	} else {
		switch (settings.event) {
			case 'addClass':
				if (name !== '' && $(objectID + " " + settings.detect + '' + name).length > 0) {
					$(objectID + " " + settings.detect + '.' + settings.name).removeClass(settings.eventParam);
					$(objectID + " " + settings.detect + '' + name).addClass(settings.eventParam);
					if (settings.showhide) {
						$(objectID + " " + settings.detect).hide();
						$(objectID + " " + settings.detect + '' + name).show();
					}
					if (typeof callback === 'function') {
						callback.call(this);
					}
				}
			break;
		}
	}

	return name;
};
