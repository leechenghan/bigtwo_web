// 1. add sorting for cards
// 2. timeout for submitting cards?
// 3. add turns?
// 4. implement game logic - how?

window.addEventListener("load", function(){

  var gameEnds = false;
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  var sprites = [];
  var removed;
  var mouseXCoords;
  var mouseYCoords;
  var selectedCards = [];
  var cardsCoords = [];
  var cards = [];
  var oppCards = [];
  var deck = [];
  for (i = 1; i < 52; i++){
    deck.push(i);
  }

  // can i get these constants from document.canvas?
  var GAME_WIDTH = 1000;
  var GAME_HEIGHT = 500;

  // 8 (2 spades) is biggest and 9 (3 diamonds) is smallest
  var sortCardsBySize = function(){
    cards.sort(function(a, b){
      if (a <= 7){
        a += 52;
      }
      if (b <= 7){
        b += 52;
      }
      return a - b
    });
  };

  //var sortCardsBySuit = function(){};

  // Updates coordinates for cards based on number of cards left
  var updateCardsCoords = function(){
    var y = 0.85 * GAME_HEIGHT;
    cardsCoords.length = 0;
    for (i = 0; i < cards.length; i++){
      cardsCoords.push([GAME_WIDTH/2 + (i - cards.length/2) * 50, y]);
    }
  };

  var drawCard = function(){
    var random = Math.floor(Math.random() * deck.length);
    console.log(random);
    return deck.splice(random, 1);
  };

  if (cards.length == 0 && oppCards == 0){
      for (i = 0; i < 17; i++){
        cards.push(drawCard());
        oppCards.push(drawCard());
      }
      updateCardsCoords();
      sortCardsBySize();
  }

  if (cards.length == 0 || oppCards == 0){
      gameEnds = true;
  }

  canvas.addEventListener("click", mouseAction);

  var mouseAction = function(){
    //find x y coords of mouse

    alert('x/y coords are:')

    /*if (position is at submit cards){
      submitCards();
    }
    else if (position is at card){
      selectCard();
    }*/
  };



  var submitCardsAndUpdate = function(){
    //check submit logic
    updateCardsCoords();
  };



  var update = function(){
    //move cards
  };

  if (gameEnds){
      alert('Game Over');
      window.location = "";
  }

  //check stuff
  var draw = function(){
  //clear the canvas
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    //draw background?
    //ctx.fillStyle = "#3333FF";
    //ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    //draw cards
    for (i = 0; i < cards.length; i++){
      ctx.drawImage(sprites[cards[i]], cardsCoords[i][0], cardsCoords[i][1]);
    }

    //draw submit button
    ctx.fillStyle = "#3333FF";
    ctx.fillRect(0,0,0,0);
  };

  var load = function (){
    for (i = 1; i < 53; i++){
      sprites.push(new Image());
      sprites[i-1].src = 'img/' + i + '.png';
    }
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
