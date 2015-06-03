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
      var testPlayer = new Player("Johnny");
      expect(testPlayer.name).to.equal("Johnny");
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
