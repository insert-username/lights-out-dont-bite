var InteractiveEntity = require('./interactiveEntity');

/**
 * Defines an entity which may be interacted with.
 */
module.exports = function(game, x, y, player, exit) {
  InteractiveEntity.call(this, game, module.exports.Key, x, y, player, this.interactionCallback, this);
  this.game = game;
  this.exit = exit;
  this.pickUpSound = this.game.add.sound('key-picked-up', 1);
};

module.exports.prototype = Object.create(InteractiveEntity.prototype);
module.exports.prototype.constructor = module.exports;

module.exports.Key = "key";

module.exports.prototype.interactionCallback = function() {
  this.pickUpSound.play();
  this.game.time.events.add(Phaser.Timer.SECOND * this.pickUpSound.duration, () => {
    this.pickUpSound.destroy();
  });
  this.exit.keyPickedUp();
};

module.exports.prototype.update = function() {
  InteractiveEntity.prototype.update.call(this);
  if (this.exit.isUnlocked() && this.isEnabled) {
    this.disable();
  }
};
