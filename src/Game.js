
FlappyGame.Game = function (game) {

  //    When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

  this.game;        //  a reference to the currently running game
  this.add;     //  used to add sprites, text, groups, etc
  this.camera;  //  a reference to the game camera
  this.cache;       //  the game cache
  this.input;       //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
  this.load;        //  for preloading assets
  this.math;        //  lots of useful common math operations
  this.sound;       //  the sound manager - add a sound, play one, set-up markers, etc
  this.stage;       //  the game stage
  this.time;        //  the clock
  this.tweens;  //  the tween manager
  this.world;       //  the game world
  this.particles;   //  the particle manager
  this.physics; //  the physics manager
  this.rnd;     //  the repeatable random number generator

  //    You can use any of these from any function within this State.
  //    But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

  this.floor = null;
  this.player = null;

};

FlappyGame.Game.prototype = {

  create: function () {
    //TODO: reset global state

    // Background for the level
    //TODO: load background

    // Towers the place needs to avoid
    //TODO: create pool of towers to collide with

    // Floor the player can run in to
    //TODO; create the floor to collide with

    // Create the player
    // Add the user's sprite

    // Used for touch input, because multiple onTouchStart events fire
    //TODO: set up some player proerties

    // Create the sound toggle
    //TODO: creat sound toggle

    // Scoreboard
    //TODO: creat scoreboard

    // Capture keys/touch input
    //TODO: capture keys/touch input

  },

  toggleSound: function() {
    //TODO: toggle the sound
  },

  createTowers: function() {
    //TODO: creat the towers
  },

  update: function () {

    //TODO: check if player is dead
    // if player alive, collide with world
    //   if collided, kill the player
    //   else move the world/update score if past a tower
    // if player already dead wait until the sprite falls below the screen, then go to menu
  },

  quitGame: function () {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
