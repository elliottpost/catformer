 // Create the state that will contain the whole game
var mainState = {  
    game: null,
    map: null,

    preload: function() {  
        // Here we preload the assets
        
        this.game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('mountain-bg', 'assets/png/mountain-bg-512x512.png');
        this.game.load.image('mountain-mg', 'assets/png/mountain-mg-512x512.png');
        this.game.load.image('tileset', 'assets/png/tileset.png');
        this.game.load.image('tree', 'assets/png/tree-128x128.png');
        this.game.load.image('player', 'assets/png/cat-sprite.png');

    },

    create: function() {  
        // Here we create the game
        //Set the background color to blue
        this.game.stage.backgroundColor = '#3598db';

        this.map = this.game.add.tilemap('map', 32, 32, 56, 16);
        this.map.addTilesetImage('tileset', 'tileset');

        this.map.createLayer("ground");

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    // map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    // layer = map.createLayer('World1');

    //  This resizes the game world to match the layer dimensions
    // layer.resizeWorld();


        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;

        // Variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();

        // // Create the player in the middle of the game
        // this.player = game.add.sprite(70, 100, 'player');

        // // Add gravity to make it fall
        // this.player.body.gravity.y = 600;

        //  // Create 3 groups that will contain our objects
        // this.walls = game.add.group();

    },

    update: function() {  

        // if (this.cursor.left.isDown)
        // {
        //     game.camera.x -= 8;
        // }
        // else if (this.cursor.right.isDown)
        // {
        //     game.camera.x += 8;
        // }

        // if (this.cursor.up.isDown)
        // {
        //     game.camera.y -= 8;
        // }
        // else if (this.cursor.down.isDown)
        // {
        //     game.camera.y += 8;
        // }
    },

    // Function to restart the game
    restart: function() {
        game.state.start('main');
    }
};

// Initialize the game and start our state
var game = new Phaser.Game(756, 512);  
game.state.add('main', mainState);  
game.state.start('main');