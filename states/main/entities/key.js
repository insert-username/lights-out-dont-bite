/**
 * Defines an entity which may be interacted with.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Key = function(game, x, y, player, exit) {
    lightsOut.InteractiveEntity.call(this, game, lightsOut.Key.Key, x, y, player, this.interactionCallback, this);
    this.game = game;
    this.exit = exit;
  };

  lightsOut.Key.prototype = Object.create(lightsOut.InteractiveEntity.prototype);
  lightsOut.Key.prototype.constructor = lightsOut.Key;

  lightsOut.Key.Key = "key";

  lightsOut.Key.prototype.interactionCallback = function() {
    this.exit.keyPickedUp();
  };

  lightsOut.Key.prototype.update = function() {
    lightsOut.InteractiveEntity.prototype.update.call(this);
    if (this.exit.isUnlocked() && this.isEnabled) {
      this.disable();
    }
  };

  return lightsOut;
}(LightsOut || {}));
