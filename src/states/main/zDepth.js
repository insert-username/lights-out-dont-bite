/**
 * Represents the z-ordering groups for the game.
 */
module.exports = function(game) {

  /**
   * This layer is for floor tiles.
   */
  this.floor = game.add.group();

  /**
   * This layer is for objects which are on the floor (for example debris).
   */
  this.floorItems = game.add.group();

  /**
   * This is for lighting which highlights objects on the floor (for example the light from the ceiling lamp).
   */
  this.floorLighting = game.add.group();

  /**
   * Use this for barriers such as walls and other blocking items.
   */
  this.wall = game.add.group();

  /**
   * This is the layer that sprites such as the player and enemies occupy.
   */
  this.sprite = game.add.group();

  /**
   * Use this for sprites which are in the ceiling (for example lights hanging from the ceiling).
   */
  this.ceiling = game.add.group();

  /**
   * Lighting which sits above the ceiling layer (use this to cover all sprites including the room).
   */
  this.ceilingLighting = game.add.group();
};
