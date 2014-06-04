(function () {
	'use strict';
	function Preload() {
		this.preloadBarBg = null;
		this.preloadBar = null;
	}

	Preload.prototype = {
		preload: function() {
			game.stage.backgroundColor = '#FFF';

			this.preloadBarBg = this.add.sprite(300, 400, 'loadingBG');
			this.preloadBar = this.add.sprite(304, 405, 'loading');
			this.load.image('block', '/assets/res/img/block.png');
			this.load.atlasJSONHash(
				'btts',
				'/assets/res/spritesheets/btts_small.png',
			  '/assets/res/spritesheets/btts_small.json'
		  );

			game.add.sprite(0, 0, 'frame');
			this.load.setPreloadSprite(this.preloadBar);
		},
		create: function() {
			this.preloadBar.cropEnabled = false;
			game.state.start('mainmenu');
		}
	};

	PreloaderS = Preload;
}());
