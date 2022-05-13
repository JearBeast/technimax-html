/**
 * Created by Galek on 20.2.2017.
 */
Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? "." : d,
        t = t === undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + (j < 3 ? i.substr(j) : i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) ) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var configurator = function(productid, price, dph, hddCount, mena, sdph, bezdph) {
    var konfigurace = new Array();
    var countInput = $("form#konfigurace input:checked").length;

    var calc = getConfigurationItemsPrice(price);
    var getDPH = dph / 100;
    var getFullDPH = Math.ceil(calc * getDPH);
    var calcDPH = Math.ceil(parseInt(calc + getFullDPH));
    $(".priceNoDPHConf").html(calc.formatMoney(0, '', ' ') + " " + mena +" " + bezdph);
    $(".priceDPHConf").html(calcDPH.formatMoney(0, '', ' ') + " " + mena +" " + sdph);

    function updateAmounts() {
        $('.reservationAjax').attr('data-konf', getConfigurationItems()[0]);
        $('.reservationAjax').attr('data-konf-amount', getConfigurationItems2()[1]);
        //$('.buyAjax').attr('data-konf', getConfigurationItems()[0]);
        $('.buyAjax').attr('data-konf-amount', getConfigurationItems2()[1]);
        //buyAjax
        //console.log($('.offerAjax').attr('data-konf'));
        $('.offerAjax').attr('data-konf', getConfigurationItems()[0]);
        $('.offerAjax').attr('data-konf-amount', getConfigurationItems2()[1]);
        //console.log($('.offerAjax').attr('data-konf'));
        $('.offerExistsAjax').attr('data-konf', getConfigurationItems()[0]);
        $('.offerExistsAjax').attr('data-konf-amount', getConfigurationItems2()[1]);
        var rk = $('.reservationAjax').attr('data-konf');
        if (rk !== undefined) {
            $('.reservationAjax').attr('data-konf', rk.replace(/,/g, '-'));
            $('.offerAjax').attr('data-konf', rk.replace(/,/g, '-'));
            $('.offerExistsAjax').attr('data-konf', rk.replace(/,/g, '-'));
            //$('.buyAjax').attr('data-konf-amount', rk.replace(/,/g, '-'));
        }
        var rkc = $('.reservationAjax').attr('data-konf-amount');
        if (rkc !== undefined) {
            $('.reservationAjax').attr('data-konf-amount', rkc.replace(/,/g, '-'));
            $('.offerAjax').attr('data-konf-amount', rkc.replace(/,/g, '-'));
            $('.offerExistsAjax').attr('data-konf-amount', rkc.replace(/,/g, '-'));
            //$('.buyAjax').attr('data-konf', getConfigurationItems()[0]);
            $('.buyAjax').attr('data-konf-amount', rkc.replace(/,/g, '-'));
        }
    }

    $("form#konfigurace input").change(function () {
        var countInput = $("form#konfigurace input:checked").length;
        var index = $(this).attr("data-rel").replace("NUM", "");
        // var id2 = $(this).parent().parent().find(".info").attr("data-rel");
        var id2 = $(this).attr("data-oid");

        if (id2 == '000002444400125808' || id2 == '000002080800100236') {
            $('.su' + id2).removeClass('d-none').addClass('d-flex');
            if (konfigurace[index] == undefined) {
                konfigurace[index] = id2
            } else {
                delete konfigurace[index];
            }
        }

        if ($(this).parent().parent().parent().find('input[type=checkbox]').length > 0 && $(this).attr('name') === 'operacni-system') {
            if (id2 == '000002444400125808' || id2 == '000002080800100236') {
            } else {
                delete konfigurace[index];
                $('.su000002080800100236 input').prop('checked', false);
                $('.su000002080800100236').addClass('d-none').removeClass('d-flex');
            }
        }

        var checked = $('.server-hdd');
        for (var i = 0; i < checked.length; i++) {
            var serverinput = checked.eq(i).parent().parent().find('.server-input');
            serverinput.attr('data-count', serverinput.val());
        }

        var checkedInputs = $("form#konfigurace input:checked");
        if (checkedInputs.length > 0) {
            for (i = 0; i < countInput; i++) {
                if ($("form#konfigurace input[type=checkbox]:checked").eq(i).val()) {
                    if ($("form#konfigurace input[type=checkbox]:checked").eq(i).hasClass('server-hdd')) {
                        var c = $("form#konfigurace input[type=checkbox]:checked").eq(i);
                        var cparent = c.parent().parent().parent();
                        var cparentfind = cparent.find('input[data-reset=1]');

                        if ($(this).attr('data-reset') != 1) {
                            $('form#konfigurace input[data-rel=' + $(this).attr('data-parent-rel') + ']').attr('checked', false);
                        } else {
                            $('form#konfigur☺ace input[data-rel=' + $(this).attr('data-rel') + ']').attr('checked', false);
                        }
                    }
                }
            }
        }

        updateAmounts();
        getConfigurationItemsPrice(price);
    });

    //detail__cart__minus__server
    $('.detail__cart__minus__server').click(function () {
        var currentAmount = parseInt($(this).parent().find('input').val());
        var newAmount = currentAmount - 1;
        // if (newAmount == 0) newAmount = 1;

        if (newAmount < 0) {
            newAmount = 0;
        }

        $(this).parent().find('input').val(newAmount);
        $(this).parent().find('input').change();
    });
    //detail__cart__minus__server

    //detail__cart__plus__server
    $('.detail__cart__plus__server').click(function () {
        var currentAmount = parseInt($(this).parent().find('input').val());
        var newAmount = currentAmount + 1;

        if (newAmount > $(this).parent().children('input').attr('max')) {
            newAmount = $(this).parent().children('input').attr('max');
        }

        $(this).parent().find('input').val(newAmount);
        $(this).parent().find('input').change();
    });
    //detail__cart__plus__server

    $('.server-hdd-reset').on('change', function (e) {
        if ($(this).prop('checked')) {
            $('.server-hdd').prop('checked', false);
            $('.server-input').val(0);
        }
        updateAmounts();
        getConfigurationItemsPrice(price);
    });

    $('.server-hdd').on('change', function(e) {
        var c = $('.server-input[data-rel=' + $(this).attr('data-rel') +']');
        var countChecked = getHddRealCountsChecked();
        if ($(this).prop('checked') == true) {
            if (c.val() == 0) {
                if (getHddRealCounts() >= hddCount) {
                    c.val(0);
                } else {
                    c.val(1);
                }
            }
        } else {
            c.val(0);
        }

        if ($('.server-hdd:checked').length == 0) {
            $('.server-hdd-reset').prop('checked', true);
        } else {
            $('.server-hdd-reset').prop('checked', false);
        }

        if (countChecked == hddCount) {
            $(this).prop('checked', false);
            c.val(0);
            $(this).prop('checked', false);
        }

        updateAmounts();
        getConfigurationItemsPrice(price);
    });

    $('.server-input').on('change', function (e) {
        var checked = $('.server-hdd');
        var thisvalue = $(this).val();
        var fullAmount = getHddRealCounts();

        var othervalue = fullAmount - thisvalue;

        if (hddCount == false) {
            $(this).val(0);
            return;
        }

        var allowed = hddCount - othervalue;

        if (othervalue < hddCount) {
            if (thisvalue > allowed) {
                $(this).val(allowed);
            } else if (thisvalue < 0) {
                $(this).val(0);
            }
        } else if (othervalue == hddCount) {
            $(this).val(0);
        } else {
            $(this).val(0);
        }

        var checked = $('.server-hdd');
        for (var i = 0; i < checked.length; i++) {
            var serverinput = checked.eq(i).parent().parent().find('.server-input');
            serverinput.attr('data-count', serverinput.val());
            if (serverinput.val() > 0) {
                checked.eq(i).prop('checked', true);
            }
        }

        if ($(this).val() == 0) {
            $('.server-hdd[data-rel=' + $(this).attr('data-rel') + ']').prop('checked', false);
        }

        if ($('.server-hdd:checked').length == 0) {
            $('.server-hdd-reset').prop('checked', true);
        } else {
            $('.server-hdd-reset').prop('checked', false);
        }

        var inputs = $('.server-input');

        for (var i = 0; i < inputs.length; i++) {
            var c = inputs[i];
            if (c.value == 0) {
                $('.server-hdd[data-rel=' + c.getAttribute('data-rel') +']').prop('checked', false);
            }
        }

        updateAmounts();
        getConfigurationItemsPrice(price);
    });

    var pocet = 1;

    $(".buy a.buyDetail").on("click", function (e) {
        pocet = $("#productCounterBasket").val();

        if ($(e.target).closest('.button__dropdown__opener').length) {
            return;
        }

        var clearKonfigurace2 = [];
        var clearHddCounts = [];
        var y = 0;

        //var data = getConfigurationItems();
        var data = getConfigurationItems2();
        var newKonf = data[0];
        var amounts = data[1];

        for (var i = 0; i < newKonf.length; i++) {
            if (newKonf[i] != undefined) {
                clearKonfigurace2[y] = newKonf[i];
                if (amounts[i] != undefined) {
                    clearHddCounts[y] = amounts[i];
                }
                y++;
            }
        }
		//$("html, body").animate({ scrollTop: 0 }, "slow");
        $.nette.ajax({
			'url': '?do=addToBasketKonfigurace',
			'data': {
				id: productid,
				konf: clearKonfigurace2,
				konfamounts: amounts,
				count: pocet
			}
		}).done(function () {

			/*$("#basketContent").removeClass('d-none');
			setTimeout(function () {
				$("#basketContent").addClass('d-none');
			}, 3000);*/

			// $("#basketContent").show();
		});
    });

    function getConfigurationItems() {
        var checked = $("form#konfigurace input[data-nochange=0]:checked");
        var result = [];
        var konfigurace = [];
        var amounts = [];

        for (var i = 0; i < checked.length; i++) {
            var rel = checked[i].getAttribute('data-rel');
            konfigurace[i] = checked[i].getAttribute("data-oid");
            amounts[i] = $("form#konfigurace input[data-amount=1][data-rel=" + rel +"]").val();
        }
        result[0] = konfigurace;
        result[1] = amounts;
        return result;
    }

    function getConfigurationItems2() {
        var checked = $("form#konfigurace input[data-nochange=0]:checked");
        var result = [];
        var konfigurace = [];
        var amounts = [];

        var index = 0;
        for (var i = 0; i < checked.length; i++) {
            var rel = checked[i].getAttribute('data-rel');
            var amount = $("form#konfigurace input[data-amount=1][data-rel=" + rel +"]").val();
            konfigurace[i] = checked[i].getAttribute("data-oid");
            amounts[index] = konfigurace[i];
            index++;
            //console.log(konfigurace[i]);
            //console.log(amount);
            amounts[index] = ( (!amount || amount === 0) ? 1 : amount);
            //console.log(amounts);
            //console.log($("form#konfigurace input[data-amount=1][data-rel=" + rel +"]").val());
            index++;
        }
        result[0] = konfigurace;
        result[1] = amounts;
        return result;
    }

    function getConfigurationItemsPrice(price2)
    {
        var checked = $("form#konfigurace input[data-nochange=0]:checked");

        for (var i = 0; i < checked.length; i++) {
            var rel = checked[i].getAttribute('data-rel');
            var a = $("form#konfigurace input[data-amount=1][data-rel=" + rel +"]").val();
            amount = (a ? a : 1 );
            price2 += parseInt(checked[i].value) * parseInt(amount);
        }

        var result = Math.ceil(price2);


        var getDPH = dph / 100;
        var getFullDPH = Math.ceil(result * getDPH);
        var calcDPH = Math.ceil(parseInt(result + getFullDPH));

        $(".priceNoDPHConf").html(result.formatMoney(0, '', ' ') + " " + mena + " " + bezdph);
        $(".priceDPHConf").html(calcDPH.formatMoney(0, '', ' ') + " " + mena +" " + sdph);


        return result;
    }
}

function getHddRealCounts() {

    var checked = $('.server-hdd');
    var fullAmount = 0;

    for (var i = 0; i < checked.length; i++) {
        fullAmount += parseInt(checked.eq(i).parent().parent().find('.server-input').val());
    }
    return fullAmount;
}

function getHddRealCountsChecked() {

    var checked = $('.server-hdd:checked');
    var fullAmount = 0;

    for (var i = 0; i < checked.length; i++) {
        fullAmount += parseInt(checked.eq(i).parent().parent().find('.server-input').val());
    }
    return fullAmount;
}

$("#addRecenzeStars label").addClass("active");

$("#addRecenzeStars label").on("mouseenter", function() {
    var getPos = $(this).children("input").val();
    $("#addRecenzeStars label").children("input").attr("checked", false);
    $(this).children("input").attr("checked", "checked");
    for (i = getPos; i >= 1; i--) {
        $("#addRecenzeStars label[for=frm-pridatRecenziForm-hodnoceni-" + i).addClass("active");
    }
    for (i = 5; i > getPos; i--) {
        $("#addRecenzeStars label[for=frm-pridatRecenziForm-hodnoceni-" + i).removeClass("active");
    }
    down = true;
});


$("input.detail__cart__amount").change(function() {
    $(".detail__cart__amount").val($(this).val());
    $("#snippet--konfiguraceInfoDetail").fadeIn();
});


$('#toggleAllParametersButton').on('click', function () {
    let
        $button = $(this),
        html = $button.html().trim();

    if (html === $button.data('hide-label').trim()) {
        $button.html($button.data('show-label').trim());

        $(document).find('.parameters__title--open').each(function () {
            $(this).click();
        });

        return;
    }

    if (html === $button.data('show-label').trim()) {
        $button.html($button.data('hide-label').trim());

        $(document).find('.parameters__title').each(function () {
            if ($(this).hasClass('parameters__title--open')) {
                return;
            }

            $(this).click();
        });
    }
});

// Puvodni count change

// $(".addToBasketCount input").change(function() {
//     var getHrefObject = $(this).parent().parent().parent().parent().find('.buy').children('a');
//     getHrefObject.attr('data-count', $(this).val());
//     var dropdown = $('.buy .dropdown-menu a');
//
//     var newvalue = $(this).val();
//     dropdown.each(function(index) {
//         var item = $(this);
//         item.attr('data-count', newvalue);
//     });
// });
