var InteractiveEntity = require('./interactiveEntity');

class Note extends InteractiveEntity {

  constructor(game, x, y, player, text) {
    super(game, 'note', x, y, player, Note.prototype.onInteract, Note.prototype.onActivationStatus);
    this.onInteractContext = this;
    this.onActivationStatusContext = this;

    this.game = game;
    
    this.text = game.add.text(0, 0, text, Note.textStyle(game));
    this.text.fixedToCamera = true;
    this.text.cameraOffset.setTo(4, game.camera.height);
    this.text.visible = false;

    if (this.text.height > Note.textHeight(this.game)) {
      throw "Text for this note is too large to be displayed on screen";
    }

    this.tween = false;
    this.isOpen = false;
  }

  static textHeight(game) {
    return game.camera.height * 0.33;
  }

  static textStyle(game) {
    return { font: '8px monospace', fill: "white", wordWrap: true, wordWrapWidth: game.camera.width - 8 };
  }

  onInteract() {

    // do nothing
    if (this.tween) {
      return true;
    }

    if (this.isOpen) {
      this.tween = this.game.add.tween(this.text.cameraOffset);
      this.tween.to({y: this.game.camera.height }, 500, Phaser.Easing.Linear.None);
      this.tween.onComplete.add(() => {
        this.text.visible = false;
        this.tween = false;
      });
      this.isOpen = false;
    } else {
      this.text.visible = true;
      this.tween = this.game.add.tween(this.text.cameraOffset);
      this.tween.to({y: this.game.camera.height - Note.textHeight(this.game) }, 500, Phaser.Easing.Linear.None);
      this.tween.onComplete.add(() => { 
        this.tween = false;
      });
      this.isOpen = true;
    }

    this.tween.start();
    return true;
  }

  onActivationStatus(isActive) {
    if (!isActive && this.isOpen) {
      if (this.tween) {
        this.tween.stop();
        this.tween = false;
      }

      this.onInteract();
    }
  }
}

module.exports = Note;