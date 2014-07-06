function update() {
	game.physics.arcade.collide(player, layer);
	game.physics.arcade.collide(badies, layer);
	game.physics.arcade.collide(playerProjectiles, badies, shootHit, shootHitCallback, this);
	game.physics.arcade.collide(badies, tnts, touchDown, null, this);

	player.body.velocity.y = 0;

	if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		player.body.velocity.y = -300;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		player.body.velocity.y = 300;
	}
	if(spaceBar.isDown && playerProjectiles.countDead() > 0 && game.time.now >= nextShoot) {
		shoot();
	}

	if(badies.countDead() > 0 && game.time.now >= nextPop && pv>0) {
		nextPop = game.time.now + 1000;
		var badie = badies.getFirstDead();
		badie.reset(960, game.rnd.integerInRange(48, 426));
		badie.animations.add('badiesAnimWalk', [0, 1, 2, 3]);
		badie.animations.play('badiesAnimWalk', 15, true);
		badie.body.velocity.x = -200;
		badie.toto = true;
		badie.toto2 = true;
		badie.toto3 = true;
		badie.hp = 20;
	}

	playerProjectiles.forEach(function(item){
		if(item.x > gameWidth) item.kill();
	})

	badies.forEach(function(item){
		if(item.x < 0 && game.time.now > nextTouchDown && item.toto2 == true) {
			nextTouchDown = game.time.now + 1000;
			item.toto2 = false;
			item.kill();
			pv -= 10;
		}
	})

	if(pv <= 0) {
		badies.forEach(function(item){
			item.body.velocity.x = 0;
			item.body.velocity.y += 35;
			setTimeout(function() {
				item.body.velocity.x += 150
			}, 1000)
		})
		player.body.velocity.y += 300;
		setTimeout(function() {
			player.body.velocity.x += 2;
			player.rotation += 0.15;
		}, 1000)
	}
}