var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};

  lightsOut.States.Menu = {
    preload: function () {

    },

    create: function () {
      game.stage.backgroundColor = '#20343B';

      this.title = game.add.text(game.world.centerX, game.world.centerY, 
        'WASD to move, and E to interact', { font: '20px monospace', fill: "white" });
      this.title.anchor.set(0.5, 0.5);

      this.subtitle = game.add.text(game.world.centerX, game.world.centerY + 80,
        'Press any key for New Game', { font: '18px monospace', fill: "white" });
      this.subtitle.anchor.set(0.5, 0.5);

      game.input.keyboard.onDownCallback = function () {
        game.state.start('main', true, true, { mapName: "00.json" });
        game.input.keyboard.onDownCallback = null;
      };
    },

    update: function () { }
  };

  return lightsOut;
}(LightsOut || {}));