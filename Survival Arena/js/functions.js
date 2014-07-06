////////////////////////////////////////////
/////////////// SPLASHSCREEN ///////////////
////////////////////////////////////////////

function startButtonOnClick() {
    splashScreen = false;
    splashGrp.callAll('kill');
}


////////////////////////////////////////////
/////////////////// PAUSE //////////////////
////////////////////////////////////////////

function pause() {
    if(game.paused == false) game.paused = true;
    else game.paused = false;
}

////////////////////////////////////////////
//////////// ANIMATION COMPLETE ////////////
////////////////////////////////////////////

function animationStopped(sprite, animation) {
    sprite.kill();
}

////////////////////////////////////////////
///////////// ANGLE DU CURSEUR /////////////
////////////////////////////////////////////

function calcCursorAngle() {
    playerX =  player.x-game.camera.x;
    playerY =  player.y-game.camera.y;

    cursorX =  game.input.mousePointer.x-playerX;
    cursorY =  game.input.mousePointer.y-playerY;

    cursorAngle = 1/(cursorX/cursorY);

    if (cursorAngle >= 2 || cursorAngle <= -2) {
        x = 0;
        if (game.input.mousePointer.y < playerY) y = 1;
        else y = -1
    }
    else if (cursorAngle >= -0.33 && cursorAngle <= 0.33) {
        if (game.input.mousePointer.x > playerX) x = 1;
        else x = -1;
        y = 0;
    }
    else if (cursorAngle > 0.33 && cursorAngle < 2) {
        if (game.input.mousePointer.x > playerX) x = 1;
        else x = -1;
        if (game.input.mousePointer.y < playerY) y = 1;
        else y = -1;
    }
    else if (cursorAngle < -0.33 && cursorAngle > -2) {
        if (game.input.mousePointer.x > playerX) x = 1;
        else x = -1;
        if (game.input.mousePointer.y < playerY) y = 1;
        else y = -1;
    }
}

////////////////////////////////////////////
//////////////// COLLISIONS ////////////////
////////////////////////////////////////////

//  Collision Projectile/Mur

function projectileKill(a, b) {
    a.kill();
}

//  Collision Projectile/Enemies

function projectileDmg(a, b) {
    if(spell3Mode == false) a.kill();
    b.hp = b.hp-playerDmg;

    if(bonusFoudre) bonusFoudreApply1(b);
    if(bonusFire) bonusFireApply(b);
    if(bonusIce) bonusIceApply(b);
    if(bonusEau) bonusEauApply(b)

    if(b.hp <= 0) enemyDeath(b);
}


//  Enemie death

function enemyDeath(item) {
    item.kill();

    if (spell3Mode == false) playerMana = playerMana + playerManaRegenPKill;
    if (playerMana > playerManaMax) playerMana = playerManaMax;

    if (item.enType == 4 && enType3.countDead() > 3) {
        for(i = 1; i < 3; i++) {
            var randomPopx = game.rnd.integerInRange(item.x-48, item.x+48);
            var randomPopy = game.rnd.integerInRange(item.y-48, item.y+48);
            var enemy = enType3.getFirstDead();
            enemy.reset(randomPopx, randomPopy);
            enemy.hp = enType3Hp;
            enemy.ms = enType3Ms;
        }
    };

    if (item.enType == 1) score = score + enType1Pt*multiScore;
    if (item.enType == 2) score = score + enType2Pt*multiScore;
    if (item.enType == 3) score = score + enType3Pt*multiScore;
    if (item.enType == 4) score = score + enType4Pt*multiScore;

    if(multiScore < maxMultiScore) multiScore = multiScore + 1;
    multiScoreLoad = multiScoreLoadBase;
        
    playerLevel();
}


//  Collision Enemie/player

function enemiesDmg(a, b) {

    playerHp = playerHp - 10;
    multiScoreReset();

    if(playerHp <= 0) {
        playerHp = "DEAD";
        player.kill()
    }
}

function processCallback(a, b) {
    if (game.time.now > nextplayerFade) {

        nextplayerFade = game.time.now + playerFade;

        return true;
    }
    else {
        return false;
    }
}

function multiScoreReset() {
    multiScore = 1;
    multiScoreLoad = 0;
}

////////////////////////////////////////////
/////////////// player ATTACK //////////////
////////////////////////////////////////////

function fire() {
    if (game.time.now > nextFire && playerHp != "DEAD")
    {
        nextFire = game.time.now + fireRate;

        if(bonusWind == true && bonusWindProjectiles.countDead() > 0) {
            normalFire = false;
            if (game.rnd.realInRange(1, 100) <= bonusWindRate) {
                var playerProjectile = bonusWindProjectiles.getFirstDead();
                playerProjectile.reset(player.x+game.rnd.integerInRange(16, 32), player.y+game.rnd.integerInRange(16, 32));
                game.physics.arcade.moveToPointer(playerProjectile, bonusWindProjectileSpeed);
            }
            else {
                normalFire = true;
            }
        }
        else if(bonusRock == true && bonusRockProjectiles.countDead() > 0) {
            normalFire = false;
            if (game.rnd.realInRange(1, 100) <= bonusRockRate ) {
                var playerProjectile = bonusRockProjectiles.getFirstDead();
                playerProjectile.reset(player.x, player.y);
                game.physics.arcade.moveToPointer(playerProjectile, bonusRockProjectileSpeed);
                playerProjectile.anchor.setTo(0.5, 0.5);
                bonusRockProjectileAnim = playerProjectile.animations.add('bonusRockProjectileAnim');
                bonusRockProjectileAnim.play(25, false);
                bonusRockProjectileAnim.onComplete.add(animationStopped, this);
            }
            else {
                normalFire = true;
            }
        }
        else {
            normalFire = true;
        }

        if(normalFire && playerProjectiles.countDead() > 0) {
            var playerProjectile = playerProjectiles.getFirstDead();
            playerProjectile.reset(player.x+game.rnd.integerInRange(16, 32), player.y+game.rnd.integerInRange(16, 32));
            game.physics.arcade.moveToPointer(playerProjectile, game.rnd.integerInRange(900, 1200));
            rand = game.rnd.realInRange(1, 1.3);
            playerProjectile.scale.setTo(rand, rand);
            playerProjectileAnim = playerProjectile.animations.add('projectile');
            playerProjectileAnim.play(game.rnd.integerInRange(15, 100), true);
        }

        playerProjectile.rotation = game.physics.arcade.angleToPointer(playerProjectile);        
    }
}

////////////////////////////////////////////
//////////////// player LVL ////////////////
////////////////////////////////////////////

function playerLevel() {
    if(spell3Mode == false) {
        if (playerLv >= 2) {
            playerDmg = playerDmgBase + 1.8*playerLv;
            fireRate = fireRateBase - playerLv*1.55;
        } 
    }
    if (score >= playerLv2 && score < playerLv3) playerLv = 2;
    if (score >= playerLv3 && score < playerLv4) playerLv = 3;
    if (score >= playerLv4 && score < playerLv5) playerLv = 4;
    if (score >= playerLv5 && score < playerLv6) playerLv = 5;
    if (score >= playerLv6 && score < playerLv7) playerLv = 6;
    if (score >= playerLv7 && score < playerLv8) playerLv = 7;
    if (score >= playerLv8 && score < playerLv9) playerLv = 8;
    if (score >= playerLv9 && score < playerLv10) playerLv = 9;
    if (score >= playerLv10 && score < playerLv11) playerLv = 10;
    if (score >= playerLv11 && score < playerLv12) playerLv = 11;
    if (score >= playerLv12 && score < playerLv13) playerLv = 12;
    if (score >= playerLv13 && score < playerLv14) playerLv = 13;
    if (score >= playerLv14 && score < playerLv15) playerLv = 14;
    if (score >= playerLv15) playerLv = 15;
}


////////////////////////////////////////////
/////////////////// BONUS //////////////////
////////////////////////////////////////////

function bonusSpawner() {
    if  (
            game.time.now > nextBonus && 
            bonusFoudreOrbs.countDead() > 0 &&
            bonusFireOrbs.countDead() > 0 &&
            bonusIceOrbs.countDead() > 0 &&
            bonusWindOrbs.countDead() > 0 &&
            bonusEauOrbs.countDead() > 0 &&
            bonusRockOrbs.countDead() > 0 
        )
    {
        nextBonus = game.time.now + bonusLoad;

        bonusRandomPop = game.rnd.integerInRange(1, 6);

        if(bonusRandomPop == 1) var bonus = bonusFoudreOrbs.getFirstDead();
        if(bonusRandomPop == 2) var bonus = bonusFireOrbs.getFirstDead();
        if(bonusRandomPop == 3) var bonus = bonusWindOrbs.getFirstDead();
        if(bonusRandomPop == 4) var bonus = bonusIceOrbs.getFirstDead();
        if(bonusRandomPop == 5) var bonus = bonusRockOrbs.getFirstDead();
        if(bonusRandomPop == 6) var bonus = bonusEauOrbs.getFirstDead();

        bonus.reset(game.world.randomX, game.world.randomY);

        var bonusX = layerCollision.getTileX(bonus.x) * 32;
        var bonusY = layerCollision.getTileY(bonus.y) * 32;
        var bonusCurrentTile = map.getTile(layerCollision.getTileX(bonusX), layerCollision.getTileY(bonusY));
        if (bonusCurrentTile.index != 1) {
            bonus.kill();
            nextBonus = 0;
        }
        else {
            var bonusOrbTimer = setTimeout(function() {bonus.kill()}, bonusOrbTime)
        }
    }
}

function bonusFoudreLoot(a,b) {
    b.kill();

    if(bonusFoudre == true || bonusFire == true || bonusWind == true || bonusIce == true || bonusRock == true || bonusEau == true)  bonusDurationReset();

    bonusFoudre = true; 

    bonusDurationTimer = game.time.create(false);
    bonusDurationTimer.loop(bonusDuration, bonusDurationReset, this);
    bonusDurationTimer.start();
}

function bonusFireLoot(a,b) {
    b.kill();

    if(bonusFoudre == true || bonusFire == true || bonusWind == true || bonusIce == true || bonusRock == true || bonusEau == true)  bonusDurationReset(); 

    bonusFire = true;

    bonusDurationTimer = game.time.create(false);
    bonusDurationTimer.loop(bonusDuration, bonusDurationReset, this);
    bonusDurationTimer.start();
}

function bonusWindLoot(a,b) {
    b.kill();

    if(bonusFoudre == true || bonusFire == true || bonusWind == true || bonusIce == true || bonusRock == true || bonusEau == true)  bonusDurationReset(); 

    bonusWind = true;

    bonusDurationTimer = game.time.create(false);
    bonusDurationTimer.loop(bonusDuration, bonusDurationReset, this);
    bonusDurationTimer.start();
}

function bonusIceLoot(a,b) {
    b.kill();

    if(bonusFoudre == true || bonusFire == true || bonusWind == true || bonusIce == true || bonusRock == true || bonusEau == true)  bonusDurationReset(); 

    bonusIce = true;

    bonusDurationTimer = game.time.create(false);
    bonusDurationTimer.loop(bonusDuration, bonusDurationReset, this);
    bonusDurationTimer.start();
}

function bonusRockLoot(a,b) {
    b.kill();

    if(bonusFoudre == true || bonusFire == true || bonusWind == true || bonusIce == true || bonusRock == true || bonusEau == true)  bonusDurationReset(); 

    bonusRock = true;

    bonusDurationTimer = game.time.create(false);
    bonusDurationTimer.loop(bonusDuration, bonusDurationReset, this);
    bonusDurationTimer.start();
}

function bonusEauLoot(a,b) {
    b.kill();

    if(bonusFoudre == true || bonusFire == true || bonusWind == true || bonusIce == true || bonusRock == true || bonusEau == true)  bonusDurationReset(); 

    bonusEau = true;

    bonusDurationTimer = game.time.create(false);
    bonusDurationTimer.loop(bonusDuration, bonusDurationReset, this);
    bonusDurationTimer.start();
}

function bonusDurationReset() {
    bonusDurationTimer.destroy();
    bonusFoudre = false;
    bonusFire = false;
    bonusWind = false;
    bonusIce = false;
    bonusRock = false;
    bonusEau = false;
}

function bonusTest() {
    if(bonusTester == false) {
        var bonusTest1 = bonusFoudreOrbs.getFirstDead();
        bonusTest1.reset(1950, 300);
        var bonusTest2 = bonusFireOrbs.getFirstDead();
        bonusTest2.reset(2075, 425);

        bonusTester = true;
    }
}



////////////////////////////////////////////
/////////////// BONUS FOUDRE ///////////////
////////////////////////////////////////////

function bonusFoudreApply1(source) {

    bonusFoudreReset();

    bonusFoudreTarget1 = source;

    if (bonusFoudreImpacts.countDead() > 0) {
        bonusFoudreImpact = bonusFoudreImpacts.getFirstDead();
        bonusFoudreImpact.reset(bonusFoudreTarget1.x+32, bonusFoudreTarget1.y+48);
        bonusFoudreImpact.anchor.setTo(0.5, 0.5);
        bonusFoudreImpactAnim = bonusFoudreImpact.animations.add('bonusFoudreImpactAnim');
        bonusFoudreImpactAnim.play(20, false);
        bonusFoudreImpactAnim.onComplete.add(animationStopped, this);
    }

    enemies.forEach(function(enTypeItem) {
        enTypeItem.forEach(function (item) {
            if (
                bonusFoudreSearch1 == true &&
                item.x >= source.x - bonusFoudreZone &&
                item.x <= source.x + bonusFoudreZone &&
                item.y >= source.y - bonusFoudreZone &&
                item.y <= source.y + bonusFoudreZone &&
                item != bonusFoudreTarget1 &&
                item.hp > 0
            ){
                bonusFoudreApply2(item);
                bonusFoudreSearch1 = false;
            }
        })
    })

    if (bonusFoudreTarget2 == null) bonusFoudreReset();

    source.hp = source.hp - bonusFoudreDmg;
    if (source.hp <= 0) enemyDeath(source);
}

function bonusFoudreApply2(source) {
    bonusFoudreTarget2 = source;

    if (bonusFoudreImpacts.countDead() > 0) {
        bonusFoudreImpact = bonusFoudreImpacts.getFirstDead();
        bonusFoudreImpact.reset(bonusFoudreTarget2.x+32, bonusFoudreTarget2.y+48);
        bonusFoudreImpact.anchor.setTo(0.5, 0.5);
        bonusFoudreImpactAnim = bonusFoudreImpact.animations.add('bonusFoudreImpactAnim');
        bonusFoudreImpactAnim.play(20, false);
        bonusFoudreImpactAnim.onComplete.add(animationStopped, this);
    }
    
    if (bonusFoudreBeams.countDead() > 0) {
        bonusFoudreBeam = bonusFoudreBeams.getFirstDead();
        bonusFoudreBeam.reset(bonusFoudreTarget1.x+16, bonusFoudreTarget1.y+64);
        bonusFoudreBeamAnim = bonusFoudreBeam.animations.add('bonusFoudreBeamAnim');
        bonusFoudreBeamAnim.play(20, false);
        bonusFoudreBeamAnim.onComplete.add(animationStopped, this);
        bonusFoudreBeam.anchor.setTo(0, 0.5);
        bonusFoudreU = (bonusFoudreTarget2.x - bonusFoudreTarget1.x);
        bonusFoudreV = (bonusFoudreTarget2.y - bonusFoudreTarget1.y);
        bonusFoudreBeamWidth = Math.sqrt(bonusFoudreU*bonusFoudreU + bonusFoudreV*bonusFoudreV);
        bonusFoudreBeamHeight = 50*bonusFoudreBeamWidth/350;
        bonusFoudreBeam.width = bonusFoudreBeamWidth;
        bonusFoudreBeam.height = bonusFoudreBeamHeight;
        bonusFoudreBeam.rotation = game.physics.arcade.angleBetween(bonusFoudreBeam, bonusFoudreTarget2);
    }
    
    enemies.forEach(function(enTypeItem) {
        enTypeItem.forEach(function (item) {
            if (
                bonusFoudreSearch2 == true &&
                item.x >= source.x - bonusFoudreZone &&
                item.x <= source.x + bonusFoudreZone &&
                item.y >= source.y - bonusFoudreZone &&
                item.y <= source.y + bonusFoudreZone &&
                item != bonusFoudreTarget1 &&
                item != bonusFoudreTarget2 &&
                item.hp > 0
            ){
                bonusFoudreApply3(item);
                bonusFoudreSearch2 = false;
            }
        })
    })

    if (bonusFoudreTarget3 == null) bonusFoudreReset();

    source.hp = source.hp - bonusFoudreDmg;
    if (source.hp <= 0) enemyDeath(source);
}

function bonusFoudreApply3(source) {
    bonusFoudreTarget3 = source;

    if (bonusFoudreImpacts.countDead() > 0) {
        bonusFoudreImpact = bonusFoudreImpacts.getFirstDead();
        bonusFoudreImpact.reset(bonusFoudreTarget3.x+32, bonusFoudreTarget3.y+48);
        bonusFoudreImpact.anchor.setTo(0.5, 0.5);
        bonusFoudreImpactAnim = bonusFoudreImpact.animations.add('bonusFoudreImpactAnim');
        bonusFoudreImpactAnim.play(20, false);
        bonusFoudreImpactAnim.onComplete.add(animationStopped, this);
    }

    if (bonusFoudreBeams.countDead() > 0) {
        bonusFoudreBeam = bonusFoudreBeams.getFirstDead();
        bonusFoudreBeam.reset(bonusFoudreTarget2.x+16, bonusFoudreTarget2.y+64);
        bonusFoudreBeamAnim = bonusFoudreBeam.animations.add('bonusFoudreBeamAnim');
        bonusFoudreBeamAnim.play(20, false);
        bonusFoudreBeamAnim.onComplete.add(animationStopped, this);
        bonusFoudreBeam.anchor.setTo(0, 0.5);
        bonusFoudreU = (bonusFoudreTarget3.x - bonusFoudreTarget2.x);
        bonusFoudreV = (bonusFoudreTarget3.y - bonusFoudreTarget2.y);
        bonusFoudreBeamWidth = Math.sqrt(bonusFoudreU*bonusFoudreU + bonusFoudreV*bonusFoudreV);
        bonusFoudreBeamHeight = 50*bonusFoudreBeamWidth/350;
        bonusFoudreBeam.width = bonusFoudreBeamWidth;
        bonusFoudreBeam.height = bonusFoudreBeamHeight;
        bonusFoudreBeam.rotation = game.physics.arcade.angleBetween(bonusFoudreBeam, bonusFoudreTarget3);
    }

    bonusFoudreSearch3 = false;
    source.hp = source.hp - bonusFoudreDmg;
    if (source.hp <= 0) enemyDeath(source);
    bonusFoudreReset();
}

function bonusFoudreReset() {
    bonusFoudreTarget1 = null;
    bonusFoudreTarget2 = null;
    bonusFoudreTarget3 = null;

    bonusFoudreSearch1 = true;
    bonusFoudreSearch2 = true;
    bonusFoudreSearch3 = true;
}


////////////////////////////////////////////
///////////////// BONUS FIRE ///////////////
////////////////////////////////////////////

function bonusFireApply(source) {
    if(bonusFireImpacts.countDead() > 0) {
        var bonusFireImpact = bonusFireImpacts.getFirstDead();
        bonusFireImpact.reset(source.x+32, source.y+64);
        bonusFireImpact.anchor.setTo(0.5, 0.5);
        bonusFireImpact.rotation = game.rnd.integerInRange(0, 360)

        bonusFireImpactAnim = bonusFireImpact.animations.add('bonusFireImpactAnim');
        bonusFireImpactAnim.play(20, false);
        bonusFireImpactAnim.onComplete.add(animationStopped, this);
    }

    enemies.forEach(function(enTypeItem) {
        enTypeItem.forEach(function(item) {
            if (
                item.x >= source.x - bonusFireZone &&
                item.x <= source.x + bonusFireZone &&
                item.y >= source.y - bonusFireZone &&
                item.y <= source.y + bonusFireZone &&
                item.hp > 0
            ){
                item.fireDot = bonusFireStack;
                bonusFireDebuff(item);
            }
        })
    })
}

function bonusFireDebuff(item) {
    if(item.fireDot > 0) {

        item.fireDot = item.fireDot - 1;
        item.hp = item.hp - bonusFireDmgDot;

        if(item.hp <= 0) {
            item.fireDot = 0;
            enemyDeath(item);
        }
        else {
            setTimeout(function() {
                bonusFireDebuff(item);
                if(bonusFireDots.countDead() > 0) {
                    var bonusFireDot = bonusFireDots.getFirstDead();
                    bonusFireDot.reset(item.x+32, item.y+48);
                    bonusFireDot.anchor.setTo(0.5, 0.5);

                    bonusFireDotAnim = bonusFireDot.animations.add('bonusFireDotAnim');
                    bonusFireDotAnim.play(10, false);
                    bonusFireDotAnim.onComplete.add(animationStopped, this);
                }
            }, bonusFireDelay)
        }
    }
}


////////////////////////////////////////////
///////////////// BONUS WIND ///////////////
////////////////////////////////////////////

function bonusWindProjectilesDmg(a, b) {
    b.hp = b.hp - playerDmg * bonusWindDmg;

    if(b.ms > -150)b.ms = b.ms - bonusWindSlow;

    setTimeout(function() {
        if(b.enType == 1) b.ms = enType1Ms;
        if(b.enType == 2) b.ms = enType2Ms;
        if(b.enType == 3) b.ms = enType3Ms;
        if(b.enType == 4) b.ms = enType4Ms;
    }, 500);

    if(b.hp <= 0) enemyDeath(b);
    return false;
}


////////////////////////////////////////////
///////////////// BONUS ICE ////////////////
////////////////////////////////////////////

function bonusIceApply(target) {
    if( game.rnd.integerInRange(1, 100) <= bonusIceRate) {
       if(bonusIceImpacts.countDead() > 0) {
            var bonusIceImpact = bonusIceImpacts.getFirstDead();
            bonusIceImpact.reset(target.x+32, target.y+48);
            bonusIceImpact.anchor.setTo(0.5, 0.5);

            bonusIceImpactAnim = bonusIceImpact.animations.add('bonusIceImpactAnim');
            bonusIceImpactAnim.play(20, false);
            bonusIceImpactAnim.onComplete.add(animationStopped, this);
        }
    }
    enemies.forEach(function(enTypeItem){
        enTypeItem.forEach(function(item){
            if(
                item.x >= target.x-96 &&
                item.x <= target.x+96 &&
                item.y >= target.y-96 &&
                item.y <= target.y+96
            ) {
                item.hp = item.hp - playerDmg*bonusIceDmg;
                if (item.ms > 40+bonusIceSlow)item.ms = item.ms - bonusIceSlow;
                else item.ms = 40;
            }
        })
    })
}


////////////////////////////////////////////
///////////////// BONUS ROCK ///////////////
////////////////////////////////////////////

function bonusRockProjectilesDmg(a, b) {

    b.hp = b.hp-playerDmg * bonusRockDmg;

    if (b.ms > 70) b.ms = b.ms-bonusRockSlow;
    else b.ms = 70;

    if(b.hp <= 0) enemyDeath(b);
    else setTimeout(function() {
        if(b.enType == 1) b.ms = enType1Ms;
        if(b.enType == 2) b.ms = enType2Ms;
        if(b.enType == 3) b.ms = enType3Ms;
        if(b.enType == 4) b.ms = enType4Ms;
    }, 500)

    return false;
}


function bonusEauApply(source) {
    if(game.rnd.integerInRange(1, 100) <= bonusEauRate && bonusEauProjectiles.countDead() > 0 && bonusEauImpacts.countDead() > 0) {
        
        source.hp = source.hp - bonusEauDmg;
        if(source.hp <= 0) enemyDeath(source);

        bonusEauU = (source.x - player.x);
        bonusEauV = (source.y - player.y);
        bonusEauProjectileRange = Math.sqrt(bonusEauU*bonusEauU + bonusEauV*bonusEauV);
        if( bonusEauProjectileRange > 250 ) {
            var bonusEauProjectile = bonusEauProjectiles.getFirstDead();
            bonusEauProjectile.width = bonusEauProjectileRange;
            bonusEauProjectile.reset(player.x+32, player.y+48);
            bonusEauProjectileAnim = bonusEauProjectile.animations.add('bonusEauProjectileAnim');
            bonusEauProjectileAnim.play(20, false);
            bonusEauProjectileAnim.onComplete.add(bonusEauEffect, this);
            bonusEauProjectile.rotation = game.physics.arcade.angleBetween(bonusEauProjectile, source);
            bonusEauProjectile.anchor.setTo(0, 0.5);
        }
        else {
            bonusEauEffect();
        }
    }
}

function bonusEauEffect(sprite, animation) {
    if (typeof sprite != 'undefined') sprite.kill();

    var bonusEauImpact = bonusEauImpacts.getFirstDead();
    bonusEauImpact.reset(player.x, player.y);
    bonusEauImpact.anchor.setTo(0.5, 0.5);
    bonusEauImpactAnim = bonusEauImpact.animations.add('bonusEauImpactAnim');
    bonusEauImpactAnim.play(20, false);
    bonusEauImpactAnim.onComplete.add(animationStopped, this);

    playerHp = playerHp + bonusEauHp;
    if (playerHp > playerHpMax) {playerHp = playerHpMax}

    if(!spell3Mode) playerMana = playerMana + bonusEauMana;
    if(playerMana > playerManaMax) {playerMana = playerManaMax}
}


////////////////////////////////////////////
/////////////////// SPELLS /////////////////
////////////////////////////////////////////

function changeSpell(key) {
    if (key == spell1Key && playerLv >= spell2Level) currentSpell = 2;
    if (key == spell2Key && playerLv >= spell1Level) currentSpell = 1;
    if (key == spell3Key && playerLv >= spell4Level) currentSpell = 4;
    if (key == spell4Key && playerLv >= spell3Level) currentSpell = 3;
}

////////////////////////////////////////////
/////////////////// SPELL1 /////////////////
////////////////////////////////////////////

function spell1Launch() {
    if (game.time.now > nextSpell1 && spell1Impacts.countDead() > 0 && playerHp != "DEAD")
    {
        playerMana = playerMana - spell1Mana;

        spell1Stack = false;

        nextSpell1 = game.time.now + spell1Cd;

        var spell1Impact = spell1Impacts.getFirstDead();

        spell1Impact.reset(game.input.activePointer.worldX-80, game.input.activePointer.worldY-120);

        spell1Impact.body.immovable = true;

        spell1Impact.body.setSize(48, 32, 8, 64);

        spell1Impact.alpha = 0;

        var spell1Projectile = spell1Projectiles.getFirstDead();

        spell1Projectile.reset(player.x, player.y);

        spell1ProjectileAnim = spell1Projectile.animations.add('spell1ProjectileAnim');

        spell1ProjectileAnim.play(15, true);

        spell1Projectile.anchor.setTo(0.5, 0.5)

        spell1Projectile.rotation = game.physics.arcade.angleToPointer(spell1Projectile);
        game.physics.arcade.moveToPointer(spell1Projectile, 1800);

        spell1Timer = game.time.create(false);
        spell1Timer.loop(spell1DropTime, spell1DropKill, this);
        spell1Timer.start();

    }
}

function spell1Destroy(a, b) {
    a.kill();
    b.alpha = 1;
    spell1ImpactAnimation = b.animations.add('spell1ImpactAnim');
    spell1ImpactAnimation.play(17, false);
    spell1ImpactAnimation.onComplete.add(animationStopped, this);

    var spell1Drop = spell1Drops.getFirstDead();

    spell1Drop.reset(b.x, b.y);

    spell1ImpactDmg();
}


function spell1ImpactDmg() {
    enemies.forEach(function (enTypeItem) {
        enTypeItem.forEach(function(item) {
            if(
                item.x >= game.input.activePointer.worldX-80 &&
                item.y >= game.input.activePointer.worldY-120 &&
                item.x <= game.input.activePointer.worldX+80 &&
                item.y <= game.input.activePointer.worldY+40
            ) {
                item.hp = item.hp-spell1Damage;
                if(item.hp <= 0) enemyDeath(item)
            }
        })
    })
}

function spell1ProjectileDmg(a, b) {
    b.hp = b.hp - spell1Damage;
    if(b.hp <= 0) enemyDeath(b)
    return false;
}

function spell1Loot(a, b) {
    nextSpell1 = 0;
    b.kill();
    spell1Stack = true;
    spell1Timer.destroy();
    playerMana = playerMana + (spell1Mana/2);
}

function spell1DropKill() {
    spell1Drops.forEach(function(item) {
        item.kill();
    });
    spell1Stack = true;
    spell1Timer.destroy();
}


////////////////////////////////////////////
/////////////////// SPELL2 /////////////////
////////////////////////////////////////////

function spell2Launch() {
    if (game.time.now > nextSpell2 && spell2Impacts.countDead() > 0 && playerHp != "DEAD")
    {
        playerMana = playerMana - spell2Mana;

        nextSpell2 = game.time.now + spell2Cd;

        spell2Impact = spell2Impacts.getFirstDead();
        spell2Impact.reset(player.x, player.y);

        spell2Impact.anchor.setTo(0.5, 0.5)

        spell2ImpactAnim = spell2Impact.animations.add('spell2ImpactAnim');
        spell2ImpactAnim.play(10, false);
        spell2ImpactAnim.onComplete.add(animationStopped, this);

        spell2Dmg();
    }
}

function spell2Dmg() {
    enemies.forEach(function (enTypeItem) {
        enTypeItem.forEach(function(item) {
            if(
                item.x >= player.x-256 &&
                item.y >= player.y-256 &&
                item.x <= player.x+256 &&
                item.y <= player.y+256
            ) {
                item.hp = item.hp-spell2Damage;
                
                item.ms = -item.ms * spell2KBack;

                setTimeout(function() {
                    if(item.ms >= 40) item.ms = (-item.ms/spell2KBack)*spell2Slow;
                    else item.ms = 40;
                    if(item.hp <= 0) enemyDeath(item);
                }, 30);

                
            }
        })
    })
}


////////////////////////////////////////////
/////////////////// SPELL3 /////////////////
////////////////////////////////////////////

function spell3Launch() {
    if (game.time.now > nextSpell3 && playerHp != "DEAD")
    {
        nextSpell3 = game.time.now + spell3Cd;

        playerMana = playerMana - spell3Mana;

        spell3Mode = true;

        enemies.forEach(function(enTypeItem){
            enTypeItem.forEach(function(item) {
                item.ms = 0;
            })
        })

        player.loadTexture('spell3player', 0);

        spell3Anim = player.animations.add('change', [486,487,488,489,490,491,492,493,494]);

        spell3Anim.play(10, false);

        spell3Anim.onComplete.add(spell3Change, this);
    }
}

function spell3Change() {
    //  No attack
    player.animations.add('walkBot',                        [0, 1, 2, 3 ,4 ,5 ], 15, true);
    player.animations.add('walkTop',                        [6, 7, 8, 9, 10,11], 15, true);
    player.animations.add('walkBotLeft',                    [12,13,14,15,16,17], 15, true);
    player.animations.add('walkBotRight',                   [18,19,20,21,22,23], 15, true);
    player.animations.add('walkTopLeft',                    [24,25,26,27,28,29], 15, true);
    player.animations.add('walkTopRight',                   [30,31,32,33,34,35], 15, true);
    player.animations.add('walkRight',                      [36,37,38,39,40,41], 15, true);
    player.animations.add('walkLeft',                       [42,43,44,45,46,47], 15, true);
    player.animations.add('idle',                           [48,49,50,51,52,53], 7, true);

    //  Attack face
    player.animations.add('attackFaceWalkBot',              [54,55,56,57,58,59], 15, true);
    player.animations.add('attackFaceWalkTop',              [60,61,62,63,64,65], 15, true);
    player.animations.add('attackFaceWalkBotLeft',          [66,67,68,69,70,71], 15, true);
    player.animations.add('attackFaceWalkBotRight',         [72,73,74,75,76,77], 15, true);
    player.animations.add('attackFaceWalkTopLeft',          [78,79,80,81,82,83], 15, true);
    player.animations.add('attackFaceWalktopRight',         [84,85,86,87,88,89], 15, true);
    player.animations.add('attackFaceWalkRight',            [90,91,92,93,94,95], 15, true);
    player.animations.add('attackFaceWalkLeft',             [96,97,98,99,100,101], 15, true);
    player.animations.add('attackFaceStand',                [102,103,104,105,106,107], 15, true);

    //  Attack dos
    player.animations.add('attackDosWalkBot',               [108,109,110,111,112,113], 15, true);
    player.animations.add('attackDosWalkTop',               [114,115,116,117,118,119], 15, true);
    player.animations.add('attackDosWalkBotLeft',           [120,121,122,123,124,125], 15, true);
    player.animations.add('attackDosWalkBotRight',          [126,127,128,129,130,131], 15, true);
    player.animations.add('attackDosWalkTopLeft',           [132,133,134,135,136,137], 15, true);
    player.animations.add('attackDosWalktopRight',          [138,139,140,141,142,143], 15, true);
    player.animations.add('attackDosWalkRight',             [144,145,146,147,148,149], 15, true);
    player.animations.add('attackDosWalkLeft',              [150,151,152,153,154,155], 15, true);
    player.animations.add('attackDosStand',                 [156,157,158,159,160,161], 15, true);

    //  Attack 3/4 face
    player.animations.add('attack34Face2WalkBot',           [162,163,164,165,166,167], 15, true);
    player.animations.add('attack34Face2WalkTop',           [168,169,170,171,172,173], 15, true);
    player.animations.add('attack34Face2WalkBotLeft',       [174,175,176,177,178,179], 15, true);
    player.animations.add('attack34Face2WalkBotRight',      [180,181,182,183,184,185], 15, true);
    player.animations.add('attack34Face2WalkTopLeft',       [186,187,188,189,190,191], 15, true);
    player.animations.add('attack34Face2WalktopRight',      [192,193,194,195,196,197], 15, true);
    player.animations.add('attack34Face2WalkRight',         [198,199,200,201,202,203], 15, true);
    player.animations.add('attack34Face2WalkLeft',          [204,205,206,207,208,209], 15, true);
    player.animations.add('attack34Face2Stand',             [210,211,212,213,214,215], 15, true);

    //  Attack 3/4 face2
    player.animations.add('attack34FaceWalkBot',            [216,217,218,219,220,221], 15, true);
    player.animations.add('attack34FaceWalkTop',            [222,223,224,225,226,227], 15, true);
    player.animations.add('attack34FaceWalkBotLeft',        [228,229,230,231,232,233], 15, true);
    player.animations.add('attack34FaceWalkBotRight',       [234,235,236,237,238,239], 15, true);
    player.animations.add('attack34FaceWalkTopLeft',        [240,241,242,243,244,245], 15, true);
    player.animations.add('attack34FaceWalktopRight',       [246,247,248,249,250,251], 15, true);
    player.animations.add('attack34FaceWalkRight',          [252,253,254,255,256,257], 15, true);
    player.animations.add('attack34FaceWalkLeft',           [258,259,260,261,262,263], 15, true);
    player.animations.add('attack34FaceStand',              [264,265,266,267,268,269], 15, true);

    //  Attack 3/4 dos
    player.animations.add('attack34Dos2WalkBot',            [270,271,272,273,274,275], 15, true);
    player.animations.add('attack34Dos2WalkTop',            [276,277,278,279,280,281], 15, true);
    player.animations.add('attack34Dos2WalkBotLeft',        [282,283,284,285,286,287], 15, true);
    player.animations.add('attack34Dos2WalkBotRight',       [288,289,290,291,292,293], 15, true);
    player.animations.add('attack34Dos2WalkTopLeft',        [294,295,296,297,298,299], 15, true);
    player.animations.add('attack34Dos2WalkTopRight',       [300,301,302,303,304,305], 15, true);
    player.animations.add('attack34Dos2WalkRight',          [306,307,308,309,310,311], 15, true);
    player.animations.add('attack34Dos2WalkLeft',           [312,313,314,315,316,317], 15, true);
    player.animations.add('attack34Dos2Stand',              [318,319,320,321,322,323], 15, true);

    //  Attack 3/4 dos2
    player.animations.add('attack34DosWalkBot',             [324,325,326,327,328,329], 15, true);
    player.animations.add('attack34DosWalkTop',             [330,331,332,333,334,335], 15, true);
    player.animations.add('attack34DosWalkBotLeft',         [336,337,338,339,340,341], 15, true);
    player.animations.add('attack34DosWalkBotRight',        [342,343,344,345,346,347], 15, true);
    player.animations.add('attack34DosWalkTopLeft',         [348,349,350,351,352,353], 15, true);
    player.animations.add('attack34DosWalkTopRight',        [354,355,356,357,358,359], 15, true);
    player.animations.add('attack34DosWalkRight',           [360,361,362,363,364,365], 15, true);
    player.animations.add('attack34DosWalkLeft',            [366,367,368,369,370,371], 15, true);
    player.animations.add('attack34DosStand',               [372,373,374,375,376,377], 15, true);

    //  Attack profil
    player.animations.add('attackProfilWalkBot',            [378,379,380,381,382,383], 15, true);
    player.animations.add('attackProfilWalkTop',            [384,385,386,387,388,389], 15, true);
    player.animations.add('attackProfilWalkBotLeft',        [390,391,392,393,394,395], 15, true);
    player.animations.add('attackProfilWalkBotRight',       [396,397,398,399,400,401], 15, true);
    player.animations.add('attackProfilWalkTopLeft',        [402,403,404,405,406,407], 15, true);
    player.animations.add('attackProfilWalkTopRight',       [408,409,410,411,412,413], 15, true);
    player.animations.add('attackProfilWalkRight',          [414,415,416,417,418,419], 15, true);
    player.animations.add('attackProfilWalkLeft',           [420,421,422,423,424,425], 15, true);
    player.animations.add('attackProfilStand',              [426,427,428,429,430,431], 15, true);

    //  Attack profil2
    player.animations.add('attackProfil2WalkBot',           [432,433,434,435,436,437], 15, true);
    player.animations.add('attackProfil2WalkTop',           [438,439,440,441,442,443], 15, true);
    player.animations.add('attackProfil2WalkBotLeft',       [444,445,446,447,448,449], 15, true);
    player.animations.add('attackProfil2WalkBotRight',      [450,451,452,453,454,455], 15, true);
    player.animations.add('attackProfil2WalkTopLeft',       [456,457,458,459,460,461], 15, true);
    player.animations.add('attackProfil2WalkTopRight',      [462,463,464,465,466,467], 15, true);
    player.animations.add('attackProfil2WalkRight',         [468,469,470,471,472,473], 15, true);
    player.animations.add('attackProfil2WalkLeft',          [474,475,476,477,478,479], 15, true);
    player.animations.add('attackProfil2Stand',             [480,481,482,483,484,485], 15, true);

    playerProjectiles.forEach(function(item) {
        item.loadTexture('spell3Projectile', 0);
    })

    enType1.forEach(function(item) { item.ms     = enType1Ms; });
    enType2.forEach(function(item) { item.ms     = enType2Ms; });
    enType3.forEach(function(item) { item.ms     = enType3Ms; });
    enType4.forEach(function(item) { item.ms     = enType4Ms; });

    fireRate = fireRate - spell3BonusAs;
    playerDmg = playerDmg + spell3BonusDmg;

    game.time.events.add(spell3Time, spell3Over, this);
}

function spell3Over() {
    spell3Mode = false;

    fireRate = fireRate + spell3BonusAs;
    playerDmg = playerDmg - spell3BonusDmg;

    if (spell3Overs.countDead() > 0) {
        var spell3Over = spell3Overs.getFirstDead();
        spell3Over.reset(player.x, player.y)

        spell3Over.anchor.setTo(0.5, 0.5)

        spell3OverAnim = spell3Over.animations.add('spell3OverAnim');
        spell3OverAnim.play(10, false);
        spell3OverAnim.onComplete.add(animationStopped, this);
    }

    player.loadTexture('player', 0);
    //  No attack
    player.animations.add('walkBot',                        [0, 1, 2, 3 ,4 ,5 ], 15, true);
    player.animations.add('walkTop',                        [6, 7, 8, 9, 10,11], 15, true);
    player.animations.add('walkBotLeft',                    [12,13,14,15,16,17], 15, true);
    player.animations.add('walkBotRight',                   [18,19,20,21,22,23], 15, true);
    player.animations.add('walkTopLeft',                    [24,25,26,27,28,29], 15, true);
    player.animations.add('walkTopRight',                   [30,31,32,33,34,35], 15, true);
    player.animations.add('walkRight',                      [36,37,38,39,40,41], 15, true);
    player.animations.add('walkLeft',                       [42,43,44,45,46,47], 15, true);
    player.animations.add('idle',                           [48,49,50,51,52,53], 7, true);

    //  Attack face
    player.animations.add('attackFaceWalkBot',              [54,55,56,57,58,59], 15, true);
    player.animations.add('attackFaceWalkTop',              [60,61,62,63,64,65], 15, true);
    player.animations.add('attackFaceWalkBotLeft',          [66,67,68,69,70,71], 15, true);
    player.animations.add('attackFaceWalkBotRight',         [72,73,74,75,76,77], 15, true);
    player.animations.add('attackFaceWalkTopLeft',          [78,79,80,81,82,83], 15, true);
    player.animations.add('attackFaceWalktopRight',         [84,85,86,87,88,89], 15, true);
    player.animations.add('attackFaceWalkRight',            [90,91,92,93,94,95], 15, true);
    player.animations.add('attackFaceWalkLeft',             [96,97,98,99,100,101], 15, true);
    player.animations.add('attackFaceStand',                [102,103,104,105,106,107], 15, true);

    //  Attack dos
    player.animations.add('attackDosWalkBot',               [108,109,110,111,112,113], 15, true);
    player.animations.add('attackDosWalkTop',               [114,115,116,117,118,119], 15, true);
    player.animations.add('attackDosWalkBotLeft',           [120,121,122,123,124,125], 15, true);
    player.animations.add('attackDosWalkBotRight',          [126,127,128,129,130,131], 15, true);
    player.animations.add('attackDosWalkTopLeft',           [132,133,134,135,136,137], 15, true);
    player.animations.add('attackDosWalktopRight',          [138,139,140,141,142,143], 15, true);
    player.animations.add('attackDosWalkRight',             [144,145,146,147,148,149], 15, true);
    player.animations.add('attackDosWalkLeft',              [150,151,152,153,154,155], 15, true);
    player.animations.add('attackDosStand',                 [156,157,158,159,160,161], 15, true);

    //  Attack 3/4 face
    player.animations.add('attack34Face2WalkBot',           [162,163,164,165,166,167], 15, true);
    player.animations.add('attack34Face2WalkTop',           [168,169,170,171,172,173], 15, true);
    player.animations.add('attack34Face2WalkBotLeft',       [174,175,176,177,178,179], 15, true);
    player.animations.add('attack34Face2WalkBotRight',      [180,181,182,183,184,185], 15, true);
    player.animations.add('attack34Face2WalkTopLeft',       [186,187,188,189,190,191], 15, true);
    player.animations.add('attack34Face2WalktopRight',      [192,193,194,195,196,197], 15, true);
    player.animations.add('attack34Face2WalkRight',         [198,199,200,201,202,203], 15, true);
    player.animations.add('attack34Face2WalkLeft',          [204,205,206,207,208,209], 15, true);
    player.animations.add('attack34Face2Stand',             [210,211,212,213,214,215], 15, true);

    //  Attack 3/4 face2
    player.animations.add('attack34FaceWalkBot',            [216,217,218,219,220,221], 15, true);
    player.animations.add('attack34FaceWalkTop',            [222,223,224,225,226,227], 15, true);
    player.animations.add('attack34FaceWalkBotLeft',        [228,229,230,231,232,233], 15, true);
    player.animations.add('attack34FaceWalkBotRight',       [234,235,236,237,238,239], 15, true);
    player.animations.add('attack34FaceWalkTopLeft',        [240,241,242,243,244,245], 15, true);
    player.animations.add('attack34FaceWalktopRight',       [246,247,248,249,250,251], 15, true);
    player.animations.add('attack34FaceWalkRight',          [252,253,254,255,256,257], 15, true);
    player.animations.add('attack34FaceWalkLeft',           [258,259,260,261,262,263], 15, true);
    player.animations.add('attack34FaceStand',              [264,265,266,267,268,269], 15, true);

    //  Attack 3/4 dos
    player.animations.add('attack34Dos2WalkBot',            [270,271,272,273,274,275], 15, true);
    player.animations.add('attack34Dos2WalkTop',            [276,277,278,279,280,281], 15, true);
    player.animations.add('attack34Dos2WalkBotLeft',        [282,283,284,285,286,287], 15, true);
    player.animations.add('attack34Dos2WalkBotRight',       [288,289,290,291,292,293], 15, true);
    player.animations.add('attack34Dos2WalkTopLeft',        [294,295,296,297,298,299], 15, true);
    player.animations.add('attack34Dos2WalkTopRight',       [300,301,302,303,304,305], 15, true);
    player.animations.add('attack34Dos2WalkRight',          [306,307,308,309,310,311], 15, true);
    player.animations.add('attack34Dos2WalkLeft',           [312,313,314,315,316,317], 15, true);
    player.animations.add('attack34Dos2Stand',              [318,319,320,321,322,323], 15, true);

    //  Attack 3/4 dos2
    player.animations.add('attack34DosWalkBot',             [324,325,326,327,328,329], 15, true);
    player.animations.add('attack34DosWalkTop',             [330,331,332,333,334,335], 15, true);
    player.animations.add('attack34DosWalkBotLeft',         [336,337,338,339,340,341], 15, true);
    player.animations.add('attack34DosWalkBotRight',        [342,343,344,345,346,347], 15, true);
    player.animations.add('attack34DosWalkTopLeft',         [348,349,350,351,352,353], 15, true);
    player.animations.add('attack34DosWalkTopRight',        [354,355,356,357,358,359], 15, true);
    player.animations.add('attack34DosWalkRight',           [360,361,362,363,364,365], 15, true);
    player.animations.add('attack34DosWalkLeft',            [366,367,368,369,370,371], 15, true);
    player.animations.add('attack34DosStand',               [372,373,374,375,376,377], 15, true);

    //  Attack profil
    player.animations.add('attackProfilWalkBot',            [378,379,380,381,382,383], 15, true);
    player.animations.add('attackProfilWalkTop',            [384,385,386,387,388,389], 15, true);
    player.animations.add('attackProfilWalkBotLeft',        [390,391,392,393,394,395], 15, true);
    player.animations.add('attackProfilWalkBotRight',       [396,397,398,399,400,401], 15, true);
    player.animations.add('attackProfilWalkTopLeft',        [402,403,404,405,406,407], 15, true);
    player.animations.add('attackProfilWalkTopRight',       [408,409,410,411,412,413], 15, true);
    player.animations.add('attackProfilWalkRight',          [414,415,416,417,418,419], 15, true);
    player.animations.add('attackProfilWalkLeft',           [420,421,422,423,424,425], 15, true);
    player.animations.add('attackProfilStand',              [426,427,428,429,430,431], 15, true);

    //  Attack profil2
    player.animations.add('attackProfil2WalkBot',           [432,433,434,435,436,437], 15, true);
    player.animations.add('attackProfil2WalkTop',           [438,439,440,441,442,443], 15, true);
    player.animations.add('attackProfil2WalkBotLeft',       [444,445,446,447,448,449], 15, true);
    player.animations.add('attackProfil2WalkBotRight',      [450,451,452,453,454,455], 15, true);
    player.animations.add('attackProfil2WalkTopLeft',       [456,457,458,459,460,461], 15, true);
    player.animations.add('attackProfil2WalkTopRight',      [462,463,464,465,466,467], 15, true);
    player.animations.add('attackProfil2WalkRight',         [468,469,470,471,472,473], 15, true);
    player.animations.add('attackProfil2WalkLeft',          [474,475,476,477,478,479], 15, true);
    player.animations.add('attackProfil2Stand',             [480,481,482,483,484,485], 15, true);

}


////////////////////////////////////////////
/////////////////// SPELL4 /////////////////
////////////////////////////////////////////

function spell4Launch() {
     if (game.time.now > nextSpell4 && spell4Effects.countDead() > 0 && playerHp != "DEAD") {

        playerMana = playerMana - spell4Mana;

        nextSpell4 = game.time.now + spell4Cd;

        spell4Mode = true

        var spell4Effect = spell4Effects.getFirstDead();
        spell4Effect.reset(player.x, player.y);
        spell4Effect.anchor.setTo(0.5, 0.5);

        var spell4EffectAnim = spell4Effect.animations.add('spell4EffectAnim');
        spell4EffectAnim.play(15, true);

        setTimeout(function() {
            spell4Effect.kill();
            spell4Mode = false;
        }, spell4Duration);

        spell4Apply();
        spell4Dmg();
     }
}

function spell4Apply() {
    spell4Effects.forEach(function(item) {
        item.x = player.x;
        item.y = player.y;
    });

    if(spell4Mode) setTimeout(function() {spell4Apply()}, 10);
}

function spell4Dmg() {
    enemies.forEach(function(enTypeItem) {
        enTypeItem.forEach(function(item) {
            if(
                item.x >= player.x - 128 &&
                item.x <= player.x + 128 &&
                item.y >= player.y - 128 &&
                item.y <= player.y + 128 &&
                item.hp > 0
            ) {
                item.hp = item.hp - spell4Damage;
                if (item.hp <= 0) enemyDeath(item);
                item.ms = -item.ms * 3;
                setTimeout(function() {
                    item.ms = -item.ms/3;
                }, 80);
            }
        })
    })

    if(spell4Mode) setTimeout(function() {spell4Dmg()}, 100);
}

////////////////////////////////////////////
/////////////// WAVE/POP ENEMY /////////////
////////////////////////////////////////////

function enemyTest2() {
    if(enemyTester == false) {
        var enemyTest1 = enType4.getFirstDead();
        enemyTest1.reset(1950, 300);
        var enemyTest2 = enType4.getFirstDead();
        enemyTest2.reset(2075, 425);
        var enemyTest3 = enType1.getFirstDead();
        enemyTest3.reset(2150, 550); 

        enemyTester = true;
    }
}

function enemyTest() {
    if(enemyTester == false) {
        for(i = 0; i < 50; i++) {
            var enemy = enType2.getFirstDead();
            enemy.reset(game.rnd.integerInRange(1851, 2183), game.rnd.integerInRange(297, 680))
        }
        enemyTester = true;
    }
}


function popEnemy() {
    if  (   interWave == false &&
            game.time.now > nextEnemyPop &&
            enType1.countDead() > 0 &&
            enType2.countDead() > 0 &&
            enType3.countDead() > 0 &&
            enType4.countDead() > 0
        ) {
        nextEnemyPop = game.time.now + enemyLoad;
        randomPop = game.rnd.integerInRange(1, 100);

        if(playerLv == 1) {
            var enemy = enType1.getFirstDead();
        }
        else if (playerLv == 2) {
            if(randomPop >= 5) var enemy = enType1.getFirstDead();
            else if (randomPop < 5) var enemy = enType2.getFirstDead();
        }
        else if (playerLv == 3) {
            if(randomPop >= 10) var enemy = enType1.getFirstDead();
            else if (randomPop < 10) var enemy = enType2.getFirstDead();
        }
        else if (playerLv == 4) {
            if(randomPop >= 35) var enemy = enType1.getFirstDead();
            else if (randomPop < 35) var enemy = enType2.getFirstDead();
        }
        else if (playerLv == 5) {
            if(randomPop >= 60) var enemy = enType1.getFirstDead();
            else if (randomPop < 60) var enemy = enType2.getFirstDead();
        }
        else if (playerLv == 6) {
            var enemy = enType2.getFirstDead();
        }
        else if (playerLv == 7) {
            if(randomPop >= 5) var enemy = enType2.getFirstDead();
            else if (randomPop < 5) var enemy = enType3.getFirstDead();
        }
        else if (playerLv == 8) {
            if(randomPop >= 10) var enemy = enType2.getFirstDead();
            else if (randomPop < 10) var enemy = enType3.getFirstDead();
        }
        else if (playerLv == 9) {
            if(randomPop >= 35) var enemy = enType2.getFirstDead();
            else if (randomPop < 35) var enemy = enType3.getFirstDead();
        }
        else if (playerLv == 10) {
            if(randomPop >= 60) var enemy = enType2.getFirstDead();
            else if (randomPop < 60) var enemy = enType3.getFirstDead();
        }
        else if (playerLv == 11) {
            var enemy = enType3.getFirstDead();
        }
        else if (playerLv == 12) {
            if(randomPop >= 5) var enemy = enType3.getFirstDead();
            else if (randomPop < 5) var enemy = enType4.getFirstDead();
        }
        else if (playerLv == 13) {
            if(randomPop >= 10) var enemy = enType3.getFirstDead();
            else if (randomPop < 10) var enemy = enType4.getFirstDead();
        }
        else if (playerLv == 14) {
            if(randomPop >= 35) var enemy = enType3.getFirstDead();
            else if (randomPop < 35) var enemy = enType4.getFirstDead();
        }
        else if (playerLv == 15) {
            if(randomPop >= 60) var enemy = enType3.getFirstDead();
            else if (randomPop < 60) var enemy = enType4.getFirstDead();
        }
        else if (playerLv == 16) {
            var enemy = enType4.getFirstDead();
        }

        enemyX = layerCollision.getTileX(enemy.x) * 32;
        enemyY = layerCollision.getTileY(enemy.y) * 32;
        enemyCurrentTile = map.getTile(layerCollision.getTileX(enemyX), layerCollision.getTileY(enemyY));
        if (enemyCurrentTile.index != 1 || enemy.y < 128 || enemy.y > game.world.height-128 || enemy.x < 128 || enemy.x > game.world.width-128) {
            enemy.kill();
            nextEnemyPop = 0;
        }
        else {
            enemy.reset(game.world.randomX, game.world.randomY);

            if (enemy.enType == 1) {
                enemy.hp = enType1Hp;
                enemy.ms = enType1Ms;
            }
            if (enemy.enType == 2) {
                enemy.hp = enType2Hp;
                enemy.ms = enType2Ms;
            }
            if (enemy.enType == 3) {
                enemy.hp = enType3Hp;
                enemy.ms = enType3Ms;
            }
            if (enemy.enType == 4) {
                enemy.hp = enType4Hp;
                enemy.ms = enType4Ms;
            }
        }
    }
}

function wave() {
    interWave = false;
    waveNbIncr = true;
    game.time.events.add(waveTime, interWaver, this);
}

function interWaver() {
    interWave = true;
    if(
            enType1.countLiving() == 0
        &&  enType2.countLiving() == 0
        &&  enType3.countLiving() == 0
        &&  enType4.countLiving() == 0
        ) {
        enemyLoad = enemyLoadBase - playerLv*5 - waveNb*5;
        waveTime = waveTimeBase + playerLv*1500 + waveNb*1000

        game.time.events.add(waveCd, wave, this);
    }
}

function checkWave() {
    if(interWave == true) {
        if(
                enType1.countLiving() == 0
            &&  enType2.countLiving() == 0
            &&  enType3.countLiving() == 0
            &&  enType4.countLiving() == 0
            ) {
            interWaver()
            if (waveNbIncr == true) {
                waveNb = waveNb + 1;
                waveNbIncr = false;
            }
        }
    }
}

////////////////////////////////////////////
/////////////////// HEALS //////////////////
////////////////////////////////////////////

function healSpawner() {
    if (game.time.now > nextHealPop && heals.countDead() > 0) {
        nextHealPop = game.time.now + healLoad;

        var heal = heals.getFirstDead();

        heal.reset(game.world.randomX, game.world.randomY);

        var healX = layerCollision.getTileX(heal.x) * 32;
        var healY = layerCollision.getTileY(heal.y) * 32;
        var healCurrentTile = map.getTile(layerCollision.getTileX(healX), layerCollision.getTileY(healY));
        if (healCurrentTile.index != 1) {
            heal.kill();
            nextHealPop = 0;
        }
        else {
            setTimeout(function() {
                heal.kill();
            }, healTime);
        }
    }
}

function healer(a, b) {
    b.kill();

    playerHp = playerHp + healHp;
    if(!spell3Mode) playerMana = playerMana + healMana;

    if(playerHp > playerHpMax) playerHp = playerHpMax
    if(playerMana > playerManaMax) playerMana = playerManaMax
}