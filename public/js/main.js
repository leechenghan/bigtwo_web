  var sprites = [],
      submitted = [],
      deck = [],
      playerBool = undefined,
      player = undefined,
      gameEnds = false;

  var gameState = {
    deckLeft: [],
    validSubmission: [],
    cards: [],
    turn: undefined
  }

  for (i = 0; i < 2; i++){
    gameState.cards.push([]);
  }

  var socket = io.connect('http://localhost:3000');

  socket.on('init', (data) => {
    player = data.host ? 1 : 0;
    playerBool = data.host;
    init();
  });

  socket.on('firstGameState', function(data){
    socket.emit('gameState', gameState);
  });

  socket.on('gameState', function(data){
    if (verify(data))
      gameState = data;
    updateCardDisplay(gameState.cards[player], "self-cards");
    updateCardDisplay(gameState.validSubmission, "middle-cards");
    update();
  });

  // Checks if game is over
  var update = function(){
    if (gameState.cards[0].length == 0 || gameState.cards[1].length == 0){
        gameEnds = true;
        alert('Game Over');
        //window.location = "";
    }
  };

  // Loads card images into var array
  var load = function (){
    for (i = 1; i < 53; i++){
      sprites.push(new Image());
      sprites[i-1].src = "../img/" + i + ".png";
      gameState.deckLeft.push(i);
      deck.push({
        val: i,
        idx: undefined,
        selected: false
      });
    }
  };

  // Sorts player cards by rank
  var sortCardsByRank = function(arr){
    arr.sort(function(a, b){
      return a.val - b.val;
    });
    return arr;
  };

  // Sorts player cards by suit
  var sortCardsBySuit = function(){
    sortCardsByRank(gameState.cards[player]);
    gameState.cards[player].sort(function(a,b){
      return a.val % 4 - b.val % 4;
    });
  };

  // Updates cards array to be consistent with html objects displayed
  var updateCardDisplay = function(arr, location){

    updateCardsHTML(arr, location);

    gameState.cards[player].forEach(function(e, i){
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
      $('#' + location + '-container').children().eq(i).html('<img src="' + sprites[e.val-1].src + '">');
    });
  }

  // Selects a card from the deck at random, removes from deck and returns it
  var drawCard = function(){
    return gameState.deckLeft.splice(Math.floor(Math.random() * gameState.deckLeft.length), 1)[0];
  };

  // Logic after a card is submitted. Checks if move is valid and handles
  var submitCardsAndUpdate = function(){
    submitted.length = 0;
    gameState.cards[player].forEach(function(e, i){
      $('#self-cards-container').children().eq(i).removeClass('selected');
      if (e.selected){
        e.selected = false
        submitted.push(e);
      }
    });
    if (checkValidity(sortCardsByRank(gameState.validSubmission),
                      sortCardsByRank(submitted))
        && gameState.turn == player)
      {
      gameState.validSubmission = JSON.parse(JSON.stringify(submitted));
      var len = gameState.validSubmission.length-1;
      for (i = gameState.cards[player].length-1; i >= 0; i--){
        if (len < 0)
          break;
        else if (gameState.cards[player][i].val == gameState.validSubmission[len].val){
          gameState.cards[player].splice(i, 1)[0];
          len--;
        }
      }
      updateCardDisplay(gameState.cards[player], "self-cards");
      sortCardsByRank(gameState.validSubmission);
      updateCardDisplay(gameState.validSubmission, "middle-cards")
      gameState.turn = !player;
      submit();
    }
    update();
  };


  // Passes your turn
  var pass = function(){
    // Draw a card
    if (gameState.turn == player){
      if (gameState.deckLeft.length != 0){
        gameState.cards[player].push(deck[drawCard()-1]);
      }
      gameState.validSubmission.length = 0;
      submitted.length = 0;
      updateCardDisplay(gameState.cards[player], "self-cards");
      updateCardDisplay(gameState.validSubmission, "middle-cards");
      gameState.turn = !player;
      submit();
    }
  };

  var submit = function(){
    socket.emit('gameState', gameState);
  };

  // TODO: have verify function check if moves were valid
  var verify = function(data){
    if (gameState.cards[playerBool ? 0 : 1].length == gameState.cards[player].length == 0)
      return true;
    else
      return true;
  };

$(document).ready(function(){
  // Events for button clicks
  $('#button-container')
    .children()
    .first()
    .children()
    .on('click', () => {
      sortCardsByRank(gameState.cards[player]);
      updateCardDisplay(gameState.cards[player], "self-cards");
    });
  $('#button-container')
    .children()
    .eq(1)
    .children()
    .on('click', () => {
      sortCardsBySuit();
      updateCardDisplay(gameState.cards[player], "self-cards");
    });
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
    gameState.cards[player][$(this).index()].selected = !gameState.cards[player][$(this).index()].selected;
  });
});

var init = function(){
  load();

  if (playerBool){
    // Initial set up - draws 17 cards for player and opponent
    for (i = 0; i < 2; i++){
      for (j = 0; j < 17; j++){
            gameState.cards[i].push(deck[drawCard()-1]);
      }
      sortCardsByRank(gameState.cards[i]);
    }
    gameState.turn = gameState.cards[0][0].val > gameState.cards[1][0].val;
    updateCardDisplay(gameState.cards[player], "self-cards");
  }
  else{
    socket.emit('firstGameState');
  }
};
