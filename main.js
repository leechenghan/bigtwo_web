
  GAME_WIDTH = 1000;
  GAME_HEIGHT = 200;

  var sprites = [];
  var deck = [];

  var load = function (){
    for (i = 1; i < 53; i++){
      sprites.push(new Image());
      sprites[i-1].src = 'img/' + i + '.png';
      deck.push(i-1);
    }
  };

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

  // Events for button clicks
  $('.sort-rank-button').on('click', sortCardsByRank());
  $('.sort-suit-button').on('click', sortCardsBySuit());
  $('.submit-button').on('click', submit());
  $('.pass-button').on('click', pass());
  $('.cards-container').on('click', 'select-card', function(){
    $(this).select == !$(this).select;
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
    update();
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


window.addEventListener("load", function(){

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


};
