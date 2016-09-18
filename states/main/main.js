var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};

  lightsOut.States.Main = {

    init: function(params) {
      // the map file containing the game state.
      this.mapName = params.mapName;
    },

    preload: function() {
      // load assets.
      lightsOut.Room.load(game);
      lightsOut.Player.load(game);
      game.load.text("mapFile", "assets/maps/" + this.mapName);
    },

    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      var mapFile = JSON.parse(game.cache.getText("mapFile"));

      var rooms = [];
      mapFile.rooms.forEach(function(room) {
        var newRoom = lightsOut.Room.createRoom(game, room.x, room.y, room.w, room.h, 
          room.doors.top, room.doors.bottom, room.doors.left, room.doors.right);
        if(room.lit) {
          newRoom.setLit();
        } else {
          newRoom.setUnlit();
        }
        rooms.push(newRoom);
      });
      this.rooms = rooms;

      this.player = new lightsOut.Player(game, mapFile.player.x, mapFile.player.y);
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
