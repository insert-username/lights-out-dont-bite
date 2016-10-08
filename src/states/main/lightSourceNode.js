class LightSourceNode extends Phaser.Sprite {

  constructor(game, x, y, children) {
    super(game, x, y);
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setCircle(2, 2);
    this.game = game;
    this.x = x;
    this.y = y;
    this.isColliding = false;
    
    children.forEach(c => {
      if (c === undefined) {
        throw "Child nodes must not be undefined.";
      }

      this.addChild(c);
    });
  }
  
  setColliding(isColliding) {
    this.isColliding = isColliding;
  }

  flatten(collection) {
    var result = collection === undefined ?
      [] :
      collection;

    result.push(this);
    this.children.forEach(c => c.flatten(result));
    return result;
  }

  flattenEnabled(collection) {
    var result = collection === undefined ?
      [] :
      collection;

    result.push(this);

    if (!this.isColliding) {
      this.children.forEach(c => c.flattenEnabled(result));
    }

    return result;
  }

  /**
   * Assembles a tree of light source nodes
   */
  static build(game, radius, angularSteps, radialSteps) {
    var rootChildNodes = [];
    
    for (var angle = 0; angle < 360; angle += 360 / angularSteps) {
      var childNode;
      for (var r = radius; r > 0; r -= (radius / radialSteps)) {
        var x = r * Math.cos(Math.PI * angle / 180);
        var y = r * Math.sin(Math.PI * angle / 180);
        childNode = new LightSourceNode(game, x, y, childNode === undefined ? [] : [childNode]);
      }

      rootChildNodes.push(childNode);
    }

    return new LightSourceNode(game, 0, 0, rootChildNodes);
  }
}

module.exports = LightSourceNode;
