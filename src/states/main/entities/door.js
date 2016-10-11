class Door extends Phaser.Sprite {
  
  /**
   * @param rotation the rotation of the door from the neutral position facing up.
   */
  constructor(game, x, y, rotation, isOpen) {
    super(game, x, y, Door.keyForRotation(rotation));

    this.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.width = Door.isDoorVertical(rotation) ? 8 : 16;
    this.body.height = Door.isDoorVertical(rotation) ? 16 : 8;

    if (isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.body.enable = false;
    this.visible = false;
  }

  isOpen() {
    return !this.visible;
  }

  close() {
    this.body.enable = true;
    this.visible = true;
  }

  flipOpenState() {
    this.body.enable = !this.body.enable;
    this.visible = !this.visible;
  }

  static keyForRotation(rotation) {
    return Door.isDoorVertical(rotation) ?
      "vdoor" :
      "hdoor";
  }

  static isDoorVertical(rotation) {
    return rotation === -90 || rotation === 90;
  }
}

module.exports = Door;
