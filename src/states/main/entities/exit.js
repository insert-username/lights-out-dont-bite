/**
 * Defines a level transition area. If the player overlaps this area, they should move to
 * the next level.
 */
module.exports = function(game, x, y, width, height, keyCount, destinationMapName) {
  this.game = game;
  Phaser.Sprite.call(this, game, x, y);

  game.physics.arcade.enable(this);

  this.body.width = width;
  this.body.height = height;
  this.body.x = x;
  this.body.y = y;
  this.keyCount = parseInt(keyCount);

  this.destinationMapName = destinationMapName;

  var style = { font: "32px verdana", fill: "#00ff00", align: "center" };
  this.unlockText = game.add.text(0, 0, "Exit Unlocked", style);
  this.unlockText.anchor.set(0.5);
  this.unlockText.fixedToCamera = true;
  this.unlockText.cameraOffset.setTo(game.camera.view.width / 2, game.camera.view.height / 2);
  this.unlockText.visible = false;
  this.unlockText.alpha = 0;

  this.unlockSound = this.game.add.sound('exit-unlocked', 1);
};

module.exports.prototype = Object.create(Phaser.Sprite.prototype);
module.exports.prototype.constructor = module.exports;

/**
 * Returns the name of the map (including file extension) that this map leads to.
 */
module.exports.prototype.getDestinationMapName = function() {
  return this.destinationMapName;
};

module.exports.prototype.keyPickedUp = function() {
  if (this.isUnlocked()) {
    return;
  }

  this.keyCount -= 1;

  if (this.isUnlocked() ) {
    this.unlockText.visible = true;
    var show = this.game.add.tween(this.unlockText)
      .to({alpha: 1}, 500, Phaser.Easing.Sinusoidal.InOut);

    var hide = this.game.add.tween(this.unlockText)
      .to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 500);

    show.chain(hide);
    show.start();
    this.unlockSound.play();
  }
};

module.exports.prototype.isUnlocked = function() {
  return this.keyCount === 0;
};

module.exports.prototype.destroy = function() {
  this.unlockSound.destroy();
  Phaser.Sprite.prototype.destroy.call(this);
}