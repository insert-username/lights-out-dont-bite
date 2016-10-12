var tileSize = 16;

/**
 * The upper bound for lit tiles, in game unit distance from the player.
 */
var lightingRange = 80;

/**
 * Distance in unit tiles moved by the player after which a visible tile
 * recalculation should be performed. 1 = once per tile. 2 = twice per tile
 * etc.
 */
var recalculationFrequency = 2;

var Modes = {

  DAY: "DAY",

  NIGHT: "NIGHT",

  MIDNIGHT: "MIDNIGHT",

  DEFAULT: "DAY"
}

var baseBrightness = {
  DAY: 0.95,
  MIDNIGHT: 0,
  NIGHT: 0
};

var darkColor = {
  DAY: { red: 0, green: 0, blue: 0 },
  MIDNIGHT: { red: 50, green: 0, blue: 0 },
  NIGHT: { red: 0, green: 0, blue: 0 }
}

/**
 * Maintains the collection of rooms in the game and updates their
 * state according to the location of lighting sprites.
 */
class Lighting extends Phaser.Sprite {

  constructor(game, wallLayer, player, mode) {
    var bitmap = game.make.bitmapData(game.camera.width + tileSize * 2,
      game.camera.height + tileSize * 2);
    super(game, 0, 0, bitmap);
    this.wallLayer = wallLayer;
    this.player = player;
    this.xResolution = game.camera.width / tileSize + 2;
    this.yResolution = game.camera.height / tileSize + 2;
    this.bitmap = bitmap;
    this.anchor.setTo(0, 0);

    this.baseBrightness = baseBrightness[mode || Modes.DEFAULT];
    this.darkColor = darkColor[mode || Modes.DEFAULT];

    this.visibleTiles = {};
    this.update();
  }

  update() {
    this.snapToCamera();
    this.ifPlayerGridCoordsChanged(() => this.recalculateVisibleTiles());
    this.redraw();
  }

  /**
   * Snaps the coordinates of the lighting to the grid coordinate nearest the camera.
   */
  snapToCamera() {
    this.x = Phaser.Math.snapToFloor(this.game.camera.view.left - tileSize, tileSize);
    this.y = Phaser.Math.snapToFloor(this.game.camera.view.top - tileSize, tileSize);
  }

  /**
   * If the player's grid coordinates have changed since the last call,
   * the supplied callback is invoked. The stored player coordinates are
   * updated if the call is made.
   */
  ifPlayerGridCoordsChanged(callback) {
    var playerGridX = Phaser.Math.snapTo(this.player.x, tileSize / recalculationFrequency);
    var playerGridY = Phaser.Math.snapTo(this.player.y, tileSize / recalculationFrequency);

    if (playerGridX != this.playerGridX || playerGridY != this.playerGridY) {
      callback();
      this.playerGridX = playerGridX;
      this.playerGridY = playerGridY;
    }
  }

  /**
   * Recalculates the tiles that are visible from the player's line of sight.
   * This calculation is fairly expensive and should only be made when
   * necessary (when the player's grid coordinates have changed).
   */
  recalculateVisibleTiles() {
    this.visibleTiles = {};

    for (var x = -1; x < this.xResolution - 1; x++) {
      for (var y = -1; y < this.yResolution - 1; y++) {
        var xCoord = x * tileSize + this.x;
        var yCoord = y * tileSize + this.y;
        if (this.hasLineOfSightToTileCorner(xCoord, yCoord, this.player.x, this.player.y)) {
          this.setTileVisible(x, y);
        };
      }
    }
  }

  /**
   * Sets the visibility of the specified x-y coordinate to true.
   */
  setTileVisible(x, y) {
    this.visibleTiles[x] = this.visibleTiles[x] || {};
    this.visibleTiles[x + 1] = this.visibleTiles[x + 1] || {};
    this.visibleTiles[x - 1] = this.visibleTiles[x - 1] || {};

    this.visibleTiles[x][y] = true;
    this.visibleTiles[x + 1][y] = true;
    this.visibleTiles[x - 1][y] = true;
    this.visibleTiles[x][y + 1] = true;
    this.visibleTiles[x][y - 1] = true;
  }

  /**
   * Redraws the shading bitmap.
   */
  redraw() {
    this.bitmap.cls();
    for (var x = -1; x < this.xResolution + 1; x++) {
      for (var y = -1; y < this.yResolution + 1; y++) {
        if (this.visibleTiles[x] && this.visibleTiles[x][y]) {
          this.fillTile(x, y, this.player.x, this.player.y);
        } else {
          this.fillTile(x, y);
        }
      }
    }
  }

  /**
   * Returns true if the specified playerX and playerY coordinates
   * have line of sight to the tile specified by the left and top
   * coordinates.
   */
  hasLineOfSightToTileCorner(left, top, playerX, playerY) {
    var l = left;
    var r = left + tileSize;
    var t = top;
    var b = top + tileSize;

    return this.hasLineOfSightToTile(l, t, playerX, playerY) ||
      this.hasLineOfSightToTile(r, t, playerX, playerY) ||
      this.hasLineOfSightToTile(l, b, playerX, playerY) ||
      this.hasLineOfSightToTile(r, b, playerX, playerY);
  }

  /**
   * @return true if the playerX, and playerY coordinates have line of sight
   * to the tile on the specified x and y coordinates.
   * @param x, y coordinates ON an edge face of the tile.
   */
  hasLineOfSightToTile(x, y, playerX, playerY) {
    var line = new Phaser.Line(x, y, playerX, playerY);

    var rayCastTiles = this.wallLayer.getRayCastTiles(line);

    for (var i = 0; i < rayCastTiles.length; i++) {
      var t = rayCastTiles[i];
      if (t.index != -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Fills the tile at the specified GRID coordinate (-1 ... xResolution)
   */
  fillTile(x, y, lightSourceX, lightSourceY) {
    var xCoord = x * tileSize + this.x;
    var yCoord = y * tileSize + this.y;

    var alpha;
    if (lightSourceX != undefined) {
      alpha = Phaser.Math.distanceSq(xCoord + tileSize / 2, yCoord + tileSize / 2,
        lightSourceX, lightSourceY);

      alpha = (1 -this.baseBrightness) * Phaser.Math.clamp(alpha / (lightingRange * lightingRange), 0, 1);
    } else {
      alpha = 1 - this.baseBrightness;
    }

    this.bitmap.context.fillStyle = 'rgba(' + this.darkColor.red + ', ' +
      this.darkColor.green + ', ' +
      this.darkColor.blue + ', ' + alpha + ')';

    this.bitmap.context.fillRect(
      x * tileSize,
      y * tileSize,
      tileSize, tileSize);
  }
}

module.exports = Lighting;
