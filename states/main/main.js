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
      lightsOut.Nasty.load(game);
      lightsOut.Player.load(game);
      game.load.text("mapFile", "assets/maps/" + this.mapName);
    },

    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      var mapFileText = this.game.cache.getText("mapFile");
      var mapFile = JSON.parse(mapFileText);

      var zDepth = new lightsOut.ZDepth(game);
      var rooms = [];
      mapFile.rooms.forEach(function(room) {
        var newRoom = lightsOut.Room.createRoom(game, zDepth,
          room.x, room.y, room.w, room.h, 
          room.doors.top, room.doors.bottom, room.doors.left, room.doors.right);
        if(room.lit) {
          newRoom.setLit();
        } else {
          newRoom.setUnlit();
        }
        rooms.push(newRoom);
      });
      this.rooms = rooms;

      this.nasty = new lightsOut.Nasty(game, mapFile.nasty.x, mapFile.nasty.y);
      this.player = new lightsOut.Player(game, mapFile.player.x, mapFile.player.y);
      zDepth.sprite.add(this.nasty);
      zDepth.sprite.add(this.player);
    },

    update: function() {
      var player = this.player;
      this.rooms.forEach(function(room){
        room.collideWith(player);
      });
    },
  };

  return LightsOut;
}(LightsOut || {}));
