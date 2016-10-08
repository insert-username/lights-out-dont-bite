var Nasty = require('./nasty');

class NastySpawner {

  constructor(game, player, roomManager, navMesh, zDepth, x, y) {
    this.game = game;
    this.player = player;
    this.roomManager = roomManager;
    this.navMesh = navMesh;
    this.zDepth = zDepth;
    this.x = x;
    this.y = y;

    this.hasTriggered = false;
  }

  trigger() {
    if (this.hasTriggered) {
      return;
    }
    this.hasTriggered = true;

    this.zDepth.sprite.add(
      new Nasty(this.game, this.player, this.roomManager, this.navMesh, this.x, this.y));
  }
}

module.exports = NastySpawner;
