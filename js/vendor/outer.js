/*-----------------------------------------------*/
/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */

/*document.addEventListener("DOMContentLoaded", function() {
    var div, n,
        v = document.getElementsByClassName("youtube-player");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = labnolThumb(v[n].dataset.id);
        div.onclick = labnolIframe;
        v[n].appendChild(div);
    }
});*/

function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}

function UpdateQueryString(key, value, url) {
    if (!url) {
        url = window.location.href;
    }

  	var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), hash;

    if (re.test(url)) {
    	   if (typeof value !== 'undefined' && value !== null) {
    	       return url.replace(re, '$1' + key + "=" + value + '$2$3');
    	   } else {
      	       hash = url.split('#');
               url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            	 if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
              	   url += '#' + hash[1];
                }
                return url;
        }
    } else {
    	   if (typeof value !== 'undefined' && value !== null) {
          	 var separator = url.indexOf('?') !== -1 ? '&' : '?';
          	 hash = url.split('#');
          	 url = hash[0] + separator + key + '=' + value;
        	   if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
          		    url += '#' + hash[1];
            }
          	 return url;
  	     } else {
  		        return url;
          }
    }
}

function loadVideo(id) {
    //console.log("loadVideo:" + id);
    $("#snippet--konfiguraceInfoDetailContent").html('<div class="youtube-player" data-id="' + id + '"></div>');
    var div, n;
        v = document.querySelectorAll("#snippet--konfiguraceInfoDetailContent .youtube-player");
    for (n = 0; n < v.length; n++) {
        v[n].innerHTML = labnolThumb(v[n].dataset.id);
        $('body').on('click', '.youtube-player', function(e) {
            $("#snippet--konfiguraceInfoDetailContent").html("<iframe src='https://www.youtube.com/embed/" + id + "?autoplay=1' frameborder='0' allowfullscreen width='780' height='444'></iframe>");
        });
    }
    //$("#snippet--konfiguraceInfoDetailContent").html("<iframe src='https://www.youtube.com/embed/"+id+"' frameborder='0' allowfullscreen width='780' height='444'></iframe>");
    //$("#snippet--konfiguraceInfoDetail").show();
    //console.log($("#snippet--konfiguraceInfoDetail").show());
    document.getElementById('snippet--konfiguraceInfoDetail').style.display = 'block';
}

function loadPhoto(html, id) {
    $("#snippet--konfiguraceInfoDetailContent").html(html);
    $("#snippet--konfiguraceInfoDetailContent img").css({ width: "780px"}).attr('src',id);
    $("#snippet--konfiguraceInfoDetail").fadeIn();
}
 $('body').on('click', '.popupVideo', function(){
    var id = $(this).attr("data-rel");
    window.location.hash = $(this).attr("class").replace('popupVideo ','').replace('active','').replace('multi','').replace('single','').replace(' ','-');
    loadVideo(id);
});
 $('body').on('click', '.popupPhoto',function(){
    var id = $(this).attr("data-rel");
    var html = $(this).html();
    window.location.hash = $(this).attr("class").replace('popupPhoto ','').replace('active','').replace('multi','').replace('single','').replace(' ','-');
    loadPhoto(html,id);
});

$('#content').hashDetector({ name: 'foto',detect:'.popupPhoto'},function(){
    var id2 = $('#content').hashDetector({ name: 'foto', detect: '.popupPhoto'});
    //console.log(id2);
    if (id2 !== '') {
        var id= $(id2).attr('data-rel');
        var html = $(id2).html();
      	loadPhoto(html, id);
    }
});

$('#content').hashDetector({ name: 'youtube', detect:'.popupVideo'}, function(){
    var id2 = $('#content').hashDetector({ name: 'youtube', detect:'.popupVideo'});
    //console.log(id2);
    if (id2 !== '') {
      	var id = $(id2).attr('data-rel');
      	loadVideo(id);
    }
});

$("#snippet--footerAjax .close").on("click", function () {
      $("#snippet--footerAjax").fadeOut();
});

$('body').on('click', "#popupDodani .popupComponentClose", function () {
      var $name = $(this).attr('data-name');
      $(this).parent().parent().fadeOut();
});

$(document).on('click', function(event) {
  	var out1 = $(event.target).closest("#snippet--konfiguraceInfoDetailContent").length;
  	var out2 = $(event.target).closest(".popupPhoto").length;
  	var out3 = $(event.target).closest(".popupVideo").length;
  	var out4 = $(event.target).closest(".info").length;
    var out5 = $(event.target).closest(".youtube-player").length;
    var out6 = $(event.target).closest(".youtube-player .play").length;

  	if (out1 === 0 && out2 === 0 && out3 === 0 && out4 === 0 && out5 === 0 && out6 === 0) {
  	     $("#snippet--konfiguraceInfoDetail").fadeOut();
         $("#snippet--konfiguraceInfoDetailContent").html('');
  	     var opened = false;
  	}
});

 $('body').on('click', "#detailInfoClose", function () {
    $("#snippet--konfiguraceInfoDetail").fadeOut();
    $("#snippet--konfiguraceInfoDetailContent").html('');
});
