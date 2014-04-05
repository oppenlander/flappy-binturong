
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
    FlappyGame.currentScore = 0;

    // Background for the level
    this.add.sprite(0, 0, 'bg');

    // Spires the place needs to avoid
    this.createTowers();

    // Floor the player can run in to
    this.floor = this.add.tileSprite(0, 704, 1024, 64, 'floor');
    this.physics.enable(this.floor, Phaser.Physics.ARCADE);
    this.floor.body.width = 1024;
    this.floor.body.immovable = true;

    // Create the player
    this.player = this.add.sprite(204, 380, 'binturong');
    this.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.gravity.y = 800;

    // Used for touch input, because multiple onTouchStart events fire
    this.playerCanJump = true;

    this.playerIsDead = false;

    // Create the sound toggle
    this.soundToggle = this.add.button(954, 16, 'mute', this.toggleSound, this);
    if(!FlappyGame.isSoundOn) {
      this.soundToggle.frame = 1;
    }

    // Scoreboard
    this.scoreboard = this.add.text(16, 16, ''+FlappyGame.currentScore, {font: '96px VT323', fill: '#000'});

    // Capture keys/touch input
    if(this.game.device.desktop) {
      // Desktop input setup
      this.input.keyboard.callbackContext = this;
      this.input.keyboard.onDownCallback = this.onKeyDown;
      this.input.keyboard.onUpCallback = this.onKeyUp;
      this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
      this.input.keyboard.addKeyCapture(Phaser.Keyboard.M);
      this.input.keyboard.addKeyCapture(Phaser.Keyboard.P);
    } else {
      // Mobile input setup
      this.input.touch.callbackContext = this;
      this.input.touch.touchStartCallback = this.onTouchStart;
      this.input.touch.touchEndCallback = this.onTouchEnd;
      this.input.touch.start();
    }

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

  createTowers: function() {
    this.towerPairsLength = 2;
    this.towers = this.add.group();
    this.towerPairs = [];

    for(var i = 0; i < this.towerPairsLength; ++i) {
      var xOffset = Math.floor(1024 + (i * 512) + (Math.random() * 20 - 10));
      var yOffsets = this.getRandomTowerPositions();

      var topTower = this.towers.create(xOffset, yOffsets[0], 'gerterTowerTop');
      this.physics.enable(topTower, Phaser.Physics.ARCADE);
      topTower.body.velocity.x = -96;
      topTower.body.immovable = true;

      var botTower = this.towers.create(xOffset, 768 - yOffsets[1], 'gerterTowerBot');
      this.physics.enable(botTower, Phaser.Physics.ARCADE);
      botTower.body.velocity.x = -96;
      botTower.body.immovable = true;

      this.towerPairs.push({
        top: topTower,
        bot: botTower,
        pastPlayer: false
      });
    }
  },

  getRandomTowerPositions: function() {
    var type = Math.floor(Math.random() * 3);
    if(type === 0) {
      return [0, 200];
    } else if(type === 1) {
      return [-100, 300];
    } else {
      return [-200, 400];
    }
  },

  onKeyDown: function(event) {
    if(event.keyCode === Phaser.Keyboard.SPACEBAR) {
      if(!this.playerIsDead) {
        this.player.body.velocity.y = -250;
      }
    } else if(event.keyCode === Phaser.Keyboard.P) {
      this.toggleSound();
    } else if(event.keyCode === Phaser.Keyboard.M) {
      this.quitGame();
    }
  },

  onKeyUp: function() {
    // Currently do nothing when a key up event happens
  },

  onTouchStart: function() {
    if(!this.playerIsDead) {
      if(this.playerCanJump) {
        this.player.body.velocity.y = 300;
      }
      this.playerCanJump = false;
    }
  },

  onTouchEnd: function() {
    if(!this.playerIsDead) {
      this.playerCanJump = true;
    }
  },

  update: function () {

    if(!this.playerIsDead) {

      // Collide floor and towers with the player
      this.physics.arcade.collide(this.player, this.floor);
      this.physics.arcade.collide(this.player, this.towers);

      if(this.player.body.touching.up ||
         this.player.body.touching.right ||
         this.player.body.touching.down ||
         this.player.body.touching.left) {
        // Player deserves to die!
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.bringToTop();
        this.player.body.gravity.y = 1300;
        this.playerIsDead = true;

        this.floor.body.checkCollision.up = false;
        this.floor.body.checkCollision.right = false;
        this.floor.body.checkCollision.down = false;
        this.floor.body.checkCollision.left = false;
        this.floor.body.checkCollision.any = false;

        this.towers.setAll('body.checkCollision.up', false);
        this.towers.setAll('body.checkCollision.right', false);
        this.towers.setAll('body.checkCollision.down', false);
        this.towers.setAll('body.checkCollision.left', false);
        this.towers.setAll('body.checkCollision.any', false);
        this.towers.setAll('body.velocity.x', 0);

      } else {
        // Move the floor
        this.floor.tilePosition.x -= 96 * this.time.physicsElapsed;

        // Do tower things
        for(var i = 0; i < this.towerPairsLength; ++i) {
          var towerPair = this.towerPairs[i];
          var rightSidePos = towerPair.top.x + towerPair.top.width;

          if(rightSidePos < 0) {
            // Reset the tower
            towerPair.pastPlayer = false;
            towerPair.top.reset(1024, towerPair.top.y);
            towerPair.bot.reset(1024, towerPair.bot.y);
            towerPair.top.body.velocity.x = -96;
            towerPair.bot.body.velocity.x = -96;

          } else if(!towerPair.pastPlayer &&
                    rightSidePos < this.player.x) {
            // Increment score if the tower pair has passed the player
            towerPair.pastPlayer = true;
            FlappyGame.currentScore += 1;
            this.scoreboard.setText(''+FlappyGame.currentScore);
          }
        }

      }
    } else {
      // Rotate the player as they fall
      //this.player.body.rotation -= 2;
      this.player.body.angle -= 2;

      if(this.player.y > 768) {
        if(FlappyGame.currentScore > FlappyGame.highScore) {
          FlappyGame.highScore = FlappyGame.currentScore;
          FlappyGame.newRecord = true;
        }
        this.quitGame();
      }
    }
  },

  quitGame: function () {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

  }

};
