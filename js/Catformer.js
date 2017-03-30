// the game
game = new Phaser.Game(GameConfig);

game.state.add('boot', states.boot); 
game.state.add('main', states.main); 
game.state.add('gameover', states.gameover);
game.state.add('win', states.win);

game.state.start('boot');