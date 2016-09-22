/**
 * Defines an enemy which attacks the player if it is in the same room.
 * The nasty does not enter lit rooms.
 */
var LightsOut = (function(lightsOut){

  lightsOut.Nasty = function(game, roomManager, navMesh, x, y) {
    this.game = game;
    Phaser.Sprite.call(this, game, x, y, lightsOut.Nasty.key);
    this.anchor.setTo(0.5, 0.5);
    this.roomManager = roomManager;
    this.navMesh = navMesh;

    this.walkSpeed = 100;

    // the maximum distance at which to track the player.
    // if the player is further away than this distance, they
    // won't be followed.
    this.maxPlayerDistance = 200;

    // array of x, y locations which are queued for movement.
    this.path = [];
    this.isTweening = false;
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
  lightsOut.Nasty.prototype.step = function(player) {
    var containingRoom = this.roomManager.getContainingRoom(this);
    var playerRoom = this.roomManager.getContainingRoom(player);
    var distanceToPlayer = Phaser.Math.distance(this.x, this.y, player.x, player.y);

    var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
    var playerNavPointIndex = this.navMesh.closestNavPointIndex(player.x, player.y);

    // if the player is close enough, damage them.
    if (distanceToPlayer > this.maxPlayerDistance && this.isTweening) {
      this.moveTween.stop();
      this.isTweening = false;
      this.path = this.navMesh.getPath(currentNavPointIndex, currentNavPointIndex);
    } else if (distanceToPlayer < 30) {
      player.damage(1);
    } else if (!this.isTweening) {
      if (playerRoom === containingRoom) {
        // walk directly towards the player.
        this.path = [{x: player.x, y: player.y}];
      } else if (distanceToPlayer < this.maxPlayerDistance && this.path.length === 0) {
        this.path = this.navMesh.getPath(currentNavPointIndex, playerNavPointIndex);
      }
    }

    this.moveToNextNavPoint();
  };

  lightsOut.Nasty.prototype.moveToNextNavPoint = function() {
    // no nav points are queued, or we are in the process
    // of moving to a point, so do nothing.
    if (this.path.length === 0 || this.isTweening === true) {
      return;
    }
    this.isTweening = true;

    var destination = new Phaser.Point(this.path[0].x, this.path[0].y);
    var destinationDistance =
      Phaser.Math.distance(this.x, this.y, destination.x, destination.y);

    var tweenTime = Math.max(1, 1000 * destinationDistance / this.walkSpeed);
    this.moveTween = this.game.add.tween(this);
    this.moveTween.to({x: destination.x, y: destination.y}, tweenTime, Phaser.Easing.Linear.None);
    this.moveTween.onComplete.add(function(){
      this.isTweening = false;
      this.path.splice(0, 1);
    }, this);
    this.moveTween.start();
  };

  return lightsOut;
}(LightsOut || {}));