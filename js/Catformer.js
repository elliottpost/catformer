// global vars
var GameConfig;
var AnimationConfig;
var StateBoot, StateMain;
var game, cursors, player, map;
var startPoint, endPoint;
var music;
var bgMtn, mgMtn; // paralax backgrounds
var layers = {};
var jumpTimer = 0;
var isJumping = false;
var isHoldingUp = false;
var alive = true;
var won = false;

// the game
game = new Phaser.Game(GameConfig);

game.state.add('boot', StateBoot); 
game.state.add('main', StateMain); 
game.state.add('gameover', StateGameover);

game.state.start('boot');