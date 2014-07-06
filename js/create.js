function create() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('tileset', 'tileset');
    layer = map.createLayer('main');
    layer.resizeWorld();
}