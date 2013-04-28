(function(){
	function prepareCard(){
		var screen_width = $('body').innerWidth();
		var window_wrapper_width = screen_width - screen_width/10;
		var window_main_col_width = window_wrapper_width - 250;
		$('.window').css('left', (screen_width/20).toString() + 'px');
		$('.window-wrapper').css('width', window_wrapper_width.toString() + 'px');
		$('.window-main-col').css('width', window_main_col_width.toString() + 'px');
		$('.icon-lg.icon-close.dark-hover.js-close-window').on('click', function(){
				$('.window-wrapper').css('width', '100%');
		});
	};
	$('.list-card.js-member-droppable.clearfix.ui-droppable').on('click', function(){
		prepareCard();
	});
	prepareCard();
})();