/**
 * This file defines the room for the game.
 * A room consists of a tiled floor, several walls to block player entry, and a lighting state.
 * Rooms may be either lit or unlit.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Room = function(game, zDepthManager,
    navPointIndex, x, y, width, height) {
    this.game = game;
    this.navPointIndex = navPointIndex;

    /**
     * The lighting for the room sets the level of visibility, an alpha value of 1.0 indicates an unlit room,
     * and a value of 0.0 indicates full visibility.
     */
    this.lighting = game.add.tileSprite(x, y, width, height, lightsOut.Room.lightingKey);
    this.lighting.z = lightsOut.ZDepth.LIGHTING;
    zDepthManager.lighting.add(this.lighting);

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
  lightsOut.Room.State = {

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

  lightsOut.Room.State.Alpha = {
    LIT : 0.8,
    SEMI_LIT : 0.1,
    UNLIT : 0.95
  };

  /** Factory function for creating a room group. */
  lightsOut.Room.createRoom = function(game, zDepthManager, navPointIndex, x, y, width, height) {
    return new lightsOut.Room(game, zDepthManager, navPointIndex,
      x, y, width, height);
  };

  /**
   * Unique key by which room resources may be referenced.
   */
  lightsOut.Room.lightingKey = "lighting";
  lightsOut.Room.load = function(game) {
    game.load.spritesheet(lightsOut.Room.lightingKey, "assets/sprites/lighting.png", 10, 10);
  };

  lightsOut.Room.prototype.constructor = lightsOut.Room;

  /**
   * @return the index of the nav point corresponding to the
   * central point of this room.
   */
  lightsOut.Room.prototype.getNavPointIndex = function() {
    return this.navPointIndex;
  };

  /**
   * @return true if the room contains the specified point.
   */
  lightsOut.Room.prototype.containsPoint = function(x, y) {
    return this.lighting.getBounds().contains(x, y);
  };

  /**
   * Returns the current illumination of the room. This value should
   * always be one of: lightsOut.Room.State.
   */
  lightsOut.Room.prototype.getIllumination = function(state) {
    return this.state;
  };

  /**
   * Sets the current illumination of the room. A tween is used to
   * smooth the transition, however the state transition is instant.
   * @param state one of : lightsOut.Room.State.
   */
  lightsOut.Room.prototype.setIllumination = function(state) {
    this.setState(state, 1000);
  };

  /**
   * @param State must be one of lightsOut.Room.State.
   * @param tweenTimeMs the amount of time (in milliseconds) to take
   * to perform the visual state transition.
   */
  lightsOut.Room.prototype.setState = function(state, tweenTimeMs) {

    if (lightsOut.Room.State[state] == undefined) {
      throw "State: " + state + " is not a valid room state.";
    }

    this.state = state;

    var alphaVal = lightsOut.Room.State.Alpha[state];

    var lightingTween = this.game.add.tween(this);
    lightingTween.to( { lightingAlphaMin: alphaVal * 0.95, lightingAlphaMax: alphaVal }, tweenTimeMs, Phaser.Easing.Linear.None);
    lightingTween.start();
  };

  lightsOut.Room.prototype.updateLightingAlpha = function() {
    var time = this.game.time.totalElapsedSeconds();
    var lightingLerp = (Math.sin(2 * Math.PI * time / this.lightingFlickerPeriodSeconds) + 1) / 2;
    this.lighting.alpha = this.lightingAlphaMin + (this.lightingAlphaMax - this.lightingAlphaMin) * lightingLerp;
  };

  return lightsOut;
}(LightsOut || {}));
