var EnemyClass =
	{

		vX: 0,
		vY: 0,
		curSpriteAnim: undefined,
		regSpriteAnim: undefined,
		hitAnim: undefined,
		deathAnim: undefined,
		startX: 0,
		startY: 0,
		alive: true,

		
			

		init: function (vX, vY, animObject, animObjectTemp, animObject2, animObject3, startX, startY, alive)
		{
			this.vX = vX;
			this.vY = vY;
			this.regSpriteAnim = animObject;
			this.curSpriteAnim = animObjectTemp;
			this.hitAnim = animObject2;
			this.deathAnim = animObject3;
			this.startX = startX;
			this.startY = startY;
			this.alive = alive;
		},

		update: function ()	// updates enemy position
		{
			this.curSpriteAnim.x -= 5;
			this.curSpriteAnim.x += this.vX;
			this.regSpriteAnim.x = this.curSpriteAnim.x;
			this.hitAnim.x = this.curSpriteAnim.x;
			this.deathAnim.x = this.curSpriteAnim.x;

		},
	};