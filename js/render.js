function render() {
	//game.debug.body(player);

	game.debug.text(playerProjectiles.countDead(), 32, 32);
	game.debug.text(pv, 32, 64);
	game.debug.text('Nombre de chat mort = ' + score, 32, 96);
}