"use strict";

$(function () {

	window.LiveFormValidationHelper = window.LiveFormValidationHelper || {};


	/**
	 * @param {HTMLElement} form
	 * @return {boolean}
	 */
	LiveFormValidationHelper.isValid = function (form) {

		return window.Nette && Nette.validateForm && Nette.validateForm(form);

	};

});
