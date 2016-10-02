var LightsOut = (function(lightsOut){
  lightsOut.States = lightsOut.States || {};

  lightsOut.States.Main = {

    SubStates: {
      ENTERING: 0,
      PLAYING: 1,
      EXITING: 2,
      DYING: 3
    },

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
      game.load.image('key', 'assets/sprites/key.png');
      game.load.image('floor', 'assets/tilesets/office-floor.png');
      game.load.image('floor-items', 'assets/tilesets/floor-items.png');
      game.load.image('office-divider', 'assets/tilesets/office-divider.png');
      game.load.image('window', 'assets/tilesets/window.png');
      game.load.image('office-lighting', 'assets/tilesets/office-lighting.png');
      game.load.image('floor-lighting', 'assets/tilesets/floor-lighting.png');
      game.load.image('ceiling-lighting', 'assets/tilesets/ceiling-lighting.png');
    },

    create: function() {
      map = this.game.add.tilemap('map');
      this.map = map;

      map.addTilesetImage('wall', 'wall');
      map.addTilesetImage('floor', 'floor');
      map.addTilesetImage('office-divider', 'office-divider');
      map.addTilesetImage('floor-items', 'floor-items');
      map.addTilesetImage('window', 'window');
      map.addTilesetImage('office-lighting', 'office-lighting');
      map.addTilesetImage('floor-lighting', 'floor-lighting');
      map.addTilesetImage('ceiling-lighting', 'ceiling-lighting');

      this.wallLayer = map.createLayer('Walls');
      var floorLayer = map.createLayer('Floor');
      var floorLightingLayer = map.createLayer('FloorLighting');
      var ceilingLightingLayer = map.createLayer('CeilingLighting');
      var floorItemsLayer = map.createLayer('FloorItems');
      var ceilingLayer = map.createLayer('Ceiling');

      this.wallLayer.resizeWorld();
      this.wallLayer.debug = this.debugMode;
      map.setCollisionBetween(0, 100, true, this.wallLayer);

      var zDepth = new lightsOut.ZDepth(this.game);
      zDepth.wall.add(this.wallLayer);
      zDepth.floor.add(floorLayer);
      zDepth.floorLighting.add(floorLightingLayer);
      zDepth.floorItems.add(floorItemsLayer);
      zDepth.ceiling.add(ceilingLayer);
      zDepth.ceilingLighting.add(ceilingLightingLayer);

      var mapImporter = new lightsOut.MapImporter(this.game, zDepth, map);
      this.roomManager = mapImporter.getRoomManager();
      this.navMesh = mapImporter.getNavMesh();
      this.player = mapImporter.getPlayer();
      this.keys = mapImporter.getKeys();
      this.enemies = mapImporter.getEnemies();
      this.exit = mapImporter.getExit();

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

      this.subState = lightsOut.States.Main.SubStates.PLAYING;
    },

    update: function() {
      // do nothing if the player has died.
      if (this.subState != lightsOut.States.Main.SubStates.PLAYING) {
        return;
      }

      this.game.physics.arcade.collide(this.player, this.wallLayer);
      this.game.physics.arcade.collide(this.enemies, this.wallLayer);
      this.game.physics.arcade.collide(this.enemies, this.enemies);

      if (this.exit.isUnlocked()) {
        this.game.physics.arcade.overlap(this.player, this.exit, function(player, exit){
          this.player.disableControls();
          this.subState = lightsOut.States.Main.SubStates.EXITING;

          this.game.state.start('main', true, false, { mapName: exit.getDestinationMapName() });
        }, null, this);
      }

      this.roomManager.step();

      if (!this.player.isAlive()) {
        this.player.disableControls();
        this.subState = lightsOut.States.Main.SubStates.DYING;
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

        var navPoints = this.navMesh.points;
        var game = this.game;
        navPoints.forEach(function(point) {
          point.attachedIndices.forEach(function(i) {
            var line = new Phaser.Line(point.x, point.y, navPoints[i].x, navPoints[i].y);
            game.debug.geom(line);
          });
        });

        this.enemies.forEach(function(enemy){
          game.debug.body(enemy);
          game.debug.bodyInfo(enemy, 32, 32);

          for (var i = 0; i < enemy.path.length; i++) {
            game.debug.geom(new Phaser.Circle(enemy.path[i].x, enemy.path[i].y, 30));
          }

        }, this);
      }
    }
  };

  return LightsOut;
}(LightsOut || {}));
