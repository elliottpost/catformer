 // Create the state that will contain the whole game
var mainState = {  
    preload: function() {  
        // Here we preload the assets
        game.load.image('mountain-bg', 'assets/png/mountain-bg.png');
        game.load.image('mountain-mg', 'assets/png/mountain-mg.png');
        game.load.image('rocks', 'assets/png/rocks.png');
        game.load.image('earth', 'assets/png/tile-earth.png');
        game.load.image('earth-half', 'assets/png/tile-earth-half.png');
        game.load.image('tree', 'assets/png/tree.png');
        game.load.image('player', 'assets/png/cat/Idle (1).png');
    },

    create: function() {  
        // Here we create the game
        //Set the background color to blue
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;

        // Variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');

        // Add gravity to make it fall
        this.player.body.gravity.y = 600;

         // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

    },

    update: function() {  

        if (this.cursor.left.isDown)
        {
            game.camera.x -= 8;
        }
        else if (this.cursor.right.isDown)
        {
            game.camera.x += 8;
        }

        if (this.cursor.up.isDown)
        {
            game.camera.y -= 8;
        }
        else if (this.cursor.down.isDown)
        {
            game.camera.y += 8;
        }
    },

    // Function to restart the game
    restart: function() {
        game.state.start('main');
    }
};

// Initialize the game and start our state
var game = new Phaser.Game(1000, 600);  
game.state.add('main', mainState);  
game.state.start('main');