function create() {

	//Activation de la physique Arcade
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Création de la map
	game.world.setBounds();

	map = game.add.tilemap('tilemap');

	map.addTilesetImage('tileset', 'tileset');
	map.setCollision(2);

	layerCollision = map.createLayer('collision');
	layerCollision.resizeWorld();
	mapImage = game.add.sprite(0,0,'mapImage');


	////////////////////////////////////////////
	////////////////// CONTROLS ////////////////
	////////////////////////////////////////////

	cursors = game.input.keyboard.createCursorKeys();

	//	ZQSD
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.Z, Phaser.Keyboard.Q, Phaser.Keyboard.S, Phaser.Keyboard.D ]);

	//	ESPACE
	startButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	startButton.onDown.add(startButtonOnClick, this);

	//	Click droit
	game.canvas.oncontextmenu = function (e) { e.preventDefault(); };

	//	ESC
	pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    pauseKey.onDown.add(pause, this);

    //	1234
    spell1Key = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    spell1Key.onDown.add(changeSpell, this);

    spell2Key = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    spell2Key.onDown.add(changeSpell, this);

    spell3Key = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    spell3Key.onDown.add(changeSpell, this);

    spell4Key = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    spell4Key.onDown.add(changeSpell, this);

	////////////////////////////////////////////
	/////////////////// player /////////////////
	////////////////////////////////////////////

	//	Création du player
	player = game.add.sprite(32*32, 27*32, 'player');
	game.physics.arcade.enable(player);
	player.anchor.setTo(0.5, 0.5);
	player.body.setSize(30, 32, 0, 32);
    game.camera.follow(player);
    player.checkWorldBounds = true;
    player.body.collideWorldBounds = true;

    // Attaque du player
    playerProjectiles = game.add.group();
    playerProjectiles.enableBody = true;
    playerProjectiles.physicsBodyType = Phaser.Physics.ARCADE;
    playerProjectiles.createMultiple(50, 'playerProjectile', 0, false);
    playerProjectiles.setAll('checkWorldBounds', true);
    playerProjectiles.setAll('outOfBoundsKill', true);


    //	Animations du player
    //	No attack
	player.animations.add('walkBot', 						[0, 1, 2, 3 ,4 ,5 ], 15, true);
	player.animations.add('walkTop', 						[6, 7, 8, 9, 10,11], 15, true);
	player.animations.add('walkBotLeft', 					[12,13,14,15,16,17], 15, true);
	player.animations.add('walkBotRight', 					[18,19,20,21,22,23], 15, true);
	player.animations.add('walkTopLeft', 					[24,25,26,27,28,29], 15, true);
	player.animations.add('walkTopRight', 					[30,31,32,33,34,35], 15, true);
	player.animations.add('walkRight', 						[36,37,38,39,40,41], 15, true);
	player.animations.add('walkLeft', 						[42,43,44,45,46,47], 15, true);
	player.animations.add('idle', 							[48,49,50,51,52,53], 7, true);

	//	Attack face
	player.animations.add('attackFaceWalkBot', 				[54,55,56,57,58,59], 15, true);
	player.animations.add('attackFaceWalkTop', 				[60,61,62,63,64,65], 15, true);
	player.animations.add('attackFaceWalkBotLeft', 			[66,67,68,69,70,71], 15, true);
	player.animations.add('attackFaceWalkBotRight', 		[72,73,74,75,76,77], 15, true);
	player.animations.add('attackFaceWalkTopLeft', 			[78,79,80,81,82,83], 15, true);
	player.animations.add('attackFaceWalktopRight', 		[84,85,86,87,88,89], 15, true);
	player.animations.add('attackFaceWalkRight', 			[90,91,92,93,94,95], 15, true);
	player.animations.add('attackFaceWalkLeft', 			[96,97,98,99,100,101], 15, true);
	player.animations.add('attackFaceStand', 				[102,103,104,105,106,107], 15, true);

	//	Attack dos
	player.animations.add('attackDosWalkBot', 				[108,109,110,111,112,113], 15, true);
	player.animations.add('attackDosWalkTop', 				[114,115,116,117,118,119], 15, true);
	player.animations.add('attackDosWalkBotLeft', 			[120,121,122,123,124,125], 15, true);
	player.animations.add('attackDosWalkBotRight', 			[126,127,128,129,130,131], 15, true);
	player.animations.add('attackDosWalkTopLeft', 			[132,133,134,135,136,137], 15, true);
	player.animations.add('attackDosWalktopRight', 			[138,139,140,141,142,143], 15, true);
	player.animations.add('attackDosWalkRight', 			[144,145,146,147,148,149], 15, true);
	player.animations.add('attackDosWalkLeft', 				[150,151,152,153,154,155], 15, true);
	player.animations.add('attackDosStand', 				[156,157,158,159,160,161], 15, true);

	//	Attack 3/4 face
	player.animations.add('attack34Face2WalkBot', 			[162,163,164,165,166,167], 15, true);
	player.animations.add('attack34Face2WalkTop', 			[168,169,170,171,172,173], 15, true);
	player.animations.add('attack34Face2WalkBotLeft', 		[174,175,176,177,178,179], 15, true);
	player.animations.add('attack34Face2WalkBotRight', 		[180,181,182,183,184,185], 15, true);
	player.animations.add('attack34Face2WalkTopLeft', 		[186,187,188,189,190,191], 15, true);
	player.animations.add('attack34Face2WalktopRight', 		[192,193,194,195,196,197], 15, true);
	player.animations.add('attack34Face2WalkRight', 		[198,199,200,201,202,203], 15, true);
	player.animations.add('attack34Face2WalkLeft', 			[204,205,206,207,208,209], 15, true);
	player.animations.add('attack34Face2Stand', 			[210,211,212,213,214,215], 15, true);

	//	Attack 3/4 face2
	player.animations.add('attack34FaceWalkBot', 			[216,217,218,219,220,221], 15, true);
	player.animations.add('attack34FaceWalkTop', 			[222,223,224,225,226,227], 15, true);
	player.animations.add('attack34FaceWalkBotLeft', 		[228,229,230,231,232,233], 15, true);
	player.animations.add('attack34FaceWalkBotRight', 		[234,235,236,237,238,239], 15, true);
	player.animations.add('attack34FaceWalkTopLeft', 		[240,241,242,243,244,245], 15, true);
	player.animations.add('attack34FaceWalktopRight', 		[246,247,248,249,250,251], 15, true);
	player.animations.add('attack34FaceWalkRight', 			[252,253,254,255,256,257], 15, true);
	player.animations.add('attack34FaceWalkLeft', 			[258,259,260,261,262,263], 15, true);
	player.animations.add('attack34FaceStand', 				[264,265,266,267,268,269], 15, true);

	//	Attack 3/4 dos
	player.animations.add('attack34Dos2WalkBot', 			[270,271,272,273,274,275], 15, true);
	player.animations.add('attack34Dos2WalkTop', 			[276,277,278,279,280,281], 15, true);
	player.animations.add('attack34Dos2WalkBotLeft', 		[282,283,284,285,286,287], 15, true);
	player.animations.add('attack34Dos2WalkBotRight', 		[288,289,290,291,292,293], 15, true);
	player.animations.add('attack34Dos2WalkTopLeft', 		[294,295,296,297,298,299], 15, true);
	player.animations.add('attack34Dos2WalkTopRight', 		[300,301,302,303,304,305], 15, true);
	player.animations.add('attack34Dos2WalkRight', 			[306,307,308,309,310,311], 15, true);
	player.animations.add('attack34Dos2WalkLeft', 			[312,313,314,315,316,317], 15, true);
	player.animations.add('attack34Dos2Stand', 				[318,319,320,321,322,323], 15, true);

	//	Attack 3/4 dos2
	player.animations.add('attack34DosWalkBot', 			[324,325,326,327,328,329], 15, true);
	player.animations.add('attack34DosWalkTop', 			[330,331,332,333,334,335], 15, true);
	player.animations.add('attack34DosWalkBotLeft', 		[336,337,338,339,340,341], 15, true);
	player.animations.add('attack34DosWalkBotRight', 		[342,343,344,345,346,347], 15, true);
	player.animations.add('attack34DosWalkTopLeft', 		[348,349,350,351,352,353], 15, true);
	player.animations.add('attack34DosWalkTopRight', 		[354,355,356,357,358,359], 15, true);
	player.animations.add('attack34DosWalkRight', 			[360,361,362,363,364,365], 15, true);
	player.animations.add('attack34DosWalkLeft', 			[366,367,368,369,370,371], 15, true);
	player.animations.add('attack34DosStand', 				[372,373,374,375,376,377], 15, true);

	//	Attack profil
	player.animations.add('attackProfilWalkBot', 			[378,379,380,381,382,383], 15, true);
	player.animations.add('attackProfilWalkTop', 			[384,385,386,387,388,389], 15, true);
	player.animations.add('attackProfilWalkBotLeft', 		[390,391,392,393,394,395], 15, true);
	player.animations.add('attackProfilWalkBotRight', 		[396,397,398,399,400,401], 15, true);
	player.animations.add('attackProfilWalkTopLeft', 		[402,403,404,405,406,407], 15, true);
	player.animations.add('attackProfilWalkTopRight', 		[408,409,410,411,412,413], 15, true);
	player.animations.add('attackProfilWalkRight', 			[414,415,416,417,418,419], 15, true);
	player.animations.add('attackProfilWalkLeft', 			[420,421,422,423,424,425], 15, true);
	player.animations.add('attackProfilStand', 				[426,427,428,429,430,431], 15, true);

	//	Attack profil2
	player.animations.add('attackProfil2WalkBot', 			[432,433,434,435,436,437], 15, true);
	player.animations.add('attackProfil2WalkTop', 			[438,439,440,441,442,443], 15, true);
	player.animations.add('attackProfil2WalkBotLeft', 		[444,445,446,447,448,449], 15, true);
	player.animations.add('attackProfil2WalkBotRight', 		[450,451,452,453,454,455], 15, true);
	player.animations.add('attackProfil2WalkTopLeft', 		[456,457,458,459,460,461], 15, true);
	player.animations.add('attackProfil2WalkTopRight', 		[462,463,464,465,466,467], 15, true);
	player.animations.add('attackProfil2WalkRight', 		[468,469,470,471,472,473], 15, true);
	player.animations.add('attackProfil2WalkLeft', 			[474,475,476,477,478,479], 15, true);
	player.animations.add('attackProfil2Stand', 			[480,481,482,483,484,485], 15, true);

	spell3Anim = player.animations.add('spell3Anim');

	////////////////////////////////////////////
	////////////////// ENEMIES /////////////////
	////////////////////////////////////////////

    //	Création des Enemies
    enemies = game.add.group();
    enType1 = game.add.group();
    enType2 = game.add.group();
    enType3 = game.add.group();
    enType4 = game.add.group();

    enemies.add(enType1);
    enemies.add(enType2);
    enemies.add(enType3);
    enemies.add(enType4);

    enemies.forEach(function(item) {
    	item.enableBody = true;
    	game.physics.enable(item, Phaser.Physics.ARCADE);
    });

    enType1.createMultiple(200, 'enemy1', 0, false);
    enType2.createMultiple(200, 'enemy2', 0, false);
    enType3.createMultiple(250, 'enemy3', 0, false);
    enType4.createMultiple(200, 'enemy4', 0, false);

    enType1.forEach(function(item) {
    	item.enType	= 1;
    	item.hp 	= enType1Hp;
    	item.ms 	= enType1Ms;
    });
    enType2.forEach(function(item) {
    	item.enType	= 2;
    	item.hp 	= enType2Hp; 
    	item.ms 	= enType2Ms;
 	});
 	enType3.forEach(function(item) {
    	item.enType	= 3;
    	item.hp 	= enType3Hp;
    	item.ms 	= enType3Ms;
 	});
 	enType4.forEach(function(item) {
    	item.enType	= 4;
    	item.hp 	= enType4Hp;
    	item.ms 	= enType4Ms;
 	});

	//	Animations des Enemies
	enType1.callAll('animations.add', 'animations', 'bot', 			[0, 1]	, 10, true);
	enType1.callAll('animations.add', 'animations', 'top', 			[2, 3]	, 10, true);
	enType1.callAll('animations.add', 'animations', 'botLeft', 		[4, 5]	, 10, true);
	enType1.callAll('animations.add', 'animations', 'left', 		[6, 7]	, 10, true);
	enType1.callAll('animations.add', 'animations', 'topLeft', 		[8, 9]	, 10, true);
	enType1.callAll('animations.add', 'animations', 'botRight', 	[10, 11], 10, true);
	enType1.callAll('animations.add', 'animations', 'right', 		[12, 13], 10, true);
	enType1.callAll('animations.add', 'animations', 'topRight', 	[14, 15], 10, true);

	enType2.callAll('animations.add', 'animations', 'bot', 			[0, 1]	, 10, true);
	enType2.callAll('animations.add', 'animations', 'top', 			[2, 3]	, 10, true);
	enType2.callAll('animations.add', 'animations', 'botLeft', 		[4, 5]	, 10, true);
	enType2.callAll('animations.add', 'animations', 'left', 		[6, 7]	, 10, true);
	enType2.callAll('animations.add', 'animations', 'topLeft', 		[8, 9]	, 10, true);
	enType2.callAll('animations.add', 'animations', 'botRight', 	[10, 11], 10, true);
	enType2.callAll('animations.add', 'animations', 'right', 		[12, 13], 10, true);
	enType2.callAll('animations.add', 'animations', 'topRight', 	[14, 15], 10, true);

	enType3.callAll('animations.add', 'animations', 'bot', 			[0, 1]	, 10, true);
	enType3.callAll('animations.add', 'animations', 'top', 			[2, 3]	, 10, true);
	enType3.callAll('animations.add', 'animations', 'botLeft', 		[4, 5]	, 10, true);
	enType3.callAll('animations.add', 'animations', 'left', 		[6, 7]	, 10, true);
	enType3.callAll('animations.add', 'animations', 'topLeft', 		[8, 9]	, 10, true);
	enType3.callAll('animations.add', 'animations', 'botRight', 	[10, 11], 10, true);
	enType3.callAll('animations.add', 'animations', 'right', 		[12, 13], 10, true);
	enType3.callAll('animations.add', 'animations', 'topRight', 	[14, 15], 10, true);

	enType4.callAll('animations.add', 'animations', 'bot', 			[0, 1]	, 10, true);
	enType4.callAll('animations.add', 'animations', 'top', 			[2, 3]	, 10, true);
	enType4.callAll('animations.add', 'animations', 'botLeft', 		[4, 5]	, 10, true);
	enType4.callAll('animations.add', 'animations', 'left', 		[6, 7]	, 10, true);
	enType4.callAll('animations.add', 'animations', 'topLeft', 		[8, 9]	, 10, true);
	enType4.callAll('animations.add', 'animations', 'botRight', 	[10, 11], 10, true);
	enType4.callAll('animations.add', 'animations', 'right', 		[12, 13], 10, true);
	enType4.callAll('animations.add', 'animations', 'topRight', 	[14, 15], 10, true);

	interWaver();


	////////////////////////////////////////////
	//////////////// COLLECTIBLES //////////////
	////////////////////////////////////////////

	//	Création des Heal
    heals = game.add.group();
    heals.enableBody = true;
    heals.physicsBodyType = Phaser.Physics.ARCADE;
    heals.createMultiple(50, 'heal');


    ////////////////////////////////////////////
	/////////////////// SPELLS /////////////////
	////////////////////////////////////////////

	//	SPELL1
	spell1Impacts = game.add.group();
	spell1Impacts.enableBody = true;
    spell1Impacts.physicsBodyType = Phaser.Physics.ARCADE;
    spell1Impacts.createMultiple(10, 'spell1Impact', 0, false);

    spell1Projectiles = game.add.group();
	spell1Projectiles.enableBody = true;
    spell1Projectiles.physicsBodyType = Phaser.Physics.ARCADE;
    spell1Projectiles.createMultiple(10, 'spell1Projectile', 0, false);
    spell1Projectiles.setAll('checkWorldBounds', true);
    spell1Projectiles.setAll('outOfBoundsKill', true);

    spell1Drops = game.add.group();
	spell1Drops.enableBody = true;
    spell1Drops.physicsBodyType = Phaser.Physics.ARCADE;
    spell1Drops.createMultiple(10, 'spell1Drop', 0, false);

    //	SPELL2
    spell2Impacts = game.add.group();
    spell2Impacts.enableBody = true;
    spell2Impacts.physicsBodyType = Phaser.Physics.ARCADE;
    spell2Impacts.createMultiple(50, 'spell2Impact', 0, false);

    //	SPELL3
    spell3Overs = game.add.group();
    spell3Overs.enableBody = true;
    spell3Overs.physicsBodyType = Phaser.Physics.ARCADE;
    spell3Overs.createMultiple(10, 'spell3Over', 0, false);

    // SPELL4
    spell4Effects = game.add.group();
    spell4Effects.physicsBodyType = Phaser.Physics.ARCADE;
    spell4Effects.createMultiple(10, 'spell4Effect', 0, false);



    ////////////////////////////////////////////
	/////////////////// BONUS //////////////////
	////////////////////////////////////////////

	bonusFoudreOrbs = game.add.group();
	bonusFoudreOrbs.enableBody = true;
    bonusFoudreOrbs.physicsBodyType = Phaser.Physics.ARCADE;
    bonusFoudreOrbs.createMultiple(10, 'bonusFoudreOrb', 0, false);

	bonusFoudreBeams = game.add.group();
	bonusFoudreBeams.enableBody = true;
    bonusFoudreBeams.physicsBodyType = Phaser.Physics.ARCADE;
    bonusFoudreBeams.createMultiple(150, 'bonusFoudreBeam', 0, false);

	bonusFoudreImpacts = game.add.group();
	bonusFoudreImpacts.enableBody = true;
    bonusFoudreImpacts.physicsBodyType = Phaser.Physics.ARCADE;
    bonusFoudreImpacts.createMultiple(150, 'bonusFoudreImpact', 0, false);

    bonusFireOrbs = game.add.group();
	bonusFireOrbs.enableBody = true;
    bonusFireOrbs.physicsBodyType = Phaser.Physics.ARCADE;
    bonusFireOrbs.createMultiple(10, 'bonusFireOrb', 0, false);

	bonusFireDots = game.add.group();
	bonusFireDots.enableBody = true;
    bonusFireDots.physicsBodyType = Phaser.Physics.ARCADE;
    bonusFireDots.createMultiple(100, 'bonusFireDot', 0, false);

	bonusFireImpacts = game.add.group();
	bonusFireImpacts.enableBody = true;
    bonusFireImpacts.physicsBodyType = Phaser.Physics.ARCADE;
    bonusFireImpacts.createMultiple(100, 'bonusFireImpact', 0, false);

    bonusWindOrbs = game.add.group();
	bonusWindOrbs.enableBody = true;
    bonusWindOrbs.physicsBodyType = Phaser.Physics.ARCADE;
    bonusWindOrbs.createMultiple(10, 'bonusWindOrb', 0, false);

    bonusWindProjectiles = game.add.group();
    bonusWindProjectiles.enableBody = true;
    bonusWindProjectiles.physicsBodyType = Phaser.Physics.ARCADE;
    bonusWindProjectiles.createMultiple(150, 'bonusWindProjectile', 0, false);
    bonusWindProjectiles.forEach(function(item) {item.anchor.setTo(0.5,0.25)});
    bonusWindProjectiles.setAll('checkWorldBounds', true);
    bonusWindProjectiles.setAll('outOfBoundsKill', true);

    bonusIceOrbs = game.add.group();
	bonusIceOrbs.enableBody = true;
    bonusIceOrbs.physicsBodyType = Phaser.Physics.ARCADE;
    bonusIceOrbs.createMultiple(10, 'bonusIceOrb', 0, false);

    bonusIceImpacts = game.add.group();
	bonusIceImpacts.enableBody = true;
    bonusIceImpacts.physicsBodyType = Phaser.Physics.ARCADE;
    bonusIceImpacts.createMultiple(50, 'bonusIceImpact', 0, false);

    bonusRockOrbs = game.add.group();
    bonusRockOrbs.enableBody = true;
    bonusRockOrbs.physicsBodyType = Phaser.Physics.ARCADE;
    bonusRockOrbs.createMultiple(10, 'bonusRockOrb', 0, false);

    bonusRockProjectiles = game.add.group();
    bonusRockProjectiles.enableBody = true;
    bonusRockProjectiles.physicsBodyType = Phaser.Physics.ARCADE;
    bonusRockProjectiles.createMultiple(50, 'bonusRockProjectile', 0, false);
    bonusRockProjectiles.setAll('checkWorldBounds', true);
    bonusRockProjectiles.setAll('outOfBoundsKill', true);

    bonusEauOrbs = game.add.group();
    bonusEauOrbs.enableBody = true;
    bonusEauOrbs.physicsBodyType = Phaser.Physics.ARCADE;
    bonusEauOrbs.createMultiple(10, 'bonusEauOrb', 0, false);

	bonusEauProjectiles = game.add.group();
    bonusEauProjectiles.enableBody = true;
    bonusEauProjectiles.physicsBodyType = Phaser.Physics.ARCADE;
    bonusEauProjectiles.createMultiple(50, 'bonusEauProjectile', 0, false);
    bonusEauProjectiles.setAll('checkWorldBounds', true);
    bonusEauProjectiles.setAll('outOfBoundsKill', true);

    bonusEauImpacts = game.add.group();
    bonusEauImpacts.enableBody = true;
    bonusEauImpacts.physicsBodyType = Phaser.Physics.ARCADE;
    bonusEauImpacts.createMultiple(25, 'bonusEauImpact', 0, false);


    ////////////////////////////////////////////
	//////////////////// HUD ///////////////////
	////////////////////////////////////////////

	//LEVEL

	hudLevel = game.add.text(0, 0, 'Lv.' + playerLv, {
		font: "32px Arial", 
		fill: "#fff"
	});

	
	//SCORE

	hudScore = game.add.text(0, 0, score, {
		font: "48px Arial",
		fill: "#fff"}
	);

	hudMultiScore = game.add.text(0, 0, 'x ' + multiScore, {
		font: "32px Arial",
		fill: "#fff"}
	);


	//HEALTH BAR

	hudHealthBarBg = game.add.sprite(0, 0, 'barBg');
	hudHealthBarBg.fixedToCamera = true;
	hudHealthBarBg.cameraOffset.setTo(34, 82);

	hudHealthBarFill = game.add.sprite(0, 0, 'healthBarFill');
	hudHealthBarFill.fixedToCamera = true;
	hudHealthBarFill.cameraOffset.setTo(32, 80);
	hudHealthBarFill.width = playerHp*167/playerHpMax

	hudHealthBarContainer = game.add.sprite(0, 0, 'barContainer');
	hudHealthBarContainer.fixedToCamera = true;
	hudHealthBarContainer.cameraOffset.setTo(32, 80);

	hudHp = game.add.text(0, 0, playerHp + ' / ' + playerHpMax, {
		font: "12px Arial", 
		fill: "#fff"
	});


	//MANA BAR

	hudManaBarBg = game.add.sprite(0, 0, 'barBg');
	hudManaBarBg.fixedToCamera = true;
	hudManaBarBg.cameraOffset.setTo(34, 118);

	hudManaBarFill = game.add.sprite(0, 0, 'manaBarFill');
	hudManaBarFill.fixedToCamera = true;
	hudManaBarFill.cameraOffset.setTo(32, 116);
	hudManaBarFill.width = playerHp*167/playerManaMax

	hudManaBarContainer = game.add.sprite(0, 0, 'barContainer');
	hudManaBarContainer.fixedToCamera = true;
	hudManaBarContainer.cameraOffset.setTo(32, 116);

	hudMana = game.add.text(0, 0, playerMana + ' / ' + playerManaMax, {
		font: "12px Arial", 
		fill: "#fff"
	});


	//BONUS

	hudBonus = game.add.sprite(0, 0, 'bonusNormalIcon');
	hudBonus.fixedToCamera = true;
	hudBonus.cameraOffset.setTo(32, 180);
	hudBonus.width = 40;
	hudBonus.height = 40;

	hudBonusCd = game.add.sprite(0, 0, 'cdOverlayIcon');
	hudBonusCd.fixedToCamera = true;
	hudBonusCd.cameraOffset.setTo(32, 180);
	hudBonusCd.width = 40;

	hudBonusText = game.add.text(0, 0, '', {
		font: "14px Arial",
		weight: "bold",
		fill: "#fff"
	});


	//SPELLS

	hudSpell2HotKey = game.add.text(0, 0, '1', {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell2Icon = game.add.sprite(0, 0, 'spell2Icon');
	hudSpell2Icon.fixedToCamera = true;
	hudSpell2Icon.cameraOffset.setTo(96, 180);
	hudSpell2Icon.width = 40; 
	hudSpell2Icon.height = 40;

	hudSpell2Cd = game.add.sprite(0, 0, 'cdOverlayIcon');
	hudSpell2Cd.anchor.setTo(0,1);
	hudSpell2Cd.fixedToCamera = true;
	hudSpell2Cd.cameraOffset.setTo(96, 220);
	hudSpell2Cd.width = 40;

	hudSpell2Text = game.add.text(0, 0, spell2Mana, {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell1HotKey = game.add.text(0, 0, '2', {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell1Icon = game.add.sprite(0, 0, 'spell1Icon');
	hudSpell1Icon.fixedToCamera = true;
	hudSpell1Icon.cameraOffset.setTo(138, 180);
	hudSpell1Icon.width = 40;
	hudSpell1Icon.height = 40;

	hudSpell1Cd = game.add.sprite(0, 0, 'cdOverlayIcon');
	hudSpell1Cd.anchor.setTo(0,1);
	hudSpell1Cd.fixedToCamera = true;
	hudSpell1Cd.cameraOffset.setTo(138, 220);
	hudSpell1Cd.width = 40;

	hudSpell1Text = game.add.text(0, 0, spell1Mana, {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell4HotKey = game.add.text(0, 0, '3', {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell4Icon = game.add.sprite(0, 0, 'spell4Icon');
	hudSpell4Icon.fixedToCamera = true;
	hudSpell4Icon.cameraOffset.setTo(180, 180);
	hudSpell4Icon.width = 40;
	hudSpell4Icon.height = 40;

	hudSpell4Cd = game.add.sprite(0, 0, 'cdOverlayIcon');
	hudSpell4Cd.anchor.setTo(0,1);
	hudSpell4Cd.fixedToCamera = true;
	hudSpell4Cd.cameraOffset.setTo(180, 220);
	hudSpell4Cd.width = 40;

	hudSpell4Text = game.add.text(0, 0, spell4Mana, {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell3HotKey = game.add.text(0, 0, '4', {
		font: "12px Arial", 
		fill: "#fff"
	});

	hudSpell3Icon = game.add.sprite(0, 0, 'spell3Icon');
	hudSpell3Icon.fixedToCamera = true;
	hudSpell3Icon.cameraOffset.setTo(222, 180);
	hudSpell3Icon.width = 40;
	hudSpell3Icon.height = 40;

	hudSpell3Cd = game.add.sprite(0, 0, 'cdOverlayIcon');
	hudSpell3Cd.anchor.setTo(0,1);
	hudSpell3Cd.fixedToCamera = true;
	hudSpell3Cd.cameraOffset.setTo(222, 220);
	hudSpell3Cd.width = 40;

	hudSpell3Text = game.add.text(0, 0, spell3Mana, {
		font: "12px Arial", 
		fill: "#fff"
	});


	//PLACEMENT DES TEXTES

	hudTexts = game.add.group();
	hudTexts.add(hudScore);
	hudTexts.add(hudMultiScore);
	hudTexts.add(hudLevel);
	hudTexts.add(hudHp);
	hudTexts.add(hudMana);
	hudTexts.add(hudBonusText);
	hudTexts.add(hudSpell2Text);
	hudTexts.add(hudSpell2HotKey);
	hudTexts.add(hudSpell1Text);
	hudTexts.add(hudSpell1HotKey);
	hudTexts.add(hudSpell4Text);
	hudTexts.add(hudSpell4HotKey);
	hudTexts.add(hudSpell3Text);
	hudTexts.add(hudSpell3HotKey);

	hudTexts.forEach(function(item) {
		item.fixedToCamera = true;
    	item.setShadow(3, 3, 'rgba(0,0,0,1)', 0);
	});

	hudScore.anchor.setTo(1,0);
	hudScore.cameraOffset.setTo(gameWidth-32, 32);

	hudMultiScore.anchor.setTo(1,0);
	hudMultiScore.cameraOffset.setTo(gameWidth-32, 80);

	hudLevel.cameraOffset.setTo(32, 32);

	hudHp.anchor.setTo(0.5,0);
	hudHp.cameraOffset.setTo(116, 88);
	hudHp.setShadow(1, 1, 'rgba(0,0,0,0)', 0);

	hudMana.anchor.setTo(0.5,0);
	hudMana.cameraOffset.setTo(116, 124);
	hudMana.setShadow(1, 1, 'rgba(0,0,0,0)', 0);

	hudBonusText.anchor.setTo(0.5,0);
	hudBonusText.cameraOffset.setTo(52, 225);
	hudBonusText.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell2Text.anchor.setTo(0.5,0);
	hudSpell2Text.cameraOffset.setTo(116, 225);
	hudSpell2Text.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell2HotKey.anchor.setTo(0.5,0);
	hudSpell2HotKey.cameraOffset.setTo(116, 163);
	hudSpell2HotKey.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell1Text.anchor.setTo(0.5,0);
	hudSpell1Text.cameraOffset.setTo(158, 225);
	hudSpell1Text.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell1HotKey.anchor.setTo(0.5,0);
	hudSpell1HotKey.cameraOffset.setTo(158, 163);
	hudSpell1HotKey.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell4Text.anchor.setTo(0.5,0);
	hudSpell4Text.cameraOffset.setTo(200, 225);
	hudSpell4Text.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell4HotKey.anchor.setTo(0.5,0);
	hudSpell4HotKey.cameraOffset.setTo(200, 163);
	hudSpell4HotKey.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell3Text.anchor.setTo(0.5,0);
	hudSpell3Text.cameraOffset.setTo(242, 225);
	hudSpell3Text.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);

	hudSpell3HotKey.anchor.setTo(0.5,0);
	hudSpell3HotKey.cameraOffset.setTo(242, 163);
	hudSpell3HotKey.setShadow(0.5,0.5, 'rgba(0,0,0,1)', 0);


    ////////////////////////////////////////////
	/////////////// SPLASHSCREEN ///////////////
	////////////////////////////////////////////

	if(splashScreen) {

		splashGrp = game.add.group();

		splashBg = game.add.sprite(0, 0, 'splashBg');
		splashBg.width = gameWidth;
		splashBg.height = gameHeight;
		splashBg.fixedToCamera = true;
		splashBg.cameraOffset.setTo(0, 0);

		splashTitle = game.add.sprite(0, 0, 'splashTitle');
		splashTitle.fixedToCamera = true;
		splashTitle.anchor.setTo(0.5, 0.5)
		splashTitle.cameraOffset.setTo(gameWidth/2, 124);

		splashPressStart = game.add.sprite(0, 0, 'splashPressStart');
		splashPressStartAnim = splashPressStart.animations.add('splashPressStartAnim');
		splashPressStartAnim.play(5, true);
		splashPressStart.fixedToCamera = true;
		splashPressStart.anchor.setTo(0.5, 0.5);
		splashPressStart.cameraOffset.setTo(gameWidth/2, gameHeight - 124);

		splashGrp.add(splashBg);
		splashGrp.add(splashTitle);
		splashGrp.add(splashPressStart);
	}
}