var game = new Phaser.Game(300, 200, Phaser.AUTO, 'gameDiv');
game.state.add('main', LightsOut.States.Main);
game.state.add('menu', LightsOut.States.Menu);
game.state.start('menu');