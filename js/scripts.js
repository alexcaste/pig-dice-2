// Raw JS

function Die() {
  this.value = 1;
}

Die.prototype.roll = function() {
  this.value = Math.ceil(Math.random() * 6 + 0.00001);
}

function Player(name) {
  this.name = name;
  this.score = 0;
  this.turnTotal = 0;
}

Player.prototype.addTurnTotalToScore = function() {
  this.score += this.turnTotal;
}

// jQuery

$(function() {

  var scoreToWin = 100;

  var die = new Die();
  var die2 = new Die();
  die2.value = 2;


  var player1 = new Player("player 1");
  var player2 = new Player("player 2");
  var isP1Turn = true;
  var twoDiceGame = false;

  p1PanelToggle();

  $("button#standard-game").click(function(){
    $("#game-chooser-buttons").hide();
    p1PanelToggle();
    updateGame();
  });

  $("button#two-dice-game").click(function(){
    $("#game-chooser-buttons").hide();
    p1PanelToggle();
    twoDiceGame = true;
    updateGame();
  });


  $("button#roll").click(function() {
    if (twoDiceGame === true) {
      twoDieRoll();
    } else {
      oneDieRoll();
    }
  });


  $("button#hold").click(function() {

    getActivePlayer().addTurnTotalToScore();
    getActivePlayer().turnTotal = 0;

    if (getActivePlayer().score >= scoreToWin) {
      $("#roll-result2").hide();
      $("#p1-buttons").hide();
      $("#p2-buttons").hide();
      $("#p1-buttons-disabled").show();
      $("#p2-buttons-disabled").show();
      $("#roll-result").hide();
      $("#roll-result").html('<a href="#" onclick="window.location.reload(true);"><img src="' + './dice_imgs/again.png' + '"></a>');
      $("#roll-result").fadeIn(500);
      $("#p1-score").text(player1.score);
      $("#p1-turn-total").text(player1.turnTotal);
      $("#p2-score").text(player2.score);
      $("#p2-turn-total").text(player2.turnTotal);
      if(isP1Turn) {
        $("#p1-panel-header").text("You Win!");
        $("#p2-panel-header").text("You Lose...");
      } else {
        $("#p2-panel-header").text("You Win!");
        $("#p1-panel-header").text("You Lose...");
      }
    } else {
      switchTurn();
      updateGame();
    }
  });

  function switchTurn() {

    isP1Turn = !isP1Turn;

    $("#p1-panel").toggleClass("panel-primary panel-default");
    $("#p2-panel").toggleClass("panel-primary panel-default");
    $("#p1-buttons").toggle();
    $("#p1-buttons-disabled").toggle();
    $("#p2-buttons").toggle();
    $("#p2-buttons-disabled").toggle();
  }

  function updateGame() {

    $("#roll-result").hide();
    $("#roll-result").html('<img src="' + './dice_imgs/' + die.value + '.png' + '">');
    $("#roll-result").fadeIn(250);

    if (twoDiceGame === true) {
      twoDice();
    }

    $("#p1-score").text(player1.score);
    $("#p1-turn-total").text(player1.turnTotal);
    $("#p2-score").text(player2.score);
    $("#p2-turn-total").text(player2.turnTotal);
  }

  function twoDice() {
    $("#roll-result2").hide();
    $("#roll-result2").html('<img src="' + './dice_imgs/' + die2.value + '.png' + '">');
    $("#roll-result2").fadeIn(250);
  }

  function oneDieRoll() {
    die.roll();

    if(die.value == 1) {
      getActivePlayer().turnTotal = 0;
      switchTurn();
    } else {
      getActivePlayer().turnTotal += die.value;
    }
    updateGame();
  }

  function twoDieRoll() {
    $('button#hold').prop('disabled', false);
    die.roll();
    die2.roll();

    if(die.value == 1 && die2.value == 1) {
      getActivePlayer().turnTotal = 0;
      getActivePlayer().score = 0;
      switchTurn();
    } else if (die.value == 1 || die2.value == 1) {
      getActivePlayer().turnTotal = 0;
      switchTurn();
    } else if (die.value == die2.value) {
      getActivePlayer().turnTotal += die.value + die2.value;
      $('button#hold').prop('disabled', true);
    } else {
      getActivePlayer().turnTotal += die.value + die2.value;
    }
    updateGame();
  }

  function p1PanelToggle() {
    $("#p1-panel").toggleClass("panel-primary panel-default");
    $("#p1-buttons").toggle();
    $("#p1-buttons-disabled").toggle();
  }

  function getActivePlayer() {
    if(isP1Turn) {
      return player1;
    } else {
      return player2;
    }
  }

  // function diceRollImage() {
  //   if (twoDiceGame === true) {
  //     $("#roll-result2").html('<img src="' + './dice_imgs/' + die2.value + '.png' + '">');
  //   }
  //
  //   $("#roll-result").html('<img src="' + './dice_imgs/' + die2.value + '.png' + '">');

  }

});
