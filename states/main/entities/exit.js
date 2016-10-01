/**
 * Defines a level transition area. If the player overlaps this area, they should move to
 * the next level.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Exit = function(game, x, y, width, height, keyCount, destinationMapName) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y);

    game.physics.arcade.enable(this);

    this.body.width = width;
    this.body.height = height;
    this.body.x = x;
    this.body.y = y;
    this.keyCount = keyCount;

    this.destinationMapName = destinationMapName;

    var style = { font: "32px verdana", fill: "#00ff00", align: "center" };
    this.unlockText = game.add.text(0, 0, "Exit Unlocked", style);
    this.unlockText.anchor.set(0.5);
    this.unlockText.fixedToCamera = true;
    this.unlockText.cameraOffset.setTo(game.camera.view.width / 2, game.camera.view.height / 2);
    this.unlockText.visible = false;
    this.unlockText.alpha = 0;
  };

  lightsOut.Exit.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Exit.prototype.constructor = lightsOut.Exit;

  /**
   * Returns the name of the map (including file extension) that this map leads to.
   */
  lightsOut.Exit.prototype.getDestinationMapName = function() {
    return this.destinationMapName;
  };

  lightsOut.Exit.prototype.keyPickedUp = function() {
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
    }
  };

  lightsOut.Exit.prototype.isUnlocked = function() {
    return this.keyCount === 0;
  };

  return lightsOut;
}(LightsOut || {}));
