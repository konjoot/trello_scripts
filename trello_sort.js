// ==UserScript==
// @name			Trello : Sorted cards
// @author			konjoot
// @version			0.2
// @include			https://trello.com/*/cards
// @include			http://trello.com/*/cards
// @grant				none
// ==/UserScript==

// function addJavascript(jsname,pos) {
// 	var th = document.getElementsByTagName(pos)[0];
// 	var s = document.createElement('script');
// 	s.setAttribute('type','text/javascript');
// 	s.setAttribute('src',jsname);
// 	th.appendChild(s);
// }

function addJavascript(pos, funct) {
	$.get( "https://rawgithub.com/konjoot/TrelloBookmarklet/master/libs/mutation_summary.js", function( data, callback ) {
		$(pos).append('<script type="text/javascript">' + data + '</script>');
		funct();
	});
}


// var glob = this;

// function resetTimer(timer){
// 	if(timer){
// 		clearTimeout(timer);
// 	};
// 	timer=setTimeout(glob.sortCards,1000);
// }

function sortCards(){
	cssString = '\
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
	
	insertCSS(cssString);

	var cards = {};
	cards.red = {orange: [], yellow: [], blue: [], other: [], green: []};
	cards.purple = {orange: [], yellow: [], blue: [], other: [], green: []};
	cards.other = {orange: [], yellow: [], blue: [], other: [], green: []};

	$('.js-cards-content div.float-cards').each(function(){
		var container = $(this);
		container.find('div.list-card-container').each(function(){
			var card = $(this)
			if(card.find('span.red-label').length > 0){
				if(card.find('span.orange-label').length > 0){
					cards.red.orange.push(card.detach());
				}else if(card.find('span.yellow-label').length > 0){
					cards.red.yellow.push(card.detach());
				}else if(card.find('span.blue-label').length > 0){
					cards.red.blue.push(card.detach());
				}else if(card.find('span.green-label').length > 0){
					cards.red.green.push(card.detach());
				}else{
					cards.red.other.push(card.detach());
				}
			}else if(card.find('span.purple-label').length > 0){
				if(card.find('span.orange-label').length > 0){
					cards.purple.orange.push(card.detach());
				}else if(card.find('span.yellow-label').length > 0){
					cards.purple.yellow.push(card.detach());
				}else if(card.find('span.blue-label').length > 0){
					cards.purple.blue.push(card.detach());
				}else if(card.find('span.green-label').length > 0){
					cards.purple.green.push(card.detach());
				}else{
					cards.purple.other.push(card.detach());
				}
			}else{
				if(card.find('span.orange-label').length > 0){
					cards.other.orange.push(card.detach());
				}else if(card.find('span.yellow-label').length > 0){
					cards.other.yellow.push(card.detach());
				}else if(card.find('span.blue-label').length > 0){
					cards.other.blue.push(card.detach());
				}else if(card.find('span.green-label').length > 0){
					cards.other.green.push(card.detach());
				}else{
					cards.other.other.push(card.detach());
				}
			}
		});
		var red = $('<div class="red"></div>');
		var purple = $('<div class="purple"></div>');
		var other = $('<div class="other"></div>');
		$.each(cards.red, function(){
			while(this.length > 0){
				$(this.shift()).appendTo($(red));
			}
		});
		$.each(cards.purple, function(){
			while(this.length > 0){
				$(this.shift()).appendTo($(purple));
			}
		});
		$.each(cards.other, function(){
			while(this.length > 0){
				$(this.shift()).appendTo($(other));
			}
		});
		$.each([red, purple, other], function(){
			if(this.find('div.list-card-container').length > 0){
				container.append(this);
			}
		});
	});

	function insertCSS(cssToInsert) {
		var head=document.getElementsByTagName('head')[0];
		if(!head)
				return;
		var style=document.createElement('style');
		style.setAttribute('type','text/css');
		style.appendChild(document.createTextNode(cssToInsert));
		var old_style = head.getElementsByTagName('style');
		if(old_style.length > 0){
				head.replaceChild(style, old_style[0]);
		}else{
				head.appendChild(style);
		}
	}
}

function initSort(){
	var observer = new MutationSummary({
		callback: sortCards,
		queries: [{
			element: '.window-module'
		}]
	});
}

$(sortCards);
addJavascript('head', initSort);

// function cardsUpdate(summaries){
// 	var timer = setTimeout(glob.sortCards, 1000);
// 	summaries[0].added.forEach(resetTimer(timer));
// }

// function initR(){
//  $('ul.pop-over-list.checkable').on('click','a', function(e){e.stopPropagation(); alert('dfdfd');});
// }
// $('.window-module.gutter').on('click', 'a', function(){setTimeout(initR, 1);});

// $('.pop-over-list.checkable').on('click', 'li', function(){setTimeout(initSort, 1000);});

// function getAlert(){
// 	alert('it\'s alive');
// 	var observer = new MutationSummary({
// 		callback: cardsCheck,
// 		queries: [{element: '.window-module'}
// 	]});
// }


