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

    this.roomManager = this.parseRooms(mapRooms);
    this.navMesh = this.parseNavMesh(mapNavMesh);
    this.parsePlayer(mapPlayerSpawn);
    this.parseEnemy(mapEnemySpawn);

    // Object {Rooms: Array[6], Nav Mesh: Array[25], PlayerSpawn: Array[1], Enemy: Array[1]}
  };

  lightsOut.MapImporter.prototype.getRoomManager = function() {
    if (this.roomManager == undefined) {
      throw "The room manager has not been created yet.";
    }

    return this.roomManager;
  }

  lightsOut.MapImporter.prototype.parseRooms = function(rooms) {
    var roomManager = new lightsOut.RoomManager(this.game, this.player);
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

  lightsOut.MapImporter.prototype.parsePlayer = function(mapPlayerSpawn) {

  };

  lightsOut.MapImporter.prototype.parseEnemy = function(mapEnemySpawn) {

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
