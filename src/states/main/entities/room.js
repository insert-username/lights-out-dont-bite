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
  zDepthManager.ceilingLighting.add(this.lighting);

  /**
   * The min and max alpha values for the lighting in this room.
   */
  this.lightingAlphaMin = 1.0;
  this.lightingAlphaMax = 1.0;
  this.lightingFlickerPeriodSeconds = 5;
  game.time.events.loop(Phaser.Timer.SECOND * this.lightingFlickerPeriodSeconds / 50, this.updateLightingAlpha, this);
  game.time.events.start();
  this.setState("LIT", 1000);
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
  SEMI_LIT : 0.5,
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
 */
module.exports.prototype.setIllumination = function(state) {
  this.setState(state, 1000);
};

/**
 * @param State must be one of module.exports.State.
 * @param tweenTimeMs the amount of time (in milliseconds) to take
 * to perform the visual state transition.
 */
module.exports.prototype.setState = function(state, tweenTimeMs) {

  if (module.exports.State[state] == undefined) {
    throw "State: " + state + " is not a valid room state.";
  }

  this.state = state;

  var alphaVal = module.exports.State.Alpha[state];

  var lightingTween = this.game.add.tween(this);
  lightingTween.to( { lightingAlphaMin: alphaVal * 0.95, lightingAlphaMax: alphaVal }, tweenTimeMs, Phaser.Easing.Linear.None);
  lightingTween.start();
};

module.exports.prototype.updateLightingAlpha = function() {
  var time = this.game.time.totalElapsedSeconds();
  var lightingLerp = (Math.sin(2 * Math.PI * time / this.lightingFlickerPeriodSeconds) + 1) / 2;
  this.lighting.alpha = this.lightingAlphaMin + (this.lightingAlphaMax - this.lightingAlphaMin) * lightingLerp;
};
