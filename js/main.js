// global vars
var config;
var StateBoot, StateMain;
var game, cursors, player, map;
var startPoint, endPoint;
var bgMtn, mgMtn; // paralax backgrounds
var layers = {};
var jumpTimer = 0;
var alive = true;
var won = false;

// the game
game = new Phaser.Game(config);

game.state.add('boot', StateBoot); 
game.state.add('main', StateMain);

game.state.start('boot');