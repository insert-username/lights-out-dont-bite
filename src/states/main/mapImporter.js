var RoomManager = require('./roomManager');
var NavMesh = require('./navMesh');

var Player = require('./entities/player');
var Nasty = require('./entities/nasty');
var Key = require('./entities/key');
var Room = require('./entities/room');
var Exit = require('./entities/exit');
var Door = require('./entities/door');

/**
 * Imports a tiled map to create game objects.
 */
module.exports = function(game, zDepth, map) {
  this.game = game;
  this.zDepth = zDepth;
  var mapRooms = module.exports.getObjectLayer(map, "Rooms");
  var mapNavMesh = module.exports.getObjectLayer(map, "Nav Mesh");
  var mapPlayerSpawn = module.exports.getObjectLayer(map, "Player Spawn");
  var mapKeys = module.exports.getObjectLayer(map, "Keys");
  var mapEnemySpawn = module.exports.getObjectLayer(map, "Enemy Spawn");
  var mapExit = module.exports.getObjectLayer(map, "Exit");
  var mapDoors = module.exports.getObjectLayer(map, "Doors");

  this.player = this.parsePlayer(mapPlayerSpawn);
  this.exit = this.parseExit(mapExit);
  this.keys = this.parseKeys(this.player, mapKeys, this.exit);
  this.roomManager = this.parseRooms(mapRooms, this.player);
  this.navMesh = this.parseNavMesh(mapNavMesh);
  this.enemies = this.parseEnemies(mapEnemySpawn, this.player, this.roomManager, this.navMesh);
  this.doors = this.parseDoors(mapDoors);
};

module.exports.prototype.getRoomManager = function() {
  if (this.roomManager == undefined) {
    throw "The room manager has not been created yet.";
  }

  return this.roomManager;
}

module.exports.prototype.parseRooms = function(rooms, torchSprite) {
  var roomManager = new RoomManager(this.game, torchSprite);
  this.roomManager = roomManager;

  var game = this.game;
  var zDepth = this.zDepth;
  rooms.forEach(function(room) {
    var newRoom = Room.createRoom(game, zDepth,
      room.navPointIndex,
      room.x, room.y, room.width, room.height);

    newRoom.setIllumination(room.type);
    roomManager.addRoom(newRoom);
  });

  return roomManager;
};

module.exports.prototype.getNavMesh = function() {
  if (this.navMesh === undefined) {
    throw "The Nav mesh has not been created yet.";
  }

  return this.navMesh;
};

module.exports.prototype.parseNavMesh = function(mapNavMesh) {
  var result = new NavMesh();

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

module.exports.prototype.getPlayer = function() {
  if (this.player === undefined) {
    throw "The Player has not been created yet.";
  }

  return this.player;
};

module.exports.prototype.parsePlayer = function(mapPlayerSpawn) {
  if (mapPlayerSpawn.length != 1) {
    throw "Only one element is permitted in the player spawn layer. Instead, there " +
      "were " + mapPlayerSpawn.length;
  }

  var playerSpawnLocation = mapPlayerSpawn[0];
  var x = playerSpawnLocation.x + playerSpawnLocation.width / 2;
  var y = playerSpawnLocation.y + playerSpawnLocation.height / 2;

  var result = new Player(this.game, x, y);
  this.zDepth.sprite.add(result);
  return result;
};

module.exports.prototype.getKeys = function() {
  if (this.keys === undefined) {
    throw "The Keys have not been created yet.";
  }

  return this.keys;
};

module.exports.prototype.parseKeys = function(player, mapKeys, exit) {
  var result = [];

  for (var i = 0; i < mapKeys.length; i++) {
    var mapKey = mapKeys[i];
    var key = new Key(this.game, mapKey.x, mapKey.y, player, exit);
    this.zDepth.floorItems.add(key);
    result.push(key);
  }

  return result;
};

module.exports.prototype.getEnemies = function() {
  if (this.enemies === undefined) {
    throw "The Enemy has not been created yet.";
  }

  return this.enemies;
};

module.exports.prototype.parseEnemies = function(mapEnemySpawn, player, roomManager, navMesh) {
  var result = [];

  for (var i = 0; i < mapEnemySpawn.length; i++) {
    var enemySpawnLocation = mapEnemySpawn[i];
    var x = enemySpawnLocation.x + enemySpawnLocation.width / 2;
    var y = enemySpawnLocation.y + enemySpawnLocation.height / 2;

    var enemy = new Nasty(this.game, player, roomManager, navMesh, x, y);
    this.zDepth.sprite.add(enemy);
    result.push(enemy);
  }

  return result;
};

module.exports.prototype.getExit = function() {
  if (this.exit === undefined) {
    throw "The Exit has not been created yet.";
  }

  return this.exit;
};

module.exports.prototype.parseExit = function(mapExitLayer) {
  if (mapExitLayer.length != 1) {
    throw "Map expected to contain one exit."
  }

  var mapExit = mapExitLayer[0];

  if (mapExit.properties.keyCount === undefined) {
    throw "Map Exit object should define custom property \"keyCount\". " +
      "This value may be zero if the exit is open by default.";
  }

  return new Exit(this.game, mapExit.x, mapExit.y, mapExit.width, mapExit.height, mapExit.properties.keyCount, mapExit.name);
};

module.exports.prototype.parseDoors = function(mapDoors) {
  var result = {};
  
  mapDoors.forEach(d => {
    if (d.name === undefined) {
      throw "Doors must provide a value for the name property.";
    }

    if (result[d.name] != undefined) {
      throw "Door names must be unique. The door name: \"" + d.name + "\" has already been used in this map.";
    }

    var rotation = d.properties.rotation;
    var isOpen = d.properties.isOpen;

    if (rotation === undefined || isOpen === undefined) {
      throw "Doors must provide values for the \"rotation\" and \"isOpen\" properties.";
    }

    var door = new Door(this.game, d.x + d.width / 2, d.y + d.height / 2, parseInt(rotation), isOpen === "true");
    this.zDepth.wall.add(door);
    result[d.name] = door;
  });

  return result;
};

/**
 * Returns the map of door names to door objects.
 */
module.exports.prototype.getDoors = function() {
  if (this.doors === undefined) {
    throw "The Doors have not been created yet.";
  }

  return this.doors;
}

module.exports.getObjectLayer = function(map, objectLayerName) {
  var objectLayer = map.objects[objectLayerName];
  if (objectLayer == undefined) {
    throw "Map expected to contain object layer: " + objectLayerName;
  }
  return objectLayer;
};
