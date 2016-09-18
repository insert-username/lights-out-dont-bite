var LightsOut = (function(lightsOut){

  lightsOut.Player = function(game) {
    this.game = game;
    Phaser.Sprite.call(this, game, 100, 100, lightsOut.Player.key);

    this.walkSpeed = 100.0;
    this.walkAcceleration = 1000;
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.maxVelocity.x = this.walkSpeed;
    this.body.maxVelocity.y = this.walkSpeed;
    this.body.drag.x = 1000;
    this.body.drag.y = 1000;

    this.controls = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };
  }

  lightsOut.Player.key = "player";
  lightsOut.Player.load = function(game) {
    game.load.spritesheet(lightsOut.Player.key, "assets/sprites/player.png", 11, 20);
  };

  lightsOut.Player.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Player.prototype.constructor = lightsOut.Player;

  lightsOut.Player.prototype.update = function() {
    var ddx = 0;
    var ddy = 0;
    
    if (this.controls.left.isDown) {
      ddx -= this.walkAcceleration;
    }
    
    if (this.controls.right.isDown) {
      ddx += this.walkAcceleration;
    }

    if (this.controls.up.isDown) {
      ddy -= this.walkAcceleration;
    }

    if (this.controls.down.isDown) {
      ddy += this.walkAcceleration;
    }

    this.body.acceleration.x = ddx;
    this.body.acceleration.y = ddy;
  }

  return lightsOut;
}(LightsOut || {}));
