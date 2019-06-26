// TODO: add turns
// TODO: timeout for submitting cards?
// TODO: how to see last cards in middle before game ends?


window.addEventListener("load", function(){

  var gameEnds = false;
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  var sprites = [];
  var validSubmission = [];
  var cards = [];
  var oppCards = [];
  var deck = [];

  var BUTTON_X_POSITION = 760;
  var BUTTON_Y_POSITION = [];
  for (i = 0; i < 4; i++){
    BUTTON_Y_POSITION.push(168 + 60*i);
  }
  var BUTTON_HEIGHT = 45;
  var BUTTON_WIDTH = 160;


  // Loading pictures into sprites
  var load = function (){
    for (i = 1; i < 53; i++){
      sprites.push(new Image());
      sprites[i-1].src = 'img/' + i + '.png';
      deck.push(i-1);
    }
  };

  load();

  // Sorts player cards by rank
  var sortCardsByRank = function(arr){
    arr.sort(function(a, b){
      return a.val - b.val;
    });
    updateCardsCoords(arr, 0.85);
  };

  // Sorts player cards by suit
  var sortCardsBySuit = function(arr){
    sortCardsByRank(arr);
    arr.sort(function(a,b){
      return a.val % 4 - b.val % 4;
    });
    updateCardsCoords(arr, 0.85);
  };

  // Updates coordinates for cards based on number of cards left
  var updateCardsCoords = function(arr, frac){
      arr.forEach(function(e, i){
        e.x = GAME_WIDTH/2 + (i - arr.length/2) * 40;
        e.y = frac * GAME_HEIGHT;
      });
  };

  // Selects a card from the deck at random, removes and returns it
  var drawCard = function(){
    var random = Math.floor(Math.random() * deck.length);
    return deck.splice(random, 1);
  };

  // Initial set up - draws 17 cards for player and opponent
  for (i = 0; i < 17; i++){
        cards.push({
          val: drawCard(),
          selected: false,
          x: 0,
          y: 0
        });
        oppCards.push(drawCard());
  }

  updateCardsCoords(cards, 0.85);

  // Gets position of mouse relative to canvas
  var getMousePos = function(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
  }

  // Checks if middle val is between left and left + diff
  var isBetween = function(left, middle, diff){
    if (middle >= left && left+diff >= middle)
      return true;
    return false;
  }


  // Executes events on click - sorting, submitting, passing or selecting card
  canvas.addEventListener("click", function(evt){

    var pos = getMousePos(canvas, evt);

    if (isBetween(405, pos.y, 70)){
      for (i = 0; i < cards.length; i++){
        if (isBetween(cards[i].x, pos.x, 32))
          cards[i].selected = !cards[i].selected;
      }
    }

    else if (isBetween(BUTTON_X_POSITION, pos.x, BUTTON_WIDTH)){
      if (isBetween(BUTTON_Y_POSITION[0], pos.y, BUTTON_HEIGHT))
        sortCardsByRank(cards);
      else if (isBetween(BUTTON_Y_POSITION[1], pos.y, BUTTON_HEIGHT))
        sortCardsBySuit(cards);
      else if (isBetween(BUTTON_Y_POSITION[2], pos.y, BUTTON_HEIGHT))
        submitCardsAndUpdate();
      else if (isBetween(BUTTON_Y_POSITION[3], pos.y, BUTTON_HEIGHT))
        pass();
    }
  });

  // Logic after a card is submitted. Checks if move is valid and handles
  var submitCardsAndUpdate = function(){
    //TODO: (Checker.checkValidity(validSubmission, submitted) && myTurn)
    if (1){
      for (i = cards.length-1; i >= 0; i--){
        if (cards[i].selected)
          validSubmission.push({
            val: cards.splice(i, 1)[0].val,
            x: 0,
            y: 0
          });
      }
      updateCardsCoords(cards, 0.85);
      updateCardsCoords(validSubmission, 0.5)
      //change turns
    }
    cards.forEach(function(e, i){
          e.selected = false;
    });
  };

  var pass = function(){
    // Draw a card
    // TODO: && myTurn
    if (deck.length != 0)
      cards.push({
        val: drawCard(),
        selected: false,
        x: 0,
        y: 0
      });
    validSubmission.length = 0;
    updateCardsCoords(cards, 0.85);
    updateCardsCoords(validSubmission, 0.5);
    //TODO: change turns
  };

  // Checks if game is over
  var update = function(){
    if (cards.length == 0 || oppCards.length == 0){
        gameEnds = true;
        alert('Game Over');
        window.location = "";
    }
  };

  // Drawing all objects on canvas
  var draw = function(){
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    // Printing cards on screen
    cards.forEach(function(e, i){
      ctx.drawImage(sprites[e.val], e.x, e.y - e.selected*20);
    });
    validSubmission.forEach(function(e, i){
      ctx.drawImage(sprites[e.val], e.x, e.y);
    });

    // Drawing buttons
    ctx.fillStyle = "#000000";
    for (i = 0; i < BUTTON_Y_POSITION.length; i++){
      ctx.fillRect(BUTTON_X_POSITION,BUTTON_Y_POSITION[i],
                   BUTTON_WIDTH,BUTTON_HEIGHT);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText("Sort by Rank", 783, 198);
    ctx.fillText("Sort by Suit", 790, 258);
    ctx.fillText("Submit", 808, 318);
    ctx.fillText("Pass", 818, 378);
  };

  var step = function(){
    draw();
    update();
    if(!gameEnds){
      window.requestAnimationFrame(step);
    }
  };

  step();
});
