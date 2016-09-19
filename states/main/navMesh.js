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
    var result = this.points.length;

    this.points.push({ x: x, y: y, attachedIndices: attachedIndices });

    return result;
  };

  /**
   * @return an array of the indices of points attached to the
   * index i.
   */
  lightsOut.NavMesh.prototype.pointsAttachedTo = function(i) {
    return this.points[i].attachedIndices;
  };

  /**
   * @return the path, in indices, from i0 to i1. The returned path
   * includes indices i0 and i1.
   */
  lightsOut.NavMesh.prototype.getPath = function(i0, i1) {
      throw "implement this";
  };

  return lightsOut;
}(LightsOut || {}));
