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
    var mapEnemySpawn = lightsOut.MapImporter.getObjectLayer(map, "Enemy Spawn");

    this.player = this.parsePlayer(mapPlayerSpawn);
    this.roomManager = this.parseRooms(mapRooms, this.player);
    this.navMesh = this.parseNavMesh(mapNavMesh);
    this.nasty = this.parseEnemy(mapEnemySpawn, this.roomManager, this.navMesh);
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

  lightsOut.MapImporter.prototype.getEnemy = function() {
    if (this.nasty === undefined) {
      throw "The Enemy has not been created yet.";
    }

    return this.nasty;
  };

  lightsOut.MapImporter.prototype.parseEnemy = function(mapEnemySpawn, roomManager, navMesh) {
    if (mapEnemySpawn.length != 1) {
      throw "Only one element is permitted in the enemy spawn layer. Instead, there " +
        "were " + mapEnemySpawn.length;
    }

    var enemySpawnLocation = mapEnemySpawn[0];
    var x = enemySpawnLocation.x + enemySpawnLocation.width / 2;
    var y = enemySpawnLocation.y + enemySpawnLocation.height / 2;

    var result = new lightsOut.Nasty(this.game, roomManager, navMesh, x, y);
    this.zDepth.sprite.add(result);
    return result;
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
