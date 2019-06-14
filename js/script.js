// 1. add sorting for cards
// 2. timeout for submitting cards?
// 3. add turns?
// 4. implement game logic - how?

window.addEventListener("load", function(){

  var BUTTON_X_POSITION = 760;
  var BUTTON_Y_POSITION = [];
  for (i = 0; i < 4; i++){
    BUTTON_Y_POSITION.push(168 + 60*i);
  }
  var BUTTON_HEIGHT = 45;
  var BUTTON_WIDTH = 160;

  var gameEnds = false;
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  var sprites = [];
  var removed;
  var mouseXCoords;
  var mouseYCoords;
  var validSubmission = [];
  var submitted = [];
  var cardsCoords = [];
  var middleCardsCoords = [];
  var cards = [];
  var oppCards = [];
  var deck = [];
  for (i = 1; i < 52; i++){
    deck.push(i);
  }

  // TODO: can i get these constants from document.canvas?
  var GAME_WIDTH = 1000;
  var GAME_HEIGHT = 500;

  // TODO: optimize logic
  // Card number 8 or 2 spades (arr idx 7) is biggest and
  // card number 9 or 3 diamonds (arr idx 8) is smallest
  var sortCardsByRank = function(){
    cards.sort(function(a, b){
      var a, b;
      if (a.val <= 7)
          a = a.val + 52;
      else
          a = a.val;
      if (b.val <= 7)
        b = b.val + 52;
      else
        b = b.val;
      return a - b;
    });
  };

  var sortCardsBySuit = function(){
    sortCardsByRank();
    cards.sort(function(a,b){
      return a.val % 4 - b.val % 4;
    });
  };

  // Updates coordinates for cards based on number of cards left
  var updateCardsCoords = function(){
      cardsCoords.length = 0;
      for (i = 0; i < cards.length; i++){
        cardsCoords.push({
          x: GAME_WIDTH/2 + (i - cards.length/2) * 40,
          y: 0.85 * GAME_HEIGHT
        });
      }
      middleCardsCoords.length = 0;
      for (i = 0; i < validSubmission.length; i++){
        middleCardsCoords.push({
          x: GAME_WIDTH/2 + (i - validSubmission.length/2) * 40,
          y: 0.5 * GAME_HEIGHT
        });
      }
  };

  var drawCard = function(){
    var random = Math.floor(Math.random() * deck.length);
    return deck.splice(random, 1);
  };

  if (cards.length == 0 && oppCards == 0){
      for (i = 0; i < 17; i++){
        cards.push({
          val: drawCard(),
          selected: false
        });
        oppCards.push({
          val: drawCard(),
          selected: false
        });
      }
      updateCardsCoords();
  }

  var submitCardsAndUpdate = function(){
    //check submit logic
    submitted.length = 0;
    for (i = 0; i < cards.length; i++){
      if (cards[i].selected)
        submitted.push(cards[i].val);
    }
    if (submitted.length == 0)
      pass();
    //if its a valid submission
    else if (1){
      for (i = cards.length - 1; i >= 0; i--){
        if (cards[i].selected)
          cards.splice(i, 1);
      }
      validSubmission = submitted;
    }
    updateCardsCoords();
  };

  var pass = function(){
    //draw a card
    if (deck.length != 0){
      cards.push({
        val: drawCard(),
        selected: false
      });
    }
    validSubmission.length = 0;
    updateCardsCoords();
    //change turns
  };

  var update = function(){
    //move cards
  };

  if (cards.length == 0 || oppCards.length == 0){
      gameEnds = true;
  }

  if (gameEnds){
      alert('Game Over');
      window.location = "";
  }

  function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
  }

  canvas.addEventListener("click", function(evt){
    //find x y coords of mouse
    var pos = getMousePos(canvas, evt);

    if (pos.y >= 405 && pos.y <= 475){
      //select cards by x coord
      for (i = 0; i < cards.length; i++){
        if (pos.x >= cardsCoords[i].x && pos.x <= cardsCoords[i].x + 32){
          cards[i].selected = !cards[i].selected;
        }
      }
    }
    else if (pos.x >= BUTTON_X_POSITION && pos.x <= BUTTON_X_POSITION + BUTTON_WIDTH){
      if (pos.y >= BUTTON_Y_POSITION[0] && pos.y <= BUTTON_Y_POSITION[0] + BUTTON_HEIGHT)
        sortCardsByRank();
      else if (pos.y >= BUTTON_Y_POSITION[1] && pos.y <= BUTTON_Y_POSITION[1] + BUTTON_HEIGHT)
        sortCardsBySuit();
      else if (pos.y >= BUTTON_Y_POSITION[2] && pos.y <= BUTTON_Y_POSITION[2] + BUTTON_HEIGHT)
        submitCardsAndUpdate();
      else if (pos.y >= BUTTON_Y_POSITION[3] && pos.y <= BUTTON_Y_POSITION[3] + BUTTON_HEIGHT)
        pass();
    }
  });

  // Draw cards
  var draw = function(){
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    // Printing cards on screen
    for (i = 0; i < cards.length; i++){
      ctx.drawImage(sprites[cards[i].val], cardsCoords[i].x,
                    cardsCoords[i].y - cards[i].selected*20);
    }
    for (i = 0; i < validSubmission.length; i++){
      console.log(validSubmission[i])
      ctx.drawImage(sprites[validSubmission[i]], middleCardsCoords[i].x,
                    middleCardsCoords[i].y);
    }

    // Drawing buttons
    ctx.fillStyle = "#000000";
    for (i = 0; i < BUTTON_Y_POSITION.length; i++){
      ctx.fillRect(BUTTON_X_POSITION,BUTTON_Y_POSITION[i],BUTTON_WIDTH,BUTTON_HEIGHT);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText("Sort by Rank", 783, 198);
    ctx.fillText("Sort by Suit", 790, 258);
    ctx.fillText("Submit", 808, 318);
    ctx.fillText("Pass", 818, 378);
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
