var Player = require('./entities/player');

/**
 * Visible meter which indicates how stressed the player is.
 * Stress is a product of enemy proximity and health.
 */
module.exports = function(game, player, enemies) {
  this.game = game;
  this.player = player;
  this.enemies = enemies;

  var stressMeterBitmap = this.game.make.bitmapData(this.game.camera.width, this.game.camera.height);
  var grad = stressMeterBitmap.context.createRadialGradient(this.game.camera.width / 2, this.game.camera.height / 2, 50, 
    this.game.camera.width / 2, this.game.camera.height / 2, 200);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(1, '#FF0000');
  stressMeterBitmap.context.fillStyle = grad;
  stressMeterBitmap.context.fillRect(0, 0, stressMeterBitmap.width, stressMeterBitmap.height);

  Phaser.Sprite.call(this, this.game, 0, 0, stressMeterBitmap);
  this.fixedToCamera = true;

  this.period = 3;
  this.minAlpha = 0;
  this.maxAlpha = 0;

  this.detectionRange = 200;
};

module.exports.prototype = Object.create(Phaser.Sprite.prototype);
module.exports.prototype.constructor = module.exports;

module.exports.prototype.update = function() {
  var closestEnemyDistance = -1;
  this.enemies.forEach(function(enemy){
    var dist = Phaser.Math.distance(this.player.x, this.player.y, enemy.x, enemy.y);
    if (closestEnemyDistance === -1 || dist < closestEnemyDistance) {
      closestEnemyDistance = dist;
    }
  }, this);

  this.maxAlpha = closestEnemyDistance < this.detectionRange ?
    (this.detectionRange - closestEnemyDistance) / this.detectionRange :
    0;
  this.minAlpha = this.maxAlpha * 0.2;

  this.period = 2 + this.player.getHealth() / Player.MaxHealth;

  this.updateAlpha();
};

module.exports.prototype.updateAlpha = function() {
  var t = (this.game.time.totalElapsedSeconds() % this.period - this.period / 2) / this.period * 15;
  this.alpha = this.minAlpha + (this.maxAlpha - this.minAlpha) * Math.min(1, Math.exp(- t * t * 2) + 0.8 * Math.exp(-(t - 3)*(t - 3) * 2));
};