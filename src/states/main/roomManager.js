var Room = require('./entities/room');

/**
 * Maintains the collection of rooms in the game and updates their
 * state according to the location of lighting sprites.
 */

/**
 * Creates a new room manager.
 * @param game the current Phaser.Game.
 * @param torchSprite a sprite which partially illuminates rooms. Rooms
 * containing this sprite that are otherwise unlit will have their lit
 * state set to SEMI_LIT. Lit rooms are not affected by the torch sprite.
 */
module.exports = function(game, torchSprite) {
  this.game = game;
  this.torchSprite = torchSprite;
  this.rooms = [];
};

/**
 * Adds a room to the room manager.
 */
module.exports.prototype.addRoom = function(room) {
  this.rooms.push(room);
};

/**
 * Returns the room containing the specified sprite.
 */
module.exports.prototype.getContainingRoom = function(sprite) {
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

module.exports.prototype.step = function() {
  var semiLitRoom = this.getContainingRoom(this.torchSprite);
  if (semiLitRoom.getIllumination() == Room.State.UNLIT) {
    semiLitRoom.setIllumination(Room.State.SEMI_LIT);
  }

  // all other semi-lit rooms will be darkened as the player
  // has left them.
  this.rooms.forEach(function(room) {
    if (room != semiLitRoom && room.getIllumination() == Room.State.SEMI_LIT) {
      room.setIllumination(Room.State.UNLIT);
    }
  });
};
