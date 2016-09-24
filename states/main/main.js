var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};

  lightsOut.States.Main = {

    init: function(params) {
      // the map file containing the game state.
      this.mapName = params.mapName;
      this.debugMode = false;
    },

    preload: function() {
      // load assets.
      lightsOut.Room.load(game);
      lightsOut.Nasty.load(game);
      lightsOut.Player.load(game);
      game.load.tilemap("map", "assets/maps/" + this.mapName, null, Phaser.Tilemap.TILED_JSON);
      game.load.image('wall', 'assets/sprites/wall.png');
      game.load.image('floor', 'assets/sprites/floor.png');
    },

    create: function() {
      map = this.game.add.tilemap('map');
      this.map = map;

      map.addTilesetImage('wall', 'wall');
      map.addTilesetImage('floor', 'floor');

      this.wallLayer = map.createLayer('Walls');
      var floorLayer = map.createLayer('Floor');

      this.wallLayer.resizeWorld();
      this.wallLayer.debug = this.debugMode;
      map.setCollision(1, true, this.wallLayer);

      var zDepth = new lightsOut.ZDepth(this.game);
      zDepth.wall.add(this.wallLayer);
      zDepth.floor.add(floorLayer);

      var mapImporter = new lightsOut.MapImporter(this.game, zDepth, map);
      this.roomManager = mapImporter.getRoomManager();
      this.navMesh = mapImporter.getNavMesh();
      this.player = mapImporter.getPlayer();
      this.nasty = mapImporter.getEnemy();

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable(this.wallLayer);
      this.game.physics.arcade.enable(this.player);

      var style = { font: "32px verdana", fill: "#ff0044", wordWrap: true, wordWrapWidth: 300, align: "center" };
      this.deathText = this.game.add.text(0, 0, "You Are Dead.", style);
      this.deathText.anchor.set(0.5);
      this.deathText.fixedToCamera = true;
      this.deathText.cameraOffset.setTo(this.game.camera.view.width / 2,
        this.game.camera.view.height / 2);
      this.deathText.visible = false;
      this.deathText.alpha = 0;
    },

    update: function() {
      // do nothing if the player has died.
      if (!this.player.isAlive()) {
        return;
      }

      this.game.physics.arcade.collide(this.player, this.wallLayer);

      this.roomManager.step();
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

    render: function() {
      if (this.debugMode) {
        var game = this.game;

        game.debug.geom(new Phaser.Circle(this.player.x, this.player.y, 50));
        game.debug.geom(new Phaser.Circle(this.nasty.x, this.nasty.y, 50));

        game.debug.bodyInfo(this.player, 10, 10);

        var navPoints = this.navMesh.points;
        var game = this.game;
        navPoints.forEach(function(point) {
          var circle = new Phaser.Circle(point.x, point.y, 10);
          game.debug.geom(circle);
          point.attachedIndices.forEach(function(i) {
            var line = new Phaser.Line(point.x, point.y, navPoints[i].x, navPoints[i].y);
            game.debug.geom(line);
          });
        });
      }
    }
  };

  return LightsOut;
}(LightsOut || {}));
