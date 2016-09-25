/**
 * Represents the z-ordering groups for the game.
 */
var LightsOut = (function(lightsOut){

  lightsOut.ZDepth = function(game) {
    this.floor = game.add.group();
    this.floorItems = game.add.group();
    this.wall = game.add.group();
    this.sprite = game.add.group();
    this.lighting = game.add.group();
  };
  
  return lightsOut;
}(LightsOut || {}));
