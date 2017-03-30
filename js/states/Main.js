StateMain = {

    preload: function() {  
        game.time.advancedTiming = true;
        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.image('mountains-bg', 'assets/png/mountains-bg-1024x512.png');
        // game.load.image('mountain-mg', 'assets/png/mountain-mg-512x512.png');
        game.load.image('tileset', 'assets/png/tileset.png');
        game.load.image('player', 'assets/png/cat-walk.png');
        game.load.spritesheet(
            'cat-jump', 
            AnimationConfig.cat.jump.filename,
            AnimationConfig.cat.jump.frameWidth,
            AnimationConfig.cat.jump.frameHeight,
            AnimationConfig.cat.jump.frameCount
        );
        game.load.spritesheet(
            'cat-idle', 
            AnimationConfig.cat.idle.filename,
            AnimationConfig.cat.idle.frameWidth,
            AnimationConfig.cat.idle.frameHeight,
            AnimationConfig.cat.idle.frameCount
        );
        game.load.spritesheet(
            'cat-walk', 
            AnimationConfig.cat.walk.filename,
            AnimationConfig.cat.walk.frameWidth,
            AnimationConfig.cat.walk.frameHeight,
            AnimationConfig.cat.walk.frameCount
        );

        game.load.audio(
            'bg-music', 
            [
                'assets/audio/Chippytoon.wav',
            ]
        );

        // reset values
        alive = true;
        won = false;
        isJumping = false;
        isHoldingUp = false;
    },

    create: function() {  
        this.createWorld();
        this.getObjectLayers();
        this.createPlayer();
        this.createPhysics();
        this.createMusic();

        // Variable to store the arrow key pressed
        cursors = game.input.keyboard.createCursorKeys();
    },

    /** 
     * Loads the map & layers
     */
    createWorld: function() {
        game.stage.backgroundColor = '#3598db';

        map = game.add.tilemap('map', 32, 32, GameConfig.tilesWide, 16);
        map.addTilesetImage('tileset', 'tileset');

        // add the sky and resize the world
        layers.sky = map.createLayer('bgSky');
        layers.sky.resizeWorld();
        // now the backgrounds in order of appearance
        bgMtn = game.add.sprite(0, 0, 'mountains-bg');
        bgMtn.fixedToCamera = true; // lock the mountains in place
        // mgMtn = game.add.sprite(game.width/2, 0, 'mountain-mg');    
        layers.collisions = map.createLayer('collisions');
        layers.bgTrees = map.createLayer('bgTrees');
        layers.ground = map.createLayer('ground');
        layers.bgGrass = map.createLayer('bgGrass');
    },

    /**
     * Saves the object layers to respective vars
     */
    getObjectLayers: function() {
        // get the object layers
        startPoint = map.objects.startPoint;
        endPoint = map.objects.endPoint;
    },

    /**
     * Inserts the player
     * preps animations
     */
    createPlayer: function() {
        // add the player
        player = game.add.sprite(
            startPoint[0].x, 
            startPoint[0].y, 
            'cat-idle'
        );
        player.animations.add(
            'idle', 
            [0, 1], // the other 6 animations are not good
            AnimationConfig.cat.idle.frameRate, 
            true
        );
        player.animations.add(
            'walk', 
            null,
            AnimationConfig.cat.walk.frameRate, 
            true
        );
        player.animations.add(
            'jump', 
            null,
            AnimationConfig.cat.jump.frameRate, 
            true
        );
        player.anchor.setTo(.5,.5);

        // the camera will follow the player in the world
        game.camera.follow(player);
    },

    /**
     * Creates & applies physics
     */
    createPhysics: function() {
        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(layers.collisions, Phaser.Physics.ARCADE);
        map.setCollisionBetween(0, 2000, true, 'collisions');
        layers.collisions.body.immovable = true;
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        game.physics.arcade.checkCollision.top = false;
        game.physics.arcade.checkCollision.right = true;
        game.physics.arcade.checkCollision.bottom = false;
        game.physics.arcade.checkCollision.left = true;
        player.body.bounce.y = 0.1;

        // // Add gravity to make it fall
        player.body.gravity.y = 1000;
    },

    /**
     * Creates the music
     * will not restart if it is already playing
     */
    createMusic: function() {
        music = game.add.audio('bg-music');
        music.play('', 0, 1, true, false);
    },

    update: function() {  
        // collision handling
        this.handleCollisions();
        this.handleWalk();
        this.handleJump();
        this.handleWin();
    },

    render: function() {
        game.debug.text("FPS: " + game.time.fps || 'FPS: --', 2, 14, "#ffffff");
    },

    /**
     * Handles all collisions
     */
    handleCollisions: function() {
        game.physics.arcade.collide(layers.collisions, player);

        this.handleDeath();
    },

    /**
     * Loses the game and shows death animations
     */
    handleDeath: function() {
        if(player.body.position.y >= game.world.height - player.body.height
        && alive === true) {
            alive = false;
            game.state.start('gameover');
        }
    },

    /**
     * Stops & starts walking
     */
    handleWalk: function() {
        if (!alive || won) {
            return;
        }

        if (!isJumping) {
            player.animations.stop('jump', true);

            // show the walking animation if we're currently walking
            if (player.animations.currentAnim.name != "walk" && 
            (cursors.left.isDown || cursors.right.isDown)) {
                player.animations.stop('idle', true);
                player.loadTexture('cat-walk');
                player.animations.play('walk');


            }
            // show the idle animation if we're not walking 
            else if (player.animations.currentAnim.name != "idle"
            && (!cursors.left.isDown && !cursors.right.isDown)) {
                player.animations.stop('walk', true);
                player.loadTexture('cat-idle');
                player.animations.play('idle', 5, true);
            }
        }

        // movement
        if (cursors.left.isDown) 
        {   
            // mgMtn.position.x += 0.3;
            this.walkStart("left");
        }
        else if (cursors.right.isDown) 
        {
            // mgMtn.position.x -= 0.3;
            this.walkStart("right");
        }
        else 
        {
            this.walkStop();
        }
    },

    /** 
     * Checks if a user is jumping and manages the jump
     */
    handleJump: function() {
        // toggle the jumping animation
        if (!player.body.onFloor()) {
            isJumping = true;
            if (player.animations.currentAnim.name != "jump") {
                player.animations.stop('idle', true);
                player.animations.stop('walk', true);
                player.loadTexture('cat-jump');
                player.animations.play('jump', 60, true);
            }
        } else {
            isJumping = false;
        }


        // is the player holding the up button?
        // avoid jumping immediately upon landing if so
        if (isHoldingUp && !cursors.up.isDown)
            isHoldingUp = false;
        if (!isHoldingUp) {
            if (cursors.up.isDown
            && player.body.onFloor() 
            && game.time.now > jumpTimer) {
                isHoldingUp = true;
                player.body.velocity.y = -300;
                jumpTimer = game.time.now + 250;
            }
        }

        // if (cursors.right.isDown) {
        //     player.scale.x = 1;
        // } else if (cursors.left.isDown) {
        //     player.scale.x = -1;
        // }
    },

    /** 
     * Handles the winning conditions
     */
    handleWin: function() {
        if (won || !alive) 
            return;

        if (player.body.position.x > endPoint[0].x + player.body.width 
        && player.body.position.y < endPoint[0].y + player.body.height
        && alive && !won) {
            won = true;
            this.walkStop();
            alert ("You win!");
        }
    },

    /**
     * Walks in a given direction
     * @param  String dir "right" or "left"
     */
    walkStart: function(dir) {
        player.body.velocity.x = 0;
        if (dir == "right") {
            player.scale.x = 1;
            player.body.velocity.x = 200;
        } else {
            player.scale.x = -1;
            player.body.velocity.x = -200;
        }
    },

    /**
     * Stops walking
     */
    walkStop: function() {
        player.body.velocity.x = 0;
    }
};