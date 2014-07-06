function preload() {
	game.load.image('tileset', 'assets/tilemap/tileset.png');
	game.load.tilemap('tilemap', 'assets/tilemap/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
}