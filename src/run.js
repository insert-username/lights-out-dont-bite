require('../lib/pixi.js');
require('../lib/phaser.js');

var Main = require('./states/main/main');

var game = new Phaser.Game(300, 200, Phaser.AUTO, 'gameDiv');
game.state.add('main', Main);
game.state.start('main', true, true, { mapName: "00-lobby-day.json" });