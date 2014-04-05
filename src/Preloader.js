
FlappyGame.Preloader = function (game) {

  this.loadingBar = null;

  this.ready = false;

};

FlappyGame.Preloader.prototype = {

  preload: function () {

    // Create the loading bar
    this.loadingBar = this.add.sprite(300, 400, 'loadingBar');

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.loadingBar);

    // Load our other game assets
    //TODO: load game assets
  },

  create: function () {

    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.loadingBar.cropEnabled = false;

  },

  update: function () {
    // Wait for music to be decoded to start the MainMenu state.
    if (this.cache.isSoundDecoded('bgMusic') && this.ready == false) {
      this.ready = true;
      this.state.start('MainMenu');
    }

  }

};
