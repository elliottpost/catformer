var bootState = {
    init: function() {
        // STAGE BACKGROUND
        game.stage.backgroundColor = 0x34495f;

        // PREVENT PHASER FROM STOP WHEN IFRAME IS OUT OF FOCUS
        game.stage.disableVisibilityChange = true; 

        // SMOOTH GRAPHICS
        game.stage.smoothed = true;

        // CENTER GAME ON SCREEN
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },

    create: function() {
        // CALL LOAD STATE
        game.state.start('load');
    }
}; 