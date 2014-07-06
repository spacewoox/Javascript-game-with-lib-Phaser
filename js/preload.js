function preload() {
	game.load.image('tileset', 'assets/tilemap/tileset.png');
	game.load.image('tnt', 'assets/tilemap/tnt.png');
	game.load.tilemap('tilemap', 'assets/tilemap/tilemap2.json', null, Phaser.Tilemap.TILED_JSON);

	game.load.spritesheet('player', 'assets/player/player.png', 96, 96);
	game.load.spritesheet('playerProjectile', 'assets/player/playerProjectile.png', 132, 24);

	game.load.spritesheet('bad1', 'assets/bad/bad1.png', 96, 96);

	game.load.spritesheet('explosion', 'assets/explosion/explosion.png', 128, 128);
}