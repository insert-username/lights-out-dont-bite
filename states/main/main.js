var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};
  lightsOut.States.Main = {
    preload: function() {
      // load assets.
      lightsOut.Room.load(game);
      lightsOut.Player.load(game);
    },

    create: function() {
      // spawn sprites.
      this.game.add.existing(new lightsOut.Room(game));
      this.game.add.existing(new lightsOut.Player(game));
    },

    update: function() {
      // game logic.
    },
  };

  return LightsOut;
}(LightsOut || {}));
