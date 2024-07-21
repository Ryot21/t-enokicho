// JavaScript Document

$(function () {
	$.ajax({
		type: 'GET',
		url: 'https://graph.facebook.com/v6.0/17841408620330101?fields=name%2Cmedia.limit(9)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cthumbnail_url%2Cmedia_type%2Cusername%7D&access_token=EAAO9lO0z8oUBOxHPZCQZALcnNc1MUbq3mGv9snwMrfDHza8WZAefk9OJqLpGlPQWsxX25fZC0EUQrtZCECOo3O9EiGPcB1pkt2HlWpzaPOaGuLCoA8HwqDoJueT1SVlRIey0a3daohq2gumOiZAMIkoZBf4IuZCse8KyZBZCd99UIk8E36XVeyvx7QZBxZB7ZCoJIqtMZD',
		dataType: 'json',
		success: function (json) {

			var html = '';
			var insta = json.media.data;
			for (var i = 0; i < insta.length; i++) {
				var media_type = insta[i].media_type;
				if (insta[i].media_type == "IMAGE" || insta[i].media_type == "CAROUSEL_ALBUM") {
					html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].media_url + '"></span></a></li>';
				} else if (media_type == "VIDEO") {
					html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><span class="square-content"><img src="' + insta[i].thumbnail_url + '"></span></a></li>';
					var media_type = '';
				}
			}
			$(".insta_lists").append(html);
		},
		error: function () {

			//エラー時の処理
		}
	});
});

