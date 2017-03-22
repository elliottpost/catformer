var SideScroller = SideScroller || {};
SideScroller.Game = function(){};
SideScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
  create: function() {
    //create player
    this.player = this.game.add.sprite(100, 300, 'player');
 }, 
  update: function() {
  },
  render: function()
    {
        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");  
    }
};