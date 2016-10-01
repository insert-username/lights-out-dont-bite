var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};

  lightsOut.States.Menu = {
    preload: function () {

    },

    create: function () {
      game.stage.backgroundColor = '#000000';

      this.title = game.add.text(0, 0,
        'WASD to move, and E to interact', { font: '20px monospace', fill: "white" });
      this.title.anchor.set(0.5, 0.5);
      this.title.fixedToCamera = true;
      this.title.cameraOffset.setTo(this.game.camera.view.width / 2,
        this.game.camera.view.height / 2);

      this.subtitle = game.add.text(0, 0,
        'Press any key for New Game', { font: '18px monospace', fill: "white" });
      this.subtitle.anchor.set(0.5, 0.5);
      this.subtitle.fixedToCamera = true;
      this.subtitle.cameraOffset.setTo(this.game.camera.view.width / 2,
        this.game.camera.view.height / 2 + 80);

      game.input.keyboard.onDownCallback = function () {
        game.state.start('main', true, true, { mapName: "00.json" });
        game.input.keyboard.onDownCallback = null;
      };
    },

    update: function () { }
  };

  return lightsOut;
}(LightsOut || {}));