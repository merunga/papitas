'use strict';
var isMoving;
var BootS, PreloaderS, MainMenuS, PlayS, CreditsS, LeaderBoardsS, game;

var WebFontConfig;
WebFontConfig = {
	google: { families: [ 'Source+Code+Pro::latin' ] }
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

