states.win = {

    preload: function() {  
        game.time.advancedTiming = true;
        game.load.video('cat-dance', 'assets/video/cat-dance.mp4');
    },

    create: function() {
        // music.stop();
        this.createWorld();
        this.createVideo();
        this.createText();
    },

    /** 
     * Loads the map & layers
     */
    createWorld: function() {
        game.stage.backgroundColor = '#111';
        game.scale.setGameSize(GameConfig.width, GameConfig.height);
    },

    /**
     * Inserts the video
     */
    createVideo: function() {
        video = game.add.video('cat-dance');

        //  See the docs for the full parameters
        //  But it goes x, y, anchor x, anchor y, scale x, scale y
        sprite = video.addToWorld(
            GameConfig.width/2, 
            GameConfig.height/2, 
            0.5, 
            0.5, 
            1, 
            1
        );

        //  true = loop
        video.play(true);
        this.handleRestart();

    },  

    createText: function() {
        var bar = game.add.graphics();
        bar.beginFill(0x32ea19, 0.4);
        bar.drawRect(0, 100, GameConfig.width, 100);

        var style = { 
            font: "bold 32px Arial", 
            fill: "#fff", 
            boundsAlignH: "center", 
            boundsAlignV: "middle" 
        };

        //  The Text is positioned at 0, 100
        var text = game.add.text(0, 0, "Kitten Rescuer!!", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, GameConfig.width, 100);

        setTimeout(function(){
            style.font = "bold 20px Arial";
            var tryAgain = game.add.text(0, 0, "Refresh the page to play again", style);
            tryAgain.setTextBounds(
                0, 
                GameConfig.height - 65, 
                GameConfig.width, 
                100
            );
        }, 1000);
    },

    update: function() {  

    },

    render: function() {
        game.debug.text(game.time.fps || '--', 2, 14, "#ffffff");
    },

    handleRestart: function() {
        var enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(function(){
            game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ENTER);
            game.state.start('main');
        }, this);
    }
};