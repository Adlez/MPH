function yugiPAWNCH(yugiPunching, YugiPawnchClass, player, yugiBlasts)
{
	//console.log(yugiPunching);

	if(yugiPunching == true)
	{
		//if (armCoolDown < armCoolDownMax)
		//{
		//	return;
		//}
		//else
		//{
			//and start up again later
			//Must add an indicator of when punching is enabled
			var yugiPAWNCHImage = new Image();
			yugiPAWNCHImage.src = "images/PAWNCH.png";
			var PAWNCHANimation = Object.create(SpriteAnimClass);
			var blast = Object.create(YugiPawnchClass);
			blast.init(10, 0, PAWNCHANimation);
			blast.spriteAnim.init(yugiPAWNCHImage, player.curSpriteAnim.x + 30, player.curSpriteAnim.y, 1, 0, 0, 0, 50, 50, 60);
			//(image, x, y, numFrames, startFrame, endFrame, curFrame, frameWidth, frameHeight, frameRate)
			blast.spriteAnim.update();
			yugiBlasts.push(blast);
			//armCoolDown -= 30;
		//}
	}
	//armCoolDown += 5;
}

