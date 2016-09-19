/**
 * Maintains the collection of rooms in the game.
 */
var LightsOut = (function(lightsOut){

  lightsOut.RoomManager = function(game) {
    this.game = game;
    this.rooms = [];
  };

  /**
   * Adds a room to the room manager.
   */
  lightsOut.RoomManager.prototype.addRoom = function(room) {
    this.rooms.push(room);
  };

  /**
   * Collides the rooms with the specified sprite.
   */
  lightsOut.RoomManager.prototype.collideWith = function(sprite) {
      this.rooms.forEach(function(room){
        room.collideWith(sprite);
      });
  };

  /**
   * Returns the room containing the specified sprite.
   */
  lightsOut.RoomManager.prototype.getContainingRoom = function(sprite) {
    var x = sprite.x;
    var y = sprite.y;
    var containingRoom = null;
    this.rooms.forEach(function(room) {
      if (room.containsPoint(x, y)) {
        containingRoom = room;
      }
    });

    if (containingRoom != null) {
      return containingRoom;
    }

    throw "The sprite is not in a game room.";
  };

  return lightsOut;
}(LightsOut || {}));
