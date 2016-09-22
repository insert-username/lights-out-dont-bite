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
    this.parseNavMesh(mapNavMesh);
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

  lightsOut.MapImporter.prototype.parseNavMesh = function(mapNavMesh) {
// var navMesh = new lightsOut.NavMesh();
//     this.navMesh = navMesh;
//     this.map.navMesh.forEach(function(point) {
//       navMesh.addPoint(point.x, point.y, point.attachedIndices);
//     });
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
