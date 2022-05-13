"use strict";

$(function () {

	window.is = window.is || {};


	is.object = function (value) {
		return value && typeof value === 'object' && value.constructor === Object;
	};

});
