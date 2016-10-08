var Room = require('./entities/room');

/**
 * Maintains the collection of rooms in the game and updates their
 * state according to the location of lighting sprites.
 */

/**
 * Creates a new room manager.
 * @param game the current Phaser.Game.
 * @param player the player sprite. Rooms
 * containing this sprite that are otherwise unlit will have their lit
 * state set to SEMI_LIT. Lit rooms are not affected by the torch sprite.
 */
module.exports = function(game, player) {
  this.game = game;
  this.player = player;
  this.rooms = [];
  this.roomSprites = [];

  this.previouslyOverlappedRooms = [];
};

/**
 * Adds a room to the room manager.
 */
module.exports.prototype.addRoom = function(room) {
  this.rooms.push(room);
  this.roomSprites.push(room.getLightingSprite());
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
  this.previouslyOverlappedRooms.forEach(r => {
    if (r.getIllumination() != Room.State.LIT) {
      r.setIllumination(Room.State.UNLIT);
    }
  });
  this.previouslyOverlappedRooms = [];

  this.game.physics.arcade.overlap(this.player.getLightingBounds(), this.roomSprites,
    (playerLighting, roomLighting) => {
      var i = this.roomSprites.indexOf(roomLighting);
      var room = this.rooms[i];
      this.previouslyOverlappedRooms.push(room);

      if (room.getIllumination() == Room.State.LIT) {
        return;
      }
      room.setIllumination(Room.State.SEMI_LIT, playerLighting.x, playerLighting.y);
    });
};
