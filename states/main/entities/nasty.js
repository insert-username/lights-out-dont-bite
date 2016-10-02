/**
 * Defines an enemy which attacks the player if it is in the same room.
 * The nasty does not enter lit rooms.
 *
 * The behaviour of the enemy is defined by the path queue. At all times
 * a queue of coordinates is set which the enemy will attempt to move to.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Nasty = function(game, player, roomManager, navMesh, x, y) {
    Phaser.Sprite.call(this, game, x, y, lightsOut.Nasty.key);
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

    this.state = lightsOut.Nasty.State.WANDERING;

    // the maximum distance at which to track the player.
    // if the player is further away than this distance, they
    // won't be followed.
    this.maxPlayerDistance = 200;

    // array of x, y locations which are queued for movement.
    this.path = [];

    this.navMeshFilterFunction = function(navPointIndex, navPointNode) {
        var nodeRoom = roomManager.getContainingRoom(navPointNode);
        return nodeRoom.getIllumination() != lightsOut.Room.State.LIT;
      };
  };

  lightsOut.Nasty.State = {

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

  lightsOut.Nasty.key = "nasty";
  lightsOut.Nasty.load = function(game) {
    game.load.spritesheet(lightsOut.Nasty.key, "assets/sprites/nasty.png", 50, 50);
  };

  lightsOut.Nasty.prototype = Object.create(Phaser.Sprite.prototype);
  lightsOut.Nasty.prototype.constructor = lightsOut.Nasty;

  /**
   * Steps the AI for this entity.
   */
  lightsOut.Nasty.prototype.update = function() {
    var containingRoom = this.roomManager.getContainingRoom(this);
    var playerRoom = this.roomManager.getContainingRoom(this.player);
    var distanceToPlayer = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);

    var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
    var playerNavPointIndex = this.navMesh.closestNavPointIndex(this.player.x, this.player.y);

    if (distanceToPlayer < 30) {
      this.player.damage(1);
    }

    // if in the same room, always follow the player directly.
    if (this.isInSameRoom(this.player) && this.canFollow(this.player)) {
      this.path = [ { x: this.player.x, y: this.player.y } ];
      this.state = lightsOut.Nasty.State.CHASING;
      this.moveToNextNavPoint();
      return;
    }

    // if a path is queued, just follow it.
    if (this.path.length != 0) {
      this.moveToNextNavPoint();
      return;
    } else if (this.state === lightsOut.Nasty.State.WANDER_COOLDOWN) {
      return;
    } else if (this.state === lightsOut.Nasty.State.WANDERING) {
      this.state = lightsOut.Nasty.State.WANDER_COOLDOWN;
      this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {
        this.state = lightsOut.Nasty.State.WANDERING;
      }, this);
      return;
    }

    // either follow the player directly, or calculate a random
    // wandering path.
    var isFollowing = this.canFollow(this.player);
    this.state = isFollowing ?
      lightsOut.Nasty.State.CHASING :
      lightsOut.Nasty.State.WANDERING;

    this.path = isFollowing ?
      this.calculateFollowPath(this.player) :
      this.calculateWanderPath();
  };

  lightsOut.Nasty.prototype.isInSameRoom = function(player) {
    return this.roomManager.getContainingRoom(player) ==
      this.roomManager.getContainingRoom(this.body);
  };

  /**
   * @return true if the player can be followed between rooms.
   */
  lightsOut.Nasty.prototype.canFollow = function (player) {
    return Phaser.Math.distance(this.body.x, this.body.y, player.x, player.y) < this.maxPlayerDistance &&
      this.roomManager.getContainingRoom(player).getIllumination() != lightsOut.Room.State.LIT;
  };

  /**
   * Calculates a path which follows the player across multiple rooms.
   */
  lightsOut.Nasty.prototype.calculateFollowPath = function(player) {
    var roomManager = this.roomManager;
    var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
    var playerNavPointIndex = this.navMesh.closestNavPointIndex(player.x, player.y);

    return this.navMesh.getPath(currentNavPointIndex,
      playerNavPointIndex,
      this.navMeshFilterFunction);
  };

  /**
   * Walks towards a random unlit room.
   */
  lightsOut.Nasty.prototype.calculateWanderPath = function() {
    var navPointIndex = Math.floor(Math.random() * this.navMesh.points.length);
    var room = this.roomManager.getContainingRoom(this.navMesh.points[navPointIndex]);
    if (room.getIllumination() != lightsOut.Room.State.LIT) {
      var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
      return this.navMesh.getPath(currentNavPointIndex, navPointIndex, this.navMeshFilterFunction);
    }

    return [];
  };

  lightsOut.Nasty.prototype.moveToNextNavPoint = function() {
    if (this.path.length === 0) {
      return;
    }

    var speed = this.state === lightsOut.Nasty.State.CHASING ?
      this.runSpeed :
      this.wanderSpeed;

    var destination = new Phaser.Point(this.path[0].x, this.path[0].y);
    var position = new Phaser.Point(this.body.center.x, this.body.center.y);
    var destinationDistance = Phaser.Math.distance(position.x, position.y,
      destination.x, destination.y);

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

  return lightsOut;
}(LightsOut || {}));