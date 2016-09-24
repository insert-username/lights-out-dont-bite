/**
 * Defines a level transition area. If the player overlaps this area, they should move to
 * the next level.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Exit = function(game, x, y, width, height, destinationMapName) {
    this.game = game;
    Phaser.Sprite.call(this, x, y);

    game.physics.arcade.enable(this);

    this.body.width = width;
    this.body.height = height;
    this.body.x = x;
    this.body.y = y;

    this.destinationMapName = destinationMapName;
  };

  lightsOut.Exit.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Exit.prototype.constructor = lightsOut.Exit;

  /**
   * Returns the name of the map (including file extension) that this map leads to.
   */
  lightsOut.Exit.prototype.getDestinationMapName = function() {
    return this.destinationMapName;
  };

  return lightsOut;
}(LightsOut || {}));
