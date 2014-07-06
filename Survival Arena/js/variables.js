//	GAME
var gameWidth					=	window.innerWidth
var	gameHeight					=	window.innerHeight
var cursorAngle
var cursorX
var cursorY
var x
var y
var enemyTester					=	false
var bonusTester					=	false


//	SPLASHSCREEN
var splashScreen 				=	true
var	splashGrp
var splashBg
var	splashTitle

// MAP

var layerCollision
var layerMain
var layerDeco
var layerNiveaux
var	map


//	SCORE
var	score						=	0
var multiScore					=	1
var maxMultiScore				=	10
var multiScoreLoad				=	0
var multiScoreLoadBase			=	100
var killingSpree				=	false


//	CONTROLS
var	cursors


//	player

var	player 						=	null
var	playerLv					=	1
var	playerLv2					=	250
var	playerLv3					=	500
var	playerLv4					=	750
var	playerLv5					=	1000
var	playerLv6					=	1250
var	playerLv7					=	1500
var	playerLv8					=	2500
var	playerLv9					=	3000
var	playerLv10					=	3500
var	playerLv11					=	4000
var	playerLv12					=	5000
var	playerLv13					=	6000
var	playerLv14					=	7500
var	playerLv15					=	9000

var	playerSpeed					=	300
var	playerSpeed2				=	Math.sqrt(2*(playerSpeed*playerSpeed))/2
			
var	playerProjectiles
var	playerProjectile

var fireRateBase				=	165
var fireRate 					=	fireRateBase
var nextFire					=	0

var playerHp					=	500
var playerHpMax					=	500
var playerMana					=	1000
var playerManaRegen				=	0
var playerManaRegenPKill		=	5
var playerManaMax				=	1000
var playerDmgBase				=	10
var playerDmg					=	playerDmgBase
var playerHpBar			
var playerFade					=	600
var nextplayerFade				=	0


//	BONUS

var nextBonus					=	0
var	bonusLoad					=	13000
var bonusOrbTime				=	17000
var bonusDuration				=	25000
var bonusDurationTimer			=	null


var	bonusFoudre					=	false
var	bonusFoudreSearch1			=	true
var	bonusFoudreSearch2			=	true
var	bonusFoudreSearch3			=	true
var bonusFoudreZone				=	270
var	bonusFoudreDmg				=	15
var bonusFoudreTarget1			=	null
var bonusFoudreTarget2			=	null
var bonusFoudreTarget3			=	null
var bonusFoudreU				=	0
var bonusFoudreV				=	0
var bonusFoudreOrbs
var bonusFoudreImpacts
var bonusFoudreBeam

var	bonusFire					=	false
var bonusFireZone				=	150
var	bonusFireDmgDot				=	4
var bonusFireDelay				=	200
var bonusFireStack				=	15
var bonusFireOrbs
var	bonusFireImpacts
var	bonusFireDots

var bonusWind					=	false
var bonusWindProjectileSpeed	= 	1500
var bonusWindRate				=	25
var	bonusWindDmg				=	0.4
var bonusWindSlow				=	80
var bonusWindOrbs
var bonusWindProjectiles

var bonusIce 					=	false
var bonusIceZone				=	192
var	bonusIceSlow				=	30
var	bonusIceDmg					=	0.33
var bonusIceRate				=	35
var bonusIceOrbs
var bonusIceImpacts

var bonusRock					=	false 
var bonusRockProjectileSpeed	= 	1350
var bonusRockRate				=	25
var	bonusRockDmg				=	0.15
var bonusRockSlow				=	80
var bonusRockOrbs
var bonusRockProjectiles

var bonusEau					=	false
var	bonusEauHp					=	2
var	bonusEauMana				=	5
var	bonusEauRate				=	35
var bonusEauDmg					=	50
var	bonusEauOrbs
var	bonusEauProjectiles
var	bonusEauImpacts


//	SPELLS

var currentSpell				=	0

var spell1Stack					=	true
var spell1DropTime				=	3000
var	spell1Impacts
var	spell1Projectiles
var	spell1Mana					=	150
var	spell1Cd					=	5000
var spell1Damage				=	35
var	nextSpell1					=	0
var spell1Level					=	6

var	spell2Mana					=	75
var	spell2Cd					=	1000
var spell2Damage				=	9
var spell2Slow					=	0.3
var spell2KBack					=	16
var	nextSpell2					=	0
var spell2Impacts
var spell2Level					=	3

var	spell3Mana					=	1000
var	spell3Cd					=	90000
var spell3Time					=	20000
var spell3BonusDmg				=	10
var spell3BonusAs				=	50
var	nextSpell3					=	0
var spell3Mode					=	false
var spell3Overs
var spell3Level					=	12

var spell4Mana					=	300
var spell4Duration				=	7000
var	spell4Cd					=	15000
var	spell4Damage				=	80
var	nextSpell4					=	0
var spell4Level					=	9
var spell4Mode					=	false


//	ENEMIES
var waveTimeBase				=	15000
var waveTime					=	waveTimeBase
var waveCd						=	2000
var nextWave					=	0
var interWave					=	true
var waveNb						=	1
var waveNbIncr					=	false

var nextEnemyPop				=	0
var randomPop
var enemyLoadBase				=	300
var enemyLoad					=	enemyLoadBase

var	enemies

var	enType1
var enType1Hp					=	10
var enType1Ms					=	0
var enType1Ms					=	90
var	enType1Pt					=	1

var	enType2
var enType2Hp					=	25
var enType2Ms					=	0
var enType2Ms					=	100
var	enType2Pt					=	3

var	enType3
var enType3Hp					=	30
var enType3Ms					=	0
var enType3Ms					=	130
var	enType3Pt					=	6

var	enType4
var enType4Hp					=	100
var enType4Ms					=	0
var enType4Ms					=	80
var	enType4Pt					=	10


//	HEALS
var	heal
var	heals
var	healHp						=	10
var	healMana					=	20
var nextHealPop					=	0
var randomPop
var healLoad					=	5000
var healTime					=	10000
var nextHealTime				=	0