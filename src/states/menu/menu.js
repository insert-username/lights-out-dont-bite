module.exports = {
  preload: function () {
    // stops pixel interpolation on rendering.
    this.game.renderer.renderSession.roundPixels = true;

    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(4, 4);
    this.game.scale.refresh();
  },

  create: function () {

    this.game.stage.backgroundColor = '#000000';

    this.title = this.game.add.text(0, 0,
      'WASD to move, and E to interact', { font: '20px monospace', fill: "white" });
    this.title.anchor.set(0.5, 0.5);
    this.title.fixedToCamera = true;
    this.title.cameraOffset.setTo(this.game.camera.view.width / 2,
      this.game.camera.view.height / 2);

    this.subtitle = this.game.add.text(0, 0,
      'Press any key for New Game', { font: '18px monospace', fill: "white" });
    this.subtitle.anchor.set(0.5, 0.5);
    this.subtitle.fixedToCamera = true;
    this.subtitle.cameraOffset.setTo(this.game.camera.view.width / 2,
      this.game.camera.view.height / 2 + 80);

    this.game.input.keyboard.onDownCallback = function () {
      this.game.state.start('main', true, true, { mapName: "03-stairwell-lvl-5-day.json" });
      this.game.input.keyboard.onDownCallback = null;
    };
  },

  update: function () { }
};
