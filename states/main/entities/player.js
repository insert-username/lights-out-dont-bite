/**
 * Defines the player character.
 * The player can be in one of two states: Alive and Dead. If dead, the player will
 * not respond to command input.
 * The player state can be queried via function isAlive();
 * The player can be damaged via function damage(amount);
 */
var LightsOut = (function(lightsOut){

  lightsOut.Player = function(game, x, y) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y, lightsOut.Player.key);
    this.anchor.setTo(0.5, 0.5);

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

    this.health = 100;
    this.controlsEnabled = true;
  }

  lightsOut.Player.key = "player";
  lightsOut.Player.load = function(game) {
    game.load.spritesheet(lightsOut.Player.key, "assets/sprites/player.png", 11, 20);
  };

  lightsOut.Player.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Player.prototype.constructor = lightsOut.Player;

  lightsOut.Player.prototype.isAlive = function() {
    return this.health > 0;
  }

  lightsOut.Player.prototype.damage = function(amount) {
    this.health = Math.max(0, this.health - amount);
  }

  lightsOut.Player.prototype.disableControls = function() {
    if (!this.controlsEnabled) {
      throw "Player controls have already been disabled.";
    }

    this.controlsEnabled = false;
  }

  lightsOut.Player.prototype.update = function() {
    // disable controls on death.
    if (!this.controlsEnabled) {
      this.body.acceleration.x = 0;
      this.body.acceleration.y = 0;
      return;
    }

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
