// ==UserScript==
// @name			Trello : Sorted cards
// @author			konjoot
// @version			0.2
// @include			https://trello.com/*/cards
// @include			http://trello.com/*/cards
// @grant				none
// ==/UserScript==

var TAG_NAME = 'sorted-cards-0.2-css'

//Allowed labels: red, purple, orange, yellow, blue, green, other(for cards without any label)

//for these json you must define css styles (class names in CSS must be same as keys in this json), like that:
var cards_tree = {
	red: {orange: [], yellow: [], blue: [], other: [], green: []}, 
	purple: {orange: [], yellow: [], blue: [], other: [], green: []}, 
	other: {orange: [], yellow: [], blue: [], other: [], green: []}
};

var cards_containers = {
	red: $('<div class="red"></div>'),
	purple: $('<div class="purple"></div>'),
	other: $('<div class="other"></div>')
};

var CSS_STRING = '\
.red{\
	background: none repeat scroll 0 0 rgba(244, 78, 78, 0.2);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}\
.purple{\
	background: none repeat scroll 0 0 rgba(153, 51, 204, 0.1);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}\
.other{\
	background: none repeat scroll 0 0 rgba(82, 121, 214, 0.2);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}';


function addJavascript(pos, funct) {
	$.get( "https://rawgithub.com/konjoot/TrelloBookmarklet/master/libs/mutation_summary_min.js", function( data, callback ) {
		$(pos).append('<script type="text/javascript">' + data + '</script>');
		funct();
	});
}

function sortCards(cards_tree, cards_containers){
	

	$('.js-cards-content div.float-cards').each(function(){
		var container = $(this);
		$.each(cards_tree, function(key, val){
			$.each(val, function(k, v){
				if(key == 'other'){
					if(k == 'other'){
						v.push($(container).find('div.list-card-container').detach());
					}else{
						v.push($(container).find('.' + k + '-label').parents('div.list-card-container').detach());
					}
				}else{
					if(k == 'other'){
						v.push($(container).find('.' + key + '-label').parents('div.list-card-container').detach());
					}else{
						v.push($(container).find('.' + key + '-label').parents('div.js-card-labels').find('.' + k + '-label').parents('div.list-card-container').detach());
					}
				}
			});
		});

		$.each(cards_tree, function(key, val){
			$.each(val, function(k, v){
				while(v.length > 0){
					$(v.shift()).appendTo($(cards_containers[key]));
				}
			});
		});
		console.log(cards_containers);
		$.each(cards_containers, function(key, val){
			if($(val).find('div.list-card-container').length > 0){
				$(container).append($(val));
			}
		});
	});
}

function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
			return;
	var style=document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.setAttribute('id', TAG_NAME);
	style.appendChild(document.createTextNode(cssToInsert));
	var old_style = document.getElementById(TAG_NAME);
	if(old_style){
			head.replaceChild(style, old_style);
	}else{
			head.appendChild(style);
	}
}

function initSort(){
	var observer = new MutationSummary({
		callback: sortCards(HEAD_LABELS),
		queries: [{
			element: '.window-module'
		}]
	});
}

$(insertCSS(CSS_STRING));
$(sortCards(cards_tree, cards_containers));
addJavascript('head', initSort);
