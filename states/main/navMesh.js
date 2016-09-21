/**
 * The navmesh provides navigation functionality for sprites.
 */
var LightsOut = (function(lightsOut){

  lightsOut.NavMesh = function() {
    this.points = [];
  }

  /**
   * Adds a new point to the navmesh.
   * @param x the x-location of the point.
   * @param y the y-location of the point.
   * @param attachedIndices the indices of attached points.
   * @return the index of the added point.
   */
  lightsOut.NavMesh.prototype.addPoint = function(x, y, attachedIndices) {
    var index = this.points.length;
    this.points.push(new lightsOut.NavMesh.NavPoint(index, x, y, attachedIndices));
    return index;
  };

  /**
   * @return an array of the indices of points attached to the
   * index i.
   */
  lightsOut.NavMesh.prototype.pointsAttachedTo = function(i) {
    return this.points[i].attachedIndices;
  };

  /**
   * @return the path, in nodes, from i0 to i1.
   */
  lightsOut.NavMesh.prototype.getPath = function(i0, i1) {
    var graph = new lightsOut.NavMesh.Graph(this.points);
    var nodes = astar.search(graph, this.points[i0], this.points[i1]);
    nodes.splice(0, 0, this.points[i0]);
    return nodes;
  };

  lightsOut.NavMesh.NavPoint = function(index, x, y, attachedIndices) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.attachedIndices = attachedIndices;
  };
  lightsOut.NavMesh.NavPoint.weight = 1;
  lightsOut.NavMesh.NavPoint.prototype.isWall = function() {
    return this.weight === 0;
  };
  lightsOut.NavMesh.NavPoint.prototype.getCost = function(otherNode) {
    return Phaser.Math.distance(this.x, this.y,
      otherNode.x, otherNode.y);
  };


  lightsOut.NavMesh.Graph = function(nodes) {
    this.nodes = nodes;
    this.init();
  };

  lightsOut.NavMesh.Graph.heuristic = function(node0, node1) {
    return Phaser.Math.distance(node0.x, node0.y,
      node1.x, node1.y);
  };

  lightsOut.NavMesh.Graph.prototype.init= Graph.prototype.init;
  lightsOut.NavMesh.Graph.prototype.cleanDirty = Graph.prototype.cleanDirty;
  lightsOut.NavMesh.Graph.prototype.markDirty = Graph.prototype.markDirty;
  lightsOut.NavMesh.Graph.prototype.neighbors = function(node) {
    var result = [];
    var nodes = this.nodes;
    node.attachedIndices.forEach(function(i){
      result.push(nodes[i]);
    });
    return result;
  };


  return lightsOut;
}(LightsOut || {}));
