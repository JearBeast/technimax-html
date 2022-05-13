(function($, undefined) {

$.nette.ext('nprogress', {
	start: function () {
		this.counter++;
		if (this.counter === 1) {
			NProgress.start();
		}
	},
	complete: function () {
		this.counter--;
		if (this.counter <= 0) {
			NProgress.done();
			NProgress.remove();
		}
	}
}, {
	counter: 0
});

})(jQuery);
