var WIDTH = 1024;
var HEIGHT = 512;
var game, cursors, player, map;
var layers = {};

function preload() {  
    // Here we preload the assets
    
    game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('mountain-bg', 'assets/png/mountain-bg-512x512.png');
    game.load.image('mountain-mg', 'assets/png/mountain-mg-512x512.png');
    game.load.image('tileset', 'assets/png/tileset.png');
    game.load.image('tree', 'assets/png/tree-128x128.png');
    game.load.image('player', 'assets/png/cat-sprite.png');
    game.load.image('sky', 'assets/png/sky.png');

    game.load.spritesheet('cat', 'assets/png/cat-sprite.png', 34, 52, 10);

}

function create() {  
    // Here we create the game
    //Set the background color to blue
    game.stage.backgroundColor = '#3598db';
    game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'sky');

    map = game.add.tilemap('map', 32, 32, 56, 16);
    map.addTilesetImage('tileset', 'tileset');
    map.addTilesetImage('mountain-bg-512x512', 'mountain-bg');
    map.addTilesetImage('mountain-mg-512x512', 'mountain-mg');
    map.addTilesetImage('tree-128x128', 'tree');

    // var bgSky = map.createLayer('background-sky');
    layers.collision = map.createLayer('collision');
    layers.bgMtn = map.createLayer('background-mountain');
    layers.mgMtn = map.createLayer('midground-mountain');
    layers.ground = map.createLayer('ground');
    layers.bgTrees = map.createLayer('background-tree');
    layers.bgGrass = map.createLayer('background-grass');
    layers.collision.resizeWorld();

    // add the player
    player = game.add.sprite(10, 350, 'cat');
    player.animations.add('walk');
    player.animations.play('walk', 15, true);

    // Start the Arcade physics system (for movements and collisions)
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(layers.collision, Phaser.Physics.ARCADE);
    map.setCollisionBetween(0, 2000, true, 'collision');
    layers.collision.body.immovable = true;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    // Variable to store the arrow key pressed
    cursors = game.input.keyboard.createCursorKeys();

    // // Add gravity to make it fall
    player.body.gravity.y = 600;

    //the camera will follow the player in the world
    game.camera.follow(player);
}

function update() {  
    game.physics.arcade.collide(layers.collision, player);

    if (cursors.left.isDown) 
    {   
        walkStart("left");
    }
    else if (cursors.right.isDown) 
    {
        walkStart("right");
    }
    else 
    {
        walkStop();
    }

    // if (cursors.up.isDown)
    // {
    //     player.loadTexture('mario', 5);   // this loads the frame 5 (jump) of my mario spritesheet
    //     if(touchingDown(player)){  // this checks if the player is on the floor (we don't allow airjumps)
    //         player.body.velocity.y = -800;   // change the y velocity to -800 means "jump!"
    //     }
    // }
}

function walkStart(dir) {
    if (dir == "right") {
        player.scale.x = 1;
        player.body.velocity.x = 150;
        player.animations.play('walk', 10, true);
    } else {
        player.scale.x = -1;
        player.body.velocity.x = -150;
        player.animations.play('walk', 10, true);
    }
}
function walkStop() {
    player.body.velocity.x = 0;
    player.animations.stop(null, true);
}

// Initialize the game and start our state
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});  