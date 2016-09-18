var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};

  lightsOut.States.Main = {

    preload: function() {
      // load assets.
      lightsOut.Room.load(game);
      lightsOut.Player.load(game);
    },

    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // spawn sprites.
      this.rooms = [
        lightsOut.Room.createRoom(game, 300, 300, 100, 100),
        lightsOut.Room.createRoom(game, 100, 100, 150, 150),
        lightsOut.Room.createRoom(game, 100, 250, 150, 150)
      ];;

      this.player = new lightsOut.Player(game);
      this.game.add.existing(this.player);
    },

    update: function() {
      var player = this.player;
      this.rooms.forEach(function(room) {
        room.collideWith(player);
      });
    },
  };

  return LightsOut;
}(LightsOut || {}));
