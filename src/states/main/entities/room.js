/**
 * This file defines the room for the game.
 * A room consists of a tiled floor, several walls to block player entry, and a lighting state.
 * Rooms may be either lit or unlit.
 */
module.exports = function(game, zDepthManager,
  navPointIndex, x, y, width, height) {
  this.game = game;
  this.navPointIndex = navPointIndex;

  /**
   * The lighting for the room sets the level of visibility, an alpha value of 1.0 indicates an unlit room,
   * and a value of 0.0 indicates full visibility.
   */
  this.lighting = game.add.tileSprite(x, y, width, height, module.exports.lightingKey);
  game.physics.arcade.enable(this.lighting);
  this.lighting.body.immovable = true;
  zDepthManager.ceilingLighting.add(this.lighting);

  /**
   * The min and max alpha values for the lighting in this room.
   */
  this.lightingAlphaMin = 1.0;
  this.lightingAlphaMax = 1.0;
  this.lightingFlickerPeriodSeconds = 5;
  game.time.events.loop(Phaser.Timer.SECOND * this.lightingFlickerPeriodSeconds / 50, this.updateLightingAlpha, this);
  game.time.events.start();
};

module.exports.prototype.getLightingSprite = function() {
  return this.lighting;
};

/**
 * Describes the lighting values of the room.
 * The values for the enum keys are the max alpha
 * the lighting element should have when the room
 * is in that state.
 */
module.exports.State = {

  /**
   * Indicates that the room is currently illuminated.
   */
  LIT : "LIT",

  /**
   * Indicates that the room is dark, but partially illuminated
   * by the player.
   */
  SEMI_LIT : "SEMI_LIT",

  /**
   * Indicates that the room is dark.
   */
  UNLIT : "UNLIT"
};

module.exports.State.Alpha = {
  LIT : 0.1,
  SEMI_LIT : 0.6,
  UNLIT : 0.95
};

/** Factory function for creating a room group. */
module.exports.createRoom = function(game, zDepthManager, navPointIndex, x, y, width, height) {
  return new module.exports(game, zDepthManager, navPointIndex,
    x, y, width, height);
};

/**
 * Unique key by which room resources may be referenced.
 */
module.exports.lightingKey = "lighting";
module.exports.load = function(game, assetContext) {
  game.load.spritesheet(module.exports.lightingKey, assetContext("./sprites/lighting.png"), 10, 10);
};

module.exports.prototype.constructor = module.exports;

/**
 * @return the index of the nav point corresponding to the
 * central point of this room.
 */
module.exports.prototype.getNavPointIndex = function() {
  return this.navPointIndex;
};

/**
 * @return true if the room contains the specified point.
 */
module.exports.prototype.containsPoint = function(x, y) {
  var xLocal = x - this.lighting.x;
  var yLocal = y - this.lighting.y;

  return xLocal >= 0 && xLocal <= this.lighting.width &&
    yLocal >= 0 && yLocal <= this.lighting.height;
};

/**
 * Returns the current illumination of the room. This value should
 * always be one of: module.exports.State.
 */
module.exports.prototype.getIllumination = function(state) {
  return this.state;
};

/**
 * Sets the current illumination of the room. A tween is used to
 * smooth the transition, however the state transition is instant.
 * @param state one of : module.exports.State.
 * @param x, y the x-y coordinates of a sprite which may be causing
 * the room illumination. For example, if the room is lit by a torch,
 * these coordinates should be the coordinates of the torch sprite.
 */
module.exports.prototype.setIllumination = function(state, x, y) {
  if (state === module.exports.State.SEMI_LIT) {
    if (x === undefined || y === undefined) {
      throw "When a room is semi-lit, the coordinates of the " +
        "torch sprite must be specified."
    }

    var dist = Phaser.Math.distance(this.lighting.x,
        this.lighting.y, x, y);

    var alpha = Phaser.Math.clamp(
       dist / 100,
      0, 1);
    this.setState(state, 500, alpha);
  } else {
    this.setState(state, 500);
  }
};

/**
 * @param State must be one of module.exports.State.
 * @param tweenTimeMs the amount of time (in milliseconds) to take
 * to perform the visual state transition.
 * @param alpha optional alpha value to specify for the state. If this
 * value is not specified then the default alpha value for this
 * state is used.
 */
module.exports.prototype.setState = function(state, tweenTimeMs, alpha) {

  if (module.exports.State[state] == undefined) {
    throw "State: " + state + " is not a valid room state.";
  }

  this.state = state;
  var alphaVal = alpha === undefined ?
    module.exports.State.Alpha[state] :
    alpha;

  if (this.state === module.exports.State.SEMI_LIT && alpha === undefined) {
    throw "A semi lit room should manually specify alpha values.";
  }

  this.lighting.alpha = alphaVal;
};

module.exports.prototype.updateLightingAlpha = function() {
  var time = this.game.time.totalElapsedSeconds();
  var lightingLerp = (Math.sin(2 * Math.PI * time / this.lightingFlickerPeriodSeconds) + 1) / 2;
  this.lighting.alpha = this.lightingAlphaMin + (this.lightingAlphaMax - this.lightingAlphaMin) * lightingLerp;
};
