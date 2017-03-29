StateMain = {

    preload: function() {  
        game.time.advancedTiming = true;
        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.image('mountains-bg', 'assets/png/mountains-bg-1024x512.png');
        game.load.image('mountain-mg', 'assets/png/mountain-mg-512x512.png');
        game.load.image('tileset', 'assets/png/tileset.png');
        game.load.image('player', 'assets/png/cat-sprite.png');
        game.load.spritesheet('cat', 'assets/png/cat-sprite.png', 34, 52, 10);
    },

    create: function() {  
        game.stage.backgroundColor = '#3598db';

        map = game.add.tilemap('map', 32, 32, config.tilesWide, 16);
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

        // get the object layers
        startPoint = map.objects.startPoint;
        endPoint = map.objects.endPoint;

        // add the player
        player = game.add.sprite(startPoint[0].x, startPoint[0].y, 'cat');
        player.animations.add('walk');
        player.anchor.setTo(.5,.5);

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
        console.log(player.body);

        // Variable to store the arrow key pressed
        cursors = game.input.keyboard.createCursorKeys();

        // // Add gravity to make it fall
        player.body.gravity.y = 1000;

        //the camera will follow the player in the world
        game.camera.follow(player);
    },

    update: function() {  
        // collision handling
        this.handleCollisions();
        this.handleWalk();
        this.handleJump();
        this.handleWin();
    },

    render: function() {
        game.debug.text(game.time.fps || '--', 2, 14, "#ffffff");
    },

    /**
     * Handles all collisions
     */
    handleCollisions: function() {
        game.physics.arcade.collide(layers.collisions, player);

        // handles losing
        if(player.body.position.y >= game.world.height - player.body.height
        && alive === true) {
            player.kill();
            alert("you died");
            alive = false;
        }
    },

    /**
     * Stops & starts walking
     * @return {[type]} [description]
     */
    handleWalk: function() {
        if (!alive || won) {
            return;
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
        if (cursors.up.isDown && player.body.onFloor() 
        && game.time.now > jumpTimer)
        {
            player.body.velocity.y = -300;
            jumpTimer = game.time.now + 250;
        }
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

    walkStart: function(dir) {
        player.body.velocity.x = 0;
        if (dir == "right") {
            player.scale.x = 1;
            player.body.velocity.x = 200;
            player.animations.play('walk', 10, true);
        } else {
            player.scale.x = -1;
            player.body.velocity.x = -200;
            player.animations.play('walk', 10, true);
        }
    },

    walkStop: function() {
        player.body.velocity.x = 0;
        player.animations.stop(null, true);
    }
};