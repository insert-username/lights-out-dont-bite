/**
 * Imports a tiled map to create game objects.
 */
var LightsOut = (function(lightsOut){

  lightsOut.MapImporter = function(game, zDepth, map) {
    this.game = game;
    this.zDepth = zDepth;
    var mapRooms = lightsOut.MapImporter.getObjectLayer(map, "Rooms");
    var mapNavMesh = lightsOut.MapImporter.getObjectLayer(map, "Nav Mesh");
    var mapPlayerSpawn = lightsOut.MapImporter.getObjectLayer(map, "Player Spawn");
    var mapKeys = lightsOut.MapImporter.getObjectLayer(map, "Keys");
    var mapEnemySpawn = lightsOut.MapImporter.getObjectLayer(map, "Enemy Spawn");
    var mapExit = lightsOut.MapImporter.getObjectLayer(map, "Exit");

    this.player = this.parsePlayer(mapPlayerSpawn);
    this.exit = this.parseExit(mapExit);
    this.keys = this.parseKeys(this.player, mapKeys, this.exit);
    this.roomManager = this.parseRooms(mapRooms, this.player);
    this.navMesh = this.parseNavMesh(mapNavMesh);
    this.enemies = this.parseEnemies(mapEnemySpawn, this.player, this.roomManager, this.navMesh);
  };

  lightsOut.MapImporter.prototype.getRoomManager = function() {
    if (this.roomManager == undefined) {
      throw "The room manager has not been created yet.";
    }

    return this.roomManager;
  }

  lightsOut.MapImporter.prototype.parseRooms = function(rooms, torchSprite) {
    var roomManager = new lightsOut.RoomManager(this.game, torchSprite);
    this.roomManager = roomManager;

    var game = this.game;
    var zDepth = this.zDepth;
    rooms.forEach(function(room) {
      var newRoom = lightsOut.Room.createRoom(game, zDepth,
        room.navPointIndex,
        room.x, room.y, room.width, room.height);

      newRoom.setIllumination(room.type);
      roomManager.addRoom(newRoom);
    });

    return roomManager;
  };

  lightsOut.MapImporter.prototype.getNavMesh = function() {
    if (this.navMesh === undefined) {
      throw "The Nav mesh has not been created yet.";
    }

    return this.navMesh;
  };

  lightsOut.MapImporter.prototype.parseNavMesh = function(mapNavMesh) {
    var result = new lightsOut.NavMesh();

    var lines = [];
    var points = [];

    mapNavMesh.forEach(function(o) {
      if (o.polyline) {
        lines.push(new Phaser.Line(o.polyline[0][0] + o.x, o.polyline[0][1] + o.y,
          o.polyline[1][0] + o.x, o.polyline[1][1] + o.y));
      } else if (o.rectangle) {
        points.push(new Phaser.Circle(o.x + o.width / 2, o.y + o.height / 2, 16));
      } else  {
        throw "Unexpected navmesh object: " + o;
      }
    });

    var isOverlapping = function(point, line) {
      return point.contains(line.start.x, line.start.y) ||
        point.contains(line.end.x, line.end.y);
    };

    points.forEach(function(p0, i0){

      var overlappingIndices = [];

      lines.forEach(function(l){
        if (isOverlapping(p0, l)) {
          points.forEach(function(p1, i1){
            if (isOverlapping(p1, l)) {
              overlappingIndices.push(i1);
            }
          });
        }
      });

      result.addPoint(p0.x, p0.y, overlappingIndices);
    });

    return result;
  };

  lightsOut.MapImporter.prototype.getPlayer = function() {
    if (this.player === undefined) {
      throw "The Player has not been created yet.";
    }

    return this.player;
  };

  lightsOut.MapImporter.prototype.parsePlayer = function(mapPlayerSpawn) {
    if (mapPlayerSpawn.length != 1) {
      throw "Only one element is permitted in the player spawn layer. Instead, there " +
        "were " + mapPlayerSpawn.length;
    }

    var playerSpawnLocation = mapPlayerSpawn[0];
    var x = playerSpawnLocation.x + playerSpawnLocation.width / 2;
    var y = playerSpawnLocation.y + playerSpawnLocation.height / 2;

    var result = new lightsOut.Player(this.game, x, y);
    this.zDepth.sprite.add(result);
    return result;
  };

  lightsOut.MapImporter.prototype.getKeys = function() {
    if (this.keys === undefined) {
      throw "The Keys have not been created yet.";
    }

    return this.keys;
  };

  lightsOut.MapImporter.prototype.parseKeys = function(player, mapKeys, exit) {
    var result = [];

    for (var i = 0; i < mapKeys.length; i++) {
      var mapKey = mapKeys[i];
      var key = new lightsOut.Key(this.game, mapKey.x, mapKey.y, player, exit);
      this.zDepth.floorItems.add(key);
      result.push(key);
    }

    return result;
  };

  lightsOut.MapImporter.prototype.getEnemies = function() {
    if (this.enemies === undefined) {
      throw "The Enemy has not been created yet.";
    }

    return this.enemies;
  };

  lightsOut.MapImporter.prototype.parseEnemies = function(mapEnemySpawn, player, roomManager, navMesh) {
    var result = [];

    for (var i = 0; i < mapEnemySpawn.length; i++) {
      var enemySpawnLocation = mapEnemySpawn[i];
      var x = enemySpawnLocation.x + enemySpawnLocation.width / 2;
      var y = enemySpawnLocation.y + enemySpawnLocation.height / 2;

      var enemy = new lightsOut.Nasty(this.game, player, roomManager, navMesh, x, y);
      this.zDepth.sprite.add(enemy);
      result.push(enemy);
    }

    return result;
  };

  lightsOut.MapImporter.prototype.getExit = function() {
    if (this.exit === undefined) {
      throw "The Exit has not been created yet.";
    }

    return this.exit;
  };

  lightsOut.MapImporter.prototype.parseExit = function(mapExitLayer) {
    if (mapExitLayer.length != 1) {
      throw "Map expected to contain one exit."
    }

    var mapExit = mapExitLayer[0];

    if (mapExit.properties.keyCount === undefined) {
      throw "Map Exit object should define custom property \"keyCount\". " +
        "This value may be zero if the exit is open by default.";
    }

    return new lightsOut.Exit(this.game, mapExit.x, mapExit.y, mapExit.width, mapExit.height, mapExit.properties.keyCount, mapExit.name);
  };

  lightsOut.MapImporter.getObjectLayer = function(map, objectLayerName) {
    var objectLayer = map.objects[objectLayerName];
    if (objectLayer == undefined) {
      throw "Map expected to contain object layer: " + objectLayerName;
    }
    return objectLayer;
  };

  return lightsOut;
}(LightsOut || {}));
