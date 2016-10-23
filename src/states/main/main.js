var ZDepth = require('./zDepth');
var MapImporter = require('./mapImporter');
var StressMeter = require('./stressMeter');
var TriggerManager = require('./triggerManager');

var Player = require('./entities/player');
var Nasty = require('./entities/nasty');
var Note = require('./entities/note');
var Door = require('./entities/door');

module.exports = {

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
      // stops pixel interpolation on rendering.
      this.game.renderer.renderSession.roundPixels = true;

      this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      this.game.scale.setUserScale(4, 4);
      this.game.scale.refresh();
      this.game.stage.backgroundColor = '#000000';

      var assetContext = require.context('../../../assets', true, /.*(\.png|\.json|\.mp3|\.wav)$/);

      // load assets.
      Nasty.load(this.game, assetContext);

      this.game.load.tilemap("map", assetContext('./maps/' + this.mapName), null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('key', assetContext('./sprites/key.png'));
      this.game.load.image('note', assetContext('./sprites/note.png'));
      this.game.load.image('buzzer', assetContext('./sprites/buzzer.png'));
      this.game.load.spritesheet('dave', assetContext('./sprites/dave.png'), 16, 32);
      this.game.load.image('floor', assetContext('./tilesets/office-floor.png'));
      this.game.load.image('menu', assetContext('./tilesets/menu.png'));
      this.game.load.image('floor-items', assetContext('./tilesets/floor-items.png'));
      this.game.load.image('office-divider', assetContext('./tilesets/office-divider.png'));
      this.game.load.image('window', assetContext('./tilesets/window.png'));
      this.game.load.image('office-lighting', assetContext('./tilesets/office-lighting.png'));
      this.game.load.spritesheet('office-worker', assetContext('./sprites/office-worker.png'), 16, 32, 2);
      this.game.load.image('floor-lighting', assetContext('./tilesets/floor-lighting.png'));
      this.game.load.image('ceiling-lighting', assetContext('./tilesets/ceiling-lighting.png'));
      this.game.load.image('floor-numbers', assetContext('./tilesets/floor-numbers.png'));
      this.game.load.image('hdoor', assetContext('./sprites/hdoor.png'));
      this.game.load.image('vdoor', assetContext('./sprites/vdoor.png'));
      this.game.load.image('computer', assetContext('./sprites/computer.png'));
      this.game.load.image('speaker', assetContext('./sprites/speaker.png'));

      this.game.load.audio('nasty-ambience', assetContext('./sounds/243045__phinster__cicada-with-dog.mp3'));
      this.game.load.audio('office-ambience-day', assetContext('./sounds/168596__zabuhailo__office-refrigerator.mp3'));
      this.game.load.audio('office-ambience-night', assetContext('./sounds/182872__klankbeeld__nightcity-hum-01-130212.mp3'));
      this.game.load.audio('exit-unlocked', assetContext('./sounds/346425__soneproject__ecofuture3.mp3'));
      this.game.load.audio('interact', assetContext('./sounds/240943__htn4ever__notif-1.mp3'));
      this.game.load.audio('player-walk', assetContext('./sounds/189640__yuval__grass-loop-short.mp3'));
    },

    create: function() {
      var map = this.game.add.tilemap('map');
      this.map = map;

      map.addTilesetImage('menu', 'menu');
      map.addTilesetImage('floor', 'floor');
      map.addTilesetImage('office-divider', 'office-divider');
      map.addTilesetImage('floor-items', 'floor-items');
      map.addTilesetImage('window', 'window');
      map.addTilesetImage('office-lighting', 'office-lighting');
      map.addTilesetImage('floor-numbers', 'floor-numbers');
      map.addTilesetImage('floor-lighting', 'floor-lighting');
      map.addTilesetImage('ceiling-lighting', 'ceiling-lighting');

      this.wallLayer = map.createLayer('Walls');
      var floorLayer = map.createLayer('Floor');
      var floorLightingLayer = map.createLayer('FloorLighting');
      var ceilingLightingLayer = map.createLayer('CeilingLighting');
      var floorItemsLayer = map.createLayer('FloorItems');
      var ceilingLayer = map.createLayer('Ceiling');

      this.wallLayer.resizeWorld();
      // this.wallLayer.debug = this.debugMode;
      map.setCollisionBetween(0, 100, true, this.wallLayer);

      var zDepth = new ZDepth(this.game);
      zDepth.wall.add(this.wallLayer);
      zDepth.floor.add(floorLayer);
      zDepth.floorLighting.add(floorLightingLayer);
      zDepth.floorItems.add(floorItemsLayer);
      zDepth.ceiling.add(ceilingLayer);
      zDepth.ceilingLighting.add(ceilingLightingLayer);

      this.triggerManager = new TriggerManager();

      var mapImporter = new MapImporter(this.game, this.wallLayer, this.triggerManager, zDepth, map);
      this.lighting = mapImporter.getLighting(this.wallLayer);
      this.navMesh = mapImporter.getNavMesh();
      this.player = mapImporter.getPlayer();
      this.keys = mapImporter.getKeys();
      this.enemies = mapImporter.getEnemies();
      this.exit = mapImporter.getExit();
      this.doorMap = mapImporter.getDoors();
      this.doors = [];
      for (var doorName in this.doorMap) {
        this.doors.push(this.doorMap[doorName]);
      }
      this.notes = mapImporter.getNotes();

      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.enable(this.wallLayer);
      this.game.physics.arcade.enable(this.player);

      var stressMeter = new StressMeter(this.game, this.player, this.enemies);
      zDepth.ceilingLighting.add(stressMeter);

      var style = { font: "32px verdana", fill: "#ff0044", wordWrap: true, wordWrapWidth: 300, align: "center" };
      this.deathText = this.game.add.text(0, 0, "You Are Dead.", style);
      this.deathText.anchor.set(0.5);
      this.deathText.fixedToCamera = true;
      this.deathText.cameraOffset.setTo(this.game.camera.view.width / 2,
        this.game.camera.view.height / 2);
      this.deathText.visible = false;
      this.deathText.alpha = 0;

      this.subState = module.exports.SubStates.PLAYING;

      this.lighting.recalculateVisibleTiles();
    },

    triggerMapTransition: function(destinationMapName) {
      this.player.disableControls();
      this.subState = module.exports.SubStates.EXITING;
      this.game.state.start('main', true, false, { mapName: destinationMapName });
    },

    update: function() {
      // do nothing if the player has died.
      if (this.subState != module.exports.SubStates.PLAYING) {
        return;
      }

      this.game.physics.arcade.collide(this.player, this.wallLayer);
      this.game.physics.arcade.collide(this.player, this.doors);
      this.game.physics.arcade.collide(this.player, this.enemies);
      this.game.physics.arcade.collide(this.enemies, this.doors);
      this.game.physics.arcade.collide(this.enemies, this.wallLayer);
      this.game.physics.arcade.collide(this.enemies, this.enemies);

      if (this.exit.isUnlocked()) {
        this.game.physics.arcade.overlap(this.player, this.exit, function(player, exit){
          this.triggerMapTransition(exit.getDestinationMapName());
        }, null, this);
      }

      if (!this.player.isAlive()) {
        this.player.disableControls();
        this.subState = module.exports.SubStates.DYING;
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

          for (var i = 0; i < enemy.path.length; i++) {
            game.debug.geom(new Phaser.Circle(enemy.path[i].x, enemy.path[i].y, 30));
          }

        }, this);

        this.doors.forEach(d => game.debug.body(d));
      }
    }
};