Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array){
    return false;
  }

  // compare lengths - can save a lot of time
  if (this.length != array.length){
    return false;
  }

  for (var i = 0, l=this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].compare(array[i])){
        return false;
      }
    }
    else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}

var isMoving;

Meteor.startup(function(){
  isMoving = false;
  game = new Phaser.Game(900, 1200, Phaser.AUTO, 'rompecabezas-container');

  game.state.add('boot', BootState);
  game.state.add('preloader', PreloaderState);
  game.state.add('credits', CreditsState);
  game.state.add('leaderboards', LeaderBoardsState);
  game.state.add('mainmenu', MainMenuState);
  game.state.add('play', PlayState);
  game.state.start('boot');
});
