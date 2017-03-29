StateGameover = {

    preload: function() {  
        game.time.advancedTiming = true;
        game.load.image('player', 'assets/png/cat-dead.png');
        game.load.spritesheet('cat-fall', 'assets/png/cat-fall.png', 34, 52, 8);
        game.load.spritesheet('cat-dead', 'assets/png/cat-dead.png', 42, 52, 10);
    
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
        game.scale.setGameSize(config.width, config.height);
    },

    /**
     * Inserts the player
     * preps animations
     */
    createPlayer: function() {
        // add the player
        player = game.add.sprite(config.width/2, config.height/2, 'cat-fall');
        player.animations.add('fall', null, 20, false);
        player.animations.add('dead', null, 20, false);
        player.scale.setTo(2, 2);
        player.anchor.setTo(.5,.5);
        player.animations.play('fall');
        console.log(player.animations);
        player.animations._anims.fall.onComplete.add(function(){
            this.killPlayer();
            this.createText();
            this.handleRestart();
        }, this);

    },

    killPlayer: function() {
        player.loadTexture('cat-dead', 0, false);
        player.animations.play('dead');
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
        bar.drawRect(0, 100, config.width, 100);

        var style = { 
            font: "bold 32px Arial", 
            fill: "#fff", 
            boundsAlignH: "center", 
            boundsAlignV: "middle" 
        };

        //  The Text is positioned at 0, 100
        var text = game.add.text(0, 0, "Kitten murderer!", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 100, config.width, 100);

        setTimeout(function(){
            style.font = "bold 20px Arial";
            var tryAgain = game.add.text(0, 0, "Hit Enter to Try Again", style);
            tryAgain.setTextBounds(0, config.height - 100, config.width, 100);
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