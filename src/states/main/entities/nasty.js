var WalkingEntity = require('./walkingEntity');

/**
 * Defines an enemy which attacks the player if it is in the same room.
 * The nasty does not enter lit rooms.
 *
 * The behaviour of the enemy is defined by the path queue. At all times
 * a queue of coordinates is set which the enemy will attempt to move to.
 */
module.exports = function(game, player, roomManager, navMesh, x, y) {
  WalkingEntity.call(this, game, x, y, module.exports.key, {
    idle: { frames: [0, 1, 2, 3, 4, 5, 6 , 7], fps: 1 },
    walkDown: { frames: [26, 27, 28, 29, 30], fps: 5 },
    walkUp: { frames: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], fps: 5 },
    walkLeft: { frames: [17, 18, 19, 20, 21, 22, 23, 24, 25], fps: 5 },
    walkRight: { frames: [8, 9, 10, 11, 12, 13, 14, 15, 16], fps: 5 },
  });

  this.game = game;
  this.player = player;
  this.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(this);
  this.body.offset.setTo(this.width / 2 - 10, this.height / 2 - 10);
  this.body.setCircle(10);
  this.body.friction = 0;
  this.roomManager = roomManager;
  this.navMesh = navMesh;

  this.runSpeed = 100;
  this.wanderSpeed = 30;

  // Cooldown between wandering cycles in seconds.
  this.wanderCooldown = 2;

  this.state = module.exports.State.WANDERING;

  // the maximum distance at which to track the player.
  // if the player is further away than this distance, they
  // won't be followed.
  this.maxPlayerDistance = 50;

  // array of x, y locations which are queued for movement.
  this.path = [];

  this.navMeshFilterFunction = function(navPointIndex, navPointNode) {
    return true;
    };
};

module.exports.State = {

  /**
   * Indicates that the nasty is directly chasing the player.
   */
  CHASING: 0,

  /**
   * The nasty is just idly wandering about.
   */
  WANDERING: 1,

  /**
   * The nasty is cooling down between wander periods.
   */
  WANDER_COOLDOWN: 2
};

module.exports.key = "nasty";
module.exports.load = function(game, assetContext) {
  game.load.spritesheet(module.exports.key, assetContext("./sprites/nasty.png"), 16, 32);
};

module.exports.prototype = Object.create(WalkingEntity.prototype);
module.exports.prototype.constructor = module.exports;

/**
 * Steps the AI for this entity.
 */
module.exports.prototype.update = function() {
  var distanceToPlayer = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);

  var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
  var playerNavPointIndex = this.navMesh.closestNavPointIndex(this.player.x, this.player.y);

  if (distanceToPlayer < 30) {
    this.player.damage(1);
  }

  if (this.canFollow(this.player)) {
    this.path = [ { x: this.player.x, y: this.player.y } ];
    this.state = module.exports.State.CHASING;
    this.moveToNextNavPoint();
    return;
  } else if (this.state === module.exports.State.CHASING) {
    this.path = [];
    this.startWanderCooldown();
  } else if (this.path.length != 0) {
    this.moveToNextNavPoint();
  } else if (this.state != module.exports.State.WANDER_COOLDOWN) {
    this.startWanderCooldown();
  }

  this.setAnimationToBodyState();
};

module.exports.prototype.startWanderCooldown = function() {
  this.state = module.exports.State.WANDER_COOLDOWN;
  this.game.time.events.add(Phaser.Timer.SECOND * this.wanderCooldown, function() {

    var path = [];
    while ((path = this.calculateWanderPath()).length < 2);

    this.path = path;
    this.state = module.exports.State.WANDERING;
  }, this);
}

/**
 * @return true if the player can be followed between rooms.
 */
module.exports.prototype.canFollow = function (player) {
  return Phaser.Math.distance(this.body.x, this.body.y, player.x, player.y) < this.maxPlayerDistance;
};

/**
 * Calculates a path which follows the player across multiple rooms.
 */
module.exports.prototype.calculateFollowPath = function(player) {
  var roomManager = this.roomManager;
  var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
  var playerNavPointIndex = this.navMesh.closestNavPointIndex(player.x, player.y);

  return this.navMesh.getPath(currentNavPointIndex,
    playerNavPointIndex,
    this.navMeshFilterFunction);
};

/**
 * Calculates a path towards a randomly selected unlit room.
 * A path containing only the current nav point index is returned
 * if a path could not be randomly selected.
 */
module.exports.prototype.calculateWanderPath = function() {
  var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
  var navPointIndex = Math.floor(Math.random() * (this.navMesh.points.length - 1));
  if (navPointIndex >= currentNavPointIndex) {
    navPointIndex = navPointIndex + 1;
  }

  return this.navMesh.getPath(currentNavPointIndex, navPointIndex, this.navMeshFilterFunction);
};

module.exports.prototype.moveToNextNavPoint = function() {
  if (this.path.length === 0) {
    return;
  }

  var destination = new Phaser.Point(this.path[0].x, this.path[0].y);
  var position = new Phaser.Point(this.body.center.x, this.body.center.y);
  var destinationDistance = Phaser.Math.distance(position.x, position.y,
    destination.x, destination.y);

  var speed = this.state === module.exports.State.CHASING ?
    this.runSpeed * Phaser.Math.clamp(1 - destinationDistance * destinationDistance / this.maxPlayerDistance, 0.1, 1) :
    this.wanderSpeed;

  if (destinationDistance < 5) {
    this.path.splice(0, 1);
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    return;
  }

  var dx = destination.x - position.x;
  var dy = destination.y - position.y;

  var velocity = Phaser.Point.subtract(destination, position)
    .normalize()
    .multiply(speed, speed);

  this.body.velocity.setTo(velocity.x, velocity.y);
};
