
  GAME_WIDTH = 800;
  GAME_HEIGHT = 200;

  var sprites = [];
  var deck = [];
  var sprites = [];
  var cards = [];
  var oppCards = [];
  var validSubmission = [];
  var gameEnds = false;
  var card = undefined;

  // Checks if game is over
  var update = function(){
    if (cards.length == 0 || oppCards.length == 0){
        gameEnds = true;
        alert('Game Over');
        window.location = "";
    }
  };

  // Loads card images into var array
  var load = function (){
    for (i = 1; i < 53; i++){
      sprites.push(new Image());
      sprites[i-1].src = 'img/' + i + '.png';
      deck.push(i);
    }
  };

  // Sorts player cards by rank
  var sortCardsByRank = function(arr){
    arr.sort(function(a, b){
      return a.val - b.val;
    });
    updateCardsPos(cards, "self-cards");
  };

  // Sorts player cards by suit
  var sortCardsBySuit = function(){
    sortCardsByRank(cards);
    cards.sort(function(a,b){
      return a.val % 4 - b.val % 4;
    });
    updateCardsPos(cards, "self-cards");
  };

  // Updates cards array to be consistent with html objects displayed
  var updateCardsPos = function(arr, location){
    var change = arr.length - $("#" + location + "-container >").length;
    if (change > 0){
      for (i = 0; i < change; i++){
        $('#' + location + '-container').append('<div class=' + location + '></div>')
      }
    }
    else if (change < 0){
      for (i = 0; i < -change; i++){
        $('#' + location + '-container').children().last().remove();
      }
    }

    var iter = $('#' + location + '-container').children().first();
    arr.forEach(function(e,i){
      iter.html(e.src);
      iter = iter.next();
    });
  };

  // Selects a card from the deck at random, removes from deck and returns it
  var drawCard = function(){
    var random = Math.floor(Math.random() * deck.length);
    return deck.splice(random, 1)[0];
  };

  // Logic after a card is submitted. Checks if move is valid and handles
  var submitCardsAndUpdate = function(){
    //TODO: (Checker.checkValidity(validSubmission, submitted) && myTurn)
    if (1){
      validSubmission.length = 0;
      for (i = cards.length-1; i >= 0; i--){
        if (cards[i].selected){
          card = cards.splice(i, 1)[0];
          validSubmission.push({
            val: card.val,
            src: card.src
          });
        }
      }
      console.log(validSubmission);
      updateCardsPos(cards, "self-cards");
      sortCardsByRank(validSubmission);
      updateCardsPos(validSubmission, "middle-cards")
      //change turns
    }
    cards.forEach(function(e, i){
          e.selected = false;
    });
    update();
  };

  // Passes your turn
  var pass = function(){
    // Draw a card
    // TODO: && myTurn
    if (deck.length != 0){
      var newVal = drawCard();
      cards.push({
        val: newVal,
        selected: false,
        src: sprites[newVal]
      });
    }
    updateCardsPos(cards, "self-cards");
    updateCardsPos(validSubmission, "middle-cards");
    //TODO: change turns
  };

// TODO: improve logic for finding buttons
$(document).ready(function(){
  // Events for button clicks
  $('#button-container')
    .children()
    .first()
    .children()
    .on('click', function(){
      sortCardsByRank(cards)
    });
  $('#button-container')
    .children()
    .first().next()
    .children()
    .on('click', sortCardsBySuit);
  $('#button-container')
    .children()
    .last().prev()
    .children()
    .on('click', submitCardsAndUpdate);
  $('#button-container')
    .children()
    .last()
    .children()
    .on('click', pass);

  $('#self-cards-container')
    .on('click', '.self-cards', function(){
    //fix toggling class
    $(this).toggleClass('selected');
    console.log($(this));
    cards[$(this).index()].selected = !cards[$(this).index()].selected;
  });
});


window.addEventListener("load", function(){

  load();

  // Initial set up - draws 17 cards for player and opponent
  for (i = 0; i < 17; i++){
        var newVal = drawCard();
        cards.push({
          val: newVal,
          selected: false,
          src: sprites[newVal-1]
        });
        oppCards.push(drawCard());
  }
  updateCardsPos(cards, "self-cards");
});
