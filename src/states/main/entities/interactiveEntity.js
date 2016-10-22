/**
 * Defines an entity which the player may interact with.
 * A highlight is displayed over the sprite representing that it has become active when the player is near.
 * The player is then notified of the interactive sprite's presence, and may call the interact() method
 * to trigger the interaction.
 */
/**
 * @param player the LightsOut.Player object.
 * @param onInteract callback function which is called exactly once per interaction. 
 *  This function should return true if the interactive entity should not be destroyed 
 *  after the interaction.
 * @param onInteractContext the context in which the onInteract callback will be called.
 * @param onActivationStatus notified each time there is a change to the activation status
 *  of this entity. Should accept a single boolean parameter: whether the entity is active.
 * @param onActivationStatusContext optional context for onActivationStatus.
 */
module.exports = function(game, key, x, y, player, 
  onInteract, onInteractContext, 
  onActivationStatus, onActivationStatusContext) {
  
  Phaser.Sprite.call(this, game, x, y, key);
  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(this);
  this.game = game;
  this.player = player;
  this.onInteract = onInteract;
  this.onInteractContext = onInteractContext;

  /**
   * Set to true when the player is overlapping this interactive entity.
   */
  this.isEnabled = true;
  this.isActive = false;

  var highlightRect = game.make.bitmapData(this.width, this.height);
  highlightRect.rect(0, 0, this.width, this.height, 'rgb(255, 255, 255)');

  var overlayBitmap = game.make.bitmapData(this.width, this.height);
  overlayBitmap.alphaMask(highlightRect, key);

  this.overlaySprite = game.add.sprite(0, 0, overlayBitmap);
  this.overlaySprite.anchor.setTo(0.5, 0.5);
  this.overlaySprite.alpha = 0;

  this.addChild(this.overlaySprite);
  
  this.flashTween = game.add.tween(this.overlaySprite)
    .to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);

  this.interactionSound = this.game.add.sound('interact', 0.7);
  this.interactionSound.allowMultiple = false;
};

module.exports.prototype = Object.create(Phaser.Sprite.prototype);
module.exports.prototype.constructor = module.exports;

module.exports.prototype.update = function() {
  var wasActive = this.isActive;
  this.isActive = false;
  if (!this.isEnabled) {
    return;
  }
  
  this.game.physics.arcade.overlap(this.player, this, function(){
      this.isActive = true;
      this.player.setInteractiveEntity(this);
  }, null, this);

  if (this.isActive) {
    // ensure tween is running
    this.flashTween.resume();
  } else {
    this.flashTween.pause();
    this.overlaySprite.alpha = 0;
  }

  if (this.isActive != wasActive && this.onActivationStatus != undefined) {
    this.onActivationStatus.call(this.onActivationStatusContext, this.isActive);
  }
};

/**
 * Triggers the interaction callback to be called.
 */
module.exports.prototype.interact = function() {
    if (!this.interactionSound.isPlaying) {
      this.interactionSound.play();
    }

    this.player.setInteractiveEntity();
    var shouldDestroy = !this.onInteract.call(this.onInteractContext);

    if (shouldDestroy) {
      this.flashTween.stop();
      this.destroy();
    }
};

/**
 * Disables this entity. This prevents the entity from becoming 
 * active and being interacted with.
 */
module.exports.prototype.disable = function() {
  this.isEnabled = false;
};
