Board = function (arrNumbs) {
  Phaser.Group.call(this, Rompecabezas.game);
  this.h = 0;
  this.isFinal = false;
  this.isSolvable = false;
  this.moves = 0;
  this.totalCost = 0;
  this.position0 = 0;
  if(arrNumbs){
    this.arrNumbs = arrNumbs;
  }
  else {
    arrNumbs = [];
  }
};

Board.prototype = Object.create(Phaser.Group.prototype);
Board.prototype.constructor = Board;

Board.prototype.genFinal = function (){
  this.moves = 0;
  this.arrNumbs = [1,2,3,4,5,6,7,8,0];
};

Board.prototype.genRandom = function (){
  this.arrNumbs = [];
  this.moves = 0;
  this.clearBoard();
  var tempArr = [1,2,3,4,5,6,7,8,0];
  this.arrNumbs = Phaser.Utils.shuffle(tempArr);
  if (this.checkSolvable(this.arrNumbs)) {
    this.isSolvable = true;
    this.logBoard();
  }else {
    this.genRandom();
  }
};

Board.prototype.genTest = function (){
  this.arrNumbs = [];
  this.moves = 0;
  this.clearBoard();
  //this.arrNumbs = [1, 0, 3, 7, 2, 5, 8, 4, 6];
  //this.arrNumbs = [6,1,4,0,2,5,3,7,8 ];
  this.arrNumbs = [1,2,3,4,5,6,0,7,8 ];
  console.log('Solvable: ' + this.checkSolvable(this.arrNumbs));
  this.logBoard();
};

Board.prototype.checkSolvable = function (arr){
  var inversion = 0;
  var i = 0;
  var j = 0;
  for (i = arr.length - 1; i >= 0; i--) {
    for (j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[i] && arr[i] !== 0 && arr[j] !== 0){
        inversion++;
      }
    }
  }
  if (inversion % 2 === 0){
    console.log('Solvable - ' + arr + ' - ' + inversion);
    return true;
  }
  else{
    console.log('Unsulvable - ' + arr + ' - ' + inversion);
    return false;
  }
}

Board.prototype.equals = function (board){
  if (!board) {
    return false;
  }
  if (!board.arrNumbs) {
    return false;
  }
  if (this.arrNumbs.length !== board.arrNumbs.length) {
    return false;
  }
  var i = 0;

  for (i = this.arrNumbs.length - 1; i >= 0; i--) {
    if(this.arrNumbs[i] != board.arrNumbs[i]){
      return false;
    }
  }
  return true;
};

Board.prototype.logBoard = function(){
  console.log('Board: ' + this.arrNumbs);
};

Board.prototype.checkPosition = function(_numb){
  var i = 0;
  for (i = this.arrNumbs.length - 1; i >= 0; i--) {
    if(this.arrNumbs[i] === _numb){
      return i;
    }
  }
}

Board.prototype.draw = function(){
  var blockDimension = Rompecabezas.blockDimension;
  this.clearBoard(this);
  var k = 0,
  i = 0,
  j = 0;
  var tmpBlock = {};
  for (i = 3; i > 0; i--)
  {
    for (j = 3; j > 0; j--){
      if (this.arrNumbs[k] !== 0){
        tmpBlock = new NumberBlock((j-3)*-blockDimension, (i-3)*-blockDimension,this.arrNumbs[k],this);
        this.add(tmpBlock);
      }
      k++;
    }
  }
};

Board.prototype.clearBoard = function(){
  this.forEach(this.clearTxt,this,true);
  this.removeAll();
};

Board.prototype.calcHueristic = function(){
  var h = 0;
  var i = 0;
  for (i = this.arrNumbs.length - 1; i >= 0; i--) {
    if(this.arrNumbs[i] !== 0){
      h +=  Math.abs(i - (this.arrNumbs[i] - 1));
    }
  }
  this.h = h;
};

Board.prototype.calcTotalCost = function(){
  this.totalCost = this.moves + this.h;
};

Board.prototype.clearTxt = function(child){
  child.txt.destroy();
};

Board.prototype.move = function(_where){
  if(Rompecabezas.isMoving){
    return false;
  }
  Rompecabezas.isMoving = true;
  this.position0 = this.checkPosition(0);
  var numberblock = {};
  if(_where === 'up'){
    if(this.position0 >= 6 && this.position0 <= 8){
      Rompecabezas.isMoving = false;
      return false;
    }else{
      numberblock = this.getAt(this.position0 + 2);
      numberblock.move(_where);

      this.remove(numberblock);
      this.addAt(numberblock,this.position0);

      this.arrNumbs[this.position0] = this.arrNumbs[this.position0 + 3];
      this.arrNumbs[this.position0 + 3] = 0;
    }
  }else if(_where == 'down'){
    if(this.position0 >= 0 && this.position0 <= 2){
      Rompecabezas.isMoving = false;
      return false;
    }else{
      numberblock = this.getAt(this.position0 - 3);
      numberblock.move(_where);

      this.remove(numberblock);
      this.addAt(numberblock,this.position0 -1);

      this.arrNumbs[this.position0] = this.arrNumbs[this.position0 - 3];
      this.arrNumbs[this.position0 - 3] = 0;
    }
  }else if(_where == 'right'){
    if(this.position0 === 0 || this.position0 === 3 || this.position0 === 6){
      Rompecabezas.isMoving = false;
      return false;
    }else{
      numberblock = this.getAt(this.position0 - 1);
      numberblock.move(_where);

      this.remove(numberblock);
      this.addAt(numberblock,this.position0 - 1);

      this.arrNumbs[this.position0] = this.arrNumbs[this.position0 - 1];
      this.arrNumbs[this.position0 - 1] = 0;
    }
  }else if(_where == 'left'){
    if(this.position0 === 2 || this.position0 === 5 || this.position0 === 8){
      Rompecabezas.isMoving = false;
      return false;
    }else{
      numberblock = this.getAt(this.position0);
      numberblock.move(_where);

      this.remove(numberblock);
      this.addAt(numberblock,this.position0);

      this.arrNumbs[this.position0] = this.arrNumbs[this.position0 + 1];
      this.arrNumbs[this.position0 + 1] = 0;
    }
  }

  Rompecabezas.isMoving = false;
  this.moves ++;

  function arrEquals(one, another) {
    // if the other array is a falsy value, return
    if (!another){
      return false;
    }

    // compare lengths - can save a lot of time
    if (one.length != another.length){
      return false;
    }

    for (var i = 0, l=one.length; i < l; i++) {
      // Check if we have nested arrays
      if (one[i] instanceof Array && another[i] instanceof Array) {
        // recurse into the nested arrays
        if (!one[i].compare(another[i])){
          return false;
        }
      }
      else if (one[i] != another[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  }

  var arrFinal = [1,2,3,4,5,6,7,8,0];
  if( arrEquals(this.arrNumbs, arrFinal) ) {
    this.isFinal = true;
    Rompecabezas.resuelto();
  }
  //this.logBoard();

  return true;
};
