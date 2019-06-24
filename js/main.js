  var newCardStructure = [];
  var sprites = [];
  var deckLeft = [];
  var deck = [];
  var sprites = [];
  var submitted = [];
  var cards = [];
  var oppCards = [];
  var validSubmission = [];
  var gameEnds = false;
  var card = undefined;
  var turn = false;

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
      deckLeft.push(i);
      deck.push({
        val: i,
        idx: undefined,
        src: sprites[i-1],
        selected: false
      });
    }
  };

  // Sorts player cards by rank
  var sortCardsByRank = function(arr){
    arr.sort(function(a, b){
      return a.val - b.val;
    });
    updateCardDisplay(cards, "self-cards");
    return arr;
  };

  // Sorts player cards by suit
  var sortCardsBySuit = function(){
    sortCardsByRank(cards);
    cards.sort(function(a,b){
      return a.val % 4 - b.val % 4;
    });
    updateCardDisplay(cards, "self-cards");
  };

  // Updates cards array to be consistent with html objects displayed
  var updateCardDisplay = function(arr, location){

    updateCardsHTML(arr, location);

    cards.forEach(function(e, i){
      if (!$('#self-cards-container')
            .children()
            .eq(i)
            .hasClass('selected')
          && e.selected
      )
        $('#self-cards-container')
          .children()
          .eq(i)
          .addClass('selected');

      else if ($('#self-cards-container')
                  .children()
                  .eq(i)
                  .hasClass('selected')
               && !e.selected
      )
        $('#self-cards-container')
          .children()
          .eq(i)
          .removeClass('selected');
    });
  };

  // Ensures HTML containers consistent with the change in number of cards
  var updateCardsHTML = function(arr, location){
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

    arr.forEach(function(e,i){
      $('#' + location + '-container').children().eq(i).html(deck[e.val-1].src);
    });
  }

  // Selects a card from the deck at random, removes from deck and returns it
  var drawCard = function(){
    return deckLeft.splice(Math.floor(Math.random() * deckLeft.length), 1)[0];
  };

  // Logic after a card is submitted. Checks if move is valid and handles
  var submitCardsAndUpdate = function(){
    submitted.length = 0;
    cards.forEach(function(e, i){
      $('#self-cards-container').children().eq(i).removeClass('selected');
      if (e.selected){
        e.selected = false
        submitted.push(e);
      }
    });
    if (checkValidity(sortCardsByRank(validSubmission),
                      sortCardsByRank(submitted))
        && turn)
      {
      validSubmission = JSON.parse(JSON.stringify(submitted));
      var len = validSubmission.length-1;
      for (i = cards.length-1; i >= 0; i--){
        if (len < 0)
          break;
        else if (cards[i].val == validSubmission[len].val){
          cards.splice(i, 1)[0];
          len--;
        }
      }
      updateCardDisplay(cards, "self-cards");
      sortCardsByRank(validSubmission);
      updateCardDisplay(validSubmission, "middle-cards")
      turn = false;
    }
    update();
  };


  // Passes your turn
  var pass = function(){
    // Draw a card
    if (turn){
      if (deckLeft.length != 0){
        cards.push(deck[drawCard()-1]);
      }
      validSubmission.length = 0;
      submitted.length = 0;
      updateCardDisplay(cards, "self-cards");
      updateCardDisplay(validSubmission, "middle-cards");
      turn = false;
    }
  };

// TODO: improve logic for finding buttons
$(document).ready(function(){
  // Events for button clicks
  $('#button-container')
    .children()
    .first()
    .children()
    .on('click', function(){
      sortCardsByRank(cards);
    });
  $('#button-container')
    .children()
    .eq(1)
    .children()
    .on('click', sortCardsBySuit);
  $('#button-container')
    .children()
    .eq(2)
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
    cards[$(this).index()].selected = !cards[$(this).index()].selected;
  });
});


window.addEventListener("load", function(){

  load();

  // Initial set up - draws 17 cards for player and opponent
  for (i = 0; i < 17; i++){
        cards.push(deck[drawCard()-1]);
        oppCards.push(deck[drawCard()-1]);
  }
  sortCardsByRank(cards);
  sortCardsByRank(oppCards);

  turn = cards[0].val > oppCards[0].val;

  updateCardDisplay(cards, "self-cards");
});
