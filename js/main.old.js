var $body = $('body');

(function ($, dataLayer, document) {
	$body.on('click', '.dropdown .caret-container', function (e) {
		var parent = $(this).parent('.dropdown');
		if (parent.hasClass('open')) {
			parent.removeClass('open');
		} else {
			$('.dropdown').removeClass('open');
			parent.addClass('open');
		}
		e.stopPropagation();
	});

	$body.on('mouseleave', '.dropdown-menu', function () {
		if ($('.dropdown').is(":visible")) {
			$('.dropdown').removeClass('open');
		}
	});

	$(document).on('click', function (e) {
		if (!$(e.target).closest('.dropdown').length) {
			if ($('.dropdown').is(":visible")) {
				$('.dropdown').removeClass('open');
			}
		}
	});

	$(document).ready(function () {
		$body.on('click', '.info', function (e) {
			e.preventDefault();
			e.stopPropagation();

			var id2 = $(this).attr('data-rel');

			if ($(this).hasClass('flash') || id2 == 0) {
				return;
			}

			var foto2 = $(this).attr('data-foto');
			var extend = $(this).attr('data-extend');
			var shipping = $(this).attr('data-shipping');

			if (extend == '' || extend == null) {
				extend = false;
			}

			if (foto2 == '' || foto2 == null) {
				foto2 = false;
			}

			if (extend) {
				$.nette.ajax({
					'url': '?do=showParamInformation',
					'data': {
						ide: id2,
						idParam: id2
					}
				}).done(function () {
					$("#snippet--konfiguraceInfoDetail").show();
				});

				return;
			}

			var idKonf = shipping == 'true' ? 'shipping' : id2;

			$.nette.ajax({
				'url': '?do=getInfo',
				'data': {
					idKonf: idKonf,
					foto: foto2
				}
			}).done(function () {
				$("#snippet--konfiguraceInfoDetail").show();
			});
		});

		var currentUrl = window.location.href;
		var parsedUrl = $.url(currentUrl);
		var params = parsedUrl.param();

		if (params['do'] === 'showParamInformation' || params['do'] === 'getInfo') {
			$("#snippet--konfiguraceInfoDetail").show();
		}

		$body.on('click', '.info2', function (e) {
			var id2 = $(this).attr('data-rel');
			var foto2 = $(this).attr('data-foto');
			var extend = $(this).attr('data-extend');
			var shipping = $(this).attr('data-shipping');

			if (extend == '' || extend == null) {
				extend = false;
			}

			if (foto2 == '' || foto2 == null) {
				foto2 = false;
			}

			if (id2 != 0) {
				var currentUrl = window.location.href;
				var parsedUrl = $.url(currentUrl);
				var params = parsedUrl.param();
				delete params['idParam'];
				delete params['ide'];
				delete params['idKonf'];
				delete params['foto'];

				var basePath = "";
				$("#snippet--konfiguraceInfoDetail .content").html('<img src="' + basePath + '/images/loading3.gif" class="loading" alt="loading">');
				if (extend) {
					params['do'] = 'showParamInformation';
					params['ide'] = id2;
					params['idParam'] = id2;

					$.nette.ajax({
						'url': '?do=showParamInformation',
						'data': {
							ide: id2,
							idParam: id2
						}
					});
				} else {
					if (shipping == 'true') {
						params['do'] = 'getInfo';
						params['idKonf'] = 'shipping';
						params['foto'] = foto2;
						$.nette.ajax({
							'url': '?do=getInfo',
							'data': {
								idKonf: 'shipping',
								foto: foto2
							}
						});
					} else {
						params['do'] = 'getInfo';
						params['idKonf'] = id2;
						params['foto'] = foto2;
						$.nette.ajax({
							'url': '?do=getInfo',
							'data': {
								idKonf: id2,
								foto: foto2
							}
						});
					}
				}

				var newUrl = "?" + $.param(params);
				window.history.pushState(window.location.hash, '', newUrl);

				$("#snippet--konfiguraceInfoDetail").show();
			}

			e.stopPropagation();
			e.preventDefault();
		});

        var d = document;

        document.getElementById('snippet--ext_components').addEventListener('click', function(e) {
            var lp = document.getElementsByClassName('loginPopup')[0];

            var l = d.querySelectorAll('.loginPopup .block')[0];
            if (l != null) {
                var clicked1 = lp.contains(e.target);
                var clicked2 = l.contains(e.target);

                if (clicked1){
                    if (clicked2) {

                    } else {
                        lp.style.display = 'none';
                    }
                }
            }
        });

        $("#componentPopup a.clearPopup").on("click", function () {
            var $name = $(this).attr('data-name');
            $(this).parent().parent().fadeOut();
            $.nette.ajax({
                'url': '?do=cookieClose',
                'data': {
                    name: $name,
                    value: false
                }
            });
        });

        $body.on('click', "#componentPopup .popupComponentClose", function () {
            var $name = $(this).attr('data-name');
            $(this).parent().parent().fadeOut();
            $.nette.ajax({
                'url': '?do=cookieClose',
                'data': {
                    name: $name,
                    value: false
                }
            });
        });

        $body.on('click', "#databasePopUps .popupComponentClose", function () {
            var $name = $(this).attr('data-name');
            $(this).parent().parent().fadeOut();
            $.nette.ajax({
                'url': '?do=cookieClose',
                'data': {
                    name: $name,
                    value: false
                }
            });
        });

        function slideDownHeader(idContent)
        {
            $('.headerSliderContent').hide(0);

            if ($("#header").hasClass('headerSlide')) {
                if (!$("#header").is(':visible')) {
                    $("#header").slideDown(400, function() {
                        $("#" + idContent).slideDown();
                    });
                } else {
                    $("#" + idContent).slideDown();
                }
            } else {
                $("#" + idContent).slideDown();
            }
        }

        function showSlideDownHeader()
        {
            $('.headerSliderContent').hide(0);
            if ($("#header").hasClass('headerSlide')) {
                if (!$("#header").is(':visible')) {
                    $("#header").slideDown(400);
                }
            }
        }

        /** -----------------------/___Buy ajax___\-----------------------*/
        $body.on('click', '.buy .buyAjax', function() {
            var buyId = $(this).attr('data-buy');
            var buyCount = $(this).attr('data-count');
            var buyKonfigurace = $(this).attr('data-konf');
            var buyKonfiguraceAmount = $(this).attr('data-konf-amount');

            if (buyKonfigurace !== undefined) {
                var confBuyKonfigurace = buyKonfigurace.split("-");
                var confBuyKonfiguraceAmount = [];
                if (buyKonfiguraceAmount !== undefined) {
                    confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
                }
                $.nette.ajax({
                    'url': '?do=addToBasketKonfigurace',
                    'data': {
                        id: buyId,
                        count: buyCount,
                        konf: confBuyKonfigurace,
                        konfamounts: confBuyKonfiguraceAmount
                    }
                }).done(function(){
                    slideDownHeader('basketContent');
                });
            } else {
                var data = {
                    id: buyId,
                    count: buyCount
                }
                $.nette.ajax({
                    'url': '?do=addToBasket',
                    'data': {
                        id: buyId,
                        count: buyCount
                    }
                }).done(function(){
                    slideDownHeader('basketContent');
                });
            }
        });


        /** -----------------------/___Offer ajax___\-----------------------*/
	        $body.on('click', '.offerAjax', function() {
	            var buyId = $(this).attr('data-buy');
	            var buyCount = $(this).attr('data-count');
	            var buyKonfigurace = $(this).attr('data-konf');
                var buyKonfiguraceAmount = $(this).attr('data-konf-amount');

	            if (buyKonfigurace !== undefined) {
	                var confBuyKonfigurace = buyKonfigurace.split("-");
                    var confBuyKonfiguraceAmount = [];
                    if (buyKonfiguraceAmount !== undefined) {
                        confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
                    }

                    $.nette.ajax({
	                    'url': '?do=addToOfferKonfigurace',
	                    'data': {
	                        id: buyId,
	                        count: buyCount,
	                        konf: confBuyKonfigurace,
                            konfamounts: confBuyKonfiguraceAmount
	                    }
	                }).done(function() {
                        slideDownHeader('offerContent');

	                });
	            } else {
	                var data = {
	                    id: buyId,
	                    count: buyCount
	                }
                    $.nette.ajax({
	                    'url': '?do=addToOffer',
	                    'data': {
	                        id: buyId,
	                        count: buyCount
	                    }
	                }).done(function() {
                        slideDownHeader('offerContent');
	                });
	            }
	        });

	        /** -----------------------/___Offer Exists ajax___\-----------------------*/
		        $body.on('click', '.offerExistsAjax', function() {
		            var buyId = $(this).attr('data-buy');
		            var buyCount = $(this).attr('data-count');
		            var buyKonfigurace = $(this).attr('data-konf');
                    var buyKonfiguraceAmount = $(this).attr('data-konf-amount');
		            var offerId = $(this).attr('data-offer-id');

		            if (buyKonfigurace !== undefined) {
		                var confBuyKonfigurace = buyKonfigurace.split("-");
                        var confBuyKonfiguraceAmount = [];
                        if (buyKonfiguraceAmount !== undefined) {
                            confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
                        }
                        $.nette.ajax({
		                    'url': '?do=addToOfferExistsKonfigurace',
		                    'data': {
								offerid: offerId,
		                        productid: buyId,
		                        count: buyCount,
		                        konf: confBuyKonfigurace,
                                konfamounts: confBuyKonfiguraceAmount
		                    }
		                }).done(function() {
                            //showSlideDownHeader();
		                });
		            } else {
		                var data = {
		                    id: buyId,
		                    count: buyCount
		                }
                        $.nette.ajax({
		                    'url': '?do=addToOfferExists',
		                    'data': {
								offerid: offerId,
		                        productid: buyId,
		                        count: buyCount
		                    }
		                }).done(function(){
		                    //showSlideDownHeader();
		                });
		            }
		        });


	        /** -----------------------/___Reservation ajax___\-----------------------*/
	        $body.on('click', '.reservationAjax', function() {
	            var buyId = $(this).attr('data-buy');
	            var buyCount = $(this).attr('data-count');
	            var buyKonfigurace = $(this).attr('data-konf');
                var buyKonfiguraceAmount = $(this).attr('data-konf-amount');

	            if (buyKonfigurace !== undefined) {
	                var confBuyKonfigurace = buyKonfigurace.split("-");
                    var confBuyKonfiguraceAmount = [];
                    if (buyKonfiguraceAmount !== undefined) {
                        confBuyKonfiguraceAmount = buyKonfiguraceAmount.split("-");
                    }


                    //$.nette.ajax()
                    //$.ajax({
                    $.nette.ajax({
	                    'url': '?do=addToReservationKonfigurace',
	                    'data': {
	                        id: buyId,
	                        count: buyCount,
	                        konf: confBuyKonfigurace,
                            konfamounts: confBuyKonfiguraceAmount
	                    }
	                }).done(function() {
                        slideDownHeader('reservationContent');
	                });
	            } else {
	                var data = {
	                    id: buyId,
	                    count: buyCount
	                }
                    //$.ajax({
	                $.nette.ajax({
	                    'url': '?do=addToReservation',
	                    'data': data
	                }).done(function() {
                        slideDownHeader('reservationContent');
	                });
	            }
	        });

        /*----------------
                Compare
                    -----------------*/
        $body.on('click', ".compare", function() {
            showSlideDownHeader();
            var rel = $(this).attr("data-rel");
            var image = $(this).parent('.product').children('.image').children('img');
            if ($(this).hasClass('active')) {
                $(this).removeClass("active");
                $(this).parent('.compare').removeClass("active");
                $(this).children('.compare').removeClass("active");
                $.nette.ajax({
                    'url': '?do=porovnatRemove',
                    'data':{
                        id: rel
                    }
                });
            } else {
                $(this).addClass("active");
                $(this).parent('.compare').addClass("active");
                $(this).children('.compare').addClass("active");
                $.nette.ajax({
                    'url': '?do=porovnat',
                    'data':{
                        id: rel
                    }
                });
                var toPosition = $('#snippet--porovnat').offset();
                $('#snippet--porovnat').css({ left: toPosition.left});
                var fromPosition = image.parent('a').offset();
                var imageClone = image.clone().addClass('cloneTipyImage').appendTo('body').css({'position':'absolute','top':fromPosition.top,'left':fromPosition.left,'height':image.height(),'width':image.width(),'z-index':99999999999999});
                var calculate = parseInt(image.height()) / 2;
                var calcGoToTop = toPosition.top - fromPosition.top;
                var calcGoToLeft = toPosition.left - fromPosition.left;
                imageClone.animate({ left: '+='+calcGoToLeft, top: '+='+calcGoToTop, opacity: '-=0.4', height: '-='+calculate, width: '-='+calculate}, 1000, function() {
                    $(this).remove();
                    var poz = $('#snippet--porovnat').offset();
                });
            }
        });
    		/*----------------
            Favourite
                -----------------*/
        $body.on('click', ".favourite", function() {
            showSlideDownHeader();
            var rel = $(this).attr("data-rel");
            var image = $(this).parent('.product').children('.image').children('img');
            if ($(this).hasClass('active')) {
                $(this).removeClass("active");
                $(this).parent('.favourite').removeClass("active");
                $(this).children('.favourite').removeClass("active");
                $.nette.ajax({
                    'url': '?do=favouriteRemove',
                    'data':{
                        id: rel
                    }
                });
            } else {
                $(this).addClass("active");
                $(this).parent('.favourite').addClass("active");
                $(this).children('.favourite').addClass("active");
                $.nette.ajax({
                    'url': '?do=favourite',
                    'data':{
                        id: rel
                    }
                });
                var toPosition = $('#snippet--favourite').offset();
                $('#snippet--favourite').css({ left: toPosition.left});
                var fromPosition = image.offset();
                var imageClone = image.clone().addClass('cloneTipyImage').appendTo('body').css({'position':'absolute', 'top':fromPosition.top, 'left':fromPosition.left, 'height':image.height(), 'width':image.width(), 'z-index':99999999999999});
                var calculate = parseInt(image.height()) / 2;
                var calcGoToTop = toPosition.top - fromPosition.top;
                var calcGoToLeft = toPosition.left - fromPosition.left;
                imageClone.animate({ left: '+='+calcGoToLeft, top: '+='+calcGoToTop, opacity: '-=0.4', height: '-='+calculate, width: '-='+calculate}, 1000, function() {
                    $(this).remove();
                    var poz = $('#snippet--favourite').offset();
                });
            }
        });
    });

    $("body").on('click', "a.ajax", function (event) {
        event.preventDefault();
        $.get(this.href);
    });

    $("body").on('click', 'form.ajax', function (e) {
		if ($(e.target).is('a[target="_blank"]')) {
			return;
		}

       $(this).ajaxSubmit();
       return false;
    });

    $("body").on('click', 'form.ajax :submit', function () {
        $(this).ajaxSubmit();
        return false;
    });

    $("body").on('click', 'form button.ajax', function () {
        $(this).ajaxSubmit();
        return false;
    });


    function FlashMessagesTimer() {
        setTimeout(CheckFlashMessagesTimer, 3000);
    }
    function CheckFlashMessagesTimer() {
      	$(".flash").fadeOut(9000);
      	FlashMessagesTimer();
    }
    FlashMessagesTimer();

  	if ($(".vice").length > 0) {
  	     $(".poznamka").append("<div class='showmore'><a>Zobrazit více</a></div>");
    }
  	if ($(".more").length > 0) {
  	     $(".showmore a").removeAttr("href").text('Zobrazit více');
    }
    $('.poznamka').on('click', ".showmore", function () {
        if (!$(this).hasClass('hideMore')) {
            $(this).find('a').text('Skrýt');
            $(this).find('a').parent().parent().children(".more").toggle(100);
            $(this).find('a').parent().parent().children(".vice").toggle('slow');
            $(this).addClass('hideMore');
        } else {
            $(this).find('a').text('Zobrazit více');
            $(this).find('a').parent().parent().children(".more").toggle(100);
            $(this).find('a').parent().parent().children(".vice").toggle('slow');
            $(this).removeClass('hideMore');
        }
    });

    $body.on('mouseenter',"#basketInner", function () {
           $("#basketContent").show();
    });
    $body.on('mouseenter',"#basketContent", function() {
           $("#basketContent").show();
    });

   $body.on('mouseleave',"#basketInner", function() {
        $("#basketContent").hide();
   });
   $body.on('mouseleave',"#basketContent", function() {
        $("#basketContent").hide();
   });

   $body.on('mouseenter', '#favComList .intBut', function() {
        $(this).parent().children(".basketContent").show();
   });

   $body.on('mouseenter', '.basketContent', function() {
        $(this).show();
   });

   $body.on('mouseleave', '.basketContent', function() {
        $(this).hide();
   });

   $body.on('mouseleave', '#favComList .intBut', function() {
        $(this).parent().children(".basketContent").hide();
   });

   var slideStart = 0;
   var maxSlides = $("#slider .sliding").length;
   var slides = [];
   for (var i = 0; i < maxSlides; i += 1) {
        slides[i] = $("#slider").children('.sliding').eq(i);
   }
   function sliderTimer() {
        slideStart = slideStart + 1;
        setTimeout(function () {
            var curSlide = slideStart;
            if (curSlide === maxSlides) {
                curSlide = 0;
                slideStart = 0;
            }
            $(".sliding").removeClass("show").addClass("hide").hide();
            $("#slider").children('.sliding').eq(curSlide).removeClass("hide").addClass("show").fadeIn(800);
            $(".clickSlides").removeClass("active");
            $('#sliderControl').children('.clickSlides').eq(curSlide).addClass('active');
            bLazy.revalidate();
            sliderTimer();

        }, 9000);
   }
    sliderTimer();
    $(".clickSlides").on('click', function () {
        var selected = $(this).index();
        $(".sliding").hide();
        $(".sliding").eq(selected).fadeIn(800);
        slideStart = parseInt(selected) + 1;
        $(".clickSlides").removeClass("active");
        $(this).addClass("active");
    });

    function clickOut(target, effect)
    {
        effect = (effect == 'undefined' ? true : effect);
        $(document).click(function(event){
            var out = $(event.target).closest(target).length;

            if (out == 0) {
                if (effect == true) {
                    $(target).fadeOut();
                } else {
                    $(target).hide();
                }
            }
        });
    }
    clickOut('#snippet--searching');

    function checkWhisper()
    {
        var scrollStart = 90;
        var scrolling = $('#snippet--searching').width() + scrollStart; //450
        var whisper = $('#snippet--searching');
        return (whisper.is(':visible') ? scrolling : scrollStart)
    }

    var scrolled = $(this).scrollTop();
    if (scrolled >= checkWhisper()) {
        if (!$("#header").hasClass('headerSlide')) {
            $("#header").addClass('headerSlide').hide();
        }
    } else {
        if ($("#header").hasClass('headerSlide')) {
            $("#header").removeClass('headerSlide').show();
        }
    }

    var lastScrollTop = 0;

     $(window).scroll(function(e) {
        var st = $(this).scrollTop();

        var scrolled = $(this).scrollTop();
        if (scrolled >= checkWhisper()) {
            if (!$("#header").hasClass('headerSlide')) {
                $("#header").addClass('headerSlide').hide();
            }

            // Scroll up
            if (st < lastScrollTop) {
                if ($("#header").hasClass('headerSlide')) {
                    if ($("#basketContent").is(':visible')) {
                        $("#basketContent").slideUp(400, function() {
                            if (!$("#header").is(':visible')) {
                                $("#header").slideDown();
                            }
                        });
                    } else if ($("#snippet--searching").is(':visible')) {
                        if (!$("#header").is(':visible')) {
                            $("#header").slideDown();
                        }

                    } else {
                        if (!$("#header").is(':visible')) {
                            $("#header").slideDown();
                        }
                    }
                }
                 // Scroll down
            } else {
                if ($("#header").hasClass('headerSlide')) {
                    if ($("#header").is(':visible')) {
                        var basketContentVisible = $("#basketContent").is(':visible');
                        var searchingWhisperVisible = $("#snippet--searching").is(':visible');
                        if (basketContentVisible || searchingWhisperVisible) {
                            if (basketContentVisible) {
                                if (!searchingWhisperVisible) {
                                    $("#basketContent").slideUp(500, function() {
                                        $("#header").slideUp();
                                    });
                                }
                            } else if (searchingWhisperVisible) {
                                if (!basketContentVisible) {
                                    $("#basketContent").slideUp(500, function() {
                                        $("#header").slideUp();
                                    });
                                }
                            } else {
                                $("#header").slideUp();
                            }
                        } else {
                            $("#header").slideUp();
                        }
                    }
                }
            }
        } else {
            if ($("#header").hasClass('headerSlide')) {
                if ($("#header").is(':visible')) {
                    $("#header").finish().removeClass('headerSlide');
                } else {
                    $("#header").finish().removeClass('headerSlide').show(0);
                }
            } else {
                $("#header").finish().removeClass('headerSlide').show(0);
            }
        }

        lastScrollTop = st;
    });
}(jQuery, dataLayer, document));
