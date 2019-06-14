window.addEventListener("load", function(){

  var gameEnds = false;
  var canvas = document.getElementById("mycanvas");
  var cards = [];
  var cardsCoord = [];
  var oppCards = 17;
  var sprites = [];
  var i;

  if (cards.length == 0 || oppCards == 0){
      gameEnds = true;
  }

  var load = function(){
    for (i = 0; i < 51; i++){
      sprites.append(new Image());
      sprites[i].src = 'img/' + i + '.png';
    }
  };

  canvas.addEventListener("mousedown", mouseAction);

  var mouseAction = function(){
    //find x y coords of mouse
    //see which card it is and move it
    //or if its submit cards button then call a submitcards function
    if (position is at submit cards){
      submitCards();
    }
    else if (position is at card){
      selectCard();
    }
  };

  var submitCardsAndUpdate(){
    //check submit logic
    updateCardsCoords();
  };

  var update(){
    //move cards
  }

  if (gameEnds){
      alert('Game Over');
      window.location = "";
  }

  //check stuff
  var draw = function(){
  //clear the canvas
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    //draw cards
    for (i = 0; i < cards.length; i++){
      ctx.drawImage(sprites(cards[i], cardsCoords[0][0], cardsCoords[0][1]));
    }

    //draw submit button
    ctx.fillStyle = "#3333FF";
    ctx.fillRect(element.x, element.y, element.w, element.h);
  };

  var step = function(){
    update();
    draw();

    if(!gameEnds){
      window.requestAnimationFrame(step);
    }

  };

  load();
  step();
});
