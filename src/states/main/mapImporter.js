var Lighting = require('./lighting');
var NavMesh = require('./navMesh');
var DoorManager = require('./doorManager');

var Player = require('./entities/player');
var Nasty = require('./entities/nasty');
var NastySpawner = require('./entities/nastySpawner');
var Key = require('./entities/key');
var Exit = require('./entities/exit');
var Door = require('./entities/door');
var Note = require('./entities/note');

/**
 * Imports a tiled map to create game objects.
 */
module.exports = function(game, wallLayer, triggerManager, zDepth, map) {
  this.game = game;
  this.triggerManager = triggerManager;
  this.zDepth = zDepth;
  var mapRooms = module.exports.getObjectLayer(map, "Rooms");
  var mapNavMesh = module.exports.getObjectLayer(map, "Nav Mesh");
  var mapPlayerSpawn = module.exports.getObjectLayer(map, "Player Spawn");
  var mapKeys = module.exports.getObjectLayer(map, "Keys");
  var mapEnemySpawn = module.exports.getObjectLayer(map, "Enemy Spawn");
  var mapExit = module.exports.getObjectLayer(map, "Exit");
  var mapDoors = module.exports.getObjectLayer(map, "Doors");
  var mapNotes = module.exports.getObjectLayer(map, "Notes");

  this.player = this.parsePlayer(mapPlayerSpawn);
  this.exit = this.parseExit(mapExit);
  this.keys = this.parseKeys(this.player, mapKeys, this.exit);
  this.lighting = this.parseLighting(mapRooms, wallLayer, this.player);
  this.navMesh = this.parseNavMesh(mapNavMesh);
  this.enemies = this.parseEnemies(mapEnemySpawn, this.player, this.lighting, this.navMesh);
  this.enemySpawners = this.parseEnemySpawners(mapEnemySpawn, this.triggerManager, this.player, this.lighting, this.navMesh);

  this.doors = this.parseDoors(mapDoors);
  this.doorManager = new DoorManager(this.doors);
  this.notes = this.parseNotes(mapNotes, this.player, this.doors, this.doorManager);
};

module.exports.prototype.getLighting = function() {
  if (this.lighting == undefined) {
    throw "The lighting has not been created yet.";
  }

  return this.lighting;
}

module.exports.prototype.parseLighting = function(mapRooms, wallLayer, torchSprite) {
  if (mapRooms.length > 1) {
    throw "Layer \"Rooms\" expected to contain at most one object.";
  }
  var room = mapRooms[0];
  var lightingMode = room ?
    room.properties["mode"] :
    undefined;

  var lighting = new Lighting(this.game, wallLayer, torchSprite, lightingMode);
  this.zDepth.ceilingLighting.add(lighting);
  return lighting;
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

/**
 * Parses enemies placed on the map.
 */
module.exports.prototype.parseEnemies = function(mapEnemySpawn, player, roomManager, navMesh) {
  var result = [];

  for (var i = 0; i < mapEnemySpawn.length; i++) {
    var enemySpawnLocation = mapEnemySpawn[i];
    if (enemySpawnLocation.name != undefined && enemySpawnLocation.name != "") {
      continue;
    }

    var x = enemySpawnLocation.x + enemySpawnLocation.width / 2;
    var y = enemySpawnLocation.y + enemySpawnLocation.height / 2;

    var enemy = new Nasty(this.game, player, roomManager, navMesh, x, y);
    this.zDepth.sprite.add(enemy);
    result.push(enemy);
  }

  return result;
};

/**
 * Parses enemy spawners.
 */
module.exports.prototype.parseEnemySpawners = function(mapEnemySpawn, triggerManager, player, roomManager, navMesh) {
  var result = [];

  mapEnemySpawn
    .filter(spawnPoint => spawnPoint.name != undefined && spawnPoint.name != "")
    .forEach(spawnPoint => {
      var x = spawnPoint.x + spawnPoint.width / 2;
      var y = spawnPoint.y + spawnPoint.height / 2;
      var nastySpawner = new NastySpawner(this.game, player, roomManager, navMesh, this.zDepth, x, y);
      triggerManager.registerTriggerable(spawnPoint.name, nastySpawner);
    });

  return result;
}

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
};

module.exports.prototype.parseNotes = function(mapNotes, player, doors, doorManager) {
  var result = [];

  mapNotes.forEach(mapNote => {

    var text = mapNote.properties.text;
    var opens = mapNote.properties["opens"];
    var closes = mapNote.properties["closes"];
    var flipsOpenState = mapNote.properties["flipsOpenState"];
    var triggers = mapNote.properties["triggers"];
    var destinationMapName = mapNote.properties["triggers-map-transition"];

    var condition = mapNote.properties["condition"];

    var onReadCallback = () => {
      if (destinationMapName != undefined) {
        this.game.state.getCurrentState().triggerMapTransition(destinationMapName);
      }

      if (flipsOpenState != undefined) {
        doorManager.flip(flipsOpenState);
      }

      if (opens != undefined) {
        doorManager.open(opens);
      }

      if (closes != undefined) {
        doorManager.close(closes);
      }

      if (triggers != undefined) {
        triggers
          .split(",")
          .map(t => t.trim())
          .filter(t => t != "")
          .forEach(t => this.triggerManager.trigger(t));
      }
    }


    var sprite = mapNote.properties.sprite;
    sprite = sprite === undefined ?
      'note' :
      sprite;

    var note = new Note(this.game, sprite, mapNote.x, mapNote.y, player, text, onReadCallback);


    if (condition === "allDoorsOpen") {
       doorManager.addDoorStateChangeListener(d => {
         note.visible = doorManager.isEveryDoorOpen();
       });
    } else if (condition === "!allDoorsOpen") {
       doorManager.addDoorStateChangeListener(d => {
         note.visible = !doorManager.isEveryDoorOpen();
       });
    }

    this.zDepth.floorItems.add(note);

    result.push();
  });

  return result;
};

module.exports.prototype.getNotes = function() {
  if (this.notes === undefined) {
    throw "The notes have not been created yet.";
  }

  return this.notes;
}

module.exports.getObjectLayer = function(map, objectLayerName) {
  var objectLayer = map.objects[objectLayerName];
  if (objectLayer == undefined) {
    throw "Map expected to contain object layer: " + objectLayerName;
  }
  return objectLayer;
};
