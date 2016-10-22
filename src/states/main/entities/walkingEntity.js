class WalkingEntity extends Phaser.Sprite {
  
  constructor(game, x, y, key, frames) {
    super(game, x, y, key);

    this.animations.add('idle', frames.idle.frames, frames.idle.fps, true);
    this.animations.add('walk-up', frames.walkUp.frames, frames.walkUp.fps, true);
    this.animations.add('walk-down', frames.walkDown.frames, frames.walkDown.fps, true);
    this.animations.add('walk-left', frames.walkLeft.frames, frames.walkLeft.fps, true);
    this.animations.add('walk-right', frames.walkRight.frames, frames.walkRight.fps, true);
  }

  /**
   * Updates the currently playing animation to match the current body status.
   */
  setAnimationToBodyState() {
    if (this.body.velocity.x > 0) {
      this.setAnimation('walk-right');
    } else if (this.body.velocity.x < 0) {
      this.setAnimation('walk-left');
    } else if (this.body.velocity.y > 0) {
      this.setAnimation('walk-down');
    } else if (this.body.velocity.y < 0) {
      this.setAnimation('walk-up');
    } else {
      this.setAnimation('idle');
    }
  }

  /**
   * Sets the current animation to the animation specified by animationName,
   * unless that animation is currently playing. If the animation is currently
   * playing, no action is taken.
   */
  setAnimation(animationName) {
    var currentAnimationName = this.animations.currentAnim.name;
    if (currentAnimationName != animationName) {
      this.animations.play(animationName);
    }
  }
}

module.exports = WalkingEntity;