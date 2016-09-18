/**
 * Defines an enemy which attacks the player if it is in the same room.
 * The nasty does not enter lit rooms.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Nasty = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, lightsOut.Nasty.key);
  };

  lightsOut.Nasty.key = "nasty";
  lightsOut.Nasty.load = function(game) {
    game.load.spritesheet(lightsOut.Nasty.key, "assets/sprites/nasty.png", 50, 50);
  };

  lightsOut.Nasty.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Nasty.prototype.constructor = lightsOut.Nasty;

  return lightsOut;
}(LightsOut || {}));