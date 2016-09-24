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

  lightsOut.NavMesh.prototype.closestNavPointIndex = function(x, y) {
    var closestDist;
    var closestIndex = -1;
    this.points.forEach(function(point, index){
      var dist = Phaser.Math.distanceSq(x, y, point.x, point.y);

      if (closestIndex === -1 || dist < closestDist) {
        closestDist = dist;
        closestIndex = index;
      }
    });

    return closestIndex;
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
   * @param the index of the nav point to start the serch from.
   * @param the index of the destination nav point.
   * @param navPointFilter filter function which accepts as
   * a first argument the index of the potential nav point,
   * and as a second argument an object {x, y} of the nav point
   * coordinates. This function should return true if the nav point
   * should be considered in the nav point search.
   */
  lightsOut.NavMesh.prototype.getPath = function(i0, i1, navPointFilter) {
    var graph = new lightsOut.NavMesh.Graph(this.points, navPointFilter);
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

  lightsOut.NavMesh.Graph = function(nodes, navPointFilter) {
    this.nodes = nodes;
    this.navPointFilter = navPointFilter;
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
    node.attachedIndices.forEach(function(i){
      var potentialNode = this.nodes[i];

      // excludes nodes which the filter does not accept.
      if (this.navPointFilter(i, potentialNode)) {
        result.push(this.nodes[i]);
      }
    }, this);
    return result;
  };


  return lightsOut;
}(LightsOut || {}));
