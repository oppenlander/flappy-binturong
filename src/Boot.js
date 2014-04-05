FlappyGame = {

  /* Here we've just got some global level vars that persist regardless of State swaps */
  highScore: 0,
  currentScore: 0,
  newRecord: false,

  /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
  music: null,
  isSoundOn: true,

  /* Your game can check FlappyGame.orientated in internal loops to know if it should pause or not */
  orientated: false

};

FlappyGame.Boot = function (game) {
};

FlappyGame.Boot.prototype = {

  preload: function () {

    //  Here we load the assets required for our preloader (in this case a loading bar)
    this.load.image('loadingBar', 'images/loading.png');

  },

  create: function () {

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop)
    {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 480;
      this.scale.minHeight = 260;
      this.scale.maxWidth = 1024;
      this.scale.maxHeight = 768;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.setScreenSize(true);
    }
    else
    {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 480;
      this.scale.minHeight = 260;
      this.scale.maxWidth = 1024;
      this.scale.maxHeight = 768;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      this.scale.forceOrientation(true, false);
      this.scale.hasResized.add(this.gameResized, this);
      this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
      this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
      this.scale.setScreenSize(true);
    }

    this.state.start('Preloader');

  },

  gameResized: function (width, height) {

    //  This could be handy if you need to do any extra processing if the game resizes.
    //  A resize could happen if for example swapping orientation on a device.

  },

  enterIncorrectOrientation: function () {

    FlappyGame.orientated = false;

    document.getElementById('orientation').style.display = 'block';

  },

  leaveIncorrectOrientation: function () {

    FlappyGame.orientated = true;

    document.getElementById('orientation').style.display = 'none';

  }

};
