
  GAME_WIDTH = 800;
  GAME_HEIGHT = 200;

  var sprites = [];
  var deck = [];
  var sprites = [];
  var cards = [];
  var oppCards = [];
  var validSubmission = [];
  var gameEnds = false;


  // Checks if game is over
  var update = function(){
    /*if (cards.length == 0 || oppCards.length == 0){
        gameEnds = true;
        alert('Game Over');
        window.location = "";
    }*/
  };

  var load = function (){
    for (i = 1; i < 53; i++){
      sprites.push(new Image());
      sprites[i-1].src = 'img/' + i + '.png';
      deck.push(i);
    }
  };

  // Sorts player cards by rank
  var sortCardsByRank = function(){
    cards.sort(function(a, b){
      return a.val - b.val;
    });
    updateCardsCoords(cards, "self-cards");
  };

  // Sorts player cards by suit
  var sortCardsBySuit = function(){
    sortCardsByRank();
    cards.sort(function(a,b){
      return a.val % 4 - b.val % 4;
    });
    updateCardsCoords(cards, "self-cards");
  };

  // Updates cards array keeping it consistent with html objects displayed
  var updateCardsCoords = function(arr, location){
      var change = arr.length - $("#" + location + "-container >").length;
      if (change > 0){
        for (i = 0; i < change; i++){
          $('#' + location + '-container').append('<div class=' + location + '></div>')
        }
      }
      else if (change < 0){
        for (i = 0; i < -change; i++){
          $('#' + location + '-container').children(location).last().remove();
        }
      }

      //change img source for each?
      var iter = $('#' + location + '-container').children().first();
      arr.forEach(function(e,i){
        iter.src = e.src;
        iter = iter.next();
      });
  };

  // Selects a card from the deck at random, removes and returns it
  var drawCard = function(){
    var random = Math.floor(Math.random() * deck.length);
    return deck.splice(random, 1);
  };

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
      updateCardsCoords(cards, "self-cards");
      updateCardsCoords(validSubmission, "middle-cards")
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
    updateCardsCoords(cards, "self-cards");
    updateCardsCoords(validSubmission, "middle-cards");
    //TODO: change turns
  };

  // Events for button clicks
  $('.sort-rank-button').on('click', sortCardsByRank());
  $('.sort-suit-button').on('click', sortCardsBySuit());
  $('.submit-button').on('click', submitCardsAndUpdate());
  $('.pass-button').on('click', pass());
  $('.cards-container').on('click', 'select-card', function(){
    $(this).toggleClass('selected');
    //change backend property of card to selected
  });


window.addEventListener("load", function(){

  // Initial set up - draws 17 cards for player and opponent
  for (i = 0; i < 17; i++){
        cards.push({
          val: drawCard(),
          selected: false,
          x: 0,
          y: 0,
          src: sprites[self.val]
        });
        oppCards.push(drawCard());
  }

  updateCardsCoords(cards, "self-cards");

});
