// 1. timeout for submitting cards?
// 2. add turns?
// 3. implement game logic - how?

window.addEventListener("load", function(){

  var gameEnds = false;
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  var sprites = [];
  var validSubmission = [];
  var submitted = [];
  var cards = [];
  var oppCards = [];
  var deck = [];
  for (i = 1; i < 52; i++){
    deck.push(i);
  }

  var GAME_WIDTH = canvas.width;
  var GAME_HEIGHT = canvas.height;
  var BUTTON_X_POSITION = 760;
  var BUTTON_Y_POSITION = [];
  for (i = 0; i < 4; i++){
    BUTTON_Y_POSITION.push(168 + 60*i);
  }
  var BUTTON_HEIGHT = 45;
  var BUTTON_WIDTH = 160;

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
        oppCards.push({
          val: drawCard(),
        });
  }
  updateCardsCoords(cards, 0.85);

  var submitCardsAndUpdate = function(){
    cards.forEach(function(e, i){
      if (e.selected)
        submitted.push(e.val);
    });

    if (submitted.length == 0)
      pass();
    //(Checker.checkValidity(validSubmission, submitted))
    else if (1){
      for (i = cards.length-1; i >= 0; i--){
        if (cards[i].selected){
          validSubmission.push({
            val: cards.splice(i, 1)[0].val,
            x: 0,
            y: 0
          });
        }
      }
      submitted.length = 0;
      updateCardsCoords(cards, 0.85);
      updateCardsCoords(validSubmission, 0.5)
    }
    else{
      //Unselect cards
      cards.forEach(function(e, i){
          e.selected = false;
      });
    }

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
    updateCardsCoords(cards, 0.85);
    updateCardsCoords(validSubmission, 0.5);
    //change turns
  };

  var update = function(){
    if (cards.length == 0 || oppCards.length == 0){
        gameEnds = true;
        alert('Game Over');
        window.location = "";
    }
  };

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
        if (pos.x >= cards[i].x && pos.x <= cards[i].x + 32){
          cards[i].selected = !cards[i].selected;
        }
      }
    }
    else if (pos.x >= BUTTON_X_POSITION && pos.x <= BUTTON_X_POSITION + BUTTON_WIDTH){
      if (pos.y >= BUTTON_Y_POSITION[0] && pos.y <= BUTTON_Y_POSITION[0] + BUTTON_HEIGHT)
        sortCardsByRank(cards);
      else if (pos.y >= BUTTON_Y_POSITION[1] && pos.y <= BUTTON_Y_POSITION[1] + BUTTON_HEIGHT)
        sortCardsBySuit(cards);
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
    cards.forEach(function(e, i){
      ctx.drawImage(sprites[e.val], e.x, e.y - e.selected*20);
    });
    validSubmission.forEach(function(e, i){
      ctx.drawImage(sprites[e.val], e.x, e.y);
    });

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
    draw();
    update();
    if(!gameEnds){
      window.requestAnimationFrame(step);
    }
  };

  load();
  step();
});
