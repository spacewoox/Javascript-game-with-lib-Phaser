function shoot() {
	nextShoot = game.time.now + 250;
	var bullet = playerProjectiles.getFirstDead();
	bullet.reset(player.x, player.y);
	bullet.animations.add('bulletAnim');
	bullet.animations.play('bulletAnim', 15, true);
	bullet.body.velocity.x = 1000;
}

function shootHit(a, b) {
	a.kill();
	b.hp -= 10;

	b.toto = false;

	if(b.hp <= 0) {
		enemyDeath(b);
	}
	else {
		setTimeout(function() {
			b.toto = true;
			b.animations.add('badiesAnimFly', [4, 5, 6, 7]);
			b.animations.play('badiesAnimFly', 15, true);
			b.body.velocity.x = -600;
		}, 1500);
	}
}

function shootHitCallback(a, b) {
	if(b.hp > 0 && b.toto == true) return true;
	else return false;
}

function enemyDeath(victim) {
	victim.body.velocity.x = 0;
	victim.kill();
	victim.toto3 = false;

	var explosion = game.add.sprite(victim.x, victim.y, 'explosion');
	explosion.animations.add('explosionAnim');
	explosion.animations.play('explosionAnim', 15, false);
	explosion.anchor.setTo(0.75,0.5);

	setTimeout(function() {
		victim.toto = true;
	}, 2000);

	if(victim.toto3 == true) score++;
}

function touchDown(a, b) {
	a.kill();
	b.kill();
	a.toto3 = false;
	var explosion = game.add.sprite(a.x, a.y, 'explosion');
	explosion.animations.add('explosionAnim');
	explosion.animations.play('explosionAnim', 15, false);
	explosion.anchor.setTo(0.75,0.5);
	if(a.toto3 == true) score++;
}