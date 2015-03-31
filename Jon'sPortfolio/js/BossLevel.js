//You are working this file in visual studio
function runPuncherLevel()
{
	//set sprite sheet images for animations
	var gui = new Image();
	gui.src = "images/HUDbar.png";
	var bg1 = new Image();
	bg1.src = "images/Dark Forest1.png";
	var objectlayerImage = new Image();
	objectlayerImage.src = "images/clear.png";
	var playerImage = new Image();
	playerImage.src = "images/Yu-gi-black-pants-856x107(reverse).png";

	var enemyImage = new Image();
	//enemyImage.src = "images/wolf.png";
	//add in their death animation

	// create spriteAnim objects
	var HUDbar = Object.create(SpriteAnimClass);
	
	var playerSprite = Object.create(SpriteAnimClass);
	//var enemySprite = Object.create(SpriteAnimClass);
	var enemyHit = Object.create(SpriteAnimClass); //Not currently in use
	var enemyDeath = Object.create(SpriteAnimClass); //Not currently in use

	// create game objects
	//var enemy = Object.create(EnemyClass);
	//enemy.curSpriteAnim = enemySprite;

	// initialize sprite animations
	bg.init(bg1, objectlayerImage, 0, 0, 0, 0, 3, 7);
	playerSprite.init(playerImage, 50, canvas.height - 157, 7, 0, 7, 0, 107, 107, 120);
	//(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate)
	player.init(352, 700, 0, 0, playerSprite, otherSprite, 1, 1, 1);
	guiLayer = HUDbar;
	guiLayer.init(gui, 0, canvas.height - 50, 0, 0, 0, 0, 768, 960, 5000);

	//enemySprite.init(enemyImage, canvas.width, canvas.height - 157, 1, 0, 0, 0, 107, 107, 120);
	//(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate)

	//enemy.init(0, 2, 2, enemySprite, enemySprite, enemyHit, enemyDeath, enemy.curSpriteAnim.x, enemy.curSpriteAnim.y, true);

	//gameObjects.push(enemy);
	bg.update();
	gameObjects[0].curSpriteAnim.update();

	player.curSpriteAnim = player.regSpriteAnim;
	player.curSpriteAnim.update();

	gameLoop();
};