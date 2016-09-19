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

      this.player = new lightsOut.Player(game, mapFile.player.x, mapFile.player.y);

      var roomManager = new lightsOut.RoomManager(this.game, this.player);
      this.roomManager = roomManager;

      this.nasty = new lightsOut.Nasty(game, roomManager, mapFile.nasty.x, mapFile.nasty.y);

      var zDepth = new lightsOut.ZDepth(game);
      zDepth.sprite.add(this.nasty);
      zDepth.sprite.add(this.player);

      mapFile.rooms.forEach(function(room) {
        var newRoom = lightsOut.Room.createRoom(game, zDepth,
          room.x, room.y, room.w, room.h,
          room.doors.top, room.doors.bottom, room.doors.left, room.doors.right);

          newRoom.setIllumination(room.lit ?
            lightsOut.Room.State.LIT :
            lightsOut.Room.State.UNLIT);

        roomManager.addRoom(newRoom);
      });
    },

    update: function() {
      this.roomManager.step();
      this.roomManager.collideWith(this.player);
      this.nasty.step(this.player);
    },
  };

  return LightsOut;
}(LightsOut || {}));
