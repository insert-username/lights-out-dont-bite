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

      var navMesh = new lightsOut.NavMesh();
      this.navMesh = navMesh;
      mapFile.navMesh.forEach(function(point) {
        navMesh.addPoint(point.x, point.y, point.attachedIndices);
      });

      this.nasty = new lightsOut.Nasty(game, roomManager, navMesh,
        mapFile.nasty.x, mapFile.nasty.y);

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

      var style = { font: "32px verdana", fill: "#ff0044", wordWrap: true, wordWrapWidth: 300, align: "center" };
      this.deathText = game.add.text(this.game.world.width / 2, this.game.world.height / 2, "You Are Dead.", style);
      this.deathText.anchor.set(0.5);
      this.deathText.visible = false;
      this.deathText.alpha = 0;
    },

    update: function() {
      // do nothing if the player has died.
      if (!this.player.isAlive()) {
        return;
      }

      this.roomManager.step();
      this.roomManager.collideWith(this.player);
      this.nasty.step(this.player);

      if (!this.player.isAlive()) {
        var textFadeIn = this.game.add.tween(this.deathText);
        textFadeIn.to({alpha: 1.0}, 500, Phaser.Easing.Linear.None);
        textFadeIn.start();
        this.deathText.visible = true;

        this.game.time.events.add(Phaser.Timer.SECOND * 5, function() {
          this.game.state.start('menu');
        }, this);
      }
    },
  };

  return LightsOut;
}(LightsOut || {}));
