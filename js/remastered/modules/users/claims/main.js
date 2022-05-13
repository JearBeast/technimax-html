$(function () {

	let
		$table = $('#datatable--list'),
		locale = $table.data('locale'),
		rowCount = $table.find('.datable__row').length,
		paging = false;

	if (rowCount > 10) {
		paging = true;
	}

	let datatableSettings = {
		columnDefs: [
			{targets: [0, 4, 5, 6], type: 'num'},
			{targets: [1], orderData: [1, 0]},
			{targets: [2], orderData: [2, 0]},
			{targets: [3], orderData: [3, 0]},
			{targets: [4], orderData: [4, 0]},
			{targets: [5], orderData: [5, 0]},
		],
		columns: [
			{orderable: true},
			{orderable: true},
			{orderable: true},
			{orderable: true},
			{orderable: true},
			{orderable: true},
			{orderable: true},
			{orderable: false},
		],
		order: [
			[0, "desc"],
		],
		responsive: true,
		paging: paging,
		lengthChange: false,
		pagingType: "simple_numbers",
		language: {
			url: window.app.dt.i18n_sources[locale],
			decimal: ",",
			thousands: " "
		},
	};

	$table.DataTable(datatableSettings);

});
