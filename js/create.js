function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	cursors = game.input.keyboard.createCursorKeys();
	spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	map = game.add.tilemap('tilemap');
	map.addTilesetImage('tileset', 'tileset');
    layer = map.createLayer('main');
    layer.resizeWorld();

    map.setCollision(8);
    map.setCollision(9);

    game.world.setBounds();

    player = game.add.sprite(121, 254, 'player');
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.enableBody = true;
    player.body.setSize(48, 88, 0, 0);

    playerProjectiles = game.add.group();
    playerProjectiles.createMultiple(50, 'playerProjectile');
    game.physics.arcade.enable(playerProjectiles);
    playerProjectiles.forEach(function(item) {
    	enableBody = true;
    })
    playerProjectiles.setAll('checkWorldBounds', true);
    playerProjectiles.setAll('outOfBoundsKill', true);

    badies = game.add.group();
    badies.createMultiple(50, 'bad1');
    game.physics.arcade.enable(badies);
    badies.forEach(function(item) {
    	item.enableBody = true;
    	item.anchor.setTo(0.5, 0.5);
    	item.body.setSize(48, 48, 0, 16);
    	item.hp = 20;
		item.scale.setTo(1, 1);
    });

    tnts = game.add.group();
    tnts.createMultiple(14, 'tnt');
    game.physics.arcade.enable(tnts);
    var i = 1;
    tnts.forEach(function(item){
    	item.reset(0, 32*i);
    	i++;
    });

}