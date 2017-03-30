StateGameover = {

    preload: function() {  
        game.time.advancedTiming = true;
        game.load.image('player', 'assets/png/cat-fall.png');
        game.load.spritesheet(
            'cat-fall', 
            AnimationConfig.cat.fall.filename,
            AnimationConfig.cat.fall.frameWidth,
            AnimationConfig.cat.fall.frameHeight,
            AnimationConfig.cat.fall.frameCount
        );
        game.load.spritesheet(
            'cat-die', 
            AnimationConfig.cat.die.filename,
            AnimationConfig.cat.die.frameWidth,
            AnimationConfig.cat.die.frameHeight,
            AnimationConfig.cat.die.frameCount
        );

        game.load.audio(
            'cat-yowl', 
            [
                'assets/audio/tomcat-yowl.mp3',
            ]
        );
    },

    create: function() {
        music.stop();
        this.createWorld();
        this.createPlayer();
    },

    /** 
     * Loads the map & layers
     */
    createWorld: function() {
        game.stage.backgroundColor = '#111';
        game.scale.setGameSize(GameConfig.width, GameConfig.height);
    },

    /**
     * Inserts the player
     * preps animations
     */
    createPlayer: function() {
        // add the player
        player = game.add.sprite(GameConfig.width/2, GameConfig.height/2, 'cat-fall');
        player.animations.add(
            'fall', 
            null, 
            AnimationConfig.cat.fall.frameRate, 
            false
        );
        player.animations.add(
            'die', 
            null, 
            AnimationConfig.cat.die.frameRate, 
            false
        );
        player.scale.setTo(2, 2);
        player.anchor.setTo(.5,.5);
        player.animations.play('fall');
        player.animations._anims.fall.onComplete.add(function(){
            this.killPlayer();
            this.createText();
            this.handleRestart();
        }, this);

    },

    killPlayer: function() {
        player.loadTexture('cat-die', 0, false);
        player.animations.play('die');
        game.add.audio('cat-yowl').play('', 0, 1, false, true);
    },

    /**
     * Creates the music
     * will not restart if it is already playing
     */
    createMusic: function() {
        music = game.add.audio('bg-music');
        music.play('', 0, 1, true, false);
    },    

    createText: function() {
        var bar = game.add.graphics();
        bar.beginFill(0xff0000, 0.2);
        bar.drawRect(0, 100, GameConfig.width, 100);

        var style = { 
            font: "bold 32px Arial", 
            fill: "#fff", 
            boundsAlignH: "center", 
            boundsAlignV: "middle" 
        };

        //  The Text is positioned at 0, 100
        var text = game.add.text(0, 0, "Kitten murderer!", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, GameConfig.width, 100);

        setTimeout(function(){
            style.font = "bold 20px Arial";
            var tryAgain = game.add.text(0, 0, "Hit Enter to Try Again", style);
            tryAgain.setTextBounds(0, GameConfig.height - 100, GameConfig.width, 100);
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