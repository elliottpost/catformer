var WIDTH = 1024;
var HEIGHT = 512;
var game;

// Create the state that will contain the whole game
var mainState = {  
    map: null,
    cursors: null,
    player: null,

    preload: function() {  
        // Here we preload the assets
        
        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.image('mountain-bg', 'assets/png/mountain-bg-512x512.png');
        game.load.image('mountain-mg', 'assets/png/mountain-mg-512x512.png');
        game.load.image('tileset', 'assets/png/tileset.png');
        game.load.image('tree', 'assets/png/tree-128x128.png');
        game.load.image('player', 'assets/png/cat-sprite.png');
        game.load.image('sky', 'assets/png/sky.png');

        game.load.spritesheet('cat', 'assets/png/cat-sprite.png', 34, 52, 10);

    },

    create: function() {  
        // Here we create the game
        //Set the background color to blue
        game.stage.backgroundColor = '#3598db';
        game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'sky');

        this.map = game.add.tilemap('map', 32, 32, 56, 16);
        this.map.addTilesetImage('tileset', 'tileset');
        this.map.addTilesetImage('mountain-bg-512x512', 'mountain-bg');
        this.map.addTilesetImage('mountain-mg-512x512', 'mountain-mg');
        this.map.addTilesetImage('tree-128x128', 'tree');

        // var bgSky = this.map.createLayer('background-sky');
        var bgGrass = this.map.createLayer('collision');
        var bgMtn = this.map.createLayer('background-mountain');
        var mgMtn = this.map.createLayer('midground-mountain');
        var ground = this.map.createLayer('ground');
        var bgTrees = this.map.createLayer('background-tree');
        var bgGrass = this.map.createLayer('background-grass');


        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // add the player
        this.player = game.add.sprite(10, 350, 'cat');
        this.player.animations.add('walk');
        this.player.animations.play('walk', 10, true);

        // Add the physics engine to all game objects
        game.world.enableBody = true;

        // Variable to store the arrow key pressed
        this.cursors = game.input.keyboard.createCursorKeys();
        console.log(this.cursors);

        // // Add gravity to make it fall
        this.player.body.gravity.y = 600;

        //  // Create 3 groups that will contain our objects
        // this.walls = game.add.group();

    },

    update: function() {  
        if (this.cursors.left.isDown) 
        {   //  Move to the left
            player.scale.x = -1;  // a little trick.. flips the image to the left
            walkStart();
        }
        else if (this.cursors.right.isDown) 
        { //  Move to the right
            player.scale.x = 1;
            this.walkStart();
        }
        else 
        {
            this.walkStop();
        }

        // if (cursors.up.isDown)
        // {
        //     player.loadTexture('mario', 5);   // this loads the frame 5 (jump) of my mario spritesheet
        //     if(touchingDown(player)){  // this checks if the player is on the floor (we don't allow airjumps)
        //         player.body.velocity.y = -800;   // change the y velocity to -800 means "jump!"
        //     }
        // }
    },

    // Function to restart the game
    restart: function() {
        game.state.start('main');
    },

    walkStart: function() {
        // this.player.body.velocity.x = 300;
        this.player.animations.play('walk', 10, true);
    },
    walkStop: function() {
        // this.player.body.velocity.x = 0;
        this.player.animations.stop(null, true);
    }
};

// Initialize the game and start our state
game = new Phaser.Game(WIDTH, HEIGHT);  
game.state.add('main', mainState);  
game.state.start('main');