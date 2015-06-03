function Dice() {
  this.value = 1;
}

Dice.prototype.roll = function() {
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


$(function() {

  var die = new Dice();
  var player1 = new Player("player 1");
  var player2 = new Player("player 2");
  var isP1Turn = true;

  updateGame();

  $("button#roll").click(function() {
    die.roll();
    if(die.value == 1) {
      getActivePlayer().turnTotal = 0;
      isP1Turn = !isP1Turn;
    } else {
      getActivePlayer().turnTotal += die.value;
    }
    updateGame();
  });

  $("button#hold").click(function() {
    getActivePlayer().addTurnTotalToScore();
    getActivePlayer().turnTotal = 0;
    if (getActivePlayer().score >= 30) {
      alert(getActivePlayer().name + " is the winner!");
    }
    isP1Turn = !isP1Turn;
    updateGame();
  });

  function updateGame() {
    $("#roll-result").text(die.value);
    $("#p1-score").text(player1.score);
    $("#p1-turn-total").text(player1.turnTotal);
    $("#p2-score").text(player2.score);
    $("#p2-turn-total").text(player2.turnTotal);
    if (isP1Turn) {
      $("#p1-turn").text("<--");
      $("#p2-turn").empty();
    } else {
      $("#p2-turn").text("<--");
      $("#p1-turn").empty();
    }
  }

  function getActivePlayer() {
    if(isP1Turn) {
      return player1;
    } else {
      return player2;
    }
  }

});
