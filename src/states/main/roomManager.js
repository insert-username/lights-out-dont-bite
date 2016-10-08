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
  // all other semi-lit rooms will be darkened as the player
  // has left them.
  this.rooms.forEach(room => {
    if (room.getIllumination() === Room.State.LIT) {
      return;
    }

    var illuminated = false;
    var lightingBounds = this.player.getLightingBounds();

    this.game.physics.arcade.collide(lightingBounds, room.getLightingSprite(), (playerLighting, roomLighting) => {
      room.setIllumination(Room.State.SEMI_LIT, lightingBounds.x, lightingBounds.y);
      illuminated = true;
    });

    if (!illuminated) {
      room.setIllumination(Room.State.UNLIT);
    }
  });
};
