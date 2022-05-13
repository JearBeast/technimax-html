$(function () {

	let app = window.app || {};
	app.dt = app.dt || {};

	app.dt.i18n_sources = {
		'cs': 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Czech.json',
		'sk': 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Slovak.json',
		'hu': 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Hungarian.json',
		'ro': 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Romanian.json',
	};

	$.fn.dataTable.ext.order.intl();
	$.fn.dataTable.moment('d. M. YYYY');

	window.app = app;

});
