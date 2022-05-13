/**
 * jQuery plugin
 * @param {type} options
 * @param {type} callback
 * @returns {$.fn}
  Plugin info:
	@name Gallery
	@version: 1.0.4
	@date: 24.11.2015
	@options:
		moveCount: Count Image for move (value: integer)
		speed: Speed of Moving/Sliding in miliseconds (value: integer)
		activateClass: Enable/Disable Border for Active Image (value: true/false)
		minigallery: Enable/Disable MiniGallery (value: true/false)
		closeText: Text of Close Button Title (value: string)
		nextText: Text of Next Image Button Title (value: string)
		backText: Text of Previous Image Button Title (value: string)
		minigalleryMoveCount: Count Image of MiniGallery for move (value: integer)
		minigallerySpeed: Speed of Moving/Sliding of MiniGallery images in miliseconds (value: integer)
		activateClassMini: Enable/Disable Border of MiniGallery for Active Image (value: true/false)
		allowKeyArrow: Enable/Disable key Arrow-Left and Arrow-Right to switch Image (value: true/false)
		allowKeyAD: Enable/Disable key A and D to switch Image (value: true/false)
		keyMoveType: Set type of switch image (value: integer [0])
		rolling: Enable/Disable Rolling Gallery (value: true/false)
		changeImageEffect: Effects of Change Present Image (value: integer/string [0/showHide;1/fade;2/slide])
		changeImageEffectSpeed: Speed of changing big image (value: integer),
		allowCloseClickOut: Enable/Disable Click outside Close Gallery (value: true/false)
		allowImageMove: Enable/Disable Left & Right Image Click to move next/back image (value: true/false)
		allowStartEffect: Enable/Disable Fade Effect after start (value: true/false)
		otherImage: Other Image, which start minigallery too (value: id/class)
	@author Author info:
	@author name: Jan Galek
	@author website: http://jan-galek.cz
	@author email: admin@gcore.cz
 CreatedFor info:
	name: Technimax s.r.o.
	website: https://www.technimax.cz
*/

$.fn.gallery = function(options, callback) {
	window.galerieClickPos2 = 0;
	window.activationChangeMove = false;
	var settings = $.extend({
				moveCount: 1,
				speed: 1000,
				activateClass: true,
				minigallery: true,
				closeText: 'Zavřít',
				nextText: 'Další',
				backText: 'Předchozí',
				minigalleryMoveCount: 3,
				minigallerySpeed: 1000,
				activateClassMini: true,
				allowKeyArrow: true,
				allowKeyAD: false,
				keyMoveType: 0,
				rolling: true,
				changeImageEffect: 0,
				changeImageEffectSpeed: 400,
				allowCloseClickOut: true,
				allowImageMove: true,
				allowStartEffect: true,
				imagePaddingLeft: 2,
				imagePaddingRight: 2,
				otherImage: "",
				noCloseElement: '',
				startCallbackInGallery: false,
				basePath: false,
				duplicate: true
	}, options);

	var settingsBig = new Array();
	settingsBig['minigallery'] = settings.minigallery;
	settingsBig['closeText'] = settings.closeText;
	settingsBig['nextText'] = settings.nextText;
	settingsBig['backText'] = settings.backText;
	settingsBig['moveCount'] = settings.minigalleryMoveCount;
	settingsBig['speed'] = settings.minigallerySpeed;
	settingsBig['activateClass'] = settings.activateClassMini;
	settingsBig['allowKeyArrow'] = settings.allowKeyArrow;
	settingsBig['allowKeyAD'] = settings.allowKeyAD;
	settingsBig['keyMoveType'] = settings.keyMoveType;
	settingsBig['rolling'] = settings.rolling;
	settingsBig['changeImageEffect'] = settings.changeImageEffect;
	settingsBig['changeImageEffectSpeed'] = settings.changeImageEffectSpeed;
	settingsBig['allowCloseClickOut'] = settings.allowCloseClickOut;
	settingsBig['allowImageMove'] = settings.allowImageMove;
	settingsBig['allowStartEffect'] = settings.allowStartEffect;
	settingsBig['otherImage'] = settings.otherImage;
	settingsBig['noCloseElement'] = settings.noCloseElement;
	settingsBig['startCallbackInGallery'] = settings.startCallbackInGallery;
	settingsBig['duplicate'] = settings.duplicate;

	var galleryName = $(this).attr("id");
	$(this).addClass("gallery");
	var gallery = "#" + galleryName;

	var galleryImages = $(gallery + " img");
	var galleryHrefImages = $(gallery + " a");

	var _arrowLeftName = galleryName + "Left";
	var _arrowRightName = galleryName + "Right";
	var _arrowLeft = '<div class="galleryLeft" id="' + _arrowLeftName + '"></div>';
	var _arrowRight = '<div class="galleryRight" id="' + _arrowRightName + '"></div>';

	var galleryInside = gallery + "Inside";

	var galerieImagesCount = 0;

	if (settings.otherImage !== "") {
		galerieImagesCount = galleryImages.length + 1;
	} else {
		galerieImagesCount = galleryImages.length;
	}
	var galerieImageWith = galleryImages.width();

	var galeriePadding = settings.imagePaddingLeft + settings.imagePaddingRight;
	var galerieImageHrefWith = galleryHrefImages.width();
	//Set Image Padding Right - Left
	galleryHrefImages.css({"padding-left": settings.imagePaddingLeft, "padding-right": settings.imagePaddingRight});
	galerieImageHrefWith = galleryHrefImages.width() + parseInt(galleryHrefImages.css('padding-left')) + parseInt(galleryHrefImages.css('padding-right'));
	//console.log(galerieImageHrefWith + ' '+galleryHrefImages.width()+ ' '+galleryHrefImages.css('padding-left')+' '+galleryHrefImages.css('padding-right'));

	var galerieRollingStartPos = -(galerieImagesCount) * (galerieImageHrefWith);
	//var galerieRollingStartPos = -(galerieImagesCount)*(galerieImageHrefWith+galeriePadding);
	if (settings.rolling == true) {
		var galerieImagesFullWith = (((galerieImageHrefWith + galeriePadding) * galerieImagesCount) + $(_arrowLeftName).width() + $(_arrowRightName).width() + $("#"+_arrowRightName).width() + $("#"+_arrowLeftName).width()) * 3;
	} else {
		var galerieImagesFullWith = ((galerieImageHrefWith + galeriePadding) * galerieImagesCount) + $(_arrowLeftName).width() + $(_arrowRightName).width() + $("#"+_arrowRightName).width() + $("#"+_arrowLeftName).width();
	}
	var galleryCountImagesShow = Math.floor((parseInt($(gallery).width()) + galeriePadding) / (parseInt(galerieImageHrefWith) + parseInt(galeriePadding)));
	var galerieImagesMax = galerieImagesCount - galleryCountImagesShow + $("#" + _arrowRightName).width() + $("#" + _arrowLeftName).width();

	var galerieClickPos = 0;

	if (settings.rolling === true) {
		var galleryInsideHTML = "<div class='galleryInside' id='" + galleryName + "Inside'><span id='galleryInsidePart1' class='galleryInsidePart'>" + $(gallery).clone().html() + "</span><span id='galleryInsidePart2' class='galleryInsidePart'>" + $(gallery).clone().html() + "</span><span id='galleryInsidePart3' class='galleryInsidePart'>" + $(gallery).clone().html() + "</span></div>";
	} else {
		var galleryInsideHTML = "<div class='galleryInside' id='" + galleryName + "Inside'>" + $(gallery).clone().html() + "</div>";
	}
	if (settings.rolling === true) {
		$(gallery).append(_arrowLeft).append(galleryInsideHTML).append(_arrowRight);
		$(galleryInside + " .galleryInsidePart").css({left:galerieRollingStartPos});
	} else {
		$(gallery).append(_arrowLeft).append(galleryInsideHTML).append(_arrowRight);
	}
	if (settings.otherImage !== "") {
		var otherImage = $(settings.otherImage);
		var cloneOtherImage = $(settings.otherImage).clone().removeAttr('id').removeClass('image');
		cloneOtherImage.prependTo(galleryInside + " .galleryInsidePart");
		$(cloneOtherImage).css({"padding-left": settings.imagePaddingLeft, "padding-right": settings.imagePaddingRight});
	}

	$(gallery).children("a").remove();
	$(galleryInside).width(galerieImagesFullWith);

	$("#"+_arrowLeftName).on("click", function() {
		galerieClickPos -= settings.moveCount;

		if (settings.rolling == true) {
			if (parseInt($(galleryInside + " .galleryInsidePart").css("left")) >= 0) {
				$(galleryInside + " .galleryInsidePart").css({"left": galerieRollingStartPos});
			}
			$(galleryInside + " .galleryInsidePart").animate({left: "+=" + ((galerieImageHrefWith) * settings.moveCount)}, settings.speed);
		} else {
			if (galerieClickPos >= 0) {
				$(galleryInside + " a").animate({left: "+=" + (galerieImageHrefWith + galeriePadding) * settings.moveCount}, settings.speed);
			} else {
				$(galleryInside + " a").animate({left: "-=" + galerieImagesMax*galerieImageHrefWith}, settings.speed);
				galerieClickPos = galerieImagesMax;
			}
		}
	});

	 $("#" + _arrowRightName).on("click", function() {
		galerieClickPos += settings.moveCount;
		if (settings.rolling == true) {
			if (parseInt($(galleryInside + " .galleryInsidePart").css("left")) <= galerieRollingStartPos * 2) {
				$(galleryInside + " .galleryInsidePart").css({"left": galerieRollingStartPos});
			}
			$(galleryInside + " .galleryInsidePart").animate({left: "-=" + (galerieImageHrefWith * settings.moveCount)}, settings.speed);
		} else {
			if (galerieClickPos >= galerieImagesMax) {
				$(galleryInside + " a").animate({left: "-="+galerieImageHrefWith * settings.moveCount}, settings.speed);
			} else {
				$(galleryInside + " a").animate({left: "+=" + galerieImagesMax * galerieImageHrefWith}, settings.speed);
				galerieClickPos = 0;
			}
		}
	});

	$.getScript("/js/galek/hash-detector.js", function () {
		var startUp = $('#galerie').hashDetector({name: 'fotogalerie', detect: '.fotogalerie', event: 'addClass', eventParam: 'noActive'});

		if (startUp !== '') {
			$('#galerie').hashDetector({
				name: 'fotogalerie',
				detect: '.fotogalerie',
				event: 'addClass',
				eventParam: 'noActive'
			}, function () {
				if (settings.activateClass === true) {
					$(gallery + " " + galleryInside + " a").removeClass("active");
					$(startUp).addClass("active");
				}
				galleryBig($(startUp), settingsBig, callback);
			});
		}
	});

	// $(settings.otherImage).on("click", function () {
	// 	if (settings.activateClass === true) {
	// 		$(gallery + " " + galleryInside + " a").removeClass("active");
	// 		$(startUp).addClass("active");
	// 	}
	//
	// 	var hash = $(this).attr("class");
	// 	window.location.hash = hash.replace('image ', '').replace(' ', '-');
	// 	galleryBig($(startUp), settingsBig, callback);
	// });

	//Active Gallery FadeBox
	$(gallery + " " + galleryInside + " .galleryInsidePart a").on("click", function () {
		var hash = $(this).attr("class");
		if (settings.activateClass == true) {
			$(gallery + " " + galleryInside + " a").removeClass("active");
			$(this).addClass("active");
		}

		window.location.hash = hash.replace(' ', '-');
		galleryBig($(this), settingsBig, callback);
	});

	if (settings.startCallbackInGallery == false) {
		if (typeof callback === 'function') {
			callback.call(this);
		}
	}

	return this;
};

function galleryBig(object, options, callback){

//$.fn.galleryBig = function(options){
	var settings = options;

	if (object.attr("id") == settings.otherImage) {
		var object = $("#galleryInsidePart1 a[data-rel='" + object.attr('data-rel') + "']");
	}

	var gallery = object.parents(".gallery").attr("id");
	var galleryInside = gallery + "Inside";
	var galleryImageArrowLeft = gallery + "ImageArrowLeft";
	var galleryImageArrowRight = gallery + "ImageArrowRight";
	settings = options;

	//Check if Presenter Template Exists
	if ($("body #galleryPresenter").length > 0) {
		//If Yes, than only change main IMG
		$("#galleryImage img").attr("src", object.attr("data-rel"));
	} else {
		//If No, than create Presenter Template
		if (settings.allowImageMove == true) {
			$("body").append('<div id="galleryPresenter"><div id="galleryContent"><div id="galleryImage"><div title="' + settings.backText + '" id="' + galleryImageArrowLeft + '" class="galleryImageArrowLeft"></div><img src="' + object.attr("data-rel") + '" alt="imgBigest"><div title="' + settings.nextText + '" id="' + galleryImageArrowRight + '" class="galleryImageArrowRight"></div></div><a href="#close" id="galleryClose" title="' + settings.closeText + '"></a></div></div>');
		} else {
			$("body").append('<div id="galleryPresenter"><div id="galleryContent"><div id="galleryImage"><img src="' + object.attr("data-rel") + '" alt="imgBigest"></div><a href="#close" id="galleryClose" title="' + settings.closeText + '"></a></div></div>');
		}

		if (settings.minigallery === true) {

			if (settings.rolling === true) {
				$("#galleryPresenter").append('<div id="galleryMini">' + $("#" + gallery).clone().html() + '</div>');
			} else {
				$("#galleryPresenter").append('<div id="galleryMini">' + $("#" + gallery).clone().html() + '</div>');
				$("#galleryMini #" + galleryInside).append($("#" + galleryInside).clone().html());
				//$("#"+galleryMini+" #"+galleryInside).append($("#"+galleryInside).clone().html());
			}
		}
		loadGalleryMini(gallery, settings);
	}

	if (settings.minigallery == true) {
		if (settings.activateClass == true) {
			var selectedRel = object.attr("data-rel");
			$("#galleryMini .galleryInsidePart a").removeClass("active");
			$("#galleryMini .galleryInsidePart a[data-rel='" + selectedRel + "']").addClass("active");
		}
	}
	if (settings.allowStartEffect == true) {
		$("#galleryPresenter").fadeIn();
	} else {
		$("#galleryPresenter").show();
	}

	if (settings.activateClass == true) {
		var selectedRel = object.attr("data-rel");
		$("#galleryMini .galleryInsidePart a").removeClass("active");
		$("#galleryMini .galleryInsidePart a[data-rel='" + selectedRel + "']").addClass("active");
	}

	//console.log(settings.startCallbackInGallery);
	if (settings.startCallbackInGallery == true) {
		//    console.log(callback);
		if (typeof callback === 'function') {
			callback.call(this);
		}
	}
	/*----------------
		Exit
	-----------------*/
	var opened = true;

	$("#galleryClose").click(function() {
		if (settings.allowStartEffect == true) {
			$("#galleryPresenter").fadeOut();
		} else {
			$("#galleryPresenter").hide();
		}
		var opened = false;
	});

	$("*[data-target=closeGallery]").click(function () {
		if (settings.allowStartEffect == true) {
			$("#galleryPresenter").fadeOut();
		} else {
			$("#galleryPresenter").hide();
		}
		var opened = false;
	});

	if (settings.allowCloseClickOut == true) {
		if (opened == true) {
			$(document).click(function(event) {
				var out1 = $(event.target).closest("#" + galleryInside).length;
				var out2 = $(event.target).closest("#galleryContent").length;
				var out3 = $(event.target).closest("#galleryMini .galleryLeft").length;
				var out4 = $(event.target).closest("#galleryMini .galleryRight").length;
				var mm = $(settings.otherImage);
				var out5 = $(event.target).closest(mm.parent()).length;
				var out6 = 1;
				if (settings.otherImage !== '') {
					out6 = $(event.target).closest(settings.noCloseElement).length;
				}

				if (out1 == 0 && out2 == 0 && out3 == 0 && out4 == 0 && out5 == 0 && out6 === 0) {
					if (settings.allowStartEffect == true) {
						$("#galleryPresenter").fadeOut();
					} else {
						$("#galleryPresenter").hide();
					}
					var opened = false;
				}
			});
		}
	}
	/*----------------
		/Exit
	-----------------*/
}

function loadGalleryMini(gallery, settings) {
	var galleryInside = gallery + "Inside";
	var galleryImageArrowLeft = gallery + "ImageArrowLeft";
	var galleryImageArrowRight = gallery + "ImageArrowRight";

	var bodyHeight = $("#galleryPresenter").height() - 140;

	$("#galleryImage img").height(bodyHeight * 0.98).load(function() {
		var imageWidth = $(this).width();
		var imageHeight = $(this).height();

		var imagesCount = $("#galleryMini #" + galleryInside + " img").length;
		var imagesWith = $("#galleryMini #" + galleryInside + " img").width();
		var imagesFullWith = Math.floor((imageWidth * imagesCount) - ($("#galleryMini .galleryLeft").width() * 2));

		$("#galleryContent").width(imageWidth + 10).height(imageHeight + 10);

		if (settings.allowImageMove==true) {
			$("#" + galleryImageArrowRight).height($("#galleryContent").height());
			$("#" + galleryImageArrowLeft).height($("#galleryContent").height());
		}

		$("#galleryClose").css({"margin-left": $("#galleryContent").width() - 20});
		$("#galleryMini #" + galleryInside).height($("#galleryPresenter").height() - $("#galleryContent").height() - 20).width(imagesFullWith).css({"margin-left": $("#galleryMini .galleryLeft").width()});

		$("#galleryMini img").height($("#galleryMini #" + galleryInside).height());
		$("#galleryMini a").height($("#galleryMini " + galleryInside).height()).width($("#galleryMini #" + galleryInside + " img").width());
		$("#galleryMini .galleryLeft").height($("#galleryMini").height());
		$("#galleryMini .galleryRight").height($("#galleryMini").height());
		$("#galleryMini .galleryInsidePart").css({left: -$("#galleryMini .galleryInsidePart").width()});
	});

	/*----------------
		Movement
	-----------------*/
	$("#galleryMini .galleryRight").on("click", function() {
		moveRight(settings);
	});
	$("#galleryMini .galleryLeft").on("click", function() {
		moveLeft(settings);
	});

	$("#galleryMini .galleryInsidePart a").on("click", function() {
		var newRel = $(this).attr("data-rel");
		$("#galleryMini a").removeClass("active");
		$('#galleryMini a[data-rel="' + newRel + '"]').addClass("active");
		changeBigPicture($(this).attr("data-rel"), settings);
	});

	if (settings.allowKeyArrow == true) {
		$("html").on("keydown", function(e) {
			//Left Arrow key
			if (e.which == 37) {
				moveLeft(settings, 1);
			}
			//Right Arrow key
			if (e.which == 39) {
				moveRight(settings, 1);
			}
		});
	}
	if (settings.allowKeyAD == true) {
		$("html").on("keypress",function(e) {
			//A key
			if (e.which == 97) {
				moveLeft(settings, 1);
			}
			//D key
			if (e.which == 100) {
				moveRight(settings, 1);
			}
		});
	}
	if (settings.allowImageMove == true) {
		$("#" + galleryImageArrowRight).on("click", function() {
			moveRight(settings, 1);
		});
		$("#" + galleryImageArrowLeft).on("click", function() {
			moveLeft(settings, 1);
		});
	}


	$('#galleryMini .galleryInside .galleryInsidePart a img').each(function() {
		$(this).attr('src', $(this).parent('a').attr('data-rel2'));
	});

	/*----------------
		/Movement
	-----------------*/

};

function moveLeft(settings, moving) {
	var oldMoving = moving;
	var galleryInsidePartCount = $("#galleryMini .galleryInsidePart").length;
	var moveWidth = $("#galleryMini a").width() + parseInt($("#galleryMini a").css('padding-left')) + parseInt($("#galleryMini a").css('padding-right'));

	if (moving == null) {
		moving = settings.moveCount;
	}
	if (settings.rolling == true) {
		var controls = parseInt($("#galleryMini #galerieLeft").width()) + parseInt($("#galleryMini #galerieRight").width());
		if ((parseInt($("#galleryMini .galleryInsidePart").css("left")) + parseInt(moveWidth * moving)) >= 0) {
			//$("#galleryMini .galleryInsidePart").css({left:-$("#galleryMini .galleryInsidePart").width()});

			var positionSets = parseInt($("#galleryMini .galleryInsidePart").css('left')) - parseInt($("#galleryMini .galleryInsidePart").width());
			$("#galleryMini .galleryInsidePart").css({"left": positionSets});
		}
		$("#galleryMini #galleryInsidePart1").animate({left: "+=" + moveWidth * moving}, settings.speed, function() {
			if (oldMoving != null) {
				changeBigPicture(backImage($(this).attr("id"), settings), settings);
			}
		});
		for (i = 2; i <= galleryInsidePartCount; i++){
			$("#galleryMini #galleryInsidePart" + i).animate({left: "+=" + moveWidth * moving}, settings.speed, function() {
				if (oldMoving != null) {
					backImage($(this).attr("id"), settings);
				}
			});
		}
	} else {
		if (galerieClickPos2 > 0) {
			if (activationChangeMove === true) {
				if (galerieClickPos2 <= moving) {
					//var lastmove = calcPosuny;
					var lastmove = 0;
					activationChangeMove = false;
				} else {
					var lastmove = moving;
				}
			} else {
				var lastmove = moving;
			}
			$("#galleryMini a").animate({left: "+=" + $("#galleryMini a").width() * lastmove}, settings.speed);
			galerieClickPos2 -= moving;

			if (galerieClickPos2 < 0) {
				galerieClickPos2 = 0;
			}
		} else {
			$("#galleryMini a").animate({left: "-=" + (Maxes * $("#galleryMini a").width())}, settings.speed);
			galerieClickPos2 = Maxes;
			activationChangeMove = true;
		}
	}
}

function moveRight(settings, moving) {
	var oldMoving = moving;

	var galleryInsidePartCount = $("#galleryMini .galleryInsidePart").length;
	var moveWidth = $("#galleryMini a").width() + parseInt($("#galleryMini a").css('padding-left')) + parseInt($("#galleryMini a").css('padding-right'));
	if (moving == null) {
		moving = settings.moveCount;
	}

	if (settings.rolling == true) {
		var controls = parseInt($("#galleryMini #galerieLeft").width()) + parseInt($("#galleryMini #galerieRight").width());
		var needMax = -((($("#galleryMini .galleryInsidePart").width()) * 2));
		if (parseInt($("#galleryMini .galleryInsidePart").css("left")) <= needMax) {
			var positionSets = parseInt($("#galleryMini .galleryInsidePart").css('left')) + parseInt($("#galleryMini .galleryInsidePart").width());
			$("#galleryMini .galleryInsidePart").css({"left": positionSets});
		}
		$("#galleryMini #galleryInsidePart1").animate({left: "-=" + moveWidth * moving}, settings.speed, function() {
			if (oldMoving != null) {
				changeBigPicture(nextImage($(this).attr("id"), settings), settings);
			}
		});
		for (i = 2; i<= galleryInsidePartCount; i++) {
			$("#galleryMini #galleryInsidePart" + i).animate({left: "-=" + moveWidth * moving}, settings.speed, function() {
				if (oldMoving != null) {
					nextImage($(this).attr("id"), settings);
				}
			});
		}
	} else {
		if (galerieClickPos2 < Maxes) {
			if (galerieClickPos2 >= (Maxes - 2)) {
				var lastmove = calcPosuny;
				activationChangeMove = true;
			} else {
				var lastmove = moving;
			}
			$("#galleryMini a").animate({left: "-=" + $("#galleryMini a").width() * lastmove}, settings.speed);
			galerieClickPos2 += moving;
		} else {
			$("#galleryMini a").animate({left: "+=" + Maxes * $("#galleryMini a").width()}, settings.speed);
			activationChangeMove = false;
		}
	}
}

function nextImage(id, settings) {
	var activeImage = $('#galleryMini #' + id + ' a.active');
	var imagesCount2 = $('#galleryMini #' + id + ' img').length;
	if (activeImage.index() >= imagesCount2-1) {
		var activeImageIndex = -1;
	} else {
		var activeImageIndex = activeImage.index();
	}

	var nextImage = $('#galleryMini #' + id + ' a').eq(activeImageIndex + 1);

	$('#galleryMini #' + id+' a').eq(activeImageIndex).removeClass("active");
	$('#galleryMini #' + id + ' a').eq(activeImageIndex + 1).addClass("active");
	return nextImage.attr("data-rel");
}

function backImage(id, settings) {
	var activeImage = $('#galleryMini #' + id + ' a.active');
	var activeImageIndex = activeImage.index();
	var backImage = $('#galleryMini #' + id + ' a').eq(activeImageIndex - 1);

	$('#galleryMini #' + id + ' a').eq(activeImageIndex).removeClass("active");

	$('#galleryMini #' + id + ' a').eq(activeImageIndex - 1).addClass("active");
	return backImage.attr("data-rel");
}


function changeBigPicture(newsrc, settings) {
	var bigImage = $("#galleryPresenter #galleryImage img");
	var left = $("#galleryMini #galleryInsidePart1").css("left");

	if (settings.changeImageEffect == 0) {
		var newImage = bigImage.hide().attr("src", newsrc).show();
	}
	else if (settings.changeImageEffect == 1) {
		var newImage = bigImage.fadeOut(settings.changeImageEffectSpeed, function() {
			$(this).attr("src", newsrc);
			$(this).load(function() {
				$(this).fadeIn(settings.changeImageEffectSpeed);
			});
		});
	}
	else if (settings.changeImageEffect == 2) {
		var newImage = bigImage.slideUp().bind().attr("src", newsrc).slideDown(settings.changeImageEffectSpeed);
	}

	newImage.on("load", function() {
		$("#galleryMini .galleryInsidePart").css({"left": left});
	});
}
