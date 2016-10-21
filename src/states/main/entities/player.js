/**
 * Defines the player character.
 * The player can be in one of two states: Alive and Dead. If dead, the player will
 * not respond to command input.
 * The player state can be queried via function isAlive();
 * The player can be damaged via function damage(amount);
 */
module.exports = function(game, x, y) {
  this.game = game;
  Phaser.Sprite.call(this, game, x, y, module.exports.key);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('stand', 0);
  this.animations.add('walk', [1, 2, 3]);

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
    right: game.input.keyboard.addKey(Phaser.Keyboard.D),

    interact: game.input.keyboard.addKey(Phaser.Keyboard.E)
  };

  this.health = module.exports.MaxHealth;
  this.controlsEnabled = true;
}

module.exports.MaxHealth = 100;
module.exports.key = "dave";

module.exports.prototype = Object.create(Phaser.Sprite.prototype);
module.exports.prototype.constructor = module.exports;

module.exports.prototype.getHealth = function() {
  return this.health;
};

module.exports.prototype.isAlive = function() {
  return this.health > 0;
}

module.exports.prototype.damage = function(amount) {
  this.health = Math.max(0, this.health - amount);
}

module.exports.prototype.disableControls = function() {
  if (!this.controlsEnabled) {
    throw "Player controls have already been disabled.";
  }

  this.controlsEnabled = false;
}

module.exports.prototype.setInteractiveEntity = function(interactiveEntity) {
  this.interactiveEntity = interactiveEntity;
};

module.exports.prototype.update = function() {

  // disable controls on death.
  if (!this.controlsEnabled) {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.animations.play('stand');
    return;
  }

  if (this.controls.interact.isDown && this.interactiveEntity && this.interactiveEntity.isActive) {
    this.interactiveEntity.interact();
    this.interactiveEntity = undefined;
  }

  var ddx = 0;
  var ddy = 0;

  if (this.controls.left.isDown && !this.body.touching.left) {
    ddx -= this.walkAcceleration;
  }

  if (this.controls.right.isDown && !this.body.touching.right) {
    ddx += this.walkAcceleration;
  }

  if (this.controls.up.isDown && !this.body.touching.up) {
    ddy -= this.walkAcceleration;
  }

  if (this.controls.down.isDown && !this.body.touching.down) {
    ddy += this.walkAcceleration;
  }

  console.log(this.animations);

  if ((ddx != 0 || ddy != 0) && (this.animations.currentAnim.name != 'walk')) {
    this.animations.stop();
    this.animations.play('walk', 6, true);
  } else if (ddx === 0 && ddy === 0) {
    this.animations.stop();
    this.animations.play('stand');
  }

  this.body.velocity.x = ddx;
  this.body.velocity.y = ddy;
}
