

// Initialize Phaser, and create a 400px by 490px game
let game = new Phaser.Game(400, 490);
let player, platforms, cursors, jumpButton;


// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        // This function will be executed at the beginning     
        // That's where we load the images and sounds 

        game.stage.backgroundColor = '#444';

        game.load.baseURL = 'http://yortus.github.io/games/';
        game.load.crossOrigin = 'anonymous';

        game.load.image('player', 'caveman/images/player.png');
        game.load.image('platform', 'caveman/images/rocks.png');


    },

    create: function() { 
        // This function is called after the preload function     
        // Here we set up the game, display sprites, etc.  

        player = game.add.sprite(100, 200, 'player');

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 500;

        platforms = game.add.physicsGroup();

        platforms.create(500, 150, 'platform');
        platforms.create(-200, 300, 'platform');
        platforms.create(400, 450, 'platform');

        platforms.setAll('body.immovable', true);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic   

        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -250;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 250;
        }

        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
        {
            player.body.velocity.y = -400;
        }
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');

