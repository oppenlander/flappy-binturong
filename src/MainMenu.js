
FlappyGame.MainMenu = function (game) {
  this.floor = null;
  this.player = null;
};

FlappyGame.MainMenu.prototype = {

  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    if(!FlappyGame.music) {
      FlappyGame.music = this.add.audio('bgMusic');
      FlappyGame.music.play('', 0, 1, true);
    }

    this.add.sprite(0, 0, 'bg');
    this.floor = this.add.tileSprite(0, 704, 1024, 64, 'floor');

    this.player = this.add.sprite(204, 380, 'binturong');

    // Add instructions text
    var instructionsLabel = this.add.text(0, 512, 'Press space or tap to play', {font: '84px VT323', fill: '#000'});
    instructionsLabel.x = (1024 - (instructionsLabel._width + 10)) / 2;

    // Add Highscore text
    var highscoreLabel = this.add.text(0, 128, 'HIGHSCORE: '+FlappyGame.highScore, {font: '84px VT323', fill: '#000'});
    highscoreLabel.x = (1024 - (highscoreLabel._width + 10)) / 2;

    // Add last score text
    var scoreLabel = this.add.text(0, 256, 'LAST SCORE: '+FlappyGame.currentScore, {font: '84px VT323', fill: '#000'});
    scoreLabel.x = (1024 - (scoreLabel._width + 10)) / 2;

    // Create the sound toggle
    this.soundToggle = this.add.button(954, 16, 'mute', this.toggleSound, this);
    if(!FlappyGame.isSoundOn) {
      this.soundToggle.frame = 1;
    }

    // Capture keys/touch input
    if(this.game.device.desktop) {
      // Desktop input setup
      this.input.keyboard.callbackContext = this;
      this.input.keyboard.onDownCallback = this.onKeyDown;
      this.input.keyboard.onUpCallback = this.onKeyUp;
      this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
      this.input.keyboard.addKeyCapture(Phaser.Keyboard.P);
    } else {
      // Mobile input setup
      this.input.touch.callbackContext = this;
      this.input.touch.touchStartCallback = this.onTouchStart;
      this.input.touch.touchEndCallback = this.onTouchEnd;
      this.input.touch.start();
    }

    this.startingGame = false;
  },

  toggleSound: function() {
    if(FlappyGame.isSoundOn) {
      FlappyGame.isSoundOn = false;
      this.soundToggle.frame = 1;
      FlappyGame.music.pause();
    } else {
      FlappyGame.isSoundOn = true;
      this.soundToggle.frame = 0;
      FlappyGame.music.resume();
    }
  },

  onKeyDown: function(event) {
    // Do nothing until key up
  },

  onKeyUp: function(event) {
    if(event.keyCode === Phaser.Keyboard.SPACEBAR) {
      this.startingGame = true;
      this.startGame();
    } else if(event.keyCode === Phaser.Keyboard.P) {
      this.toggleSound();
    }
  },

  onTouchStart: function() {
    // Do nothing until touch end
  },

  onTouchEnd: function() {
    this.startingGame = true;
    this.startGame();
  },

  update: function () {

    // Do nothing for the menu update

  },

  startGame: function () {

    //  And start the actual game
    this.state.start('Game');

  }

};
