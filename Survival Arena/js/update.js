function update() {

    ////////////////////////////////////////////
    ///////////////// COLLISIONS ///////////////
    ////////////////////////////////////////////

    game.physics.arcade.collide(player, layerCollision);
    game.physics.arcade.collide(playerProjectiles, layerCollision, projectileKill, null, this);
    if(playerHp < playerHpMax || playerMana < playerManaMax) game.physics.arcade.collide(player, heals, healer, null, this);
    game.physics.arcade.collide(player, spell1Drops, spell1Loot, null, this);

    game.physics.arcade.collide(player, bonusFoudreOrbs, bonusFoudreLoot, null, this);
    game.physics.arcade.collide(player, bonusFireOrbs, bonusFireLoot, null, this);
    game.physics.arcade.collide(player, bonusWindOrbs, bonusWindLoot, null, this);
    game.physics.arcade.collide(player, bonusIceOrbs, bonusIceLoot, null, this);
    game.physics.arcade.collide(player, bonusRockOrbs, bonusRockLoot, null, this);
    game.physics.arcade.collide(player, bonusEauOrbs, bonusEauLoot, null, this);

    game.physics.arcade.collide(spell1Projectiles, spell1Impacts, spell1Destroy, null, this);

    enemies.forEach(function(enTypeItem) {
        game.physics.arcade.collide(player, enTypeItem, enemiesDmg, processCallback, this);
        game.physics.arcade.collide(enTypeItem, layerCollision);
        game.physics.arcade.collide(playerProjectiles, enTypeItem, projectileDmg, null, this);
        game.physics.arcade.collide(bonusWindProjectiles, enTypeItem, null, bonusWindProjectilesDmg, this);
        game.physics.arcade.collide(bonusRockProjectiles, enTypeItem, null, bonusRockProjectilesDmg, this);
        game.physics.arcade.collide(spell1Projectiles, enTypeItem, spell1ProjectileDmg, spell1ProjectileDmg, this);
        enTypeItem.forEach(function(item) {
            game.physics.arcade.collide(item, alert, this);
        });
    })

    //  Score
    if(multiScoreLoad > 0) multiScoreLoad = multiScoreLoad - 1;
    if(multiScoreLoad == 0) multiScoreReset();


    ////////////////////////////////////////////
    /////////////////// player /////////////////
    ////////////////////////////////////////////

    if(playerMana < playerManaMax && playerHp != "DEAD" && spell3Mode == false) playerMana = playerMana + playerManaRegen;

	//  Arret du player => Vitesse = 0
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    calcCursorAngle();

    //  Déplacement du joueur
    if (!splashScreen) {
        //  S'il tire
        if (!game.input.mouse.button) {
            if(spell3Anim.isPlaying == false) {
                if(x == 0 && y == 1) {
                    // attackDos
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attackDosWalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attackDosWalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attackDosWalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attackDosWalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackDosWalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackDosWalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackDosWalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackDosWalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attackDosStand');
                    }
                }
                if(x == 1 && y == 1) {
                    // attack34Dos
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attack34DosWalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attack34DosWalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attack34DosWalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attack34DosWalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34DosWalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34DosWalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34DosWalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34DosWalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attack34DosStand');
                    }
                }
                if(x == 1 && y == 0) {
                    // attackProfil
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attackProfilWalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attackProfilWalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attackProfilWalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attackProfilWalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackProfilWalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackProfilWalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackProfilWalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackProfilWalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attackProfilStand');
                    }
                }
                if(x == 1 && y == -1) {
                    // attack34Face
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attack34FaceWalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attack34FaceWalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attack34FaceWalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attack34FaceWalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34FaceWalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34FaceWalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34FaceWalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34FaceWalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attack34FaceStand');
                    }
                }
                if(x == 0 && y == -1) {
                    // attackFace
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attackFaceWalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attackFaceWalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attackFaceWalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attackFaceWalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackFaceWalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackFaceWalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackFaceWalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackFaceWalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attackFaceStand');
                    }
                }
                if(x == -1 && y == -1) {
                    // attack34Face2
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attack34Face2WalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attack34Face2WalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attack34Face2WalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attack34Face2WalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34Face2WalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34Face2WalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34Face2WalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34Face2WalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attack34Face2Stand');
                    }
                }
                if(x == -1 && y == 0) {
                    // attackProfil2
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attackProfil2WalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attackProfil2WalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attackProfil2WalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attackProfil2WalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackProfil2WalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackProfil2WalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attackProfil2WalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attackProfil2WalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attackProfil2Stand');
                    }
                }
                if(x == -1 && y == 1) {
                    // attack34Dos2
                    if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                    {
                        //  Left
                        player.body.velocity.x = -playerSpeed;
                        player.animations.play('attack34Dos2WalkLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                    {
                        //  Right
                        player.body.velocity.x = playerSpeed;
                        player.animations.play('attack34Dos2WalkRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Top
                        player.body.velocity.y = -playerSpeed;
                        player.animations.play('attack34Dos2WalkTop');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                    {
                        //  Bot
                        player.body.velocity.y = playerSpeed;
                        player.animations.play('attack34Dos2WalkBot');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Bot + Left
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34Dos2WalkBotLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Bot + Right
                        player.body.velocity.y = playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34Dos2WalkBotRight');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                    {
                        //  Top + Left
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = -playerSpeed2;
                        player.animations.play('attack34Dos2WalkTopLeft');
                    }
                    else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                    {
                        //  Top + Right
                        player.body.velocity.y = -playerSpeed2;
                        player.body.velocity.x = playerSpeed2;
                        player.animations.play('attack34Dos2WalkTopRight');
                    }
                    else 
                    {
                        player.animations.play('attack34Dos2Stand');
                    }
                }
            }
        }
        //  S'il ne tire pas
        else {
            if(spell3Anim.isPlaying == false) {
                if (game.input.keyboard.isDown(Phaser.Keyboard.Q) && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false && game.input.keyboard.isDown(Phaser.Keyboard.S)==false)
                {
                    //  Left
                    player.body.velocity.x = -playerSpeed;
                    player.animations.play('walkLeft');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.D) && game.input.keyboard.isDown(Phaser.Keyboard.S)==false && game.input.keyboard.isDown(Phaser.Keyboard.Z)==false)
                {
                    //  Right
                    player.body.velocity.x = playerSpeed;
                    player.animations.play('walkRight');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                {
                    //  Top
                    player.body.velocity.y = -playerSpeed;
                    player.animations.play('walkTop');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q)==false  && game.input.keyboard.isDown(Phaser.Keyboard.D)==false)
                {
                    //  Bot
                    player.body.velocity.y = playerSpeed;
                    player.animations.play('walkBot');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                {
                    //  Bot + Left
                    player.body.velocity.y = playerSpeed2;
                    player.body.velocity.x = -playerSpeed2;
                    player.animations.play('walkBotLeft');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.S) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                {
                    //  Bot + Right
                    player.body.velocity.y = playerSpeed2;
                    player.body.velocity.x = playerSpeed2;
                    player.animations.play('walkBotRight');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.Q))
                {
                    //  Top + Left
                    player.body.velocity.y = -playerSpeed2;
                    player.body.velocity.x = -playerSpeed2;
                    player.animations.play('walkTopLeft');
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && game.input.keyboard.isDown(Phaser.Keyboard.D))
                {
                    //  Top + Right
                    player.body.velocity.y = -playerSpeed2;
                    player.body.velocity.x = playerSpeed2;
                    player.animations.play('walkTopRight');
                }
                else 
                {
                    player.animations.play('idle');
                }
            }
        }
    }

    //  Attaque du player
    if (game.input.mouse.button==0 && spell3Anim.isPlaying == false && !splashScreen) fire();

    if (currentSpell == 1 && game.input.mouse.button==2 && playerMana >= spell1Mana && spell1Stack == true && playerLv >= spell1Level) {
       spell1Launch();
    }

    if (currentSpell == 2 && game.input.mouse.button==2 && playerMana >= spell2Mana && playerLv >= spell2Level) {
       spell2Launch();
    }

    if (currentSpell == 3 && game.input.mouse.button==2 && playerMana >= spell3Mana && playerLv >= spell3Level) {
       spell3Launch();
    }

    if (currentSpell == 4 && game.input.mouse.button==2 && playerMana >= spell4Mana && playerLv >= spell4Level) {
       spell4Launch();
    }
    

    ////////////////////////////////////////////
    ////////////////// ENEMIES /////////////////
    ////////////////////////////////////////////
    if (!splashScreen) popEnemy()
    if (!splashScreen) checkWave()
    //enemyTest()
    
    enemies.forEach(function(enTypeItem){
        enTypeItem.forEach(function(item){
            item.body.setSize(48, 32, 8, 64);
            item.body.velocity.x = 0;
            item.body.velocity.y = 0;
            if(item.x > player.x-32) {
                item.body.velocity.x = -item.ms;
            }
            if(item.x < player.x-32) {
                item.body.velocity.x = item.ms;
            }
            if(item.y > player.y-48) {
                item.body.velocity.y = -item.ms;
            }
            if(item.y < player.y-48) {
                item.body.velocity.y = item.ms;
            }

            if(item.x > player.x-32 && item.y > player.y-48) item.animations.play('topLeft');
            if(item.x < player.x-32 && item.y > player.y-48) item.animations.play('topRight');
            if(item.x > player.x-32 && item.y < player.y-48) item.animations.play('botLeft');
            if(item.x < player.x-32 && item.y < player.y-48) item.animations.play('botRight');
        });

        enTypeItem.sort('y', Phaser.Group.SORT_ASCENDING);
    })
    

    ////////////////////////////////////////////
    /////////////// COLLECTIBLES ///////////////
    ////////////////////////////////////////////

    if (!splashScreen) healSpawner();
    if (!splashScreen) bonusSpawner();


    ////////////////////////////////////////////
    //////////////////// HUD ///////////////////
    ////////////////////////////////////////////

    hudScore.setText(score);
    hudMultiScore.setText('x ' + multiScore);
    hudLevel.setText('Lv.' + playerLv);
    hudHp.setText(playerHp + ' / ' + playerHpMax);
    hudMana.setText(playerMana + ' / ' + playerManaMax);

    hudHealthBarFill.width = playerHp*167/playerHpMax;
    hudManaBarFill.width = playerMana*167/playerManaMax;

    if (bonusFire) hudBonus.loadTexture('bonusFireIcon', 0);
    else if (bonusFoudre) hudBonus.loadTexture('bonusFoudreIcon', 0);
    else if (bonusWind) hudBonus.loadTexture('bonusWindIcon', 0);
    else if (bonusEau) hudBonus.loadTexture('bonusEauIcon', 0);
    else if (bonusRock) hudBonus.loadTexture('bonusRockIcon', 0);
    else if (bonusIce) hudBonus.loadTexture('bonusIceIcon', 0);
    else hudBonus.loadTexture('bonusNormalIcon', 0);

    if (bonusDurationTimer != null) {
        if (bonusDurationTimer.duration > 1) {
            tempHeight = 40*(bonusDuration - bonusDurationTimer.duration)/bonusDuration;
            setTimeout(function() {hudBonusCd.height = tempHeight}, 10);
            hudBonusText.setText(Math.round(bonusDurationTimer.duration/1000));
        }
        else {
            hudBonusCd.height = 0;
            hudBonusText.setText('');
        }
    }
    else {
        hudBonusCd.height = 0;
        hudBonusText.setText('');
    }

    if(playerLv < spell2Level) {
        hudSpell2Icon.loadTexture('spell2NoLvlIcon', 0);
        hudSpell2Text.setText('');
        hudSpell2Cd.height = 0;
    }
    else {
        if (playerMana < spell2Mana) hudSpell2Icon.loadTexture('spell2NoManaIcon', 0, 0);
        else hudSpell2Icon.loadTexture('spell2Icon', 0, 0);

        if (game.time.now < nextSpell2) {
            hudSpell2Cd.height = 40*(nextSpell2-game.time.now)/spell2Cd;
            hudSpell2Text.setText(Math.round((nextSpell2-game.time.now)/1000));
        }
        else {
            hudSpell2Text.setText(spell2Mana);
            hudSpell2Cd.height = 0;
        }
    }

    if(playerLv < spell1Level) {
        hudSpell1Icon.loadTexture('spell1NoLvlIcon', 0);
        hudSpell1Text.setText('');
        hudSpell1Cd.height = 0;
    }
    else {
        if (playerMana < spell1Mana) hudSpell1Icon.loadTexture('spell1NoManaIcon', 0, 0);
        else hudSpell1Icon.loadTexture('spell1Icon', 0, 0);

        if (game.time.now < nextSpell1) {
            hudSpell1Cd.height = 40*(nextSpell1-game.time.now)/spell1Cd;
            hudSpell1Text.setText(Math.round((nextSpell1-game.time.now)/1000));
        }
        else {
            hudSpell1Text.setText(spell1Mana);
            hudSpell1Cd.height = 0;
        } 
    }
    
    if(playerLv < spell4Level) {
        hudSpell4Icon.loadTexture('spell4NoLvlIcon', 0);
        hudSpell4Text.setText('');
        hudSpell4Cd.height = 0;
    }
    else {
        if (playerMana < spell4Mana) hudSpell4Icon.loadTexture('spell4NoManaIcon', 0, 0);
        else hudSpell4Icon.loadTexture('spell4Icon', 0, 0);

        if (game.time.now < nextSpell4) {
            hudSpell4Cd.height = 40*(nextSpell4-game.time.now)/spell4Cd;
            hudSpell4Text.setText(Math.round((nextSpell4-game.time.now)/1000));
        }
        else {
            hudSpell4Text.setText(spell4Mana);
            hudSpell4Cd.height = 0;
        }
    }

    if(playerLv < spell3Level) {
        hudSpell3Icon.loadTexture('spell3NoLvlIcon', 0);
        hudSpell3Text.setText('');
        hudSpell3Cd.height = 0;
    }
    else {
        if (playerMana < spell3Mana) hudSpell3Icon.loadTexture('spell3NoManaIcon', 0, 0);
        else hudSpell3Icon.loadTexture('spell3Icon', 0, 0);

        if (game.time.now < nextSpell3) {
            hudSpell3Cd.height = 40*(nextSpell3-game.time.now)/spell3Cd;
            hudSpell3Text.setText(Math.round((nextSpell3-game.time.now)/1000));
        }
        else {
            hudSpell3Text.setText(spell3Mana);
            hudSpell3Cd.height = 0;
        }
    }

    if(currentSpell == 2) hudSpell2HotKey.setText('\u2207');
    else hudSpell2HotKey.setText('1');
    if(currentSpell == 1) hudSpell1HotKey.setText('\u2207');
    else hudSpell1HotKey.setText('2');
    if(currentSpell == 4) hudSpell4HotKey.setText('\u2207');
    else hudSpell4HotKey.setText('3');
    if(currentSpell == 3) hudSpell3HotKey.setText('\u2207');
    else hudSpell3HotKey.setText('4');
}