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
	red: {orange: [], yellow: [], blue: [], green: [], other: []}, 
	purple: {orange: [], yellow: [], blue: [], green: [], other: []}, 
	other: {orange: [], yellow: [], blue: [], green: [], other: []}
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
	var cards_tree_copy = JSON.parse(JSON.stringify(cards_tree));
	var cards_containers_copy = JSON.parse(JSON.stringify(cards_containers));

	$('.js-cards-content div.float-cards').each(function(){
		var container = $(this);
		console.log("\n");
		console.log(container.prev().find('h3').text());
		$.each(cards_tree_copy, function(key, val){
			$.each(val, function(k, v){
				// console.log('key=' + key);
				// console.log('k=' + k);
				if(key == 'other'){
					if(k == 'other'){
						// console.log($(container).find('div.list-card-container').detach());
						v.push($(container).find('div.list-card-container').detach());
						// console.log(v);
					}else{
						// console.log($(container).find('.' + k + '-label').parents('div.list-card-container').detach());
						v.push($(container).find('.' + k + '-label').parents('div.list-card-container').detach());
						// console.log(v);
					}
				}else{
					if(k == 'other'){
						// console.log($(container).find('.' + key + '-label').parents('div.list-card-container').detach());
						v.push($(container).find('.' + key + '-label').parents('div.list-card-container').detach());
						// console.log(v);
					}else{
						// console.log($(container).find('.' + key + '-label').parents('div.js-card-labels').find('.' + k + '-label').parents('div.list-card-container').detach());
						v.push($(container).find('.' + key + '-label').parents('div.js-card-labels').find('.' + k + '-label').parents('div.list-card-container').detach());
						// console.log(v);
					}
				}
			});
		});
		console.log(cards_tree_copy);
		// console.log(cards_tree_copy);
		$.each(cards_tree_copy, function(key, val){
			console.log(key);
			console.log(val.length());
			$.each(val, function(k, v){
				// console.log(v);
				while(v.length > 0){
					$(v.shift()).appendTo($(cards_containers_copy[key]));
				}
			});
		});

		console.log('cards_containers');
		console.log(cards_containers);

		$.each(cards_containers_copy, function(key, val){
			if($(val).find('div.list-card-container').length > 0){
				// console.log($(container));
				// console.log(val);
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
		callback: sortCards(cards_tree, cards_containers),
		queries: [{
			element: '.window-module'
		}]
	});
}

$(insertCSS(CSS_STRING));
$(sortCards(cards_tree, cards_containers));
// addJavascript('head', initSort);
