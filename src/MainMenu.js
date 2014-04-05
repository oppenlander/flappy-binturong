
FlappyGame.MainMenu = function (game) {
  this.floor = null;
  this.player = null;
};

FlappyGame.MainMenu.prototype = {

  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    //TODO: start playing music

    //TODO: set up the scene

    // Add instructions text
    //TODO: add instructions label

    // Add Highscore text
    //TODO: add highscore label

    // Add last score text
    //TODO: add score label

    // Create the sound toggle
    //TODO: add sound toggle

    // Capture keys/touch input
    //TODO: capture keys/touch input

    this.startingGame = false;
  },

  update: function () {

    // Do nothing for the menu update

  },

  startGame: function () {

    //  And start the actual game
    this.state.start('Game');

  }

};
