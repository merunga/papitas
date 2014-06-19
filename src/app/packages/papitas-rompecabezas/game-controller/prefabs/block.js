NumberBlock = function (x, y, number) {
  var game = Rompecabezas.game;

  console.log("Inicia NumberBlock");
  this.number = number;
  this.position = 0;
  this.position0 = 1;
  Phaser.Sprite.call(this, game, x, y, 'bloques', 'bloque'+number);
  /*
  this.rect = new Phaser.Rectangle(25,50, 150,150);
  this.input.enableDrag(true,false,true,0,this.rect,null);
  this.input.enableSnap(50,50,true,false,0,0);
  */

  //  Listen for input events on this sprite
  //this.inputEnabled = true;

  //this.input.enableDrag(true);
  //this.events.onInputDown.add(this.onDown, this);
  //this.events.onInputOut.add(outSprite, this);
  this.txt = game.add.text(x + 100, y + 30, number, {
    font: "250px Source Code Pro",
    fill: "#000000",
    align: "center",
    weight: "bold"
  });

  var text = this.txt;
  Deps.autorun(function() {
    if(!Session.get('rompecabezasHelpOn')) {
      text.fontSize = 1;
    } else {
      text.fontSize = 250;
    }
  });
};

NumberBlock.prototype = Object.create(Phaser.Sprite.prototype);
NumberBlock.prototype.constructor = NumberBlock;

NumberBlock.prototype.update = function() {
  this.txt.x = this.x + 100;
  this.txt.y = this.y + 30;
};

NumberBlock.prototype.move = function(_to){
  var game = Rompecabezas.game;
  var blockDimension = Rompecabezas.blockDimension;

  var e = game.add.tween(this);
  var t = game.add.tween(this.txt);
  e.onStart.add(function(){Rompecabezas.isMoving = true;});
  e.onComplete.add(function(){Rompecabezas.isMoving = false;})
  switch(_to){
    case 'left':
    e.to({ x: this.x - blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ x: this.txt.x - blockDimension }, 250,null);
    t.start();
    e.start();
    break;
    case 'up':
    e.to({ y: this.y - blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ y: this.txt.y - blockDimension }, 250,null);
    t.start();
    e.start();
    break;
    case 'right':
    e.to({ x: this.x + blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ x: this.txt.x + blockDimension }, 250,null);
    t.start();
    e.start();
    break;
    case 'down':
    e.to({ y: this.y + blockDimension }, 250, Phaser.Easing.Linear.None, false, 0 , 0, false);
    t.to({ y: this.txt.y + blockDimension }, 250,null);
    t.start();
    e.start();
    break;

  }
}

NumberBlock.prototype.onDown = function(){
  console.log(this.parent.arrNumbs);
  this.position = this.parent.checkPosition(this.number);
  this.position0= this.parent.checkPosition(0);

  if (this.position - this.position0 !== 0){
    switch(this.position){
      case 0:
      switch(this.position0){
        case 1:
        this.move(3);
        break;
        case 3:
        this.move(2);
        break;
        default:
        return;
      }
      break;
      case 1:
      switch(this.position0){
        case 0:
        this.move(1);
        break;
        case 2:
        this.move(3);
        break;
        case 4:
        this.move(4);
        break;
        default:
        return;
      }
      break;
      case 2:
      switch(this.position0){
        case 1:
        this.move(1);
        break;
        case 5:
        this.move(4);
        break;
        default:
        return;
      }
      break;
      case 3:
      switch(this.position0){
        case 0:
        this.move(2);
        break;
        case 4:
        this.move(3);
        break;
        case 6:
        this.move(4);
        break;
        default:
        return;
      }
      break;
      case 4:
      break;
      case 5:
      break;
      case 6:
      break;
      case 7:
      break;
      case 8:
      break;
    }
  }
  console.log('Numbs: ' + this.parent.arrNumbs);
  console.log(this.parent.arrNumbs);


}
