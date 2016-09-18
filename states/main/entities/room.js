var LightsOut = (function(lightsOut){

  lightsOut.Room = function(game) {
    this.game = game;
    // load the phaser sprite backing this room.
    Phaser.Sprite.call(this, game, 0, 0, lightsOut.Room.key);
  };

  /**
   * Unique key by which room resources may be referenced.
   */
  lightsOut.Room.key = "room";
  lightsOut.Room.load = function(game) {
    game.load.spritesheet(lightsOut.Room.key, "assets/sprites/room.png", 50, 50);
  };

  lightsOut.Room.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Room.prototype.constructor = lightsOut.Room;

  return lightsOut;
}(LightsOut || {}));
