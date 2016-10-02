var Main = require('./states/main/main');
var Menu = require('./states/menu/menu');

var game = new Phaser.Game(300, 200, Phaser.AUTO, 'gameDiv');
game.state.add('main', Main);
game.state.add('menu', Menu);
game.state.start('menu');