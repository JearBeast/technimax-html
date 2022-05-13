$(document).ready(function(){
	$("body").on("click", ".tab", function(){
		if (!$(this).hasClass('disabled')) {

            $(".tab").removeClass("active");
            $(this).addClass("active");

            $("#tabsContent .tabContent").hide();

			$("#tabsContent #" + $(this).attr("id") + "Content").fadeIn();

			window.location.hash = $(this).attr("class").replace('tab ', '').replace('active', '').replace(' ', '-').replace('%20', '').replace(' ', '');

			// bLazy.revalidate();
		}
	});

	$(".kosikTab").on("click", function() {
		$(".kosikTab").removeClass("active");
		$(this).addClass("active");

		$("#kosikTabsContents .kosikTabContent").hide();
		$("#kosikTabsContents #" + $(this).attr("id") + "Content").fadeIn();
	});

	$("a.step").on("click", function() {
		$(".kosikTab").removeClass("active");
		var getId = $(this).attr("rel");
		$("#" + getId).addClass("active");

		$("#kosikTabsContents .kosikTabContent").hide();
		$("#kosikTabsContents #" + getId + "Content").fadeIn();
	});

	$(".subtab").on("click", function() {
		if (!$(this).hasClass('disabled')) {
			$(".subtab").removeClass("active");
			$(this).addClass("active");

			$("#subtabsContent .subtabContent").hide();
			$("#subtabsContent #" + $(this).attr("id") + "Content").fadeIn();
		}
	});
});

