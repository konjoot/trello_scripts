// ==UserScript==
// @name           Trello : Large Cards
// @author         Aaron Bond
// @version        1
// @include        https://trello.com/*
// @include        http://trello.com/*
// Modified script from http://blog.justin.kelly.org.au/trello-big-edit/ (Original credit goes to him!)
// @grant       none
// ==/UserScript==
function cardResize(){
    var screen_width = $('body').innerWidth();
    var window_wrapper_width = screen_width - screen_width/10;
    var window_main_col_width = window_wrapper_width - 220;
   // $('.window').css('left', (screen_width/20).toString() + 'px');
   // $('.window').css('width', window_wrapper_width.toString() + 'px');
   // $('.window-main-col').css('width', window_main_col_width.toString() + 'px');
    cssString = ' '+
        '.window{ '+
        '   left:' + (screen_width/20).toString() + 'px !important; ' +
        '   top:50px !important; ' +
        '   width:' + window_wrapper_width.toString() + 'px !important; '+
        '} '+
        ' '+
        '.window div.window-wrapper.clearfix div.clearfix div.window-main-col'+
        '{ '+
        '   width:' + window_main_col_width.toString() + 'px !important; '+
        '} ';
    
    insertCSS(cssString);
    // Function to insert CSS
    function insertCSS(cssToInsert) {
        var head=document.getElementsByTagName('head')[0];
        if(!head)
            return;
        var style=document.createElement('style');
        style.setAttribute('type','text/css');
        style.appendChild(document.createTextNode(cssToInsert));
        var old_style = head.getElementsByTagName('style')[0];
        if(old_style){
            head.replaceChild(style, old_style);
        }else{ 
            head.appendChild(style);
        }
    }
}
cardResize();
$(window).resize(cardResize);