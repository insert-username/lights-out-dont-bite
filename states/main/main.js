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
    },

    create: function() {
      //  The 'mario' key here is the Loader key given in game.load.tilemap
      map = this.game.add.tilemap('map');
      this.map = map;

      //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
      //  The second parameter maps this name to the Phaser.Cache key 'tiles'
      map.addTilesetImage('wall', 'wall');

      //  Creates a layer from the World1 layer in the map data.
      //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
      layer = map.createLayer('Walls');

      //  This resizes the game world to match the layer dimensions
      layer.resizeWorld();

      var zDepth = new lightsOut.ZDepth(this.game);
      zDepth.wall.add(layer);

      var mapImporter = new lightsOut.MapImporter(this.game, zDepth, map);
      this.roomManager = mapImporter.getRoomManager();
      this.navMesh = mapImporter.getNavMesh();





      // this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // this.player = new lightsOut.Player(game, mapFile.player.x, mapFile.player.y);



      // this.nasty = new lightsOut.Nasty(game, roomManager, navMesh,
      //   mapFile.nasty.x, mapFile.nasty.y);


      // zDepth.sprite.add(this.nasty);
      // zDepth.sprite.add(this.player);



      // var style = { font: "32px verdana", fill: "#ff0044", wordWrap: true, wordWrapWidth: 300, align: "center" };
      // this.deathText = game.add.text(this.game.world.width / 2, this.game.world.height / 2, "You Are Dead.", style);
      // this.deathText.anchor.set(0.5);
      // this.deathText.visible = false;
      // this.deathText.alpha = 0;
    },

    update: function() {
      // do nothing if the player has died.
      // if (!this.player.isAlive()) {
      //   return;
      // }

      // this.roomManager.step();
      // this.roomManager.collideWith(this.player);
      // this.nasty.step(this.player);

      // if (!this.player.isAlive()) {
      //   var textFadeIn = this.game.add.tween(this.deathText);
      //   textFadeIn.to({alpha: 1.0}, 500, Phaser.Easing.Linear.None);
      //   textFadeIn.start();
      //   this.deathText.visible = true;

      //   this.game.time.events.add(Phaser.Timer.SECOND * 5, function() {
      //     this.game.state.start('menu');
      //   }, this);
      // }
    },

    render: function() {
      if (this.debugMode) {
        var game = this.game;

        game.debug.geom(new Phaser.Circle(this.player.x, this.player.y, 50));
        game.debug.geom(new Phaser.Circle(this.nasty.x, this.nasty.y, 50));

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
