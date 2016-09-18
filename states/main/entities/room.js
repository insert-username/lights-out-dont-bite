/**
 * This file defines the room for the game.
 * A room consists of a tiled floor, several walls to block player entry, and a lighting state.
 * Rooms may be either lit or unlit.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Room = function(game, x, y, width, height) {
    this.game = game;

    var wallPC = 0.25;

    var roomLeft = x - width / 2;
    var roomTop = y - height / 2;

    var roomRight = x + width / 2;
    var roomBottom = y + height / 2;

    var floor = game.add.tileSprite(roomLeft, roomTop, width, height, lightsOut.Room.key);
    this.group = game.add.group();
    this.group.add(floor);

    // left wall
    this.group.add(lightsOut.Room.makeVWallTop(game, height, roomLeft, roomTop, wallPC));
    this.group.add(lightsOut.Room.makeVWallBottom(game, height, roomLeft, roomTop, wallPC));

    // right wall
    this.group.add(lightsOut.Room.makeVWallTop(game, height, roomRight - lightsOut.Room.wallWidth, roomTop, wallPC));
    this.group.add(lightsOut.Room.makeVWallBottom(game, height, roomRight - lightsOut.Room.wallWidth, roomTop, wallPC));

    // top wall
    this.group.add(lightsOut.Room.makeHWallLeft(game, width, roomLeft, roomTop, wallPC));
    this.group.add(lightsOut.Room.makeHWallRight(game, width, roomLeft, roomTop, wallPC));

    // bottom wall
    this.group.add(lightsOut.Room.makeHWallLeft(game, width, roomLeft, roomBottom - lightsOut.Room.wallWidth, wallPC));
    this.group.add(lightsOut.Room.makeHWallRight(game, width, roomLeft, roomBottom - lightsOut.Room.wallWidth, wallPC));

    /** 
     * The lighting for the room sets the level of visibility, an alpha value of 1.0 indicates an unlit room, 
     * and a value of 0.0 indicates full visibility.
     */
    this.lighting = game.add.tileSprite(roomLeft, roomTop, width, height, lightsOut.Room.lightingKey);
    this.group.add(this.lighting);

    this.group.sort();

    /**
     * The min and max alpha values for the lighting in this room.
     */
    this.lightingAlphaMin = 1.0;
    this.lightingAlphaMax = 1.0;
    this.lightingFlickerPeriodSeconds = 5;
    game.time.events.loop(Phaser.Timer.SECOND * this.lightingFlickerPeriodSeconds / 50, this.updateLightingAlpha, this);
    game.time.events.start();
    this.setState(game, lightsOut.Room.State.LIT, 1000);
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
    LIT : 0.8,

    /**
     * Indicates that the room is dark.
     */
    UNLIT : 1.0
  };

  /** Factory function for creating a room group. */
  lightsOut.Room.createRoom = function(game, x, y, width, height) {
    return new lightsOut.Room(game, x, y, width, height);
  };

  /**
   * Unique key by which room resources may be referenced.
   */
  lightsOut.Room.key = "room";
  lightsOut.Room.lightingKey = "lighting";
  lightsOut.Room.wallKey = "wall";
  lightsOut.Room.load = function(game) {
    game.load.spritesheet(lightsOut.Room.key, "assets/sprites/room.png", 50, 50);
    game.load.spritesheet(lightsOut.Room.wallKey, "assets/sprites/wall.png", 10, 10);
    game.load.spritesheet(lightsOut.Room.lightingKey, "assets/sprites/lighting.png", 10, 10);
  };

  lightsOut.Room.wallWidth = 10;

  lightsOut.Room.makeHWallLeft = function(game, width, leftBound, topBound, wallWidthPercent) {
    var wallWidth = (width / 2.0) * (1.0 - wallWidthPercent);
    var wallX = leftBound;
    var hWallLeft = game.add.tileSprite(wallX, topBound, wallWidth, lightsOut.Room.wallWidth, lightsOut.Room.wallKey);
    lightsOut.Room.enableWallPhysics(game, hWallLeft);
    return hWallLeft;
  }

  lightsOut.Room.makeHWallRight = function(game, width, leftBound, topBound, wallWidthPercent) {
    var wallWidth = (width / 2.0) * (1.0 - wallWidthPercent);
    var wallX = leftBound + width - wallWidth;
    var hWallLeft = game.add.tileSprite(wallX, topBound, wallWidth, lightsOut.Room.wallWidth, lightsOut.Room.wallKey);
    lightsOut.Room.enableWallPhysics(game, hWallLeft);
    return hWallLeft;
  }

  lightsOut.Room.makeVWallTop = function(game, height, leftBound, topBound, wallHeightPercent) {
    var wallHeight = (height / 2.0) * (1.0 - wallHeightPercent);
    var wallY = topBound;
    var lWallTop = game.add.tileSprite(leftBound, wallY, lightsOut.Room.wallWidth, wallHeight, lightsOut.Room.wallKey);
    lightsOut.Room.enableWallPhysics(game, lWallTop);
    return lWallTop;
  };

  lightsOut.Room.makeVWallBottom = function(game, height, leftBound, topBound, wallHeightPercent) {
    var wallHeight = (height / 2.0) * (1.0 - wallHeightPercent);
    var wallY = topBound + height - wallHeight;
    var lWallTop = game.add.tileSprite(leftBound, wallY, lightsOut.Room.wallWidth, wallHeight, lightsOut.Room.wallKey);
    lightsOut.Room.enableWallPhysics(game, lWallTop);
    return lWallTop;
  };

  /**
   * Enables the wall physics properties for the specified sprite. Usually you will
   * call this function when creating a new wall.
   */
  lightsOut.Room.enableWallPhysics = function(game, sprite) {
    game.physics.arcade.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.checkCollision.up = true;
    sprite.body.checkCollision.down = true;
    sprite.body.checkCollision.left = true;
    sprite.body.checkCollision.right = true;
  }

  lightsOut.Room.prototype.constructor = lightsOut.Room;

  /**
   * Collides the blocking elements of the room with the specified sprite.
   */
  lightsOut.Room.prototype.collideWith = function(sprite) {
    this.game.physics.arcade.collide(this.group, sprite);
  };

  /**
   * Illuminates the room.
   */
  lightsOut.Room.prototype.setLit = function(game) {
    this.setState(game, lightsOut.Room.State.LIT, 1000);
  };

  /**
   * Sets the room to dark.
   */
  lightsOut.Room.prototype.setUnlit = function(game) {
    this.setState(game, lightsOut.Room.State.UNLIT, 1000);
  };

  /**
   * @param State must be one of lightsOut.Room.State.
   */
  lightsOut.Room.prototype.setState = function(game, state, tweenTimeMs) {
    this.state = state;

    var lightingTween = game.add.tween(this);
    lightingTween.to( { lightingAlphaMin: state * 0.9, lightingAlphaMax: state }, tweenTimeMs, Phaser.Easing.Linear.None);
    lightingTween.start();
  };

  lightsOut.Room.prototype.updateLightingAlpha = function() {
    var time = this.game.time.totalElapsedSeconds();
    var lightingLerp = (Math.sin(2 * Math.PI * time / this.lightingFlickerPeriodSeconds) + 1) / 2;
    this.lighting.alpha = this.lightingAlphaMin + (this.lightingAlphaMax - this.lightingAlphaMin) * lightingLerp;
  };

  return lightsOut;
}(LightsOut || {}));
