// ==UserScript==
// @name				Trello : Large Cards 2
// @author				konjoot
// @version				1.0
// @include				https://trello.com/*
// @include				http://trello.com/*
// Modified script from http://blog.justin.kelly.org.au/trello-big-edit/ (Original credit goes to him!)
// @grant				none
// ==/UserScript==
function cardResize(){
  var TAG_NAME = 'large-cards-1.0-css'
	var screen_width = $('body').innerWidth();
	var window_wrapper_width = screen_width - screen_width/10;
	var window_main_col_width = window_wrapper_width - 220;

	cssString = ' '+
		'.window:not(.slim):not(.archive){ '+
		'	 left:' + (screen_width/60).toString() + 'px !important; ' +
		'	 top:50px !important; ' +
		'	 width:' + window_wrapper_width.toString() + 'px !important; '+
		'} '+
		' '+
		'.window .card-detail-window.u-clearfix div.window-main-col.u-clearfix'+
		'{ '+
		'	 width: 84% !important;' +
		'} ';

	insertCSS(cssString);
	// Function to insert CSS
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

}

cardResize();
$(window).resize(cardResize);
