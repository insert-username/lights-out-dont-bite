/**
 * Defines an entity which the player may interact with.
 * A highlight is displayed over the sprite representing that it has become active when the player is near.
 * The player is then notified of the interactive sprite's presence, and may call the interact() method
 * to trigger the interaction.
 */
var LightsOut = (function(lightsOut){

  /**
   * @param player the LightsOut.Player object.
   * @param onInteract callback function which is called exactly once on interact.
   * @param onInteractContext the context in which the onInteract callback will be called.
   * @param onActivate optional parameter that will be called whenever the interactive entity is activated.
   * @param onActivateContext optional context for onActivate.
   */
  lightsOut.InteractiveEntity = function(game, key, x, y, player, 
    onInteract, onInteractContext, 
    onActivate, onActivateContext) {
    
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
    this.hasInteracted = false;

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
  };

  lightsOut.InteractiveEntity.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.InteractiveEntity.prototype.constructor = lightsOut.InteractiveEntity;

  lightsOut.InteractiveEntity.prototype.update = function() {
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
      
      if (this.onActivate != undefined) {
        this.onActivate.call(this.onActivateContext);
      }
    } else {
      this.flashTween.pause();
      this.overlaySprite.alpha = 0;
    }
  };

  /**
   * Triggers the interaction callback to be called.
   */
  lightsOut.InteractiveEntity.prototype.interact = function() {
      // the interaction function should only be called once.
      if (this.hasInteracted) {
          return;
      }
      this.hasInteracted = true;

      this.player.setInteractiveEntity();
      this.onInteract.call(this.onInteractContext);
      this.flashTween.stop();
      this.destroy();
  };

  /**
   * Disables this entity. This prevents the entity from becoming 
   * active and being interacted with.
   */
  lightsOut.InteractiveEntity.prototype.disable = function() {
    this.isEnabled = false;
  };

  return lightsOut;
}(LightsOut || {}));
