function preload() {
	//	MAP
	game.load.tilemap('tilemap', 'assets/tilemap/tilemap3.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tileset', 'assets/tilemap/tileset2.png');
    game.load.image('mapImage', 'assets/tilemap/tilemap.jpg')

	//	player
    game.load.spritesheet('player', 'assets/player/player.png', 64, 96);
    game.load.spritesheet('playerProjectile', 'assets/player/playerProjectile.png', 32, 32);

    //	ENEMIES
    game.load.spritesheet('enemy1', 'assets/enemies/enemies.png', 64, 96);
    game.load.spritesheet('enemy2', 'assets/enemies/enemies2.png', 64, 96);
    game.load.spritesheet('enemy3', 'assets/enemies/enemies3.png', 64, 96);
    game.load.spritesheet('enemy4', 'assets/enemies/enemies4.png', 64, 96);

    //	HEAL
    game.load.image('heal', 'assets/heal/heal.png');

    //  SPELL1
    game.load.spritesheet('spell1Projectile', 'assets/spell1/spell1Projectile.png', 160, 160);
    game.load.spritesheet('spell1Impact', 'assets/spell1/spell1Impact.png', 160, 160);
    game.load.image('spell1Drop', 'assets/spell1/spell1Drop.png');

    //  SPELL2
    game.load.spritesheet('spell2Impact', 'assets/spell2/spell2Impact.png', 512, 512);

    //  SPELL3
    game.load.spritesheet('spell3player', 'assets/spell3/spell3player2.png', 64, 96);
    game.load.spritesheet('spell3Projectile', 'assets/spell3/spell3Projectile.png', 48, 48);
    game.load.spritesheet('spell3Over', 'assets/spell3/spell3Over.png', 158, 158);

    //  SPELL4
    game.load.spritesheet('spell4Effect', 'assets/spell4/spell4Effect.png', 256, 256);

    //  BONUS FOUDRE
    game.load.image('bonusFoudreOrb', 'assets/bonusFoudre/bonusFoudreOrb.png');
    game.load.spritesheet('bonusFoudreImpact', 'assets/bonusFoudre/bonusFoudreImpact.png', 96, 96);
    game.load.spritesheet('bonusFoudreBeam', 'assets/bonusFoudre/bonusFoudreBeam.png', 350, 50);

    //  BONUS FIRE
    game.load.image('bonusFireOrb', 'assets/bonusFire/bonusFireOrb.png');
    game.load.spritesheet('bonusFireImpact', 'assets/bonusFire/bonusFireImpact2.png', 160, 160);
    game.load.spritesheet('bonusFireDot', 'assets/bonusFire/bonusFireDot.png', 64, 96);

    //  BONUS WIND
    game.load.image('bonusWindOrb', 'assets/bonusWind/bonusWindOrb.png');
    game.load.image('bonusWindProjectile', 'assets/bonusWind/bonusWindProjectile3.png');

    //  BONUS ICE
    game.load.image('bonusIceOrb', 'assets/bonusIce/bonusIceOrb.png');
    game.load.spritesheet('bonusIceImpact', 'assets/bonusIce/bonusIceImpact.png', 192, 192);

    //  BONUS ROCK
    game.load.image('bonusRockOrb', 'assets/bonusRock/bonusRockOrb.png');
    game.load.spritesheet('bonusRockProjectile', 'assets/bonusRock/bonusRockProjectile.png', 288, 160);

    //  BONUS EAU
    game.load.image('bonusEauOrb', 'assets/bonusEau/bonusEauOrb.png');
    game.load.spritesheet('bonusEauProjectile', 'assets/bonusEau/bonusEauProjectile.png', 384, 96);
    game.load.spritesheet('bonusEauImpact', 'assets/bonusEau/bonusEauImpact.png', 96, 144);

    //  HUD
    game.load.image('barContainer', 'assets/hud/barContainer.png');
    game.load.image('healthBarFill', 'assets/hud/healthBarFill.png');
    game.load.image('manaBarFill', 'assets/hud/manaBarFill.png');
    game.load.image('barBg', 'assets/hud/barBg.png');
    game.load.image('cdOverlayIcon', 'assets/hud/hudCdOverlayIcon.png');
    game.load.image('bonusNormalIcon', 'assets/hud/bonusNormalIcon.png');
    game.load.image('bonusFireIcon', 'assets/hud/bonusFireIcon.png');
    game.load.image('bonusFoudreIcon', 'assets/hud/bonusFoudreIcon.png');
    game.load.image('bonusIceIcon', 'assets/hud/bonusIceIcon.png');
    game.load.image('bonusRockIcon', 'assets/hud/bonusRockIcon.png');
    game.load.image('bonusEauIcon', 'assets/hud/bonusEauIcon.png');
    game.load.image('bonusWindIcon', 'assets/hud/bonusWindIcon.png');
    game.load.image('spell1Icon', 'assets/hud/spell1Icon.png');
    game.load.image('spell2Icon', 'assets/hud/spell2Icon.png');
    game.load.image('spell3Icon', 'assets/hud/spell3Icon.png');
    game.load.image('spell4Icon', 'assets/hud/spell4Icon.png');
    game.load.image('spell1NoManaIcon', 'assets/hud/spell1NoManaIcon.png');
    game.load.image('spell2NoManaIcon', 'assets/hud/spell2NoManaIcon.png');
    game.load.image('spell3NoManaIcon', 'assets/hud/spell3NoManaIcon.png');
    game.load.image('spell4NoManaIcon', 'assets/hud/spell4NoManaIcon.png');
    game.load.image('spell1NoLvlIcon', 'assets/hud/spell1NoLvlIcon.png');
    game.load.image('spell2NoLvlIcon', 'assets/hud/spell2NoLvlIcon.png');
    game.load.image('spell3NoLvlIcon', 'assets/hud/spell3NoLvlIcon.png');
    game.load.image('spell4NoLvlIcon', 'assets/hud/spell4NoLvlIcon.png');

    //  SPLASHSCREEN
    game.load.image('splashBg', 'assets/splashscreen/splashBg.jpg');
    game.load.image('splashTitle', 'assets/splashscreen/title.png');
    game.load.spritesheet('splashPressStart', 'assets/splashscreen/pressStart.png', 468, 96);
}