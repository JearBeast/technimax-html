$(document).ready(function(){
	var prezentace_max_to_left = $("#prezentace-inside a").length - 3;
	/*var prezentace_max_to_left = $("#prezentace-inside a").length - 3;*/
	var prezentace_click_left=0,prezentace_click_right=0;
	$("#prezentace-arrow-left").hide();
	$("#prezentace-arrow-right").on("click",function(){

		var margin = parseInt($("#prezentace-inside a").eq(1).css('margin-right'));
		var width = ($("#prezentace-inside a").eq(1).width() + margin)*3;
		if(prezentace_click_left >= prezentace_max_to_left){
			$(this).hide();
		}else{
			prezentace_click_left = prezentace_click_left + 3;
			prezentace_click_right = prezentace_click_right - 3;
			/*prezentace_click_left = prezentace_click_left + 1;
			prezentace_click_right = prezentace_click_right - 1;	*/
			$("#prezentace-inside a").animate({left: '-='+width},1000,function(){
				$("#prezentace-arrow-left").show();
				if(prezentace_click_left == prezentace_max_to_left){
					$("#prezentace-arrow-right").hide();
				}
			});
		}
	});

	$("#prezentace-arrow-left").on("click",function(){
		var margin = parseInt($("#prezentace-inside a").css('margin-right'));
		var width = ($("#prezentace-inside a").width() + margin)*3;
		/*var width = $("#prezentace-inside a").width() + margin;*/
		if(prezentace_click_left < 0){
			$(this).hide();
		}else{
			prezentace_click_right = prezentace_click_right + 3;
			prezentace_click_left = prezentace_click_left - 3;
			/*prezentace_click_right = prezentace_click_right + 1;
			prezentace_click_left = prezentace_click_left - 1;*/

			$("#prezentace-inside a").animate({left: '+='+width},1000,function(){
				$("#prezentace-arrow-right").show();
				if(prezentace_click_left == 0){
					$("#prezentace-arrow-left").hide();
				}
			});
		}
	});
});
