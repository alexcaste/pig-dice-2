// Each turn, a player repeatedly rolls a die until either a 1 is rolled or the player decides to "hold":
// If the player rolls a 1, they score nothing and it becomes the next player's turn.
// If the player rolls any other number, it is added to their turn total and the player's turn continues.
// If a player chooses to "hold", their turn total is added to their score, and it becomes the next player's turn.

describe('Dice', function() {

  describe('new', function() {
    it("creates a new instance of the Dice class", function() {
      var testDice = new Dice();
      expect(testDice.value).to.equal(1);
    });
  });

  describe('roll', function() {
    it("sets the dice's value to a random number between 1 and 6", function() {
      var testDice = new Dice();
      testDice.roll();
      expect(testDice.value).to.be.within(1, 6);
    });
  });


});

describe('Player', function() {

  describe('new', function() {
    it("creates a new player", function() {
      var testPlayer = new Player();
      expect(testPlayer.score).to.equal(0);
      expect(testPlayer.turnTotal).to.equal(0);
    });
  });

  describe('addTurnTotalToScore', function(){
    it("adds turn total to score lol", function() {
      var testPlayer = new Player();
      testPlayer.turnTotal += 6;
      testPlayer.addTurnTotalToScore();
      expect(testPlayer.score).to.equal(6);
    });
  });

});
